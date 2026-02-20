'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

type Tab = 'global' | 'church'
type GameFilter = 'all' | 'charades' | 'who_am_i' | 'guess_verse' | 'trivia'

export default function LeaderboardPage() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState<Tab>('global')
  const [gameFilter, setGameFilter] = useState<GameFilter>('all')
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from('game_stats')
        .select('*, users!inner(display_name, church_id)')
        .order('total_score', { ascending: false })
        .limit(50)

      if (gameFilter !== 'all') {
        query = query.eq('game_type', gameFilter)
      }

      if (tab === 'church' && user?.church_id) {
        query = query.eq('users.church_id', user.church_id)
      }

      const { data } = await query
      setEntries(data || [])
      setLoading(false)
    }
    load()
  }, [tab, gameFilter, user?.church_id])

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-gold">Leaderboard</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('global')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'global' ? 'bg-gold text-navy' : 'bg-cream/5 text-cream/60'
          }`}
        >
          Global
        </button>
        {user?.church_id && (
          <button
            onClick={() => setTab('church')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'church' ? 'bg-gold text-navy' : 'bg-cream/5 text-cream/60'
            }`}
          >
            My Church
          </button>
        )}
      </div>

      {/* Game filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'charades', 'who_am_i', 'guess_verse', 'trivia'] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGameFilter(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              gameFilter === g ? 'bg-gold/20 text-gold' : 'bg-cream/5 text-cream/40'
            }`}
          >
            {g === 'all' ? 'All Games' : g.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : entries.length === 0 ? (
        <Card><CardContent className="text-center py-8 text-cream/40">No data yet</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {entries.map((entry: any, i: number) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={entry.user_id === user?.id ? 'border-gold/30' : ''}>
                <CardContent className="flex items-center gap-4">
                  <span className="text-lg font-bold text-cream/30 w-8 text-center">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-cream font-medium">
                      {(entry.users as any)?.display_name || 'Anonymous'}
                      {entry.user_id === user?.id && <Badge variant="gold" className="ml-2">You</Badge>}
                    </p>
                    <p className="text-xs text-cream/30">
                      {entry.games_played} games · {entry.games_won} wins
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold text-lg">{entry.total_score}</p>
                    <p className="text-xs text-cream/30">points</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
