import { useEffect, useCallback, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useRoomStore } from '../stores/roomStore'
import type { GameType } from '../lib/types/database'
import type { RoomEvent, RoomSettings } from '../lib/types/multiplayer'

/**
 * Hook that wraps roomStore and manages channel lifecycle + AppState reconnection
 */
export function useRoom() {
  const store = useRoomStore()
  const appStateRef = useRef(AppState.currentState)

  // Handle app state changes for reconnection
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === 'active' &&
        store.roomCode &&
        !store.isConnected
      ) {
        // App came back to foreground - channel should auto-reconnect
        // Supabase Realtime handles this internally
      }
      appStateRef.current = nextState
    })

    return () => subscription.remove()
  }, [store.roomCode, store.isConnected])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't auto-leave on unmount - let explicit leaveRoom handle it
    }
  }, [])

  const createRoom = useCallback(
    async (gameType: GameType, userId: string, displayName: string) => {
      return store.createRoom(gameType, userId, displayName)
    },
    [store.createRoom]
  )

  const joinRoom = useCallback(
    async (roomCode: string, userId: string, displayName: string) => {
      return store.joinRoom(roomCode, userId, displayName)
    },
    [store.joinRoom]
  )

  const leaveRoom = useCallback(async () => {
    await store.leaveRoom()
  }, [store.leaveRoom])

  const updateSettings = useCallback(
    async (settings: Partial<RoomSettings>) => {
      await store.updateSettings(settings)
    },
    [store.updateSettings]
  )

  const startGame = useCallback(async () => {
    await store.startGame()
  }, [store.startGame])

  const sendGameEvent = useCallback(
    async (event: RoomEvent) => {
      await store.sendGameEvent(event)
    },
    [store.sendGameEvent]
  )

  const onEvent = useCallback(
    (handler: (event: RoomEvent) => void) => {
      store.onEvent(handler)
    },
    [store.onEvent]
  )

  return {
    // State
    roomId: store.roomId,
    roomCode: store.roomCode,
    hostUserId: store.hostUserId,
    gameType: store.gameType,
    status: store.status,
    players: store.players,
    settings: store.settings,
    isConnected: store.isConnected,
    myUserId: store.myUserId,

    // Computed
    isHost: store.isHost(),
    myPlayer: store.myPlayer(),
    playerCount: store.playerCount(),

    // Actions
    createRoom,
    joinRoom,
    leaveRoom,
    updateSettings,
    updatePlayerTeam: store.updatePlayerTeam,
    startGame,
    sendGameEvent,
    onEvent,
    reset: store.reset,
  }
}
