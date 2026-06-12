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
        <div
          className={
            offer.theme === "dark"
              ? "flex h-28 items-end bg-fuga-midnight p-4 text-fuga-offwhite"
              : "flex h-28 items-end bg-fuga-offwhite p-4 text-fuga-midnight"
          }
        >
          <div className="h-12 w-12 rounded-full border border-current/10 bg-current/5" />
        </div>
        <CardBody className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-base font-bold">{offer.destination}</div>
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
