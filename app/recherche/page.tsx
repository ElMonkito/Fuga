import { SearchStrip } from "@/components/search-strip";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { getOffers } from "@/lib/queries";
import { SearchOfferRow } from "@/components/search-offer-row";
import { AdvancedSearchFilters } from "@/components/advanced-search-filters";
import { getUserFavorites } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const destination = typeof params.destination === "string" ? params.destination : "";
  const rawBudget = typeof params.budget === "string" ? Number(params.budget) : 450;
  const budget = Number.isFinite(rawBudget) ? Math.min(Math.max(rawBudget, 150), 750) : 450;
  const dates = typeof params.dates === "string" ? params.dates : "";
  const country = typeof params.country === "string" ? params.country : "";
  const departure = typeof params.departure === "string" ? params.departure : "";
  const badge = typeof params.badge === "string" ? params.badge : "";
  const duration = typeof params.duration === "string" ? Number(params.duration) : 0;
  const seats = typeof params.seats === "string" ? Number(params.seats) : 0;
  const tag = typeof params.tag === "string" ? params.tag : "";
  const session = await auth();
  const offers = await getOffers();
  const favoriteIds = session?.user?.id
    ? new Set((await getUserFavorites(session.user.id)).map((favorite) => favorite.offerId))
    : new Set<string>();
  const countries = [...new Set(offers.map((offer) => offer.country))].sort((a, b) =>
    a.localeCompare(b)
  );
  const departureLabels = [...new Set(offers.map((offer) => offer.departureLabel))].sort((a, b) =>
    a.localeCompare(b)
  );
  const tags = [...new Set(offers.flatMap((offer) => offer.tags))].sort((a, b) =>
    a.localeCompare(b)
  );

  const filtered = offers.filter((offer) => {
    const destinationMatch =
      !destination ||
      offer.destination.toLowerCase().includes(destination.toLowerCase()) ||
      offer.country.toLowerCase().includes(destination.toLowerCase());
    const budgetMatch = !budget || offer.priceFrom <= budget;
    const countryMatch = !country || offer.country === country;
    const departureMatch = !departure || offer.departureLabel === departure;
    const badgeMatch = !badge || offer.badge === badge;
    const durationMatch = !duration || offer.durationDays <= duration;
    const seatsMatch = !seats || offer.seatsLeft >= seats;
    const tagMatch =
      !tag || offer.tags.some((item) => item === tag || item.toLowerCase().includes(tag.toLowerCase()));

    return (
      destinationMatch &&
      budgetMatch &&
      countryMatch &&
      departureMatch &&
      badgeMatch &&
      durationMatch &&
      seatsMatch &&
      tagMatch
    );
  });

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-8">
        <div className="space-y-4">
          <SearchStrip
            variant="bar"
            defaultDestination={destination}
            defaultDates={dates}
            defaultBudget={String(budget || "")}
          />
          <div className="flex flex-wrap gap-2">
            <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">Tous</Badge>
            <Badge>Ce weekend</Badge>
            <Badge>Semaine prochaine</Badge>
            <Badge>-48h</Badge>
          </div>
        </div>

        <section className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
          <AdvancedSearchFilters
            countries={countries}
            departureLabels={departureLabels}
            tags={tags}
          />

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">Résultats</div>
                <h1 className="font-display text-2xl font-bold text-fuga-midnight">
                  {filtered.length} offre(s) disponible(s)
                </h1>
                <div className="mt-2 text-sm text-fuga-slate">
                  {dates || country || badge || departure || tag || duration || seats
                    ? "Tes filtres sont actifs et la liste s’ajuste en temps réel."
                    : "Aucun filtre avancé n’est actif pour l’instant."}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filtered.length ? (
                filtered.map((offer) => (
                  <SearchOfferRow
                    key={offer.slug}
                    offer={offer}
                    authenticated={Boolean(session?.user?.id)}
                    favorited={favoriteIds.has(offer.id)}
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-fuga-border bg-white p-8 text-center">
                  <div className="font-display text-xl font-bold text-fuga-midnight">
                    Aucun résultat
                  </div>
                  <p className="mt-2 text-sm leading-6 text-fuga-slate">
                    Essaie d’élargir le budget, de retirer un mot-clé ou de changer le pays.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
