'use client'

import { useEffect, useState } from 'react'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

export default function SuperUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false }).limit(100)
      setUsers(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <RoleGuard role="super_admin">
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-gold">All Users</h1>
        <p className="text-cream/40">{users.length} users</p>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="space-y-2">
            {users.map((u: any) => (
              <Card key={u.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium">{u.display_name || 'No name'}</p>
                    <p className="text-cream/40 text-sm">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={u.role === 'super_admin' ? 'danger' : u.role === 'church_admin' ? 'warning' : 'default'}>
                      {u.role}
                    </Badge>
                    <Badge variant="gold">{u.subscription_tier}</Badge>
                    <span className="text-cream/30 text-xs">{new Date(u.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  )
}
