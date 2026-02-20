interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-navy-light border border-cream/10 p-6 ${
        hover ? 'hover:border-gold/30 transition-colors cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`font-display text-xl font-bold text-cream ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-cream/60 ${className}`}>{children}</p>
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-4 flex items-center gap-3 ${className}`}>{children}</div>
}
