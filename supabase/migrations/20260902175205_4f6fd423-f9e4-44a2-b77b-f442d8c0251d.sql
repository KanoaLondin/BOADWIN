CREATE OR REPLACE FUNCTION public.username_is_allowed(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.blocked_username_terms b
    WHERE public.normalize_for_moderation(candidate)
          LIKE '%' || public.normalize_for_moderation(b.term) || '%'
  )
$$;