'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { useGuessVerseStore } from '@/stores/guessVerseStore'
import { useGameContent } from '@/hooks/useGameContent'
import { PlayerSetup, ScoreBoard, GrabButton, GameOverScreen, DifficultySelector, CategoryFilter } from '@/components/game'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useAuthGate } from '@/hooks/useAuthGate'
import { AuthGateModal } from '@/components/auth/AuthGateModal'
import { GAME_CONFIG, CATEGORIES } from '@/lib/constants'
import type { Database } from '@/lib/types/database'

type BibleVerse = Database['public']['Tables']['bible_verses']['Row']

export default function GuessVersePage() {
  const router = useRouter()
  const game = useGameStore()
  const verse = useGuessVerseStore()
  const revealInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const { showAuthModal, setShowAuthModal, requireAuth, onAuthSuccess } = useAuthGate()
  const [playerChoosing, setPlayerChoosing] = useState<string | null>(null)
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null)

  const { data: verses, loading: contentLoading } = useGameContent<BibleVerse>({
    table: 'bible_verses',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  useEffect(() => {
    game.setGameType('guess_verse')
    game.setWinScore(GAME_CONFIG.GUESS_VERSE.WIN_SCORE)
    return () => {
      game.reset()
      verse.reset()
      if (revealInterval.current) clearInterval(revealInterval.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (verses.length > 0) {
      verse.setVerses(verses)
    }
  }, [verses]) // eslint-disable-line react-hooks/exhaustive-deps

  const startRevealing = useCallback(() => {
    if (revealInterval.current) clearInterval(revealInterval.current)
    revealInterval.current = setInterval(() => {
      const store = useGuessVerseStore.getState()
      if (store.revealedWordCount >= store.words.length || store.revealPhase !== 'revealing') {
        if (revealInterval.current) clearInterval(revealInterval.current)
        return
      }
      store.revealNextWord()
    }, GAME_CONFIG.GUESS_VERSE.REVEAL_INTERVAL_MS)
  }, [])

  const handleStartGame = () => {
    game.setPhase('playing')
    startRevealing()
  }

  const handleGrab = (playerId: string) => {
    const success = verse.grabVerse(playerId)
    if (success) {
      if (revealInterval.current) clearInterval(revealInterval.current)
      setPlayerChoosing(playerId)
      setAnswerCorrect(null)
    }
    return success
  }

  const handleAnswer = (correct: boolean) => {
    const points = verse.getPointsForTiming()
    const playerId = verse.grabbedByPlayerId
    setAnswerCorrect(correct)

    if (correct && playerId) {
      game.updateScore(playerId, points)
      verse.markAnswered()

      // Check win
      const winner = game.getWinner()
      if (winner) {
        setTimeout(() => game.setPhase('game_over'), 1500)
      } else {
        setTimeout(() => {
          verse.nextVerse()
          setPlayerChoosing(null)
          setAnswerCorrect(null)
          startRevealing()
        }, 2000)
      }
    } else if (playerId) {
      // Wrong answer - penalty and reopen
      game.updateScore(playerId, GAME_CONFIG.GUESS_VERSE.PENALTY)
      setTimeout(() => {
        // Reset to revealing state so others can grab
        useGuessVerseStore.setState({
          revealPhase: 'revealing',
          grabbedByPlayerId: null,
        })
        setPlayerChoosing(null)
        setAnswerCorrect(null)
        startRevealing()
      }, 1500)
    }
  }

  const currentVerse = verse.getCurrentVerse()
  const revealedWords = verse.words.slice(0, verse.revealedWordCount)
  const hiddenCount = verse.words.length - verse.revealedWordCount

  if (contentLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" /></div>
  }

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {game.phase === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gold mb-6">Guess The Verse</h1>
            <div className="space-y-6">
              <DifficultySelector />
              <CategoryFilter categories={CATEGORIES.VERSES} />
              <PlayerSetup
                minPlayers={GAME_CONFIG.GUESS_VERSE.MIN_PLAYERS}
                maxPlayers={8}
                onReady={() => requireAuth(() => game.setPhase('ready'))}
              />
            </div>
          </motion.div>
        )}

        {game.phase === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-8">
            <h2 className="font-display text-2xl font-bold text-gold">Ready?</h2>
            <p className="text-cream/60">Place the phone in the center. A verse will be revealed word by word. Tap GRAB when you think you know the reference!</p>
            <div className="text-sm text-cream/40 space-y-1">
              <p>Early guess (0-33%): +3 points</p>
              <p>Mid guess (34-66%): +2 points</p>
              <p>Late guess (67-100%): +1 point</p>
              <p>Wrong guess: -1 point</p>
            </div>
            <ScoreBoard players={game.players} winScore={game.winScore} />
            <Button onClick={handleStartGame} size="lg">Start Revealing!</Button>
          </motion.div>
        )}

        {game.phase === 'playing' && currentVerse && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 py-4">
            <ScoreBoard players={game.players} winScore={game.winScore} />

            {/* Verse reveal area */}
            <div className="min-h-[200px] p-6 rounded-xl bg-navy-light border border-cream/10">
              <div className="flex flex-wrap gap-1.5">
                {revealedWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-cream text-lg font-medium"
                  >
                    {word}
                  </motion.span>
                ))}
                {hiddenCount > 0 && (
                  <span className="text-cream/20 text-lg">{'_ '.repeat(Math.min(hiddenCount, 10))}{hiddenCount > 10 ? '...' : ''}</span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-cream/30">
                <span>{Math.round(verse.getRevealProgress() * 100)}% revealed</span>
                <span>+{verse.getPointsForTiming()} points</span>
              </div>
            </div>

            {/* Grab area or answer area */}
            {verse.revealPhase === 'revealing' && (
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

            {verse.revealPhase === 'grabbed' && playerChoosing && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 p-4 rounded-xl bg-gold/10 border border-gold/30">
                <p className="text-gold font-bold">
                  {game.players.find((p) => p.id === playerChoosing)?.name} grabbed it!
                </p>
                <p className="text-cream/60 text-sm">Is their answer correct?</p>
                <div className="flex gap-3">
                  <Button onClick={() => handleAnswer(true)} className="flex-1" size="lg">
                    ✓ Correct
                  </Button>
                  <Button onClick={() => handleAnswer(false)} variant="danger" className="flex-1" size="lg">
                    ✕ Wrong
                  </Button>
                </div>
              </motion.div>
            )}

            {answerCorrect !== null && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-4">
                <span className={`text-4xl ${answerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {answerCorrect ? '✓ Correct!' : '✕ Wrong!'}
                </span>
                {answerCorrect && currentVerse && (
                  <p className="mt-2 text-cream/60">{currentVerse.reference}</p>
                )}
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
                verse.reset()
                if (revealInterval.current) clearInterval(revealInterval.current)
                game.setGameType('guess_verse')
                game.setWinScore(GAME_CONFIG.GUESS_VERSE.WIN_SCORE)
              }}
              onExit={() => router.push('/games')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AuthGateModal open={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={onAuthSuccess} />
    </div>
  )
}
