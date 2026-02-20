-- Subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier text not null default 'free' check (tier in ('free', 'individual', 'church')),
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.update_updated_at();

-- Payments table
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  stripe_payment_id text not null unique,
  amount integer not null,
  currency text not null default 'usd',
  status text not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_subscriptions_user on public.subscriptions(user_id);
create index idx_subscriptions_stripe on public.subscriptions(stripe_customer_id);
create index idx_payments_user on public.payments(user_id);
