import { View, Text, StyleSheet } from 'react-native'
import type { Player } from '../../stores/gameStore'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

interface ScoreBoardProps {
  players: Player[]
  currentPlayerId?: string
  winScore?: number
  showTeams?: boolean
}

export function ScoreBoard({ players, currentPlayerId, winScore, showTeams }: ScoreBoardProps) {
  if (showTeams) {
    const teamA = players.filter((p) => p.team === 'A')
    const teamB = players.filter((p) => p.team === 'B')
    const scoreA = teamA.reduce((s, p) => s + p.score, 0)
    const scoreB = teamB.reduce((s, p) => s + p.score, 0)

    return (
      <View style={styles.teamsContainer}>
        <TeamCard name="Team A" score={scoreA} players={teamA} winScore={winScore} color={colors.teamA} />
        <Text style={styles.vs}>VS</Text>
        <TeamCard name="Team B" score={scoreB} players={teamB} winScore={winScore} color={colors.teamB} />
      </View>
    )
  }

  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <View style={styles.list}>
      {sorted.map((player, i) => (
        <View
          key={player.id}
          style={[
            styles.row,
            player.id === currentPlayerId && styles.activeRow,
          ]}
        >
          <View style={styles.rowLeft}>
            <Text style={styles.rank}>{i + 1}.</Text>
            <Text style={styles.name}>{player.name}</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.score}>{player.score}</Text>
            {winScore ? <Text style={styles.winScore}>/ {winScore}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  )
}

function TeamCard({
  name,
  score,
  players,
  winScore,
  color,
}: {
  name: string
  score: number
  players: Player[]
  winScore?: number
  color: string
}) {
  return (
    <View style={styles.teamCard}>
      <Text style={[styles.teamName, { color }]}>{name}</Text>
      <Text style={styles.teamScore}>
        {score}
        {winScore ? <Text style={styles.winScore}>/ {winScore}</Text> : null}
      </Text>
      <Text style={styles.teamPlayers}>
        {players.map((p) => p.name).join(', ')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  activeRow: {
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.3)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rank: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    width: 24,
  },
  name: {
    color: colors.cream,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.md,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  score: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.lg,
    fontVariant: ['tabular-nums'],
  },
  winScore: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  vs: {
    color: colors.creamDim,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  teamCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    alignItems: 'center',
    ...shadows.md,
  },
  teamName: {
    fontWeight: fontWeight.bold,
    fontSize: fontSize.md,
  },
  teamScore: {
    color: colors.cream,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginVertical: spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  teamPlayers: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
})
