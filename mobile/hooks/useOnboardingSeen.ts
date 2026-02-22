import { useState, useEffect, useCallback } from 'react'
import * as SecureStore from 'expo-secure-store'

const KEY = 'faith_games_onboarding_seen'

export function useOnboardingSeen() {
  const [seen, setSeen] = useState<boolean | null>(null)

  useEffect(() => {
    SecureStore.getItemAsync(KEY).then((value) => {
      setSeen(value === 'true')
    })
  }, [])

  const markSeen = useCallback(async () => {
    await SecureStore.setItemAsync(KEY, 'true')
    setSeen(true)
  }, [])

  return { seen, markSeen }
}
