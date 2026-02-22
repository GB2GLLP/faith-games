import { RealtimeChannel } from '@supabase/supabase-js'
import { createClient } from './client'
import type { RoomEvent } from '../types/multiplayer'

const BROADCAST_EVENT = 'room_event'

/**
 * Create a Realtime channel for a game room
 */
export function createRoomChannel(roomCode: string): RealtimeChannel {
  const supabase = createClient()
  return supabase.channel(`room:${roomCode}`, {
    config: {
      broadcast: { self: true },
    },
  })
}

/**
 * Send an event to the room channel
 */
export async function sendEvent(channel: RealtimeChannel, event: RoomEvent) {
  return channel.send({
    type: 'broadcast',
    event: BROADCAST_EVENT,
    payload: event,
  })
}

/**
 * Subscribe to room events with a typed handler
 */
export function onRoomEvent(
  channel: RealtimeChannel,
  handler: (event: RoomEvent) => void
): RealtimeChannel {
  return channel.on('broadcast', { event: BROADCAST_EVENT }, (payload) => {
    handler(payload.payload as RoomEvent)
  })
}

/**
 * Subscribe and listen to the channel
 */
export function subscribeChannel(
  channel: RealtimeChannel,
  onStatus?: (status: string) => void
): RealtimeChannel {
  return channel.subscribe((status) => {
    onStatus?.(status)
  })
}

/**
 * Unsubscribe and remove channel
 */
export async function removeChannel(channel: RealtimeChannel) {
  const supabase = createClient()
  await supabase.removeChannel(channel)
}

/**
 * Generate a random room code
 */
export function generateRoomCode(
  chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  length = 6
): string {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}
