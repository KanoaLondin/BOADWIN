CREATE TABLE public.blocked_username_terms (
  term text PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blocked_username_terms TO authenticated;
GRANT ALL ON public.blocked_username_terms TO service_role;

ALTER TABLE public.blocked_username_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blocked_terms_no_client_access"
  ON public.blocked_username_terms FOR SELECT TO authenticated USING (false);

INSERT INTO public.blocked_username_terms (term) VALUES
 ('fuck'),('shit'),('cunt'),('bitch'),('bastard'),('asshole'),('dickhead'),
 ('whore'),('slut'),('rape'),('rapist'),('pedo'),('pedophile'),('molest'),
 ('nigger'),('nigga'),('faggot'),('fag'),('dyke'),('tranny'),('retard'),
 ('spic'),('chink'),('kike'),('gook'),('wetback'),('coon'),('paki'),
 ('hitler'),('nazi'),('kkk'),('heilhitler'),('genocide'),('lynch'),
 ('penis'),('vagina'),('cock'),('pussy'),('boobs'),('titties'),('blowjob'),
 ('handjob'),('cumshot'),('creampie'),('porn'),('porno'),('hentai'),
 ('jizz'),('wank'),('masturbat'),('anal'),('bestiality'),('incest'),
 ('killyourself'),('kys'),('suicide'),('terrorist'),('isis'),
 ('admin'),('moderator'),('aiedstaff'),('aiedadmin'),('support')
ON CONFLICT (term) DO NOTHING;

CREATE OR REPLACE FUNCTION public.normalize_for_moderation(input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT regexp_replace(
           regexp_replace(
             translate(lower(coalesce(input, '')),
                       '013456789@$!|+', 'oieasgtbga asit'),
             '[^a-z0-9]', '', 'g'),
           '(.)\1+', '\1', 'g')
$$;

CREATE OR REPLACE FUNCTION public.username_is_allowed(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.blocked_username_terms b
    WHERE public.normalize_for_moderation(candidate)
          LIKE '%' || public.normalize_for_moderation(b.term) || '%'
  )
$$;

REVOKE EXECUTE ON FUNCTION public.normalize_for_moderation(text) FROM PUBLIC, anon;

CREATE OR REPLACE FUNCTION public.profiles_moderate_names()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.username_is_allowed(NEW.username::text) THEN
    RAISE EXCEPTION 'That username isn''t allowed, please choose another.'
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW.display_name IS NOT NULL
     AND NOT public.username_is_allowed(NEW.display_name) THEN
    RAISE EXCEPTION 'That display name isn''t allowed, please choose another.'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END $$;

REVOKE EXECUTE ON FUNCTION public.profiles_moderate_names() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER profiles_moderate_names
  BEFORE INSERT OR UPDATE OF username, display_name ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_moderate_names();