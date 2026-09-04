import { createFileRoute } from "@tanstack/react-router";
import {
  escapeHtml,
  noticeSections,
  PRIVACY_CONTACT_EMAIL,
} from "@/lib/parental-consent.server";

/**
 * The page a parent/guardian lands on from the direct-notice email. It shows
 * the same notice again and turns their click into recorded consent, which is
 * what unlocks the child's account.
 */
export const Route = createFileRoute("/api/public/parent-consent")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = new URL(request.url).searchParams.get("token") ?? "";
        const found = await lookup(token);
        if (!found) return page(notFoundBody(), 404);
        if (found.notice.consented_at) return page(doneBody(found.childName), 200);
        return page(consentBody(found.childName, token), 200);
      },
      POST: async ({ request }) => {
        const form = await request.formData();
        const token = String(form.get("token") ?? "");
        const found = await lookup(token);
        if (!found) return page(notFoundBody(), 404);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const now = new Date().toISOString();
        await supabaseAdmin
          .from("parent_consent_notices")
          .update({ consented_at: now, status: "consented" } as never)
          .eq("token", token);
        await supabaseAdmin
          .from("profiles")
          .update({ parental_consent_status: "granted", parental_consent_at: now } as never)
          .eq("id", found.notice.child_id);

        return page(doneBody(found.childName), 200);
      },
    },
  },
});

async function lookup(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("parent_consent_notices")
    .select("child_id, consented_at")
    .eq("token", token)
    .maybeSingle();
  if (!data) return null;
  const notice = data as unknown as { child_id: string; consented_at: string | null };
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("username, display_name")
    .eq("id", notice.child_id)
    .maybeSingle();
  const p = (profile ?? {}) as { username?: string; display_name?: string | null };
  return { notice, childName: p.display_name || p.username || "your child" };
}

function page(body: string, status: number) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content="noindex"/>
      <title>Parent approval — AIED</title></head>
      <body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#1f2233;max-width:640px;margin:0 auto;padding:28px 20px">${body}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function list(items: string[]) {
  return `<ul style="padding-left:18px">${items
    .map((i) => `<li style="margin:6px 0">${escapeHtml(i)}</li>`)
    .join("")}</ul>`;
}

function consentBody(childName: string, token: string) {
  const s = noticeSections({ childName });
  return `
    <h1 style="font-size:24px;margin:0 0 6px">Approve ${escapeHtml(childName)}'s AIED account</h1>
    <p style="color:#555">${escapeHtml(s.intro)}</p>
    <h2 style="font-size:17px">What we collect</h2>${list(s.collect)}
    <h2 style="font-size:17px">Why we collect it</h2>${list(s.why)}
    <h2 style="font-size:17px">Child-safety defaults, applied automatically</h2>${list(s.protections)}
    <h2 style="font-size:17px">Your choices</h2>
    <p style="color:#555">${escapeHtml(s.rights)}</p>
    <form method="post" style="margin:26px 0">
      <input type="hidden" name="token" value="${escapeHtml(token)}"/>
      <button type="submit" style="background:#6d3bf5;color:#fff;border:0;padding:14px 22px;border-radius:14px;font-weight:800;font-size:16px;cursor:pointer">
        I am the parent or guardian — I approve
      </button>
    </form>
    <p style="font-size:13px;color:#777">Not expecting this? Simply close this page: the account stays locked and unusable. Questions: ${PRIVACY_CONTACT_EMAIL}</p>`;
}

function doneBody(childName: string) {
  return `<h1 style="font-size:24px">Thank you — ${escapeHtml(childName)}'s account is approved</h1>
    <p style="color:#555">They can now use AIED. Child-safety defaults are already on: no tracking, no ads, and their real name is never shown publicly.</p>
    <p style="color:#555">You can review, change or delete their data at any time from the Parent Dashboard inside the app, or by emailing ${PRIVACY_CONTACT_EMAIL}.</p>`;
}

function notFoundBody() {
  return `<h1 style="font-size:24px">This approval link isn't valid</h1>
    <p style="color:#555">It may have been replaced by a newer one. Ask your child to tap "Send the notice again" in the app, then use the newest link.</p>
    <p style="color:#555">Questions: ${PRIVACY_CONTACT_EMAIL}</p>`;
}
