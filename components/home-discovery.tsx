"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FugaLogo } from "@/components/fuga-logo";
import { CountryExplorer, type CountryTile } from "@/components/country-explorer";

type HomeDiscoveryProps = {
  heroImage: string;
  tagline: string;
  subtitle: string;
  countries: CountryTile[];
};

function scoreCountry(country: CountryTile, query: string) {
  if (!query) return 0;

  const name = country.name.toLowerCase();
  const keywords = country.keywords.map((keyword) => keyword.toLowerCase());
  const exactKeywordMatch = keywords.some((keyword) => keyword === query);
  const partialKeywordMatch = keywords.some((keyword) => keyword.includes(query) || query.includes(keyword));
  const nameMatch = name.includes(query);

  let score = 0;
  if (nameMatch) score += 4;
  if (exactKeywordMatch) score += 3;
  if (partialKeywordMatch) score += 2;
  if (name.startsWith(query)) score += 1;
  return score;
}

export function HomeDiscovery({ heroImage, tagline, subtitle, countries }: HomeDiscoveryProps) {
  const [query, setQuery] = useState("");

  const visibleCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [...countries].sort((a, b) => b.offers - a.offers || a.name.localeCompare(b.name));
    }

    return [...countries]
      .map((country) => ({ country, score: scoreCountry(country, normalized) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.country.offers - a.country.offers || a.country.name.localeCompare(b.country.name))
      .map((entry) => entry.country);
  }, [countries, query]);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={heroImage} alt="Vacances en bord de mer" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-fuga-offwhite" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <FugaLogo className="w-[120px] sm:w-[150px]" imageClassName="drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]" />
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
              {tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {subtitle} Tape un mot comme plage, ville ou Espagne et les pays juste en dessous
              s’ajustent instantanément.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-4xl rounded-[2rem] border border-white/20 bg-white/95 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-md">
              <label className="flex items-center gap-3 rounded-[1.5rem] border border-fuga-border bg-white px-5 py-4 text-fuga-slate">
                <Search className="h-5 w-5 shrink-0" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tape: plage, ville, Espagne, culture..."
                  className="h-auto w-full border-0 bg-transparent px-0 text-base text-fuga-midnight placeholder:text-fuga-slate/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="pt-0">
          <CountryExplorer countries={visibleCountries} />
        </div>
      </section>
    </>
  );
}
