import { useState, useRef, useEffect } from 'react'
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Animated } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/authStore'
import { signupSchema } from '../../lib/validators'
import { createClient } from '../../lib/supabase/client'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ChurchCodeInput } from '../../components/auth/ChurchCodeInput'
import { useToast } from '../../components/ui/Toast'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

export default function SignupScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { showToast } = useToast()
  const signUp = useAuthStore((s) => s.signUp)

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [churchCode, setChurchCode] = useState('')
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

  const handleSignup = async () => {
    setErrors({})
    const result = signupSchema.safeParse({ displayName, email, password, churchCode: churchCode || undefined })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)

    if (churchCode) {
      const supabase = createClient()
      const { data: church } = await supabase
        .from('churches')
        .select('id')
        .eq('code', churchCode)
        .single()

      if (!church) {
        setErrors({ churchCode: 'Invalid church code' })
        setLoading(false)
        return
      }
    }

    const { error } = await signUp(email, password, displayName)
    setLoading(false)

    if (error) {
      showToast(error, 'error')
    } else {
      showToast('Account created! Check your email to verify.', 'success')
      router.replace('/login')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.xl }]}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.header}>
            <Text style={styles.logo}>🎮</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join the fun!</Text>
          </View>

          <View style={styles.formCard}>
            <Input
              label="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              autoCapitalize="words"
              error={errors.displayName}
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              containerStyle={{ marginTop: spacing.md }}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              secureTextEntry
              error={errors.password}
              containerStyle={{ marginTop: spacing.md }}
            />

            <View style={{ marginTop: spacing.md }}>
              <ChurchCodeInput
                value={churchCode}
                onChangeText={setChurchCode}
                error={errors.churchCode}
              />
            </View>

            <Button
              onPress={handleSignup}
              loading={loading}
              fullWidth
              style={{ marginTop: spacing.lg }}
            >
              Create Account
            </Button>
          </View>

          <View style={styles.footer}>
            <View style={styles.loginRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.link}>Sign in</Text>
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
    fontSize: 48,
    marginBottom: spacing.sm,
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
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  loginRow: {
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
