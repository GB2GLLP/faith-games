import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import { ROOM_CODE_LENGTH } from '../../lib/constants'

interface Props {
  onJoin: (code: string) => Promise<boolean>
  onCancel: () => void
}

export function JoinRoom({ onJoin, onCancel }: Props) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase()
    if (trimmed.length !== ROOM_CODE_LENGTH) {
      setError(`Code must be ${ROOM_CODE_LENGTH} characters`)
      return
    }
    setLoading(true)
    setError('')
    const success = await onJoin(trimmed)
    if (!success) {
      setError('Room not found or already started')
    }
    setLoading(false)
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Join a Room</Text>
        <Text style={styles.subtitle}>Enter the {ROOM_CODE_LENGTH}-character room code</Text>

        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={(t) => {
            setCode(t.toUpperCase().slice(0, ROOM_CODE_LENGTH))
            setError('')
          }}
          placeholder="ABC123"
          placeholderTextColor={colors.cream + '30'}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={ROOM_CODE_LENGTH}
          textAlign="center"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.joinButton, code.length < ROOM_CODE_LENGTH && styles.joinButtonDisabled]}
          onPress={handleJoin}
          disabled={loading || code.length < ROOM_CODE_LENGTH}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.joinButtonText}>Join Game</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
    ...shadows.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.6,
    marginBottom: spacing.lg,
  },
  codeInput: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    letterSpacing: 8,
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    marginBottom: spacing.md,
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.red,
    marginBottom: spacing.sm,
  },
  joinButton: {
    backgroundColor: colors.gold,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.sm,
    ...shadows.colored(colors.gold),
  },
  joinButtonDisabled: {
    opacity: 0.5,
  },
  joinButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  cancelButton: {
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  cancelText: {
    fontSize: fontSize.md,
    color: colors.cream,
    opacity: 0.5,
  },
})
