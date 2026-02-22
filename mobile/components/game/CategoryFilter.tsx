import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useGameStore } from '../../stores/gameStore'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

interface CategoryFilterProps {
  categories: readonly string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const { categories: selected, setCategories } = useGameStore()

  const toggle = (cat: string) => {
    if (selected.includes(cat)) {
      setCategories(selected.filter((c) => c !== cat))
    } else {
      setCategories([...selected, cat])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => toggle(cat)}
            style={[
              styles.pill,
              selected.includes(cat) && styles.pillActive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selected.includes(cat) && styles.pillTextActive,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {selected.length > 0 && (
        <Pressable onPress={() => setCategories([])}>
          <Text style={styles.clearText}>Clear all</Text>
        </Pressable>
      )}
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
  pills: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.creamSubtle,
  },
  pillActive: {
    backgroundColor: colors.gold,
    ...shadows.colored(colors.gold),
  },
  pillText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.creamDim,
  },
  pillTextActive: {
    color: colors.white,
  },
  clearText: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
  },
})
