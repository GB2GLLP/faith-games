type BadgeVariant = 'default' | 'gold' | 'success' | 'warning' | 'danger'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-cream/10 text-cream/70',
  gold: 'bg-gold/20 text-gold',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  danger: 'bg-red-500/20 text-red-400',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
