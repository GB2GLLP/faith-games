'use client'

import { motion } from 'framer-motion'

interface ForeheadDisplayProps {
  text: string
  subtitle?: string
}

export function ForeheadDisplay({ text, subtitle }: ForeheadDisplayProps) {
  return (
    <div className="forehead-display fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center p-8">
      <motion.div
        key={text}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-gold leading-tight">
          {text}
        </h1>
        {subtitle && (
          <p className="mt-4 text-xl text-cream/60">{subtitle}</p>
        )}
      </motion.div>
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-cream/30 text-sm">
          Tilt forward = Correct &bull; Tilt back = Skip
        </p>
      </div>
    </div>
  )
}
