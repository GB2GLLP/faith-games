'use client'

import { useEffect, useState } from 'react'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

const TABLES = [
  { key: 'bible_scenes', label: 'Bible Scenes', icon: '🎭' },
  { key: 'bible_characters', label: 'Bible Characters', icon: '🤔' },
  { key: 'bible_verses', label: 'Bible Verses', icon: '📖' },
  { key: 'trivia_questions', label: 'Trivia Questions', icon: '🧠' },
]

export default function SuperContentPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const results = await Promise.all(
        TABLES.map(async (t) => {
          const { count } = await supabase.from(t.key).select('*', { count: 'exact', head: true })
          return { key: t.key, count: count || 0 }
        })
      )
      const countMap: Record<string, number> = {}
      results.forEach((r) => { countMap[r.key] = r.count })
      setCounts(countMap)
      setLoading(false)
    }
    load()
  }, [])

  const loadTable = async (table: string) => {
    setSelectedTable(table)
    const supabase = createClient()
    const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false }).limit(50)
    setItems(data || [])
  }

  return (
    <RoleGuard role="super_admin">
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-gold">Content Management</h1>

        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TABLES.map((t) => (
                <div key={t.key} onClick={() => loadTable(t.key)} className="cursor-pointer">
                  <Card
                    hover
                    className={selectedTable === t.key ? 'border-gold/40' : ''}
                  >
                    <CardContent className="text-center">
                      <div className="text-2xl mb-1">{t.icon}</div>
                      <p className="text-cream text-sm font-medium">{t.label}</p>
                      <p className="text-gold font-bold text-lg">{counts[t.key]}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {selectedTable && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-cream">
                  {TABLES.find((t) => t.key === selectedTable)?.label} ({items.length})
                </h2>
                {items.map((item: any) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <p className="text-cream font-medium">
                          {item.title || item.name || item.question || item.reference}
                        </p>
                        <p className="text-cream/40 text-sm truncate max-w-md">
                          {item.description || item.text || item.correct_answer || ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{item.difficulty}</Badge>
                        <Badge variant={item.is_premium ? 'gold' : 'default'}>
                          {item.is_premium ? 'Premium' : 'Free'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </RoleGuard>
  )
}
