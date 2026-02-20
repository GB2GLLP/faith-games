'use client'

import { useEffect, useState } from 'react'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

export default function SuperChurchesPage() {
  const [churches, setChurches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('churches').select('*, users!churches_admin_id_fkey(display_name)')
      setChurches(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <RoleGuard role="super_admin">
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-gold">All Churches</h1>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="space-y-2">
            {churches.map((c: any) => (
              <Card key={c.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium">{c.name}</p>
                    <p className="text-cream/40 text-sm">Code: {c.code} · Admin: {(c.users as any)?.display_name || 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{c.current_seats}/{c.max_seats} members</Badge>
                    <Badge variant="gold">{c.subscription_tier}</Badge>
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
