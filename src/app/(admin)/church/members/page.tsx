'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

export default function ChurchMembersPage() {
  const { user } = useAuth('church_admin')
  const [church, setChurch] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const churchId = user?.church_id
    if (!churchId) return
    const id = churchId as string
    async function load() {
      const supabase = createClient()
      const [churchRes, membersRes] = await Promise.all([
        supabase.from('churches').select('*').eq('id', id).single(),
        supabase.from('church_memberships').select('*, users(*)').eq('church_id', id),
      ])
      setChurch(churchRes.data)
      setMembers(membersRes.data || [])
      setLoading(false)
    }
    load()
  }, [user?.church_id])

  const removeMember = async (membershipId: string, userId: string) => {
    if (userId === user?.id) return
    const supabase = createClient()
    await supabase.from('church_memberships').delete().eq('id', membershipId)
    setMembers(members.filter((m) => m.id !== membershipId))
  }

  if (loading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gold">Church Members</h1>
        <Badge variant="gold">{church?.current_seats}/{church?.max_seats} seats</Badge>
      </div>

      {/* Church Code */}
      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-cream/60 text-sm">Church Code</p>
            <p className="text-2xl font-mono font-bold text-gold tracking-wider">{church?.code}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(church?.code || '')}
          >
            Copy Code
          </Button>
        </CardContent>
      </Card>

      {/* Members list */}
      <div className="space-y-2">
        {members.map((m: any) => (
          <Card key={m.id}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-cream font-medium">{(m.users as any)?.display_name || 'Unknown'}</p>
                <p className="text-cream/40 text-sm">{(m.users as any)?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-cream/30">Joined {new Date(m.joined_at).toLocaleDateString()}</span>
                {m.user_id !== user?.id && (
                  <Button variant="ghost" size="sm" onClick={() => removeMember(m.id, m.user_id)}>
                    Remove
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
