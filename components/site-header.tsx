import Link from "next/link";
import { auth } from "@/lib/auth";
import { FugaLogo } from "@/components/fuga-logo";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  overlay?: boolean;
  showLogo?: boolean;
};

export async function SiteHeader({ overlay = false, showLogo = true }: SiteHeaderProps) {
  const session = await auth();

  return (
    <header
      className={cn(
        "z-40 border-b backdrop-blur-sm",
        overlay
          ? "absolute inset-x-0 top-0 border-transparent bg-transparent shadow-none"
          : "sticky top-0 border-fuga-border bg-fuga-offwhite/95"
      )}
    >
      <div className="page-shell">
        <div className="flex min-h-14 items-center justify-between gap-3 py-1.5">
          {showLogo ? (
            <Link href="/" className="block w-[96px] sm:w-[124px]">
              <FugaLogo imageClassName="h-auto w-full" />
            </Link>
          ) : (
            <div className="w-[96px] sm:w-[124px]" aria-hidden="true" />
          )}

          <nav
            className={cn(
              "flex items-center gap-1.5 text-xs sm:text-sm leading-none",
              overlay ? "text-white" : "text-fuga-slate"
            )}
          >
            <Link
              href="/recherche"
              className={cn(
                "rounded-full px-2.5 py-1.5 transition-colors",
                overlay ? "text-white/85 hover:text-white" : "text-fuga-slate hover:text-fuga-midnight"
              )}
            >
              Recherche
            </Link>
            <Link
              href={session ? "/compte" : "/login"}
              className={cn(
                "rounded-full px-2.5 py-1.5 transition-colors",
                overlay
                  ? session
                    ? "text-white"
                    : "text-white/85 hover:text-white"
                  : session
                    ? "text-fuga-midnight"
                    : "text-fuga-slate hover:text-fuga-midnight"
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
