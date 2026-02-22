import { useEffect, useCallback, useState, useRef } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useGameStore } from '../../../../stores/gameStore'
import { useWhoAmIStore } from '../../../../stores/whoAmIStore'
import { useRoomStore } from '../../../../stores/roomStore'
import { useDeviceOrientation } from '../../../../hooks/useDeviceOrientation'
import { useWakeLock } from '../../../../hooks/useWakeLock'
import { useGameContent } from '../../../../hooks/useGameContent'
import { useMultiplayerGame } from '../../../../hooks/useMultiplayerGame'
import { ScoreBoard } from '../../../../components/game/ScoreBoard'
import { ForeheadDisplay } from '../../../../components/game/ForeheadDisplay'
import { GameOverScreen } from '../../../../components/game/GameOverScreen'
import { ConnectionStatus } from '../../../../components/game/ConnectionStatus'
import { Button } from '../../../../components/ui/Button'
import { Spinner } from '../../../../components/ui/Spinner'
import { GAME_CONFIG, CATEGORIES } from '../../../../lib/constants'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../../lib/theme'
import type { Database } from '../../../../lib/types/database'
import type { RoomEvent } from '../../../../lib/types/multiplayer'

type BibleCharacter = Database['public']['Tables']['bible_characters']['Row']

export default function WhoAmIScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const game = useGameStore()
  const whoAmI = useWhoAmIStore()
  const room = useRoomStore()
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock()
  const [showHints, setShowHints] = useState(false)

  const isHost = room.isHost()
  const myUserId = room.myUserId
  const activePlayerId = game.players[game.currentPlayerIndex]?.id
  const isActivePlayer = myUserId === activePlayerId
  const currentPlayer = game.players[game.currentPlayerIndex]
  const activeTeam = currentPlayer?.team

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    fadeAnim.setValue(0)
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start()
  }, [game.phase])

  const { data: characters, loading: contentLoading } = useGameContent<BibleCharacter>({
    table: 'bible_characters',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  const { requestPermission, isSupported } = useDeviceOrientation({ enabled: false })

  // Handle multiplayer events
  const handleGameEvent = useCallback((event: RoomEvent) => {
    switch (event.type) {
      case 'whoami:character':
        whoAmI.syncState({
          characters: [{ id: event.character.id, name: event.character.name, hints: event.character.hints } as any],
          currentCharacterIndex: 0,
          hintsRevealed: 0,
        })
        break
      case 'game:state':
        game.syncFromRoom(event.state as any)
        break
      case 'game:over':
        game.setPhase('game_over')
        break
    }
  }, [])

  const { sendEvent } = useMultiplayerGame(handleGameEvent)

  const handleCorrect = useCallback(() => {
    if (isHost) {
      const cp = game.players[game.currentPlayerIndex]
      if (cp && cp.team) {
        const teamPlayers = game.players.filter((p) => p.team === cp.team)
        teamPlayers.forEach((p) => game.updateScore(p.id, 1))
      }
    }
    whoAmI.nextCharacter()
    setShowHints(false)

    if (isHost) {
      const teamScores = useGameStore.getState().getTeamScores()
      const ws = game.winScore
      if (teamScores.A >= ws || teamScores.B >= ws) {
        releaseWakeLock()
        game.setPhase('game_over')
        const winTeam = teamScores.A >= ws ? 'Team A' : 'Team B'
        sendEvent({
          type: 'game:over',
          scores: useGameStore.getState().players.map((p) => ({ userId: p.id, displayName: p.name, score: p.score })),
          winnerId: winTeam,
        })
      } else {
        game.nextTurn()
        game.setPhase('ready')
        releaseWakeLock()
        const state = useGameStore.getState()
        sendEvent({
          type: 'game:state',
          state: { phase: 'ready', players: state.players, currentPlayerIndex: state.currentPlayerIndex },
        })
        // Send next character
        const nextChar = useWhoAmIStore.getState().getCurrentCharacter()
        if (nextChar) {
          sendEvent({
            type: 'whoami:character',
            character: { id: nextChar.id, name: nextChar.name, hints: nextChar.hints },
            activePlayerId: state.players[state.currentPlayerIndex]?.id || '',
            activeTeam: (state.players[state.currentPlayerIndex]?.team || 'A') as 'A' | 'B',
          })
        }
      }
    }
  }, [game, whoAmI, releaseWakeLock, isHost])

  const handleSkip = useCallback(() => {
    whoAmI.nextCharacter()
    setShowHints(false)
    if (isHost) {
      game.nextTurn()
      game.setPhase('ready')
      releaseWakeLock()
      const state = useGameStore.getState()
      sendEvent({
        type: 'game:state',
        state: { phase: 'ready', players: state.players, currentPlayerIndex: state.currentPlayerIndex },
      })
      const nextChar = useWhoAmIStore.getState().getCurrentCharacter()
      if (nextChar) {
        sendEvent({
          type: 'whoami:character',
          character: { id: nextChar.id, name: nextChar.name, hints: nextChar.hints },
          activePlayerId: state.players[state.currentPlayerIndex]?.id || '',
          activeTeam: (state.players[state.currentPlayerIndex]?.team || 'A') as 'A' | 'B',
        })
      }
    }
  }, [game, whoAmI, releaseWakeLock, isHost])

  useDeviceOrientation({
    onTiltDown: handleCorrect,
    onTiltUp: handleSkip,
    enabled: game.phase === 'playing' && isActivePlayer,
  })

  useEffect(() => {
    game.setGameType('who_am_i')
    game.setWinScore(room.settings?.winScore || GAME_CONFIG.WHO_AM_I.WIN_SCORE)
    requestPermission()
    return () => {
      game.reset()
      whoAmI.reset()
    }
  }, [])

  useEffect(() => {
    if (characters.length > 0 && isHost) {
      whoAmI.setCharacters(characters)
    }
  }, [characters, isHost])

  const startTurn = async () => {
    if (!isHost) return
    await requestWakeLock()
    setShowHints(false)
    game.setPhase('playing')

    const currentChar = whoAmI.getCurrentCharacter()
    if (currentChar) {
      sendEvent({
        type: 'whoami:character',
        character: { id: currentChar.id, name: currentChar.name, hints: currentChar.hints },
        activePlayerId: activePlayerId!,
        activeTeam: (activeTeam || 'A') as 'A' | 'B',
      })
    }
    sendEvent({
      type: 'game:state',
      state: { phase: 'playing', players: game.players, currentPlayerIndex: game.currentPlayerIndex },
    })
  }

  const currentCharacter = whoAmI.getCurrentCharacter()
  const teamScores = game.getTeamScores()
  const winner = teamScores.A >= game.winScore ? 'Team A' : teamScores.B >= game.winScore ? 'Team B' : null

  if (contentLoading) {
    return (
      <View style={styles.center}>
        <Spinner size="lg" />
        <Text style={styles.loadingText}>Loading Bible characters...</Text>
      </View>
    )
  }

  if (!contentLoading && characters.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={56} color={colors.creamDim} />
        <Text style={styles.errorTitle}>No Content Found</Text>
        <Text style={styles.errorText}>No Bible characters are available.</Text>
        <Button onPress={() => router.back()} variant="outline" style={{ marginTop: spacing.lg }}>
          Go Back
        </Button>
      </View>
    )
  }

  // Ready Phase
  if ((game.phase === 'setup' || game.phase === 'ready') && currentPlayer) {
    const myTeam = game.players.find((p) => p.id === myUserId)?.team
    const isMyTeamsTurn = myTeam === activeTeam

    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}>
        <Animated.View style={{ opacity: fadeAnim, gap: spacing.lg }}>
          <ConnectionStatus isConnected={room.isConnected} playerCount={room.playerCount()} />

          <ScoreBoard players={game.players} showTeams winScore={game.winScore} />

          <View style={styles.turnCard}>
            <Text style={styles.turnEmoji}>🤔</Text>
            <Text style={styles.turnSubtext}>
              {activeTeam === 'A' ? "Team A's" : "Team B's"} turn
            </Text>
            <Text style={styles.turnLabel}>{currentPlayer.name}</Text>
            {isActivePlayer ? (
              <Text style={styles.hint}>Put the phone on your forehead. Your team will give you clues!</Text>
            ) : isMyTeamsTurn ? (
              <Text style={styles.hint}>Get ready to give clues to {currentPlayer.name}!</Text>
            ) : (
              <Text style={styles.hint}>Waiting... {activeTeam === 'A' ? 'Team A' : 'Team B'} is playing</Text>
            )}
          </View>

          {isActivePlayer && (
            <View style={styles.tiltHints}>
              <View style={[styles.tiltHintCard, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="arrow-down" size={24} color={colors.green} />
                <Text style={[styles.tiltHintText, { color: '#065f46' }]}>Correct</Text>
              </View>
              <View style={[styles.tiltHintCard, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="arrow-up" size={24} color={colors.red} />
                <Text style={[styles.tiltHintText, { color: '#991b1b' }]}>Skip</Text>
              </View>
            </View>
          )}

          {isHost && (
            <Button onPress={startTurn} size="lg" fullWidth>
              Ready — Show Character!
            </Button>
          )}
          {!isHost && (
            <View style={styles.waitingBanner}>
              <Text style={styles.waitingText}>Waiting for host to start...</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    )
  }

  // Playing — Active player sees forehead display
  if (game.phase === 'playing' && isActivePlayer && currentCharacter) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <ForeheadDisplay text={currentCharacter.name} />
        <View style={styles.hintArea}>
          <Pressable
            onPress={() => {
              whoAmI.revealHint()
              setShowHints(true)
            }}
            style={styles.hintButton}
          >
            <Text style={styles.hintButtonText}>
              Show Hint ({whoAmI.hintsRevealed}/3)
            </Text>
          </Pressable>
          {showHints && whoAmI.getVisibleHints().length > 0 && (
            <View style={styles.hintsList}>
              {whoAmI.getVisibleHints().map((h, i) => (
                <Text key={i} style={styles.hintText}>{i + 1}. {h}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    )
  }

  // Playing — Teammates see character name + hints
  if (game.phase === 'playing' && !isActivePlayer) {
    const myTeam = game.players.find((p) => p.id === myUserId)?.team
    const isMyTeamsTurn = myTeam === activeTeam

    return (
      <View style={[styles.spectatorContainer, { paddingTop: insets.top + spacing.lg }]}>
        <ConnectionStatus isConnected={room.isConnected} />
        {isMyTeamsTurn && currentCharacter ? (
          <View style={styles.spectatorCard}>
            <Text style={styles.spectatorEmoji}>🤔</Text>
            <Text style={styles.spectatorCharName}>{currentCharacter.name}</Text>
            <View style={styles.spectatorDivider} />
            <Text style={styles.spectatorHintLabel}>Give clues to {currentPlayer?.name}!</Text>
            {currentCharacter.hints.length > 0 && (
              <View style={styles.hintsContainer}>
                <Text style={styles.hintsTitle}>Hints you can use:</Text>
                {currentCharacter.hints.map((h, i) => (
                  <Text key={i} style={styles.hintItem}>• {h}</Text>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.spectatorCard}>
            <Text style={styles.spectatorEmoji}>⏳</Text>
            <Text style={styles.spectatorTitle}>
              {activeTeam === 'A' ? 'Team A' : 'Team B'} is playing
            </Text>
            <Text style={styles.spectatorSubtitle}>
              {currentPlayer?.name} is guessing...
            </Text>
          </View>
        )}
        <ScoreBoard players={game.players} showTeams winScore={game.winScore} />
      </View>
    )
  }

  // Ran out of characters
  if (game.phase === 'playing' && !currentCharacter) {
    releaseWakeLock()
    if (isHost) {
      game.nextTurn()
      game.setPhase('ready')
    }
    return null
  }

  // Game Over
  if (game.phase === 'game_over') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}>
        <GameOverScreen
          winner={winner}
          players={game.players}
          onPlayAgain={() => {
            game.reset()
            whoAmI.reset()
            game.setGameType('who_am_i')
            game.setWinScore(GAME_CONFIG.WHO_AM_I.WIN_SCORE)
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
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
    padding: spacing.xl,
  },
  loadingText: { color: colors.creamDim, fontSize: fontSize.sm, marginTop: spacing.md },
  errorTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.cream, marginTop: spacing.md },
  errorText: { fontSize: fontSize.sm, color: colors.creamDim, textAlign: 'center', marginTop: spacing.sm },
  turnCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  turnEmoji: { fontSize: 48, marginBottom: spacing.sm },
  turnLabel: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
  },
  turnSubtext: {
    fontSize: fontSize.lg,
    color: colors.creamDim,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  tiltHints: {
    flexDirection: 'row',
    gap: spacing.md,
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
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  waitingBanner: {
    backgroundColor: colors.gold + '10',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold + '30',
  },
  waitingText: {
    fontSize: fontSize.md,
    color: colors.gold,
    fontWeight: fontWeight.medium,
  },
  hintArea: {
    position: 'absolute',
    bottom: spacing.xxl + 20,
    left: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
    zIndex: 60,
  },
  hintButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  hintButtonText: { color: colors.cream, fontSize: fontSize.sm, fontWeight: fontWeight.medium },
  hintsList: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    width: '100%',
    ...shadows.sm,
  },
  hintText: { color: colors.cream, fontSize: fontSize.sm, marginBottom: spacing.xs },
  spectatorContainer: {
    flex: 1,
    backgroundColor: colors.navy,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  spectatorCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  spectatorEmoji: { fontSize: 48, marginBottom: spacing.md },
  spectatorCharName: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    textAlign: 'center',
  },
  spectatorTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
  },
  spectatorSubtitle: {
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
  spectatorHintLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  hintsContainer: {
    width: '100%',
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  hintsTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    marginBottom: spacing.sm,
  },
  hintItem: {
    fontSize: fontSize.sm,
    color: colors.cream,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
})
