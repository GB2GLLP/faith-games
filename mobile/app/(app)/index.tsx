import { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../stores/authStore'
import { createClient } from '../../lib/supabase/client'
import { Spinner } from '../../components/ui/Spinner'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const quickPlayGames = [
  {
    title: 'Charades',
    desc: 'Act it out!',
    icon: 'body' as const,
    route: '/(app)/games/charades',
    bg: '#FEF3C7',
    color: '#f59e0b',
    dark: '#92400e',
  },
  {
    title: 'Who Am I?',
    desc: 'Guess the character',
    icon: 'help-circle' as const,
    route: '/(app)/games/who-am-i',
    bg: '#DBEAFE',
    color: '#3b82f6',
    dark: '#1e3a8a',
  },
  {
    title: 'Guess Verse',
    desc: 'Word by word',
    icon: 'book' as const,
    route: '/(app)/games/guess-verse',
    bg: '#D1FAE5',
    color: '#10b981',
    dark: '#064e3b',
  },
  {
    title: 'Trivia',
    desc: 'Test your knowledge',
    icon: 'bulb' as const,
    route: '/(app)/games/trivia',
    bg: '#EDE9FE',
    color: '#8b5cf6',
    dark: '#4c1d95',
  },
]

// Animated counter component
function AnimatedCounter({ target, style }: { target: number; style: any }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (target === 0) return
    const duration = 1200
    const steps = 30
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplay(target)
        clearInterval(interval)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [target])

  return <Text style={style}>{display}</Text>
}

// Animated game card with press feedback
function GameCard({
  game,
  index,
  onPress,
}: {
  game: (typeof quickPlayGames)[0]
  index: number
  onPress: () => void
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const mountAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 100,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start()
  }, [])

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.gameCardWrapper,
        {
          opacity: mountAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, mountAnim) },
            {
              translateY: mountAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.gameCard, { backgroundColor: game.bg, borderColor: game.color + '40' }]}
      >
        <View style={[styles.gameIconCircle, { backgroundColor: game.color + '20' }]}>
          <Ionicons name={game.icon} size={30} color={game.color} />
        </View>
        <Text style={[styles.gameCardTitle, { color: game.dark }]}>{game.title}</Text>
        <Text style={[styles.gameCardDesc, { color: game.dark + '99' }]}>{game.desc}</Text>
        <View style={[styles.playBadge, { backgroundColor: game.color }]}>
          <Ionicons name="play" size={12} color="#fff" />
          <Text style={styles.playBadgeText}>Play</Text>
        </View>
      </Pressable>
    </Animated.View>
  )
}

// Wave emoji animation
function WaveEmoji() {
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotate, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: -1, duration: 300, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(3000),
      ])
    ).start()
  }, [])

  return (
    <Animated.Text
      style={{
        fontSize: 28,
        transform: [
          {
            rotate: rotate.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: ['-20deg', '0deg', '20deg'],
            }),
          },
        ],
      }}
    >
      👋
    </Animated.Text>
  )
}

export default function DashboardScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()
  const [recentGames, setRecentGames] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Slide-in animation for recent games
  const recentSlide = useRef(new Animated.Value(40)).current
  const recentOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const [gamesRes, statsRes] = await Promise.all([
        supabase
          .from('game_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase.from('game_stats').select('*'),
      ])
      setRecentGames(gamesRes.data || [])
      setStats(statsRes.data || [])
      setLoading(false)

      // Trigger recent games slide-in
      Animated.parallel([
        Animated.timing(recentSlide, {
          toValue: 0,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
        Animated.timing(recentOpacity, {
          toValue: 1,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
      ]).start()
    }
    loadData()
  }, [])

  const totalGames = stats.reduce((sum: number, s: any) => sum + (s.games_played || 0), 0)
  const totalWins = stats.reduce((sum: number, s: any) => sum + (s.games_won || 0), 0)
  const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0

  if (loading) {
    return (
      <View style={styles.center}>
        <Spinner size="lg" />
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingText}>
          <View style={styles.greetingNameRow}>
            <Text style={styles.welcome}>Hey, {user?.display_name || 'Friend'}</Text>
            <WaveEmoji />
          </View>
          <Text style={styles.subtitle}>Ready to play?</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#DBEAFE', borderColor: '#3b82f620' }]}>
          <AnimatedCounter target={totalGames} style={[styles.statValue, { color: '#1e3a8a' }]} />
          <Text style={[styles.statLabel, { color: '#3b82f6' }]}>Games</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#D1FAE5', borderColor: '#10b98120' }]}>
          <AnimatedCounter target={totalWins} style={[styles.statValue, { color: '#064e3b' }]} />
          <Text style={[styles.statLabel, { color: '#10b981' }]}>Wins</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FEF3C7', borderColor: '#f59e0b20' }]}>
          <AnimatedCounter target={winRate} style={[styles.statValue, { color: '#92400e' }]} />
          <Text style={[styles.statLabel, { color: '#f59e0b' }]}>Win %</Text>
        </View>
      </View>

      {/* Quick Play */}
      <Text style={styles.sectionTitle}>Quick Play</Text>
      <View style={styles.gameGrid}>
        {quickPlayGames.map((g, i) => (
          <GameCard
            key={g.title}
            game={g}
            index={i}
            onPress={() => router.push(g.route as any)}
          />
        ))}
      </View>

      {/* Recent Games */}
      <Animated.View
        style={{
          opacity: recentOpacity,
          transform: [{ translateY: recentSlide }],
        }}
      >
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Games</Text>
          <Pressable onPress={() => router.push('/(app)/stats')}>
            <Text style={styles.viewAll}>View all →</Text>
          </Pressable>
        </View>

        {recentGames.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="game-controller-outline" size={40} color={colors.creamDim} />
            <Text style={styles.emptyText}>No games yet — start your first!</Text>
          </View>
        ) : (
          <View style={styles.recentList}>
            {recentGames.map((session: any) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionLeft}>
                  <View
                    style={[
                      styles.sessionDot,
                      {
                        backgroundColor:
                          session.game_type === 'charades'
                            ? '#f59e0b'
                            : session.game_type === 'who_am_i'
                            ? '#3b82f6'
                            : session.game_type === 'guess_verse'
                            ? '#10b981'
                            : '#8b5cf6',
                      },
                    ]}
                  />
                  <View>
                    <Text style={styles.sessionType}>
                      {session.game_type?.replace(/_/g, ' ')}
                    </Text>
                    <Text style={styles.sessionDate}>
                      {new Date(session.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View style={styles.sessionRight}>
                  {session.winner && (
                    <Text style={styles.sessionWinner}>{session.winner}</Text>
                  )}
                  <Text style={styles.sessionDuration}>
                    {Math.floor(session.duration_seconds / 60)}m
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Animated.View>

      {/* Leaderboard teaser */}
      <Pressable
        onPress={() => router.push('/(app)/leaderboard')}
        style={styles.leaderboardBanner}
      >
        <View style={styles.leaderboardLeft}>
          <Ionicons name="trophy" size={24} color="#f59e0b" />
          <View>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            <Text style={styles.leaderboardDesc}>See where you rank</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.creamDim} />
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navy },

  // Greeting
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greetingText: { flex: 1 },
  greetingNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  welcome: {
    fontSize: fontSize.xxl + 4,
    fontWeight: fontWeight.extrabold,
    color: colors.cream,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    marginTop: spacing.xs,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.sm,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    marginTop: 2,
  },

  // Games
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: spacing.md,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  gameCardWrapper: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.md) / 2,
  },
  gameCard: {
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    padding: spacing.lg,
    ...shadows.md,
  },
  gameIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gameCardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  gameCardDesc: {
    fontSize: fontSize.xs,
    marginBottom: spacing.sm,
  },
  playBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  playBadgeText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },

  // Recent
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  viewAll: {
    fontSize: fontSize.sm,
    color: colors.gold,
    fontWeight: fontWeight.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
  },
  emptyText: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
  },
  recentList: {
    gap: spacing.sm,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sessionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sessionType: {
    color: colors.cream,
    fontWeight: fontWeight.medium,
    textTransform: 'capitalize',
    fontSize: fontSize.sm,
  },
  sessionDate: {
    color: colors.creamDim,
    fontSize: fontSize.xs,
    marginTop: 1,
  },
  sessionRight: { alignItems: 'flex-end' },
  sessionWinner: {
    color: colors.gold,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  sessionDuration: {
    color: colors.creamDim,
    fontSize: fontSize.xs,
  },

  // Leaderboard
  leaderboardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF3C7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: '#f59e0b30',
    ...shadows.sm,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  leaderboardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: '#92400e',
  },
  leaderboardDesc: {
    fontSize: fontSize.xs,
    color: '#b45309',
  },
})
