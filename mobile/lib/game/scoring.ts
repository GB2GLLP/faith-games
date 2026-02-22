import type { GameType } from '../types/database'
import { GAME_CONFIG } from '../constants'

export interface ScoreUpdate {
  playerId: string
  points: number
  reason: string
}

export function calculateCharadesScore(correctCount: number): number {
  return correctCount
}

export function calculateGuessVersePoints(revealProgress: number): number {
  const { POINTS } = GAME_CONFIG.GUESS_VERSE
  if (revealProgress <= 0.33) return POINTS.EARLY
  if (revealProgress <= 0.66) return POINTS.MID
  return POINTS.LATE
}

export function calculateTriviaPenalty(): number {
  return GAME_CONFIG.TRIVIA.PENALTY
}

export function checkWinCondition(
  gameType: GameType,
  scores: Record<string, number>,
  winScore: number
): string | null {
  for (const [playerId, score] of Object.entries(scores)) {
    if (score >= winScore) return playerId
  }
  return null
}

export function calculateTeamWin(
  teamAScore: number,
  teamBScore: number,
  winScore: number
): 'A' | 'B' | null {
  if (teamAScore >= winScore) return 'A'
  if (teamBScore >= winScore) return 'B'
  return null
}

export interface GameSessionData {
  gameType: GameType
  players: { id: string; name: string; score: number; team?: string }[]
  winner: string | null
  finalScores: Record<string, number>
  durationSeconds: number
}

export function buildSessionData(
  gameType: GameType,
  players: { id: string; name: string; score: number; team?: string }[],
  winner: string | null,
  startTime: number
): GameSessionData {
  const finalScores: Record<string, number> = {}
  players.forEach((p) => {
    finalScores[p.name] = p.score
  })

  return {
    gameType,
    players,
    winner,
    finalScores,
    durationSeconds: Math.floor((Date.now() - startTime) / 1000),
  }
}
