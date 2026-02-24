import React from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const { width: SW, height: SH } = Dimensions.get('window')

const AnimatedView = Animated.View

// Cloud shapes as rounded white views
const CLOUDS = [
  { left: -20, top: 80, w: 140, h: 50, opacity: 0.2, rate: 0.15 },
  { left: SW * 0.5, top: 140, w: 180, h: 60, opacity: 0.15, rate: 0.12 },
  { left: SW * 0.25, top: 50, w: 110, h: 40, opacity: 0.18, rate: 0.18 },
  { left: SW * 0.7, top: 200, w: 130, h: 45, opacity: 0.12, rate: 0.1 },
]

interface ParallaxBackgroundProps {
  scrollY: Animated.Value
}

export default function ParallaxBackground({ scrollY }: ParallaxBackgroundProps) {
  // Light sky highlight fades out as user scrolls
  const skyHighlightOpacity = scrollY.interpolate({
    inputRange: [0, SH],
    outputRange: [0.4, 0],
    extrapolate: 'clamp',
  })

  // Green field slides up from below
  const fieldTranslateY = scrollY.interpolate({
    inputRange: [0, SH * 0.3, SH * 1.2],
    outputRange: [SH * 0.6, SH * 0.3, 0],
    extrapolate: 'clamp',
  })
  const fieldOpacity = scrollY.interpolate({
    inputRange: [SH * 0.3, SH * 1.2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  // Dark ground slides up more slowly
  const groundTranslateY = scrollY.interpolate({
    inputRange: [0, SH * 0.3, SH * 1.5],
    outputRange: [SH * 0.8, SH * 0.5, SH * 0.1],
    extrapolate: 'clamp',
  })
  const groundOpacity = scrollY.interpolate({
    inputRange: [SH * 0.5, SH * 1.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Layer 1: Base sky - always visible */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#0891b2' }]} />

      {/* Layer 2: Light sky highlight */}
      <AnimatedView
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#67e8f9', opacity: skyHighlightOpacity },
        ]}
      />

      {/* Clouds */}
      {CLOUDS.map((cloud, i) => {
        const cloudTranslateY = scrollY.interpolate({
          inputRange: [0, SH * 3],
          outputRange: [0, -SH * 3 * cloud.rate],
          extrapolate: 'clamp',
        })

        return (
          <AnimatedView
            key={i}
            style={{
              position: 'absolute',
              left: cloud.left,
              top: cloud.top,
              width: cloud.w,
              height: cloud.h,
              borderRadius: cloud.h / 2,
              backgroundColor: 'white',
              opacity: cloud.opacity,
              transform: [{ translateY: cloudTranslateY }],
            }}
          />
        )
      })}

      {/* Layer 3: Green field */}
      <AnimatedView
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#22c55e',
            opacity: fieldOpacity,
            transform: [{ translateY: fieldTranslateY }],
          },
        ]}
      >
        {/* SVG hills silhouette at top edge */}
        <Svg
          width={SW}
          height={80}
          viewBox={`0 0 ${SW} 80`}
          style={{ position: 'absolute', top: -79 }}
        >
          <Path
            d={`M0 80 Q${SW * 0.15} 20, ${SW * 0.3} 50 Q${SW * 0.45} 80, ${SW * 0.55} 35 Q${SW * 0.7} -5, ${SW * 0.85} 40 Q${SW * 0.95} 65, ${SW} 30 L${SW} 80 Z`}
            fill="#22c55e"
          />
        </Svg>
      </AnimatedView>

      {/* Layer 4: Dark ground */}
      <AnimatedView
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#15803d',
            opacity: groundOpacity,
            transform: [{ translateY: groundTranslateY }],
          },
        ]}
      />
    </View>
  )
}
