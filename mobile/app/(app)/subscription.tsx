import { useEffect, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Linking, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { SUBSCRIPTION_PLANS } from '../../lib/constants'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

const TIER_ACCENTS = [colors.emerald, colors.gold, colors.purple] as const

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()

  // Animated entrance
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleUpgrade = () => {
    Linking.openURL('https://faithgames.app/subscription')
  }

  const planEntries = Object.entries(SUBSCRIPTION_PLANS)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md }]}
    >
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.heading}>Subscription</Text>

        {/* Current Plan Card */}
        <View style={styles.currentPlan}>
          <View style={styles.currentLabel}>
            <Text style={styles.currentLabelText}>Current Plan</Text>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planName}>
              {user?.subscription_tier === 'free' ? 'Free' : user?.subscription_tier === 'individual' ? 'Individual' : 'Church'}
            </Text>
            <View style={[
              styles.currentBadge,
              { backgroundColor: user?.subscription_tier === 'free' ? colors.creamFaint : `${colors.gold}20` },
            ]}>
              <Text style={[
                styles.currentBadgeText,
                { color: user?.subscription_tier === 'free' ? colors.cream : colors.gold },
              ]}>
                {user?.subscription_tier || 'free'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Plans</Text>

        {planEntries.map(([key, plan], index) => {
          const accent = TIER_ACCENTS[index % TIER_ACCENTS.length]
          const displayPrice = 'price' in plan ? `$${plan.price}` : 'pricePerMember' in plan ? `$${plan.pricePerMember}` : '$0'
          const intervalLabel = plan.interval
          const description = 'description' in plan ? plan.description : null

          return (
            <View key={key} style={[styles.planCard, { borderLeftColor: accent }]}>
              <Text style={[styles.planCardTitle, { color: accent }]}>{plan.name}</Text>
              <Text style={styles.price}>
                {displayPrice}
                <Text style={styles.interval}>/{intervalLabel}</Text>
              </Text>
              {description && (
                <Text style={styles.planDescription}>{description}</Text>
              )}
              <View style={styles.features}>
                <Text style={styles.feature}>All premium content</Text>
                <Text style={styles.feature}>Unlimited game sessions</Text>
                <Text style={styles.feature}>Priority support</Text>
              </View>
            </View>
          )
        })}

        <Button onPress={handleUpgrade} size="lg" fullWidth style={{ marginTop: spacing.md }}>
          Upgrade on Web
        </Button>

        <Text style={styles.note}>
          Subscription management is handled through our website. Tap above to open it in your browser.
        </Text>
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    marginBottom: spacing.lg,
  },
  currentPlan: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.lg,
  },
  currentLabel: { marginBottom: spacing.sm },
  currentLabelText: { color: colors.creamDim, fontSize: fontSize.sm },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    color: colors.cream,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  currentBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  currentBadgeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.cream,
    marginBottom: spacing.md,
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    ...shadows.lg,
  },
  planCardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.cream,
  },
  interval: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.normal,
    color: colors.creamDim,
  },
  planDescription: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  features: { marginTop: spacing.md, gap: spacing.xs },
  feature: { color: colors.cream, fontSize: fontSize.sm },
  note: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 20,
  },
})
