// Tiny global event bus for cross-tree "open this modal" triggers.
import { useEffect, useState } from "react";

type Listener = () => void;
const listeners: Record<string, Set<Listener>> = {};

export function emit(event: string) {
  (listeners[event] ??= new Set()).forEach((l) => l());
}
export function on(event: string, cb: Listener): () => void {
  (listeners[event] ??= new Set()).add(cb);
  return () => listeners[event]?.delete(cb);
}

// Reactive open-state hook for a simple boolean modal.
export function useBoolEvent(openEvent: string): [boolean, () => void] {
  const [open, setOpen] = useState(false);
  useEffect(() => on(openEvent, () => setOpen(true)), [openEvent]);
  return [open, () => setOpen(false)];
}

// Premium-required popup
export const OPEN_UPGRADE = "open:upgrade";
export function requestUpgrade() { emit(OPEN_UPGRADE); }
