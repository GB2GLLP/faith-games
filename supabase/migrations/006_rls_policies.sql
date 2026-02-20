-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.churches enable row level security;
alter table public.church_memberships enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.bible_scenes enable row level security;
alter table public.bible_characters enable row level security;
alter table public.bible_verses enable row level security;
alter table public.trivia_questions enable row level security;
alter table public.game_sessions enable row level security;
alter table public.game_stats enable row level security;

-- Users policies
create policy "Users can read own profile"
  on public.users for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

create policy "Church admins can read their members"
  on public.users for select using (
    church_id in (
      select id from public.churches where admin_id = auth.uid()
    )
  );

create policy "Super admins can read all users"
  on public.users for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

create policy "Super admins can update all users"
  on public.users for update using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

-- Churches policies
create policy "Anyone authenticated can read churches"
  on public.churches for select using (auth.uid() is not null);

create policy "Church admins can update own church"
  on public.churches for update using (admin_id = auth.uid());

create policy "Authenticated users can create churches"
  on public.churches for insert with check (auth.uid() = admin_id);

-- Church memberships policies
create policy "Members can read own membership"
  on public.church_memberships for select using (user_id = auth.uid());

create policy "Church admins can read all memberships"
  on public.church_memberships for select using (
    church_id in (
      select id from public.churches where admin_id = auth.uid()
    )
  );

create policy "Users can join churches"
  on public.church_memberships for insert with check (auth.uid() = user_id);

create policy "Users can leave churches"
  on public.church_memberships for delete using (user_id = auth.uid());

create policy "Church admins can remove members"
  on public.church_memberships for delete using (
    church_id in (
      select id from public.churches where admin_id = auth.uid()
    )
  );

-- Subscriptions policies
create policy "Users can read own subscription"
  on public.subscriptions for select using (user_id = auth.uid());

-- Payments policies
create policy "Users can read own payments"
  on public.payments for select using (user_id = auth.uid());

-- Game content policies (readable by all authenticated users)
create policy "Authenticated users can read scenes"
  on public.bible_scenes for select using (auth.uid() is not null);

create policy "Authenticated users can read characters"
  on public.bible_characters for select using (auth.uid() is not null);

create policy "Authenticated users can read verses"
  on public.bible_verses for select using (auth.uid() is not null);

create policy "Authenticated users can read trivia"
  on public.trivia_questions for select using (auth.uid() is not null);

-- Super admin content management
create policy "Super admins can manage scenes"
  on public.bible_scenes for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

create policy "Super admins can manage characters"
  on public.bible_characters for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

create policy "Super admins can manage verses"
  on public.bible_verses for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

create policy "Super admins can manage trivia"
  on public.trivia_questions for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

-- Game sessions policies
create policy "Users can read own sessions"
  on public.game_sessions for select using (host_user_id = auth.uid());

create policy "Users can create sessions"
  on public.game_sessions for insert with check (host_user_id = auth.uid());

create policy "Church members can read church sessions"
  on public.game_sessions for select using (
    church_id in (
      select church_id from public.church_memberships where user_id = auth.uid()
    )
  );

-- Game stats policies
create policy "Users can read own stats"
  on public.game_stats for select using (user_id = auth.uid());

create policy "Users can upsert own stats"
  on public.game_stats for insert with check (user_id = auth.uid());

create policy "Users can update own stats"
  on public.game_stats for update using (user_id = auth.uid());

create policy "Authenticated users can read all stats for leaderboard"
  on public.game_stats for select using (auth.uid() is not null);
