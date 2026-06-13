import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FavoriteToggleButton } from "@/components/favorite-toggle-button";
import { formatChf } from "@/lib/utils";
import type { Offer } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Route } from "next";

type SearchOfferRowProps = {
  offer: Offer;
  authenticated: boolean;
  favorited: boolean;
  queryString?: string;
};

function getHotelLabel(offer: Offer) {
  const label = offer.plans[0]?.included.find((item) => item.includes("*"));
  return label ?? "Hôtel";
}

function getStars(offer: Offer) {
  if (offer.badge === "Flash") return 4.8;
  if (offer.badge === "-28%") return 4.6;
  if (offer.badge === "-15%") return 4.5;
  return 4.7;
}

export function SearchOfferRow({ offer, authenticated, favorited, queryString = "" }: SearchOfferRowProps) {
  const stars = getStars(offer);
  const offerHref = `/offres/${offer.slug}${queryString ? `?${queryString}` : ""}` as Route;

  return (
    <Card
      data-testid="search-offer-row"
      className="overflow-hidden border-fuga-border transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col sm:flex-row">
        <Link href={offerHref} className="group block sm:w-72 sm:shrink-0">
          <div className="relative h-56 sm:h-full">
            <img
              src={offer.image}
              alt={`${offer.destination}, ${offer.country}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute left-4 top-4">
              <Badge
                className={cn(
                  offer.badge === "Flash"
                    ? "border-fuga-orange bg-fuga-orange/10 text-fuga-orange"
                    : "border-white/20 bg-white/15 text-white"
                )}
              >
                {offer.badge}
              </Badge>
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
          <Link href={offerHref} className="block">
            <div className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-fuga-slate">
                    {offer.country}
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-fuga-midnight">
                    {offer.title}
                  </div>
                  <div className="mt-1 text-sm text-fuga-slate">{offer.subtitle}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">
                    Prix dès
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-fuga-orange">
                    {formatChf(offer.priceFrom)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-fuga-midnight">
                    <span>{stars.toFixed(1)}</span>
                    <span className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={cn(
                            "h-4 w-4",
                            index < Math.round(stars)
                              ? "fill-fuga-orange text-fuga-orange"
                              : "text-fuga-border"
                          )}
                        />
                      ))}
                    </span>
                  </div>
                  <span className="text-sm text-fuga-slate">{getHotelLabel(offer)}</span>
                </div>

                <div className="text-sm text-fuga-slate">
                  {offer.durationDays} jours · {offer.departureLabel} · {offer.seatsLeft} places
                  dispo
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-4 border-t border-fuga-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {offer.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-fuga-offwhite px-3 py-1 text-xs font-medium text-fuga-midnight"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-end gap-2 sm:items-end">
              <FavoriteToggleButton
                offerId={offer.id}
                offerSlug={offer.slug}
                initialFavorited={favorited}
                authenticated={authenticated}
                compact
              />
              <Link
                href={offerHref}
                className="inline-flex items-center gap-2 self-end rounded-full bg-fuga-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-fuga-orange/90"
              >
                Voir l’offre
                <ArrowRight className="h-4 w-4 transition-transform hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
