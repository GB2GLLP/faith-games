import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useGameStore } from '../../stores/gameStore'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../lib/theme'

interface PlayerSetupProps {
  minPlayers: number
  maxPlayers: number
  onReady: () => void
}

export function PlayerSetup({ minPlayers, maxPlayers, onReady }: PlayerSetupProps) {
  const { players, addPlayer, removePlayer } = useGameStore()
  const [name, setName] = useState('')

  const handleAdd = () => {
    if (name.trim() && players.length < maxPlayers) {
      addPlayer(name.trim())
      setName('')
    }
  }

  const canStart = players.length >= minPlayers

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add Players</Text>
        <Text style={styles.subtitle}>
          {minPlayers}-{maxPlayers} players needed. {players.length} added.
        </Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Player name"
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

      <View style={styles.playersList}>
        {players.map((player) => (
          <View
            key={player.id}
            style={styles.playerRow}
          >
            <Text style={styles.playerName}>{player.name}</Text>
            <Pressable onPress={() => removePlayer(player.id)}>
              <Text style={styles.removeBtn}>X</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Button onPress={onReady} disabled={!canStart} fullWidth size="lg">
        {canStart
          ? 'Start Game'
          : `Need ${minPlayers - players.length} more player${minPlayers - players.length > 1 ? 's' : ''}`}
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
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
  playersList: {
    gap: spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.creamSubtle,
    borderRadius: borderRadius.lg,
  },
  playerName: {
    color: colors.cream,
    fontSize: fontSize.md,
  },
  removeBtn: {
    color: colors.creamDim,
    fontSize: fontSize.md,
    padding: spacing.xs,
  },
})
