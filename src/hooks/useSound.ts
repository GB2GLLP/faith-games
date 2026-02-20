'use client'

import { useCallback, useRef } from 'react'
import { useUIStore } from '@/stores/uiStore'

const SOUNDS = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  tick: '/sounds/tick.mp3',
  buzzer: '/sounds/buzzer.mp3',
  grab: '/sounds/grab.mp3',
  win: '/sounds/win.mp3',
  countdown: '/sounds/countdown.mp3',
} as const

type SoundName = keyof typeof SOUNDS

export function useSound() {
  const audioRef = useRef<Record<string, HTMLAudioElement>>({})
  const isSoundEnabled = useUIStore((s) => s.isSoundEnabled)

  const play = useCallback(
    (name: SoundName) => {
      if (!isSoundEnabled) return
      try {
        if (!audioRef.current[name]) {
          audioRef.current[name] = new Audio(SOUNDS[name])
        }
        const audio = audioRef.current[name]
        audio.currentTime = 0
        audio.play().catch(() => {})
      } catch {
        // Audio not available
      }
    },
    [isSoundEnabled]
  )

  return { play }
}
