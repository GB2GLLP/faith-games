// † "Go and tell this people" — Isaiah 6:9
import { useEffect, useCallback, useRef, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Animated, Pressable, Alert, Easing } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useGameStore } from '../../../../stores/gameStore'
import { useCharadesStore } from '../../../../stores/charadesStore'
import { useRoomStore } from '../../../../stores/roomStore'
import { useTimer } from '../../../../hooks/useTimer'
import { useDeviceOrientation } from '../../../../hooks/useDeviceOrientation'
import { useWakeLock } from '../../../../hooks/useWakeLock'
import { useGameContent } from '../../../../hooks/useGameContent'
import { useMultiplayerGame } from '../../../../hooks/useMultiplayerGame'
import { Timer } from '../../../../components/game/Timer'
import { ScoreBoard } from '../../../../components/game/ScoreBoard'
import { ForeheadDisplay } from '../../../../components/game/ForeheadDisplay'
import { GameOverScreen } from '../../../../components/game/GameOverScreen'
import { ConnectionStatus } from '../../../../components/game/ConnectionStatus'
import { WaitingOverlay } from '../../../../components/game/WaitingOverlay'
import { Button } from '../../../../components/ui/Button'
import { Spinner } from '../../../../components/ui/Spinner'
import { createClient } from '../../../../lib/supabase/client'
import { GAME_CONFIG, CATEGORIES } from '../../../../lib/constants'
import { CharacterAvatar } from '../../../../components/game/CharacterAvatar'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../../lib/theme'
import type { Database } from '../../../../lib/types/database'
import type { RoomEvent } from '../../../../lib/types/multiplayer'

type BibleScene = Database['public']['Tables']['bible_scenes']['Row']

export default function CharadesScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const game = useGameStore()
  const charades = useCharadesStore()
  const room = useRoomStore()
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock()

  const isHost = room.isHost()
  const myUserId = room.myUserId
  const activePlayerId = game.players[game.currentPlayerIndex]?.id
  const isActivePlayer = myUserId === activePlayerId
  const currentPlayer = game.players[game.currentPlayerIndex]
  const [showRotateScreen, setShowRotateScreen] = useState(false)
  const [tiltResult, setTiltResult] = useState<'correct' | 'skip' | null>(null)
  const tiltResultTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const tiltFlashScale = useRef(new Animated.Value(0)).current
  const tiltFlashOpacity = useRef(new Animated.Value(0)).current
  const tiltFlashTextScale = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start()
  }, [game.phase])

  // Load content (host only uses this to drive game)
  const { data: scenes, loading: contentLoading } = useGameContent<BibleScene>({
    table: 'bible_scenes',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  const { requestPermission, isSupported } = useDeviceOrientation({
    enabled: false,
  })

  // Handle game events from room
  const handleGameEvent = useCallback((event: RoomEvent) => {
    switch (event.type) {
      case 'charades:scene':
        // Non-host: show the scene info
        charades.syncState({
          roundScenes: [{ id: event.scene.id, title: event.scene.title, description: event.scene.description } as any],
          currentSceneIndex: 0,
        })
        break
      case 'charades:tilt':
        // Only host processes tilt events (prevents double-counting)
        if (isHost) {
          if (event.result === 'correct') {
            charades.markCorrect()
            game.updateScore(event.playerId, 1)
          } else {
            charades.markSkipped()
          }
          // If host ran out of scenes, end the turn early
          if (!useCharadesStore.getState().getCurrentScene()) {
            const gs = useGameStore.getState()
            gs.setPhase('turn_end')
            sendEvent({ type: 'timer:end' })
            sendEvent({
              type: 'game:state',
              state: {
                phase: 'turn_end',
                players: useGameStore.getState().players,
                currentPlayerIndex: gs.currentPlayerIndex,
              },
            })
          }
        }
        break
      case 'charades:start_turn':
        // Active player receives this — show rotate screen
        if ((event as any).activePlayerId === myUserId) {
          setShowRotateScreen(true)
        }
        break
      case 'charades:player_ready':
        // Host receives this — active player is ready, begin playing
        if (isHost) {
          beginPlayingRef.current()
        }
        break
      case 'timer:start':
        game.setPhase('playing')
        break
      case 'timer:end':
        game.setPhase('turn_end')
        break
      case 'game:state':
        game.syncFromRoom(event.state as any)
        break
      case 'game:over':
        game.setPhase('game_over')
        break
    }
  }, [isHost, myUserId])

  const { sendEvent } = useMultiplayerGame(handleGameEvent)

  const handleTimerComplete = useCallback(() => {
    releaseWakeLock()
    if (isHost) {
      // Score already tracked per-tilt — no bulk update here
      const gs = useGameStore.getState()
      gs.setPhase('turn_end')
      sendEvent({ type: 'timer:end' })
      sendEvent({
        type: 'game:state',
        state: {
          phase: 'turn_end',
          players: useGameStore.getState().players,
          currentPlayerIndex: gs.currentPlayerIndex,
        },
      })
    }
  }, [releaseWakeLock, isHost, sendEvent])

  const timer = useTimer({
    initialTime: game.timerDuration || GAME_CONFIG.CHARADES.DEFAULT_TIMER,
    onComplete: handleTimerComplete,
  })

  const showTiltFlash = useCallback((result: 'correct' | 'skip') => {
    setTiltResult(result)
    if (tiltResultTimer.current) clearTimeout(tiltResultTimer.current)

    // Reset animation values
    tiltFlashScale.setValue(0)
    tiltFlashOpacity.setValue(1)
    tiltFlashTextScale.setValue(0.3)

    // Animate in: scale burst + text bounce
    Animated.parallel([
      // Background scales in with overshoot
      Animated.spring(tiltFlashScale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      // Text bounces in
      Animated.spring(tiltFlashTextScale, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start()

    // Fade out after delay
    tiltResultTimer.current = setTimeout(() => {
      Animated.timing(tiltFlashOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setTiltResult(null))
    }, 1200)
  }, [])

  const handleCorrect = useCallback(() => {
    showTiltFlash('correct')
    // Only host advances scenes locally (non-host waits for host broadcast)
    if (isHost) charades.markCorrect()
    if (isActivePlayer) {
      sendEvent({ type: 'charades:tilt', result: 'correct', playerId: myUserId! })
      // Host won't receive own broadcast back, so score directly
      if (isHost) {
        game.updateScore(myUserId!, 1)
      }
    }
  }, [isHost, isActivePlayer, myUserId, sendEvent, showTiltFlash])

  const handleSkip = useCallback(() => {
    showTiltFlash('skip')
    if (isHost) charades.markSkipped()
    if (isActivePlayer) {
      sendEvent({ type: 'charades:tilt', result: 'skip', playerId: myUserId! })
    }
  }, [isHost, isActivePlayer, myUserId, sendEvent, showTiltFlash])

  // Tilt forward (nod) = correct, tilt back (lean) = skip
  useDeviceOrientation({
    onTiltDown: handleSkip,
    onTiltUp: handleCorrect,
    enabled: game.phase === 'playing' && isActivePlayer,
  })

  useEffect(() => {
    game.setGameType('charades')
    // Set timer based on difficulty
    const difficultyTimer = GAME_CONFIG.CHARADES.TIMER_BY_DIFFICULTY[game.difficulty] || GAME_CONFIG.CHARADES.DEFAULT_TIMER
    game.setTimerDuration(room.settings?.timerDuration || difficultyTimer)
    requestPermission()
    return () => {
      game.reset()
      charades.reset()
      if (tiltResultTimer.current) clearTimeout(tiltResultTimer.current)
    }
  }, [])

  useEffect(() => {
    if (scenes.length > 0 && isHost) {
      charades.setScenes(scenes)
    }
  }, [scenes, isHost])

  const startTurn = async () => {
    if (!isHost) return
    await requestWakeLock()
    charades.startRound()

    if (isActivePlayer) {
      // Host is the active player — show rotate screen locally
      setShowRotateScreen(true)
    } else {
      // Active player is someone else — tell them to show rotate screen
      sendEvent({ type: 'charades:start_turn', activePlayerId: activePlayerId! } as any)
    }
  }

  const beginPlaying = () => {
    setShowRotateScreen(false)
    if (isHost) {
      // Host starts the round
      game.setPhase('playing')
      timer.reset()
      timer.start()

      const scene = useCharadesStore.getState().getCurrentScene()
      if (scene) {
        sendEvent({
          type: 'charades:scene',
          scene: { id: scene.id, title: scene.title, description: scene.description },
          activePlayerId: activePlayerId!,
        })
      }
      sendEvent({ type: 'timer:start', duration: game.timerDuration, startedAt: Date.now() })
    } else {
      // Non-host active player tapped ready — tell host to begin
      sendEvent({ type: 'charades:player_ready', playerId: myUserId! } as any)
    }
  }

  // Stable ref so event handler can call beginPlaying
  const beginPlayingRef = useRef(beginPlaying)
  beginPlayingRef.current = beginPlaying

  const nextTurn = () => {
    if (!isHost) return
    const gs = useGameStore.getState()
    gs.nextTurn()
    charades.reset()
    gs.setPhase('ready')
    const updated = useGameStore.getState()
    sendEvent({
      type: 'game:state',
      state: {
        phase: 'ready',
        players: updated.players,
        currentPlayerIndex: updated.currentPlayerIndex,
      },
    })
  }

  const currentScene = charades.getCurrentScene()

  // Broadcast new scene when it changes (host only)
  useEffect(() => {
    if (isHost && game.phase === 'playing' && currentScene) {
      sendEvent({
        type: 'charades:scene',
        scene: { id: currentScene.id, title: currentScene.title, description: currentScene.description },
        activePlayerId: activePlayerId!,
      })
    }
  }, [currentScene?.id])

  // Handle running out of scenes (must be before any early returns to avoid hooks violation)
  const ranOutOfScenes = game.phase === 'playing' && isActivePlayer && !currentScene
  useEffect(() => {
    if (!ranOutOfScenes) return
    releaseWakeLock()
    timer.pause()
    if (isHost) {
      // Score already tracked per-tilt — just end the turn
      game.setPhase('turn_end')
      sendEvent({ type: 'timer:end' })
      sendEvent({
        type: 'game:state',
        state: {
          phase: 'turn_end',
          players: useGameStore.getState().players,
          currentPlayerIndex: game.currentPlayerIndex,
        },
      })
    }
  }, [ranOutOfScenes])

  // Log game session to Supabase
  const gameLoggedRef = useRef(false)
  const logGameSession = useCallback(async () => {
    if (gameLoggedRef.current) return
    gameLoggedRef.current = true

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const gs = useGameStore.getState()
      const cs = useCharadesStore.getState()
      const players = gs.players
      const winner = players.reduce((a, b) => (a.score > b.score ? a : b), players[0])
      const finalScores: Record<string, number> = {}
      players.forEach((p) => { finalScores[p.name] = p.score })

      const durationSeconds = gs.startTime ? Math.floor((Date.now() - gs.startTime) / 1000) : 0

      // Get user's church_id
      const { data: profile } = await supabase
        .from('users' as any)
        .select('church_id')
        .eq('id', user.id)
        .single()

      // Insert game session
      await (supabase.from('game_sessions' as any) as any).insert({
        game_type: 'charades',
        host_user_id: user.id,
        church_id: (profile as any)?.church_id || null,
        players: players.map((p) => ({ id: p.id, name: p.name, score: p.score, team: p.team })),
        winner: winner?.name || null,
        final_scores: finalScores,
        duration_seconds: durationSeconds,
      })

      // Upsert game stats for the current user
      const myPlayer = players.find((p) => p.id === user.id)
      const myScore = myPlayer?.score || 0
      const didWin = winner?.id === user.id

      const { data: existingStats } = await supabase
        .from('game_stats' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('game_type', 'charades')
        .single()

      if (existingStats) {
        const stats = existingStats as any
        await (supabase.from('game_stats' as any) as any)
          .update({
            games_played: stats.games_played + 1,
            games_won: stats.games_won + (didWin ? 1 : 0),
            total_score: stats.total_score + myScore,
            best_score: Math.max(stats.best_score, myScore),
            current_streak: didWin ? stats.current_streak + 1 : 0,
            best_streak: didWin
              ? Math.max(stats.best_streak, stats.current_streak + 1)
              : stats.best_streak,
          })
          .eq('user_id', user.id)
          .eq('game_type', 'charades')
      } else {
        await (supabase.from('game_stats' as any) as any).insert({
          user_id: user.id,
          game_type: 'charades',
          games_played: 1,
          games_won: didWin ? 1 : 0,
          total_score: myScore,
          best_score: myScore,
          current_streak: didWin ? 1 : 0,
          best_streak: didWin ? 1 : 0,
        })
      }
    } catch (err) {
      console.warn('Failed to log game session:', err)
    }
  }, [])

  // Log game when it ends
  useEffect(() => {
    if (game.phase === 'game_over') {
      logGameSession()
    }
  }, [game.phase])

  const handleExit = () => {
    Alert.alert(
      'Leave Game',
      'Are you sure you want to leave?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            releaseWakeLock()
            timer.pause()
            room.leaveRoom()
            game.reset()
            charades.reset()
            router.replace('/(app)/games')
          },
        },
      ]
    )
  }

  if (contentLoading) {
    return (
      <View style={styles.center}>
        <Spinner size="lg" />
        <Text style={styles.loadingText}>Loading Bible scenes...</Text>
      </View>
    )
  }

  if (!contentLoading && scenes.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={56} color={colors.creamDim} />
        <Text style={styles.errorTitle}>No Content Found</Text>
        <Text style={styles.errorText}>
          No Bible scenes are available. Make sure seed data has been loaded.
        </Text>
        <Button onPress={() => router.back()} variant="outline" style={{ marginTop: spacing.lg }}>
          Go Back
        </Button>
      </View>
    )
  }

  // Rotate Phone Interstitial — must be checked BEFORE the ready phase
  if (showRotateScreen) {
    return (
      <Pressable style={styles.rotateContainer} onPress={beginPlaying}>
        <Pressable style={[styles.exitButton, { top: insets.top + spacing.sm }]} onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={22} color="rgba(255,255,255,0.7)" />
        </Pressable>
        <View style={styles.rotateContent}>
          <Ionicons name="phone-landscape-outline" size={80} color={colors.gold} />
          <Text style={styles.rotateTitle}>Rotate Your Phone</Text>
          <Text style={styles.rotateSubtext}>
            Hold the phone on your forehead in landscape mode
          </Text>
          <View style={styles.rotateTiltRow}>
            <View style={[styles.rotateTiltCard, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="arrow-down" size={20} color={colors.green} />
              <Text style={[styles.rotateTiltText, { color: '#065f46' }]}>Tilt forward = Correct</Text>
            </View>
            <View style={[styles.rotateTiltCard, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="arrow-up" size={20} color={colors.red} />
              <Text style={[styles.rotateTiltText, { color: '#991b1b' }]}>Tilt back = Skip</Text>
            </View>
          </View>
          <Text style={styles.rotateTap}>Tap anywhere when ready</Text>
        </View>
      </Pressable>
    )
  }

  // Ready Phase
  if ((game.phase === 'setup' || game.phase === 'ready') && currentPlayer) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={[styles.exitButton, { top: insets.top + spacing.sm }]} onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={22} color={colors.creamDim} />
        </Pressable>
        <ScrollView style={styles.container} contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md + 32 }]}>
        <Animated.View style={[styles.readyContainer, { opacity: fadeAnim }]}>
          <ConnectionStatus isConnected={room.isConnected} playerCount={room.playerCount()} />

          <View style={styles.turnCard}>
            <CharacterAvatar size={72} style={{ marginBottom: spacing.sm }} />
            <Text style={styles.turnLabel}>
              {isActivePlayer ? "It's Your Turn!" : `${currentPlayer.name}'s Turn`}
            </Text>
            <Text style={styles.turnSubtext}>
              {isActivePlayer
                ? 'Put the phone on your forehead!'
                : `Give clues to ${currentPlayer.name}!`}
            </Text>
          </View>

          {isActivePlayer && (
            <View style={styles.tiltHints}>
              <View style={[styles.tiltHintCard, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="arrow-down" size={24} color={colors.green} />
                <Text style={[styles.tiltHintText, { color: '#065f46' }]}>Tilt forward = Correct</Text>
              </View>
              <View style={[styles.tiltHintCard, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="arrow-up" size={24} color={colors.red} />
                <Text style={[styles.tiltHintText, { color: '#991b1b' }]}>Tilt back = Skip</Text>
              </View>
            </View>
          )}

          {isHost && (
            <Button onPress={startTurn} size="lg" fullWidth>
              Ready — Start!
            </Button>
          )}

          {!isHost && !isActivePlayer && (
            <View style={styles.waitingBanner}>
              <Text style={styles.waitingText}>Waiting for host to start the turn...</Text>
            </View>
          )}

          <View style={styles.scoreSection}>
            <Text style={styles.sectionTitle}>Scores</Text>
            <ScoreBoard players={game.players} currentPlayerId={activePlayerId} />
          </View>
        </Animated.View>
      </ScrollView>
      </View>
    )
  }

  // Playing Phase — Active Player sees forehead display
  if (game.phase === 'playing' && isActivePlayer && currentScene) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <ForeheadDisplay text={currentScene.title} subtitle={currentScene.description} />
        <View style={[styles.timerOverlay, { top: insets.top + spacing.sm }]}>
          <Timer time={timer.time} maxTime={game.timerDuration} size="sm" />
        </View>
        {tiltResult && (
          <Animated.View
            style={[
              styles.tiltFlash,
              {
                backgroundColor: tiltResult === 'correct' ? '#22c55e' : '#ef4444',
                opacity: tiltFlashOpacity,
                transform: [{ scale: tiltFlashScale }],
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.tiltFlashText,
                { transform: [{ scale: tiltFlashTextScale }] },
              ]}
            >
              {tiltResult === 'correct' ? 'CORRECT!' : 'PASS'}
            </Animated.Text>
            {tiltResult === 'correct' && (
              <Text style={styles.tiltFlashEmoji}>🎉</Text>
            )}
          </Animated.View>
        )}
      </View>
    )
  }

  // Playing Phase — Active Player waiting for scene from host
  if (game.phase === 'playing' && isActivePlayer && !currentScene) {
    return (
      <View style={[styles.spectatorContainer, { paddingTop: insets.top + spacing.lg }]}>
        <Pressable style={[styles.exitButton, { top: insets.top + spacing.sm }]} onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={22} color={colors.creamDim} />
        </Pressable>
        <View style={styles.spectatorCard}>
          <CharacterAvatar size={64} style={{ marginBottom: spacing.md }} />
          <Text style={styles.spectatorTitle}>Get Ready!</Text>
          <Text style={styles.spectatorDesc}>Hold the phone on your forehead</Text>
        </View>
        <View style={styles.timerCenter}>
          <Timer time={timer.time} maxTime={game.timerDuration} size="lg" />
        </View>
      </View>
    )
  }

  // Playing Phase — Spectators see clue info
  if (game.phase === 'playing' && !isActivePlayer) {
    return (
      <View style={[styles.spectatorContainer, { paddingTop: insets.top + spacing.lg }]}>
        <Pressable style={[styles.exitButton, { top: insets.top + spacing.sm }]} onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={22} color={colors.creamDim} />
        </Pressable>
        <ConnectionStatus isConnected={room.isConnected} />
        <View style={styles.spectatorCard}>
          <CharacterAvatar size={64} style={{ marginBottom: spacing.md }} />
          {currentScene ? (
            <>
              <Text style={styles.spectatorTitle}>{currentScene.title}</Text>
              <Text style={styles.spectatorDesc}>{currentScene.description}</Text>
            </>
          ) : (
            <Text style={styles.spectatorTitle}>Waiting for scene...</Text>
          )}
          <View style={styles.spectatorDivider} />
          <Text style={styles.spectatorHint}>
            Give clues to {currentPlayer?.name}!
          </Text>
        </View>
        <View style={styles.timerCenter}>
          <Timer time={timer.time} maxTime={game.timerDuration} size="lg" />
        </View>
      </View>
    )
  }

  // Turn End
  if (game.phase === 'turn_end' && currentPlayer) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable style={[styles.exitButton, { top: insets.top + spacing.sm }]} onPress={handleExit} hitSlop={12}>
          <Ionicons name="close" size={22} color={colors.creamDim} />
        </Pressable>
        <ScrollView style={styles.container} contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md + 32 }]}>
        <Animated.View style={[styles.turnEndContainer, { opacity: fadeAnim }]}>
          <Text style={styles.heading}>Time's Up!</Text>
          <View style={styles.bigScoreCard}>
            <Text style={styles.bigScore}>{charades.correctCount}</Text>
            <Text style={styles.bigScoreLabel}>correct</Text>
          </View>
          <Text style={styles.turnSubtext}>
            {currentPlayer.name} got {charades.correctCount} correct, skipped {charades.skippedCount}
          </Text>
          <ScoreBoard players={game.players} currentPlayerId={activePlayerId} />
          {isHost && (
            <>
              <Button onPress={nextTurn} size="lg" fullWidth>
                Next Player
              </Button>
              <Button onPress={() => {
                game.setPhase('game_over')
                sendEvent({ type: 'game:over', scores: game.players.map(p => ({ userId: p.id, displayName: p.name, score: p.score })), winnerId: game.players.reduce((a, b) => a.score > b.score ? a : b, game.players[0]).id })
              }} variant="outline" size="lg" fullWidth>
                End Game
              </Button>
            </>
          )}
          {!isHost && (
            <View style={styles.waitingBanner}>
              <Text style={styles.waitingText}>Waiting for host...</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
      </View>
    )
  }

  // Game Over
  if (game.phase === 'game_over') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}>
        <GameOverScreen
          winner={game.players.reduce((a, b) => (a.score > b.score ? a : b), game.players[0])}
          players={game.players}
          onPlayAgain={() => {
            gameLoggedRef.current = false
            game.reset()
            charades.reset()
            game.setGameType('charades')
            game.setTimerDuration(GAME_CONFIG.CHARADES.DEFAULT_TIMER)
            router.replace('/(app)/games/lobby')
          }}
          onExit={() => {
            room.leaveRoom()
            router.replace('/(app)/games')
          }}
        />
      </ScrollView>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
    padding: spacing.xl,
  },
  loadingText: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    marginTop: spacing.md,
  },
  errorTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  heading: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    textAlign: 'center',
  },
  readyContainer: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: spacing.md,
  },
  turnCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    ...shadows.lg,
  },
  turnEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  turnLabel: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
  },
  turnSubtext: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  tiltHints: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  tiltHintCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  tiltHintText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  scoreSection: {
    width: '100%',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
  },
  waitingBanner: {
    backgroundColor: colors.gold + '10',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold + '30',
  },
  waitingText: {
    fontSize: fontSize.md,
    color: colors.gold,
    fontWeight: fontWeight.medium,
  },
  timerOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 60,
  },
  spectatorContainer: {
    flex: 1,
    backgroundColor: colors.navy,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.lg,
  },
  spectatorCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    ...shadows.lg,
  },
  spectatorEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  spectatorTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
  },
  spectatorDesc: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  spectatorDivider: {
    height: 1,
    backgroundColor: colors.navyLight,
    width: '80%',
    marginVertical: spacing.md,
  },
  spectatorHint: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.gold,
  },
  timerCenter: {
    marginTop: spacing.lg,
  },
  turnEndContainer: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  bigScoreCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  bigScore: {
    fontSize: 64,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
  },
  bigScoreLabel: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    marginTop: spacing.xs,
  },
  rotateContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0B1437',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
  },
  rotateContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  rotateTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#ffffff',
    textAlign: 'center',
  },
  rotateSubtext: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 26,
  },
  rotateTiltRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  rotateTiltCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
  },
  rotateTiltText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  rotateTap: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.35)',
    marginTop: spacing.lg,
  },
  exitButton: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 50,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tiltFlash: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  tiltFlashText: {
    fontSize: 52,
    fontWeight: fontWeight.extrabold,
    color: '#ffffff',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  tiltFlashEmoji: {
    fontSize: 64,
    marginTop: spacing.md,
  },
})
