import React, { useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../lib/theme'
import { useAuthStore } from '../../../stores/authStore'
import { useRoom } from '../../../hooks/useRoom'
import { JoinRoom } from '../../../components/game/JoinRoom'
import type { GameType } from '../../../lib/types/database'

const GAME_INFO: Record<GameType, { title: string; emoji: string; color: string }> = {
  charades: { title: 'Bible Charades', emoji: '🎭', color: '#f59e0b' },
  who_am_i: { title: 'Who Am I?', emoji: '🤔', color: '#3b82f6' },
  guess_verse: { title: 'Guess the Verse', emoji: '📖', color: '#10b981' },
  trivia: { title: 'Bible Trivia', emoji: '💡', color: '#8b5cf6' },
}

export default function RoomScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { gameType: gameTypeParam } = useLocalSearchParams<{ gameType: string }>()
  const gameType = (gameTypeParam || 'charades') as GameType
  const info = GAME_INFO[gameType]

  const user = useAuthStore((s) => s.user)
  const { createRoom, joinRoom } = useRoom()

  const [mode, setMode] = React.useState<'choose' | 'join'>('choose')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(40)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleCreate = async () => {
    if (!user) return
    try {
      await createRoom(gameType, user.id, user.display_name || user.email || 'Player')
      router.push('/(app)/games/lobby')
    } catch (e: any) {
      console.error('Failed to create room:', e)
    }
  }

  const handleJoin = async (code: string) => {
    if (!user) return false
    const success = await joinRoom(code, user.id, user.display_name || user.email || 'Player')
    if (success) {
      router.push('/(app)/games/lobby')
    }
    return success
  }

  if (mode === 'join') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <JoinRoom onJoin={handleJoin} onCancel={() => setMode('choose')} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.cream} />
        </TouchableOpacity>

        {/* Game info */}
        <View style={styles.gameInfo}>
          <Text style={styles.emoji}>{info.emoji}</Text>
          <Text style={styles.gameTitle}>{info.title}</Text>
          <Text style={styles.gameSubtitle}>Multi-device multiplayer</Text>
        </View>

        {/* Action cards */}
        <TouchableOpacity
          style={[styles.actionCard, { borderColor: info.color + '40' }]}
          onPress={handleCreate}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: info.color + '15' }]}>
            <Ionicons name="add-circle" size={32} color={info.color} />
          </View>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Create Room</Text>
            <Text style={styles.actionDesc}>Start a new game and invite friends</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.cream + '40'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { borderColor: info.color + '40' }]}
          onPress={() => setMode('join')}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: info.color + '15' }]}>
            <Ionicons name="enter" size={32} color={info.color} />
          </View>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Join Room</Text>
            <Text style={styles.actionDesc}>Enter a room code to join a game</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.cream + '40'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  gameInfo: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  gameTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.cream,
    marginBottom: spacing.xs,
  },
  gameSubtitle: {
    fontSize: fontSize.md,
    color: colors.creamDim,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    ...shadows.md,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: fontSize.sm,
    color: colors.cream,
    opacity: 0.5,
  },
})
