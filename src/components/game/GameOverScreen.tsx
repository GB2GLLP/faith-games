'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { Player } from '@/stores/gameStore'

interface GameOverScreenProps {
  winner: Player | string | null
  players: Player[]
  onPlayAgain: () => void
  onExit: () => void
}

export function GameOverScreen({ winner, players, onPlayAgain, onExit }: GameOverScreenProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const winnerName = typeof winner === 'string' ? winner : winner?.name

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8 py-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-6xl"
      >
        🏆
      </motion.div>

      <div>
        <h1 className="font-display text-3xl font-bold text-gold">Game Over!</h1>
        {winnerName && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-cream mt-2"
          >
            <span className="text-gold font-bold">{winnerName}</span> wins!
          </motion.p>
        )}
      </div>

      <div className="space-y-2 max-w-sm mx-auto">
        <h3 className="text-sm text-cream/40 uppercase tracking-wider mb-3">Final Scores</h3>
        {sorted.map((player, i) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`flex items-center justify-between px-4 py-3 rounded-lg ${
              i === 0 ? 'bg-gold/10 border border-gold/30' : 'bg-cream/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}</span>
              <span className="text-cream font-medium">{player.name}</span>
            </div>
            <span className="text-gold font-bold text-lg">{player.score}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <Button onClick={onPlayAgain} size="lg">
          Play Again
        </Button>
        <Button onClick={onExit} variant="outline" size="lg">
          Exit
        </Button>
      </div>
    </motion.div>
  )
}
