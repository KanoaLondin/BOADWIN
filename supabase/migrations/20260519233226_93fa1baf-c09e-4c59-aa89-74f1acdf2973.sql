
-- Move citext to extensions schema
create schema if not exists extensions;
alter extension citext set schema extensions;

-- Fix search_path on remaining helpers
alter function public.tg_set_updated_at() set search_path = public;
alter function public.pair_users(uuid, uuid) set search_path = public;

-- Lock down SECURITY DEFINER execution to only intended callers
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.expire_pending_friend_requests() from public, anon, authenticated;
revoke execute on function public.pair_users(uuid, uuid) from public;
grant  execute on function public.pair_users(uuid, uuid) to authenticated;

-- username_available is safe to call signed-in (needed for live availability check)
revoke execute on function public.username_available(text) from public, anon;
grant  execute on function public.username_available(text) to authenticated;
