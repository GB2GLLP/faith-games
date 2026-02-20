'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface GrabButtonProps {
  onGrab: () => boolean
  label?: string
  disabled?: boolean
}

export function GrabButton({ onGrab, label = 'GRAB!', disabled }: GrabButtonProps) {
  const [grabbed, setGrabbed] = useState(false)

  const handleGrab = useCallback(() => {
    if (grabbed || disabled) return
    const success = onGrab()
    if (success) {
      setGrabbed(true)
      setTimeout(() => setGrabbed(false), 2000)
    }
  }, [onGrab, grabbed, disabled])

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onPointerDown={handleGrab}
      disabled={disabled || grabbed}
      className={`w-full py-6 rounded-2xl text-2xl font-bold transition-colors ${
        grabbed
          ? 'bg-green-600 text-white'
          : disabled
          ? 'bg-cream/10 text-cream/30'
          : 'bg-gold text-navy hover:bg-gold-light active:bg-gold-dark'
      }`}
    >
      {grabbed ? 'GRABBED!' : label}
    </motion.button>
  )
}
