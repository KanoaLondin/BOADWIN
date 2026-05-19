
# Social System Build Plan

This is a big build. I'll split it into two shippable phases so you can test each one before the next.

## Step 0 — Enable Lovable Cloud + Auth (one-time)

- Enable Cloud (Postgres, Auth, Realtime, Storage).
- Add email/password sign-in. Existing local `useAppState` becomes per-user (loaded from DB on login, mirrored to local state for snappy UI).
- Add `/login` and `/signup` routes and an `_authenticated` layout guard. Existing onboarding gets a username step appended.
- Migrate the current mock `FRIENDS` list into seed data so the app still looks alive for solo users.

## Phase 1 — Usernames + Friends + Friends Leaderboard

### Database
- `profiles` (id → `auth.users`, username unique citext, age_group, al_outfit, profile_bg, xp, streak, weekly_xp, last_active_at, member_since, username_changed_at).
- `usernames_reserved` (lowercase unique) + DB trigger to keep `profiles.username` unique case-insensitively.
- `friendships` (user_a, user_b, status: pending|accepted|blocked, requested_by, created_at, responded_at). Canonical ordering (user_a < user_b) so we store one row per pair.
- `friend_requests` view + 14-day expiry function.
- `user_blocks` (blocker, blocked).
- RLS everywhere: users see their own profile + accepted friends' public fields only.

### Username system
- Profanity filter (server-side wordlist).
- Validation: 3–20 chars, `[a-zA-Z0-9._]`, case-insensitive uniqueness.
- Realtime availability check via debounced `createServerFn` (`checkUsername`).
- Suggestions generator (`AIED{name}`, `{name}_Pro`, `x{name}01`) when taken.
- Onboarding step: username chooser after age group.
- Profile setting: change username (30-day cooldown, countdown shown, confirm modal).
- AL prompt updated to interpolate the live username from profile.

### Friends UI
- New `/_authenticated/ranks` (rename leaderboard) with tabs: Weekly · All-Time · Friends.
- Friends tab: search bar (server fn `searchUsers`), incoming requests section, friends list sorted by weekly XP, mini top-3 podium of friends.
- Each friend card: AL avatar (live cosmetics from their profile), username, level/shield, streak, weekly XP, online dot (last_active_at < 24h), Chat + Duel buttons.
- Friend profile route `/_authenticated/friend/$username` — replaces current mock `/friend/$friendId`. Shows public stats + achievements + course progress. 3-dot menu: Unfriend, Block, Report.
- Real-time friend request count badge in top bar.

## Phase 2 — Private Chat + Async Duels + Notifications

### Chat
- `conversations` (pair_key unique), `messages` (conversation_id, sender_id, kind: text|sticker|badge_share|duel_invite, body, created_at, deleted_at).
- 200-char limit, server-side profanity filter, rate limit (5 msg / 10s).
- Realtime via Supabase Realtime channel per conversation.
- UI: `/_authenticated/chat/$username` slide-in route. Purple-right / white-left bubbles, timestamps, emoji picker, sticker pack (5 AL pose images generated), badge-share + duel-invite cards.
- Long-press message → Report. 3-dot menu → Block (auto-unfriend).
- **Kids age group**: chat route blocks them with a friendly "Chat is off for kids — try a Duel instead!" screen. They can still Duel.
- Parent dashboard line: "[child] received a friend request from [username]".

### Duels (async model)
- `duels` (id, challenger_id, opponent_id, topic, status: pending|active|complete|expired, question_ids[], challenger_score, opponent_score, challenger_finished_at, opponent_finished_at, created_at).
- `duel_answers` (duel_id, player_id, question_idx, answer, correct, ms_taken).
- Topic = random unit both players have completed (intersection of `lesson_progress`); fall back to "Prompt Engineering — Beginner".
- 10 MCQ/T-F questions drawn from completed lessons.
- Flow:
  - Send invite (from friend card or chat) → notification + duel-invite card.
  - Opponent accepts within 5 min → duel becomes `active` for both. Each plays solo when ready; 10s timer per Q; scoring (3/2/1/0).
  - Result resolves when both finish. Winner screen, gem rewards (30/10 + 20 perfect + 5 speed bonus), rematch button.
  - Achievements: `duel_champion` (10 wins), `perfect_duel` (30/30) wired into existing achievement system.

### Notifications center
- `notifications` table (user_id, kind, payload jsonb, read_at, created_at).
- DB triggers / server fns insert on: friend_request_created, friend_request_accepted, message_sent, duel_invited, friend_level_up, friend_streak_milestone.
- Bell icon top-left of home with unread badge (Realtime subscription).
- `/_authenticated/notifications` route: grouped list, tap → deep link, "Mark all as read".

## Technical notes (for me, not blocking you)

- All Supabase access via `createServerFn` + `requireSupabaseAuth`. Admin client only for triggers/maintenance.
- Realtime: one channel per conversation, one global `notifications:{user_id}` channel.
- Online status: `last_active_at` bumped on app focus + every 60s; "online" = within 24h per spec (also a 5-min "active now" green dot variant on cards).
- Stickers: generate 5 transparent PNG AL poses with `imagegen`.
- No push notifications (web app, no PWA install flow); in-app bell only — confirm if you want browser push later.
- Existing local-only `useAppState` keeps working; profile fields hydrate from DB on login and write-through on changes.

## What you'll see when each phase ships

- **After Phase 1**: real sign-up with unique username, search for any user, send/accept friend requests, browse friends in Ranks tab and on their public profile.
- **After Phase 2**: open a chat with a friend, send a duel invite, play 10 questions, see results + gem rewards, get the bell notification when something happens.

## One callout

Push notifications ("[username] wants to be your friend") only work in-app (bell badge) unless we later add a PWA install + Web Push setup. I'll wire the in-app side now and we can add browser push as a follow-up if you want it.

Approve and I'll start with Step 0 + Phase 1.
