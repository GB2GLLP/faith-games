import { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../../stores/authStore'
import { createClient } from '../../../lib/supabase/client'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Spinner } from '../../../components/ui/Spinner'
import { useToast } from '../../../components/ui/Toast'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../lib/theme'

export default function ChurchSettingsScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth('church_admin')
  const { showToast } = useToast()
  const [church, setChurch] = useState<any>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      if (!user?.church_id) return
      const supabase = createClient()
      const { data } = await supabase
        .from('churches')
        .select('*')
        .eq('id', user.church_id)
        .single()
      if (data) {
        setChurch(data)
        setName((data as any).name)
      }
      setLoading(false)
    }
    load()
  }, [user])

  const handleSave = async () => {
    if (!church || !name.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase
      .from('churches') as any)
      .update({ name: name.trim() })
      .eq('id', church.id)

    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Church name updated!', 'success')
    }
    setSaving(false)
  }

  if (loading) {
    return <View style={styles.center}><Spinner size="lg" /></View>
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      <Text style={styles.heading}>Church Settings</Text>

      <View style={styles.formCard}>
        <Input
          label="Church Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter church name"
        />
        <Button
          onPress={handleSave}
          loading={saving}
          fullWidth
          style={{ marginTop: spacing.lg }}
        >
          Save Changes
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navy },
  heading: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    marginBottom: spacing.lg,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    ...shadows.lg,
  },
})
