"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BudgetSlider } from "@/components/budget-slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdvancedSearchFiltersProps = {
  countries: string[];
  departureLabels: string[];
  tags: string[];
};

const budgetMin = 150;
const budgetMax = 750;
const budgetStep = 10;

const badgeOptions = [
  { value: "", label: "Tous" },
  { value: "Flash", label: "Flash" },
  { value: "-28%", label: "-28%" },
  { value: "-15%", label: "-15%" },
  { value: "Nouveau", label: "Nouveau" }
];

const durationOptions = [
  { value: "", label: "Toutes" },
  { value: "3", label: "3j max" },
  { value: "4", label: "4j max" },
  { value: "5", label: "5j max" },
  { value: "7", label: "7j max" }
];

const seatsOptions = [
  { value: "", label: "Toutes" },
  { value: "2", label: "2+ places" },
  { value: "4", label: "4+ places" },
  { value: "6", label: "6+ places" },
  { value: "8", label: "8+ places" }
];

function buildUrl(pathname: string, searchParams: URLSearchParams) {
  const query = searchParams.toString();
  return `${pathname}${query ? `?${query}` : ""}` as Route;
}

export function AdvancedSearchFilters({
  countries,
  departureLabels,
  tags
}: AdvancedSearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCountry = searchParams.get("country") ?? "";
  const selectedDeparture = searchParams.get("departure") ?? "";
  const selectedBadge = searchParams.get("badge") ?? "";
  const selectedDuration = searchParams.get("duration") ?? "";
  const selectedSeats = searchParams.get("seats") ?? "";
  const selectedTag = searchParams.get("tag") ?? "";
  const rawBudget = Number(searchParams.get("budget") ?? "450");
  const selectedBudget = Number.isFinite(rawBudget)
    ? Math.min(Math.max(rawBudget, budgetMin), budgetMax)
    : 450;

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(buildUrl(pathname, params));
  }

  function clearAdvancedFilters() {
    const params = new URLSearchParams(searchParams.toString());
    ["country", "departure", "badge", "duration", "seats", "tag", "budget"].forEach((key) =>
      params.delete(key)
    );
    router.replace(buildUrl(pathname, params));
  }

  return (
    <Card className="space-y-5 p-5 lg:sticky lg:top-24">
      <div>
        <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">Filtres avancés</div>
        <h2 className="mt-1 font-display text-lg font-bold text-fuga-midnight">
          Affine ta recherche
        </h2>
        <p className="mt-2 text-sm leading-6 text-fuga-slate">
          Oriente les résultats par pays, durée, départ, budget et niveau d’urgence.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Pays
          </span>
          <select
            value={selectedCountry}
            onChange={(event) => updateParam("country", event.target.value)}
            className="h-11 w-full rounded-2xl border border-fuga-border bg-white px-3 text-sm text-fuga-midnight outline-none transition-colors focus:border-fuga-orange"
          >
            <option value="">Tous les pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Départ
          </span>
          <select
            value={selectedDeparture}
            onChange={(event) => updateParam("departure", event.target.value)}
            className="h-11 w-full rounded-2xl border border-fuga-border bg-white px-3 text-sm text-fuga-midnight outline-none transition-colors focus:border-fuga-orange"
          >
            <option value="">Toutes les dates</option>
            {departureLabels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Badge
          </span>
          <select
            value={selectedBadge}
            onChange={(event) => updateParam("badge", event.target.value)}
            className="h-11 w-full rounded-2xl border border-fuga-border bg-white px-3 text-sm text-fuga-midnight outline-none transition-colors focus:border-fuga-orange"
          >
            {badgeOptions.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
              Budget max
            </span>
            <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">
              {selectedBudget} CHF
            </Badge>
          </div>
          <BudgetSlider defaultValue={selectedBudget} min={budgetMin} max={budgetMax} step={budgetStep} />
        </div>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Durée
          </span>
          <select
            value={selectedDuration}
            onChange={(event) => updateParam("duration", event.target.value)}
            className="h-11 w-full rounded-2xl border border-fuga-border bg-white px-3 text-sm text-fuga-midnight outline-none transition-colors focus:border-fuga-orange"
          >
            {durationOptions.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Places dispo
          </span>
          <select
            value={selectedSeats}
            onChange={(event) => updateParam("seats", event.target.value)}
            className="h-11 w-full rounded-2xl border border-fuga-border bg-white px-3 text-sm text-fuga-midnight outline-none transition-colors focus:border-fuga-orange"
          >
            {seatsOptions.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-[0.08em] text-fuga-slate">
            Mot-clé
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateParam("tag", "")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                selectedTag
                  ? "border-fuga-border bg-white text-fuga-midnight hover:border-fuga-orange/40"
                  : "border-fuga-orange bg-fuga-orange text-white"
              )}
            >
              Tous
            </button>
            {tags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam("tag", tag)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  selectedTag === tag
                    ? "border-fuga-orange bg-fuga-orange text-white"
                    : "border-fuga-border bg-white text-fuga-midnight hover:border-fuga-orange/40"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-fuga-border pt-4">
        <button
          type="button"
          onClick={clearAdvancedFilters}
          className="rounded-full border border-fuga-border bg-white px-4 py-2 text-sm font-medium text-fuga-midnight transition-colors hover:border-fuga-orange/40 hover:text-fuga-orange"
        >
          Réinitialiser
        </button>
      </div>
    </Card>
  );
}
