'use client'

import { motion } from 'framer-motion'
import type { Player } from '@/stores/gameStore'

interface ScoreBoardProps {
  players: Player[]
  currentPlayerId?: string
  winScore?: number
  showTeams?: boolean
}

export function ScoreBoard({ players, currentPlayerId, winScore, showTeams }: ScoreBoardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  if (showTeams) {
    const teamA = players.filter((p) => p.team === 'A')
    const teamB = players.filter((p) => p.team === 'B')
    const scoreA = teamA.reduce((s, p) => s + p.score, 0)
    const scoreB = teamB.reduce((s, p) => s + p.score, 0)

    return (
      <div className="flex gap-4 justify-center">
        <TeamCard name="Team A" score={scoreA} players={teamA} winScore={winScore} color="text-blue-400" />
        <div className="text-cream/30 self-center text-2xl font-bold">VS</div>
        <TeamCard name="Team B" score={scoreB} players={teamB} winScore={winScore} color="text-red-400" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sorted.map((player, i) => (
        <motion.div
          key={player.id}
          layout
          className={`flex items-center justify-between px-4 py-2 rounded-lg ${
            player.id === currentPlayerId ? 'bg-gold/10 border border-gold/30' : 'bg-cream/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-cream/40 text-sm w-6">{i + 1}.</span>
            <span className="text-cream font-medium">{player.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              key={player.score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-gold font-bold text-lg tabular-nums"
            >
              {player.score}
            </motion.span>
            {winScore && (
              <span className="text-cream/30 text-sm">/ {winScore}</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TeamCard({
  name,
  score,
  players,
  winScore,
  color,
}: {
  name: string
  score: number
  players: Player[]
  winScore?: number
  color: string
}) {
  return (
    <div className="flex-1 p-4 rounded-xl bg-navy border border-cream/10 text-center">
      <h3 className={`font-bold ${color}`}>{name}</h3>
      <motion.div
        key={score}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold text-cream my-2 tabular-nums"
      >
        {score}
        {winScore && <span className="text-cream/30 text-lg">/ {winScore}</span>}
      </motion.div>
      <div className="text-sm text-cream/40">
        {players.map((p) => p.name).join(', ')}
      </div>
    </div>
  )
}
