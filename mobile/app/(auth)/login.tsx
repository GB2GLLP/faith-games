import { useState, useRef, useEffect } from 'react'
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Animated } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/authStore'
import { loginSchema } from '../../lib/validators'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

export default function LoginScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { showToast } = useToast()
  const signIn = useAuthStore((s) => s.signIn)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleLogin = async () => {
    setErrors({})
    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)

    if (error) {
      showToast(error, 'error')
    } else {
      router.replace('/(app)')
    }
  }

  return (
    <View style={styles.outerContainer}>
      {/* Decorative background elements */}
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />
      <View style={styles.bgCross}>
        <View style={styles.crossVertical} />
        <View style={styles.crossHorizontal} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.xxl }]}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <View style={styles.crossIcon}>
                  <View style={styles.crossIconV} />
                  <View style={styles.crossIconH} />
                </View>
              </View>
              <Text style={styles.title}>Faith Games</Text>
              <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            <View style={styles.formCard}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                secureTextEntry
                showPasswordToggle
                autoComplete="password"
                error={errors.password}
                containerStyle={{ marginTop: spacing.md }}
              />

              <Button
                onPress={handleLogin}
                loading={loading}
                fullWidth
                style={{ marginTop: spacing.lg }}
              >
                Sign In
              </Button>

              <Link href="/forgot-password" asChild>
                <Pressable style={styles.forgotLink}>
                  <Text style={styles.link}>Forgot password?</Text>
                </Pressable>
              </Link>
            </View>

            <View style={styles.footer}>
              <View style={styles.signupRow}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Link href="/signup" asChild>
                  <Pressable>
                    <Text style={styles.link}>Sign up</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  bgCircleTop: {
    position: 'absolute',
    top: -80,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.gold,
    opacity: 0.08,
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.goldLight,
    opacity: 0.06,
  },
  bgCross: {
    position: 'absolute',
    top: '60%' as any,
    right: 40,
    opacity: 0.04,
  },
  crossVertical: {
    width: 12,
    height: 60,
    backgroundColor: colors.gold,
    borderRadius: 6,
    position: 'absolute',
    left: 24,
    top: 0,
  },
  crossHorizontal: {
    width: 60,
    height: 12,
    backgroundColor: colors.gold,
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    top: 16,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.colored(colors.gold),
  },
  crossIcon: {
    width: 32,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconV: {
    position: 'absolute',
    width: 7,
    height: 42,
    backgroundColor: '#ffffff',
    borderRadius: 3.5,
  },
  crossIconH: {
    position: 'absolute',
    width: 26,
    height: 7,
    backgroundColor: '#ffffff',
    borderRadius: 3.5,
    top: 9,
  },
  title: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.extrabold,
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.creamDim,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  forgotLink: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: colors.creamDim,
    fontSize: fontSize.sm,
  },
  link: {
    color: colors.gold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
})
