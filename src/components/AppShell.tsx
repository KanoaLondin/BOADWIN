import { useEffect, type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";
import { UpgradeRequiredModal } from "./UpgradeRequiredModal";
import { LevelUpWatcher } from "./LevelUpWatcher";
import { BoostWatcher } from "./BoostWatcher";
import { useAppState } from "@/lib/app-state";

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

  useEffect(() => {
    document.body.classList.toggle("bg-anim-off", animOff);
    document.body.classList.remove("has-env-bg");
    return () => {
      document.body.classList.remove("bg-anim-off");
    };
  }, [animOff]);

  return (
    <div className={`min-h-screen pb-28 ${bg ?? ""}`}>
      <div className="mx-auto max-w-2xl px-4 pt-3">
        {showTopBar && <TopBar lessonContext={lessonContext} />}
        {children}
      </div>
      {showBottomNav && <BottomNav />}
      <UpgradeRequiredModal />
      <LevelUpWatcher />
      <BoostWatcher />
    </div>
  );
}
