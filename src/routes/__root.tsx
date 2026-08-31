import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { useAuth } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AIED — Saving futures through AI literacy" },
      {
        name: "description",
        content:
          "AIED teaches AI literacy and prompt engineering through fun, Duolingo-style lessons for every age.",
      },
      { property: "og:title", content: "AIED — Saving futures through AI literacy" },
      {
        property: "og:description",
        content: "Learn AI literacy and prompt engineering the fun way. Free to start.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Routes that are part of the desktop marketing website.
// Everything else is the mobile app and gets gated to /landing on desktop.
const MARKETING_ROUTES = new Set<string>(["/landing"]);

// Pages a signed-out visitor is allowed to see. Everything else requires an
// account, per the app's "everyone signs in, progress follows you" design.
const PUBLIC_ROUTES = new Set<string>(["/landing", "/login", "/signup"]);

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (isDesktop && !MARKETING_ROUTES.has(pathname)) {
      navigate({ to: "/landing", replace: true });
    }
  }, [ready, isDesktop, pathname, navigate]);

  useEffect(() => {
    if (auth.status === "loading") return;
    if (auth.status === "guest" && !PUBLIC_ROUTES.has(pathname)) {
      navigate({ to: "/login", replace: true });
    }
    if (auth.status === "authed" && (pathname === "/login" || pathname === "/signup")) {
      navigate({ to: "/", replace: true });
    }
  }, [auth.status, pathname, navigate]);

  // Avoid a flash of gated content while we still don't know whether
  // there's a session, or right before the redirect above kicks in.
  const authGateBlocking =
    auth.status === "loading" || (auth.status === "guest" && !PUBLIC_ROUTES.has(pathname));

  return (
    <QueryClientProvider client={queryClient}>
      {authGateBlocking ? (
        <div className="grid min-h-screen place-items-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </div>
      ) : (
        <Outlet />
      )}
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}
