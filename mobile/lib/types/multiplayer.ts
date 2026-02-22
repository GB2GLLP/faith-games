import type { GameType } from './database'

// Room player (stored in game_rooms.players jsonb)
export interface RoomPlayer {
  userId: string
  displayName: string
  avatarUrl: string | null
  team?: 'A' | 'B'
  isHost: boolean
  isConnected: boolean
  joinedAt: number
}

// Room settings (stored in game_rooms.settings jsonb)
export interface RoomSettings {
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
  categories: string[]
  winScore: number
  timerDuration: number
  maxPlayers: number
}

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  difficulty: 'all',
  categories: [],
  winScore: 7,
  timerDuration: 60,
  maxPlayers: 8,
}

// Room status
export type RoomStatus = 'lobby' | 'playing' | 'finished' | 'expired'

// ─── Realtime Channel Events ───

// Lobby events
export interface PlayerJoinEvent {
  type: 'player:join'
  player: RoomPlayer
}

export interface PlayerAcceptedEvent {
  type: 'player:accepted'
  players: RoomPlayer[]
}

export interface PlayerLeaveEvent {
  type: 'player:leave'
  userId: string
}

export interface RoomSyncEvent {
  type: 'room:sync'
  players: RoomPlayer[]
  settings: RoomSettings
  status: RoomStatus
}

export interface SettingsUpdateEvent {
  type: 'settings:update'
  settings: RoomSettings
}

// Game lifecycle events
export interface GameStartEvent {
  type: 'game:start'
  gameType: GameType
  settings: RoomSettings
  players: RoomPlayer[]
}

export interface GameStateEvent {
  type: 'game:state'
  state: Record<string, unknown>
}

export interface GameOverEvent {
  type: 'game:over'
  scores: Array<{ userId: string; displayName: string; score: number }>
  winnerId: string
}

// Charades / Who Am I events
export interface CharadesSceneEvent {
  type: 'charades:scene'
  scene: { id: string; title: string; description: string }
  activePlayerId: string
}

export interface CharadesTiltEvent {
  type: 'charades:tilt'
  result: 'correct' | 'skip'
  playerId: string
}

export interface TimerStartEvent {
  type: 'timer:start'
  duration: number
  startedAt: number
}

export interface TimerEndEvent {
  type: 'timer:end'
}

export interface WhoAmICharacterEvent {
  type: 'whoami:character'
  character: { id: string; name: string; hints: string[] }
  activePlayerId: string
  activeTeam: 'A' | 'B'
}

// Trivia events
export interface TriviaQuestionEvent {
  type: 'trivia:question'
  question: {
    id: string
    question: string
    answers: string[]
    category: string
    difficulty: string
    questionType: string
  }
  questionIndex: number
}

export interface TriviaGrabEvent {
  type: 'trivia:grab'
  playerId: string
  timestamp: number
}

export interface TriviaGrabResultEvent {
  type: 'trivia:grab_result'
  winnerId: string
  winnerName: string
}

export interface TriviaAnswerEvent {
  type: 'trivia:answer'
  playerId: string
  answer: string
}

export interface TriviaResultEvent {
  type: 'trivia:result'
  correct: boolean
  correctAnswer: string
  explanation: string | null
  scores: Array<{ userId: string; score: number }>
  passedTo?: string
}

// Guess Verse events
export interface VerseRevealEvent {
  type: 'verse:reveal'
  verseId: string
  words: string[]
  revealedCount: number
  totalWords: number
}

export interface VerseGrabEvent {
  type: 'verse:grab'
  playerId: string
  timestamp: number
}

export interface VerseGrabResultEvent {
  type: 'verse:grab_result'
  winnerId: string
  winnerName: string
  reference: string
  points: number
}

export interface VerseResultEvent {
  type: 'verse:result'
  correct: boolean
  reference: string
  scores: Array<{ userId: string; score: number }>
  passedTo?: string
}

// Union of all events
export type RoomEvent =
  | PlayerJoinEvent
  | PlayerAcceptedEvent
  | PlayerLeaveEvent
  | RoomSyncEvent
  | SettingsUpdateEvent
  | GameStartEvent
  | GameStateEvent
  | GameOverEvent
  | CharadesSceneEvent
  | CharadesTiltEvent
  | TimerStartEvent
  | TimerEndEvent
  | WhoAmICharacterEvent
  | TriviaQuestionEvent
  | TriviaGrabEvent
  | TriviaGrabResultEvent
  | TriviaAnswerEvent
  | TriviaResultEvent
  | VerseRevealEvent
  | VerseGrabEvent
  | VerseGrabResultEvent
  | VerseResultEvent
