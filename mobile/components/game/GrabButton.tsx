import { useState, useCallback, useRef } from 'react'
import { Text, Pressable, StyleSheet, Animated } from 'react-native'
import { colors, borderRadius, fontSize, fontWeight, spacing, shadows } from '../../lib/theme'

interface GrabButtonProps {
  onGrab: () => boolean
  label?: string
  disabled?: boolean
}

export function GrabButton({ onGrab, label = 'GRAB!', disabled }: GrabButtonProps) {
  const [grabbed, setGrabbed] = useState(false)
  const scale = useRef(new Animated.Value(1)).current

  const handleGrab = useCallback(() => {
    if (grabbed || disabled) return
    const success = onGrab()
    if (success) {
      setGrabbed(true)
      Animated.sequence([
        Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, friction: 8 }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8 }),
      ]).start()
      setTimeout(() => setGrabbed(false), 2000)
    }
  }, [onGrab, grabbed, disabled, scale])

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, friction: 8 }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8 }).start()
  }

  const bgColor = grabbed
    ? colors.green
    : disabled
    ? colors.creamFaint
    : colors.gold
  const textColor = grabbed ? colors.white : disabled ? colors.creamDim : colors.navy

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={handleGrab}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.button,
          { backgroundColor: bgColor },
          !disabled && !grabbed && shadows.colored(colors.gold),
          grabbed && shadows.colored(colors.green),
        ]}
      >
        <Text style={[styles.label, { color: textColor }]}>
          {grabbed ? 'GRABBED!' : label}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
  label: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    letterSpacing: 2,
  },
})
