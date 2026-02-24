'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { useWhoAmIStore } from '@/stores/whoAmIStore'
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation'
import { useWakeLock } from '@/hooks/useWakeLock'
import { useGameContent } from '@/hooks/useGameContent'
import { TeamSetup, ScoreBoard, ForeheadDisplay, SwipeHandler, GameOverScreen, DifficultySelector, CategoryFilter } from '@/components/game'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useAuthGate } from '@/hooks/useAuthGate'
import { AuthGateModal } from '@/components/auth/AuthGateModal'
import { GAME_CONFIG, CATEGORIES } from '@/lib/constants'
import type { Database } from '@/lib/types/database'

type BibleCharacter = Database['public']['Tables']['bible_characters']['Row']

export default function WhoAmIPage() {
  const router = useRouter()
  const game = useGameStore()
  const whoAmI = useWhoAmIStore()
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock()
  const { showAuthModal, setShowAuthModal, requireAuth, onAuthSuccess } = useAuthGate()
  const [showHints, setShowHints] = useState(false)

  const { data: characters, loading: contentLoading } = useGameContent<BibleCharacter>({
    table: 'bible_characters',
    categories: game.categories.length > 0 ? game.categories : undefined,
    difficulty: game.difficulty,
  })

  const handleCorrect = useCallback(() => {
    const currentPlayer = game.players[game.currentPlayerIndex]
    if (currentPlayer && currentPlayer.team) {
      // Award point to the current player's team
      const teamPlayers = game.players.filter((p) => p.team === currentPlayer.team)
      teamPlayers.forEach((p) => game.updateScore(p.id, 1))
    }
    whoAmI.nextCharacter()
    setShowHints(false)

    // Check win condition
    const teamScores = game.getTeamScores()
    if (teamScores.A >= game.winScore || teamScores.B >= game.winScore) {
      releaseWakeLock()
      game.setPhase('game_over')
    } else {
      game.nextTurn()
      game.setPhase('ready')
      releaseWakeLock()
    }
  }, [game, whoAmI, releaseWakeLock])

  const handleSkip = useCallback(() => {
    whoAmI.nextCharacter()
    setShowHints(false)
    game.nextTurn()
    game.setPhase('ready')
    releaseWakeLock()
  }, [game, whoAmI, releaseWakeLock])

  const { requestPermission, isSupported: orientationSupported } = useDeviceOrientation({
    onTiltDown: handleCorrect,
    onTiltUp: handleSkip,
    enabled: game.phase === 'playing',
  })

  useEffect(() => {
    game.setGameType('who_am_i')
    game.setWinScore(GAME_CONFIG.WHO_AM_I.WIN_SCORE)
    return () => {
      game.reset()
      whoAmI.reset()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (characters.length > 0) {
      whoAmI.setCharacters(characters)
    }
  }, [characters]) // eslint-disable-line react-hooks/exhaustive-deps

  const startTurn = async () => {
    if (orientationSupported) {
      await requestPermission()
    }
    await requestWakeLock()
    setShowHints(false)
    game.setPhase('playing')
  }

  const currentCharacter = whoAmI.getCurrentCharacter()
  const currentPlayer = game.players[game.currentPlayerIndex]
  const teamScores = game.getTeamScores()
  const winner = teamScores.A >= game.winScore ? 'Team A' : teamScores.B >= game.winScore ? 'Team B' : null

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
        {game.phase === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gold mb-6">What Bible Character Am I?</h1>
            <div className="space-y-6">
              <DifficultySelector />
              <CategoryFilter categories={CATEGORIES.CHARACTERS} />
              <TeamSetup
                minPlayers={GAME_CONFIG.WHO_AM_I.MIN_PLAYERS}
                maxPlayers={12}
                onReady={() => requireAuth(() => game.setPhase('ready'))}
              />
            </div>
          </motion.div>
        )}

        {game.phase === 'ready' && currentPlayer && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-6">
              <ScoreBoard players={game.players} showTeams winScore={game.winScore} />
            </div>
            <div className="text-center space-y-6 py-8">
              <h2 className="text-cream/60 text-lg">{currentPlayer.team === 'A' ? 'Team A' : 'Team B'}&apos;s turn</h2>
              <p className="font-display text-3xl font-bold text-gold">{currentPlayer.name}</p>
              <p className="text-cream/40 text-sm">Put the phone on your forehead. Your team will give you clues!</p>
              <Button onClick={startTurn} size="lg">
                Ready — Show Character!
              </Button>
            </div>
          </motion.div>
        )}

        {game.phase === 'playing' && currentCharacter && (
          <SwipeHandler onSwipeLeft={handleCorrect} onSwipeRight={handleSkip} className="fixed inset-0 z-50">
            <ForeheadDisplay text={currentCharacter.name} />
            {/* Hint button for teammates (visible, not rotated) */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
              <button
                onClick={() => {
                  whoAmI.revealHint()
                  setShowHints(true)
                }}
                className="px-4 py-2 bg-navy-light border border-cream/20 rounded-lg text-cream/60 text-sm"
              >
                Show Hint ({whoAmI.hintsRevealed}/3)
              </button>
              {showHints && (
                <div className="mt-2 p-3 bg-navy-light border border-cream/10 rounded-lg">
                  {whoAmI.getVisibleHints().map((hint, i) => (
                    <p key={i} className="text-cream/70 text-sm">{i + 1}. {hint}</p>
                  ))}
                </div>
              )}
            </div>
          </SwipeHandler>
        )}

        {game.phase === 'game_over' && (
          <motion.div key="game-over" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameOverScreen
              winner={winner}
              players={game.players}
              onPlayAgain={() => {
                game.reset()
                whoAmI.reset()
                game.setGameType('who_am_i')
                game.setWinScore(GAME_CONFIG.WHO_AM_I.WIN_SCORE)
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
