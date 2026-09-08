import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";
import { UpgradeRequiredModal } from "./UpgradeRequiredModal";
import { LevelUpWatcher } from "./LevelUpWatcher";
import { BoostWatcher } from "./BoostWatcher";
import { CohortGate } from "./CohortGate";

import { useAppState } from "@/lib/app-state";

const NAV_ORDER = ["/", "/courses", "/leaderboard", "/achievements", "/profile", "/shop"];

export function AppShell({
  children,
  lessonContext,
  showTopBar = true,
  showBottomNav = true,
  bg,
}: {
  children: ReactNode;
  lessonContext?: { lessonTitle: string; unitTitle: string; levelTitle: string };
  showTopBar?: boolean;
  showBottomNav?: boolean;
  bg?: string;
}) {
  const animOff = useAppState((s) => s.bgAnimationsOff);
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    document.body.classList.toggle("bg-anim-off", animOff);
    document.body.classList.remove("has-env-bg");
    return () => {
      document.body.classList.remove("bg-anim-off");
    };
  }, [animOff]);

  // Decide animation direction based on bottom-nav order; default to fade-up.
  const prev = prevPathRef.current;
  const prevIdx = NAV_ORDER.indexOf(prev);
  const currIdx = NAV_ORDER.indexOf(pathname);
  let anim = "animate-page-fade";
  if (prevIdx !== -1 && currIdx !== -1 && prevIdx !== currIdx) {
    anim = currIdx > prevIdx ? "animate-page-slide-right" : "animate-page-slide-left";
  } else if (pathname === "/") {
    anim = "animate-page-home";
  }
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <div className={`min-h-screen overflow-x-hidden pb-28 ${bg ?? ""}`}>
      <div className="mx-auto max-w-2xl px-4 pt-3">
        {showTopBar && <TopBar lessonContext={lessonContext} />}
        <div key={pathname} className={anim} style={{ willChange: "transform, opacity" }}>
          {children}
        </div>
      </div>
      {showBottomNav && <BottomNav />}
      <UpgradeRequiredModal />
      <LevelUpWatcher />
      <BoostWatcher />
      <CohortGate />

    </div>
  );
}
