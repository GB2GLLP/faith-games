import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../stores/authStore'
import { colors, spacing, borderRadius } from '../../lib/theme'
import { View, ActivityIndicator, StyleSheet, Animated, Dimensions } from 'react-native'
import { useRef, useEffect } from 'react'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TAB_COUNT = 4
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT

function AnimatedTabIcon({
  name,
  color,
  size,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap
  color: string
  size: number
  focused: boolean
}) {
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (focused) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
          friction: 4,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
        }),
      ]).start()
    }
  }, [focused])

  return (
    <View style={tabStyles.iconWrapper}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons name={name} size={size} color={color} />
      </Animated.View>
      {focused && <View style={tabStyles.activeIndicator} />}
    </View>
  )
}

export default function AppLayout() {
  const { user, loading, initialized } = useAuthStore()

  if (!initialized || loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.navyLight,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 28,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.creamDim,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="home" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="game-controller" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="stats-chart" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="person" size={size} color={color} focused={focused} />
          ),
        }}
      />
      {/* Hidden tabs */}
      <Tabs.Screen name="leaderboard" options={{ href: null }} />
      <Tabs.Screen name="subscription" options={{ href: null }} />
      <Tabs.Screen name="church" options={{ href: null }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
  },
})

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.gold,
    marginTop: 3,
  },
})
