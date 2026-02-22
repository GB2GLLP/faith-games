import { useState, useRef, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Animated, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../stores/authStore'
import { createClient } from '../../lib/supabase/client'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { useToast } from '../../components/ui/Toast'
import { getInitials } from '../../lib/utils'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

export default function ProfileScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { user, signOut, refreshUser } = useAuthStore()
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user?.display_name || '')
  const [saving, setSaving] = useState(false)

  // Avatar animation
  const avatarScale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(avatarScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start()
  }, [])

  const handleSave = async () => {
    if (!user || !displayName.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase
      .from('users') as any)
      .update({ display_name: displayName.trim() })
      .eq('id', user.id)

    if (error) {
      showToast(error.message, 'error')
    } else {
      await refreshUser()
      setEditing(false)
      showToast('Name updated!', 'success')
    }
    setSaving(false)
  }

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut()
          router.replace('/login')
        },
      },
    ])
  }

  if (!user) return null

  const hasChurch = !!user.church_id
  const isChurchAdmin = user.role === 'church_admin'

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Profile</Text>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Animated.View style={[styles.avatar, { transform: [{ scale: avatarScale }] }]}>
          <Text style={styles.avatarText}>
            {getInitials(user.display_name || user.email)}
          </Text>
        </Animated.View>
        {!editing ? (
          <View style={styles.nameSection}>
            <Text style={styles.name}>{user.display_name || 'No name set'}</Text>
            <Pressable onPress={() => setEditing(true)}>
              <Text style={styles.editLink}>Edit name</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.editSection}>
            <Input
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Display name"
              containerStyle={{ flex: 1 }}
            />
            <Button onPress={handleSave} loading={saving}>
              Save
            </Button>
          </View>
        )}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="mail-outline" size={18} color={colors.creamDim} />
            <Text style={styles.infoLabel}>Email</Text>
          </View>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="shield-outline" size={18} color={colors.creamDim} />
            <Text style={styles.infoLabel}>Role</Text>
          </View>
          <Badge variant={user.role === 'super_admin' ? 'destructive' : user.role === 'church_admin' ? 'gold' : 'default'}>
            {user.role.replace('_', ' ')}
          </Badge>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="star-outline" size={18} color={colors.creamDim} />
            <Text style={styles.infoLabel}>Plan</Text>
          </View>
          <Badge variant={user.subscription_tier === 'free' ? 'default' : 'gold'}>
            {user.subscription_tier}
          </Badge>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <View style={styles.infoLeft}>
            <Ionicons name="calendar-outline" size={18} color={colors.creamDim} />
            <Text style={styles.infoLabel}>Joined</Text>
          </View>
          <Text style={styles.infoValue}>
            {new Date(user.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Church Section */}
      {(hasChurch || isChurchAdmin) && (
        <View style={styles.churchSection}>
          <View style={styles.churchHeader}>
            <Ionicons name="people" size={20} color={colors.gold} />
            <Text style={styles.churchTitle}>My Church</Text>
          </View>

          {isChurchAdmin && (
            <>
              <Pressable
                onPress={() => router.push('/(app)/church')}
                style={styles.churchLink}
              >
                <View style={styles.churchLinkLeft}>
                  <View style={[styles.churchLinkIcon, { backgroundColor: '#DBEAFE' }]}>
                    <Ionicons name="settings-outline" size={18} color="#3b82f6" />
                  </View>
                  <Text style={styles.churchLinkText}>Church Settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.creamDim} />
              </Pressable>

              <Pressable
                onPress={() => router.push('/(app)/church/analytics')}
                style={styles.churchLink}
              >
                <View style={styles.churchLinkLeft}>
                  <View style={[styles.churchLinkIcon, { backgroundColor: '#D1FAE5' }]}>
                    <Ionicons name="bar-chart-outline" size={18} color="#10b981" />
                  </View>
                  <Text style={styles.churchLinkText}>Church Analytics</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.creamDim} />
              </Pressable>

              <Pressable
                onPress={() => router.push('/(app)/church/settings')}
                style={[styles.churchLink, { borderBottomWidth: 0 }]}
              >
                <View style={styles.churchLinkLeft}>
                  <View style={[styles.churchLinkIcon, { backgroundColor: '#EDE9FE' }]}>
                    <Ionicons name="people-outline" size={18} color="#8b5cf6" />
                  </View>
                  <Text style={styles.churchLinkText}>Manage Members</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.creamDim} />
              </Pressable>
            </>
          )}

          {!isChurchAdmin && hasChurch && (
            <Text style={styles.churchMemberText}>
              You're a member of a church community
            </Text>
          )}
        </View>
      )}

      {/* Actions */}
      <Pressable
        onPress={() => router.push('/(app)/subscription')}
        style={styles.actionCard}
      >
        <View style={styles.actionLeft}>
          <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="diamond-outline" size={20} color="#f59e0b" />
          </View>
          <View>
            <Text style={styles.actionTitle}>Manage Subscription</Text>
            <Text style={styles.actionDesc}>Upgrade for premium content</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.creamDim} />
      </Pressable>

      <Pressable
        onPress={() => router.push('/(app)/leaderboard')}
        style={styles.actionCard}
      >
        <View style={styles.actionLeft}>
          <View style={[styles.actionIcon, { backgroundColor: '#D1FAE5' }]}>
            <Ionicons name="trophy-outline" size={20} color="#10b981" />
          </View>
          <View>
            <Text style={styles.actionTitle}>Leaderboard</Text>
            <Text style={styles.actionDesc}>See where you rank</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.creamDim} />
      </Pressable>

      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={20} color={colors.red} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: 120 },
  heading: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.cream,
    marginBottom: spacing.xl,
  },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(8, 145, 178, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.gold,
  },
  avatarText: {
    fontSize: fontSize.xxl + 4,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  nameSection: { alignItems: 'center', gap: spacing.xs },
  name: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  editLink: {
    color: colors.gold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  editSection: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    width: '100%',
  },

  // Info Card
  infoCard: {
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    ...shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoLabel: { color: colors.creamDim, fontSize: fontSize.sm },
  infoValue: { color: colors.cream, fontSize: fontSize.sm, fontWeight: fontWeight.medium },

  // Church Section
  churchSection: {
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.15)',
    ...shadows.sm,
  },
  churchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  churchTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  churchLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  churchLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  churchLinkIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  churchLinkText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.cream,
  },
  churchMemberText: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
  },

  // Actions
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
  },
  actionDesc: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
    marginTop: 1,
  },

  // Sign Out
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  signOutText: {
    color: colors.red,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
})
