'use client'

import { motion } from 'framer-motion'
import type { Player } from '@/stores/gameStore'

interface TurnIndicatorProps {
  currentPlayer: Player
  onReady: () => void
}

export function TurnIndicator({ currentPlayer, onReady }: TurnIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-12"
    >
      <h2 className="text-cream/60 text-lg">It&apos;s your turn!</h2>
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="font-display text-4xl font-bold text-gold"
      >
        {currentPlayer.name}
      </motion.p>
      {currentPlayer.team && (
        <p className={`text-sm font-medium ${
          currentPlayer.team === 'A' ? 'text-blue-400' : 'text-red-400'
        }`}>
          Team {currentPlayer.team}
        </p>
      )}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReady}
        className="px-12 py-4 bg-gold text-navy text-lg font-bold rounded-xl hover:bg-gold-light transition-colors"
      >
        Ready!
      </motion.button>
    </motion.div>
  )
}
