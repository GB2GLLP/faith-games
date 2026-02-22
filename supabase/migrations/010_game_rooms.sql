-- Game rooms for multi-device multiplayer
CREATE TABLE public.game_rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code text NOT NULL UNIQUE,
  host_user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  game_type text NOT NULL CHECK (game_type IN ('charades', 'who_am_i', 'guess_verse', 'trivia')),
  status text NOT NULL DEFAULT 'lobby' CHECK (status IN ('lobby', 'playing', 'finished', 'expired')),
  settings jsonb NOT NULL DEFAULT '{}',
  players jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '2 hours')
);

-- Index for room code lookups
CREATE INDEX idx_game_rooms_code ON public.game_rooms(room_code);
CREATE INDEX idx_game_rooms_host ON public.game_rooms(host_user_id);
CREATE INDEX idx_game_rooms_status ON public.game_rooms(status) WHERE status IN ('lobby', 'playing');

-- RLS policies
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read rooms (needed for joining)
CREATE POLICY "Anyone can read rooms"
  ON public.game_rooms FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create rooms
CREATE POLICY "Authenticated users can create rooms"
  ON public.game_rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_user_id);

-- Host can update their own rooms
CREATE POLICY "Host can update own rooms"
  ON public.game_rooms FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_user_id);

-- Host can delete their own rooms
CREATE POLICY "Host can delete own rooms"
  ON public.game_rooms FOR DELETE
  TO authenticated
  USING (auth.uid() = host_user_id);
