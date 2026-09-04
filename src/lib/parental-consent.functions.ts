import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const requestSchema = z.object({
  parentEmail: z.string().trim().toLowerCase().email().max(255),
  origin: z.string().trim().url().max(300),
});

export type ConsentRequestResult = {
  status: "pending" | "granted";
  parentEmail: string;
  delivered: boolean;
  /** Only returned when email delivery is not configured, so a parent can
   *  still approve from the device in front of them. */
  consentUrl?: string;
};

/**
 * Records the parent/guardian email on a child account, writes the direct
 * notice, and emails it to the parent. The account stays locked until the
 * parent opens the link and approves.
 */
export const requestParentConsent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => requestSchema.parse(data))
  .handler(async ({ data, context }): Promise<ConsentRequestResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { makeConsentToken, noticeHtml, deliverNotice } = await import(
      "./parental-consent.server"
    );

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, username, display_name, is_child, parental_consent_status")
      .eq("id", context.userId)
      .maybeSingle();
    if (profileError) throw new Error(profileError.message);
    if (!profile) throw new Error("Profile not found.");

    const row = profile as unknown as {
      username: string;
      display_name: string | null;
      is_child: boolean;
      parental_consent_status: string;
    };
    if (!row.is_child) {
      return { status: "granted", parentEmail: data.parentEmail, delivered: true };
    }
    if (row.parental_consent_status === "granted") {
      return { status: "granted", parentEmail: data.parentEmail, delivered: true };
    }

    const token = makeConsentToken();
    const childName = row.display_name || row.username;
    const consentUrl = `${data.origin.replace(/\/$/, "")}/api/public/parent-consent?token=${token}`;
    const html = noticeHtml({
      childName,
      consentUrl,
      parentDashboardUrl: `${data.origin.replace(/\/$/, "")}/parent`,
    });

    const delivery = await deliverNotice(data.parentEmail, html);

    const { error: insertError } = await supabaseAdmin
      .from("parent_consent_notices")
      .insert({
        child_id: context.userId,
        parent_email: data.parentEmail,
        token,
        status: delivery.delivered ? "sent" : "queued",
        delivery_error: delivery.error ?? null,
        sent_at: delivery.delivered ? new Date().toISOString() : null,
      } as never);
    if (insertError) throw new Error(insertError.message);

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ parent_email: data.parentEmail, parental_consent_status: "pending" } as never)
      .eq("id", context.userId);
    if (updateError) throw new Error(updateError.message);

    return {
      status: "pending",
      parentEmail: data.parentEmail,
      delivered: delivery.delivered,
      ...(delivery.delivered ? {} : { consentUrl }),
    };
  });

export type ConsentState = {
  isChild: boolean;
  status: "not_required" | "pending" | "granted";
  parentEmail: string | null;
  noticeSentAt: string | null;
};

/** Current consent state for the signed-in account (never exposes the token). */
export const getConsentState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ConsentState> => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("is_child, parental_consent_status, parent_email")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    const row = (data ?? {}) as {
      is_child?: boolean;
      parental_consent_status?: string;
      parent_email?: string | null;
    };

    const { data: notice } = await context.supabase
      .from("parent_consent_notices")
      .select("sent_at, created_at")
      .eq("child_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      isChild: !!row.is_child,
      status: (row.parental_consent_status as ConsentState["status"]) ?? "not_required",
      parentEmail: row.parent_email ?? null,
      noticeSentAt:
        (notice as { sent_at?: string | null; created_at?: string } | null)?.sent_at ??
        (notice as { created_at?: string } | null)?.created_at ??
        null,
    };
  });
