// † "The fear of the Lord is the beginning of knowledge" — Proverbs 1:7
import { useEffect, useState, useRef, useCallback } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Animated, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGameStore } from '../../../../stores/gameStore'
import { useTriviaStore } from '../../../../stores/triviaStore'
import { useRoomStore } from '../../../../stores/roomStore'
import { useGameContent } from '../../../../hooks/useGameContent'
import { useMultiplayerGame } from '../../../../hooks/useMultiplayerGame'
import { ScoreBoard } from '../../../../components/game/ScoreBoard'
import { GameOverScreen } from '../../../../components/game/GameOverScreen'
import { GrabButton } from '../../../../components/game/GrabButton'
import { ConnectionStatus } from '../../../../components/game/ConnectionStatus'
import { Button } from '../../../../components/ui/Button'
import { Spinner } from '../../../../components/ui/Spinner'
import { GAME_CONFIG } from '../../../../lib/constants'
import { CharacterAvatar } from '../../../../components/game/CharacterAvatar'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../../lib/theme'
import type { Database } from '../../../../lib/types/database'
import type { RoomEvent, TriviaGrabEvent } from '../../../../lib/types/multiplayer'

type TriviaQuestion = Database['public']['Tables']['trivia_questions']['Row']

// ---------- Difficulty / Category badge color helpers ----------

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: colors.green,
  medium: colors.amber,
  hard: colors.red,
}

const CATEGORY_COLORS: Record<string, string> = {
  'Old Testament': colors.indigo,
  'New Testament': colors.sky,
  People: colors.purple,
  Places: colors.emerald,
  Miracles: colors.amber,
  Prophecy: colors.rose,
}

// ---------- Component ----------

export default function TriviaMultiplayerScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const game = useGameStore()
  const trivia = useTriviaStore()
  const room = useRoomStore()

  // Grab contention tracking (host collects grabs during window)
  const pendingGrabs = useRef<TriviaGrabEvent[]>([])
  const grabWindowTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const resultScale = useRef(new Animated.Value(0)).current

  // Local UI sub-phase within 'playing':
  //   'waiting'    - question visible, waiting for grab
  //   'grabbed'    - someone grabbed, answering
  //   'result'     - answer result shown
  //   'passing'    - host choosing who to pass to
  type SubPhase = 'waiting' | 'grabbed' | 'result' | 'passing'
  const [subPhase, setSubPhase] = useState<SubPhase>('waiting')

  // Who grabbed (display name) - kept locally so non-host can show it
  const [grabberName, setGrabberName] = useState<string | null>(null)
  const [grabberUserId, setGrabberUserId] = useState<string | null>(null)

  // Answer result state broadcast from host
  const [lastResultCorrect, setLastResultCorrect] = useState<boolean | null>(null)
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string | null>(null)
  const [lastExplanation, setLastExplanation] = useState<string | null>(null)

  // Current question broadcast (non-host receives this)
  const [broadcastQuestion, setBroadcastQuestion] = useState<{
    id: string
    question: string
    answers: string[]
    category: string
    difficulty: string
    questionType: string
  } | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)

  const isHost = room.isHost()
  const myUserId = room.myUserId

  // ---------- Fetch content (host only needs this) ----------

  const { data: questions, loading: contentLoading } = useGameContent<TriviaQuestion>({
    table: 'trivia_questions',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  // ---------- Animate entrance ----------

  const animateEntrance = useCallback(() => {
    fadeAnim.setValue(0)
    slideAnim.setValue(30)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const animateResult = useCallback(() => {
    resultScale.setValue(0)
    Animated.spring(resultScale, { toValue: 1, friction: 6, tension: 100, useNativeDriver: true }).start()
  }, [resultScale])

  // ---------- Initialize trivia store + start game (host) ----------

  const hasStartedRef = useRef(false)
  useEffect(() => {
    if (!isHost || questions.length === 0 || hasStartedRef.current) return
    hasStartedRef.current = true

    // Set questions in trivia store (synchronous Zustand update)
    trivia.setQuestions(questions)
    game.setPhase('playing')

    // Broadcast first question directly using store getState() to avoid stale closures
    const q = useTriviaStore.getState().getCurrentQuestion()
    if (!q) return

    const answers =
      q.question_type === 'true_false'
        ? ['True', 'False']
        : useTriviaStore.getState().getShuffledAnswers()

    const payload = {
      id: q.id,
      question: q.question,
      answers,
      category: q.category,
      difficulty: q.difficulty,
      questionType: q.question_type,
    }

    setBroadcastQuestion(payload)
    setQuestionIndex(0)
    setSubPhase('waiting')
    animateEntrance()

    // Broadcast to other players
    useRoomStore.getState().sendGameEvent({
      type: 'trivia:question',
      question: payload,
      questionIndex: 0,
    } as any)
  }, [questions, isHost])

  // ---------- Event handler for multiplayer events ----------

  const handleGameEvent = useCallback(
    (event: RoomEvent) => {
      switch (event.type) {
        // ── Non-host receives a question ──
        case 'trivia:question': {
          setBroadcastQuestion(event.question)
          setQuestionIndex(event.questionIndex)
          setSubPhase('waiting')
          setGrabberName(null)
          setGrabberUserId(null)
          setLastResultCorrect(null)
          setLastCorrectAnswer(null)
          setLastExplanation(null)
          animateEntrance()
          // Ensure game phase is playing (non-host needs this for correct UI)
          if (useGameStore.getState().phase !== 'playing') {
            game.setPhase('playing')
          }
          break
        }

        // ── Host receives grab attempts ──
        case 'trivia:grab': {
          if (isHost) {
            pendingGrabs.current.push(event as TriviaGrabEvent)
            // If no window timer running, start one
            if (!grabWindowTimer.current) {
              grabWindowTimer.current = setTimeout(() => {
                resolveGrabWinner()
                grabWindowTimer.current = null
              }, 300) // 300ms grab resolution window
            }
          }
          break
        }

        // ── Everyone receives grab result ──
        case 'trivia:grab_result': {
          const winnerId = event.winnerId
          const winnerName = event.winnerName
          setGrabberUserId(winnerId)
          setGrabberName(winnerName)
          setSubPhase('grabbed')

          if (isHost) {
            trivia.grabQuestion(winnerId)
          }
          break
        }

        // ── Host receives answer from grabber ──
        case 'trivia:answer': {
          if (isHost) {
            handleAnswerOnHost(event.playerId, event.answer)
          }
          break
        }

        // ── Everyone receives result ──
        case 'trivia:result': {
          setLastResultCorrect(event.correct)
          setLastCorrectAnswer(event.correctAnswer)
          setLastExplanation(event.explanation ?? null)
          setSubPhase('result')
          animateResult()

          // Sync scores from host (use absolute setScore for authoritative sync)
          if (!isHost) {
            event.scores.forEach(({ userId, score }) => {
              useGameStore.getState().setScore(userId, score)
            })
          }

          // If passedTo is '__pending__', transition to passing sub-phase on non-host
          // Don't set grabberUserId to the magic string
          if (event.passedTo && event.passedTo !== '__pending__') {
            setGrabberUserId(event.passedTo)
            const passedPlayer = game.players.find((p) => p.id === event.passedTo)
            setGrabberName(passedPlayer?.name ?? null)
          } else if (event.passedTo === '__pending__') {
            // Signal to non-host that passing phase is starting
            setTimeout(() => setSubPhase('passing'), 2000)
          }
          break
        }

        // ── Full state sync ──
        case 'game:state': {
          const s = event.state as Record<string, unknown>
          if (s.phase) game.setPhase(s.phase as any)
          if (s.players) game.setPlayers(s.players as any)
          break
        }

        // ── Game over ──
        case 'game:over': {
          if (!isHost) {
            // Sync final scores with absolute values
            event.scores.forEach(({ userId, score }) => {
              useGameStore.getState().setScore(userId, score)
            })
          }
          game.setPhase('game_over')
          break
        }

        default:
          break
      }
    },
    [isHost, game, trivia, animateEntrance, animateResult]
  )

  // ── Hook into multiplayer ──
  const { sendEvent } = useMultiplayerGame(handleGameEvent)

  // ---------- Host helpers ----------

  /** Broadcast the current question to all players */
  const broadcastCurrentQuestion = useCallback(() => {
    // Clear any stale grab timer from previous question
    if (grabWindowTimer.current) {
      clearTimeout(grabWindowTimer.current)
      grabWindowTimer.current = null
    }
    pendingGrabs.current = []

    const q = trivia.getCurrentQuestion()
    if (!q) return

    // Build shuffled answers using Fisher-Yates via store helper
    const answers =
      q.question_type === 'true_false'
        ? ['True', 'False']
        : trivia.getShuffledAnswers()

    const payload = {
      id: q.id,
      question: q.question,
      answers,
      category: q.category,
      difficulty: q.difficulty,
      questionType: q.question_type,
    }

    // Set locally on host as well
    setBroadcastQuestion(payload)
    setQuestionIndex(trivia.currentQuestionIndex)
    setSubPhase('waiting')
    setGrabberName(null)
    setGrabberUserId(null)
    setLastResultCorrect(null)
    setLastCorrectAnswer(null)
    setLastExplanation(null)
    animateEntrance()

    sendEvent({
      type: 'trivia:question',
      question: payload,
      questionIndex: trivia.currentQuestionIndex,
    } as any)
  }, [trivia, sendEvent, animateEntrance])

  /** Host resolves which grab arrived first (lowest timestamp) */
  const resolveGrabWinner = useCallback(() => {
    const grabs = [...pendingGrabs.current]
    pendingGrabs.current = []

    if (grabs.length === 0) return
    // Already grabbed? Ignore.
    if (trivia.grabbedByPlayerId) return

    // Sort by timestamp ascending
    grabs.sort((a, b) => a.timestamp - b.timestamp)
    const winner = grabs[0]
    const winnerPlayer = game.players.find((p) => p.id === winner.playerId)

    sendEvent({
      type: 'trivia:grab_result',
      winnerId: winner.playerId,
      winnerName: winnerPlayer?.name ?? 'Unknown',
    } as any)

    // Also apply locally on host
    setGrabberUserId(winner.playerId)
    setGrabberName(winnerPlayer?.name ?? 'Unknown')
    setSubPhase('grabbed')
    trivia.grabQuestion(winner.playerId)
  }, [trivia, game.players, sendEvent])

  /** Host processes an answer */
  const handleAnswerOnHost = useCallback(
    (playerId: string, answer: string) => {
      const q = trivia.getCurrentQuestion()
      if (!q) return

      const correct = answer === q.correct_answer
      trivia.selectAnswer(answer)

      if (correct) {
        const points = trivia.passedToPlayerId
          ? GAME_CONFIG.TRIVIA.POINTS.PASSED
          : GAME_CONFIG.TRIVIA.POINTS.FIRST
        game.updateScore(playerId, points)
      } else {
        game.updateScore(playerId, GAME_CONFIG.TRIVIA.PENALTY)
      }

      const scores = game.players.map((p) => {
        // re-read from store after update
        const updated = useGameStore.getState().players.find((up) => up.id === p.id)
        return { userId: p.id, score: updated?.score ?? p.score }
      })

      // Check win condition
      const winner = useGameStore.getState().getWinner()

      // Determine if we should pass
      const shouldPass = !correct && !trivia.passedToPlayerId

      sendEvent({
        type: 'trivia:result',
        correct,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        scores,
        passedTo: shouldPass ? '__pending__' : undefined,
      } as any)

      // Apply locally on host
      setLastResultCorrect(correct)
      setLastCorrectAnswer(q.correct_answer)
      setLastExplanation(q.explanation)
      setSubPhase('result')
      animateResult()

      if (winner) {
        // Game over
        setTimeout(() => {
          const finalScores = useGameStore.getState().players.map((p) => ({
            userId: p.id,
            displayName: p.name,
            score: p.score,
          }))
          sendEvent({
            type: 'game:over',
            scores: finalScores,
            winnerId: winner.id,
          } as any)
          game.setPhase('game_over')
        }, 2500)
      } else if (correct || trivia.passedToPlayerId) {
        // Move to next question after delay
        setTimeout(() => {
          trivia.nextQuestion()
          broadcastCurrentQuestion()
        }, 3000)
      } else {
        // Wrong on first grab: transition to passing phase
        setTimeout(() => {
          setSubPhase('passing')
        }, 2000)
      }
    },
    [trivia, game, sendEvent, animateResult, broadcastCurrentQuestion]
  )

  // ---------- Player actions ----------

  /** Local player taps GRAB */
  const handleGrab = useCallback(() => {
    if (!myUserId) return false
    // Send grab event to host
    sendEvent({
      type: 'trivia:grab',
      playerId: myUserId,
      timestamp: Date.now(),
    } as any)
    return true
  }, [myUserId, sendEvent])

  /** Grabber selects an answer (on their device) */
  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (!myUserId) return
      sendEvent({
        type: 'trivia:answer',
        playerId: myUserId,
        answer,
      } as any)
    },
    [myUserId, sendEvent]
  )

  /** Host passes question to another player */
  const handlePassTo = useCallback(
    (playerId: string) => {
      trivia.passToPlayer(playerId)
      const passedPlayer = game.players.find((p) => p.id === playerId)

      sendEvent({
        type: 'trivia:grab_result',
        winnerId: playerId,
        winnerName: passedPlayer?.name ?? 'Unknown',
      } as any)

      setGrabberUserId(playerId)
      setGrabberName(passedPlayer?.name ?? 'Unknown')
      setSubPhase('grabbed')
    },
    [trivia, game.players, sendEvent]
  )

  /** Host advances to next question (skip pass) */
  const handleSkipPass = useCallback(() => {
    trivia.nextQuestion()
    broadcastCurrentQuestion()
  }, [trivia, broadcastCurrentQuestion])

  // ---------- Navigation ----------

  const handlePlayAgain = useCallback(() => {
    game.reset()
    trivia.reset()
    router.replace('/(app)/games/lobby' as any)
  }, [game, trivia, router])

  const handleExit = useCallback(() => {
    Alert.alert(
      'Leave Game',
      'Are you sure you want to leave?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            if (grabWindowTimer.current) clearTimeout(grabWindowTimer.current)
            await room.leaveRoom()
            game.reset()
            trivia.reset()
            router.replace('/(app)/games' as any)
          },
        },
      ]
    )
  }, [room, game, trivia, router])

  // ---------- Cleanup ----------

  useEffect(() => {
    return () => {
      if (grabWindowTimer.current) clearTimeout(grabWindowTimer.current)
    }
  }, [])

  // ---------- Derived state ----------

  const iAmGrabber = grabberUserId === myUserId
  const isConnected = room.isConnected
  const playerCount = room.playerCount()
  const currentQuestion = broadcastQuestion

  // Shuffled answers are already included in the broadcast
  const answers = currentQuestion?.answers ?? []

  // ---------- Render: Loading ----------

  if (contentLoading && isHost) {
    return (
      <View style={styles.centerContainer}>
        <Spinner size="lg" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    )
  }

  // ---------- Render: Game Over ----------

  if (game.phase === 'game_over') {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.md }]}
      >
        <ConnectionStatus isConnected={isConnected} playerCount={playerCount} />
        <GameOverScreen
          winner={game.getWinner()}
          players={game.players}
          onPlayAgain={handlePlayAgain}
          onExit={handleExit}
        />
      </ScrollView>
    )
  }

  // ---------- Render: Playing ----------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.md }]}
    >
      {/* Connection status bar */}
      <View style={styles.topBar}>
        <ConnectionStatus isConnected={isConnected} playerCount={playerCount} />
        <View style={styles.topBarRight}>
          <Text style={styles.questionCounter}>
            Q{questionIndex + 1}
          </Text>
          <Pressable onPress={handleExit} hitSlop={12}>
            <Ionicons name="close" size={24} color={colors.creamDim} />
          </Pressable>
        </View>
      </View>

      {/* Scoreboard */}
      <View style={styles.scoreSection}>
        <ScoreBoard
          players={game.players}
          currentPlayerId={grabberUserId ?? undefined}
          winScore={game.winScore}
        />
      </View>

      {/* Question card */}
      {currentQuestion ? (
        <Animated.View
          style={[
            styles.questionCard,
            shadows.lg,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Category and difficulty badges */}
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    (CATEGORY_COLORS[currentQuestion.category] ?? colors.sky) + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: CATEGORY_COLORS[currentQuestion.category] ?? colors.sky,
                  },
                ]}
              >
                {currentQuestion.category}
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    (DIFFICULTY_COLORS[currentQuestion.difficulty] ?? colors.creamDim) + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: DIFFICULTY_COLORS[currentQuestion.difficulty] ?? colors.creamDim,
                  },
                ]}
              >
                {currentQuestion.difficulty.charAt(0).toUpperCase() +
                  currentQuestion.difficulty.slice(1)}
              </Text>
            </View>
          </View>

          {/* Decorative character */}
          <CharacterAvatar size={56} style={{ marginBottom: spacing.sm }} />

          {/* Question text */}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Animated.View>
      ) : (
        <View style={styles.waitingCard}>
          <Spinner size="md" />
          <Text style={styles.waitingText}>Waiting for next question...</Text>
        </View>
      )}

      {/* ── Sub-phase: Waiting for grab ── */}
      {subPhase === 'waiting' && currentQuestion && (
        <Animated.View style={[styles.grabSection, { opacity: fadeAnim }]}>
          <GrabButton
            onGrab={handleGrab}
            label="GRAB!"
            disabled={!isConnected}
          />
          <Text style={styles.grabHint}>
            Be the first to grab and answer!
          </Text>
        </Animated.View>
      )}

      {/* ── Sub-phase: Someone grabbed ── */}
      {subPhase === 'grabbed' && currentQuestion && (
        <Animated.View style={[styles.answeredSection, { opacity: fadeAnim }]}>
          {iAmGrabber ? (
            /* I am the grabber: show answer options */
            <View style={styles.answerContainer}>
              <View style={styles.youGrabbedBanner}>
                <Text style={styles.youGrabbedText}>You grabbed it! Choose your answer:</Text>
              </View>

              {currentQuestion.questionType === 'open_answer' ? (
                <View style={styles.openAnswerRow}>
                  <Button
                    onPress={() => {
                      const q = trivia.getCurrentQuestion()
                      if (q) handleSelectAnswer(q.correct_answer)
                    }}
                    size="lg"
                    style={styles.openAnswerBtn}
                  >
                    Correct
                  </Button>
                  <Button
                    onPress={() => handleSelectAnswer('__wrong__')}
                    variant="destructive"
                    size="lg"
                    style={styles.openAnswerBtn}
                  >
                    Wrong
                  </Button>
                </View>
              ) : (
                <View style={styles.answerOptions}>
                  {answers.map((answer, idx) => (
                    <Pressable
                      key={`${answer}-${idx}`}
                      onPress={() => handleSelectAnswer(answer)}
                      style={({ pressed }) => [
                        styles.answerOption,
                        pressed && styles.answerOptionPressed,
                      ]}
                    >
                      <View style={styles.answerLetterCircle}>
                        <Text style={styles.answerLetter}>
                          {String.fromCharCode(65 + idx)}
                        </Text>
                      </View>
                      <Text style={styles.answerOptionText}>{answer}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            /* I am NOT the grabber: show waiting message */
            <View style={styles.waitingForAnswer}>
              <View style={styles.answeringBanner}>
                <Text style={styles.answeringBannerText}>
                  {grabberName} is answering...
                </Text>
              </View>
              <Spinner size="sm" />
            </View>
          )}
        </Animated.View>
      )}

      {/* ── Sub-phase: Result ── */}
      {subPhase === 'result' && (
        <Animated.View
          style={[
            styles.resultSection,
            { transform: [{ scale: resultScale }] },
          ]}
        >
          <View
            style={[
              styles.resultCard,
              {
                backgroundColor: lastResultCorrect
                  ? 'rgba(34, 197, 94, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
                borderColor: lastResultCorrect
                  ? 'rgba(34, 197, 94, 0.3)'
                  : 'rgba(239, 68, 68, 0.3)',
              },
            ]}
          >
            <Text
              style={[
                styles.resultLabel,
                { color: lastResultCorrect ? colors.green : colors.red },
              ]}
            >
              {lastResultCorrect ? 'Correct!' : 'Wrong!'}
            </Text>

            {grabberName && (
              <Text style={styles.resultPlayerName}>
                {grabberName}{' '}
                {lastResultCorrect
                  ? trivia.passedToPlayerId
                    ? `+${GAME_CONFIG.TRIVIA.POINTS.PASSED}`
                    : `+${GAME_CONFIG.TRIVIA.POINTS.FIRST}`
                  : `${GAME_CONFIG.TRIVIA.PENALTY}`}
              </Text>
            )}

            <View style={styles.correctAnswerBox}>
              <Text style={styles.correctAnswerLabel}>Correct Answer</Text>
              <Text style={styles.correctAnswerText}>{lastCorrectAnswer}</Text>
            </View>

            {lastExplanation && (
              <Text style={styles.explanationText}>{lastExplanation}</Text>
            )}
          </View>
        </Animated.View>
      )}

      {/* ── Sub-phase: Passing (host only) ── */}
      {subPhase === 'passing' && isHost && (
        <View style={styles.passSection}>
          <Text style={styles.passTitle}>
            Wrong answer! Pass to another player for {GAME_CONFIG.TRIVIA.POINTS.PASSED} point:
          </Text>

          <View style={styles.passOptions}>
            {game.players
              .filter((p) => p.id !== grabberUserId)
              .map((player) => (
                <Pressable
                  key={player.id}
                  onPress={() => handlePassTo(player.id)}
                  style={({ pressed }) => [
                    styles.passOption,
                    pressed && styles.passOptionPressed,
                  ]}
                >
                  <Text style={styles.passOptionText}>Pass to {player.name}</Text>
                </Pressable>
              ))}
          </View>

          <Button onPress={handleSkipPass} variant="outline" fullWidth>
            Skip -- Next Question
          </Button>
        </View>
      )}

      {/* Non-host waiting for pass resolution */}
      {subPhase === 'passing' && !isHost && (
        <View style={styles.passWaiting}>
          <Text style={styles.passWaitingText}>
            Host is deciding who to pass the question to...
          </Text>
          <Spinner size="sm" />
        </View>
      )}
    </ScrollView>
  )
}

// ---------- Styles ----------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xxl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    marginTop: spacing.sm,
  },

  // ── Top bar ──
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
  questionCounter: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.creamDim,
    backgroundColor: colors.creamSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },

  // ── Score section ──
  scoreSection: {
    marginBottom: spacing.lg,
  },

  // ── Question card ──
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  questionText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    lineHeight: 30,
  },

  // ── Waiting card (no question yet) ──
  waitingCard: {
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  waitingText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
  },

  // ── Grab section ──
  grabSection: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  grabHint: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  // ── Answered section (someone grabbed) ──
  answeredSection: {
    marginTop: spacing.sm,
  },

  // ── Grabber sees answer options ──
  answerContainer: {
    gap: spacing.md,
  },
  youGrabbedBanner: {
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.3)',
    alignItems: 'center',
  },
  youGrabbedText: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  openAnswerRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  openAnswerBtn: {
    flex: 1,
  },
  answerOptions: {
    gap: spacing.sm,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.creamFaint,
    ...shadows.md,
  },
  answerOptionPressed: {
    backgroundColor: colors.navyLight,
    borderColor: colors.gold,
  },
  answerLetterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.creamSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerLetter: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  answerOptionText: {
    flex: 1,
    color: colors.cream,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },

  // ── Non-grabber waiting ──
  waitingForAnswer: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  answeringBanner: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.3)',
  },
  answeringBannerText: {
    color: colors.yellow,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.lg,
    textAlign: 'center',
  },

  // ── Result section ──
  resultSection: {
    marginTop: spacing.md,
  },
  resultCard: {
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultLabel: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
  },
  resultPlayerName: {
    fontSize: fontSize.md,
    color: colors.cream,
    fontWeight: fontWeight.semibold,
  },
  correctAnswerBox: {
    backgroundColor: colors.creamSubtle,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
    width: '100%',
  },
  correctAnswerLabel: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  correctAnswerText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 20,
  },

  // ── Pass section (host) ──
  passSection: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  passTitle: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    fontWeight: fontWeight.medium,
  },
  passOptions: {
    gap: spacing.sm,
  },
  passOption: {
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.creamFaint,
    alignItems: 'center',
    ...shadows.sm,
  },
  passOptionPressed: {
    backgroundColor: colors.navyLight,
    borderColor: colors.gold,
  },
  passOptionText: {
    color: colors.cream,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.md,
  },

  // ── Pass waiting (non-host) ──
  passWaiting: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  passWaitingText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
  },
})
