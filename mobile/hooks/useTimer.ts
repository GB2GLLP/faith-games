import { useState, useRef, useCallback, useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

interface UseTimerOptions {
  initialTime: number
  onComplete?: () => void
  countDown?: boolean
}

export function useTimer({ initialTime, onComplete, countDown = true }: UseTimerOptions) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)
  const pausedByAppRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    elapsedRef.current = 0
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback(() => {
    pause()
    setTime(initialTime)
    elapsedRef.current = 0
  }, [initialTime, pause])

  // Main timer loop
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)

        if (elapsed !== elapsedRef.current) {
          elapsedRef.current = elapsed
          const newTime = countDown ? initialTime - elapsed : elapsed

          if (countDown && newTime <= 0) {
            setTime(0)
            setIsRunning(false)
            clearTimer()
            onComplete?.()
            return
          }

          setTime(newTime)
        }
      }, 200)
    }
    return clearTimer
  }, [isRunning, initialTime, countDown, onComplete, clearTimer])

  // Pause on background, resume on foreground
  useEffect(() => {
    const handleAppState = (state: AppStateStatus) => {
      if (state === 'background' && isRunning) {
        pausedByAppRef.current = true
        pause()
      } else if (state === 'active' && pausedByAppRef.current) {
        pausedByAppRef.current = false
        start()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppState)
    return () => subscription.remove()
  }, [isRunning, pause, start])

  return { time, isRunning, start, pause, reset }
}
