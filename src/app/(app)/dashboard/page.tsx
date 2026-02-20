'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ROUTES } from '@/lib/constants'

const quickPlayGames = [
  { title: 'Charades', icon: '🎭', href: ROUTES.GAMES.CHARADES },
  { title: 'Who Am I?', icon: '🤔', href: ROUTES.GAMES.WHO_AM_I },
  { title: 'Guess Verse', icon: '📖', href: ROUTES.GAMES.GUESS_VERSE },
  { title: 'Trivia', icon: '🧠', href: ROUTES.GAMES.TRIVIA },
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [recentGames, setRecentGames] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()

      const [gamesRes, statsRes] = await Promise.all([
        supabase
          .from('game_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('game_stats')
          .select('*'),
      ])

      setRecentGames(gamesRes.data || [])
      setStats(statsRes.data || [])
      setLoading(false)
    }
    loadData()
  }, [])

  const totalGames = stats.reduce((sum: number, s: any) => sum + (s.games_played || 0), 0)
  const totalWins = stats.reduce((sum: number, s: any) => sum + (s.games_won || 0), 0)

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" /></div>
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl font-bold text-gold">
          Welcome back, {user?.display_name || 'Friend'}!
        </h1>
        <p className="text-cream/60 mt-1">Ready to play? Pick a game below.</p>
      </div>

      {/* Quick Play */}
      <div>
        <h2 className="text-lg font-semibold text-cream mb-4">Quick Play</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickPlayGames.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={g.href}>
                <Card hover className="text-center py-6">
                  <div className="text-3xl mb-2">{g.icon}</div>
                  <p className="text-cream text-sm font-medium">{g.title}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p className="text-2xl font-bold text-gold">{totalGames}</p>
            <p className="text-sm text-cream/40">Games Played</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-2xl font-bold text-gold">{totalWins}</p>
            <p className="text-sm text-cream/40">Wins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-2xl font-bold text-gold">
              {totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0}%
            </p>
            <p className="text-sm text-cream/40">Win Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Games */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cream">Recent Games</h2>
          <Link href={ROUTES.STATS} className="text-sm text-gold hover:text-gold-light">View all</Link>
        </div>
        {recentGames.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-cream/40">No games played yet. Start your first game!</p>
              <Button className="mt-4" onClick={() => {}}>
                <Link href="/games">Browse Games</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentGames.map((session: any) => (
              <Card key={session.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium capitalize">{session.game_type?.replace('_', ' ')}</p>
                    <p className="text-sm text-cream/40">{new Date(session.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    {session.winner && <p className="text-gold text-sm font-medium">Winner: {session.winner}</p>}
                    <p className="text-cream/40 text-sm">{Math.floor(session.duration_seconds / 60)}m</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
