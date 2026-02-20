'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const { signIn, signInWithOAuth, loading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await signIn(email, password)
    if (result.error) {
      setError(result.error)
    } else {
      router.push(redirect)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-gold">Welcome Back</h1>
        <p className="mt-2 text-cream/60">Sign in to continue playing</p>
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

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-gold/70 hover:text-gold">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Sign In
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
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-gold hover:text-gold-light">
          Sign up
        </Link>
      </p>
    </motion.div>
  )
}
