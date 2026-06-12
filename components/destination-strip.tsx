import Link from "next/link";
import { destinations } from "@/lib/site-data";

export function DestinationStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {destinations.map((destination) => (
        <Link
          key={destination.name}
          href={`/recherche?destination=${encodeURIComponent(destination.name)}`}
          className="min-w-[146px] rounded-2xl border border-fuga-border bg-white p-3 transition-transform hover:-translate-y-0.5"
        >
          <div className="mb-3 h-24 rounded-xl border border-fuga-border bg-fuga-offwhite" />
          <div className="font-display text-sm font-bold text-fuga-midnight">
            {destination.name}
          </div>
          <div className="text-xs text-fuga-slate">{destination.offers} offres</div>
        </Link>
      ))}
    </div>
  );
}
