'use client'

import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/Spinner'
import type { UserRole } from '@/lib/types/database'

interface RoleGuardProps {
  role?: UserRole
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGuard({ role, children, fallback }: RoleGuardProps) {
  const { user, loading } = useAuth(role)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return fallback ? <>{fallback}</> : null
  }

  if (role && user.role !== role && user.role !== 'super_admin') {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
