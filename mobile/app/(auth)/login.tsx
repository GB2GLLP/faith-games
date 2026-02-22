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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.xxl }]}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.header}>
            <Text style={styles.logo}>✝️</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  scroll: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 56,
    marginBottom: spacing.md,
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
