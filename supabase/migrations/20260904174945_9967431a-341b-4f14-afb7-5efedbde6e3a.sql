-- Fix over-blocking: a blocked term made of repeated letters (e.g. "kkk")
-- collapsed to a single letter, so any username containing that letter was
-- rejected. Match the collapsed candidate against the raw (uncollapsed)
-- normalized term instead.
CREATE OR REPLACE FUNCTION public.normalize_for_moderation_raw(input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT regexp_replace(
           translate(lower(coalesce(input, '')),
                     '013456789@$!|+', 'oieasgtbgasilt'),
           '[^a-z0-9]', '', 'g')
$$;

REVOKE EXECUTE ON FUNCTION public.normalize_for_moderation_raw(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.username_is_allowed(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1
    FROM public.blocked_username_terms b
    WHERE public.normalize_for_moderation_raw(candidate)
            LIKE '%' || public.normalize_for_moderation_raw(b.term) || '%'
       OR public.normalize_for_moderation(candidate)
            LIKE '%' || public.normalize_for_moderation_raw(b.term) || '%'
  )
$$;

REVOKE EXECUTE ON FUNCTION public.username_is_allowed(text) FROM PUBLIC, anon, authenticated;