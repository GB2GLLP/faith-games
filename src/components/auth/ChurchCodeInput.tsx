'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'

interface ChurchCodeInputProps {
  value: string
  onChange: (value: string) => void
}

export function ChurchCodeInput({ value, onChange }: ChurchCodeInputProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    churchName?: string
  } | null>(null)

  useEffect(() => {
    if (value.length < 8) {
      setValidationResult(null)
      return
    }

    const timeout = setTimeout(async () => {
      setIsValidating(true)
      try {
        const res = await fetch(`/api/churches/validate?code=${value}`)
        const data = await res.json()
        setValidationResult(data)
      } catch {
        setValidationResult(null)
      } finally {
        setIsValidating(false)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div>
      <Input
        label="Church Code (optional)"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase().slice(0, 8))}
        placeholder="e.g. ABCD1234"
        helperText="Have a church code? Enter it to join your church group."
      />
      {isValidating && (
        <p className="mt-1 text-sm text-cream/40">Checking code...</p>
      )}
      {validationResult?.valid && (
        <p className="mt-1 text-sm text-green-400">
          ✓ {validationResult.churchName}
        </p>
      )}
      {validationResult && !validationResult.valid && (
        <p className="mt-1 text-sm text-red-400">Invalid church code</p>
      )}
    </div>
  )
}
