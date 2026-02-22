import { Redirect } from 'expo-router'
import { useAuthStore } from '../stores/authStore'
import { useOnboardingSeen } from '../hooks/useOnboardingSeen'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../lib/theme'

export default function Index() {
  const { user, loading, initialized } = useAuthStore()
  const { seen } = useOnboardingSeen()

  if (!initialized || loading || seen === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    )
  }

  if (user) {
    return <Redirect href="/(app)" />
  }

  if (!seen) {
    return <Redirect href="/welcome" />
  }

  return <Redirect href="/login" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
  },
})
