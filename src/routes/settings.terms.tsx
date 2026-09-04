import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LegalHeader, Prose, H, P, Ul, BackToSettings } from "./settings.privacy";

export const Route = createFileRoute("/settings/terms")({
  component: TermsOfService,
  head: () => ({
    meta: [
      { title: "Terms of Service — AIED" },
      {
        name: "description",
        content:
          "The rules for using AIED: acceptable use, subscription and billing terms, and how accounts can be closed.",
      },
      { property: "og:title", content: "Terms of Service — AIED" },
      {
        property: "og:description",
        content: "Acceptable use, billing, and account terms for AIED.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function TermsOfService() {
  return (
    <AppShell>
      <LegalHeader eyebrow="Legal" title="Terms of Service" icon={<ScrollText className="h-5 w-5" />} />

      <p className="mt-4 text-sm text-muted-foreground">Last updated: September 2026</p>

      <Prose>
        <P>
          By creating an account and using AIED, you agree to these terms. If you're under 18, a
          parent or guardian should read them with you and agree on your behalf. Accounts for
          under-13s are not activated at all until we've emailed a parent or guardian a notice and
          they have approved the account.
        </P>

        <H>Your account</H>
        <Ul
          items={[
            "One account per person. Keep your password private.",
            "Tell us your real month and year of birth at sign-up. If you're under 13, a parent or guardian must approve the account before it works, and only they can change the age group afterwards.",
            "Give a real email address so we can help you recover your account.",
            "You're responsible for what happens on your account, including any purchases made on it.",
          ]}
        />

        <H>Acceptable use</H>
        <P>Because learners here are as young as six, we hold a high bar. Don't:</P>
        <Ul
          items={[
            "Choose a username, display name or avatar that is offensive, hateful, sexual or harassing — these are filtered, and repeat attempts can close your account.",
            "Harass, bully, impersonate or threaten other learners in friend chats, duels or on the leaderboard.",
            "Share personal contact details (yours or anyone else's) in chats.",
            "Cheat, script or automate lessons to inflate XP, streaks or leaderboard position.",
            "Try to break, overload, reverse-engineer or gain unauthorised access to the app or its backend.",
            "Use AL, the AI tutor, to generate harmful, illegal, hateful or sexual content. Security lessons cover red-teaming for defensive, authorised testing only.",
            "Copy, resell or redistribute course content outside the app.",
          ]}
        />

        <H>Subscriptions and billing</H>
        <Ul
          items={[
            "Free gives you the beginner levels. Super AIED, AIED Max and AIED Family unlock further levels and features, described on the Plans page.",
            "Paid plans are billed in advance on a recurring basis — monthly or yearly, depending on the plan you pick — and renew automatically until you cancel.",
            "Prices shown on the Plans page are in US dollars and exclude any taxes that may apply where you live.",
            "You can switch between paid plans at any time from the Plans page. A switch takes effect immediately.",
            "You can cancel at any time from the Plans page. Your paid features stay active until the end of the period you've already paid for, then the account moves to Free.",
            "Cancelling does not automatically refund the current period. If something went wrong with a charge, contact us and we'll look at it.",
            "AIED Family covers up to six accounts under one payer. The payer is responsible for the plan.",
          ]}
        />

        <H>Your progress and purchases</H>
        <P>
          XP, gems, streaks, hearts and cosmetics live inside AIED. They have no cash value, can't be
          transferred between accounts, and can't be exchanged for money. Moving to Free keeps your
          progress — it just locks the lessons and features that need a paid plan.
        </P>

        <H>Content and AI answers</H>
        <P>
          AIED teaches AI literacy; it isn't professional, legal, security or career advice. AL is an
          AI tutor and can be wrong. Check anything important before you act on it.
        </P>

        <H>Ending your account</H>
        <Ul
          items={[
            "You can stop using AIED at any time, and you or a parent can ask for the account and its data to be deleted.",
            "We may suspend or close an account that breaks the acceptable-use rules above, abuses the payment system, or puts other learners at risk.",
            "A parent or guardian can withdraw permission for a child's account at any time, which closes it and deletes its data.",
            "We close accounts we find belong to an under-13 with no approved parental permission.",
            "If we close an account for a rule breach, any remaining paid time may be forfeited.",
          ]}
        />

        <H>Changes</H>
        <P>
          We may update these terms as the app grows. Meaningful changes will be reflected on this
          page with a new date at the top, and continuing to use AIED means you accept them.
        </P>
      </Prose>

      <BackToSettings />
    </AppShell>
  );
}
