import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Rect, Line } from 'react-native-svg'

const WOOD_COLOR = '#8B4513'
const WOOD_DARK = '#5C2D0A'
const WOOD_LIGHT = '#A0522D'

// Cross sized to match the capital T in "Faith" at fontSize 52
// The cross sits inline where the T would be
function CrossSvg() {
  // Match the cap height of the 52pt font (~38px visual height)
  const h = 42
  const w = 28
  const beamW = 7
  const crossbarH = 7
  const crossbarY = 10

  return (
    <View style={{ width: w, height: h, marginHorizontal: -1, marginBottom: -2 }}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Vertical beam */}
        <Rect
          x={(w - beamW) / 2}
          y={0}
          width={beamW}
          height={h}
          rx={1.5}
          fill={WOOD_COLOR}
        />
        {/* Horizontal crossbar */}
        <Rect
          x={2}
          y={crossbarY}
          width={w - 4}
          height={crossbarH}
          rx={1.5}
          fill={WOOD_COLOR}
        />
        {/* Subtle grain lines */}
        <Line x1={(w - beamW) / 2 + 2} y1={1} x2={(w - beamW) / 2 + 2} y2={h - 1} stroke={WOOD_LIGHT} strokeWidth={0.7} opacity={0.4} />
        <Line x1={4} y1={crossbarY + 2.5} x2={w - 4} y2={crossbarY + 2.5} stroke={WOOD_LIGHT} strokeWidth={0.7} opacity={0.4} />
      </Svg>
    </View>
  )
}

export default function WoodenTitle() {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>Fai</Text>
        <CrossSvg />
        <Text style={styles.titleText}>h</Text>
      </View>
      <Text style={styles.gamesText}>Games</Text>
      <Text style={styles.subtitle}>Bible games for friends & families</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 52,
    fontWeight: '800',
    color: WOOD_COLOR,
    textShadowColor: WOOD_DARK,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
    letterSpacing: -1,
    lineHeight: 56,
  },
  gamesText: {
    fontSize: 52,
    fontWeight: '800',
    color: WOOD_COLOR,
    textShadowColor: WOOD_DARK,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
    letterSpacing: -1,
    marginTop: -6,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 10,
    fontWeight: '500',
  },
})
