import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '../../lib/theme'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: SpinnerSize
  color?: string
  style?: ViewStyle
}

const SIZE_MAP: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
}

export function Spinner({ size = 'md', color = colors.gold, style }: SpinnerProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={SIZE_MAP[size]} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
