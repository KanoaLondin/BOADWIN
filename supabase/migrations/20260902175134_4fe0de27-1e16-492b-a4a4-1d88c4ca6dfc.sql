DELETE FROM public.blocked_username_terms WHERE term IN ('anal','coon','fag','kys','support');
INSERT INTO public.blocked_username_terms (term) VALUES ('analsex') ON CONFLICT (term) DO NOTHING;

CREATE OR REPLACE FUNCTION public.normalize_for_moderation(input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT regexp_replace(
           regexp_replace(
             translate(lower(coalesce(input, '')),
                       '013456789@$!|+', 'oieasgtbgasilt'),
             '[^a-z0-9]', '', 'g'),
           '(.)\1+', '\1', 'g')
$$;