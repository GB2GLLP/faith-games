'use client'

import { motion } from 'framer-motion'
import { formatTime } from '@/lib/utils'

interface TimerProps {
  time: number
  maxTime: number
  size?: 'sm' | 'lg'
}

export function Timer({ time, maxTime, size = 'lg' }: TimerProps) {
  const progress = time / maxTime
  const isWarning = time <= 10
  const isCritical = time <= 5

  const sizeClasses = size === 'lg' ? 'w-32 h-32' : 'w-20 h-20'
  const textSize = size === 'lg' ? 'text-4xl' : 'text-xl'
  const radius = size === 'lg' ? 56 : 34
  const circumference = 2 * Math.PI * radius

  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={size === 'lg' ? '0 0 128 128' : '0 0 80 80'}>
        <circle
          cx={size === 'lg' ? 64 : 40}
          cy={size === 'lg' ? 64 : 40}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-cream/10"
        />
        <motion.circle
          cx={size === 'lg' ? 64 : 40}
          cy={size === 'lg' ? 64 : 40}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className={isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-gold'}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <motion.span
        className={`${textSize} font-bold tabular-nums ${
          isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-cream'
        }`}
        animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {formatTime(time)}
      </motion.span>
    </div>
  )
}
