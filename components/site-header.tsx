import Link from "next/link";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-fuga-border bg-fuga-offwhite/95 backdrop-blur-sm">
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-display text-lg font-bold tracking-[0.08em] text-fuga-orange">
            FUGA
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/recherche"
              className="rounded-full px-3 py-2 text-fuga-slate transition-colors hover:text-fuga-midnight"
            >
              Recherche
            </Link>
            <Link
              href={session ? "/compte" : "/login"}
              className={cn(
                "rounded-full px-3 py-2 transition-colors",
                session ? "text-fuga-midnight" : "text-fuga-slate hover:text-fuga-midnight"
              )}
            >
              {session ? "Compte" : "Login"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
