-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'church_admin', 'super_admin')),
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'individual', 'church')),
  church_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();
