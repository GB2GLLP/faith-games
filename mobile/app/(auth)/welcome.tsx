import { useRef, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useOnboardingSeen } from '../../hooks/useOnboardingSeen'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// --- Data ---
const BIBLE_NAMES_ROW1 = ['Moses', 'David', 'Esther', 'Paul', 'Ruth', 'Abraham', 'Mary', 'Daniel', 'Noah', 'Sarah']
const BIBLE_NAMES_ROW2 = ['Peter', 'Joseph', 'Deborah', 'Elijah', 'Hannah', 'Solomon', 'Rahab', 'Joshua', 'Miriam', 'Samson']
const BIBLE_NAMES_ROW3 = ['Samuel', 'Lydia', 'Gideon', 'Rebecca', 'Caleb', 'Martha', 'Jonah', 'Priscilla', 'Timothy', 'Eve']

const PILL_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#0ea5e9', '#f43f5e', '#6366f1', '#22c55e', '#e11d48']

const GAME_CARDS = [
  { title: 'Bible Charades', desc: 'Act out Bible stories', icon: 'body' as const, bg: '#FEF3C7', border: '#f59e0b', color: '#92400e' },
  { title: 'Who Am I?', desc: 'Guess the character', icon: 'help-circle' as const, bg: '#DBEAFE', border: '#3b82f6', color: '#1e3a8a' },
  { title: 'Guess the Verse', desc: 'Reveal words one by one', icon: 'book' as const, bg: '#D1FAE5', border: '#10b981', color: '#064e3b' },
  { title: 'Bible Trivia', desc: 'Test your knowledge', icon: 'bulb' as const, bg: '#EDE9FE', border: '#8b5cf6', color: '#4c1d95' },
]

const FEATURES = [
  { icon: 'people' as const, title: 'Play with Friends', desc: 'Team up for game night' },
  { icon: 'book-outline' as const, title: 'Learn the Bible', desc: 'Grow in knowledge' },
  { icon: 'trophy' as const, title: 'Church Leaderboards', desc: 'Compete with your church' },
]

// --- Floating Particles ---
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 12 }, () => ({
      x: new Animated.Value(Math.random() * SCREEN_WIDTH),
      y: new Animated.Value(Math.random() * SCREEN_HEIGHT * 0.4),
      opacity: new Animated.Value(Math.random() * 0.4 + 0.1),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
      isCross: Math.random() > 0.5,
    }))
  ).current

  useEffect(() => {
    particles.forEach((p) => {
      const animateParticle = () => {
        Animated.parallel([
          Animated.timing(p.y, {
            toValue: -30,
            duration: 4000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(p.opacity, {
              toValue: 0.6,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(p.opacity, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          p.y.setValue(SCREEN_HEIGHT * 0.4 + 20)
          p.x.setValue(Math.random() * SCREEN_WIDTH)
          p.opacity.setValue(0.1)
          animateParticle()
        })
      }
      setTimeout(animateParticle, Math.random() * 3000)
    })
  }, [])

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            transform: [{ translateX: p.x }, { translateY: p.y }, { scale: p.scale }],
            opacity: p.opacity,
          }}
        >
          <Text style={{ fontSize: 16, color: colors.gold }}>
            {p.isCross ? '✦' : '✝'}
          </Text>
        </Animated.View>
      ))}
    </View>
  )
}

// --- Marquee Row ---
function MarqueeRow({
  names,
  speed,
  reverse,
}: {
  names: string[]
  speed: number
  reverse?: boolean
}) {
  const translateX = useRef(new Animated.Value(reverse ? -SCREEN_WIDTH : 0)).current
  const totalWidth = names.length * 120

  useEffect(() => {
    const from = reverse ? 0 : 0
    const to = reverse ? totalWidth : -totalWidth

    translateX.setValue(from)
    Animated.loop(
      Animated.timing(translateX, {
        toValue: to,
        duration: speed,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const doubled = [...names, ...names]

  return (
    <View style={marqueeStyles.row}>
      <Animated.View
        style={[marqueeStyles.inner, { transform: [{ translateX }] }]}
      >
        {doubled.map((name, i) => (
          <View
            key={`${name}-${i}`}
            style={[
              marqueeStyles.pill,
              { backgroundColor: PILL_COLORS[i % PILL_COLORS.length] + '20', borderColor: PILL_COLORS[i % PILL_COLORS.length] + '60' },
            ]}
          >
            <Text style={[marqueeStyles.pillText, { color: PILL_COLORS[i % PILL_COLORS.length] }]}>
              {name}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  )
}

// --- Main Screen ---
export default function WelcomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { markSeen } = useOnboardingSeen()

  // Hero animations
  const titleScale = useRef(new Animated.Value(0.3)).current
  const titleOpacity = useRef(new Animated.Value(0)).current
  const subtitleOpacity = useRef(new Animated.Value(0)).current
  const subtitleTranslateY = useRef(new Animated.Value(20)).current

  // Scroll-driven
  const scrollY = useRef(new Animated.Value(0)).current

  // Game card animations
  const cardAnims = useRef(GAME_CARDS.map(() => new Animated.Value(0))).current

  // Feature animations
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current

  // CTA
  const ctaOpacity = useRef(new Animated.Value(0)).current
  const ctaTranslateY = useRef(new Animated.Value(30)).current
  const buttonPulse = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Hero entrance
    Animated.sequence([
      Animated.parallel([
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start()

    // Staggered card reveals
    const cardTimers = cardAnims.map((anim, i) =>
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }).start()
      }, 800 + i * 150)
    )

    // Features reveal
    const featureTimers = featureAnims.map((anim, i) =>
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }).start()
      }, 1400 + i * 200)
    )

    // CTA
    const ctaTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(ctaOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(ctaTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start()
    }, 2000)

    // Button pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start()

    return () => {
      cardTimers.forEach(clearTimeout)
      featureTimers.forEach(clearTimeout)
      clearTimeout(ctaTimer)
    }
  }, [])

  const handleGetStarted = async () => {
    await markSeen()
    router.replace('/signup')
  }

  const handleSignIn = async () => {
    await markSeen()
    router.replace('/login')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 40 }}
      >
        {/* Section 1: Hero */}
        <View style={styles.heroSection}>
          <FloatingParticles />

          <Animated.View
            style={{
              transform: [{ scale: titleScale }],
              opacity: titleOpacity,
            }}
          >
            <Text style={styles.heroEmoji}>🎮</Text>
            <Text style={styles.heroTitle}>Faith</Text>
            <Text style={styles.heroTitleAccent}>Games</Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: subtitleOpacity,
              transform: [{ translateY: subtitleTranslateY }],
            }}
          >
            <Text style={styles.heroSubtitle}>
              Bible games that bring{'\n'}friends & families together
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: subtitleOpacity, marginTop: spacing.lg }}>
            <View style={styles.heroChips}>
              {['Fun', 'Faith', 'Fellowship'].map((word) => (
                <View key={word} style={styles.heroChip}>
                  <Text style={styles.heroChipText}>{word}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>

        {/* Section 2: Running Characters */}
        <View style={styles.marqueeSection}>
          <Text style={styles.sectionLabel}>BIBLE CHARACTERS</Text>
          <MarqueeRow names={BIBLE_NAMES_ROW1} speed={20000} />
          <MarqueeRow names={BIBLE_NAMES_ROW2} speed={25000} reverse />
          <MarqueeRow names={BIBLE_NAMES_ROW3} speed={18000} />
        </View>

        {/* Section 3: Game Showcase */}
        <View style={styles.gameSection}>
          <Text style={styles.sectionTitle}>4 Awesome Games</Text>
          <Text style={styles.sectionSubtitle}>Something for everyone</Text>

          <View style={styles.gameGrid}>
            {GAME_CARDS.map((game, i) => (
              <Animated.View
                key={game.title}
                style={[
                  styles.gameCard,
                  {
                    backgroundColor: game.bg,
                    borderColor: game.border,
                    opacity: cardAnims[i],
                    transform: [
                      {
                        scale: cardAnims[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.7, 1],
                        }),
                      },
                      {
                        translateY: cardAnims[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={[styles.gameCardIcon, { backgroundColor: game.border + '20' }]}>
                  <Ionicons name={game.icon} size={28} color={game.border} />
                </View>
                <Text style={[styles.gameCardTitle, { color: game.color }]}>{game.title}</Text>
                <Text style={[styles.gameCardDesc, { color: game.color + 'aa' }]}>{game.desc}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Section 4: Features */}
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>Why You'll Love It</Text>

          {FEATURES.map((feature, i) => (
            <Animated.View
              key={feature.title}
              style={[
                styles.featureRow,
                {
                  opacity: featureAnims[i],
                  transform: [
                    {
                      translateX: featureAnims[i].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={24} color={colors.gold} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Section 5: CTA */}
        <Animated.View
          style={[
            styles.ctaSection,
            {
              opacity: ctaOpacity,
              transform: [{ translateY: ctaTranslateY }],
            },
          ]}
        >
          <Text style={styles.ctaTitle}>Ready to Play?</Text>

          <Animated.View style={{ transform: [{ scale: buttonPulse }], width: '100%' }}>
            <Pressable onPress={handleGetStarted} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </Pressable>
          </Animated.View>

          <Pressable onPress={handleSignIn} style={styles.signInLink}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInBold}>Sign In</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  )
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    minHeight: SCREEN_HEIGHT * 0.45,
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize.hero,
    fontWeight: fontWeight.extrabold,
    color: colors.cream,
    textAlign: 'center',
    letterSpacing: -1,
  },
  heroTitleAccent: {
    fontSize: fontSize.hero,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
    textAlign: 'center',
    letterSpacing: -1,
    marginTop: -4,
  },
  heroSubtitle: {
    fontSize: fontSize.lg,
    color: colors.creamDim,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: spacing.md,
  },
  heroChips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heroChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.2)',
  },
  heroChipText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.gold,
  },

  // Marquee
  marqueeSection: {
    paddingVertical: spacing.xl,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.creamDim,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: spacing.md,
  },

  // Games
  gameSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gameCard: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.md) / 2,
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    padding: spacing.lg,
    ...shadows.md,
  },
  gameCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gameCardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  gameCardDesc: {
    fontSize: fontSize.xs,
    lineHeight: 16,
  },

  // Features
  featureSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadows.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: fontSize.sm,
    color: colors.creamDim,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.gold,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.lg,
  },
  ctaButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  signInLink: {
    marginTop: spacing.lg,
    padding: spacing.sm,
  },
  signInText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
  },
  signInBold: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
  },
})

const marqueeStyles = StyleSheet.create({
  row: {
    height: 44,
    marginVertical: 4,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
})
