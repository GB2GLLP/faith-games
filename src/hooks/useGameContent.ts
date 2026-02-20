'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'

interface UseGameContentOptions {
  table: 'bible_scenes' | 'bible_characters' | 'bible_verses' | 'trivia_questions'
  categories?: string[]
  difficulty?: 'easy' | 'medium' | 'hard' | 'all'
}

export function useGameContent<T>({ table, categories, difficulty }: UseGameContentOptions) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((s) => s.user)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      let query = supabase.from(table).select('*')

      // Filter by difficulty
      if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty', difficulty)
      }

      // Filter by categories
      if (categories && categories.length > 0) {
        query = query.in('category', categories)
      }

      // Filter premium content based on subscription
      if (user?.subscription_tier === 'free') {
        query = query.eq('is_premium', false)
      }

      const { data: content, error: fetchError } = await query

      if (fetchError) throw fetchError
      setData((content as T[]) || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [table, categories, difficulty, user?.subscription_tier])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return { data, loading, error, refetch: fetchContent }
}
