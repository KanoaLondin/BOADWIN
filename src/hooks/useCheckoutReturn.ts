// After a Paddle checkout redirects back with ?checkout=success, the billing
// webhook usually lands a second or two later. Poll briefly so the plan on
// screen updates on its own instead of needing a manual refresh.
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useCheckoutReturn(refetch: () => void | Promise<void>, isActive: boolean) {
  const done = useRef(false);
  const activeRef = useRef(isActive);
  activeRef.current = isActive;

  useEffect(() => {
    if (typeof window === "undefined" || done.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") !== "success") return;
    done.current = true;

    let tries = 0;
    let stopped = false;
    const tick = async () => {
      if (stopped) return;
      await refetch();
      tries += 1;
      if (activeRef.current) {
        toast.success("Payment confirmed — your plan is active on the web and in the app.");
        return;
      }
      if (tries < 15) window.setTimeout(() => void tick(), 2000);
    };
    void tick();

    // Clean the marker out of the URL so a refresh doesn't re-run this.
    params.delete("checkout");
    const qs = params.toString();
    window.history.replaceState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));

    return () => {
      stopped = true;
    };
  }, [refetch]);
}
