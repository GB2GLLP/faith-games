import { useCallback, useRef } from 'react'
import { Audio } from 'expo-av'
import { useUIStore } from '../stores/uiStore'

const SOUNDS = {
  correct: require('../assets/sounds/correct.mp3'),
  wrong: require('../assets/sounds/wrong.mp3'),
  tick: require('../assets/sounds/tick.mp3'),
  buzzer: require('../assets/sounds/buzzer.mp3'),
  grab: require('../assets/sounds/grab.mp3'),
  win: require('../assets/sounds/win.mp3'),
  countdown: require('../assets/sounds/countdown.mp3'),
} as const

type SoundName = keyof typeof SOUNDS

export function useSound() {
  const soundRef = useRef<Record<string, Audio.Sound>>({})
  const isSoundEnabled = useUIStore((s) => s.isSoundEnabled)

  const play = useCallback(
    async (name: SoundName) => {
      if (!isSoundEnabled) return
      try {
        // Reuse cached sound if available
        if (soundRef.current[name]) {
          await soundRef.current[name].replayAsync()
          return
        }

        const { sound } = await Audio.Sound.createAsync(SOUNDS[name])
        soundRef.current[name] = sound
        await sound.playAsync()
      } catch {
        // Audio not available
      }
    },
    [isSoundEnabled]
  )

  return { play }
}
