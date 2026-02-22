import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../lib/theme'

interface ForeheadDisplayProps {
  text: string
  subtitle?: string
}

export function ForeheadDisplay({ text, subtitle }: ForeheadDisplayProps) {
  return (
    <View style={styles.container}>
      {/* Colored accent circles in background */}
      <View style={[styles.accentCircle, styles.accentTopLeft]} />
      <View style={[styles.accentCircle, styles.accentBottomRight]} />

      <View style={styles.content}>
        <Text style={styles.text} adjustsFontSizeToFit numberOfLines={3}>
          {text}
        </Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Tilt forward = Correct  |  Tilt back = Skip
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    transform: [{ rotate: '180deg' }],
    zIndex: 50,
  },
  accentCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.06,
  },
  accentTopLeft: {
    top: -40,
    left: -40,
    backgroundColor: colors.gold,
  },
  accentBottomRight: {
    bottom: -40,
    right: -40,
    backgroundColor: colors.purple,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  text: {
    fontSize: fontSize.hero + 8,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
    textAlign: 'center',
    lineHeight: 68,
  },
  subtitle: {
    fontSize: fontSize.xxl,
    color: colors.creamDim,
    marginTop: spacing.lg,
    textAlign: 'center',
    lineHeight: 32,
  },
  instructions: {
    position: 'absolute',
    top: spacing.xxl + 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: fontSize.sm,
    color: 'rgba(15, 23, 42, 0.25)',
    textAlign: 'center',
  },
})
