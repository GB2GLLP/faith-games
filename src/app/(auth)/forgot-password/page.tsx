'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-5xl">📧</div>
        <h1 className="font-display text-2xl font-bold text-gold">Check Your Email</h1>
        <p className="text-cream/60">
          If an account exists for <strong className="text-cream">{email}</strong>,
          you&apos;ll receive a password reset link.
        </p>
        <Link href="/login" className="text-gold hover:text-gold-light text-sm">
          Back to login
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-gold">Reset Password</h1>
        <p className="mt-2 text-cream/60">Enter your email and we&apos;ll send a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <Button type="submit" className="w-full" loading={loading}>
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-sm text-cream/40">
        Remember your password?{' '}
        <Link href="/login" className="text-gold hover:text-gold-light">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
