'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { useCharadesStore } from '@/stores/charadesStore'
import { useTimer } from '@/hooks/useTimer'
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation'
import { useWakeLock } from '@/hooks/useWakeLock'
import { useGameContent } from '@/hooks/useGameContent'
import { PlayerSetup, Timer, ScoreBoard, ForeheadDisplay, SwipeHandler, GameOverScreen, DifficultySelector, CategoryFilter, TurnIndicator } from '@/components/game'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useAuthGate } from '@/hooks/useAuthGate'
import { AuthGateModal } from '@/components/auth/AuthGateModal'
import { GAME_CONFIG, CATEGORIES } from '@/lib/constants'
import type { Database } from '@/lib/types/database'

type BibleScene = Database['public']['Tables']['bible_scenes']['Row']

export default function CharadesPage() {
  const router = useRouter()
  const game = useGameStore()
  const charades = useCharadesStore()
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock()
  const { showAuthModal, setShowAuthModal, requireAuth, onAuthSuccess } = useAuthGate()

  const { data: scenes, loading: contentLoading } = useGameContent<BibleScene>({
    table: 'bible_scenes',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  const handleTimerComplete = useCallback(() => {
    releaseWakeLock()
    // Add score for current player
    const currentPlayer = game.players[game.currentPlayerIndex]
    if (currentPlayer) {
      game.updateScore(currentPlayer.id, charades.correctCount)
    }
    game.setPhase('turn_end')
  }, [game, charades.correctCount, releaseWakeLock])

  const timer = useTimer({
    initialTime: game.timerDuration || GAME_CONFIG.CHARADES.DEFAULT_TIMER,
    onComplete: handleTimerComplete,
  })

  const handleCorrect = useCallback(() => {
    charades.markCorrect()
  }, [charades])

  const handleSkip = useCallback(() => {
    charades.markSkipped()
  }, [charades])

  const { requestPermission, isSupported: orientationSupported } = useDeviceOrientation({
    onTiltDown: handleCorrect,
    onTiltUp: handleSkip,
    enabled: game.phase === 'playing',
  })

  // Initialize game
  useEffect(() => {
    game.setGameType('charades')
    game.setTimerDuration(GAME_CONFIG.CHARADES.DEFAULT_TIMER)
    return () => {
      game.reset()
      charades.reset()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Load scenes into charades store
  useEffect(() => {
    if (scenes.length > 0) {
      charades.setScenes(scenes)
    }
  }, [scenes]) // eslint-disable-line react-hooks/exhaustive-deps

  const startTurn = async () => {
    if (orientationSupported) {
      await requestPermission()
    }
    await requestWakeLock()
    charades.startRound()
    game.setPhase('playing')
    timer.reset()
    timer.start()
  }

  const nextTurn = () => {
    game.nextTurn()
    charades.reset()
    game.setPhase('ready')
  }

  const currentScene = charades.getCurrentScene()
  const currentPlayer = game.players[game.currentPlayerIndex]

  if (contentLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {/* Setup Phase */}
        {game.phase === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gold mb-6">Bible Story Charades</h1>
            <div className="space-y-6">
              <DifficultySelector />
              <CategoryFilter categories={CATEGORIES.CHARADES} />
              <div className="space-y-2">
                <label className="text-sm font-medium text-cream/80">Timer (seconds)</label>
                <div className="flex gap-2">
                  {[30, 45, 60, 90].map((t) => (
                    <button
                      key={t}
                      onClick={() => game.setTimerDuration(t)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        game.timerDuration === t ? 'bg-gold text-navy' : 'bg-cream/5 text-cream/60'
                      }`}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>
              <PlayerSetup
                minPlayers={GAME_CONFIG.CHARADES.MIN_PLAYERS}
                maxPlayers={12}
                onReady={() => requireAuth(() => game.setPhase('ready'))}
              />
            </div>
          </motion.div>
        )}

        {/* Ready Phase */}
        {game.phase === 'ready' && currentPlayer && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TurnIndicator currentPlayer={currentPlayer} onReady={startTurn} />
            <div className="mt-6">
              <ScoreBoard players={game.players} currentPlayerId={currentPlayer.id} />
            </div>
          </motion.div>
        )}

        {/* Playing Phase */}
        {game.phase === 'playing' && currentScene && (
          <SwipeHandler onSwipeLeft={handleCorrect} onSwipeRight={handleSkip} className="fixed inset-0 z-50">
            <ForeheadDisplay text={currentScene.title} subtitle={currentScene.description} />
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 forehead-display">
              <Timer time={timer.time} maxTime={game.timerDuration} size="sm" />
            </div>
          </SwipeHandler>
        )}

        {/* Turn End */}
        {game.phase === 'turn_end' && currentPlayer && (
          <motion.div key="turn-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-8">
            <h2 className="font-display text-2xl font-bold text-gold">Time&apos;s Up!</h2>
            <div className="text-5xl font-bold text-cream">{charades.correctCount}</div>
            <p className="text-cream/60">
              {currentPlayer.name} got {charades.correctCount} correct, skipped {charades.skippedCount}
            </p>
            <ScoreBoard players={game.players} currentPlayerId={currentPlayer.id} />
            <Button onClick={nextTurn} size="lg" className="w-full">
              Next Player
            </Button>
            <Button onClick={() => game.setPhase('game_over')} variant="outline" size="lg" className="w-full">
              End Game
            </Button>
          </motion.div>
        )}

        {/* Game Over */}
        {game.phase === 'game_over' && (
          <motion.div key="game-over" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameOverScreen
              winner={game.players.reduce((a, b) => (a.score > b.score ? a : b), game.players[0])}
              players={game.players}
              onPlayAgain={() => {
                game.reset()
                charades.reset()
                game.setGameType('charades')
                game.setTimerDuration(GAME_CONFIG.CHARADES.DEFAULT_TIMER)
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
