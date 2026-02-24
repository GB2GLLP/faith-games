'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/lib/constants'

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    ...(user ? [{ href: ROUTES.DASHBOARD, label: 'Dashboard' }] : []),
    { href: ROUTES.GAMES.CHARADES, label: 'Games', match: '/games' },
    { href: ROUTES.LEADERBOARD, label: 'Leaderboard' },
    { href: ROUTES.STATS, label: 'Stats' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div
        className={`mx-4 sm:mx-6 mt-3 rounded-2xl border border-cream/10 shadow-lg transition-all duration-300 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-xl shadow-xl'
            : 'bg-navy/70 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <div className="flex items-center justify-between h-14">
            <Link
              href={user ? ROUTES.DASHBOARD : ROUTES.HOME}
              className="font-display text-xl font-bold text-gold"
            >
              Faith Games
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.match
                  ? pathname.startsWith(link.match)
                  : pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive ? 'text-gold' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gold/10 rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href={ROUTES.PROFILE}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {user.display_name || user.email}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-cream/40 hover:text-cream/70 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={ROUTES.LOGIN}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/games"
                    className="px-4 py-1.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenuButton() {
  const { toggleMobileNav } = useAuthStore()
  return (
    <button
      onClick={toggleMobileNav}
      className="md:hidden p-2 text-cream/60 hover:text-cream"
      aria-label="Toggle menu"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}
