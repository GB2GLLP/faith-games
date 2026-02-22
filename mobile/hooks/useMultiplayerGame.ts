import { useEffect, useRef } from 'react'
import { useRoom } from './useRoom'
import { useGameStore } from '../stores/gameStore'
import type { RoomEvent } from '../lib/types/multiplayer'

/**
 * Bridge between room events and game-specific stores.
 * Sets up game store players from room players when game starts.
 * Forwards events to the provided handler for game-specific logic.
 */
export function useMultiplayerGame(
  onGameEvent?: (event: RoomEvent) => void
) {
  const room = useRoom()
  const gameStore = useGameStore()
  const handlerRegistered = useRef(false)

  // When game starts, sync players from room to game store
  useEffect(() => {
    if (room.status === 'playing' && room.players.length > 0) {
      // Reset game store and set up players
      gameStore.reset()
      if (room.gameType) {
        gameStore.setGameType(room.gameType)
      }
      gameStore.setDifficulty(room.settings.difficulty)
      gameStore.setCategories(room.settings.categories)
      gameStore.setWinScore(room.settings.winScore)
      gameStore.setTimerDuration(room.settings.timerDuration)

      // Add players from room
      room.players.forEach((rp) => {
        gameStore.addPlayer(rp.displayName, rp.team)
        // Override the random ID with the actual userId
        const players = useGameStore.getState().players
        const last = players[players.length - 1]
        if (last) {
          useGameStore.setState({
            players: players.map((p) =>
              p.id === last.id ? { ...p, id: rp.userId } : p
            ),
          })
        }
      })
    }
  }, [room.status])

  // Register event handler once
  useEffect(() => {
    if (!handlerRegistered.current && onGameEvent) {
      room.onEvent(onGameEvent)
      handlerRegistered.current = true
    }
  }, [onGameEvent])

  return {
    room,
    gameStore,
    isHost: room.isHost,
    myUserId: room.myUserId,
    sendEvent: room.sendGameEvent,
  }
}
