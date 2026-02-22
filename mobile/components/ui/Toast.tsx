import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../../lib/theme'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

function ToastView({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const translateY = useRef(new Animated.Value(-40)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -40, duration: 200, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => onRemove(toast.id))
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Animated.View style={[styles.toast, getTypeStyle(toast.type), { transform: [{ translateY }], opacity }]}>
      <Text style={styles.text}>{toast.message}</Text>
    </Animated.View>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)
  const insets = useSafeAreaInsets()

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View style={[styles.container, { top: insets.top + spacing.sm }]}>
        {toasts.map((toast) => (
          <ToastView key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </View>
    </ToastContext.Provider>
  )
}

function getTypeStyle(type: ToastType) {
  switch (type) {
    case 'success':
      return { borderLeftColor: colors.green, borderColor: colors.green + '20' }
    case 'error':
      return { borderLeftColor: colors.red, borderColor: colors.red + '20' }
    default:
      return { borderLeftColor: colors.gold, borderColor: colors.gold + '20' }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    gap: spacing.sm,
  },
  toast: {
    backgroundColor: colors.navyLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    color: colors.cream,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
})
