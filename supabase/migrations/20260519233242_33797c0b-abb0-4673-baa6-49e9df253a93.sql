
create or replace function public.username_available(candidate text)
returns boolean language sql stable security invoker set search_path = public as $$
  select not exists(
    select 1 from public.profiles where lower(username::text) = lower(candidate)
  );
$$;
