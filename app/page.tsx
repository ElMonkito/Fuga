import Link from "next/link";
import { DestinationStrip } from "@/components/destination-strip";
import { OfferCard } from "@/components/offer-card";
import { SearchStrip } from "@/components/search-strip";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { primaryTagline, secondaryTagline, offers } from "@/lib/site-data";

export default async function HomePage() {
  const featured = offers.slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-fuga-border bg-fuga-midnight p-6 text-fuga-offwhite sm:p-8">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">FUGA</div>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
                {primaryTagline}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-fuga-offwhite/75 sm:text-base">
                {secondaryTagline} Réserve un vol, un hôtel et un mode de paiement en quelques
                gestes, sans perdre le rythme.
              </p>
            </div>
            <div className="mt-8">
              <SearchStrip variant="hero" />
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="flex h-full min-h-[360px] items-end bg-fuga-offwhite p-6">
              <div className="space-y-4">
                <div className="font-display text-2xl font-bold text-fuga-midnight">
                  Voyager spontanément, sans perdre le contrôle.
                </div>
                <p className="max-w-sm text-sm leading-6 text-fuga-slate">
                  Sélection éditoriale de départs rapides, prix visibles immédiatement et parcours
                  mobile pensé pour un temps de décision minimal.
                </p>
                <div className="flex gap-3">
                  <Button href="/recherche">Voir les offres</Button>
                  <Button href="/login" variant="outline">
                    Connexion
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-10 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">
                Destinations tendance
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold text-fuga-midnight">
                Les départs les plus rapides.
              </h2>
            </div>
            <Link href="/recherche" className="hidden text-sm font-medium text-fuga-orange sm:block">
              Tout voir
            </Link>
          </div>
          <DestinationStrip />
        </section>

        <section className="mt-10 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">
                Offres mises en avant
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold text-fuga-midnight">
                Choisis et pars.
              </h2>
            </div>
            <Link href="/recherche" className="text-sm font-medium text-fuga-orange">
              Rechercher
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
