'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { getInitials } from '@/lib/utils'

export default function ProfilePage() {
  const { user, refreshUser } = useAuthStore()
  const [displayName, setDisplayName] = useState(user?.display_name || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setMessage('')

    const supabase = createClient()
    const { error } = await supabase.from('users')
      .update({ display_name: displayName })
      .eq('id', user.id)

    if (error) {
      setMessage('Failed to update profile')
    } else {
      setMessage('Profile updated!')
      await refreshUser()
    }
    setSaving(false)
  }

  if (!user) return null

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="font-display text-3xl font-bold text-gold">Profile</h1>

      <Card>
        <CardContent className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
            {getInitials(user.display_name || user.email)}
          </div>
          <div>
            <h2 className="text-cream font-semibold text-lg">{user.display_name || 'No name set'}</h2>
            <p className="text-cream/40 text-sm">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="gold">{user.subscription_tier}</Badge>
              <Badge>{user.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          {message && (
            <p className={`text-sm ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
          <Button onClick={handleSave} loading={saving}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-cream/60">Member since</span>
            <span className="text-cream">{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/60">Subscription</span>
            <span className="text-cream capitalize">{user.subscription_tier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/60">Role</span>
            <span className="text-cream capitalize">{user.role.replace('_', ' ')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
