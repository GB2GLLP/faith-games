import { create } from 'zustand'
import type { Database } from '../lib/types/database'

type BibleCharacter = Database['public']['Tables']['bible_characters']['Row']

interface WhoAmIState {
  characters: BibleCharacter[]
  currentCharacterIndex: number
  usedCharacters: BibleCharacter[]
  hintsRevealed: number

  setCharacters: (chars: BibleCharacter[]) => void
  nextCharacter: () => void
  revealHint: () => void
  getCurrentCharacter: () => BibleCharacter | null
  getVisibleHints: () => string[]
  syncState: (state: Partial<WhoAmIState>) => void
  reset: () => void
}

export const useWhoAmIStore = create<WhoAmIState>((set, get) => ({
  characters: [],
  currentCharacterIndex: 0,
  usedCharacters: [],
  hintsRevealed: 0,

  setCharacters: (chars) => {
    const shuffled = [...chars].sort(() => Math.random() - 0.5)
    set({ characters: shuffled, currentCharacterIndex: 0, usedCharacters: [] })
  },

  nextCharacter: () => {
    const { characters, currentCharacterIndex } = get()
    const current = characters[currentCharacterIndex]
    set((state) => ({
      currentCharacterIndex: state.currentCharacterIndex + 1,
      usedCharacters: current ? [...state.usedCharacters, current] : state.usedCharacters,
      hintsRevealed: 0,
    }))
  },

  revealHint: () => {
    set((state) => ({ hintsRevealed: Math.min(state.hintsRevealed + 1, 3) }))
  },

  getCurrentCharacter: () => {
    const { characters, currentCharacterIndex } = get()
    return characters[currentCharacterIndex] || null
  },

  getVisibleHints: () => {
    const char = get().getCurrentCharacter()
    if (!char) return []
    return char.hints.slice(0, get().hintsRevealed)
  },

  syncState: (state) => set(state),

  reset: () => set({ currentCharacterIndex: 0, usedCharacters: [], hintsRevealed: 0 }),
}))
