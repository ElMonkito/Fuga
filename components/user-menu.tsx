"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import type { Route } from "next";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  session: Awaited<ReturnType<typeof import("@/lib/auth").auth>>;
  overlay?: boolean;
};

export function UserMenu({ session, overlay = false }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const firstName = session?.user?.firstName?.trim();

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!session?.user?.id) {
    return (
      <Link
        href={"/login" as Route}
        className={cn(
          "rounded-full px-2.5 py-1.5 transition-colors",
          overlay ? "text-white/85 hover:text-white" : "text-fuga-slate hover:text-fuga-midnight"
        )}
      >
        Login
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors",
          overlay ? "text-white hover:text-white" : "text-fuga-midnight hover:text-fuga-orange"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UserRound className="h-4 w-4" />
        <span className="max-w-24 truncate text-xs sm:text-sm">{firstName || "Compte"}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-fuga-border bg-white shadow-lg">
          <Link
            href={"/compte" as Route}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-fuga-midnight transition-colors hover:bg-fuga-offwhite"
          >
            Mon compte
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full px-4 py-3 text-left text-sm text-fuga-midnight transition-colors hover:bg-fuga-offwhite"
          >
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  );
}
