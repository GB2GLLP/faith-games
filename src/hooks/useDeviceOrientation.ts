'use client'

import { useState, useEffect, useCallback } from 'react'

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
  threshold = 30,
  enabled = true,
}: UseDeviceOrientationOptions = {}) {
  const [tilt, setTilt] = useState<TiltDirection>('neutral')
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  const requestPermission = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        setHasPermission(permission === 'granted')
        return permission === 'granted'
      } catch {
        setHasPermission(false)
        return false
      }
    }
    setHasPermission(true)
    return true
  }, [])

  useEffect(() => {
    setIsSupported('DeviceOrientationEvent' in window)
  }, [])

  useEffect(() => {
    if (!enabled || !hasPermission) return

    let lastAction = 0
    const cooldown = 1000

    const handler = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0
      const now = Date.now()

      if (beta > threshold && tilt !== 'down') {
        setTilt('down')
        if (now - lastAction > cooldown) {
          lastAction = now
          onTiltDown?.()
        }
      } else if (beta < -threshold && tilt !== 'up') {
        setTilt('up')
        if (now - lastAction > cooldown) {
          lastAction = now
          onTiltUp?.()
        }
      } else if (Math.abs(beta) < threshold * 0.5) {
        setTilt('neutral')
      }
    }

    window.addEventListener('deviceorientation', handler)
    return () => window.removeEventListener('deviceorientation', handler)
  }, [enabled, hasPermission, threshold, tilt, onTiltUp, onTiltDown])

  return { tilt, isSupported, hasPermission, requestPermission }
}
