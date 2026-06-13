"use client";

import { Search, Coins } from "lucide-react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRangePickerField } from "@/components/date-range-picker-field";

type SearchStripProps = {
  variant?: "hero" | "bar";
  className?: string;
  defaultDestination?: string;
  defaultDepartureDate?: string;
  defaultReturnDate?: string;
  defaultBudget?: string;
};

export function SearchStrip({
  variant = "bar",
  className,
  defaultDestination = "",
  defaultDepartureDate = "",
  defaultReturnDate = "",
  defaultBudget = ""
}: SearchStripProps) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = useMemo(
    () => ({
      destination: params.get("destination") ?? defaultDestination,
      departureDate: params.get("departureDate") ?? defaultDepartureDate,
      returnDate: params.get("returnDate") ?? defaultReturnDate,
      budget: params.get("budget") ?? defaultBudget
    }),
    [params, defaultBudget, defaultDepartureDate, defaultDestination, defaultReturnDate]
  );

  const [destination, setDestination] = useState(initial.destination);
  const [departureDate, setDepartureDate] = useState(initial.departureDate);
  const [returnDate, setReturnDate] = useState(initial.returnDate);
  const [budget, setBudget] = useState(initial.budget || "450");
  const budgetValue = Number(budget || "450");
  const budgetMin = 150;
  const budgetMax = 750;
  const budgetPercent = ((budgetValue - budgetMin) / (budgetMax - budgetMin)) * 100;

  useEffect(() => {
    setDestination(initial.destination);
    setDepartureDate(initial.departureDate);
    setReturnDate(initial.returnDate);
    setBudget(initial.budget || "450");
  }, [initial.destination, initial.departureDate, initial.returnDate, initial.budget]);

  function updateDepartureDate(nextValue: string) {
    setDepartureDate(nextValue);
    if (returnDate && nextValue && returnDate < nextValue) {
      setReturnDate("");
    }
  }

  function submitSearch() {
    const search = new URLSearchParams();
    if (destination) search.set("destination", destination);
    if (departureDate) search.set("departureDate", departureDate);
    if (returnDate) search.set("returnDate", returnDate);
    if (budget) search.set("budget", budget);
    router.push((`/recherche${search.toString() ? `?${search.toString()}` : ""}` as Route));
  }

  const isHero = variant === "hero";

  return (
    <div className={cn("w-full rounded-2xl border border-fuga-border bg-white", className)}>
      <div
        className={cn(
          "grid gap-px overflow-visible rounded-2xl",
          isHero ? "md:grid-cols-[1fr_1fr_1fr_auto]" : "md:grid-cols-[1fr_1fr_1fr_auto]"
        )}
      >
        <label className="flex items-center gap-2 border-b border-fuga-border px-4 py-3 text-sm text-fuga-slate md:border-b-0 md:border-r">
          <Search className="h-4 w-4 shrink-0" />
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Destination"
              aria-label="Destination"
              className="h-auto w-full border-0 bg-transparent px-0 focus-visible:outline-none"
            />
          </label>
        <div className="border-b border-fuga-border px-3 py-2 text-sm text-fuga-slate md:border-b-0 md:border-r">
          <DateRangePickerField
            departureDate={departureDate}
            returnDate={returnDate}
            onChange={({ departureDate: nextDepartureDate, returnDate: nextReturnDate }) => {
              updateDepartureDate(nextDepartureDate);
              setReturnDate(nextReturnDate);
            }}
            placeholder="Départ - Retour"
            minDate={undefined}
          />
        </div>
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
