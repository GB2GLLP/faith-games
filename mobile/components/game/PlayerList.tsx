import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import type { RoomPlayer } from '../../lib/types/multiplayer'

interface Props {
  players: RoomPlayer[]
  isHost: boolean
  showTeams?: boolean
  onAssignTeam?: (userId: string, team: 'A' | 'B') => void
}

export function PlayerList({ players, isHost, showTeams, onAssignTeam }: Props) {
  const teamAPlayers = players.filter((p) => p.team === 'A')
  const teamBPlayers = players.filter((p) => p.team === 'B')
  const unassigned = players.filter((p) => !p.team)

  if (showTeams) {
    return (
      <View style={styles.teamsContainer}>
        <View style={styles.teamColumn}>
          <View style={[styles.teamHeader, { backgroundColor: colors.teamA + '20' }]}>
            <Text style={[styles.teamLabel, { color: colors.teamA }]}>Team A</Text>
            <Text style={styles.teamCount}>{teamAPlayers.length}</Text>
          </View>
          {teamAPlayers.map((p) => (
            <PlayerRow key={p.userId} player={p} />
          ))}
        </View>
        <View style={styles.teamColumn}>
          <View style={[styles.teamHeader, { backgroundColor: colors.teamB + '20' }]}>
            <Text style={[styles.teamLabel, { color: colors.teamB }]}>Team B</Text>
            <Text style={styles.teamCount}>{teamBPlayers.length}</Text>
          </View>
          {teamBPlayers.map((p) => (
            <PlayerRow key={p.userId} player={p} />
          ))}
        </View>
        {unassigned.length > 0 && isHost && (
          <View style={styles.unassignedSection}>
            <Text style={styles.unassignedLabel}>Tap to assign team:</Text>
            {unassigned.map((p) => (
              <View key={p.userId} style={styles.unassignedRow}>
                <Text style={styles.playerName}>{p.displayName}</Text>
                <View style={styles.teamButtons}>
                  <TouchableOpacity
                    style={[styles.teamBtn, { backgroundColor: colors.teamA + '30' }]}
                    onPress={() => onAssignTeam?.(p.userId, 'A')}
                  >
                    <Text style={[styles.teamBtnText, { color: colors.teamA }]}>A</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.teamBtn, { backgroundColor: colors.teamB + '30' }]}
                    onPress={() => onAssignTeam?.(p.userId, 'B')}
                  >
                    <Text style={[styles.teamBtnText, { color: colors.teamB }]}>B</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.list}>
      {players.map((p, i) => (
        <PlayerRow key={p.userId} player={p} index={i} />
      ))}
    </View>
  )
}

function PlayerRow({ player, index }: { player: RoomPlayer; index?: number }) {
  const accentColors = [colors.gold, colors.purple, colors.emerald, colors.rose, colors.sky, colors.amber, colors.indigo, colors.blue]
  const accent = accentColors[(index ?? 0) % accentColors.length]

  return (
    <View style={[styles.playerRow, { borderLeftColor: accent }]}>
      <View style={[styles.statusDot, player.isConnected ? styles.connected : styles.disconnected]} />
      <Text style={styles.playerName} numberOfLines={1}>
        {player.displayName}
      </Text>
      {player.isHost && (
        <View style={styles.hostBadge}>
          <Text style={styles.hostBadgeText}>Host</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 3,
    gap: spacing.sm,
    ...shadows.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  connected: {
    backgroundColor: colors.green,
  },
  disconnected: {
    backgroundColor: colors.red,
  },
  playerName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.cream,
    flex: 1,
  },
  hostBadge: {
    backgroundColor: colors.gold + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  hostBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.gold,
  },
  teamsContainer: {
    gap: spacing.md,
  },
  teamColumn: {
    gap: spacing.xs,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  teamLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  teamCount: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.5,
  },
  unassignedSection: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  unassignedLabel: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.6,
    marginBottom: spacing.xs,
  },
  unassignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  teamButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  teamBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamBtnText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
})
