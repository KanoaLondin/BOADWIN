import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:pt-8">{children}</div>
      <BottomNav />
    </div>
  );
}
