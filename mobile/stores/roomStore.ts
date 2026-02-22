import { create } from 'zustand'
import { RealtimeChannel } from '@supabase/supabase-js'
import { createClient } from '../lib/supabase/client'
import {
  createRoomChannel,
  sendEvent,
  onRoomEvent,
  subscribeChannel,
  removeChannel,
  generateRoomCode,
} from '../lib/supabase/realtime'
import type { GameType } from '../lib/types/database'
import type {
  RoomPlayer,
  RoomSettings,
  RoomStatus,
  RoomEvent,
} from '../lib/types/multiplayer'
import { DEFAULT_ROOM_SETTINGS } from '../lib/types/multiplayer'

interface RoomState {
  // Room data
  roomId: string | null
  roomCode: string | null
  hostUserId: string | null
  gameType: GameType | null
  status: RoomStatus
  players: RoomPlayer[]
  settings: RoomSettings

  // Connection
  channel: RealtimeChannel | null
  isConnected: boolean
  myUserId: string | null

  // Computed helpers
  isHost: () => boolean
  myPlayer: () => RoomPlayer | null
  playerCount: () => number

  // Actions
  createRoom: (gameType: GameType, userId: string, displayName: string) => Promise<string>
  joinRoom: (roomCode: string, userId: string, displayName: string) => Promise<boolean>
  leaveRoom: () => Promise<void>
  updateSettings: (settings: Partial<RoomSettings>) => Promise<void>
  updatePlayerTeam: (userId: string, team: 'A' | 'B') => void
  startGame: () => Promise<void>
  sendGameEvent: (event: RoomEvent) => Promise<void>
  onEvent: (handler: (event: RoomEvent) => void) => void

  // Internal
  _eventHandlers: Array<(event: RoomEvent) => void>
  _handleEvent: (event: RoomEvent) => void
  reset: () => void
}

const initialState = {
  roomId: null as string | null,
  roomCode: null as string | null,
  hostUserId: null as string | null,
  gameType: null as GameType | null,
  status: 'lobby' as RoomStatus,
  players: [] as RoomPlayer[],
  settings: { ...DEFAULT_ROOM_SETTINGS },
  channel: null as RealtimeChannel | null,
  isConnected: false,
  myUserId: null as string | null,
  _eventHandlers: [] as Array<(event: RoomEvent) => void>,
}

export const useRoomStore = create<RoomState>((set, get) => ({
  ...initialState,

  isHost: () => {
    const { myUserId, hostUserId } = get()
    return myUserId !== null && myUserId === hostUserId
  },

  myPlayer: () => {
    const { players, myUserId } = get()
    return players.find((p) => p.userId === myUserId) || null
  },

  playerCount: () => get().players.length,

  createRoom: async (gameType, userId, displayName) => {
    const supabase = createClient()
    const roomCode = generateRoomCode()

    const hostPlayer: RoomPlayer = {
      userId,
      displayName,
      avatarUrl: null,
      isHost: true,
      isConnected: true,
      joinedAt: Date.now(),
    }

    // Insert room into DB
    const { data, error } = await supabase
      .from('game_rooms' as any)
      .insert({
        room_code: roomCode,
        host_user_id: userId,
        game_type: gameType,
        status: 'lobby',
        settings: DEFAULT_ROOM_SETTINGS,
        players: [hostPlayer],
      } as any)
      .select()
      .single()

    if (error) throw new Error(`Failed to create room: ${error.message}`)

    // Setup realtime channel
    const channel = createRoomChannel(roomCode)
    onRoomEvent(channel, (event) => get()._handleEvent(event))
    subscribeChannel(channel, (status) => {
      set({ isConnected: status === 'SUBSCRIBED' })
    })

    set({
      roomId: (data as any).id,
      roomCode,
      hostUserId: userId,
      gameType,
      status: 'lobby',
      players: [hostPlayer],
      settings: { ...DEFAULT_ROOM_SETTINGS },
      channel,
      myUserId: userId,
    })

    return roomCode
  },

  joinRoom: async (roomCode, userId, displayName) => {
    const supabase = createClient()
    const code = roomCode.toUpperCase().trim()

    // Look up room
    const { data: room, error } = await supabase
      .from('game_rooms' as any)
      .select('*')
      .eq('room_code', code)
      .eq('status', 'lobby')
      .single()

    if (error || !room) return false

    const typedRoom = room as any
    const newPlayer: RoomPlayer = {
      userId,
      displayName,
      avatarUrl: null,
      isHost: false,
      isConnected: true,
      joinedAt: Date.now(),
    }

    // Setup realtime channel
    const channel = createRoomChannel(code)
    onRoomEvent(channel, (event) => get()._handleEvent(event))
    subscribeChannel(channel, (status) => {
      if (status === 'SUBSCRIBED') {
        set({ isConnected: true })
        // Announce join
        sendEvent(channel, { type: 'player:join', player: newPlayer })
      }
    })

    set({
      roomId: typedRoom.id,
      roomCode: code,
      hostUserId: typedRoom.host_user_id,
      gameType: typedRoom.game_type,
      status: typedRoom.status,
      players: typedRoom.players as RoomPlayer[],
      settings: typedRoom.settings as RoomSettings,
      channel,
      myUserId: userId,
    })

    return true
  },

  leaveRoom: async () => {
    const { channel, myUserId, roomId, roomCode } = get()

    if (channel && myUserId) {
      await sendEvent(channel, { type: 'player:leave', userId: myUserId })
      await removeChannel(channel)
    }

    // If host, update room status
    if (get().isHost() && roomId) {
      const supabase = createClient()
      await (supabase.from('game_rooms' as any) as any)
        .update({ status: 'expired' })
        .eq('id', roomId)
    }

    set({ ...initialState, _eventHandlers: [] })
  },

  updateSettings: async (partial) => {
    const { settings, channel, isHost: checkHost } = get()
    if (!checkHost()) return

    const updated = { ...settings, ...partial }
    set({ settings: updated })

    if (channel) {
      await sendEvent(channel, { type: 'settings:update', settings: updated })
    }

    // Persist to DB
    const supabase = createClient()
    const { roomId } = get()
    if (roomId) {
      await (supabase.from('game_rooms' as any) as any)
        .update({ settings: updated })
        .eq('id', roomId)
    }
  },

  updatePlayerTeam: (userId, team) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.userId === userId ? { ...p, team } : p
      ),
    }))
  },

  startGame: async () => {
    const { channel, players, settings, gameType, roomId } = get()
    if (!channel || !gameType) return

    set({ status: 'playing' })

    // Update DB
    const supabase = createClient()
    if (roomId) {
      await (supabase.from('game_rooms' as any) as any)
        .update({ status: 'playing', players })
        .eq('id', roomId)
    }

    // Broadcast game start
    await sendEvent(channel, {
      type: 'game:start',
      gameType,
      settings,
      players,
    })
  },

  sendGameEvent: async (event) => {
    const { channel } = get()
    if (channel) {
      await sendEvent(channel, event)
    }
  },

  onEvent: (handler) => {
    set((state) => ({
      _eventHandlers: [...state._eventHandlers, handler],
    }))
  },

  _handleEvent: (event) => {
    const state = get()

    // Handle built-in events
    switch (event.type) {
      case 'player:join': {
        const exists = state.players.find((p) => p.userId === event.player.userId)
        if (!exists) {
          const updated = [...state.players, event.player]
          set({ players: updated })
          // Host persists to DB and broadcasts sync
          if (state.isHost()) {
            const supabase = createClient()
            if (state.roomId) {
              ;(supabase.from('game_rooms' as any) as any)
                .update({ players: updated })
                .eq('id', state.roomId)
                .then(() => {})
            }
            if (state.channel) {
              sendEvent(state.channel, {
                type: 'player:accepted',
                players: updated,
              })
            }
          }
        }
        break
      }
      case 'player:accepted':
        set({ players: event.players })
        break
      case 'player:leave': {
        const filtered = state.players.filter((p) => p.userId !== event.userId)
        set({ players: filtered })
        break
      }
      case 'room:sync':
        set({
          players: event.players,
          settings: event.settings,
          status: event.status,
        })
        break
      case 'settings:update':
        set({ settings: event.settings })
        break
      case 'game:start':
        set({ status: 'playing' })
        break
      case 'game:over':
        set({ status: 'finished' })
        break
    }

    // Forward to external handlers
    state._eventHandlers.forEach((h) => h(event))
  },

  reset: () => {
    const { channel } = get()
    if (channel) {
      removeChannel(channel)
    }
    set({ ...initialState, _eventHandlers: [] })
  },
}))
