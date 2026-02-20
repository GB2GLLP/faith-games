'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: '🏠' },
  { href: ROUTES.GAMES.CHARADES, label: 'Games', icon: '🎮', match: '/games' },
  { href: ROUTES.LEADERBOARD, label: 'Leaderboard', icon: '🏆' },
  { href: ROUTES.STATS, label: 'Stats', icon: '📊' },
  { href: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
  { href: ROUTES.SUBSCRIPTION, label: 'Subscription', icon: '⭐' },
]

export function MobileNav() {
  const pathname = usePathname()
  const { user, mobileNavOpen, toggleMobileNav, signOut } = useAuthStore()

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileNav}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-navy-light border-l border-cream/10 z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg font-bold text-gold">Menu</span>
                <button
                  onClick={toggleMobileNav}
                  className="p-1 text-cream/60 hover:text-cream"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = link.match
                    ? pathname.startsWith(link.match)
                    : pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={toggleMobileNav}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gold/10 text-gold'
                          : 'text-cream/60 hover:text-cream hover:bg-cream/5'
                      }`}
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {user && (
                <div className="mt-8 pt-6 border-t border-cream/10">
                  <p className="text-sm text-cream/40 mb-3">{user.email}</p>
                  <button
                    onClick={() => {
                      signOut()
                      toggleMobileNav()
                    }}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
