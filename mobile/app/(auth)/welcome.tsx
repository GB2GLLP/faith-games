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
import { spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'
import ParallaxBackground from '../../components/welcome/ParallaxBackground'
import WoodenTitle from '../../components/welcome/WoodenTitle'

const { width: SW, height: SH } = Dimensions.get('window')

// --- Data ---
const GAME_CARDS = [
  { title: 'Bible Charades', desc: 'Act out Bible stories', icon: 'body' as const, bg: '#FEF3C7', border: '#f59e0b', color: '#92400e' },
  { title: 'Who Am I?', desc: 'Guess the character', icon: 'help-circle' as const, bg: '#DBEAFE', border: '#3b82f6', color: '#1e3a8a' },
  { title: 'Guess the Verse', desc: 'Reveal words one by one', icon: 'book' as const, bg: '#D1FAE5', border: '#10b981', color: '#064e3b' },
  { title: 'Bible Trivia', desc: 'Test your knowledge', icon: 'bulb' as const, bg: '#EDE9FE', border: '#8b5cf6', color: '#4c1d95' },
]

const ABOUT_ITEMS = [
  { icon: 'heart' as const, title: 'Family Friendly', desc: 'Safe fun for all ages' },
  { icon: 'book' as const, title: 'Bible Based', desc: 'Rooted in Scripture' },
  { icon: 'people' as const, title: 'Church Connected', desc: 'Play with your community' },
]

const FEATURES = [
  { icon: 'people' as const, title: 'Play with Friends', desc: 'Team up for game night' },
  { icon: 'book-outline' as const, title: 'Learn the Bible', desc: 'Grow in knowledge' },
  { icon: 'trophy' as const, title: 'Church Leaderboards', desc: 'Compete with your church' },
]

// --- Scroll Down Indicator ---
function ScrollDownIndicator({ scrollY }: { scrollY: Animated.Value }) {
  const bounce = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 10, duration: 800, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const opacity = scrollY.interpolate({
    inputRange: [0, SH * 0.1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View style={{ opacity, alignItems: 'center', marginTop: 20 }}>
      <Animated.View style={{ transform: [{ translateY: bounce }] }}>
        <Ionicons name="chevron-down" size={28} color="rgba(255,255,255,0.7)" />
      </Animated.View>
    </Animated.View>
  )
}

// --- Main Screen ---
export default function WelcomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { markSeen } = useOnboardingSeen()

  const scrollY = useRef(new Animated.Value(0)).current

  // Hero entry animation
  const heroScale = useRef(new Animated.Value(0.3)).current
  const heroOpacity = useRef(new Animated.Value(0)).current

  // Staggered section entrance anims (timed, not scroll-driven)
  const cardAnims = useRef(GAME_CARDS.map(() => new Animated.Value(0))).current
  const aboutAnim = useRef(new Animated.Value(0)).current
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current
  const ctaAnim = useRef(new Animated.Value(0)).current

  // Button pulse
  const buttonPulse = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Hero spring in
    Animated.parallel([
      Animated.spring(heroScale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Staggered card reveals
    const cardTimers = cardAnims.map((anim, i) =>
      setTimeout(() => {
        Animated.spring(anim, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }).start()
      }, 600 + i * 120)
    )

    // About section
    const aboutTimer = setTimeout(() => {
      Animated.spring(aboutAnim, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }).start()
    }, 1200)

    // Feature rows
    const featureTimers = featureAnims.map((anim, i) =>
      setTimeout(() => {
        Animated.spring(anim, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }).start()
      }, 1400 + i * 150)
    )

    // CTA
    const ctaTimer = setTimeout(() => {
      Animated.timing(ctaAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start()
    }, 1800)

    // CTA button pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(buttonPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start()

    return () => {
      cardTimers.forEach(clearTimeout)
      clearTimeout(aboutTimer)
      featureTimers.forEach(clearTimeout)
      clearTimeout(ctaTimer)
    }
  }, [])

  // Scroll-driven hero shrink/fade
  const heroScrollScale = scrollY.interpolate({
    inputRange: [0, SH * 0.25],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  })
  const heroScrollOpacity = scrollY.interpolate({
    inputRange: [0, SH * 0.3],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const handlePlayNow = async () => {
    await markSeen()
    router.replace('/signup')
  }

  const handleSignIn = async () => {
    await markSeen()
    router.replace('/login')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fixed background */}
      <ParallaxBackground scrollY={scrollY} />

      {/* Scrollable content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 40 }}
      >
        {/* ===== HERO SECTION ===== */}
        <View style={styles.heroSection}>
          <Animated.View
            style={{
              opacity: Animated.multiply(heroOpacity, heroScrollOpacity),
              transform: [
                { scale: Animated.multiply(heroScale, heroScrollScale) },
              ],
            }}
          >
            <WoodenTitle />
          </Animated.View>

          <ScrollDownIndicator scrollY={scrollY} />
        </View>

        {/* ===== GAMES SHOWCASE ===== */}
        <View style={styles.section}>
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
                          outputRange: [0.8, 1],
                        }),
                      },
                      {
                        translateY: cardAnims[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
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

        {/* ===== ABOUT FAITH GAMES ===== */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: aboutAnim,
              transform: [{
                translateY: aboutAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>About Faith Games</Text>
          <Text style={styles.missionText}>
            Bringing families and churches together through fun, faith-filled games rooted in Scripture.
          </Text>

          <View style={styles.aboutGrid}>
            {ABOUT_ITEMS.map((item) => (
              <View key={item.title} style={styles.aboutItem}>
                <View style={styles.aboutIcon}>
                  <Ionicons name={item.icon} size={22} color="#0891b2" />
                </View>
                <Text style={styles.aboutItemTitle}>{item.title}</Text>
                <Text style={styles.aboutItemDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ===== WHY FAITH GAMES ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why You'll Love It</Text>

          {FEATURES.map((feature, i) => (
            <Animated.View
              key={feature.title}
              style={[
                styles.featureRow,
                {
                  opacity: featureAnims[i],
                  transform: [{
                    translateX: featureAnims[i].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={24} color="#0891b2" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* ===== CTA ===== */}
        <Animated.View
          style={[
            styles.ctaSection,
            {
              opacity: ctaAnim,
              transform: [{
                translateY: ctaAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              }],
            },
          ]}
        >
          <Text style={styles.ctaTitle}>Ready to Play?</Text>

          <Animated.View style={{ transform: [{ scale: buttonPulse }], width: '100%' }}>
            <Pressable onPress={handlePlayNow} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Play Now!</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
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
    backgroundColor: '#0891b2',
  },

  // Hero — takes up ~65% of screen, not 85%
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: SH * 0.6,
    paddingHorizontal: spacing.lg,
  },

  // Sections — tighter padding
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  sectionSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  // Games grid
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gameCard: {
    width: (SW - spacing.lg * 2 - spacing.md) / 2,
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

  // About
  missionText: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  aboutGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  aboutItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  aboutIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  aboutItemTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  aboutItemDesc: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  // Features
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
    color: '#fff',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },

  // CTA
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#fff',
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ctaButton: {
    backgroundColor: '#f59e0b',
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
    color: '#fff',
  },
  signInLink: {
    marginTop: spacing.lg,
    padding: spacing.sm,
  },
  signInText: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.7)',
  },
  signInBold: {
    color: '#fff',
    fontWeight: fontWeight.bold,
  },
})
