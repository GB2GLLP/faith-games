'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ChurchCodeInput } from '@/components/auth/ChurchCodeInput'
import { useAuthStore } from '@/stores/authStore'

type Step = 'signup' | 'signin' | 'onboarding'

interface AuthGateModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthGateModal({ open, onClose, onSuccess }: AuthGateModalProps) {
  const { signUp, signIn, signInWithOAuth } = useAuthStore()
  const [step, setStep] = useState<Step>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [churchCode, setChurchCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setError('')
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await signUp(email, password, name)
    if (err) {
      setError(err)
      setLoading(false)
    } else {
      // Auto sign in after signup
      const { error: signInErr } = await signIn(email, password)
      setLoading(false)
      if (signInErr) {
        setError(signInErr)
      } else {
        setStep('onboarding')
      }
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError(err)
    } else {
      onSuccess()
    }
  }

  const handleOAuth = (provider: 'google' | 'apple') => {
    signInWithOAuth(provider)
  }

  const handleOnboardingContinue = () => {
    onSuccess()
  }

  return (
    <Modal open={open} onClose={onClose}>
      {step === 'signup' && (
        <div className="space-y-5">
          <div className="text-center">
            <Image src="/logo.png" alt="Faith Games" width={56} height={56} className="mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-gold">Create Your Account</h2>
            <p className="text-cream/50 text-sm mt-1">Sign up to start playing</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-3">
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Min 6 characters"
              minLength={6}
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign Up
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-navy-light px-2 text-cream/30">or continue with</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleOAuth('google')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cream/5 hover:bg-cream/10 border border-cream/10 rounded-lg text-cream text-sm transition-colors"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cream/5 hover:bg-cream/10 border border-cream/10 rounded-lg text-cream text-sm transition-colors"
            >
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-cream/40">
            Already have an account?{' '}
            <button
              onClick={() => { resetForm(); setStep('signin') }}
              className="text-gold hover:text-gold-light"
            >
              Sign In
            </button>
          </p>
        </div>
      )}

      {step === 'signin' && (
        <div className="space-y-5">
          <div className="text-center">
            <Image src="/logo.png" alt="Faith Games" width={56} height={56} className="mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-gold">Welcome Back</h2>
            <p className="text-cream/50 text-sm mt-1">Sign in to continue</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-3">
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
              placeholder="Your password"
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-cream/40">
            Need an account?{' '}
            <button
              onClick={() => { resetForm(); setStep('signup') }}
              className="text-gold hover:text-gold-light"
            >
              Sign Up
            </button>
          </p>
        </div>
      )}

      {step === 'onboarding' && (
        <div className="space-y-5">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="font-display text-xl font-bold text-gold">Welcome to Faith Games!</h2>
            <p className="text-cream/50 text-sm mt-1">You&apos;re all set. One optional step:</p>
          </div>

          <ChurchCodeInput value={churchCode} onChange={setChurchCode} />

          <Button onClick={handleOnboardingContinue} className="w-full" size="lg">
            Continue to Game
          </Button>

          <p className="text-center text-xs text-cream/30">
            You can always add a church code later in your profile.
          </p>
        </div>
      )}
    </Modal>
  )
}
