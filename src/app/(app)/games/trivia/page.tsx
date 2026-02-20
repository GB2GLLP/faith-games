'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { useTriviaStore } from '@/stores/triviaStore'
import { useGameContent } from '@/hooks/useGameContent'
import { PlayerSetup, ScoreBoard, GrabButton, GameOverScreen, DifficultySelector, CategoryFilter } from '@/components/game'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { GAME_CONFIG, CATEGORIES } from '@/lib/constants'
import type { Database } from '@/lib/types/database'

type TriviaQuestion = Database['public']['Tables']['trivia_questions']['Row']

export default function TriviaPage() {
  const router = useRouter()
  const game = useGameStore()
  const trivia = useTriviaStore()
  const [phase, setPhase] = useState<'question' | 'grabbed' | 'result' | 'passed'>('question')

  const { data: questions, loading: contentLoading } = useGameContent<TriviaQuestion>({
    table: 'trivia_questions',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  useEffect(() => {
    game.setGameType('trivia')
    game.setWinScore(GAME_CONFIG.TRIVIA.WIN_SCORE)
    return () => {
      game.reset()
      trivia.reset()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (questions.length > 0) {
      trivia.setQuestions(questions)
    }
  }, [questions]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentQuestion = trivia.getCurrentQuestion()
  const grabber = game.players.find((p) => p.id === trivia.grabbedByPlayerId)

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return []
    if (currentQuestion.question_type === 'true_false') return ['True', 'False']
    return [...currentQuestion.wrong_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5)
  }, [currentQuestion])

  const handleGrab = (playerId: string) => {
    const success = trivia.grabQuestion(playerId)
    if (success) setPhase('grabbed')
    return success
  }

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion?.correct_answer
    trivia.selectAnswer(answer)
    setPhase('result')

    if (isCorrect && trivia.grabbedByPlayerId) {
      const points = trivia.passedToPlayerId ? GAME_CONFIG.TRIVIA.POINTS.PASSED : GAME_CONFIG.TRIVIA.POINTS.FIRST
      game.updateScore(trivia.grabbedByPlayerId, points)

      // Check win
      const winner = game.getWinner()
      if (winner) {
        setTimeout(() => game.setPhase('game_over'), 2000)
      } else {
        setTimeout(nextQuestion, 2500)
      }
    } else if (trivia.grabbedByPlayerId) {
      // Wrong answer
      game.updateScore(trivia.grabbedByPlayerId, GAME_CONFIG.TRIVIA.PENALTY)

      // If not yet passed, pass to next available player
      if (!trivia.passedToPlayerId) {
        setTimeout(() => {
          setPhase('passed')
        }, 1500)
      } else {
        // Already passed, move to next question
        setTimeout(nextQuestion, 2000)
      }
    }
  }

  const handlePass = (playerId: string) => {
    trivia.passToPlayer(playerId)
    setPhase('grabbed')
  }

  const nextQuestion = () => {
    trivia.nextQuestion()
    setPhase('question')
  }

  if (contentLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" /></div>
  }

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {game.phase === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gold mb-6">Bible Trivia</h1>
            <div className="space-y-6">
              <DifficultySelector />
              <CategoryFilter categories={CATEGORIES.TRIVIA} />
              <PlayerSetup
                minPlayers={GAME_CONFIG.TRIVIA.MIN_PLAYERS}
                maxPlayers={8}
                onReady={() => game.setPhase('ready')}
              />
            </div>
          </motion.div>
        )}

        {game.phase === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-8">
            <h2 className="font-display text-2xl font-bold text-gold">Ready for Trivia?</h2>
            <p className="text-cream/60">First to {game.winScore} wins! Grab the question to answer first.</p>
            <div className="text-sm text-cream/40 space-y-1">
              <p>First answer correct: +3 points</p>
              <p>Passed answer correct: +1 point</p>
              <p>Wrong answer: -1 point (question passes to others)</p>
            </div>
            <ScoreBoard players={game.players} winScore={game.winScore} />
            <Button onClick={() => game.setPhase('playing')} size="lg">Start Trivia!</Button>
          </motion.div>
        )}

        {game.phase === 'playing' && currentQuestion && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 py-4">
            <ScoreBoard players={game.players} winScore={game.winScore} />

            {/* Question */}
            <div className="p-6 rounded-xl bg-navy-light border border-cream/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-cream/10 text-cream/50 px-2 py-0.5 rounded-full">{currentQuestion.category}</span>
                <span className="text-xs bg-cream/10 text-cream/50 px-2 py-0.5 rounded-full">{currentQuestion.difficulty}</span>
                <span className="text-xs bg-cream/10 text-cream/50 px-2 py-0.5 rounded-full">{currentQuestion.question_type.replace('_', '/')}</span>
              </div>
              <h2 className="text-xl text-cream font-semibold">{currentQuestion.question}</h2>
            </div>

            {/* Grab phase */}
            {phase === 'question' && (
              <div className="space-y-2">
                {game.players.map((player) => (
                  <GrabButton
                    key={player.id}
                    label={`${player.name} — GRAB!`}
                    onGrab={() => handleGrab(player.id)}
                  />
                ))}
              </div>
            )}

            {/* Answer phase */}
            {phase === 'grabbed' && grabber && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-center text-gold font-bold">{grabber.name}, choose your answer:</p>
                {currentQuestion.question_type === 'open_answer' ? (
                  <div className="flex gap-3">
                    <Button onClick={() => handleAnswer(currentQuestion.correct_answer)} className="flex-1" size="lg">
                      ✓ Correct
                    </Button>
                    <Button onClick={() => handleAnswer('wrong')} variant="danger" className="flex-1" size="lg">
                      ✕ Wrong
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {shuffledAnswers.map((answer) => (
                      <button
                        key={answer}
                        onClick={() => handleAnswer(answer)}
                        className="p-3 rounded-lg bg-cream/5 text-cream hover:bg-cream/10 text-left transition-colors border border-cream/10"
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Result */}
            {phase === 'result' && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-3 py-4">
                <div className={`text-4xl ${trivia.isCorrect() ? 'text-green-400' : 'text-red-400'}`}>
                  {trivia.isCorrect() ? '✓ Correct!' : '✕ Wrong!'}
                </div>
                <p className="text-cream/60">
                  Answer: <span className="text-cream font-medium">{currentQuestion.correct_answer}</span>
                </p>
                {currentQuestion.explanation && (
                  <p className="text-cream/40 text-sm">{currentQuestion.explanation}</p>
                )}
              </motion.div>
            )}

            {/* Pass phase */}
            {phase === 'passed' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <p className="text-center text-cream/60">Wrong! Question passes to another player for 1 point:</p>
                <div className="space-y-2">
                  {game.players
                    .filter((p) => p.id !== trivia.grabbedByPlayerId)
                    .map((player) => (
                      <button
                        key={player.id}
                        onClick={() => handlePass(player.id)}
                        className="w-full p-3 rounded-lg bg-cream/5 text-cream hover:bg-cream/10 transition-colors border border-cream/10 font-medium"
                      >
                        Pass to {player.name}
                      </button>
                    ))}
                  <Button onClick={nextQuestion} variant="outline" className="w-full">
                    Skip — Next Question
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {game.phase === 'game_over' && (
          <motion.div key="game-over" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameOverScreen
              winner={game.getWinner()}
              players={game.players}
              onPlayAgain={() => {
                game.reset()
                trivia.reset()
                game.setGameType('trivia')
                game.setWinScore(GAME_CONFIG.TRIVIA.WIN_SCORE)
                setPhase('question')
              }}
              onExit={() => router.push('/games')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
