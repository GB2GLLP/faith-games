'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface TeamSetupProps {
  minPlayers: number
  maxPlayers: number
  onReady: () => void
}

export function TeamSetup({ minPlayers, maxPlayers, onReady }: TeamSetupProps) {
  const { players, addPlayer, removePlayer } = useGameStore()
  const [name, setName] = useState('')
  const [team, setTeam] = useState<'A' | 'B'>('A')

  const teamA = players.filter((p) => p.team === 'A')
  const teamB = players.filter((p) => p.team === 'B')

  const handleAdd = () => {
    if (name.trim() && players.length < maxPlayers) {
      addPlayer(name.trim(), team)
      setName('')
    }
  }

  const canStart = players.length >= minPlayers && teamA.length >= 1 && teamB.length >= 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-cream mb-1">Set Up Teams</h2>
        <p className="text-sm text-cream/40">
          Add at least {minPlayers} players across two teams.
        </p>
      </div>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setTeam('A')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            team === 'A' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-cream/5 text-cream/40'
          }`}
        >
          Team A ({teamA.length})
        </button>
        <button
          onClick={() => setTeam('B')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            team === 'B' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-cream/5 text-cream/40'
          }`}
        >
          Team B ({teamB.length})
        </button>
      </div>

      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Player for Team ${team}`}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1"
        />
        <Button onClick={handleAdd} disabled={!name.trim() || players.length >= maxPlayers}>
          Add
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-blue-400 font-medium text-sm mb-2">Team A</h3>
          <AnimatePresence>
            {teamA.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between px-3 py-1.5 bg-blue-500/10 rounded mb-1 text-sm"
              >
                <span className="text-cream">{p.name}</span>
                <button onClick={() => removePlayer(p.id)} className="text-cream/30 hover:text-red-400">✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div>
          <h3 className="text-red-400 font-medium text-sm mb-2">Team B</h3>
          <AnimatePresence>
            {teamB.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between px-3 py-1.5 bg-red-500/10 rounded mb-1 text-sm"
              >
                <span className="text-cream">{p.name}</span>
                <button onClick={() => removePlayer(p.id)} className="text-cream/30 hover:text-red-400">✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Button onClick={onReady} disabled={!canStart} className="w-full" size="lg">
        {canStart ? 'Start Game' : 'Need players on both teams'}
      </Button>
    </div>
  )
}
