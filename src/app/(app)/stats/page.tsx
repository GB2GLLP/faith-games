'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Spinner } from '@/components/ui/Spinner'

const gameLabels: Record<string, { name: string; icon: string }> = {
  charades: { name: 'Bible Story Charades', icon: '🎭' },
  who_am_i: { name: 'What Bible Character Am I?', icon: '🤔' },
  guess_verse: { name: 'Guess The Verse', icon: '📖' },
  trivia: { name: 'Bible Trivia', icon: '🧠' },
}

export default function StatsPage() {
  const [stats, setStats] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [statsRes, sessionsRes] = await Promise.all([
        supabase.from('game_stats').select('*'),
        supabase.from('game_sessions').select('*').order('created_at', { ascending: false }).limit(20),
      ])
      setStats(statsRes.data || [])
      setSessions(sessionsRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" /></div>
  }

  const totalGames = stats.reduce((s: number, st: any) => s + st.games_played, 0)
  const totalWins = stats.reduce((s: number, st: any) => s + st.games_won, 0)
  const bestStreak = Math.max(0, ...stats.map((s: any) => s.best_streak))

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold text-gold">Your Stats</h1>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Games', value: totalGames, icon: '🎮' },
          { label: 'Total Wins', value: totalWins, icon: '🏆' },
          { label: 'Win Rate', value: totalGames > 0 ? `${Math.round((totalWins / totalGames) * 100)}%` : '0%', icon: '📈' },
          { label: 'Best Streak', value: bestStreak, icon: '🔥' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-2xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-cream/40">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Per-game stats */}
      <div>
        <h2 className="text-lg font-semibold text-cream mb-4">By Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(gameLabels).map(([key, meta]) => {
            const gameStat = stats.find((s: any) => s.game_type === key)
            return (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{meta.icon} {meta.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {gameStat ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/60">Games</span>
                        <span className="text-cream">{gameStat.games_played}</span>
                      </div>
                      <ProgressBar
                        value={gameStat.games_won}
                        max={gameStat.games_played || 1}
                        label="Win rate"
                        showValue
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/60">Best Score</span>
                        <span className="text-gold font-medium">{gameStat.best_score}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/60">Current Streak</span>
                        <span className="text-cream">{gameStat.current_streak} 🔥</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-cream/30 text-sm">No games played yet</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Game History */}
      <div>
        <h2 className="text-lg font-semibold text-cream mb-4">Recent Games</h2>
        <div className="space-y-2">
          {sessions.length === 0 ? (
            <p className="text-cream/40 text-center py-8">No games yet</p>
          ) : (
            sessions.map((s: any) => (
              <Card key={s.id}>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{gameLabels[s.game_type]?.icon}</span>
                    <div>
                      <p className="text-cream text-sm font-medium">{gameLabels[s.game_type]?.name}</p>
                      <p className="text-cream/30 text-xs">{new Date(s.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {s.winner && <p className="text-gold text-sm">{s.winner}</p>}
                    <p className="text-cream/30 text-xs">{Math.floor(s.duration_seconds / 60)}m {s.duration_seconds % 60}s</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
