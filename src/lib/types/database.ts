export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type UserRole = 'user' | 'church_admin' | 'super_admin'
export type SubscriptionTier = 'free' | 'individual' | 'church'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'
export type GameType = 'charades' | 'who_am_i' | 'guess_verse' | 'trivia'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple_choice' | 'true_false' | 'open_answer'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          role: UserRole
          subscription_tier: SubscriptionTier
          church_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          subscription_tier?: SubscriptionTier
          church_id?: string | null
        }
        Update: {
          display_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          subscription_tier?: SubscriptionTier
          church_id?: string | null
        }
      }
      churches: {
        Row: {
          id: string
          name: string
          code: string
          admin_id: string
          max_seats: number
          current_seats: number
          subscription_tier: SubscriptionTier
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          code: string
          admin_id: string
          max_seats?: number
          subscription_tier?: SubscriptionTier
        }
        Update: {
          name?: string
          code?: string
          max_seats?: number
          current_seats?: number
          subscription_tier?: SubscriptionTier
        }
      }
      church_memberships: {
        Row: {
          id: string
          church_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          church_id: string
          user_id: string
        }
        Update: Record<string, never>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: SubscriptionTier
          status: SubscriptionStatus
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: SubscriptionTier
          status?: SubscriptionStatus
        }
        Update: {
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: SubscriptionTier
          status?: SubscriptionStatus
          current_period_start?: string | null
          current_period_end?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          stripe_payment_id: string
          amount: number
          currency: string
          status: string
          created_at: string
        }
        Insert: {
          user_id: string
          stripe_payment_id: string
          amount: number
          currency?: string
          status: string
        }
        Update: {
          status?: string
        }
      }
      bible_scenes: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: Difficulty
          is_premium: boolean
          created_at: string
        }
        Insert: {
          title: string
          description: string
          category: string
          difficulty: Difficulty
          is_premium?: boolean
        }
        Update: {
          title?: string
          description?: string
          category?: string
          difficulty?: Difficulty
          is_premium?: boolean
        }
      }
      bible_characters: {
        Row: {
          id: string
          name: string
          description: string
          hints: string[]
          category: string
          difficulty: Difficulty
          is_premium: boolean
          created_at: string
        }
        Insert: {
          name: string
          description: string
          hints: string[]
          category: string
          difficulty: Difficulty
          is_premium?: boolean
        }
        Update: {
          name?: string
          description?: string
          hints?: string[]
          category?: string
          difficulty?: Difficulty
          is_premium?: boolean
        }
      }
      bible_verses: {
        Row: {
          id: string
          reference: string
          text: string
          book: string
          category: string
          difficulty: Difficulty
          is_premium: boolean
          created_at: string
        }
        Insert: {
          reference: string
          text: string
          book: string
          category: string
          difficulty: Difficulty
          is_premium?: boolean
        }
        Update: {
          reference?: string
          text?: string
          book?: string
          category?: string
          difficulty?: Difficulty
          is_premium?: boolean
        }
      }
      trivia_questions: {
        Row: {
          id: string
          question: string
          correct_answer: string
          wrong_answers: string[]
          question_type: QuestionType
          category: string
          difficulty: Difficulty
          explanation: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: {
          question: string
          correct_answer: string
          wrong_answers: string[]
          question_type: QuestionType
          category: string
          difficulty: Difficulty
          explanation?: string | null
          is_premium?: boolean
        }
        Update: {
          question?: string
          correct_answer?: string
          wrong_answers?: string[]
          question_type?: QuestionType
          category?: string
          difficulty?: Difficulty
          explanation?: string | null
          is_premium?: boolean
        }
      }
      game_sessions: {
        Row: {
          id: string
          game_type: GameType
          host_user_id: string
          church_id: string | null
          players: Json
          winner: string | null
          final_scores: Json
          duration_seconds: number
          created_at: string
        }
        Insert: {
          game_type: GameType
          host_user_id: string
          church_id?: string | null
          players: Json
          winner?: string | null
          final_scores: Json
          duration_seconds: number
        }
        Update: {
          winner?: string | null
          final_scores?: Json
        }
      }
      game_stats: {
        Row: {
          id: string
          user_id: string
          game_type: GameType
          games_played: number
          games_won: number
          total_score: number
          best_score: number
          current_streak: number
          best_streak: number
          updated_at: string
        }
        Insert: {
          user_id: string
          game_type: GameType
          games_played?: number
          games_won?: number
          total_score?: number
          best_score?: number
        }
        Update: {
          games_played?: number
          games_won?: number
          total_score?: number
          best_score?: number
          current_streak?: number
          best_streak?: number
        }
      }
    }
  }
}
