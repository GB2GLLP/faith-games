import { useRef } from 'react'
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native'
import { colors, borderRadius, fontSize, spacing, fontWeight, shadows } from '../../lib/theme'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  fullWidth?: boolean
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, friction: 8 }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8 }).start()
  }

  const variantStyles = getVariantStyles(variant, disabled)
  const sizeStyles = getSizeStyles(size)

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.base,
          variantStyles.container,
          sizeStyles.container,
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? colors.gold : colors.navy}
          />
        ) : (
          <Text style={[styles.text, variantStyles.text, sizeStyles.text]}>
            {children}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  )
}

function getVariantStyles(variant: ButtonVariant, disabled: boolean): { container: ViewStyle; text: TextStyle } {
  const opacity = disabled ? 0.5 : 1

  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.gold, opacity, ...shadows.md },
        text: { color: colors.navy },
      }
    case 'secondary':
      return {
        container: { backgroundColor: colors.navyLight, opacity },
        text: { color: colors.cream },
      }
    case 'outline':
      return {
        container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.gold, opacity },
        text: { color: colors.gold },
      }
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent', opacity },
        text: { color: colors.cream },
      }
    case 'destructive':
      return {
        container: { backgroundColor: colors.red, opacity },
        text: { color: colors.white },
      }
  }
}

function getSizeStyles(size: ButtonSize): { container: ViewStyle; text: TextStyle } {
  switch (size) {
    case 'sm':
      return {
        container: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
        text: { fontSize: fontSize.sm },
      }
    case 'md':
      return {
        container: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
        text: { fontSize: fontSize.md },
      }
    case 'lg':
      return {
        container: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
        text: { fontSize: fontSize.lg },
      }
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: fontWeight.bold,
  },
})
