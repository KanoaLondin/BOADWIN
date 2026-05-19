
-- Extensions
create extension if not exists citext;
create extension if not exists pgcrypto;

-- =====================================================================
-- PROFILES
-- =====================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext unique not null,
  display_name text,
  age_group text not null default 'adults' check (age_group in ('kids','tweens','teens','adults','pro')),
  al_outfit text not null default 'classic',
  profile_bg text not null default 'none',
  bio text,
  xp integer not null default 0,
  streak integer not null default 0,
  weekly_xp integer not null default 0,
  hearts integer not null default 5,
  gems integer not null default 50,
  premium text not null default 'free' check (premium in ('free','plus','max','family')),
  last_active_at timestamptz not null default now(),
  username_changed_at timestamptz,
  member_since timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (
    char_length(username) between 3 and 20
    and username ~ '^[A-Za-z0-9._]+$'
  )
);

create index profiles_username_idx on public.profiles using btree (lower(username::text) text_pattern_ops);
create index profiles_weekly_xp_idx on public.profiles (weekly_xp desc);

alter table public.profiles enable row level security;

-- Anyone authenticated can read public profile fields (used for search / leaderboards / friend cards).
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.tg_set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base_username text;
  candidate text;
  n integer := 0;
begin
  base_username := coalesce(
    nullif(regexp_replace(coalesce(new.raw_user_meta_data->>'username',''), '[^A-Za-z0-9._]', '', 'g'), ''),
    'user' || substring(new.id::text, 1, 6)
  );
  base_username := substr(base_username, 1, 18);
  candidate := base_username;
  while exists(select 1 from public.profiles where lower(username::text) = lower(candidate)) loop
    n := n + 1;
    candidate := substr(base_username, 1, 18 - length(n::text)) || n::text;
  end loop;

  insert into public.profiles (id, username, age_group)
  values (
    new.id,
    candidate,
    coalesce(new.raw_user_meta_data->>'age_group', 'adults')
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- FRIENDSHIPS (canonical pair: user_a < user_b)
-- =====================================================================
create table public.friendships (
  user_a uuid not null references public.profiles(id) on delete cascade,
  user_b uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('pending','accepted','blocked')),
  requested_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  primary key (user_a, user_b),
  constraint friendship_order check (user_a < user_b)
);

create index friendships_user_a_idx on public.friendships(user_a);
create index friendships_user_b_idx on public.friendships(user_b);
create index friendships_status_idx on public.friendships(status);

alter table public.friendships enable row level security;

create policy "friendships_select_involved"
  on public.friendships for select
  to authenticated
  using (auth.uid() in (user_a, user_b));

create policy "friendships_insert_self"
  on public.friendships for insert
  to authenticated
  with check (auth.uid() = requested_by and auth.uid() in (user_a, user_b));

create policy "friendships_update_involved"
  on public.friendships for update
  to authenticated
  using (auth.uid() in (user_a, user_b))
  with check (auth.uid() in (user_a, user_b));

create policy "friendships_delete_involved"
  on public.friendships for delete
  to authenticated
  using (auth.uid() in (user_a, user_b));

-- Helper: canonical pair
create or replace function public.pair_users(u1 uuid, u2 uuid)
returns table(a uuid, b uuid) language sql immutable as $$
  select least(u1, u2), greatest(u1, u2);
$$;

-- =====================================================================
-- USER BLOCKS
-- =====================================================================
create table public.user_blocks (
  blocker uuid not null references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker, blocked),
  constraint no_self_block check (blocker <> blocked)
);

alter table public.user_blocks enable row level security;

create policy "user_blocks_select_own"
  on public.user_blocks for select
  to authenticated
  using (blocker = auth.uid());

create policy "user_blocks_insert_own"
  on public.user_blocks for insert
  to authenticated
  with check (blocker = auth.uid());

create policy "user_blocks_delete_own"
  on public.user_blocks for delete
  to authenticated
  using (blocker = auth.uid());

-- =====================================================================
-- USERNAME availability helper (case-insensitive)
-- =====================================================================
create or replace function public.username_available(candidate text)
returns boolean language sql stable security definer set search_path = public as $$
  select not exists(
    select 1 from public.profiles where lower(username::text) = lower(candidate)
  );
$$;

-- =====================================================================
-- Cleanup expired pending requests (older than 14 days)
-- =====================================================================
create or replace function public.expire_pending_friend_requests()
returns void language sql security definer set search_path = public as $$
  delete from public.friendships
  where status = 'pending'
    and created_at < now() - interval '14 days';
$$;
