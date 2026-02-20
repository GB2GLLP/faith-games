'use client'

import { useMemo } from 'react'
import { useAuthStore } from '@/stores/authStore'
import type { SubscriptionTier } from '@/lib/types/database'

export function useSubscription() {
  const user = useAuthStore((s) => s.user)

  const tier: SubscriptionTier = user?.subscription_tier || 'free'

  const permissions = useMemo(() => ({
    canAccessPremiumContent: tier !== 'free',
    canCreateChurch: tier === 'church',
    canViewAnalytics: tier !== 'free',
    maxPlayersPerGame: tier === 'free' ? 4 : 12,
    tier,
  }), [tier])

  return permissions
}
