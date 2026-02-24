'use client'

import { useState, useCallback, useRef } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function useAuthGate() {
  const { user } = useAuthStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pendingCallback = useRef<(() => void) | null>(null)

  const requireAuth = useCallback(
    (callback: () => void) => {
      if (user) {
        callback()
      } else {
        pendingCallback.current = callback
        setShowAuthModal(true)
      }
    },
    [user]
  )

  const onAuthSuccess = useCallback(() => {
    setShowAuthModal(false)
    if (pendingCallback.current) {
      pendingCallback.current()
      pendingCallback.current = null
    }
  }, [])

  return { showAuthModal, setShowAuthModal, requireAuth, onAuthSuccess }
}
