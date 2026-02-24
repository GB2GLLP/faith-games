// † "The last will be first, and the first will be last" — Matthew 20:16
import { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, FlatList, Animated, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/authStore'
import { createClient } from '../../lib/supabase/client'
import { Spinner } from '../../components/ui/Spinner'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import type { GameType } from '../../lib/types/database'

const GAME_FILTERS: { value: GameType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'charades', label: 'Charades' },
  { value: 'who_am_i', label: 'Who Am I?' },
  { value: 'guess_verse', label: 'Guess Verse' },
  { value: 'trivia', label: 'Trivia' },
]

const RANK_COLORS = {
  1: '#FFD700', // gold
  2: '#C0C0C0', // silver
  3: '#CD7F32', // bronze
} as Record<number, string>

interface LeaderboardEntry {
  user_id: string
  display_name: string
  total_score: number
  games_won: number
  games_played: number
}

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [scope, setScope] = useState<'global' | 'church'>('global')
  const [gameFilter, setGameFilter] = useState<GameType | 'all'>('all')

  // Animated entrance
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [loading])

  const loadLeaderboard = async () => {
    const supabase = createClient()

    let query = supabase
      .from('game_stats')
      .select('user_id, game_type, total_score, games_won, games_played')

    if (gameFilter !== 'all') {
      query = query.eq('game_type', gameFilter)
    }

    const { data: statsData } = await query

    if (!statsData) {
      setEntries([])
      return
    }

    // Aggregate by user
    const userMap = new Map<string, { total_score: number; games_won: number; games_played: number }>()
    statsData.forEach((s: any) => {
      const existing = userMap.get(s.user_id) || { total_score: 0, games_won: 0, games_played: 0 }
      userMap.set(s.user_id, {
        total_score: existing.total_score + (s.total_score || 0),
        games_won: existing.games_won + (s.games_won || 0),
        games_played: existing.games_played + (s.games_played || 0),
      })
    })

    // Get user names
    const userIds = Array.from(userMap.keys())
    const { data: users } = await supabase
      .from('users')
      .select('id, display_name, church_id')
      .in('id', userIds)

    let result: LeaderboardEntry[] = userIds.map((id) => {
      const userInfo = users?.find((u: any) => u.id === id)
      const stats = userMap.get(id)!
      return {
        user_id: id,
        display_name: (userInfo as any)?.display_name || 'Unknown',
        ...stats,
      }
    })

    // Filter by church if needed
    if (scope === 'church' && user?.church_id) {
      const churchUserIds = users?.filter((u: any) => u.church_id === user.church_id).map((u: any) => u.id) || []
      result = result.filter((e) => churchUserIds.includes(e.user_id))
    }

    result.sort((a, b) => b.total_score - a.total_score)
    setEntries(result)
  }

  useEffect(() => {
    setLoading(true)
    loadLeaderboard().finally(() => setLoading(false))
  }, [scope, gameFilter, user])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadLeaderboard()
    setRefreshing(false)
  }

  const renderRankBadge = (rank: number) => {
    const badgeColor = RANK_COLORS[rank]
    if (badgeColor) {
      return (
        <View style={[styles.rankBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.rankBadgeText}>{rank}</Text>
        </View>
      )
    }
    return (
      <View style={styles.rankDefault}>
        <Text style={styles.rank}>{rank}</Text>
      </View>
    )
  }

  const getRankIndicatorColor = (rank: number) => {
    if (RANK_COLORS[rank]) return RANK_COLORS[rank]
    if (rank <= 10) return colors.gold
    return colors.creamDim
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], flex: 1 }}>
        <Text style={styles.heading}>Leaderboard</Text>

        <View style={styles.scopeTabs}>
          <Pressable
            onPress={() => setScope('global')}
            style={[styles.scopeTab, scope === 'global' && styles.scopeTabActive]}
          >
            <Text style={[styles.scopeText, scope === 'global' && styles.scopeTextActive]}>Global</Text>
          </Pressable>
          {user?.church_id && (
            <Pressable
              onPress={() => setScope('church')}
              style={[styles.scopeTab, scope === 'church' && styles.scopeTabActive]}
            >
              <Text style={[styles.scopeText, scope === 'church' && styles.scopeTextActive]}>Church</Text>
            </Pressable>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filters}>
          {GAME_FILTERS.map((f) => (
            <Pressable
              key={f.value}
              onPress={() => setGameFilter(f.value)}
              style={[styles.filterPill, gameFilter === f.value && styles.filterPillActive]}
            >
              <Text style={[styles.filterText, gameFilter === f.value && styles.filterTextActive]}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.center}><Spinner size="lg" /></View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.user_id}
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />}
            renderItem={({ item, index }) => {
              const rank = index + 1
              return (
                <View style={[styles.row, item.user_id === user?.id && styles.myRow]}>
                  <View style={[styles.rankIndicator, { backgroundColor: getRankIndicatorColor(rank) }]} />
                  <View style={styles.rankCol}>
                    {renderRankBadge(rank)}
                  </View>
                  <View style={styles.nameCol}>
                    <Text style={styles.name}>{item.display_name}</Text>
                    <Text style={styles.meta}>{item.games_played} games, {item.games_won} wins</Text>
                  </View>
                  <Text style={styles.score}>{item.total_score}</Text>
                </View>
              )
            }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No players yet.</Text>
            }
          />
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, padding: spacing.lg },
  heading: { fontSize: fontSize.xxxl, fontWeight: fontWeight.bold, color: colors.gold, marginBottom: spacing.md },
  scopeTabs: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  scopeTab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.creamSubtle,
  },
  scopeTabActive: {
    backgroundColor: colors.gold,
    ...shadows.sm,
  },
  scopeText: { color: colors.creamDim, fontWeight: fontWeight.medium, fontSize: fontSize.sm },
  scopeTextActive: { color: colors.white },
  filterScroll: { marginBottom: spacing.md, maxHeight: 40 },
  filters: { gap: spacing.sm },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.creamSubtle,
  },
  filterPillActive: {
    backgroundColor: colors.gold,
    ...shadows.sm,
  },
  filterText: { color: colors.creamDim, fontSize: fontSize.sm },
  filterTextActive: { color: colors.white, fontWeight: fontWeight.semibold },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingBottom: spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  myRow: {
    backgroundColor: 'rgba(8, 145, 178, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.3)',
  },
  rankIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
  },
  rankCol: { width: 44, alignItems: 'center', marginLeft: spacing.xs },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeText: {
    color: colors.white,
    fontWeight: fontWeight.extrabold,
    fontSize: fontSize.sm,
  },
  rankDefault: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: { color: colors.creamDim, fontWeight: fontWeight.bold, fontSize: fontSize.md },
  nameCol: { flex: 1 },
  name: { color: colors.cream, fontWeight: fontWeight.medium, fontSize: fontSize.md },
  meta: { color: colors.creamDim, fontSize: fontSize.xs, marginTop: 2 },
  score: { color: colors.gold, fontWeight: fontWeight.bold, fontSize: fontSize.lg },
  emptyText: { color: colors.creamDim, textAlign: 'center', marginTop: spacing.xl },
})
