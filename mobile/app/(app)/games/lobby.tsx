import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, spacing } from '../../../lib/theme'
import { useRoom } from '../../../hooks/useRoom'
import { RoomLobby } from '../../../components/game/RoomLobby'
import { GAME_CONFIG } from '../../../lib/constants'
import type { GameType } from '../../../lib/types/database'

const MIN_PLAYERS: Record<GameType, number> = {
  charades: GAME_CONFIG.CHARADES.MIN_PLAYERS,
  who_am_i: GAME_CONFIG.WHO_AM_I.MIN_PLAYERS,
  guess_verse: GAME_CONFIG.GUESS_VERSE.MIN_PLAYERS,
  trivia: GAME_CONFIG.TRIVIA.MIN_PLAYERS,
}

const TEAM_GAMES: GameType[] = ['who_am_i']

export default function LobbyScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const room = useRoom()

  // Navigate to game when game starts
  useEffect(() => {
    if (room.status === 'playing' && room.gameType) {
      const routes: Record<GameType, string> = {
        charades: '/(app)/games/charades',
        who_am_i: '/(app)/games/who-am-i',
        guess_verse: '/(app)/games/guess-verse',
        trivia: '/(app)/games/trivia',
      }
      router.replace(routes[room.gameType] as any)
    }
  }, [room.status])

  // If no room, go back
  useEffect(() => {
    if (!room.roomCode) {
      router.back()
    }
  }, [room.roomCode])

  if (!room.roomCode || !room.gameType) return null

  const showTeams = TEAM_GAMES.includes(room.gameType)

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <RoomLobby
        roomCode={room.roomCode}
        players={room.players}
        settings={room.settings}
        gameType={room.gameType}
        isHost={room.isHost}
        isConnected={room.isConnected}
        minPlayers={MIN_PLAYERS[room.gameType]}
        showTeams={showTeams}
        onUpdateSettings={room.updateSettings}
        onAssignTeam={room.updatePlayerTeam}
        onStartGame={room.startGame}
        onLeave={async () => {
          await room.leaveRoom()
          router.back()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
})
