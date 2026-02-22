import { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, FlatList, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Clipboard from 'expo-clipboard'
import { useAuthStore } from '../../../stores/authStore'
import { createClient } from '../../../lib/supabase/client'
import { useAuth } from '../../../hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { Spinner } from '../../../components/ui/Spinner'
import { useToast } from '../../../components/ui/Toast'
import { getInitials } from '../../../lib/utils'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../lib/theme'

export default function ChurchScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth('church_admin')
  const { showToast } = useToast()
  const [church, setChurch] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user?.church_id) return
      const supabase = createClient()
      const churchId = user.church_id

      const [churchRes, membersRes] = await Promise.all([
        supabase.from('churches').select('*').eq('id', churchId).single(),
        supabase
          .from('church_memberships')
          .select('*, users:user_id(id, display_name, email)')
          .eq('church_id', churchId),
      ])

      setChurch(churchRes.data)
      setMembers(membersRes.data || [])
      setLoading(false)
    }
    load()
  }, [user])

  const copyCode = async () => {
    if (church?.code) {
      await Clipboard.setStringAsync(church.code)
      showToast('Church code copied!', 'success')
    }
  }

  if (loading) {
    return <View style={styles.center}><Spinner size="lg" /></View>
  }

  if (!church) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No church found</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      <Text style={styles.heading}>{church.name}</Text>

      {/* Church Code Card */}
      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>Church Code</Text>
        <View style={styles.codeRow}>
          <View style={styles.codeBg}>
            <Text style={styles.code}>{church.code}</Text>
          </View>
          <Button onPress={copyCode} variant="outline">Copy</Button>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.emerald }]}>{members.length}</Text>
          <Text style={styles.statLabel}>Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.purple }]}>{church.max_seats}</Text>
          <Text style={styles.statLabel}>Max Seats</Text>
        </View>
      </View>

      {/* Members Section */}
      <View style={styles.membersSection}>
        <Text style={styles.sectionTitle}>Members</Text>
        {members.map((membership: any) => {
          const memberUser = membership.users
          return (
            <View key={membership.id} style={styles.memberRow}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {getInitials(memberUser?.display_name || memberUser?.email || '?')}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{memberUser?.display_name || 'Unknown'}</Text>
                <Text style={styles.memberEmail}>{memberUser?.email}</Text>
              </View>
            </View>
          )
        })}
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
  // Church code card
  codeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  codeLabel: { color: colors.creamDim, fontSize: fontSize.sm, marginBottom: spacing.sm },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeBg: {
    backgroundColor: `${colors.gold}15`,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  code: {
    color: colors.gold,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    letterSpacing: 4,
  },
  // Stats
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  statValue: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, color: colors.gold },
  statLabel: { fontSize: fontSize.xs, color: colors.creamDim, marginTop: spacing.xs },
  // Members
  membersSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    ...shadows.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    marginBottom: spacing.md,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    ...shadows.sm,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.gold}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: { color: colors.gold, fontSize: fontSize.sm, fontWeight: fontWeight.bold },
  memberInfo: { flex: 1 },
  memberName: { color: colors.cream, fontWeight: fontWeight.medium },
  memberEmail: { color: colors.creamDim, fontSize: fontSize.sm },
  emptyText: { color: colors.creamDim },
})
