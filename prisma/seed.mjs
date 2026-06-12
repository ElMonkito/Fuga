import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const offers = [
  {
    slug: "lisbonne",
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
    tags: ["Flash", "Annulation gratuite", "Week-end"]
  },
  {
    slug: "barcelone",
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
    tags: ["-28%", "Long week-end", "Centre ville"]
  },
  {
    slug: "prague",
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
    tags: ["-15%", "5 jours", "Culture"]
  },
  {
    slug: "amsterdam",
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
    tags: ["Flash", "2 places", "Romantique"]
  }
];

function generateBookingReference() {
  const stamp = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(new Date())
    .replaceAll("-", "");
  const random = Math.floor(100 + Math.random() * 900);
  return `FG-${stamp}-${random}`;
}

async function main() {
  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { slug: offer.slug },
      update: {
        destination: offer.destination,
        country: offer.country,
        heroIcon: offer.heroIcon,
        title: offer.title,
        subtitle: offer.subtitle,
        priceFrom: offer.priceFrom,
        originalPrice: offer.originalPrice,
        durationDays: offer.durationDays,
        departureLabel: offer.departureLabel,
        dateLabel: offer.dateLabel,
        seatsLeft: offer.seatsLeft,
        badge: offer.badge,
        theme: offer.theme,
        summary: offer.summary,
        highlights: offer.highlights,
        plans: offer.plans,
        tags: offer.tags
      },
      create: {
        slug: offer.slug,
        destination: offer.destination,
        country: offer.country,
        heroIcon: offer.heroIcon,
        title: offer.title,
        subtitle: offer.subtitle,
        priceFrom: offer.priceFrom,
        originalPrice: offer.originalPrice,
        durationDays: offer.durationDays,
        departureLabel: offer.departureLabel,
        dateLabel: offer.dateLabel,
        seatsLeft: offer.seatsLeft,
        badge: offer.badge,
        theme: offer.theme,
        summary: offer.summary,
        highlights: offer.highlights,
        plans: offer.plans,
        tags: offer.tags
      }
    });
  }

  const passwordHash = await bcrypt.hash("Password123!", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@fuga.ch" },
    update: {
      name: "Demo User",
      firstName: "Demo",
      lastName: "User",
      passwordHash
    },
    create: {
      name: "Demo User",
      firstName: "Demo",
      lastName: "User",
      email: "demo@fuga.ch",
      passwordHash
    }
  });

  const lisbonne = await prisma.offer.findUnique({
    where: { slug: "lisbonne" }
  });

  if (lisbonne) {
    const existing = await prisma.booking.findFirst({
      where: { reference: "FG-20260614-042" }
    });

    if (!existing) {
      await prisma.booking.create({
        data: {
          reference: "FG-20260614-042",
          offerId: lisbonne.id,
          userId: user.id,
          planId: "scholar",
          planName: "Scholar",
          planPrice: 189,
          taxes: 18,
          total: 396,
          people: 2,
          rooms: 1,
          departureDate: new Date("2026-06-14T08:00:00.000Z"),
          returnDate: new Date("2026-06-17T17:00:00.000Z"),
          guestFirstName: "Demo",
          guestLastName: "User",
          guestEmail: "demo@fuga.ch",
          guestPhone: "+41 79 555 00 42",
          status: "CONFIRMED",
          paymentMethod: "TWINT",
          paymentStatus: "SUCCEEDED",
          payment: {
            create: {
              method: "TWINT",
              status: "SUCCEEDED",
              providerRef: generateBookingReference()
            }
          }
        }
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
