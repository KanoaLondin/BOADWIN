// Server-only helpers for the COPPA direct notice sent to a parent/guardian.
// The notice text lives here so the email and the web page a parent lands on
// always say exactly the same thing.

export const PRIVACY_CONTACT_EMAIL = "privacy@aied.app";

export function makeConsentToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export type NoticeParams = {
  childName: string;
  consentUrl: string;
  parentDashboardUrl: string;
};

export const NOTICE_SUBJECT = "Please approve your child's AIED account";

/** The plain-language direct notice required before a child account activates. */
export function noticeSections({ childName }: { childName: string }) {
  return {
    intro: `${childName} has asked to create an account on AIED, an app that teaches AI literacy through short lessons. Because they told us they are under 13, we need a parent or guardian's permission before the account can be used, and we have to tell you exactly what we collect first.`,
    collect: [
      "Email address and a username — to create the account and sign in.",
      "Month and year of birth — only to work out whether the account belongs to a child.",
      "Your email address, as the parent or guardian — only to send this notice and let you manage the account.",
      "Learning progress — XP, level, streak, hearts, gems, lessons finished and cosmetic items.",
      "Lesson and quiz answers — including which questions were right, wrong, or used a hint.",
      "Messages typed to AL, the in-app AI tutor.",
    ],
    why: [
      "To run the account and save progress so it follows your child to any device.",
      "To show you their progress in the Parent Dashboard.",
      "To let AL answer questions at the right level.",
    ],
    protections: [
      "No third-party analytics or tracking on a child account.",
      "No advertising and no advertising profiles — ever.",
      "Their real display name is never shown on a leaderboard or any public view; a nickname is shown instead.",
      "We never sell or rent your child's information.",
      "Chat messages and quiz answers are never used to train or improve any AI model.",
    ],
    rights: `You can review, change or delete everything we hold about your child at any time from the Parent Dashboard, or by emailing ${PRIVACY_CONTACT_EMAIL}. You can also withdraw this permission at any time, which closes the account and deletes its data.`,
  };
}

export function noticeHtml(p: NoticeParams): string {
  const s = noticeSections({ childName: p.childName });
  const list = (items: string[]) =>
    `<ul style="padding-left:18px;margin:8px 0">${items
      .map((i) => `<li style="margin:4px 0">${escapeHtml(i)}</li>`)
      .join("")}</ul>`;
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#1f2233;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:22px;margin:0 0 4px">Approve ${escapeHtml(p.childName)}'s AIED account</h1>
    <p style="color:#555">${escapeHtml(s.intro)}</p>
    <h2 style="font-size:16px;margin-top:20px">What we collect</h2>${list(s.collect)}
    <h2 style="font-size:16px;margin-top:20px">Why we collect it</h2>${list(s.why)}
    <h2 style="font-size:16px;margin-top:20px">Child-safety defaults, applied automatically</h2>${list(s.protections)}
    <h2 style="font-size:16px;margin-top:20px">Your choices</h2>
    <p style="color:#555">${escapeHtml(s.rights)}</p>
    <p style="margin:24px 0">
      <a href="${p.consentUrl}" style="background:#6d3bf5;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700">I approve this account</a>
    </p>
    <p style="font-size:13px;color:#777">Prefer to look around first? Open the Parent Dashboard: <a href="${p.parentDashboardUrl}">${p.parentDashboardUrl}</a><br/>
    If you did not expect this email, you can ignore it — the account stays locked until someone approves it.<br/>
    Privacy questions: ${PRIVACY_CONTACT_EMAIL}</p>
  </body></html>`;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export type DeliveryResult = { delivered: boolean; error?: string };

/**
 * Sends the notice if an email sender is configured. AIED has no verified
 * sending domain yet, so in that case we report back honestly instead of
 * pretending the parent was emailed — the consent link is then shown in-app
 * for the parent to open on the device.
 */
export async function deliverNotice(
  to: string,
  html: string,
): Promise<DeliveryResult> {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["EMAIL_FROM"];
  if (!apiKey || !from) {
    return { delivered: false, error: "no_email_sender_configured" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject: NOTICE_SUBJECT, html }),
    });
    if (!res.ok) {
      return { delivered: false, error: `${res.status}: ${await res.text()}` };
    }
    return { delivered: true };
  } catch (err) {
    return { delivered: false, error: err instanceof Error ? err.message : "send_failed" };
  }
}
