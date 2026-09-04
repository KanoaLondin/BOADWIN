// Child-safety defaults. Anything under 13 is a COPPA "child"; 13-17 is a
// minor and gets the same protections under the newer state "kids' code"
// laws, so both are treated as tracking-free, no-personalised-ads accounts
// whose real display name is never shown on a public surface.

export type ConsentStatus = "not_required" | "pending" | "granted";

export type AccountSafety = {
  isChild: boolean;
  isMinor: boolean;
  consentStatus: ConsentStatus;
  parentEmail: string | null;
};

type ProfileLike = {
  is_child?: boolean | null;
  is_minor?: boolean | null;
  parental_consent_status?: string | null;
  parent_email?: string | null;
} | null | undefined;

export function accountSafety(profile: ProfileLike): AccountSafety {
  const isChild = !!profile?.is_child;
  return {
    isChild,
    isMinor: !!profile?.is_minor || isChild,
    consentStatus: (profile?.parental_consent_status as ConsentStatus) ?? "not_required",
    parentEmail: profile?.parent_email ?? null,
  };
}

/** A child account is only allowed past the signup basics once a parent has approved. */
export function needsParentConsent(profile: ProfileLike): boolean {
  const s = accountSafety(profile);
  return s.isChild && s.consentStatus !== "granted";
}

/** Third-party analytics / tracking are switched off entirely for under-18s. */
export function trackingAllowed(profile: ProfileLike): boolean {
  return !accountSafety(profile).isMinor;
}

/** Personalised advertising is never allowed for under-18s (and we run none today). */
export function personalisedAdsAllowed(profile: ProfileLike): boolean {
  return !accountSafety(profile).isMinor;
}

const NICK_ADJECTIVES = [
  "Brave", "Clever", "Sunny", "Swift", "Curious", "Bright", "Bold", "Kind",
];
const NICK_ANIMALS = [
  "Fox", "Otter", "Panda", "Falcon", "Koala", "Tiger", "Dolphin", "Owl",
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * A stable, non-identifying nickname for a protected account. Same seed always
 * gives the same nickname, so leaderboards stay recognisable without ever
 * showing a minor's real display name.
 */
export function safeNickname(seed: string): string {
  const h = hash(seed || "learner");
  return `${NICK_ADJECTIVES[h % NICK_ADJECTIVES.length]} ${
    NICK_ANIMALS[Math.floor(h / 8) % NICK_ANIMALS.length]
  }`;
}

/** The name to show on leaderboards, friend views and anything else public. */
export function publicDisplayName(
  realName: string,
  profile: ProfileLike,
  seed?: string,
): string {
  if (!accountSafety(profile).isMinor) return realName;
  return safeNickname(seed || realName);
}
