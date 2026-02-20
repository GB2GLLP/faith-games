'use client'

import { useRef, useCallback } from 'react'

interface SwipeHandlerProps {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  children: React.ReactNode
  className?: string
}

export function SwipeHandler({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  children,
  className = '',
}: SwipeHandlerProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return

      const deltaX = e.changedTouches[0].clientX - touchStart.current.x
      const deltaY = e.changedTouches[0].clientY - touchStart.current.y

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) onSwipeRight?.()
        else if (deltaX < -threshold) onSwipeLeft?.()
      } else {
        if (deltaY > threshold) onSwipeDown?.()
        else if (deltaY < -threshold) onSwipeUp?.()
      }

      touchStart.current = null
    },
    [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold]
  )

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
