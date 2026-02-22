import { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../../stores/authStore'
import { createClient } from '../../../lib/supabase/client'
import { useAuth } from '../../../hooks/useAuth'
import { Spinner } from '../../../components/ui/Spinner'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../lib/theme'

const STAT_CARDS = [
  { key: 'totalMembers', label: 'Total Members', color: colors.emerald },
  { key: 'totalGames', label: 'Total Games', color: colors.purple },
  { key: 'topGame', label: 'Top Game', color: colors.amber },
] as const

export default function ChurchAnalyticsScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth('church_admin')
  const [analytics, setAnalytics] = useState({
    totalMembers: 0,
    totalGames: 0,
    activeThisWeek: 0,
    topGame: 'N/A',
  })
  const [loading, setLoading] = useState(true)

  // Staggered entrance animations
  const fadeAnims = useRef(STAT_CARDS.map(() => new Animated.Value(0))).current
  const slideAnims = useRef(STAT_CARDS.map(() => new Animated.Value(40))).current

  useEffect(() => {
    async function load() {
      if (!user?.church_id) return
      const supabase = createClient()
      const churchId = user.church_id

      const [membersRes, gamesRes] = await Promise.all([
        supabase
          .from('church_memberships')
          .select('id', { count: 'exact' })
          .eq('church_id', churchId),
        supabase
          .from('game_sessions')
          .select('game_type')
          .eq('church_id', churchId),
      ])

      const totalMembers = membersRes.count || 0
      const games = gamesRes.data || []
      const totalGames = games.length

      // Find top game
      const gameCounts: Record<string, number> = {}
      games.forEach((g: any) => {
        gameCounts[g.game_type] = (gameCounts[g.game_type] || 0) + 1
      })
      const topGame = Object.entries(gameCounts).sort((a, b) => b[1] - a[1])[0]

      setAnalytics({
        totalMembers,
        totalGames,
        activeThisWeek: 0,
        topGame: topGame ? topGame[0].replace('_', ' ') : 'N/A',
      })
      setLoading(false)
    }
    load()
  }, [user])

  // Trigger stagger animation once loading finishes
  useEffect(() => {
    if (!loading) {
      const animations = STAT_CARDS.map((_, i) =>
        Animated.parallel([
          Animated.timing(fadeAnims[i], {
            toValue: 1,
            duration: 350,
            delay: i * 120,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnims[i], {
            toValue: 0,
            tension: 60,
            friction: 8,
            delay: i * 120,
            useNativeDriver: true,
          }),
        ])
      )
      Animated.stagger(0, animations).start()
    }
  }, [loading])

  if (loading) {
    return <View style={styles.center}><Spinner size="lg" /></View>
  }

  const getStatValue = (key: string): string => {
    switch (key) {
      case 'totalMembers': return String(analytics.totalMembers)
      case 'totalGames': return String(analytics.totalGames)
      case 'topGame': return analytics.topGame
      default: return '0'
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      <Text style={styles.heading}>Church Analytics</Text>

      <View style={styles.grid}>
        {STAT_CARDS.map((card, index) => (
          <Animated.View
            key={card.key}
            style={[
              styles.statCard,
              {
                opacity: fadeAnims[index],
                transform: [{ translateY: slideAnims[index] }],
              },
            ]}
          >
            <View style={[styles.accentBar, { backgroundColor: card.color }]} />
            <View style={styles.statContent}>
              <Text
                style={[
                  styles.statValue,
                  card.key === 'topGame' && { fontSize: fontSize.lg },
                  { color: card.color },
                ]}
              >
                {getStatValue(card.key)}
              </Text>
              <Text style={styles.statLabel}>{card.label}</Text>
            </View>
          </Animated.View>
        ))}
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
  grid: { gap: spacing.md },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    ...shadows.md,
  },
  accentBar: {
    width: 5,
  },
  statContent: {
    flex: 1,
    padding: spacing.lg,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
    marginTop: spacing.xs,
  },
})
