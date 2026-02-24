import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../stores/authStore'
import { colors, spacing } from '../../lib/theme'
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import { BlurView } from 'expo-blur'
import { useRef, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_CONFIG = {
  index: {
    label: 'Home',
    activeIcon: 'home' as const,
    inactiveIcon: 'home-outline' as const,
    activeColor: '#0891b2',
  },
  games: {
    label: 'Play',
    activeIcon: 'dice' as const,
    inactiveIcon: 'dice-outline' as const,
    activeColor: '#8b5cf6',
  },
  stats: {
    label: 'Stats',
    activeIcon: 'bar-chart' as const,
    inactiveIcon: 'bar-chart-outline' as const,
    activeColor: '#10b981',
  },
  profile: {
    label: 'Me',
    activeIcon: 'happy' as const,
    inactiveIcon: 'happy-outline' as const,
    activeColor: '#f59e0b',
  },
}

function TabIcon({
  tabKey,
  focused,
}: {
  tabKey: keyof typeof TAB_CONFIG
  focused: boolean
}) {
  const config = TAB_CONFIG[tabKey]
  const scale = useRef(new Animated.Value(1)).current
  const pillWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.05, useNativeDriver: true, friction: 5 }),
        Animated.spring(pillWidth, { toValue: 1, useNativeDriver: false, friction: 6 }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
        Animated.spring(pillWidth, { toValue: 0, useNativeDriver: false, friction: 6 }),
      ]).start()
    }
  }, [focused])

  const iconName = focused ? config.activeIcon : config.inactiveIcon
  const iconColor = focused ? '#fff' : 'rgba(15, 23, 42, 0.35)'
  const labelColor = focused ? config.activeColor : 'rgba(15, 23, 42, 0.3)'

  return (
    <Animated.View style={[tabStyles.tabItem, { transform: [{ scale }] }]}>
      <Animated.View
        style={[
          tabStyles.activePill,
          {
            backgroundColor: config.activeColor,
            opacity: pillWidth,
            transform: [
              {
                scaleX: pillWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Ionicons name={iconName} size={20} color={iconColor} style={{ zIndex: 1 }} />
      <Text style={[tabStyles.label, { color: labelColor }]}>{config.label}</Text>
    </Animated.View>
  )
}

export default function AppLayout() {
  const { user, loading, initialized } = useAuthStore()
  const insets = useSafeAreaInsets()

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

  const bottomOffset = Math.max(insets.bottom - 8, 8)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="systemChromeMaterialLight"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomOffset,
          left: 24,
          right: 24,
          height: 62,
          borderRadius: 31,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          elevation: 16,
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.06)',
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tabKey="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tabKey="games" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tabKey="stats" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon tabKey="profile" focused={focused} />,
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
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 56,
    gap: 3,
    marginTop: 6,
  },
  activePill: {
    position: 'absolute',
    top: 2,
    width: 36,
    height: 28,
    borderRadius: 14,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})
