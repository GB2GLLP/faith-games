import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'

type BibleScene = Database['public']['Tables']['bible_scenes']['Row']
type BibleCharacter = Database['public']['Tables']['bible_characters']['Row']
type BibleVerse = Database['public']['Tables']['bible_verses']['Row']
type TriviaQuestion = Database['public']['Tables']['trivia_questions']['Row']

interface ContentFilter {
  categories?: string[]
  difficulty?: 'easy' | 'medium' | 'hard' | 'all'
  isPremium?: boolean
}

const cache = new Map<string, { data: any[]; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(table: string, filter: ContentFilter): string {
  return `${table}:${JSON.stringify(filter)}`
}

async function fetchWithCache<T>(
  table: string,
  filter: ContentFilter
): Promise<T[]> {
  const key = getCacheKey(table, filter)
  const cached = cache.get(key)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T[]
  }

  const supabase = createClient()
  let query = supabase.from(table).select('*')

  if (filter.difficulty && filter.difficulty !== 'all') {
    query = query.eq('difficulty', filter.difficulty)
  }

  if (filter.categories && filter.categories.length > 0) {
    query = query.in('category', filter.categories)
  }

  if (filter.isPremium === false) {
    query = query.eq('is_premium', false)
  }

  const { data, error } = await query

  if (error) throw error

  const result = (data || []) as T[]
  cache.set(key, { data: result, timestamp: Date.now() })
  return result
}

export async function loadScenes(filter: ContentFilter = {}): Promise<BibleScene[]> {
  return fetchWithCache<BibleScene>('bible_scenes', filter)
}

export async function loadCharacters(filter: ContentFilter = {}): Promise<BibleCharacter[]> {
  return fetchWithCache<BibleCharacter>('bible_characters', filter)
}

export async function loadVerses(filter: ContentFilter = {}): Promise<BibleVerse[]> {
  return fetchWithCache<BibleVerse>('bible_verses', filter)
}

export async function loadTriviaQuestions(filter: ContentFilter = {}): Promise<TriviaQuestion[]> {
  return fetchWithCache<TriviaQuestion>('trivia_questions', filter)
}

export function clearContentCache() {
  cache.clear()
}
