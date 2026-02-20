-- Churches table
create table public.churches (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  code text not null unique,
  admin_id uuid not null references public.users(id) on delete cascade,
  max_seats integer not null default 50,
  current_seats integer not null default 0,
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'individual', 'church')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger churches_updated_at
  before update on public.churches
  for each row execute function public.update_updated_at();

-- Church memberships
create table public.church_memberships (
  id uuid default gen_random_uuid() primary key,
  church_id uuid not null references public.churches(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique(church_id, user_id)
);

-- Update seat count on membership changes
create or replace function public.update_church_seats()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.churches set current_seats = current_seats + 1 where id = new.church_id;
    update public.users set church_id = new.church_id where id = new.user_id;
    return new;
  elsif TG_OP = 'DELETE' then
    update public.churches set current_seats = current_seats - 1 where id = old.church_id;
    update public.users set church_id = null where id = old.user_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_membership_change
  after insert or delete on public.church_memberships
  for each row execute function public.update_church_seats();

-- Add foreign key from users to churches
alter table public.users
  add constraint users_church_id_fkey
  foreign key (church_id) references public.churches(id) on delete set null;

-- Index for code lookups
create index idx_churches_code on public.churches(code);
