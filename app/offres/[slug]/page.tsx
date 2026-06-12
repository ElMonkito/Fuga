import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { BookingConfigurator } from "@/components/booking-configurator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getOfferBySlug, getUserFavorites } from "@/lib/queries";
import { FavoriteToggleButton } from "@/components/favorite-toggle-button";
import { formatChf } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type OfferPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OfferPage({ params }: OfferPageProps) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  const session = await auth();
  const favoriteIds = session?.user?.id
    ? new Set((await getUserFavorites(session.user.id)).map((favorite) => favorite.offerId))
    : new Set<string>();
  const includedItems = Array.from(
    new Set(offer.plans.flatMap((plan) => plan.included).filter(Boolean))
  );

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-8">
        <section className="grid gap-6 xl:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative h-72 overflow-hidden">
              <img
                src={offer.image}
                alt={`${offer.destination}, ${offer.country}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                {offer.country}
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                <div>
                  <div className="text-xs uppercase tracking-[0.12em] text-white/75">
                    {offer.dateLabel}
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold leading-none">
                    {offer.title}
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    {offer.destination} · {offer.country}
                  </div>
                </div>
                <div className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xs font-medium">
                  {offer.departureLabel}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mt-1 text-sm text-fuga-slate">{offer.subtitle}</div>
                </div>
                <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">
                  {offer.badge}
                </Badge>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <div className="font-display text-3xl font-bold text-fuga-orange">
                  {formatChf(offer.priceFrom)}
                </div>
                <div className="text-sm text-fuga-slate line-through">
                  {formatChf(offer.originalPrice)}
                </div>
              </div>

              <div className="mt-4">
                <FavoriteToggleButton
                  offerId={offer.id}
                  offerSlug={offer.slug}
                  initialFavorited={favoriteIds.has(offer.id)}
                  authenticated={Boolean(session?.user?.id)}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {offer.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="mt-5 space-y-2 text-sm leading-6 text-fuga-slate">
                <div className="h-2 w-full rounded-full bg-black/5" />
                <div className="h-2 w-5/6 rounded-full bg-black/5" />
                <div className="h-2 w-11/12 rounded-full bg-black/5" />
              </div>

              <div className="mt-6 space-y-3">
                {offer.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-fuga-border bg-white p-4 text-sm leading-6 text-fuga-slate">
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-fuga-border bg-fuga-offwhite p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">
                      Inclus dans l’offre
                    </div>
                    <div className="mt-1 font-display text-lg font-bold text-fuga-midnight">
                      Ce qui est compris
                    </div>
                  </div>
                  <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">
                    {offer.plans.length} formule(s)
                  </Badge>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {includedItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white bg-white px-4 py-3 text-sm text-fuga-midnight shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Réservation</div>
                <div className="font-display text-lg font-bold text-fuga-midnight">
                  Sélectionne ta formule.
                </div>
              </div>
            </div>
            <BookingConfigurator
              offer={offer}
              guest={
                session?.user
                  ? {
                      firstName: session.user.firstName ?? "",
                      lastName: session.user.lastName ?? "",
                      email: session.user.email ?? ""
                    }
                  : undefined
              }
            />
          </Card>
        </section>
      </main>
    </>
  );
}
