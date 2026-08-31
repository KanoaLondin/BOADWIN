
-- =====================================================================
-- ROLE + CLOUD PROGRESS SYNC
-- =====================================================================

-- Role: 'user' (default, subject to subscription gating) or 'admin'
-- (full access to everything regardless of the 'premium' tier).
alter table public.profiles
  add column if not exists role text not null default 'user' check (role in ('user', 'admin'));

-- Full client app-state blob (xp/streak/hearts/gems already have their own
-- typed columns for leaderboards; everything else — completed lessons,
-- cosmetics, inventory, preferences — lives here as one JSON document so the
-- app can restore a signed-in user's exact progress on any device.
alter table public.profiles
  add column if not exists state jsonb not null default '{}'::jsonb;

-- =====================================================================
-- Prevent a signed-in user from promoting themselves to admin or granting
-- themselves premium by calling profiles.update() directly (RLS's
-- "profiles_update_own" policy is row-level, not column-level, so without
-- this guard any authenticated user could self-escalate). Only a
-- service-role connection (our server-side admin code redemption function,
-- or a future billing webhook) can change these two columns.
-- =====================================================================
create or replace function public.tg_protect_privileged_columns()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.role() <> 'service_role' then
    if new.role is distinct from old.role then
      new.role := old.role;
    end if;
    if new.premium is distinct from old.premium then
      new.premium := old.premium;
    end if;
  end if;
  return new;
end $$;

drop trigger if exists profiles_protect_privileged on public.profiles;
create trigger profiles_protect_privileged
  before update on public.profiles
  for each row execute function public.tg_protect_privileged_columns();
