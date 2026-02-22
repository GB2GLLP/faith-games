import { Stack } from 'expo-router'
import { colors } from '../../../lib/theme'

export default function GamesLayout() {
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
