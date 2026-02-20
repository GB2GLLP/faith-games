'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

export function ProgressBar({ value, max = 100, label, showValue = false, className = '' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`space-y-1 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-cream/60">{label}</span>}
          {showValue && <span className="text-cream/80 font-medium">{value}/{max}</span>}
        </div>
      )}
      <div className="h-2 bg-navy rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
