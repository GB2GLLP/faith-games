import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import { useAuthStore } from '../../stores/authStore'
import { useRoom } from '../../hooks/useRoom'

export default function JoinByCodeScreen() {
  const router = useRouter()
  const { code } = useLocalSearchParams<{ code: string }>()
  const user = useAuthStore((s) => s.user)
  const { joinRoom } = useRoom()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code || !user) return

    const join = async () => {
      const success = await joinRoom(
        code,
        user.id,
        user.display_name || user.email || 'Player'
      )
      if (success) {
        router.replace('/(app)/games/lobby')
      } else {
        setError('Room not found or game already started')
      }
    }

    join()
  }, [code, user])

  if (!user) {
    // Not logged in — redirect to auth
    useEffect(() => {
      router.replace('/(auth)/login')
    }, [])
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {error ? (
          <>
            <Text style={styles.errorEmoji}>😕</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorHint} onPress={() => router.replace('/(app)/games')}>
              Go to Games
            </Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={colors.gold} />
            <Text style={styles.joiningText}>Joining room {code}...</Text>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navy,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '90%',
    ...shadows.lg,
  },
  joiningText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.cream,
    marginTop: spacing.md,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.red,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  errorHint: {
    fontSize: fontSize.md,
    color: colors.gold,
    fontWeight: fontWeight.semibold,
  },
})
