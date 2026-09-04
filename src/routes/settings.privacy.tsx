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
          AIED is used by kids, tweens, teens and adults, so we keep this short and plain. This page
          explains what we collect, why we collect it, and what you can do about it.
        </P>

        <H>What we collect</H>
        <Ul
          items={[
            "Email address — used to create your account, sign you in, and send password resets.",
            "Display name and avatar — shown on your profile, the leaderboard and to friends.",
            "Age group — kids, tweens, teens, adults or professional.",
            "Learning progress — XP, level, streak, hearts, gems, lessons completed and cosmetics you own.",
            "Quiz and lesson answers — including which questions you got right, wrong, or used a hint on.",
            "Subscription tier — whether you are on Free, Super AIED, AIED Max or AIED Family.",
          ]}
        />

        <H>Why we collect it</H>
        <Ul
          items={[
            "Personalising lessons — your age group and quiz answers set the difficulty, the starting point in a course, and how AL (the AI tutor) talks to you.",
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

        <H>AL, the AI tutor</H>
        <P>
          When you chat with AL, your message and a short summary of your level and age group are sent
          to an AI provider so AL can answer at the right level. Don't send AL personal details like
          your address, phone number or school name — you don't need them to learn, and AL doesn't
          need them to help.
        </P>

        <H>Children and parents</H>
        <P>
          Accounts for children should be created with a parent or guardian. Parents can review a
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
