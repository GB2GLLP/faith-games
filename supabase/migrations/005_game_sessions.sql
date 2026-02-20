-- Game sessions
create table public.game_sessions (
  id uuid default gen_random_uuid() primary key,
  game_type text not null check (game_type in ('charades', 'who_am_i', 'guess_verse', 'trivia')),
  host_user_id uuid not null references public.users(id) on delete cascade,
  church_id uuid references public.churches(id) on delete set null,
  players jsonb not null default '[]',
  winner text,
  final_scores jsonb not null default '{}',
  duration_seconds integer not null default 0,
  created_at timestamptz not null default now()
);

-- Game stats (per user per game type)
create table public.game_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  game_type text not null check (game_type in ('charades', 'who_am_i', 'guess_verse', 'trivia')),
  games_played integer not null default 0,
  games_won integer not null default 0,
  total_score integer not null default 0,
  best_score integer not null default 0,
  current_streak integer not null default 0,
  best_streak integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, game_type)
);

create trigger game_stats_updated_at
  before update on public.game_stats
  for each row execute function public.update_updated_at();

-- Indexes
create index idx_sessions_host on public.game_sessions(host_user_id);
create index idx_sessions_church on public.game_sessions(church_id);
create index idx_sessions_type on public.game_sessions(game_type);
create index idx_stats_user on public.game_stats(user_id);
create index idx_stats_type on public.game_stats(game_type);
