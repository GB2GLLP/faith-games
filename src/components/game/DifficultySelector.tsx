'use client'

import { useGameStore } from '@/stores/gameStore'

const DIFFICULTIES = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
] as const

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useGameStore()

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-cream/80">Difficulty</label>
      <div className="grid grid-cols-4 gap-2">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            onClick={() => setDifficulty(d.value)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              difficulty === d.value
                ? 'bg-gold text-navy'
                : 'bg-cream/5 text-cream/60 hover:bg-cream/10'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  )
}
