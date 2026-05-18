import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";
import { UpgradeRequiredModal } from "./UpgradeRequiredModal";
import { LevelUpWatcher } from "./LevelUpWatcher";
import { BoostWatcher } from "./BoostWatcher";

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
  return (
    <div className={`min-h-screen pb-28 ${bg ?? ""}`}>
      <div className="mx-auto max-w-2xl px-4 pt-3">
        {showTopBar && <TopBar lessonContext={lessonContext} />}
        {children}
      </div>
      {showBottomNav && <BottomNav />}
      <UpgradeRequiredModal />
      <LevelUpWatcher />
    </div>
  );
}

