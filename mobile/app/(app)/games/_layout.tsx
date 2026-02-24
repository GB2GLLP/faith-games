import { useEffect } from 'react'
import { Stack, usePathname, useNavigation } from 'expo-router'
import { colors } from '../../../lib/theme'

const GAME_ROUTES = ['/charades', '/who-am-i', '/guess-verse', '/trivia']

export default function GamesLayout() {
  const pathname = usePathname()
  const navigation = useNavigation()

  const isInGame = GAME_ROUTES.some((r) => pathname.includes(r))

  // Hide parent tab bar when inside a game screen
  useEffect(() => {
    if (isInGame) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      navigation.setOptions({ tabBarStyle: undefined })
    }
  }, [isInGame])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.navy },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="room" />
      <Stack.Screen name="lobby" />
      <Stack.Screen name="charades/index" />
      <Stack.Screen name="who-am-i/index" />
      <Stack.Screen name="guess-verse/index" />
      <Stack.Screen name="trivia/index" />
    </Stack>
  )
}
