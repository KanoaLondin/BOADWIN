import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, Award, User, ShoppingBag } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/leaderboard", label: "Ranks", icon: Trophy },
  { to: "/achievements", label: "Badges", icon: Award },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="bottom-nav-glass fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/90 backdrop-blur-xl shadow-soft"
      style={{ height: "var(--bottom-nav-height)" }}
    >
      <div className="mx-auto flex h-full max-w-2xl items-center justify-around px-1 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              // The six tabs are the app's main screens — load their code up
              // front so tapping never waits on a download.
              preload="render"
              className={`flex flex-1 touch-manipulation flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-transform duration-100 active:scale-95 ${
                active
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground active:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
              <span className="text-[10px] font-bold tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
