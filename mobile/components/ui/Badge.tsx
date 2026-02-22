import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../../lib/theme'

type BadgeVariant = 'default' | 'gold' | 'success' | 'warning' | 'destructive'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantStyle = getVariantStyle(variant)

  return (
    <View style={[styles.badge, variantStyle.container]}>
      <Text style={[styles.text, variantStyle.text]}>{children}</Text>
    </View>
  )
}

function getVariantStyle(variant: BadgeVariant): { container: ViewStyle; text: TextStyle } {
  switch (variant) {
    case 'gold':
      return {
        container: { backgroundColor: 'rgba(8, 145, 178, 0.2)' },
        text: { color: colors.gold },
      }
    case 'success':
      return {
        container: { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
        text: { color: colors.green },
      }
    case 'warning':
      return {
        container: { backgroundColor: 'rgba(234, 179, 8, 0.2)' },
        text: { color: colors.yellow },
      }
    case 'destructive':
      return {
        container: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
        text: { color: colors.red },
      }
    default:
      return {
        container: { backgroundColor: colors.creamSubtle },
        text: { color: colors.creamDim },
      }
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
})
