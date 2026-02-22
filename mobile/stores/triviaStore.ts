import { create } from 'zustand'
import type { Database } from '../lib/types/database'

type TriviaQuestion = Database['public']['Tables']['trivia_questions']['Row']

interface TriviaState {
  questions: TriviaQuestion[]
  currentQuestionIndex: number
  grabbedByPlayerId: string | null
  selectedAnswer: string | null
  showResult: boolean
  passedToPlayerId: string | null

  setQuestions: (q: TriviaQuestion[]) => void
  grabQuestion: (playerId: string) => boolean
  selectAnswer: (answer: string) => void
  passToPlayer: (playerId: string) => void
  nextQuestion: () => void
  getCurrentQuestion: () => TriviaQuestion | null
  isCorrect: () => boolean
  getShuffledAnswers: () => string[]
  syncState: (state: Partial<TriviaState>) => void
  reset: () => void
}

export const useTriviaStore = create<TriviaState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  grabbedByPlayerId: null,
  selectedAnswer: null,
  showResult: false,
  passedToPlayerId: null,

  setQuestions: (q) => {
    const shuffled = [...q].sort(() => Math.random() - 0.5)
    set({ questions: shuffled, currentQuestionIndex: 0 })
  },

  grabQuestion: (playerId) => {
    if (get().grabbedByPlayerId !== null) return false
    set({ grabbedByPlayerId: playerId })
    return true
  },

  selectAnswer: (answer) => {
    set({ selectedAnswer: answer, showResult: true })
  },

  passToPlayer: (playerId) => {
    set({ passedToPlayerId: playerId, grabbedByPlayerId: playerId, selectedAnswer: null, showResult: false })
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      grabbedByPlayerId: null,
      selectedAnswer: null,
      showResult: false,
      passedToPlayerId: null,
    }))
  },

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get()
    return questions[currentQuestionIndex] || null
  },

  isCorrect: () => {
    const question = get().getCurrentQuestion()
    return question?.correct_answer === get().selectedAnswer
  },

  getShuffledAnswers: () => {
    const question = get().getCurrentQuestion()
    if (!question) return []
    const all = [question.correct_answer, ...question.wrong_answers]
    return all.sort(() => Math.random() - 0.5)
  },

  syncState: (state) => set(state),

  reset: () => set({
    currentQuestionIndex: 0,
    grabbedByPlayerId: null,
    selectedAnswer: null,
    showResult: false,
    passedToPlayerId: null,
  }),
}))
