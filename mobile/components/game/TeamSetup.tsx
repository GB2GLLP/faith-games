import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useGameStore } from '../../stores/gameStore'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../lib/theme'

interface TeamSetupProps {
  minPlayers: number
  maxPlayers: number
  onReady: () => void
}

export function TeamSetup({ minPlayers, maxPlayers, onReady }: TeamSetupProps) {
  const { players, addPlayer, removePlayer } = useGameStore()
  const [name, setName] = useState('')
  const [team, setTeam] = useState<'A' | 'B'>('A')

  const teamA = players.filter((p) => p.team === 'A')
  const teamB = players.filter((p) => p.team === 'B')

  const handleAdd = () => {
    if (name.trim() && players.length < maxPlayers) {
      addPlayer(name.trim(), team)
      setName('')
    }
  }

  const canStart = players.length >= minPlayers && teamA.length >= 1 && teamB.length >= 1

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Set Up Teams</Text>
        <Text style={styles.subtitle}>
          Add at least {minPlayers} players across two teams.
        </Text>
      </View>

      <View style={styles.teamTabs}>
        <Pressable
          onPress={() => setTeam('A')}
          style={[styles.teamTab, team === 'A' && styles.teamTabActiveA]}
        >
          <Text style={[styles.teamTabText, team === 'A' && styles.teamTabTextActiveA]}>
            Team A ({teamA.length})
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTeam('B')}
          style={[styles.teamTab, team === 'B' && styles.teamTabActiveB]}
        >
          <Text style={[styles.teamTabText, team === 'B' && styles.teamTabTextActiveB]}>
            Team B ({teamB.length})
          </Text>
        </Pressable>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Input
            value={name}
            onChangeText={setName}
            placeholder={`Player for Team ${team}`}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
        </View>
        <Button
          onPress={handleAdd}
          disabled={!name.trim() || players.length >= maxPlayers}
        >
          Add
        </Button>
      </View>

      <View style={styles.teamsGrid}>
        <View style={styles.teamCol}>
          <Text style={[styles.teamLabel, { color: colors.teamA }]}>Team A</Text>
          {teamA.map((p) => (
            <View key={p.id} style={styles.playerRowA}>
              <Text style={styles.playerName}>{p.name}</Text>
              <Pressable onPress={() => removePlayer(p.id)}>
                <Text style={styles.removeBtn}>X</Text>
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.teamCol}>
          <Text style={[styles.teamLabel, { color: colors.teamB }]}>Team B</Text>
          {teamB.map((p) => (
            <View key={p.id} style={styles.playerRowB}>
              <Text style={styles.playerName}>{p.name}</Text>
              <Pressable onPress={() => removePlayer(p.id)}>
                <Text style={styles.removeBtn}>X</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <Button onPress={onReady} disabled={!canStart} fullWidth size="lg">
        {canStart ? 'Start Game' : 'Need players on both teams'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
  },
  teamTabs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  teamTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.creamSubtle,
    alignItems: 'center',
  },
  teamTabActiveA: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  teamTabActiveB: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.4)',
  },
  teamTabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.creamDim,
  },
  teamTabTextActiveA: {
    color: colors.teamA,
  },
  teamTabTextActiveB: {
    color: colors.teamB,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
  teamsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  teamCol: {
    flex: 1,
    gap: spacing.xs,
  },
  teamLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  playerRowA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderRadius: borderRadius.md,
  },
  playerRowB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderRadius: borderRadius.md,
  },
  playerName: {
    color: colors.cream,
    fontSize: fontSize.sm,
  },
  removeBtn: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    padding: spacing.xs,
  },
})
