import { useEffect, useCallback, useRef, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Animated, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useGameStore } from '../../../../stores/gameStore'
import { useGuessVerseStore } from '../../../../stores/guessVerseStore'
import { useRoomStore } from '../../../../stores/roomStore'
import { useGameContent } from '../../../../hooks/useGameContent'
import { useMultiplayerGame } from '../../../../hooks/useMultiplayerGame'
import { ScoreBoard } from '../../../../components/game/ScoreBoard'
import { GameOverScreen } from '../../../../components/game/GameOverScreen'
import { GrabButton } from '../../../../components/game/GrabButton'
import { ConnectionStatus } from '../../../../components/game/ConnectionStatus'
import { Button } from '../../../../components/ui/Button'
import { Spinner } from '../../../../components/ui/Spinner'
import { GAME_CONFIG, CATEGORIES } from '../../../../lib/constants'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../../lib/theme'
import type { Database } from '../../../../lib/types/database'
import type { RoomEvent } from '../../../../lib/types/multiplayer'

type BibleVerse = Database['public']['Tables']['bible_verses']['Row']

export default function GuessVerseMultiplayerScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const game = useGameStore()
  const verse = useGuessVerseStore()
  const room = useRoomStore()
  const revealInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const grabQueue = useRef<Array<{ playerId: string; timestamp: number }>>([])
  const [answerResult, setAnswerResult] = useState<{
    correct: boolean
    reference: string
    points: number
    winnerName: string
  } | null>(null)

  // Word reveal animation values
  const wordAnimations = useRef<Animated.Value[]>([])

  const isHost = room.isHost()
  const myUserId = room.myUserId

  // ─── Event handler for multiplayer events ───

  const handleGameEvent = useCallback(
    (event: RoomEvent) => {
      switch (event.type) {
        case 'verse:reveal': {
          // Non-host: sync revealed word count from host
          if (!useRoomStore.getState().isHost()) {
            const verseState = useGuessVerseStore.getState()
            // If this is a new verse (different words), set them up
            if (
              event.words.length > 0 &&
              (verseState.words.length !== event.words.length ||
                verseState.words[0] !== event.words[0])
            ) {
              // New verse detected from host broadcast
              useGuessVerseStore.setState({
                words: event.words,
                revealedWordCount: event.revealedCount,
                revealPhase: 'revealing',
                grabbedByPlayerId: null,
              })
            } else {
              useGuessVerseStore.getState().setRevealedCount(event.revealedCount)
            }
            // Ensure we are in playing phase
            const gameState = useGameStore.getState()
            if (gameState.phase !== 'playing') {
              useGameStore.getState().setPhase('playing')
            }
          }
          break
        }

        case 'verse:grab': {
          // Host collects grab attempts
          if (useRoomStore.getState().isHost()) {
            grabQueue.current.push({
              playerId: event.playerId,
              timestamp: event.timestamp,
            })
          }
          break
        }

        case 'verse:grab_result': {
          // All devices: show who grabbed
          const verseStore = useGuessVerseStore.getState()
          if (verseStore.revealPhase === 'revealing') {
            useGuessVerseStore.setState({
              revealPhase: 'grabbed',
              grabbedByPlayerId: event.winnerId,
            })
          }
          setAnswerResult(null)
          break
        }

        case 'verse:result': {
          // All devices: show result and update scores
          const scores = event.scores
          scores.forEach(({ userId, score }) => {
            const player = useGameStore.getState().players.find((p) => p.id === userId)
            if (player) {
              const diff = score - player.score
              if (diff !== 0) {
                useGameStore.getState().updateScore(userId, diff)
              }
            }
          })

          setAnswerResult({
            correct: event.correct,
            reference: event.reference,
            points: event.correct ? useGuessVerseStore.getState().getPointsForTiming() : GAME_CONFIG.GUESS_VERSE.PENALTY,
            winnerName:
              useGameStore
                .getState()
                .players.find(
                  (p) => p.id === useGuessVerseStore.getState().grabbedByPlayerId
                )?.name || '',
          })

          if (event.correct) {
            useGuessVerseStore.getState().markAnswered()
          } else if (event.passedTo) {
            // Wrong answer: resume revealing for others
            setTimeout(() => {
              useGuessVerseStore.setState({
                revealPhase: 'revealing',
                grabbedByPlayerId: null,
              })
              setAnswerResult(null)
            }, 1500)
          }
          break
        }

        case 'game:state': {
          // Full state sync from host
          const state = event.state as Record<string, any>
          if (state.verseWords) {
            useGuessVerseStore.setState({
              words: state.verseWords,
              revealedWordCount: state.revealedWordCount ?? 0,
              revealPhase: state.revealPhase ?? 'revealing',
              grabbedByPlayerId: state.grabbedByPlayerId ?? null,
            })
          }
          if (state.gamePhase) {
            useGameStore.getState().setPhase(state.gamePhase)
          }
          if (state.players) {
            useGameStore.getState().setPlayers(state.players)
          }
          break
        }

        case 'game:over': {
          // Update final scores and show game over
          event.scores.forEach(({ userId, score }) => {
            const player = useGameStore.getState().players.find((p) => p.id === userId)
            if (player) {
              const diff = score - player.score
              if (diff !== 0) {
                useGameStore.getState().updateScore(userId, diff)
              }
            }
          })
          useGameStore.getState().setPhase('game_over')
          break
        }
      }
    },
    []
  )

  // ─── Setup multiplayer bridge ───

  const { sendEvent } = useMultiplayerGame(handleGameEvent)

  // ─── Fetch verse content ───

  const { data: verses, loading: contentLoading } = useGameContent<BibleVerse>({
    table: 'bible_verses',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  // ─── Initialize game ───

  useEffect(() => {
    game.setGameType('guess_verse')
    game.setWinScore(GAME_CONFIG.GUESS_VERSE.WIN_SCORE)
    return () => {
      game.reset()
      verse.reset()
      if (revealInterval.current) clearInterval(revealInterval.current)
    }
  }, [])

  // Load verses into store when fetched
  useEffect(() => {
    if (verses.length > 0) {
      verse.setVerses(verses)
    }
  }, [verses])

  // Initialize word animations when words change
  useEffect(() => {
    wordAnimations.current = verse.words.map(() => new Animated.Value(0))
  }, [verse.words.length])

  // Animate newly revealed words
  useEffect(() => {
    if (verse.revealedWordCount > 0 && wordAnimations.current[verse.revealedWordCount - 1]) {
      Animated.spring(wordAnimations.current[verse.revealedWordCount - 1], {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 80,
      }).start()
    }
  }, [verse.revealedWordCount])

  // ─── Host: Start word reveal interval ───

  const startRevealing = useCallback(() => {
    if (revealInterval.current) clearInterval(revealInterval.current)
    grabQueue.current = []

    revealInterval.current = setInterval(() => {
      const store = useGuessVerseStore.getState()
      if (store.revealedWordCount >= store.words.length || store.revealPhase !== 'revealing') {
        if (revealInterval.current) clearInterval(revealInterval.current)
        return
      }
      store.revealNextWord()

      const updated = useGuessVerseStore.getState()
      const currentVerse = updated.getCurrentVerse()

      // Broadcast reveal to all players
      sendEvent({
        type: 'verse:reveal',
        verseId: currentVerse?.id ?? '',
        words: updated.words,
        revealedCount: updated.revealedWordCount,
        totalWords: updated.words.length,
      })

      // After broadcasting, resolve any pending grabs
      resolveGrabQueue()
    }, GAME_CONFIG.GUESS_VERSE.REVEAL_INTERVAL_MS)
  }, [sendEvent])

  // ─── Host: Resolve grab queue (first-come wins) ───

  const resolveGrabQueue = useCallback(() => {
    const store = useGuessVerseStore.getState()
    if (store.revealPhase !== 'revealing' || grabQueue.current.length === 0) return

    // Sort by timestamp - earliest grab wins
    grabQueue.current.sort((a, b) => a.timestamp - b.timestamp)
    const winner = grabQueue.current[0]
    grabQueue.current = []

    if (!winner) return

    // Stop the reveal interval
    if (revealInterval.current) clearInterval(revealInterval.current)

    const success = store.grabVerse(winner.playerId)
    if (!success) return

    const currentVerse = store.getCurrentVerse()
    const winnerPlayer = useGameStore.getState().players.find((p) => p.id === winner.playerId)

    // Broadcast grab result to all players
    sendEvent({
      type: 'verse:grab_result',
      winnerId: winner.playerId,
      winnerName: winnerPlayer?.name ?? 'Player',
      reference: currentVerse?.reference ?? '',
      points: store.getPointsForTiming(),
    })
  }, [sendEvent])

  // ─── Host: Start the game ───

  const handleStartGame = useCallback(() => {
    game.setPhase('playing')

    const store = useGuessVerseStore.getState()
    const currentVerse = store.getCurrentVerse()

    // Send initial state to all players
    sendEvent({
      type: 'game:state' as const,
      state: {
        gamePhase: 'playing',
        verseWords: store.words,
        revealedWordCount: 0,
        revealPhase: 'revealing',
        players: useGameStore.getState().players,
      },
    })

    // Start revealing words
    startRevealing()
  }, [sendEvent, startRevealing])

  // ─── Any player: Send grab event ───

  const handleGrab = useCallback(() => {
    if (!myUserId) return false
    const store = useGuessVerseStore.getState()
    if (store.revealPhase !== 'revealing') return false

    if (isHost) {
      // Host: process grab directly
      grabQueue.current.push({ playerId: myUserId, timestamp: Date.now() })
      resolveGrabQueue()
    } else {
      // Non-host: send grab event to host
      sendEvent({
        type: 'verse:grab',
        playerId: myUserId,
        timestamp: Date.now(),
      })
    }
    return true
  }, [isHost, myUserId, sendEvent, resolveGrabQueue])

  // ─── Host: Handle answer confirmation (correct/wrong) ───

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const store = useGuessVerseStore.getState()
      const playerId = store.grabbedByPlayerId
      const currentVerse = store.getCurrentVerse()
      if (!playerId || !currentVerse) return

      const points = correct ? store.getPointsForTiming() : GAME_CONFIG.GUESS_VERSE.PENALTY

      // Update score locally
      game.updateScore(playerId, points)

      // Build scores array for broadcast
      const scores = useGameStore.getState().players.map((p) => ({
        userId: p.id,
        score: p.score,
      }))

      if (correct) {
        store.markAnswered()

        setAnswerResult({
          correct: true,
          reference: currentVerse.reference,
          points,
          winnerName:
            useGameStore.getState().players.find((p) => p.id === playerId)?.name ?? '',
        })

        // Broadcast result
        sendEvent({
          type: 'verse:result',
          correct: true,
          reference: currentVerse.reference,
          scores,
        })

        // Check win condition
        const winner = useGameStore.getState().getWinner()
        if (winner) {
          setTimeout(() => {
            game.setPhase('game_over')
            sendEvent({
              type: 'game:over',
              scores: useGameStore.getState().players.map((p) => ({
                userId: p.id,
                displayName: p.name,
                score: p.score,
              })),
              winnerId: winner.id,
            })
          }, 2000)
        } else {
          // Advance to next verse after delay
          setTimeout(() => {
            verse.nextVerse()
            setAnswerResult(null)
            grabQueue.current = []

            const nextState = useGuessVerseStore.getState()
            const nextVerse = nextState.getCurrentVerse()

            // Broadcast new verse state
            sendEvent({
              type: 'verse:reveal',
              verseId: nextVerse?.id ?? '',
              words: nextState.words,
              revealedCount: 0,
              totalWords: nextState.words.length,
            })

            startRevealing()
          }, 2500)
        }
      } else {
        // Wrong answer: penalty, resume revealing
        setAnswerResult({
          correct: false,
          reference: currentVerse.reference,
          points,
          winnerName:
            useGameStore.getState().players.find((p) => p.id === playerId)?.name ?? '',
        })

        // Broadcast wrong result with passedTo to signal continue
        sendEvent({
          type: 'verse:result',
          correct: false,
          reference: currentVerse.reference,
          scores,
          passedTo: 'continue',
        })

        setTimeout(() => {
          useGuessVerseStore.setState({
            revealPhase: 'revealing',
            grabbedByPlayerId: null,
          })
          setAnswerResult(null)
          startRevealing()
        }, 1500)
      }
    },
    [sendEvent, startRevealing]
  )

  // ─── Derived state ───

  const currentVerse = verse.getCurrentVerse()
  const revealedWords = verse.words.slice(0, verse.revealedWordCount)
  const hiddenCount = verse.words.length - verse.revealedWordCount
  const revealProgress = verse.getRevealProgress()
  const potentialPoints = verse.getPointsForTiming()
  const grabberPlayer = game.players.find((p) => p.id === verse.grabbedByPlayerId)
  const isGrabber = verse.grabbedByPlayerId === myUserId

  // ─── Points badge color ───

  const pointsBadgeColor =
    potentialPoints === 3
      ? colors.green
      : potentialPoints === 2
        ? colors.amber
        : colors.red

  // ─── RENDER: Loading ───

  if (contentLoading) {
    return (
      <View style={styles.center}>
        <Spinner size="lg" />
      </View>
    )
  }

  // ─── RENDER: Game Over ───

  if (game.phase === 'game_over') {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
      >
        <GameOverScreen
          winner={game.getWinner()}
          players={game.players}
          onPlayAgain={() => {
            game.reset()
            verse.reset()
            if (revealInterval.current) clearInterval(revealInterval.current)
            router.replace('/(app)/games/guess-verse' as any)
          }}
          onExit={() => {
            room.leaveRoom()
            router.replace('/(app)/games' as any)
          }}
        />
      </ScrollView>
    )
  }

  // ─── RENDER: Waiting for host to start ───

  if (game.phase !== 'playing') {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
      >
        <View style={styles.topBar}>
          <ConnectionStatus
            isConnected={room.isConnected}
            playerCount={room.players.length}
          />
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={24} color={colors.creamDim} />
          </Pressable>
        </View>

        <View style={styles.readyContainer}>
          <Text style={styles.heading}>Guess The Verse</Text>
          <Text style={styles.desc}>
            A verse will be revealed word by word on everyone's phone. Tap GRAB when you
            think you know the reference!
          </Text>

          <View style={[styles.card, shadows.lg]}>
            <Text style={styles.cardTitle}>Scoring</Text>
            <View style={styles.pointsInfo}>
              <View style={styles.pointRow}>
                <View style={[styles.pointBadge, { backgroundColor: colors.green }]}>
                  <Text style={styles.pointBadgeText}>+3</Text>
                </View>
                <Text style={styles.pointLabel}>Early guess (0-33% revealed)</Text>
              </View>
              <View style={styles.pointRow}>
                <View style={[styles.pointBadge, { backgroundColor: colors.amber }]}>
                  <Text style={styles.pointBadgeText}>+2</Text>
                </View>
                <Text style={styles.pointLabel}>Mid guess (34-66% revealed)</Text>
              </View>
              <View style={styles.pointRow}>
                <View style={[styles.pointBadge, { backgroundColor: colors.red }]}>
                  <Text style={styles.pointBadgeText}>+1</Text>
                </View>
                <Text style={styles.pointLabel}>Late guess (67-100% revealed)</Text>
              </View>
              <View style={styles.pointRow}>
                <View style={[styles.penaltyBadge]}>
                  <Text style={styles.penaltyBadgeText}>-1</Text>
                </View>
                <Text style={styles.pointLabel}>Wrong guess penalty</Text>
              </View>
            </View>
          </View>

          <ScoreBoard players={game.players} winScore={game.winScore} />

          {isHost ? (
            <Button onPress={handleStartGame} size="lg" fullWidth>
              Start Revealing!
            </Button>
          ) : (
            <View style={styles.waitingHost}>
              <Spinner size="sm" />
              <Text style={styles.waitingText}>Waiting for host to start...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }

  // ─── RENDER: Playing ───

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      {/* Top bar: connection + close */}
      <View style={styles.topBar}>
        <ConnectionStatus
          isConnected={room.isConnected}
          playerCount={room.players.length}
        />
        <View style={styles.topBarRight}>
          <View style={[styles.pointsBadgeTop, { backgroundColor: pointsBadgeColor }]}>
            <Text style={styles.pointsBadgeTopText}>+{potentialPoints}</Text>
          </View>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={24} color={colors.creamDim} />
          </Pressable>
        </View>
      </View>

      {/* Score board */}
      <ScoreBoard
        players={game.players}
        winScore={game.winScore}
        currentPlayerId={myUserId ?? undefined}
      />

      {/* Verse reveal box */}
      {currentVerse && (
        <View style={[styles.verseCard, shadows.lg]}>
          {/* Words area */}
          <View style={styles.wordsContainer}>
            {verse.words.map((word, i) => {
              const isRevealed = i < verse.revealedWordCount
              const animValue = wordAnimations.current[i]

              if (isRevealed && animValue) {
                return (
                  <Animated.Text
                    key={`${i}-${word}`}
                    style={[
                      styles.revealedWord,
                      {
                        opacity: animValue,
                        transform: [
                          {
                            translateY: animValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [8, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {word}{' '}
                  </Animated.Text>
                )
              }

              if (!isRevealed) {
                return (
                  <Text key={`hidden-${i}`} style={styles.hiddenWord}>
                    {'___'}{' '}
                  </Text>
                )
              }

              // Revealed but no animation value yet (fallback)
              return (
                <Text key={`${i}-${word}`} style={styles.revealedWord}>
                  {word}{' '}
                </Text>
              )
            })}
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.round(revealProgress * 100)}%`,
                    backgroundColor: pointsBadgeColor,
                  },
                ]}
              />
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>
                {Math.round(revealProgress * 100)}% revealed
              </Text>
              <Text style={[styles.progressPoints, { color: pointsBadgeColor }]}>
                +{potentialPoints} pts
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* PHASE: Revealing - Show GRAB button */}
      {verse.revealPhase === 'revealing' && (
        <View style={styles.grabArea}>
          <GrabButton
            label="GRAB!"
            onGrab={handleGrab}
          />
        </View>
      )}

      {/* PHASE: Grabbed - Show who grabbed and confirm buttons */}
      {verse.revealPhase === 'grabbed' && grabberPlayer && (
        <View style={[styles.grabbedCard, shadows.lg]}>
          <View style={styles.grabberHeader}>
            <Ionicons name="hand-left" size={28} color={colors.gold} />
            <Text style={styles.grabberName}>{grabberPlayer.name} grabbed it!</Text>
          </View>

          {currentVerse && (
            <View style={styles.referenceReveal}>
              <Text style={styles.referenceLabel}>The verse is:</Text>
              <Text style={styles.referenceText}>{currentVerse.reference}</Text>
            </View>
          )}

          {/* Host or grabber confirms answer */}
          {isHost && (
            <View style={styles.confirmSection}>
              <Text style={styles.confirmPrompt}>
                Did {isGrabber ? 'you' : grabberPlayer.name} name the correct reference?
              </Text>
              <View style={styles.answerButtons}>
                <Button
                  onPress={() => handleAnswer(true)}
                  size="lg"
                  style={styles.answerBtn}
                >
                  Correct
                </Button>
                <Button
                  onPress={() => handleAnswer(false)}
                  variant="destructive"
                  size="lg"
                  style={styles.answerBtn}
                >
                  Wrong
                </Button>
              </View>
            </View>
          )}

          {!isHost && (
            <View style={styles.waitingConfirm}>
              <Spinner size="sm" />
              <Text style={styles.waitingText}>
                {isGrabber
                  ? 'Say the verse reference out loud! Host is confirming...'
                  : 'Waiting for host to confirm...'}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* PHASE: Answered - Show result */}
      {answerResult && verse.revealPhase === 'answered' && (
        <View
          style={[
            styles.resultCard,
            answerResult.correct ? styles.resultCardCorrect : styles.resultCardWrong,
            shadows.lg,
          ]}
        >
          <Ionicons
            name={answerResult.correct ? 'checkmark-circle' : 'close-circle'}
            size={48}
            color={answerResult.correct ? colors.green : colors.red}
          />
          <Text
            style={[
              styles.resultTitle,
              { color: answerResult.correct ? colors.green : colors.red },
            ]}
          >
            {answerResult.correct ? 'Correct!' : 'Wrong!'}
          </Text>
          <Text style={styles.resultName}>{answerResult.winnerName}</Text>
          <Text style={styles.resultReference}>{answerResult.reference}</Text>
          <View
            style={[
              styles.resultPointsBadge,
              {
                backgroundColor: answerResult.correct
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
              },
            ]}
          >
            <Text
              style={[
                styles.resultPointsText,
                { color: answerResult.correct ? colors.green : colors.red },
              ]}
            >
              {answerResult.correct ? '+' : ''}
              {answerResult.points} points
            </Text>
          </View>
          {!answerResult.correct && (
            <Text style={styles.resultContinue}>
              Verse will continue revealing...
            </Text>
          )}
        </View>
      )}

      {/* Wrong answer result shown briefly while revealing continues */}
      {answerResult && verse.revealPhase === 'revealing' && (
        <View style={[styles.resultBanner, styles.resultCardWrong]}>
          <Text style={styles.resultBannerText}>
            {answerResult.winnerName} guessed wrong (-1 pt). Keep going!
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

// ─── Styles ───

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
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pointsBadgeTop: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  pointsBadgeTopText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },

  // Ready screen
  heading: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  desc: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    lineHeight: 24,
  },
  readyContainer: {
    gap: spacing.lg,
  },

  // Card
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  // Points info
  pointsInfo: {
    gap: spacing.sm,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pointBadge: {
    width: 36,
    height: 28,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointBadgeText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  penaltyBadge: {
    width: 36,
    height: 28,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  penaltyBadgeText: {
    color: colors.red,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  pointLabel: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    flex: 1,
  },

  // Waiting
  waitingHost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  waitingText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
  },

  // Verse card
  verseCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    minHeight: 200,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    minHeight: 100,
  },
  revealedWord: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    lineHeight: 28,
  },
  hiddenWord: {
    fontSize: fontSize.lg,
    color: 'rgba(15, 23, 42, 0.15)',
    lineHeight: 28,
  },

  // Progress bar
  progressBarContainer: {
    marginTop: spacing.lg,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
  },
  progressPoints: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },

  // Grab area
  grabArea: {
    marginTop: spacing.lg,
  },

  // Grabbed card
  grabbedCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gold,
    gap: spacing.md,
  },
  grabberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  grabberName: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.xl,
  },
  referenceReveal: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  referenceLabel: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
  },
  referenceText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  confirmSection: {
    gap: spacing.md,
  },
  confirmPrompt: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
  },
  answerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  answerBtn: {
    flex: 1,
  },
  waitingConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },

  // Result card
  resultCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 2,
  },
  resultCardCorrect: {
    borderColor: colors.green,
  },
  resultCardWrong: {
    borderColor: colors.red,
  },
  resultTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  resultName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
  },
  resultReference: {
    fontSize: fontSize.lg,
    color: colors.creamDim,
  },
  resultPointsBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.xs,
  },
  resultPointsText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  resultContinue: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },

  // Result banner (brief wrong answer notification)
  resultBanner: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  resultBannerText: {
    fontSize: fontSize.sm,
    color: colors.red,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
  },
})
