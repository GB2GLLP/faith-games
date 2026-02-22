-- 009: Missing RLS policies, CHECK constraint, and indexes

-- 1. Add UPDATE policy for game_sessions (users can update their own sessions)
CREATE POLICY "Users can update own sessions"
  ON public.game_sessions FOR UPDATE
  USING (host_user_id = auth.uid());

-- 2. Add CHECK constraint on churches to prevent seat overflow
-- This enforces atomicity: the trigger incrementing current_seats will fail
-- if it would exceed max_seats, preventing race conditions in the join endpoint
ALTER TABLE public.churches
  ADD CONSTRAINT check_seats_not_exceeded CHECK (current_seats <= max_seats);

-- 3. Missing indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_users_church_id
  ON public.users(church_id);

CREATE INDEX IF NOT EXISTS idx_game_sessions_host_user_id
  ON public.game_sessions(host_user_id);

CREATE INDEX IF NOT EXISTS idx_game_sessions_created_at
  ON public.game_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_game_sessions_church_id
  ON public.game_sessions(church_id);

CREATE INDEX IF NOT EXISTS idx_game_stats_user_game
  ON public.game_stats(user_id, game_type);

CREATE INDEX IF NOT EXISTS idx_game_stats_leaderboard
  ON public.game_stats(game_type, total_score DESC);

CREATE INDEX IF NOT EXISTS idx_church_memberships_user_id
  ON public.church_memberships(user_id);

CREATE INDEX IF NOT EXISTS idx_church_memberships_church_id
  ON public.church_memberships(church_id);

CREATE INDEX IF NOT EXISTS idx_payments_created_at
  ON public.payments(created_at DESC);
