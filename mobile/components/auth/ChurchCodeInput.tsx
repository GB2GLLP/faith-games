import { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from '../ui/Input'
import { createClient } from '../../lib/supabase/client'
import { colors, spacing, fontSize, fontWeight } from '../../lib/theme'

interface ChurchCodeInputProps {
  value: string
  onChangeText: (text: string) => void
  error?: string
}

export function ChurchCodeInput({ value, onChangeText, error }: ChurchCodeInputProps) {
  const [churchName, setChurchName] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (value.length !== 8) {
      setChurchName(null)
      return
    }

    setValidating(true)
    timeoutRef.current = setTimeout(async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('churches')
          .select('name')
          .eq('code', value.toUpperCase())
          .single()
        setChurchName((data as any)?.name || null)
      } catch {
        setChurchName(null)
      } finally {
        setValidating(false)
      }
    }, 500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [value])

  return (
    <View>
      <Input
        label="Church Code (Optional)"
        value={value}
        onChangeText={(text) => onChangeText(text.toUpperCase())}
        placeholder="ABCD1234"
        autoCapitalize="characters"
        maxLength={8}
        error={error}
      />
      {validating && (
        <Text style={styles.validating}>Validating code...</Text>
      )}
      {churchName && (
        <Text style={styles.found}>{churchName}</Text>
      )}
      {value.length === 8 && !validating && !churchName && (
        <Text style={styles.notFound}>Church not found</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  validating: {
    fontSize: fontSize.xs,
    color: colors.creamDim,
    marginTop: spacing.xs,
  },
  found: {
    fontSize: fontSize.xs,
    color: colors.green,
    fontWeight: fontWeight.medium,
    marginTop: spacing.xs,
  },
  notFound: {
    fontSize: fontSize.xs,
    color: colors.red,
    marginTop: spacing.xs,
  },
})
