import { useState, useCallback, useEffect } from 'react'
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState(false)

  const request = useCallback(async () => {
    try {
      await activateKeepAwakeAsync('gameplay')
      setIsLocked(true)
    } catch {
      // Keep awake not available
    }
  }, [])

  const release = useCallback(() => {
    try {
      deactivateKeepAwake('gameplay')
      setIsLocked(false)
    } catch {
      // Already released
    }
  }, [])

  useEffect(() => {
    return () => {
      try {
        deactivateKeepAwake('gameplay')
      } catch {
        // Cleanup
      }
    }
  }, [])

  return { isLocked, request, release }
}
