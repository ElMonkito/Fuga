"use client";

import { Search, CalendarDays, Coins } from "lucide-react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchStripProps = {
  variant?: "hero" | "bar";
  className?: string;
  defaultDestination?: string;
  defaultDates?: string;
  defaultBudget?: string;
};

export function SearchStrip({
  variant = "bar",
  className,
  defaultDestination = "",
  defaultDates = "",
  defaultBudget = ""
}: SearchStripProps) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = useMemo(
    () => ({
      destination: params.get("destination") ?? defaultDestination,
      dates: params.get("dates") ?? defaultDates,
      budget: params.get("budget") ?? defaultBudget
    }),
    [params, defaultBudget, defaultDates, defaultDestination]
  );

  const [destination, setDestination] = useState(initial.destination);
  const [dates, setDates] = useState(initial.dates);
  const [budget, setBudget] = useState(initial.budget || "2500");
  const budgetValue = Number(budget || "2500");
  const budgetMin = 120;
  const budgetMax = 5000;
  const budgetPercent = ((budgetValue - budgetMin) / (budgetMax - budgetMin)) * 100;

  useEffect(() => {
    setDestination(initial.destination);
    setDates(initial.dates);
    setBudget(initial.budget || "2500");
  }, [initial.destination, initial.dates, initial.budget]);

  function submitSearch() {
    const search = new URLSearchParams();
    if (destination) search.set("destination", destination);
    if (dates) search.set("dates", dates);
    if (budget) search.set("budget", budget);
    router.push((`/recherche${search.toString() ? `?${search.toString()}` : ""}` as Route));
  }

  const isHero = variant === "hero";

  return (
    <div className={cn("w-full rounded-2xl border border-fuga-border bg-white", className)}>
      <div className={cn("grid gap-px overflow-hidden rounded-2xl", isHero ? "md:grid-cols-[1fr_1fr_1fr_auto]" : "md:grid-cols-[1fr_1fr_1fr_auto]")}>
        <label className="flex items-center gap-2 border-b border-fuga-border px-4 py-3 text-sm text-fuga-slate md:border-b-0 md:border-r">
          <Search className="h-4 w-4 shrink-0" />
          <Input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Destination"
            className="h-auto border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </label>
        <label className="flex items-center gap-2 border-b border-fuga-border px-4 py-3 text-sm text-fuga-slate md:border-b-0 md:border-r">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <Input
            value={dates}
            onChange={(event) => setDates(event.target.value)}
            placeholder="Dates"
            className="h-auto border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </label>
        <label className="flex items-center gap-3 border-b border-fuga-border px-4 py-3 text-sm text-fuga-slate md:border-b-0 md:border-r">
          <Coins className="h-4 w-4 shrink-0" />
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <input
              type="range"
              min={budgetMin}
              max={budgetMax}
              step={10}
              value={budgetValue}
              onChange={(event) => setBudget(event.target.value)}
              aria-label="Budget"
              className="h-1 w-full appearance-none rounded-full accent-fuga-orange"
              style={{
                background: `linear-gradient(to right, #ff6a3d 0%, #ff6a3d ${Math.max(
                  0,
                  Math.min(100, budgetPercent)
                )}%, #d9dce6 ${Math.max(0, Math.min(100, budgetPercent))}%, #d9dce6 100%)`
              }}
            />
            <span className="shrink-0 font-medium text-fuga-midnight">{budget} CHF</span>
          </div>
        </label>
        <div className="p-2">
          <Button type="button" onClick={submitSearch} className="h-full w-full rounded-xl">
            Chercher
          </Button>
        </div>
      </div>
    </div>
  );
}
