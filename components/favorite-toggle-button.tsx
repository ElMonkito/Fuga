"use client";

import { Heart, Loader2 } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FavoriteToggleButtonProps = {
  offerId: string;
  offerSlug: string;
  initialFavorited: boolean;
  authenticated: boolean;
  className?: string;
  compact?: boolean;
};

function buildLoginHref(pathname: string, searchParams: URLSearchParams) {
  const query = searchParams.toString();
  const next = `${pathname}${query ? `?${query}` : ""}`;
  return `/login?next=${encodeURIComponent(next)}` as Route;
}

export function FavoriteToggleButton({
  offerId,
  offerSlug,
  initialFavorited,
  authenticated,
  className,
  compact = false
}: FavoriteToggleButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [favorited, setFavorited] = useState(initialFavorited);

  const loginHref = useMemo(
    () => buildLoginHref(pathname, new URLSearchParams(searchParams.toString())),
    [pathname, searchParams]
  );

  async function toggleFavorite() {
    startTransition(async () => {
      const method = favorited ? "DELETE" : "POST";
      const response = await fetch("/api/favorites", {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ offerId })
      });

      if (response.status === 401) {
        router.push(loginHref);
        return;
      }

      if (!response.ok) {
        return;
      }

      setFavorited(!favorited);
      router.refresh();
    });
  }

  if (!authenticated) {
    return (
      <Button
        href={loginHref}
        variant={compact ? "ghost" : "outline"}
        className={cn(
          "shrink-0",
          favorited ? "border-fuga-orange text-fuga-orange" : "",
          className
        )}
      >
        <Heart className="h-4 w-4" />
        <span>{compact ? "Favori" : "Se connecter"}</span>
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isPending}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60",
        favorited
          ? "border-fuga-orange bg-fuga-orange/10 text-fuga-orange hover:bg-fuga-orange/15"
          : "border-fuga-borderStrong bg-white text-fuga-midnight hover:border-fuga-orange/40 hover:text-fuga-orange",
        compact ? "px-3 py-2" : "",
        className
      )}
      aria-pressed={favorited}
      aria-label={favorited ? `Retirer ${offerSlug} des favoris` : `Ajouter ${offerSlug} aux favoris`}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={cn("h-4 w-4", favorited ? "fill-current" : "")} />
      )}
      <span>{favorited ? "En favori" : "Ajouter aux favoris"}</span>
    </button>
  );
}
