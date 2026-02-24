import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../../lib/theme'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  showPasswordToggle?: boolean
}

export function Input({ label, error, containerStyle, style, showPasswordToggle, secureTextEntry, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const isPassword = showPasswordToggle || secureTextEntry
  const hideText = isPassword && !passwordVisible

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
      ]}>
        <TextInput
          style={[styles.input, isPassword && styles.inputWithToggle, style]}
          placeholderTextColor={colors.creamDim}
          secureTextEntry={hideText}
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
        {isPassword && (
          <Pressable
            style={styles.toggleButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
            hitSlop={8}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.creamDim}
            />
          </Pressable>
        )}
      </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  inputWrapperFocused: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
  },
  inputWrapperError: {
    borderColor: colors.red,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.cream,
  },
  inputWithToggle: {
    paddingRight: spacing.xs,
  },
  toggleButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  error: {
    fontSize: fontSize.xs,
    color: colors.red,
    marginTop: spacing.xs,
  },
})
