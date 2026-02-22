import React, { useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
  Animated,
} from 'react-native'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import { DEEP_LINK_PREFIX } from '../../lib/constants'
import { PlayerList } from './PlayerList'
import { ConnectionStatus } from './ConnectionStatus'
import { DifficultySelector } from './DifficultySelector'
import { CategoryFilter } from './CategoryFilter'
import type { RoomPlayer, RoomSettings } from '../../lib/types/multiplayer'
import type { GameType } from '../../lib/types/database'
import { CATEGORIES } from '../../lib/constants'

interface Props {
  roomCode: string
  players: RoomPlayer[]
  settings: RoomSettings
  gameType: GameType
  isHost: boolean
  isConnected: boolean
  minPlayers: number
  showTeams?: boolean
  onUpdateSettings: (settings: Partial<RoomSettings>) => void
  onAssignTeam?: (userId: string, team: 'A' | 'B') => void
  onStartGame: () => void
  onLeave: () => void
}

const GAME_TITLES: Record<GameType, string> = {
  charades: 'Charades',
  who_am_i: 'Who Am I?',
  guess_verse: 'Guess the Verse',
  trivia: 'Bible Trivia',
}

const GAME_CATEGORIES: Record<GameType, readonly string[]> = {
  charades: CATEGORIES.CHARADES,
  who_am_i: CATEGORIES.CHARACTERS,
  guess_verse: CATEGORIES.VERSES,
  trivia: CATEGORIES.TRIVIA,
}

export function RoomLobby({
  roomCode,
  players,
  settings,
  gameType,
  isHost,
  isConnected,
  minPlayers,
  showTeams,
  onUpdateSettings,
  onAssignTeam,
  onStartGame,
  onLeave,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my ${GAME_TITLES[gameType]} game on Faith Games!\n\nRoom Code: ${roomCode}\n\nOr tap: ${DEEP_LINK_PREFIX}${roomCode}`,
      })
    } catch {}
  }

  const canStart = players.length >= minPlayers
  const teamCheck = showTeams
    ? players.filter((p) => p.team === 'A').length > 0 && players.filter((p) => p.team === 'B').length > 0
    : true

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.gameTitle}>{GAME_TITLES[gameType]}</Text>
          <ConnectionStatus isConnected={isConnected} playerCount={players.length} />
        </View>

        {/* Room Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Room Code</Text>
          <Text style={styles.codeText}>{roomCode}</Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Players */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Players ({players.length})
          </Text>
          <PlayerList
            players={players}
            isHost={isHost}
            showTeams={showTeams}
            onAssignTeam={onAssignTeam}
          />
        </View>

        {/* Settings (host only) */}
        {isHost && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsCard}>
              <DifficultySelector />
              <View style={styles.settingsDivider} />
              <Text style={styles.settingsLabel}>Categories</Text>
              <CategoryFilter categories={[...GAME_CATEGORIES[gameType]]} />
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          {isHost ? (
            <TouchableOpacity
              style={[styles.startButton, (!canStart || !teamCheck) && styles.startButtonDisabled]}
              onPress={onStartGame}
              disabled={!canStart || !teamCheck}
            >
              <Text style={styles.startButtonText}>
                {!canStart
                  ? `Need ${minPlayers - players.length} more player${minPlayers - players.length !== 1 ? 's' : ''}`
                  : !teamCheck
                  ? 'Assign all players to teams'
                  : 'Start Game'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.waitingCard}>
              <Text style={styles.waitingText}>Waiting for host to start...</Text>
            </View>
          )}

          <TouchableOpacity style={styles.leaveButton} onPress={onLeave}>
            <Text style={styles.leaveButtonText}>Leave Room</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyLight,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  gameTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  codeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  codeLabel: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.5,
    marginBottom: spacing.xs,
  },
  codeText: {
    fontSize: fontSize.hero,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
    letterSpacing: 8,
    marginBottom: spacing.md,
  },
  shareButton: {
    backgroundColor: colors.gold + '15',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  shareButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.gold,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    marginBottom: spacing.sm,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.sm,
  },
  settingsDivider: {
    height: 1,
    backgroundColor: colors.navyLight,
    marginVertical: spacing.md,
  },
  settingsLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.cream,
    opacity: 0.6,
    marginBottom: spacing.sm,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  startButton: {
    backgroundColor: colors.green,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadows.colored(colors.green),
  },
  startButtonDisabled: {
    backgroundColor: colors.cream + '20',
    ...shadows.sm,
  },
  startButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  waitingCard: {
    backgroundColor: colors.gold + '10',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold + '30',
  },
  waitingText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.gold,
  },
  leaveButton: {
    padding: spacing.md,
    alignItems: 'center',
  },
  leaveButtonText: {
    fontSize: fontSize.md,
    color: colors.red,
    fontWeight: fontWeight.medium,
  },
})
