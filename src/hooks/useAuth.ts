'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/lib/types/database'

export function useAuth(requiredRole?: UserRole) {
  const router = useRouter()
  const { user, loading, initialized } = useAuthStore()

  useEffect(() => {
    if (!initialized || loading) return

    if (!user) {
      router.push('/login')
      return
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'super_admin') {
      router.push('/dashboard')
    }
  }, [user, loading, initialized, requiredRole, router])

  return { user, loading: loading || !initialized, isAuthenticated: !!user }
}
