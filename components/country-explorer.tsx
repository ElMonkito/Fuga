"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type CountryTile = {
  name: string;
  offers: number;
  image: string;
  keywords: string[];
};

export function CountryExplorer({ countries }: { countries: CountryTile[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {countries.map((country) => (
        <Link
          key={country.name}
          href={`/recherche?destination=${encodeURIComponent(country.name)}`}
          data-testid="country-tile"
          className="group overflow-hidden rounded-[1.5rem] border border-fuga-border bg-white transition-transform hover:-translate-y-0.5"
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={country.image}
              alt={country.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {country.offers} offres disponibles
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-xs uppercase tracking-[0.16em] text-white/75">Pays</div>
              <div className="mt-1 font-display text-2xl font-bold">{country.name}</div>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-fuga-slate">Explorer</div>
                <div className="mt-1 text-sm leading-6 text-fuga-midnight">
                  Lance la recherche avec ce pays déjà sélectionné.
                </div>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fuga-slate transition-transform group-hover:translate-x-1" />
            </div>

            <div className="flex flex-wrap gap-2">
              {country.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-fuga-offwhite px-3 py-1 text-xs font-medium text-fuga-midnight"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
