export type GamePhase = 'setup' | 'ready' | 'playing' | 'turn_end' | 'round_end' | 'game_over'

export type GameType = 'charades' | 'who_am_i' | 'guess_verse' | 'trivia'

const VALID_TRANSITIONS: Record<GamePhase, GamePhase[]> = {
  setup: ['ready'],
  ready: ['playing', 'setup'],
  playing: ['turn_end', 'round_end', 'game_over'],
  turn_end: ['playing', 'round_end', 'game_over'],
  round_end: ['playing', 'game_over'],
  game_over: ['setup'],
}

export function canTransition(from: GamePhase, to: GamePhase): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false
}

export function transition(from: GamePhase, to: GamePhase): GamePhase {
  if (!canTransition(from, to)) {
    console.warn(`Invalid transition: ${from} -> ${to}`)
    return from
  }
  return to
}

export interface GameConfig {
  type: GameType
  minPlayers: number
  maxPlayers: number
  winScore: number
  timerDuration: number | null
  teamBased: boolean
}

export const GAME_CONFIGS: Record<GameType, GameConfig> = {
  charades: {
    type: 'charades',
    minPlayers: 2,
    maxPlayers: 12,
    winScore: 0,
    timerDuration: 60,
    teamBased: false,
  },
  who_am_i: {
    type: 'who_am_i',
    minPlayers: 4,
    maxPlayers: 12,
    winScore: 7,
    timerDuration: null,
    teamBased: true,
  },
  guess_verse: {
    type: 'guess_verse',
    minPlayers: 2,
    maxPlayers: 8,
    winScore: 7,
    timerDuration: null,
    teamBased: false,
  },
  trivia: {
    type: 'trivia',
    minPlayers: 2,
    maxPlayers: 8,
    winScore: 7,
    timerDuration: null,
    teamBased: false,
  },
}

export function validateSetup(config: GameConfig, playerCount: number): string | null {
  if (playerCount < config.minPlayers) {
    return `Need at least ${config.minPlayers} players`
  }
  if (playerCount > config.maxPlayers) {
    return `Maximum ${config.maxPlayers} players`
  }
  return null
}
