import { useRef, useEffect } from 'react'
import { View, StyleSheet, ViewStyle, Animated } from 'react-native'
import { colors, borderRadius } from '../../lib/theme'

interface ProgressBarProps {
  progress: number // 0-1
  color?: string
  height?: number
  style?: ViewStyle
}

export function ProgressBar({
  progress,
  color = colors.gold,
  height = 8,
  style,
}: ProgressBarProps) {
  const width = useRef(new Animated.Value(progress)).current

  useEffect(() => {
    Animated.timing(width, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [progress])

  const animatedWidth = width.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={[styles.track, { height }, style]}>
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: color, height, width: animatedWidth },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(15, 23, 42, 0.1)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
})
