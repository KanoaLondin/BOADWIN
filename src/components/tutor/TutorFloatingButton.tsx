// Kept for backwards compatibility — AL now lives in the TopBar as ALAvatar.
// This file no longer renders a floating button on screen.
export function TutorFloatingButton(_props: {
  lessonContext?: { lessonTitle: string; unitTitle: string; levelTitle: string };
}) {
  return null;
}
