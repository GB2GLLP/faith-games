import { useRef, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../../lib/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const GAMES = [
  {
    title: 'Bible Charades',
    description: 'Act out Bible stories while your team guesses — laughs guaranteed!',
    icon: 'body' as const,
    gameType: 'charades' as const,
    bg: '#FEF3C7',
    color: '#f59e0b',
    dark: '#92400e',
    players: '2-12 players',
  },
  {
    title: 'Who Am I?',
    description: 'Put the phone on your forehead and guess the Bible character from clues!',
    icon: 'help-circle' as const,
    gameType: 'who_am_i' as const,
    bg: '#DBEAFE',
    color: '#3b82f6',
    dark: '#1e3a8a',
    players: '4-12 players',
  },
  {
    title: 'Guess the Verse',
    description: 'Words reveal one by one — can you name the verse before time runs out?',
    icon: 'book' as const,
    gameType: 'guess_verse' as const,
    bg: '#D1FAE5',
    color: '#10b981',
    dark: '#064e3b',
    players: '1-8 players',
  },
  {
    title: 'Bible Trivia',
    description: 'Test your Bible knowledge with multiple-choice trivia questions!',
    icon: 'bulb' as const,
    gameType: 'trivia' as const,
    bg: '#EDE9FE',
    color: '#8b5cf6',
    dark: '#4c1d95',
    players: '1-8 players',
  },
]

function GameCard({
  game,
  index,
  onPress,
}: {
  game: (typeof GAMES)[0]
  index: number
  onPress: () => void
}) {
  const mountAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 120,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start()
  }, [])

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [
          { scale: Animated.multiply(scaleAnim, mountAnim) },
          {
            translateY: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            }),
          },
        ],
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, { backgroundColor: game.bg, borderColor: game.color + '40' }]}
      >
        <View style={styles.cardTop}>
          <View style={[styles.iconContainer, { backgroundColor: game.color + '20' }]}>
            <Ionicons name={game.icon} size={32} color={game.color} />
          </View>
          <View style={[styles.playerBadge, { backgroundColor: game.color + '15' }]}>
            <Ionicons name="people-outline" size={12} color={game.color} />
            <Text style={[styles.playerText, { color: game.color }]}>{game.players}</Text>
          </View>
        </View>
        <Text style={[styles.cardTitle, { color: game.dark }]}>{game.title}</Text>
        <Text style={[styles.cardDesc, { color: game.dark + '99' }]}>{game.description}</Text>
        <View style={[styles.playButton, { backgroundColor: game.color }]}>
          <Text style={styles.playButtonText}>Play Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default function GamesScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Pick a Game</Text>
        <Text style={styles.subtitle}>Choose your challenge</Text>
      </View>

      <View style={styles.grid}>
        {GAMES.map((game, i) => (
          <GameCard
            key={game.title}
            game={game}
            index={i}
            onPress={() => router.push({ pathname: '/(app)/games/room', params: { gameType: game.gameType } })}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.cream,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.creamDim,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    padding: spacing.lg,
    ...shadows.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
    borderRadius: borderRadius.full,
  },
  playerText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.lg,
  },
  playButtonText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
})
