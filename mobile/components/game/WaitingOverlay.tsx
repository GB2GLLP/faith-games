import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

interface Props {
  message?: string
  subMessage?: string
}

export function WaitingOverlay({ message = 'Waiting for host...', subMessage }: Props) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    )
    pulse.start()
    return () => pulse.stop()
  }, [])

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Animated.Text style={[styles.dots, { opacity: pulseAnim }]}>
          {'...'}
        </Animated.Text>
        <Text style={styles.message}>{message}</Text>
        {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '80%',
    ...shadows.lg,
  },
  dots: {
    fontSize: fontSize.display,
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
})
