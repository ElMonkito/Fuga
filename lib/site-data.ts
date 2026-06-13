import { slugify } from "@/lib/utils";

export type OfferPlan = {
  id: string;
  name: string;
  price: number;
  seatsLeft: number;
  included: string[];
  description: string;
};

export type Offer = {
  id: string;
  slug: string;
  destination: string;
  country: string;
  heroIcon: string;
  title: string;
  subtitle: string;
  priceFrom: number;
  originalPrice: number;
  durationDays: number;
  departureLabel: string;
  dateLabel: string;
  seatsLeft: number;
  badge: "Flash" | "-28%" | "-15%" | "Nouveau";
  theme: "dark" | "light";
  summary: string;
  highlights: string[];
  plans: OfferPlan[];
  tags: string[];
  image: string;
};

type CityBlueprint = {
  slug: string;
  destination: string;
  country: string;
  heroIcon: string;
  basePrice: number;
  originalPrice: number;
  durationDays: number;
  departureLabel: string;
  seatsLeft: number;
  badge: Offer["badge"];
  theme: Offer["theme"];
  summary: string;
  highlights: string[];
  tags: string[];
  image: string;
  variants: number;
};

type VariantBlueprint = {
  key: string;
  suffix: string;
  badge: Offer["badge"];
  theme: Offer["theme"];
  departureLabel: string;
  priceBoost: number;
  durationBoost: number;
  seatsBoost: number;
  note: string;
  tag: string;
};

export const primaryTagline = "Partis en moins de cinq minutes.";
export const secondaryTagline = "L'escapade qui n'attendait que toi.";

function unsplashImage(photoId: string, width = 1800, height = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=92&fm=webp&crop=entropy`;
}

const offerImages = {
  lisbonne: unsplashImage("photo-1505761671935-60b3a7427bad"),
  barcelone: unsplashImage("photo-1507525428034-b723cf961d3e"),
  prague: unsplashImage("photo-1467269204594-9661b134dd2b"),
  amsterdam: unsplashImage("photo-1512453979798-5ea266f8880c"),
  rome: unsplashImage("photo-1479839672679-a46483c0e7c8"),
  budapest: unsplashImage("photo-1494526585095-c41746248156"),
  berlin: unsplashImage("photo-1493836512294-502baa1986e2"),
  dubrovnik: unsplashImage("photo-1500375592092-40eb2168fd21")
} as const;

const cities: CityBlueprint[] = [
  {
    slug: "lisbonne",
    destination: "Lisbonne",
    country: "Portugal",
    heroIcon: "mountain",
    basePrice: 189,
    originalPrice: 260,
    durationDays: 4,
    departureLabel: "Vendredi",
    seatsLeft: 4,
    badge: "Flash",
    theme: "dark",
    summary:
      "Une échappée compacte pensée pour partir vite, payer simplement et profiter d’un rythme intense sans surplanification.",
    highlights: [
      "Hôtel central à 12 minutes du centre historique, petit-déjeuner inclus et annulation flexible.",
      "Vol direct depuis Zurich avec bagage cabine et créneau de départ validé en moins de cinq minutes.",
      "Itinéraire optimisé pour un long week-end avec restaurants, miradouros et temps libre condensés."
    ],
    tags: ["Flash", "Annulation gratuite", "Week-end"],
    image: offerImages.lisbonne,
    variants: 5
  },
  {
    slug: "barcelone",
    destination: "Barcelone",
    country: "Espagne",
    heroIcon: "sunrise",
    basePrice: 245,
    originalPrice: 340,
    durationDays: 3,
    departureLabel: "Samedi",
    seatsLeft: 8,
    badge: "-28%",
    theme: "light",
    summary:
      "Une option rapide et très liquide, idéale pour des réservations de dernière minute avec un bon équilibre prix-confort.",
    highlights: [
      "Hôtel design près d’Eixample et lignes de transport directes vers les points d’intérêt.",
      "Fenêtre de départ flexible, utile pour ajuster la réservation à la dernière minute.",
      "Circuit court pensé pour une exécution mobile-first avec peu de frictions."
    ],
    tags: ["-28%", "Long week-end", "Centre ville"],
    image: offerImages.barcelone,
    variants: 5
  },
  {
    slug: "prague",
    destination: "Prague",
    country: "République tchèque",
    heroIcon: "castle",
    basePrice: 319,
    originalPrice: 375,
    durationDays: 5,
    departureLabel: "Jeudi",
    seatsLeft: 12,
    badge: "-15%",
    theme: "light",
    summary:
      "Un séjour plus ample, utile pour les utilisateurs qui veulent quelques jours supplémentaires sans quitter le format spontané.",
    highlights: [
      "Hébergement proche du centre avec transfert optimisé depuis l’aéroport.",
      "Tarification stable et visibilité claire sur les coûts avant paiement.",
      "Ciblé pour une réservation rapide sans casser la promesse de simplicité."
    ],
    tags: ["-15%", "5 jours", "Culture"],
    image: offerImages.prague,
    variants: 5
  },
  {
    slug: "amsterdam",
    destination: "Amsterdam",
    country: "Pays-Bas",
    heroIcon: "canal",
    basePrice: 279,
    originalPrice: 350,
    durationDays: 3,
    departureLabel: "Vendredi",
    seatsLeft: 2,
    badge: "Flash",
    theme: "dark",
    summary:
      "Une option plus exclusive, idéale quand la rareté doit être visible immédiatement dans l’interface.",
    highlights: [
      "Offre très limitée pour renforcer le sentiment d’urgence sans complexifier la page.",
      "Trajet court, hébergement central et CTA de réservation immédiatement accessible.",
      "Adaptée à une navigation minimaliste et orientée décision."
    ],
    tags: ["Flash", "2 places", "Romantique"],
    image: offerImages.amsterdam,
    variants: 5
  },
  {
    slug: "rome",
    destination: "Rome",
    country: "Italie",
    heroIcon: "landmark",
    basePrice: 289,
    originalPrice: 355,
    durationDays: 4,
    departureLabel: "Lundi",
    seatsLeft: 7,
    badge: "Nouveau",
    theme: "light",
    summary:
      "Un city-break premium très lisible, parfait pour enrichir le catalogue avec une destination iconique et mobile-friendly.",
    highlights: [
      "Hôtel bien connecté entre Termini et le centre, idéal pour maximiser les visites.",
      "Vols réguliers et rythme de séjour équilibré entre spots majeurs et temps libre.",
      "Produit pensé pour un achat rapide avec perception premium immédiate."
    ],
    tags: ["Nouveau", "Culture", "Printemps"],
    image: offerImages.rome,
    variants: 4
  },
  {
    slug: "budapest",
    destination: "Budapest",
    country: "Hongrie",
    heroIcon: "sparkles",
    basePrice: 229,
    originalPrice: 299,
    durationDays: 4,
    departureLabel: "Mercredi",
    seatsLeft: 10,
    badge: "-15%",
    theme: "dark",
    summary:
      "Une destination très compétitive, utile pour densifier les offres moyen-budget avec une bonne profondeur de stock.",
    highlights: [
      "Hébergement proche des bains et du Danube, avec accès rapide au cœur de ville.",
      "Offre bien calibrée pour les voyageurs sensibles au prix sans renoncer à la qualité.",
      "Bon niveau de disponibilité pour tester les filtres et les parcours de booking."
    ],
    tags: ["-15%", "Thermes", "Bon plan"],
    image: offerImages.budapest,
    variants: 4
  },
  {
    slug: "berlin",
    destination: "Berlin",
    country: "Allemagne",
    heroIcon: "building",
    basePrice: 259,
    originalPrice: 330,
    durationDays: 3,
    departureLabel: "Jeudi",
    seatsLeft: 6,
    badge: "Nouveau",
    theme: "light",
    summary:
      "Une destination urbaine très adaptée à la cible 25-35, parfaite pour enrichir l’univers produit avec une vibe plus créative.",
    highlights: [
      "Hôtel design à l’est de Mitte avec accès rapide aux quartiers cafés et galeries.",
      "Format court très adapté aux départs spontanés de fin de semaine.",
      "Offre pensée pour les utilisateurs qui veulent décider vite sur une ville forte en identité."
    ],
    tags: ["Nouveau", "Weekend", "Creative city"],
    image: offerImages.berlin,
    variants: 4
  },
  {
    slug: "dubrovnik",
    destination: "Dubrovnik",
    country: "Croatie",
    heroIcon: "waves",
    basePrice: 339,
    originalPrice: 430,
    durationDays: 5,
    departureLabel: "Dimanche",
    seatsLeft: 5,
    badge: "Flash",
    theme: "dark",
    summary:
      "Une destination mer et soleil pour diversifier le seed avec un panier moyen un peu plus haut et une vraie sensation d’évasion.",
    highlights: [
      "Hôtel avec vue mer et navette pratique depuis l’aéroport.",
      "Séjour plus long pour tester les cas de booking hors week-end classique.",
      "Excellente offre pour valoriser le positionnement escapade premium."
    ],
    tags: ["Flash", "Soleil", "5 jours"],
    image: offerImages.dubrovnik,
    variants: 3
  }
];

const variants: VariantBlueprint[] = [
  {
    key: "base",
    suffix: "",
    badge: "Flash",
    theme: "dark",
    departureLabel: "Vendredi",
    priceBoost: 0,
    durationBoost: 0,
    seatsBoost: 0,
    note: "édition signature",
    tag: "Point d'entrée"
  },
  {
    key: "express",
    suffix: "Express",
    badge: "-28%",
    theme: "light",
    departureLabel: "Samedi",
    priceBoost: 25,
    durationBoost: -1,
    seatsBoost: 0,
    note: "départ rapide",
    tag: "Rapide"
  },
  {
    key: "panorama",
    suffix: "Panorama",
    badge: "-15%",
    theme: "light",
    departureLabel: "Jeudi",
    priceBoost: 55,
    durationBoost: 1,
    seatsBoost: 1,
    note: "plus de temps sur place",
    tag: "Panorama"
  },
  {
    key: "signature",
    suffix: "Signature",
    badge: "Nouveau",
    theme: "dark",
    departureLabel: "Lundi",
    priceBoost: 90,
    durationBoost: 1,
    seatsBoost: 2,
    note: "version équilibrée",
    tag: "Signature"
  },
  {
    key: "luxe",
    suffix: "Luxe",
    badge: "Flash",
    theme: "dark",
    departureLabel: "Dimanche",
    priceBoost: 140,
    durationBoost: 2,
    seatsBoost: 3,
    note: "version premium",
    tag: "Luxe"
  }
];

function clampSeatsLeft(value: number) {
  return Math.max(1, value);
}

function buildPlans(title: string, priceFrom: number, seatsLeft: number): OfferPlan[] {
  return [
    {
      id: "scholar",
      name: "Scholar",
      price: priceFrom,
      seatsLeft,
      description: `Le meilleur point d’entrée pour ${title.toLowerCase()}.`,
      included: ["Vol A/R", "Hôtel 3*", "Annulation gratuite"]
    },
    {
      id: "premium",
      name: "Premium",
      price: priceFrom + 60,
      seatsLeft: clampSeatsLeft(seatsLeft - 1),
      description: `Plus de confort et une chambre mieux placée pour ${title.toLowerCase()}.`,
      included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
    },
    {
      id: "local",
      name: "Local",
      price: priceFrom + 120,
      seatsLeft: clampSeatsLeft(seatsLeft - 2),
      description: `La formule la plus complète pour ${title.toLowerCase()}.`,
      included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
    }
  ];
}

function buildOffer(city: CityBlueprint, variant: VariantBlueprint): Offer {
  const durationDays = Math.max(2, city.durationDays + variant.durationBoost);
  const priceFrom = city.basePrice + variant.priceBoost;
  const seatsLeft = clampSeatsLeft(city.seatsLeft - variant.seatsBoost);
  const title = variant.key === "base" ? city.destination : `${city.destination} ${variant.suffix}`;
  const slug = variant.key === "base" ? city.slug : slugify(title);

  return {
    id: slug,
    slug,
    destination: city.destination,
    country: city.country,
    heroIcon: city.heroIcon,
    title,
    subtitle: `${durationDays} jours · départ ${variant.departureLabel} · ${variant.note}`,
    priceFrom,
    originalPrice: Math.max(city.originalPrice, Math.round(priceFrom * 1.28)),
    durationDays,
    departureLabel: variant.departureLabel,
    dateLabel: `${durationDays} jours`,
    seatsLeft,
    badge: variant.badge,
    theme: variant.theme,
    summary: city.summary,
    highlights: city.highlights,
    plans: buildPlans(title, priceFrom, seatsLeft),
    tags: [variant.tag, ...city.tags.slice(0, 2)],
    image: city.image
  };
}

export const offers: Offer[] = cities.flatMap((city) => {
  const cityVariants = variants.slice(0, city.variants);
  return cityVariants.map((variant) => buildOffer(city, variant));
});

export const destinations = Array.from(
  offers.reduce((map, offer) => {
    const entry = map.get(offer.destination) ?? {
      name: offer.destination,
      country: offer.country,
      offers: 0
    };
    entry.offers += 1;
    map.set(offer.destination, entry);
    return map;
  }, new Map<string, { name: string; country: string; offers: number }>())
  .values()
).sort((a, b) => a.name.localeCompare(b.name));

export function getOfferImage(slug: string) {
  return offers.find((offer) => offer.slug === slug)?.image ?? offerImages.lisbonne;
}

export function findOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}

export function searchOffers({
  destination,
  budget,
  flashOnly
}: {
  destination?: string;
  budget?: number;
  flashOnly?: boolean;
}) {
  return offers.filter((offer) => {
    const destinationMatch =
      !destination || offer.destination.toLowerCase().includes(destination.toLowerCase());
    const budgetMatch = !budget || offer.priceFrom <= budget;
    const flashMatch = !flashOnly || offer.badge === "Flash";
    return destinationMatch && budgetMatch && flashMatch;
  });
}
