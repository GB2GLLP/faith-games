import { create } from 'zustand'
import type { Database } from '../lib/types/database'

type BibleScene = Database['public']['Tables']['bible_scenes']['Row']

interface CharadesState {
  scenes: BibleScene[]
  currentSceneIndex: number
  correctCount: number
  skippedCount: number
  roundScenes: BibleScene[]

  setScenes: (scenes: BibleScene[]) => void
  startRound: (count?: number) => void
  markCorrect: () => void
  markSkipped: () => void
  getCurrentScene: () => BibleScene | null
  isRoundComplete: () => boolean
  syncState: (state: Partial<CharadesState>) => void
  reset: () => void
}

export const useCharadesStore = create<CharadesState>((set, get) => ({
  scenes: [],
  currentSceneIndex: 0,
  correctCount: 0,
  skippedCount: 0,
  roundScenes: [],

  setScenes: (scenes) => set({ scenes }),

  startRound: (count = 20) => {
    const { scenes } = get()
    const shuffled = [...scenes].sort(() => Math.random() - 0.5).slice(0, count)
    set({ roundScenes: shuffled, currentSceneIndex: 0, correctCount: 0, skippedCount: 0 })
  },

  markCorrect: () => {
    set((state) => ({
      correctCount: state.correctCount + 1,
      currentSceneIndex: state.currentSceneIndex + 1,
    }))
  },

  markSkipped: () => {
    set((state) => ({
      skippedCount: state.skippedCount + 1,
      currentSceneIndex: state.currentSceneIndex + 1,
    }))
  },

  getCurrentScene: () => {
    const { roundScenes, currentSceneIndex } = get()
    return roundScenes[currentSceneIndex] || null
  },

  isRoundComplete: () => {
    const { roundScenes, currentSceneIndex } = get()
    return currentSceneIndex >= roundScenes.length
  },

  syncState: (state) => set(state),

  reset: () => set({
    currentSceneIndex: 0,
    correctCount: 0,
    skippedCount: 0,
    roundScenes: [],
  }),
}))
