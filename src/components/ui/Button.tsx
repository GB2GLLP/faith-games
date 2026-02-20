'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-navy hover:bg-gold-light font-semibold',
  secondary: 'bg-navy-light text-cream hover:bg-navy border border-cream/20',
  outline: 'border border-gold/40 text-gold hover:bg-gold/10',
  ghost: 'text-cream/70 hover:text-cream hover:bg-cream/5',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
