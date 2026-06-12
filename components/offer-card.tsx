import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { formatChf } from "@/lib/utils";
import type { Offer } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Link href={`/offres/${offer.slug}`} className="group block">
      <Card className="overflow-hidden transition-transform group-hover:-translate-y-0.5">
        <div className="relative h-44 overflow-hidden">
          <img
            src={offer.image}
            alt={`${offer.destination}, ${offer.country}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <div className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              {offer.country}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-white/75">{offer.dateLabel}</div>
              <div className="mt-1 font-display text-2xl font-bold leading-none">{offer.title}</div>
              <div className="mt-1 text-xs text-white/75">
                {offer.destination} · {offer.country}
              </div>
            </div>
            <div className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xs font-medium">
              {offer.departureLabel}
            </div>
          </div>
        </div>
        <CardBody className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-fuga-slate">{offer.subtitle}</div>
            </div>
            <Badge
              className={
                offer.badge === "Flash"
                  ? "border-fuga-orange bg-fuga-orange/10 text-fuga-orange"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }
            >
              {offer.badge}
            </Badge>
          </div>
          <div className="flex items-center justify-between border-t border-fuga-border pt-2">
            <div>
              <div className="text-lg font-medium text-fuga-orange">{formatChf(offer.priceFrom)}</div>
              <div className="text-xs text-fuga-slate">{offer.seatsLeft} places dispo</div>
            </div>
            <ArrowRight className="h-4 w-4 text-fuga-slate transition-transform group-hover:translate-x-1" />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
