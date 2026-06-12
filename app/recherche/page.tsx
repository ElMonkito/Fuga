import { SearchStrip } from "@/components/search-strip";
import { SiteHeader } from "@/components/site-header";
import { BudgetSlider } from "@/components/budget-slider";
import { OfferCard } from "@/components/offer-card";
import { Badge } from "@/components/ui/badge";
import { getOffers } from "@/lib/queries";
import { Card } from "@/components/ui/card";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const destination = typeof params.destination === "string" ? params.destination : "";
  const budget = typeof params.budget === "string" ? Number(params.budget) : 2500;
  const dates = typeof params.dates === "string" ? params.dates : "";
  const offers = await getOffers();

  const filtered = offers.filter((offer) => {
    const destinationMatch =
      !destination || offer.destination.toLowerCase().includes(destination.toLowerCase());
    const budgetMatch = !budget || offer.priceFrom <= budget;
    return destinationMatch && budgetMatch;
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
          <BudgetSlider defaultValue={budget || 2500} />
          <div className="flex flex-wrap gap-2">
            <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">Tous</Badge>
            <Badge>Ce weekend</Badge>
            <Badge>Semaine prochaine</Badge>
            <Badge>-48h</Badge>
          </div>
        </div>

        <section className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
          <Card className="p-5">
            <div className="font-display text-lg font-bold text-fuga-midnight">Filtres rapides</div>
            <p className="mt-2 text-sm leading-6 text-fuga-slate">
              La hiérarchie des filtres reste simple, avec le budget visible en premier et les
              filtres temporels immédiatement accessibles.
            </p>
            <div className="mt-4 space-y-3 text-sm text-fuga-midnight">
              <div className="rounded-2xl border border-fuga-border bg-white p-4">
                <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Départ</div>
                <div className="mt-1">{dates || "N’importe quand"}</div>
              </div>
              <div className="rounded-2xl border border-fuga-border bg-white p-4">
                <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Budget</div>
                <div className="mt-1">{budget} CHF</div>
              </div>
            </div>
          </Card>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-fuga-slate">Résultats</div>
                <h1 className="font-display text-2xl font-bold text-fuga-midnight">
                  {filtered.length} offre(s) disponible(s)
                </h1>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
