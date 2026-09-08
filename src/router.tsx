import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Fetch route code as soon as a tap/hover starts so screen switches feel
    // instant instead of waiting on a lazy chunk download.
    defaultPreload: "intent",
    defaultPreloadDelay: 0,
    // Don't flash a pending state for fast transitions.
    defaultPendingMs: 400,
  });

  return router;
};
