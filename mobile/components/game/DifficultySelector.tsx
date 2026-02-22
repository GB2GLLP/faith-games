import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useGameStore } from '../../stores/gameStore'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

const DIFFICULTIES = [
  { value: 'all' as const, label: 'All Levels', color: colors.gold },
  { value: 'easy' as const, label: 'Easy', color: colors.green },
  { value: 'medium' as const, label: 'Medium', color: colors.amber },
  { value: 'hard' as const, label: 'Hard', color: colors.red },
]

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useGameStore()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulty</Text>
      <View style={styles.grid}>
        {DIFFICULTIES.map((d) => {
          const isActive = difficulty === d.value
          return (
            <Pressable
              key={d.value}
              onPress={() => setDifficulty(d.value)}
              style={[
                styles.option,
                isActive && { backgroundColor: d.color, ...shadows.colored(d.color) },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isActive && styles.optionTextActive,
                ]}
              >
                {d.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.cream,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.creamSubtle,
    alignItems: 'center',
  },
  optionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.creamDim,
  },
  optionTextActive: {
    color: colors.white,
  },
})
