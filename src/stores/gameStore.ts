import { create } from 'zustand'
import type { GameType } from '@/lib/types/database'

export type GamePhase = 'setup' | 'ready' | 'playing' | 'turn_end' | 'round_end' | 'game_over'

export interface Player {
  id: string
  name: string
  score: number
  team?: 'A' | 'B'
}

interface GameState {
  // Core state
  gameType: GameType | null
  phase: GamePhase
  players: Player[]
  currentPlayerIndex: number
  currentRound: number
  startTime: number | null

  // Settings
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
  categories: string[]
  winScore: number
  timerDuration: number

  // Actions
  setGameType: (type: GameType) => void
  setPhase: (phase: GamePhase) => void
  addPlayer: (name: string, team?: 'A' | 'B') => void
  removePlayer: (id: string) => void
  updateScore: (playerId: string, points: number) => void
  nextTurn: () => void
  setDifficulty: (d: 'easy' | 'medium' | 'hard' | 'all') => void
  setCategories: (cats: string[]) => void
  setWinScore: (score: number) => void
  setTimerDuration: (seconds: number) => void
  getWinner: () => Player | null
  getTeamScores: () => { A: number; B: number }
  reset: () => void
}

const initialState = {
  gameType: null as GameType | null,
  phase: 'setup' as GamePhase,
  players: [] as Player[],
  currentPlayerIndex: 0,
  currentRound: 1,
  startTime: null as number | null,
  difficulty: 'all' as const,
  categories: [] as string[],
  winScore: 7,
  timerDuration: 60,
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  setGameType: (type) => set({ gameType: type }),

  setPhase: (phase) => {
    if (phase === 'playing' && !get().startTime) {
      set({ phase, startTime: Date.now() })
    } else {
      set({ phase })
    }
  },

  addPlayer: (name, team) => {
    const id = Math.random().toString(36).slice(2, 8)
    set((state) => ({
      players: [...state.players, { id, name, score: 0, team }],
    }))
  },

  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    }))
  },

  updateScore: (playerId, points) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: Math.max(0, p.score + points) } : p
      ),
    }))
  },

  nextTurn: () => {
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    }))
  },

  setDifficulty: (d) => set({ difficulty: d }),
  setCategories: (cats) => set({ categories: cats }),
  setWinScore: (score) => set({ winScore: score }),
  setTimerDuration: (seconds) => set({ timerDuration: seconds }),

  getWinner: () => {
    const { players, winScore } = get()
    return players.find((p) => p.score >= winScore) || null
  },

  getTeamScores: () => {
    const { players } = get()
    return {
      A: players.filter((p) => p.team === 'A').reduce((sum, p) => sum + p.score, 0),
      B: players.filter((p) => p.team === 'B').reduce((sum, p) => sum + p.score, 0),
    }
  },

  reset: () => set(initialState),
}))
