'use client'

import { useEffect, useState } from 'react'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'

export default function SuperAnalyticsPage() {
  const [stats, setStats] = useState({ users: 0, churches: 0, games: 0, content: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [u, c, g, s] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('churches').select('*', { count: 'exact', head: true }),
        supabase.from('game_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('bible_scenes').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        users: u.count || 0,
        churches: c.count || 0,
        games: g.count || 0,
        content: s.count || 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <RoleGuard role="super_admin">
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-gold">Platform Analytics</h1>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: stats.users, icon: '👥' },
              { label: 'Churches', value: stats.churches, icon: '⛪' },
              { label: 'Games Played', value: stats.games, icon: '🎮' },
              { label: 'Content Items', value: stats.content, icon: '📚' },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-3xl font-bold text-gold">{s.value}</p>
                  <p className="text-cream/40 text-sm">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  )
}
