import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Gem } from "@/components/GemBadge";
import {
  useAppState,
  equipOutfit,
  equipProfileBg,
  type ProfileBg,
} from "@/lib/app-state";

export const Route = createFileRoute("/wardrobe")({
  component: Wardrobe,
  head: () => ({ meta: [{ title: "Wardrobe — AIED" }] }),
});

const OUTFITS = [
  { id: "classic",   name: "Classic",   price: 0 },
  { id: "scientist", name: "Scientist", price: 40 },
  { id: "teacher",   name: "Teacher",   price: 50 },
  { id: "astronaut", name: "Astronaut", price: 60 },
  { id: "ninja",     name: "Ninja",     price: 70 },
  { id: "wizard",    name: "Wizard",    price: 80 },
];

const BGS: { id: ProfileBg; name: string; price: number }[] = [
  { id: "none",      name: "None",      price: 0 },
  { id: "galaxy",    name: "Night Sky", price: 30 },
  { id: "forest",    name: "Forest",    price: 30 },
  { id: "ocean",     name: "Ocean",     price: 30 },
  { id: "mountains", name: "Mountains", price: 30 },
  { id: "city",      name: "City",      price: 30 },
  { id: "abstract",  name: "Abstract",  price: 30 },
];

function Wardrobe() {
  const outfit = useAppState((s) => s.alOutfit);
  const ownedOutfits = useAppState((s) => s.ownedOutfits);
  const profileBg = useAppState((s) => s.profileBg);
  const ownedBgs = useAppState((s) => s.ownedProfileBgs);
  const [angle, setAngle] = useState(0);

  // Rotation: stepped CSS turn rather than 3D — playful, on-brand.
  function rotate(d: number) { setAngle((a) => a + d); }

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-black">Wardrobe</h1>
        <span className="w-9" />
      </header>

      {/* Display stage */}
      <section className="relative mt-5 h-72 overflow-hidden rounded-3xl border-2 border-border shadow-card">
        <AnimatedBackground variant={profileBg} contained />
        <div className="absolute inset-0 grid place-items-center">
          <div className="transition-transform duration-700" style={{ transform: `rotateY(${angle}deg)` }}>
            <Mascot size={180} outfit={outfit} wave />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          <button onClick={() => rotate(-45)} className="rounded-full bg-card/90 px-3 py-1 text-xs font-black shadow-soft">◀ turn</button>
          <button onClick={() => rotate(45)}  className="rounded-full bg-card/90 px-3 py-1 text-xs font-black shadow-soft">turn ▶</button>
        </div>
      </section>

      {/* Outfits */}
      <section className="mt-6">
        <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">AL outfits</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {OUTFITS.map((o) => {
            const owned = ownedOutfits.includes(o.id);
            const equipped = outfit === o.id;
            return (
              <button
                key={o.id}
                onClick={() => owned && equipOutfit(o.id)}
                className={`relative overflow-hidden rounded-2xl border-2 p-2 transition-all ${
                  equipped ? "border-primary bg-primary/10" : owned ? "border-border bg-card hover:border-primary/40" : "border-border bg-card opacity-70"
                }`}
              >
                <div className={`mx-auto grid h-20 w-20 place-items-center ${!owned && "grayscale"}`}>
                  <Mascot size={72} outfit={o.id} float={false} />
                </div>
                <p className="mt-1 text-xs font-black">{o.name}</p>
                {equipped && (
                  <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-success text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                {!owned && (
                  <Link
                    to="/shop"
                    className="absolute inset-x-1 bottom-1 flex items-center justify-center gap-1 rounded-full bg-cyan/15 px-2 py-1 text-[10px] font-black text-cyan"
                  >
                    <Lock className="h-3 w-3" />
                    <Gem size={10} /> {o.price}
                  </Link>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Backgrounds */}
      <section className="mt-6 mb-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Environments</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {BGS.map((b) => {
            const owned = ownedBgs.includes(b.id);
            const equipped = profileBg === b.id;
            return (
              <button
                key={b.id}
                onClick={() => owned && equipProfileBg(b.id)}
                className={`relative h-24 overflow-hidden rounded-2xl border-2 ${equipped ? "border-primary" : "border-border"} ${!owned && "opacity-70"}`}
              >
                {b.id !== "none" ? (
                  <AnimatedBackground variant={b.id} contained paused />
                ) : (
                  <div className="absolute inset-0 bg-muted" />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-xs font-black text-white">
                  {b.name}
                </div>
                {equipped && (
                  <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-success text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                {!owned && b.id !== "none" && (
                  <Link
                    to="/shop"
                    className="absolute right-1 top-1 flex items-center gap-1 rounded-full bg-cyan/85 px-2 py-0.5 text-[10px] font-black text-white"
                  >
                    <Gem size={10} /> {b.price}
                  </Link>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
