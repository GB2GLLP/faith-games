'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'

export default function ChurchSettingsPage() {
  const { user } = useAuth('church_admin')
  const [church, setChurch] = useState<any>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const churchId = user?.church_id
    if (!churchId) return
    const id = churchId as string
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('churches').select('*').eq('id', id).single()
      setChurch(data)
      setName(data?.name || '')
      setLoading(false)
    }
    load()
  }, [user?.church_id])

  const handleSave = async () => {
    if (!church) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('churches').update({ name }).eq('id', church.id)
    setMessage(error ? 'Failed to save' : 'Settings saved!')
    setSaving(false)
  }

  const regenerateCode = async () => {
    if (!church) return
    if (!confirm('This will invalidate the current code. Continue?')) return
    const res = await fetch('/api/churches/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: church.name }) })
    // This is simplified - in production would have a dedicated regenerate endpoint
    setMessage('Code regeneration requires a dedicated endpoint. Coming soon!')
  }

  if (loading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="font-display text-3xl font-bold text-gold">Church Settings</h1>

      <Card>
        <CardHeader><CardTitle>Church Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Church Name" value={name} onChange={(e) => setName(e.target.value)} />
          {message && <p className="text-sm text-green-400">{message}</p>}
          <Button onClick={handleSave} loading={saving}>Save</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Church Code</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-mono font-bold text-gold tracking-wider">{church?.code}</p>
          <p className="text-cream/40 text-sm">Share this code with your church members so they can join.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(church?.code || '')}>Copy</Button>
            <Button variant="ghost" onClick={regenerateCode}>Regenerate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
