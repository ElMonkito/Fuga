import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { BookingConfigurator } from "@/components/booking-configurator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getOfferBySlug } from "@/lib/queries";
import { formatChf } from "@/lib/utils";

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

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-8">
        <section className="grid gap-6 xl:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="flex h-28 items-end bg-fuga-midnight px-5 py-4 text-fuga-offwhite">
              <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-2xl font-bold text-fuga-midnight">
                    {offer.destination}
                  </div>
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
