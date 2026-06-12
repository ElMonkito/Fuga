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

export const primaryTagline = "Partis en moins de cinq minutes.";
export const secondaryTagline = "L'escapade qui n'attendait que toi.";

export const destinations = [
  { name: "Lisbonne", country: "Portugal", offers: 3 },
  { name: "Barcelone", country: "Espagne", offers: 5 },
  { name: "Prague", country: "République tchèque", offers: 2 },
  { name: "Amsterdam", country: "Pays-Bas", offers: 4 }
];

function unsplashImage(photoId: string) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`;
}

export const offerImages = {
  lisbonne: unsplashImage("photo-1505761671935-60b3a7427bad"),
  barcelone: unsplashImage("photo-1507525428034-b723cf961d3e"),
  prague: unsplashImage("photo-1467269204594-9661b134dd2b"),
  amsterdam: unsplashImage("photo-1512453979798-5ea266f8880c"),
  rome: unsplashImage("photo-1479839672679-a46483c0e7c8"),
  budapest: unsplashImage("photo-1494526585095-c41746248156"),
  berlin: unsplashImage("photo-1493836512294-502baa1986e2"),
  dubrovnik: unsplashImage("photo-1500375592092-40eb2168fd21")
} as const;

export function getOfferImage(slug: string) {
  return offerImages[slug as keyof typeof offerImages] ?? unsplashImage("photo-1500375592092-40eb2168fd21");
}

export const offers: Offer[] = [
  {
    id: "lisbonne",
    slug: slugify("Lisbonne"),
    destination: "Lisbonne",
    country: "Portugal",
    heroIcon: "mountain",
    title: "Lisbonne",
    subtitle: "4 jours · départ vendredi · 4 places restantes",
    priceFrom: 189,
    originalPrice: 260,
    durationDays: 4,
    departureLabel: "Vendredi",
    dateLabel: "4 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 189,
        seatsLeft: 4,
        description: "Le meilleur point d’entrée, avec l’essentiel des prestations.",
        included: ["Vol A/R", "Hôtel 3*", "Annulation gratuite"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 259,
        seatsLeft: 3,
        description: "Plus de confort, plus de marge et une meilleure chambre.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage soute"]
      },
      {
        id: "local",
        name: "Local",
        price: 320,
        seatsLeft: 2,
        description: "Pour ceux qui veulent plus d’espace et des extras premium.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["Flash", "Annulation gratuite", "Week-end"],
    image: offerImages.lisbonne
  },
  {
    id: "barcelone",
    slug: slugify("Barcelone"),
    destination: "Barcelone",
    country: "Espagne",
    heroIcon: "sunrise",
    title: "Barcelone",
    subtitle: "3 jours · départ samedi · disponibilité élevée",
    priceFrom: 245,
    originalPrice: 340,
    durationDays: 3,
    departureLabel: "Samedi",
    dateLabel: "3 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 245,
        seatsLeft: 8,
        description: "Le plus rapide à réserver, sans superflu.",
        included: ["Vol A/R", "Hôtel 3*", "Assistance 24/7"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 299,
        seatsLeft: 5,
        description: "Une chambre mieux placée et une marge de confort.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
      },
      {
        id: "local",
        name: "Local",
        price: 360,
        seatsLeft: 3,
        description: "Une version plus complète avec quelques extras utiles.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["-28%", "Long week-end", "Centre ville"],
    image: offerImages.barcelone
  },
  {
    id: "prague",
    slug: slugify("Prague"),
    destination: "Prague",
    country: "République tchèque",
    heroIcon: "castle",
    title: "Prague",
    subtitle: "5 jours · départ jeudi · places limitées",
    priceFrom: 319,
    originalPrice: 375,
    durationDays: 5,
    departureLabel: "Jeudi",
    dateLabel: "5 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 319,
        seatsLeft: 12,
        description: "Format compact avec le meilleur ratio vitesse/prix.",
        included: ["Vol A/R", "Hôtel 3*", "Annulation gratuite"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 379,
        seatsLeft: 6,
        description: "Une chambre supérieure pour un séjour plus confortable.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage soute"]
      },
      {
        id: "local",
        name: "Local",
        price: 440,
        seatsLeft: 4,
        description: "La version la plus complète avec transferts inclus.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["-15%", "5 jours", "Culture"],
    image: offerImages.prague
  },
  {
    id: "amsterdam",
    slug: slugify("Amsterdam"),
    destination: "Amsterdam",
    country: "Pays-Bas",
    heroIcon: "canal",
    title: "Amsterdam",
    subtitle: "3 jours · départ vendredi · 2 places restantes",
    priceFrom: 279,
    originalPrice: 350,
    durationDays: 3,
    departureLabel: "Vendredi",
    dateLabel: "3 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 279,
        seatsLeft: 2,
        description: "L’offre la plus directe pour réserver vite.",
        included: ["Vol A/R", "Hôtel 3*", "Assistance 24/7"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 339,
        seatsLeft: 2,
        description: "Plus de confort sur un stock déjà limité.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
      },
      {
        id: "local",
        name: "Local",
        price: 399,
        seatsLeft: 1,
        description: "La version la plus premium du lot.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["Flash", "2 places", "Romantique"],
    image: offerImages.amsterdam
  },
  {
    id: "rome",
    slug: slugify("Rome"),
    destination: "Rome",
    country: "Italie",
    heroIcon: "landmark",
    title: "Rome",
    subtitle: "4 jours · départ lundi · nouveau circuit",
    priceFrom: 289,
    originalPrice: 355,
    durationDays: 4,
    departureLabel: "Lundi",
    dateLabel: "4 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 289,
        seatsLeft: 7,
        description: "Un format simple et rentable pour découvrir Rome vite.",
        included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 349,
        seatsLeft: 5,
        description: "Plus de confort et un quartier mieux placé.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
      },
      {
        id: "local",
        name: "Local",
        price: 419,
        seatsLeft: 3,
        description: "Version complète avec extras pour un séjour plus fluide.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["Nouveau", "Culture", "Printemps"],
    image: offerImages.rome
  },
  {
    id: "budapest",
    slug: slugify("Budapest"),
    destination: "Budapest",
    country: "Hongrie",
    heroIcon: "sparkles",
    title: "Budapest",
    subtitle: "4 jours · départ mercredi · très bon deal",
    priceFrom: 229,
    originalPrice: 299,
    durationDays: 4,
    departureLabel: "Mercredi",
    dateLabel: "4 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 229,
        seatsLeft: 10,
        description: "Le meilleur prix du lot avec les fondamentaux couverts.",
        included: ["Vol A/R", "Hôtel 3*", "Assistance 24/7"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 289,
        seatsLeft: 7,
        description: "Plus de confort pour un écart de prix encore raisonnable.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
      },
      {
        id: "local",
        name: "Local",
        price: 349,
        seatsLeft: 4,
        description: "Une version plus expérientielle du séjour.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["-15%", "Thermes", "Bon plan"],
    image: offerImages.budapest
  },
  {
    id: "berlin",
    slug: slugify("Berlin"),
    destination: "Berlin",
    country: "Allemagne",
    heroIcon: "building",
    title: "Berlin",
    subtitle: "3 jours · départ jeudi · scène créative",
    priceFrom: 259,
    originalPrice: 330,
    durationDays: 3,
    departureLabel: "Jeudi",
    dateLabel: "3 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 259,
        seatsLeft: 6,
        description: "Le format express pour partir sans friction.",
        included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 319,
        seatsLeft: 4,
        description: "Plus de confort et meilleure localisation.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage cabine"]
      },
      {
        id: "local",
        name: "Local",
        price: 389,
        seatsLeft: 2,
        description: "Le package le plus premium pour profiter à fond.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["Nouveau", "Weekend", "Creative city"],
    image: offerImages.berlin
  },
  {
    id: "dubrovnik",
    slug: slugify("Dubrovnik"),
    destination: "Dubrovnik",
    country: "Croatie",
    heroIcon: "waves",
    title: "Dubrovnik",
    subtitle: "5 jours · départ dimanche · soleil garanti",
    priceFrom: 339,
    originalPrice: 430,
    durationDays: 5,
    departureLabel: "Dimanche",
    dateLabel: "5 jours",
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
    plans: [
      {
        id: "scholar",
        name: "Scholar",
        price: 339,
        seatsLeft: 5,
        description: "Une version bien placée pour profiter de la destination.",
        included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner"]
      },
      {
        id: "premium",
        name: "Premium",
        price: 409,
        seatsLeft: 3,
        description: "Confort renforcé et chambre mieux orientée.",
        included: ["Vol A/R", "Hôtel 4*", "Bagage soute"]
      },
      {
        id: "local",
        name: "Local",
        price: 489,
        seatsLeft: 2,
        description: "Version haut de gamme avec transferts et extras.",
        included: ["Vol A/R", "Hôtel 4*", "Transfert privé"]
      }
    ],
    tags: ["Flash", "Soleil", "5 jours"],
    image: offerImages.dubrovnik
  }
];

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
