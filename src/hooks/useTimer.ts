'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseTimerOptions {
  initialTime: number
  onComplete?: () => void
  countDown?: boolean
}

export function useTimer({ initialTime, onComplete, countDown = true }: UseTimerOptions) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const frameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef<number>(0)

  const tick = useCallback(() => {
    const now = performance.now()
    const elapsed = Math.floor((now - startTimeRef.current) / 1000)

    if (elapsed !== elapsedRef.current) {
      elapsedRef.current = elapsed
      const newTime = countDown ? initialTime - elapsed : elapsed

      if (countDown && newTime <= 0) {
        setTime(0)
        setIsRunning(false)
        onComplete?.()
        return
      }

      setTime(newTime)
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [initialTime, countDown, onComplete])

  const start = useCallback(() => {
    startTimeRef.current = performance.now()
    elapsedRef.current = 0
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    pause()
    setTime(initialTime)
    elapsedRef.current = 0
  }, [initialTime, pause])

  useEffect(() => {
    if (isRunning) {
      frameRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isRunning, tick])

  return { time, isRunning, start, pause, reset }
}
