import { View, Text, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { formatTime } from '../../lib/utils'
import { colors, fontSize, fontWeight } from '../../lib/theme'

interface TimerProps {
  time: number
  maxTime: number
  size?: 'sm' | 'lg'
}

export function Timer({ time, maxTime, size = 'lg' }: TimerProps) {
  const progress = time / maxTime
  const isCritical = time <= 5
  const isWarning = time <= 10

  const dimension = size === 'lg' ? 128 : 80
  const radius = size === 'lg' ? 56 : 34
  const circumference = 2 * Math.PI * radius
  const center = dimension / 2

  const strokeColor = isCritical ? colors.red : isWarning ? colors.yellow : colors.gold
  const textColor = isCritical ? colors.red : isWarning ? colors.yellow : colors.cream
  const textSize = size === 'lg' ? fontSize.xxxl : fontSize.xl

  return (
    <View style={[styles.container, { width: dimension, height: dimension }]}>
      <Svg width={dimension} height={dimension} style={styles.svg}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(15, 23, 42, 0.1)"
          strokeWidth={4}
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: textSize, color: textColor }]}>
          {formatTime(time)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: fontWeight.bold,
    fontVariant: ['tabular-nums'],
  },
})
