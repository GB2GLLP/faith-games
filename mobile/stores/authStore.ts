import { create } from 'zustand'
import { createClient } from '../lib/supabase/client'
import type { Database } from '../lib/types/database'

type User = Database['public']['Tables']['users']['Row']

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean

  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return
    const supabase = createClient()

    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser) {
      const { data: profile } = await (supabase
        .from('users') as any)
        .select('*')
        .eq('id', authUser.id)
        .single()
      set({ user: profile || null, loading: false, initialized: true })
    } else {
      set({ user: null, loading: false, initialized: true })
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await (supabase
          .from('users') as any)
          .select('*')
          .eq('id', session.user.id)
          .single()
        set({ user: profile || null, loading: false })
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, loading: false })
      }
    })
  },

  signIn: async (email, password) => {
    const supabase = createClient()
    set({ loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      set({ loading: false })
      return { error: error.message }
    }
    if (data.user) {
      const { data: profile, error: profileError } = await (supabase
        .from('users') as any)
        .select('*')
        .eq('id', data.user.id)
        .single()
      if (profile) {
        set({ user: profile, loading: false })
      } else {
        console.warn('Profile fetch failed:', profileError)
        set({ loading: false })
        return { error: 'Could not load profile' }
      }
    }
    return { error: null }
  },

  signUp: async (email, password, displayName) => {
    const supabase = createClient()
    set({ loading: true })
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    })
    if (error) {
      set({ loading: false })
      return { error: error.message }
    }
    set({ loading: false })
    return { error: null }
  },

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null })
  },

  refreshUser: async () => {
    const supabase = createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser) {
      const { data: profile, error: profileError } = await (supabase
        .from('users') as any)
        .select('*')
        .eq('id', authUser.id)
        .single()
      if (profileError) {
        console.warn('Profile refresh failed:', profileError)
      }
      set({ user: profile || null, loading: false })
    }
  },
}))
