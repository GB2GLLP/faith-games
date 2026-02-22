import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { colors, borderRadius, spacing, fontSize, fontWeight, shadows } from '../../lib/theme'

interface CardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>
}

export function CardHeader({ children, style }: CardProps) {
  return <View style={[styles.header, style]}>{children}</View>
}

export function CardTitle({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

export function CardContent({ children, style }: CardProps) {
  return <View style={[styles.content, style]}>{children}</View>
}

export function CardFooter({ children, style }: CardProps) {
  return <View style={[styles.footer, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    overflow: 'hidden',
    ...shadows.md,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
})
