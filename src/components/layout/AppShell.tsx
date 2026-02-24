'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { ToastProvider } from '@/components/ui/Toast'
import { Navbar } from './Navbar'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <ToastProvider>
      <div className="min-h-screen bg-navy">
        <Navbar />
        <MobileNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
