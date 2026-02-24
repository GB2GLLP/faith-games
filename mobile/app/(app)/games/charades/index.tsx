import { useEffect, useCallback, useRef, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Animated, Pressable, Alert } from 'react-native'
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
import { GAME_CONFIG, CATEGORIES } from '../../../../lib/constants'
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

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
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
        if (event.result === 'correct') {
          charades.markCorrect()
          if (isHost) {
            game.updateScore(event.playerId, 1)
          }
        } else {
          charades.markSkipped()
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
  }, [isHost])

  const { sendEvent } = useMultiplayerGame(handleGameEvent)

  const handleTimerComplete = useCallback(() => {
    releaseWakeLock()
    if (isHost) {
      const cp = game.players[game.currentPlayerIndex]
      if (cp) {
        game.updateScore(cp.id, charades.correctCount)
      }
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
  }, [game, charades.correctCount, releaseWakeLock, isHost])

  const timer = useTimer({
    initialTime: game.timerDuration || GAME_CONFIG.CHARADES.DEFAULT_TIMER,
    onComplete: handleTimerComplete,
  })

  const handleCorrect = useCallback(() => {
    charades.markCorrect()
    if (isActivePlayer) {
      sendEvent({ type: 'charades:tilt', result: 'correct', playerId: myUserId! })
    }
  }, [charades, isActivePlayer, myUserId])

  const handleSkip = useCallback(() => {
    charades.markSkipped()
    if (isActivePlayer) {
      sendEvent({ type: 'charades:tilt', result: 'skip', playerId: myUserId! })
    }
  }, [charades, isActivePlayer, myUserId])

  useDeviceOrientation({
    onTiltDown: handleCorrect,
    onTiltUp: handleSkip,
    enabled: game.phase === 'playing' && isActivePlayer,
  })

  useEffect(() => {
    game.setGameType('charades')
    game.setTimerDuration(room.settings?.timerDuration || GAME_CONFIG.CHARADES.DEFAULT_TIMER)
    requestPermission()
    return () => {
      game.reset()
      charades.reset()
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
    setShowRotateScreen(true)
  }

  const beginPlaying = () => {
    setShowRotateScreen(false)
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
  }

  const nextTurn = () => {
    if (!isHost) return
    game.nextTurn()
    charades.reset()
    game.setPhase('ready')
    sendEvent({
      type: 'game:state',
      state: {
        phase: 'ready',
        players: game.players,
        currentPlayerIndex: useGameStore.getState().currentPlayerIndex,
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
      const cp = game.players[game.currentPlayerIndex]
      if (cp) game.updateScore(cp.id, charades.correctCount)
      game.setPhase('turn_end')
      sendEvent({ type: 'timer:end' })
    }
  }, [ranOutOfScenes])

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
              <Text style={[styles.rotateTiltText, { color: '#065f46' }]}>Tilt down = Correct</Text>
            </View>
            <View style={[styles.rotateTiltCard, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="arrow-up" size={20} color={colors.red} />
              <Text style={[styles.rotateTiltText, { color: '#991b1b' }]}>Tilt up = Skip</Text>
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
            <Text style={styles.turnEmoji}>🎭</Text>
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
                <Text style={[styles.tiltHintText, { color: '#065f46' }]}>Tilt down = Correct</Text>
              </View>
              <View style={[styles.tiltHintCard, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="arrow-up" size={24} color={colors.red} />
                <Text style={[styles.tiltHintText, { color: '#991b1b' }]}>Tilt up = Skip</Text>
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
          <Text style={styles.spectatorEmoji}>🎭</Text>
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
})
