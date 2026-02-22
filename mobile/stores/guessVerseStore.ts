import { create } from 'zustand'
import type { Database } from '../lib/types/database'

type BibleVerse = Database['public']['Tables']['bible_verses']['Row']

type RevealPhase = 'revealing' | 'grabbed' | 'answered' | 'next'

interface GuessVerseState {
  verses: BibleVerse[]
  currentVerseIndex: number
  words: string[]
  revealedWordCount: number
  revealPhase: RevealPhase
  grabbedByPlayerId: string | null

  setVerses: (verses: BibleVerse[]) => void
  revealNextWord: () => void
  grabVerse: (playerId: string) => boolean
  markAnswered: () => void
  nextVerse: () => void
  getCurrentVerse: () => BibleVerse | null
  getRevealProgress: () => number
  getPointsForTiming: () => number
  setRevealedCount: (count: number) => void
  syncState: (state: Partial<GuessVerseState>) => void
  reset: () => void
}

export const useGuessVerseStore = create<GuessVerseState>((set, get) => ({
  verses: [],
  currentVerseIndex: 0,
  words: [],
  revealedWordCount: 0,
  revealPhase: 'revealing',
  grabbedByPlayerId: null,

  setVerses: (verses) => {
    const shuffled = [...verses].sort(() => Math.random() - 0.5)
    set({ verses: shuffled, currentVerseIndex: 0 })
    if (shuffled.length > 0) {
      set({ words: shuffled[0].text.split(/\s+/), revealedWordCount: 0 })
    }
  },

  revealNextWord: () => {
    set((state) => ({
      revealedWordCount: Math.min(state.revealedWordCount + 1, state.words.length),
    }))
  },

  grabVerse: (playerId) => {
    if (get().revealPhase !== 'revealing') return false
    set({ grabbedByPlayerId: playerId, revealPhase: 'grabbed' })
    return true
  },

  markAnswered: () => {
    set({ revealPhase: 'answered' })
  },

  nextVerse: () => {
    const { verses, currentVerseIndex } = get()
    const nextIndex = currentVerseIndex + 1
    if (nextIndex < verses.length) {
      const nextVerse = verses[nextIndex]
      set({
        currentVerseIndex: nextIndex,
        words: nextVerse.text.split(/\s+/),
        revealedWordCount: 0,
        revealPhase: 'revealing',
        grabbedByPlayerId: null,
      })
    }
  },

  getCurrentVerse: () => {
    const { verses, currentVerseIndex } = get()
    return verses[currentVerseIndex] || null
  },

  getRevealProgress: () => {
    const { revealedWordCount, words } = get()
    if (words.length === 0) return 0
    return revealedWordCount / words.length
  },

  getPointsForTiming: () => {
    const progress = get().getRevealProgress()
    if (progress <= 0.33) return 3
    if (progress <= 0.66) return 2
    return 1
  },

  setRevealedCount: (count) => set({ revealedWordCount: count }),

  syncState: (state) => set(state),

  reset: () => set({
    currentVerseIndex: 0,
    words: [],
    revealedWordCount: 0,
    revealPhase: 'revealing',
    grabbedByPlayerId: null,
  }),
}))
