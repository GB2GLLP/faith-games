import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native'
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../../lib/theme'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
}

export function Input({ label, error, containerStyle, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.creamDim}
        onFocus={(e) => {
          setIsFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          props.onBlur?.(e)
        }}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.cream,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.cream,
  },
  inputFocused: {
    borderColor: colors.gold,
    borderWidth: 1.5,
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
  },
  inputError: {
    borderColor: colors.red,
  },
  error: {
    fontSize: fontSize.xs,
    color: colors.red,
    marginTop: spacing.xs,
  },
})
