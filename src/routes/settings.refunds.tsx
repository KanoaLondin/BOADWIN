import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LegalHeader, Prose, H, P, Ul, BackToSettings } from "./settings.privacy";

export const Route = createFileRoute("/settings/refunds")({
  component: RefundPolicy,
  head: () => ({
    meta: [
      { title: "Refund Policy — AIED" },
      {
        name: "description",
        content:
          "AIED's refund policy: how to request a refund within 14 days, how cancellations work, and how to contact Paddle, our payment processor.",
      },
      { property: "og:title", content: "Refund Policy — AIED" },
      {
        property: "og:description",
        content: "14-day refunds on AIED subscriptions, and how to request one.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function RefundPolicy() {
  return (
    <AppShell>
      <LegalHeader eyebrow="Legal" title="Refund Policy" icon={<Receipt className="h-5 w-5" />} />

      <p className="mt-4 text-sm text-muted-foreground">Last updated: September 2026</p>

      <Prose>
        <P>
          AIED is operated by Coleklondin. Our order process is conducted by our online reseller
          and Merchant of Record, Paddle.com, which handles all payments, billing enquiries, taxes
          and refunds for AIED subscriptions.
        </P>

        <H>14-day refunds</H>
        <P>
          You can request a full refund within 14 days of any subscription payment — your first
          payment or a renewal — for any reason. We approve refund requests made inside this window
          as a matter of course.
        </P>

        <H>How to request a refund</H>
        <Ul
          items={[
            "Email billing@aied.app from the address on the account, with the date and amount of the charge, and we'll process it with Paddle.",
            "Or contact Paddle directly at paddle.net — enter the email you paid with and Paddle will find your order and handle the request.",
            "Refunds are returned to the original payment method, normally within 5-10 business days depending on your bank.",
            "We respond to refund requests within 3 business days, and always within 30 days.",
          ]}
        />

        <H>After 14 days</H>
        <P>
          Outside the 14-day window we don't refund the current billing period by default, but we do
          look at every request. If you were charged twice, charged after cancelling, or something
          on our side went wrong, contact us and we will refund it.
        </P>

        <H>Cancelling</H>
        <Ul
          items={[
            "You can cancel at any time from the Plans page in the app. Cancelling stops future charges.",
            "Cancelling on its own is not a refund — your paid features stay active until the end of the period you've already paid for, then the account moves to Free.",
            "Switching between paid plans takes effect immediately and is pro-rated by Paddle, so you're only charged the difference.",
            "Your XP, streak, progress and cosmetics are kept when a plan ends.",
          ]}
        />

        <H>Free plan</H>
        <P>
          The Free plan costs nothing and involves no charge, so there is nothing to refund. You can
          try AIED on Free for as long as you like before paying.
        </P>

        <H>Contact</H>
        <P>
          Questions about a charge or a refund:{" "}
          <a href="mailto:billing@aied.app" className="font-bold text-primary underline">
            billing@aied.app
          </a>
          , or Paddle at{" "}
          <a
            href="https://paddle.net"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-primary underline"
          >
            paddle.net
          </a>
          .
        </P>
      </Prose>

      <BackToSettings />
    </AppShell>
  );
}
