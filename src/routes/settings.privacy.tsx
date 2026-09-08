import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings/privacy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — AIED" },
      {
        name: "description",
        content:
          "How AIED collects, uses and protects learner data, and how parents can review or delete a child's information.",
      },
      { property: "og:title", content: "Privacy Policy — AIED" },
      {
        property: "og:description",
        content: "What data AIED collects, why we collect it, and your choices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PrivacyPolicy() {
  return (
    <AppShell>
      <LegalHeader
        eyebrow="Legal"
        title="Privacy Policy"
        icon={<ShieldCheck className="h-5 w-5" />}
      />

      <p className="mt-4 text-sm text-muted-foreground">Last updated: September 2026</p>

      <Prose>
        <P>
          AIED is operated by Coleklondin. It is used by kids, tweens, teens and adults, so we keep
          this short and plain. This page explains what we collect, why we collect it, and what you
          can do about it.
        </P>

        <H>What we collect</H>
        <Ul
          items={[
            "Email address — used to create your account, sign you in, and send password resets.",
            "Display name and avatar — shown on your profile, the leaderboard and to friends.",
            "Month and year of birth — used only to work out your age group and whether the account belongs to a child.",
            "Age group — kids, tweens, teens, adults or professional.",
            "A parent or guardian's email address, for accounts belonging to under-13s — used to send the parental notice and let them manage the account.",
            "Learning progress — XP, level, streak, hearts, gems, lessons completed and cosmetics you own.",
            "Quiz and lesson answers — including which questions you got right, wrong, or used a hint on.",
            "Subscription tier — whether you are on Free, Super AIED, AIED Max or AIED Family.",
          ]}
        />

        <H>Why we collect it</H>
        <Ul
          items={[
            "Running the app — your age group tells us which child-safety protections to apply, and your quiz answers give us a recommended course to start with. Today they do not change lesson content, the order of units, or how AL writes; if that changes we'll update this page first.",
            "Progress tracking — so your XP, streak and completed lessons follow you to any device you sign in from.",
            "The Parent dashboard — so a parent can see how their child is doing.",
            "Running your subscription — unlocking the levels and features your plan includes.",
          ]}
        />

        <H>What we do not do</H>
        <P>
          We do not sell your data. We do not share it with advertisers, and we do not build
          advertising profiles from what you learn. We only share data with the service providers
          that keep the app running (hosting, database, and the AI provider that powers AL), and only
          as much as is needed to do that job.
        </P>

        <H>Payments and billing data</H>
        <P>
          Our order process is conducted by our online reseller and Merchant of Record,
          Paddle.com. Paddle handles all payments, subscription billing, taxes and refunds for
          AIED, and is the data controller for the billing information you enter at checkout.
        </P>
        <Ul
          items={[
            "Card numbers and bank details are entered directly with Paddle and never reach AIED — we never see or store them.",
            "Paddle collects the billing details it needs to take payment and charge the right tax, such as your name, email address, country and postcode.",
            "We receive back from Paddle only what we need to run your account: which plan you're on, whether it's active, and when it renews or ends.",
            "Paddle handles this data under its own privacy notice, available at paddle.com.",
            "Children do not pay for anything in AIED. Only a grown-up account holder can start a subscription.",
          ]}
        />

        <H>AL, the AI tutor</H>
        <P>
          AL runs on Google's Gemini models, reached through the Lovable AI Gateway. When you chat
          with AL, your message and a short summary of your level and age group are sent there so AL
          can answer at the right level.
        </P>
        <Ul
          items={[
            "Your messages to AL, and your quiz and lesson answers, are never used to train or improve any AI model — not ours, and not the model provider's.",
            "Chat messages are kept for up to 30 days so a conversation can continue and so we can investigate safety reports, then deleted.",
            "Quiz and lesson answers are kept while your account is open, because they are your progress, and are deleted with the account.",
            "AL is also told, in the app itself, to remind learners not to share personal details.",
          ]}
        />
        <P>
          Don't send AL personal details like your address, phone number or school name — you don't
          need them to learn, and AL doesn't need them to help.
        </P>

        <H>Children and parents</H>
        <P>
          When someone tells us at sign-up that they are under 13, we ask for a parent or guardian's
          email and send that grown-up a notice explaining what we collect and why. The account
          stays locked — no lessons, no progress, no tutor — until the parent opens the link in that
          notice and approves it. Until then we hold only the sign-up basics: username, email, month
          and year of birth, and the parent's email address. A parent can withdraw permission at any
          time, which closes the account and deletes its data.
        </P>
        <H>Child-safe defaults</H>
        <P>
          These are switched on automatically for every account under 13, and for 13-17 year olds
          too:
        </P>
        <Ul
          items={[
            "No third-party analytics and no tracking of any kind.",
            "No advertising, and never any personalised advertising or ad profiles.",
            "Real display names are never shown on the leaderboard or any public view — a nickname is shown instead.",
            "Under-18s cannot change their own age group to Adult or Professional; only a grown-up with the Parent Zone PIN can.",
          ]}
        />
        <H>How long we keep data</H>
        <P>
          We keep information only for as long as we need it for the purpose it was collected for,
          and never indefinitely. Your profile and progress live for as long as the account is open
          and are deleted when it's closed. AL chat messages are deleted after 30 days. Parental
          notice records are kept while the account exists, as proof that permission was given.
          Backups roll off within 30 days of deletion.
        </P>
        <H>Contacting us about privacy</H>
        <P>
          Parents, guardians and adult account holders can reach us about any privacy request —
          reviewing, correcting or deleting data, or withdrawing permission — at{" "}
          <a href="mailto:privacy@aied.app" className="font-bold text-primary underline">
            privacy@aied.app
          </a>
          . We answer privacy requests within 30 days.
        </P>
        <H>More for parents</H>
        <P> Parents can review a
          child's progress, answers and account details from the{" "}
          <Link to="/parent" className="font-bold text-primary underline">
            Parent dashboard
          </Link>
          . From there a parent can also request that a child's account and all of its data be
          deleted. Deletion removes the account, the profile, and all saved progress; it cannot be
          undone.
        </P>

        <H>Deleting your own data</H>
        <P>
          Any adult account holder can ask for their account and data to be deleted. Once deleted,
          progress, cosmetics and subscription history are gone for good.
        </P>

        <H>Keeping data safe</H>
        <P>
          Your data is stored on managed cloud infrastructure with access rules that keep each
          account's data private to that account (and to a linked parent). Passwords are never stored
          in a readable form.
        </P>

        <H>Changes to this policy</H>
        <P>
          If we change how we handle data in a meaningful way, we'll update this page and the date at
          the top.
        </P>
      </Prose>

      <BackToSettings />
    </AppShell>
  );
}

export function LegalHeader({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <header className="flex items-center gap-3">
      <Link
        to="/settings"
        aria-label="Back to settings"
        className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero text-white">
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-black">{title}</h1>
        </div>
      </div>
    </header>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 space-y-4">{children}</div>;
}

export function H({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-2 text-lg font-black">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function BackToSettings() {
  return (
    <Link
      to="/settings"
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 font-black"
    >
      <ArrowLeft className="h-4 w-4" /> Back to Settings
    </Link>
  );
}
