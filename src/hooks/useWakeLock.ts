'use client'

import { useState, useEffect, useCallback } from 'react'

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState(false)
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

  const request = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        const lock = await navigator.wakeLock.request('screen')
        setWakeLock(lock)
        setIsLocked(true)
        lock.addEventListener('release', () => {
          setIsLocked(false)
          setWakeLock(null)
        })
      }
    } catch {
      // Wake Lock API not supported or denied
    }
  }, [])

  const release = useCallback(async () => {
    if (wakeLock) {
      await wakeLock.release()
      setWakeLock(null)
      setIsLocked(false)
    }
  }, [wakeLock])

  useEffect(() => {
    return () => {
      wakeLock?.release()
    }
  }, [wakeLock])

  return { isLocked, request, release }
}
