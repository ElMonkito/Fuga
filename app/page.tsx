import { SiteHeader } from "@/components/site-header";
import { HomeDiscovery } from "@/components/home-discovery";
import type { CountryTile } from "@/components/country-explorer";
import { offers, primaryTagline, secondaryTagline } from "@/lib/site-data";

const heroImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&h=1400&q=92&fm=webp&crop=entropy";

const countryKeywords: Record<string, string[]> = {
  Portugal: ["Ville", "Nature", "Culture"],
  Espagne: ["Plage", "Ville", "Culture"],
  "République tchèque": ["Ville", "Culture", "Romantique"],
  "Pays-Bas": ["Ville", "Design", "Romantique"],
  Italie: ["Culture", "Ville", "Gastronomie"],
  Hongrie: ["Ville", "Nature", "Aventure"],
  Allemagne: ["Ville", "Aventure", "Culture"],
  Croatie: ["Plage", "Nature", "Aventure"]
};

function groupCountries() {
  const grouped = new Map<
    string,
    {
      name: string;
      offers: number;
      image: string;
      keywords: string[];
    }
  >();

  for (const offer of offers) {
    const entry = grouped.get(offer.country) ?? {
      name: offer.country,
      offers: 0,
      image: offer.image,
      keywords: countryKeywords[offer.country] ?? ["Ville", "Culture"]
    };

    entry.offers += 1;
    if (entry.offers === 1) {
      entry.image = offer.image;
    }

    grouped.set(offer.country, entry);
  }

  return [...grouped.values()].sort((a, b) => b.offers - a.offers || a.name.localeCompare(b.name));
}

const countryTiles: CountryTile[] = groupCountries();

export default async function HomePage() {
  return (
    <>
      <SiteHeader overlay showLogo={false} />
      <main className="bg-fuga-offwhite">
        <HomeDiscovery heroImage={heroImage} tagline={primaryTagline} subtitle={secondaryTagline} countries={countryTiles} />
      </main>
    </>
  );
}
