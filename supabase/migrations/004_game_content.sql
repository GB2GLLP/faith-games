-- Bible scenes (for Charades)
create table public.bible_scenes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- Bible characters (for Who Am I)
create table public.bible_characters (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  hints text[] not null default '{}',
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- Bible verses (for Guess The Verse)
create table public.bible_verses (
  id uuid default gen_random_uuid() primary key,
  reference text not null,
  text text not null,
  book text not null,
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- Trivia questions
create table public.trivia_questions (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  correct_answer text not null,
  wrong_answers text[] not null default '{}',
  question_type text not null check (question_type in ('multiple_choice', 'true_false', 'open_answer')),
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  explanation text,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indexes for filtering
create index idx_scenes_category on public.bible_scenes(category);
create index idx_scenes_difficulty on public.bible_scenes(difficulty);
create index idx_characters_category on public.bible_characters(category);
create index idx_characters_difficulty on public.bible_characters(difficulty);
create index idx_verses_category on public.bible_verses(category);
create index idx_verses_difficulty on public.bible_verses(difficulty);
create index idx_trivia_category on public.trivia_questions(category);
create index idx_trivia_difficulty on public.trivia_questions(difficulty);
create index idx_trivia_type on public.trivia_questions(question_type);
