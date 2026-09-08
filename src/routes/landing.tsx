import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles, Shield, Trophy, Zap, BookOpen, Heart, Brain,
  Apple, Smartphone, Star, Users, GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "AIED — Saving futures through AI literacy" },
      {
        name: "description",
        content:
          "AIED is the Duolingo-style app that teaches AI literacy and prompt engineering for every age. Download for iOS and Android.",
      },
      { property: "og:title", content: "AIED — The AI literacy app for every age" },
      { property: "og:description", content: "Learn prompt engineering through fun, gamified lessons. Free to start." },
    ],
  }),
});

function Landing() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile ? <MobileGate /> : <DesktopSite />;
}

// ============================================================
// MOBILE: simplified single screen with download buttons
// ============================================================
function MobileGate() {
  return (
    <div className="min-h-screen bg-background">
      <SmartBanner />
      <main className="mx-auto flex min-h-[calc(100vh-58px)] max-w-md flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative mb-6">
          <div className="grid h-28 w-28 place-items-center rounded-[2rem] gradient-hero shadow-glow animate-float">
            <span className="text-6xl">🤖</span>
          </div>
          <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-warning fill-current animate-twinkle" />
        </div>
        <h1 className="text-5xl font-black text-gradient">AIED</h1>
        <p className="mt-2 text-base font-semibold text-foreground">
          Saving futures through AI literacy
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Learn prompt engineering with fun, gamified lessons. For every age.
        </p>

        <div className="mt-8 w-full space-y-3">
          <StoreButton store="ios" />
          <StoreButton store="android" />
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground">
          Free to start · No account needed in browser
        </p>
      </main>
    </div>
  );
}

function SmartBanner() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="flex items-center gap-3 border-b border-border bg-card px-3 py-2.5">
      <button
        onClick={() => setHidden(true)}
        className="text-lg text-muted-foreground"
        aria-label="Dismiss"
      >
        ×
      </button>
      <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero text-white text-lg">
        🤖
      </div>
      <div className="flex-1 leading-tight">
        <p className="text-sm font-black">AIED</p>
        <p className="text-[10px] text-muted-foreground">Get the full app · Free</p>
      </div>
      <a
        href="#download"
        className="rounded-full gradient-hero px-3 py-1.5 text-xs font-black text-white shadow-glow"
      >
        Open
      </a>
    </div>
  );
}

function StoreButton({ store }: { store: "ios" | "android" }) {
  const isIOS = store === "ios";
  return (
    <a
      href={isIOS ? "https://apps.apple.com" : "https://play.google.com"}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-5 py-3.5 text-background shadow-card transition-transform active:scale-95"
    >
      {isIOS ? <Apple className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
      <div className="text-left leading-tight">
        <p className="text-[10px] opacity-80">{isIOS ? "Download on the" : "Get it on"}</p>
        <p className="text-base font-black">{isIOS ? "App Store" : "Google Play"}</p>
      </div>
    </a>
  );
}

// ============================================================
// DESKTOP: full marketing site
// ============================================================
function DesktopSite() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Nav />
      <Hero />
      <Features />
      <AgeGroups />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-white shadow-glow">
            <span className="text-lg">🤖</span>
          </div>
          <span className="text-2xl font-black text-gradient">AIED</span>
        </div>
        <nav className="flex items-center gap-7 text-sm font-bold text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#ages" className="hover:text-foreground">For all ages</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <Link to="/login" className="hover:text-foreground">Log in</Link>
          <a href="#download" className="rounded-full gradient-hero px-4 py-2 text-white shadow-glow">
            Get the app
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> The AI literacy app
          </span>
          <h1 className="mt-4 text-6xl font-black leading-[1.05]">
            Master AI like<br />
            it's a <span className="text-gradient">game.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            AIED teaches prompt engineering and AI literacy through fun,
            bite-size lessons — for kids, teens, and adults.
          </p>
          <div id="download" className="mt-8 flex flex-wrap gap-3">
            <StoreBtnLg store="ios" />
            <StoreBtnLg store="android" />
          </div>
          <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
              ))}
              <span className="ml-1 font-bold text-foreground">4.9</span>
            </div>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 50k+ learners</span>
            <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Used in 1,200 classrooms</span>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-purple/30 to-cyan/30 blur-3xl" />
          <div className="relative aspect-[9/19] w-[290px] overflow-hidden rounded-[2.5rem] border-[10px] border-foreground bg-background shadow-glow">
            <div className="flex h-full flex-col bg-gradient-to-br from-purple/10 via-background to-cyan/10 p-4">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-gradient">AIED</span>
                <span className="rounded-full bg-warning/20 px-2 py-0.5 text-warning">🔥 7</span>
              </div>
              <div className="mt-4 rounded-2xl gradient-hero p-4 text-white shadow-glow">
                <p className="text-[10px] font-black uppercase opacity-90">Daily Goal</p>
                <p className="text-2xl font-black">30 / 50 XP</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/30">
                  <div className="h-full w-3/5 rounded-full bg-white" />
                </div>
              </div>
              <p className="mt-4 text-[10px] font-black uppercase text-muted-foreground">Prompt Engineering</p>
              <div className="mt-2 space-y-2">
                {["Meet Your AI Friend", "How Does AI Think?", "Talking to AI"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
                    <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black text-white ${i === 0 ? "bg-success" : i === 1 ? "bg-primary animate-pop" : "bg-muted text-muted-foreground"}`}>
                      {i === 0 ? "✓" : i === 1 ? "▶" : "🔒"}
                    </div>
                    <p className="text-[11px] font-bold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto rounded-2xl border-2 border-primary/30 bg-primary/5 p-3">
                <p className="text-[11px] font-black text-primary">💎 Earn gems · Unlock chests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: <Brain />,    title: "Prompt mastery", desc: "Learn the techniques pros use, from clarity to chain-of-thought." },
    { icon: <Trophy />,   title: "Gamified XP",    desc: "Streaks, gems, badges, and chests keep learning addictive." },
    { icon: <Sparkles />, title: "AL, your tutor", desc: "Premium personal AI tutor explains anything, anytime." },
    { icon: <Shield />,   title: "Kid-safe",       desc: "Age-appropriate content with parent dashboard & PIN gate." },
    { icon: <BookOpen />, title: "5 levels",       desc: "From Ages 6 to Pro — earn a certificate at Master." },
    { icon: <Heart />,    title: "Built with care", desc: "Designed by educators. No ads. Privacy-first." },
  ];
  return (
    <section id="features" className="bg-secondary/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-black uppercase tracking-widest text-purple">Features</p>
        <h2 className="mt-2 text-center text-4xl font-black">Why learners love AIED</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero text-white shadow-glow">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-black">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgeGroups() {
  const ages = [
    { emoji: "🧒", title: "Ages 6–10", desc: "Friendly characters, playful lessons, big buttons." },
    { emoji: "🧑", title: "Ages 11–17", desc: "Real-world AI projects and school-ready prompts." },
    { emoji: "👩", title: "Adults & Pros", desc: "Certificate track for portfolios and resumes." },
  ];
  return (
    <section id="ages" className="px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-black uppercase tracking-widest text-cyan">For every age</p>
        <h2 className="mt-2 text-4xl font-black">One app. Every learner.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ages.map((a) => (
            <div key={a.title} className="rounded-3xl gradient-card border border-border p-8 shadow-soft">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-secondary text-5xl">
                {a.emoji}
              </div>
              <h3 className="mt-5 text-2xl font-black">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "AIED Free",   price: "$0",     tag: "Start here", perks: ["2 free levels", "Daily streaks", "Hearts system"] },
    { name: "Super AIED",  price: "$6.99",  tag: "Most popular", perks: ["All levels", "Unlimited hearts", "Streak freezes"], featured: true },
    { name: "AIED Max",    price: "$12.99", tag: "With AL tutor", perks: ["Everything in Super", "AL personal tutor", "Premium chests"] },
    { name: "AIED Family", price: "$19.99", tag: "Up to 6 kids", perks: ["Parent dashboard", "Up to 6 profiles", "All Max features"] },
  ];
  return (
    <section id="pricing" className="bg-secondary/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-black uppercase tracking-widest text-purple">Pricing</p>
        <h2 className="mt-2 text-center text-4xl font-black">Free to start. Premium when ready.</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl border-2 p-6 shadow-soft ${
                t.featured
                  ? "border-primary bg-card shadow-glow scale-[1.03]"
                  : "border-border bg-card"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-hero px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-glow">
                  Most popular
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.tag}</p>
              <h3 className="mt-1 text-lg font-black">{t.name}</h3>
              <p className="mt-3 text-3xl font-black">{t.price}<span className="text-xs font-bold text-muted-foreground">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning fill-current" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Subscriptions managed in the App Store or Google Play.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] gradient-hero p-12 text-center text-white shadow-glow">
        <h2 className="text-4xl font-black md:text-5xl">Your AI fluency starts today.</h2>
        <p className="mt-3 text-lg opacity-90">5 minutes a day. Lifetime advantage.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <StoreBtnLg store="ios" inverted />
          <StoreBtnLg store="android" inverted />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg gradient-hero text-white">🤖</div>
          <span className="font-black text-foreground">AIED</span>
          <span>· Saving futures through AI literacy</span>
        </div>
        <div className="flex flex-wrap gap-5 font-bold">
          <Link to="/settings/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link to="/settings/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link to="/settings/refunds" className="hover:text-foreground">
            Refunds
          </Link>
          <a href="mailto:support@aied.app" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Coleklondin. Payments are processed by our reseller and
        Merchant of Record, Paddle.com.
      </div>
    </footer>
  );
}

function StoreBtnLg({ store, inverted = false }: { store: "ios" | "android"; inverted?: boolean }) {
  const isIOS = store === "ios";
  const cls = inverted
    ? "bg-white text-foreground"
    : "bg-foreground text-background";
  return (
    <a
      href={isIOS ? "https://apps.apple.com" : "https://play.google.com"}
      className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-card transition-transform hover:-translate-y-0.5 ${cls}`}
    >
      {isIOS ? <Apple className="h-7 w-7" /> : <Smartphone className="h-7 w-7" />}
      <div className="text-left leading-tight">
        <p className="text-[10px] opacity-70">{isIOS ? "Download on the" : "Get it on"}</p>
        <p className="text-lg font-black">{isIOS ? "App Store" : "Google Play"}</p>
      </div>
    </a>
  );
}
