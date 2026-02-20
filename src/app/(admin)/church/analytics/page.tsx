'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'

export default function ChurchAnalyticsPage() {
  const { user } = useAuth('church_admin')
  const [stats, setStats] = useState({ totalGames: 0, totalMembers: 0, topPlayers: [] as any[] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const churchId = user?.church_id
    if (!churchId) return
    const id = churchId as string
    async function load() {
      const supabase = createClient()
      const [gamesRes, membersRes] = await Promise.all([
        supabase.from('game_sessions').select('id', { count: 'exact' }).eq('church_id', id),
        supabase.from('church_memberships').select('id', { count: 'exact' }).eq('church_id', id),
      ])
      setStats({
        totalGames: gamesRes.count || 0,
        totalMembers: membersRes.count || 0,
        topPlayers: [],
      })
      setLoading(false)
    }
    load()
  }, [user?.church_id])

  if (loading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-display text-3xl font-bold text-gold">Church Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-gold">{stats.totalMembers}</p>
            <p className="text-cream/40 text-sm">Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-gold">{stats.totalGames}</p>
            <p className="text-cream/40 text-sm">Games Played</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
        <CardContent>
          <p className="text-cream/40 text-sm">Detailed analytics coming soon with premium subscription.</p>
        </CardContent>
      </Card>
    </div>
  )
}
