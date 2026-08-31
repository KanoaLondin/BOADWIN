import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Verifies the caller's bearer token, checks the submitted code against the
// server-only ADMIN_SIGNUP_CODE secret (never sent to the browser, set as an
// environment variable in the project — the same place SUPABASE_SERVICE_ROLE_KEY
// lives), and — only on a match — promotes that user's own profile to admin
// using the service-role client, which is the only connection our
// "profiles_protect_privileged" trigger allows to change `role` or `premium`.
export const Route = createFileRoute("/api/redeem-admin-code")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
        const ADMIN_SIGNUP_CODE = process.env.ADMIN_SIGNUP_CODE;

        if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
          return Response.json({ error: "Server misconfigured" }, { status: 500 });
        }
        if (!ADMIN_SIGNUP_CODE) {
          // No code configured yet — nobody can redeem admin access. Fail closed.
          return Response.json({ error: "Admin signup is not enabled" }, { status: 403 });
        }

        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);

        const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        });
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        const userId = claims?.claims?.sub;
        if (claimsError || !userId) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        let body: { code?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const submitted = (body.code ?? "").trim();
        if (!submitted || submitted !== ADMIN_SIGNUP_CODE) {
          return Response.json({ error: "That code isn't right." }, { status: 403 });
        }

        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({ role: "admin", premium: "max" })
          .eq("id", userId);
        if (updateError) {
          console.error("[redeem-admin-code] update failed", updateError);
          return Response.json({ error: "Couldn't grant admin access" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
