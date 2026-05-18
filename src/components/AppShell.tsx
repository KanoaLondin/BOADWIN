import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { TutorFloatingButton } from "./tutor/TutorFloatingButton";

export function AppShell({
  children,
  lessonContext,
}: {
  children: ReactNode;
  lessonContext?: { lessonTitle: string; unitTitle: string; levelTitle: string };
}) {
  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:pt-8">{children}</div>
      <TutorFloatingButton lessonContext={lessonContext} />
      <BottomNav />
    </div>
  );
}
