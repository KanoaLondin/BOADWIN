ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS state jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

CREATE OR REPLACE FUNCTION public.profiles_protect_privileged()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  -- auth.uid() is null for service-role/server connections; any request that
  -- carries a user identity is not allowed to change privileged columns.
  if auth.uid() is not null then
    new.role := old.role;
    new.premium := old.premium;
  end if;
  return new;
end $$;

DROP TRIGGER IF EXISTS profiles_protect_privileged ON public.profiles;
CREATE TRIGGER profiles_protect_privileged
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_protect_privileged();