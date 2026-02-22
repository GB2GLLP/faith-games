import { create } from 'zustand'

interface UIState {
  isSoundEnabled: boolean
  isAnimationsEnabled: boolean
  toggleSound: () => void
  toggleAnimations: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSoundEnabled: true,
  isAnimationsEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  toggleAnimations: () => set((state) => ({ isAnimationsEnabled: !state.isAnimationsEnabled })),
}))
