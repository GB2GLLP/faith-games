import { useState, useEffect, useCallback, useRef } from 'react'
import { Accelerometer } from 'expo-sensors'

type TiltDirection = 'up' | 'down' | 'neutral'

interface UseDeviceOrientationOptions {
  onTiltUp?: () => void
  onTiltDown?: () => void
  threshold?: number
  enabled?: boolean
}

export function useDeviceOrientation({
  onTiltUp,
  onTiltDown,
  threshold = 0.5,
  enabled = true,
}: UseDeviceOrientationOptions = {}) {
  const [tilt, setTilt] = useState<TiltDirection>('neutral')
  const [isSupported, setIsSupported] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const lastActionRef = useRef(0)
  const cooldown = 1200

  const onTiltUpRef = useRef(onTiltUp)
  const onTiltDownRef = useRef(onTiltDown)
  onTiltUpRef.current = onTiltUp
  onTiltDownRef.current = onTiltDown

  useEffect(() => {
    if (!enabled) return

    Accelerometer.isAvailableAsync().then(setIsSupported)
  }, [enabled])

  const requestPermission = useCallback(async () => {
    try {
      const { granted } = await Accelerometer.requestPermissionsAsync()
      setHasPermission(granted)
      return granted
    } catch {
      // Permissions not required on this platform
      setHasPermission(true)
      return true
    }
  }, [])

  // Auto-request permission when enabled
  useEffect(() => {
    if (enabled && isSupported && !hasPermission) {
      requestPermission()
    }
  }, [enabled, isSupported, hasPermission, requestPermission])

  useEffect(() => {
    if (!enabled || !isSupported || !hasPermission) return

    Accelerometer.setUpdateInterval(100)

    const subscription = Accelerometer.addListener(({ z }) => {
      const now = Date.now()

      // Phone on forehead reference frame:
      // z-axis: ~0 when on forehead (screen facing out)
      // Tilt phone down (nod down): z goes negative
      // Tilt phone up (lean back): z goes positive
      //
      // Thresholds tuned for forehead position:
      // z < -threshold → phone tilted down → CORRECT
      // z > 1 + threshold → phone tilted up/back → SKIP
      if (z < -threshold) {
        setTilt('down')
        if (now - lastActionRef.current > cooldown) {
          lastActionRef.current = now
          onTiltDownRef.current?.()
        }
      } else if (z > 1 + threshold) {
        setTilt('up')
        if (now - lastActionRef.current > cooldown) {
          lastActionRef.current = now
          onTiltUpRef.current?.()
        }
      } else if (z > 0.2 && z < 1.4) {
        setTilt('neutral')
      }
    })

    return () => subscription.remove()
  }, [enabled, isSupported, hasPermission, threshold])

  return { tilt, isSupported, hasPermission, requestPermission }
}
