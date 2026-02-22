import { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/authStore'
import { createClient } from '../../lib/supabase/client'
import { Card, CardContent, CardTitle, CardHeader } from '../../components/ui/Card'
import { Spinner } from '../../components/ui/Spinner'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import type { GameType } from '../../lib/types/database'

const GAME_NAMES: Record<GameType, string> = {
  charades: 'Charades',
  who_am_i: 'Who Am I?',
  guess_verse: 'Guess Verse',
  trivia: 'Trivia',
}

const GAME_COLORS: Record<GameType, string> = {
  charades: '#f59e0b',
  who_am_i: '#3b82f6',
  guess_verse: '#10b981',
  trivia: '#8b5cf6',
}

export default function StatsScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()
  const [stats, setStats] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    async function loadStats() {
      if (!user) return
      const supabase = createClient()
      const [statsRes, sessionsRes] = await Promise.all([
        supabase.from('game_stats').select('*').eq('user_id', user.id),
        supabase
          .from('game_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20),
      ])
      setStats(statsRes.data || [])
      setSessions(sessionsRes.data || [])
      setLoading(false)
    }
    loadStats()
  }, [user])

  if (loading) {
    return <View style={styles.center}><Spinner size="lg" /></View>
  }

  const totalGames = stats.reduce((sum, s) => sum + (s.games_played || 0), 0)
  const totalWins = stats.reduce((sum, s) => sum + (s.games_won || 0), 0)
  const bestStreak = Math.max(0, ...stats.map((s) => s.best_streak || 0))

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.heading}>Your Stats</Text>

        <View style={styles.overviewRow}>
          <Card style={[styles.overviewCard, styles.overviewCardPlayed]}>
            <CardContent>
              <Text style={styles.overviewValue}>{totalGames}</Text>
              <Text style={styles.overviewLabel}>Played</Text>
            </CardContent>
          </Card>
          <Card style={[styles.overviewCard, styles.overviewCardWins]}>
            <CardContent>
              <Text style={styles.overviewValue}>{totalWins}</Text>
              <Text style={styles.overviewLabel}>Wins</Text>
            </CardContent>
          </Card>
          <Card style={[styles.overviewCard, styles.overviewCardStreak]}>
            <CardContent>
              <Text style={styles.overviewValue}>{bestStreak}</Text>
              <Text style={styles.overviewLabel}>Best Streak</Text>
            </CardContent>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Per Game</Text>
        {(['charades', 'who_am_i', 'guess_verse', 'trivia'] as GameType[]).map((gameType) => {
          const gameStat = stats.find((s) => s.game_type === gameType)
          const played = gameStat?.games_played || 0
          const won = gameStat?.games_won || 0
          const winRate = played > 0 ? won / played : 0

          return (
            <Card key={gameType} style={styles.gameCard}>
              <CardHeader>
                <CardTitle style={{ color: GAME_COLORS[gameType] }}>
                  {GAME_NAMES[gameType]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.gameStatsRow}>
                  <View style={styles.gameStat}>
                    <Text style={[styles.gameStatValue, { color: GAME_COLORS[gameType] }]}>{played}</Text>
                    <Text style={styles.gameStatLabel}>Played</Text>
                  </View>
                  <View style={styles.gameStat}>
                    <Text style={[styles.gameStatValue, { color: GAME_COLORS[gameType] }]}>{won}</Text>
                    <Text style={styles.gameStatLabel}>Won</Text>
                  </View>
                  <View style={styles.gameStat}>
                    <Text style={[styles.gameStatValue, { color: GAME_COLORS[gameType] }]}>{gameStat?.best_score || 0}</Text>
                    <Text style={styles.gameStatLabel}>Best</Text>
                  </View>
                </View>
                <View style={styles.winRateRow}>
                  <Text style={styles.winRateLabel}>Win Rate</Text>
                  <Text style={styles.winRateValue}>{Math.round(winRate * 100)}%</Text>
                </View>
                <ProgressBar progress={winRate} color={GAME_COLORS[gameType]} />
              </CardContent>
            </Card>
          )
        })}

        <Text style={styles.sectionTitle}>Game History</Text>
        {sessions.length === 0 ? (
          <Text style={styles.emptyText}>No games played yet.</Text>
        ) : (
          sessions.map((session: any) => {
            const sessionColor = GAME_COLORS[session.game_type as GameType] || colors.gold
            return (
              <Card key={session.id} style={styles.sessionCard}>
                <CardContent style={styles.sessionRow}>
                  <View style={[styles.sessionColorBorder, { backgroundColor: sessionColor }]} />
                  <View style={styles.sessionContent}>
                    <View>
                      <Text style={styles.sessionType}>
                        {session.game_type?.replace('_', ' ')}
                      </Text>
                      <Text style={styles.sessionDate}>
                        {new Date(session.created_at).toLocaleDateString()}
                      </Text>
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
                </CardContent>
              </Card>
            )
          })
        )}
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navy },
  heading: { fontSize: fontSize.xxxl, fontWeight: fontWeight.bold, color: colors.gold, marginBottom: spacing.lg },
  overviewRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  overviewCard: {
    flex: 1,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  overviewCardPlayed: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  overviewCardWins: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  overviewCardStreak: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  overviewValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
    textAlign: 'center',
  },
  overviewLabel: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.cream, marginBottom: spacing.md },
  gameCard: { marginBottom: spacing.md },
  gameStatsRow: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.md },
  gameStat: {},
  gameStatValue: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.cream },
  gameStatLabel: { fontSize: fontSize.xs, color: colors.creamDim },
  winRateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  winRateLabel: { fontSize: fontSize.sm, color: colors.creamDim },
  winRateValue: { fontSize: fontSize.sm, color: colors.cream, fontWeight: fontWeight.medium },
  emptyText: { color: colors.creamDim, textAlign: 'center', marginTop: spacing.lg },
  sessionCard: {
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 0,
  },
  sessionColorBorder: {
    width: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  sessionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  sessionType: { color: colors.cream, fontWeight: fontWeight.medium, textTransform: 'capitalize' },
  sessionDate: { color: colors.creamDim, fontSize: fontSize.sm, marginTop: spacing.xs },
  sessionRight: { alignItems: 'flex-end' },
  sessionWinner: { color: colors.gold, fontSize: fontSize.sm, fontWeight: fontWeight.medium },
  sessionDuration: { color: colors.creamDim, fontSize: fontSize.sm },
})
