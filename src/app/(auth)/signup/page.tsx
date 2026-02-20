'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ChurchCodeInput } from '@/components/auth/ChurchCodeInput'

export default function SignupPage() {
  const router = useRouter()
  const { signUp, signInWithOAuth, loading } = useAuthStore()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [churchCode, setChurchCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const result = await signUp(email, password, displayName)
    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-5xl">✉️</div>
        <h1 className="font-display text-2xl font-bold text-gold">Check Your Email</h1>
        <p className="text-cream/60">
          We sent a confirmation link to <strong className="text-cream">{email}</strong>.
          Click the link to activate your account.
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
        <h1 className="font-display text-3xl font-bold text-gold">Create Account</h1>
        <p className="mt-2 text-cream/60">Join the fun — it&apos;s free!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          required
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          required
        />

        <ChurchCodeInput value={churchCode} onChange={setChurchCode} />

        <Button type="submit" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-cream/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-navy text-cream/40">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => signInWithOAuth('google')}>
          Google
        </Button>
        <Button variant="secondary" onClick={() => signInWithOAuth('apple')}>
          Apple
        </Button>
      </div>

      <p className="text-center text-sm text-cream/40">
        Already have an account?{' '}
        <Link href="/login" className="text-gold hover:text-gold-light">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
