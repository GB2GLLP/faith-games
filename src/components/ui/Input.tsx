import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-cream/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 bg-navy border rounded-lg text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors ${
            error ? 'border-red-500' : 'border-cream/20'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {helperText && !error && <p className="text-sm text-cream/40">{helperText}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
