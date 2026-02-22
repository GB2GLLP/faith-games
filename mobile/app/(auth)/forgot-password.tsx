import { useState, useRef, useEffect } from 'react'
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Animated } from 'react-native'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createClient } from '../../lib/supabase/client'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../../lib/theme'

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleReset = async () => {
    if (!email) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    setLoading(false)

    if (error) {
      showToast(error.message, 'error')
    } else {
      setSent(true)
      showToast('Check your email for reset link', 'success')
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
            <Text style={styles.logo}>🔑</Text>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              {sent
                ? 'Check your email for a password reset link.'
                : "Enter your email and we'll send you a reset link."}
            </Text>
          </View>

          {!sent ? (
            <View style={styles.formCard}>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Button
                onPress={handleReset}
                loading={loading}
                fullWidth
                style={{ marginTop: spacing.lg }}
              >
                Send Reset Link
              </Button>
            </View>
          ) : (
            <View style={styles.sentCard}>
              <Text style={styles.sentEmoji}>📧</Text>
              <Text style={styles.sentTitle}>Email Sent!</Text>
              <Text style={styles.sentText}>
                Check your inbox and follow the link to reset your password.
              </Text>
            </View>
          )}

          <View style={styles.footer}>
            <Link href="/login" asChild>
              <Pressable>
                <Text style={styles.link}>Back to Sign In</Text>
              </Pressable>
            </Link>
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
    lineHeight: 26,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  sentCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  sentEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  sentTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.green,
    marginBottom: spacing.sm,
  },
  sentText: {
    fontSize: fontSize.md,
    color: colors.creamDim,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  link: {
    color: colors.gold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
})
