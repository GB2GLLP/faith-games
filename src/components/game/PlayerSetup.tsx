'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface PlayerSetupProps {
  minPlayers: number
  maxPlayers: number
  onReady: () => void
}

export function PlayerSetup({ minPlayers, maxPlayers, onReady }: PlayerSetupProps) {
  const { players, addPlayer, removePlayer } = useGameStore()
  const [name, setName] = useState('')

  const handleAdd = () => {
    if (name.trim() && players.length < maxPlayers) {
      addPlayer(name.trim())
      setName('')
    }
  }

  const canStart = players.length >= minPlayers

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-cream mb-1">Add Players</h2>
        <p className="text-sm text-cream/40">
          {minPlayers}–{maxPlayers} players needed. {players.length} added.
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1"
        />
        <Button onClick={handleAdd} disabled={!name.trim() || players.length >= maxPlayers}>
          Add
        </Button>
      </div>

      <AnimatePresence>
        {players.map((player) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between px-4 py-2 bg-cream/5 rounded-lg"
          >
            <span className="text-cream">{player.name}</span>
            <button
              onClick={() => removePlayer(player.id)}
              className="text-cream/30 hover:text-red-400 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button onClick={onReady} disabled={!canStart} className="w-full" size="lg">
        {canStart ? 'Start Game' : `Need ${minPlayers - players.length} more player${minPlayers - players.length > 1 ? 's' : ''}`}
      </Button>
    </div>
  )
}
