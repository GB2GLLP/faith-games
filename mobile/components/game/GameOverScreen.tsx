import { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { Button } from '../ui/Button'
import type { Player } from '../../stores/gameStore'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

interface GameOverScreenProps {
  winner: Player | string | null
  players: Player[]
  onPlayAgain: () => void
  onExit: () => void
}

const MEDALS = ['1st', '2nd', '3rd']
const MEDAL_COLORS = [colors.amber, '#94a3b8', '#cd7f32']

export function GameOverScreen({ winner, players, onPlayAgain, onExit }: GameOverScreenProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const winnerName = typeof winner === 'string' ? winner : winner?.name

  // Animations
  const trophyScale = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const confettiAnims = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current

  useEffect(() => {
    // Trophy bounce in
    Animated.spring(trophyScale, {
      toValue: 1,
      tension: 50,
      friction: 4,
      useNativeDriver: true,
    }).start()

    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start()

    // Confetti particles
    confettiAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1500 + i * 200,
            delay: i * 100,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start()
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* Confetti particles */}
      {confettiAnims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.confetti,
            {
              left: `${15 + i * 14}%`,
              backgroundColor: [colors.gold, colors.rose, colors.emerald, colors.purple, colors.sky, colors.amber][i],
              opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 0] }),
              transform: [
                { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -80] }) },
                { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
                { scale: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1.2, 0.3] }) },
              ],
            },
          ]}
        />
      ))}

      <Animated.View style={[styles.trophyContainer, { transform: [{ scale: trophyScale }] }]}>
        <Text style={styles.trophy}>🏆</Text>
      </Animated.View>

      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Game Over!</Text>
        {winnerName && (
          <View style={styles.winnerCard}>
            <Text style={styles.winnerText}>
              <Text style={styles.winnerName}>{winnerName}</Text> wins!
            </Text>
          </View>
        )}
      </Animated.View>

      <Animated.View style={[styles.scores, { opacity: fadeAnim }]}>
        <Text style={styles.scoresTitle}>FINAL SCORES</Text>
        {sorted.map((player, i) => (
          <View
            key={player.id}
            style={[styles.scoreRow, i === 0 && styles.winnerRow]}
          >
            <View style={styles.scoreLeft}>
              {i < 3 && (
                <View style={[styles.medalCircle, { backgroundColor: MEDAL_COLORS[i] + '20' }]}>
                  <Text style={[styles.medal, { color: MEDAL_COLORS[i] }]}>{MEDALS[i]}</Text>
                </View>
              )}
              <Text style={styles.playerName}>{player.name}</Text>
            </View>
            <Text style={styles.playerScore}>{player.score}</Text>
          </View>
        ))}
      </Animated.View>

      <Animated.View style={[styles.buttons, { opacity: fadeAnim }]}>
        <Button onPress={onPlayAgain} size="lg" style={styles.btn}>
          Play Again
        </Button>
        <Button onPress={onExit} variant="outline" size="lg" style={styles.btn}>
          Exit
        </Button>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xl,
  },
  confetti: {
    position: 'absolute',
    top: 60,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  trophyContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.amber + '15',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.colored(colors.amber),
  },
  trophy: {
    fontSize: 48,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
  },
  winnerCard: {
    backgroundColor: colors.gold + '10',
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gold + '25',
  },
  winnerText: {
    fontSize: fontSize.xl,
    color: colors.cream,
  },
  winnerName: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
  },
  scores: {
    width: '100%',
    gap: spacing.sm,
  },
  scoresTitle: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  winnerRow: {
    backgroundColor: colors.gold + '08',
    borderWidth: 1.5,
    borderColor: colors.gold + '30',
    ...shadows.md,
  },
  scoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  medalCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medal: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  playerName: {
    color: colors.cream,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.md,
  },
  playerScore: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  btn: {
    minWidth: 140,
  },
})
