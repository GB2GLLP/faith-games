import { Platform } from 'react-native'

export const colors = {
  navy: '#ffffff',
  navyLight: '#ecfeff',
  gold: '#0891b2',
  goldLight: '#22d3ee',
  goldDark: '#0e7490',
  cream: '#0f172a',
  creamDim: 'rgba(15, 23, 42, 0.4)',
  creamFaint: 'rgba(15, 23, 42, 0.1)',
  creamSubtle: 'rgba(15, 23, 42, 0.05)',
  white: '#ffffff',
  black: '#000000',
  red: '#ef4444',
  green: '#22c55e',
  blue: '#3b82f6',
  yellow: '#eab308',
  teamA: '#60a5fa',
  teamB: '#f87171',
  // New accent colors for cards
  amber: '#f59e0b',
  purple: '#8b5cf6',
  emerald: '#10b981',
  rose: '#f43f5e',
  sky: '#0ea5e9',
  indigo: '#6366f1',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
  hero: 48,
} as const

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
}

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
    android: { elevation: 8 },
  }),
  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
  }),
  colored: (color: string) =>
    Platform.select({
      ios: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
} as const
