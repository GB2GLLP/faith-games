import { Stack } from 'expo-router'
import { colors } from '../../../lib/theme'

export default function ChurchLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.navy },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="analytics" />
    </Stack>
  )
}
