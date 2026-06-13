import { prisma } from "@/lib/db";
import { getOfferImage, offers as siteOffers, type Offer, type OfferPlan } from "@/lib/site-data";
import type { Offer as PrismaOffer, Prisma } from "@/generated/prisma/client";

type OfferRecord = PrismaOffer;

const siteOffersBySlug = new Map(siteOffers.map((offer) => [offer.slug, offer]));
const OFFER_QUERY_TIMEOUT_MS = 2_500;
const allowStaticOfferFallback =
  process.env.NODE_ENV !== "production" || process.env.ALLOW_STATIC_OFFER_FALLBACK === "true";

function sortOffers<T extends { priceFrom: number; seatsLeft: number }>(offers: T[]) {
  return [...offers].sort((left, right) => {
    if (left.priceFrom !== right.priceFrom) {
      return left.priceFrom - right.priceFrom;
    }

    return right.seatsLeft - left.seatsLeft;
  });
}

function fallbackOffers() {
  return sortOffers(siteOffers);
}

function isRecoverableOfferError(error: unknown) {
  if (!allowStaticOfferFallback) {
    return false;
  }

  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name.includes("Prisma") ||
    error.message.includes("OFFER_QUERY_TIMEOUT") ||
    error.message.includes("prisma.offer") ||
    error.message.includes("ETIMEDOUT") ||
    error.message.includes("Can't reach database server")
  );
}

async function withOfferQueryTimeout<T>(promise: Promise<T>) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("OFFER_QUERY_TIMEOUT"));
      }, OFFER_QUERY_TIMEOUT_MS);

      promise.finally(() => clearTimeout(timeoutId)).catch(() => clearTimeout(timeoutId));
    })
  ]);
}

function parsePlans(value: Prisma.JsonValue): OfferPlan[] {
  return Array.isArray(value) ? (value as OfferPlan[]) : [];
}

function parseStrings(value: Prisma.JsonValue): string[] {
  return Array.isArray(value) ? (value as string[]) : [];
}

export function toSiteOffer(record: OfferRecord): Offer {
  const siteOffer = siteOffersBySlug.get(record.slug);

  return {
    id: record.id,
    slug: record.slug,
    destination: record.destination,
    country: record.country,
    heroIcon: record.heroIcon,
    title: record.title,
    subtitle: record.subtitle,
    priceFrom: record.priceFrom,
    originalPrice: record.originalPrice,
    durationDays: record.durationDays,
    departureLabel: record.departureLabel,
    dateLabel: record.dateLabel,
    seatsLeft: record.seatsLeft,
    badge: record.badge as Offer["badge"],
    theme: record.theme as Offer["theme"],
    summary: record.summary,
    highlights: parseStrings(record.highlights),
    plans: parsePlans(record.plans),
    tags: parseStrings(record.tags),
    image: siteOffer?.image ?? getOfferImage(record.slug)
  };
}

export async function getOffers() {
  try {
    const records = await withOfferQueryTimeout(
      prisma.offer.findMany({
        orderBy: [{ priceFrom: "asc" }, { seatsLeft: "desc" }]
      })
    );
    return records.map(toSiteOffer);
  } catch (error) {
    if (!isRecoverableOfferError(error)) {
      throw error;
    }

    console.warn("Falling back to static offers because Prisma is unavailable.");
    return fallbackOffers();
  }
}

export async function getOfferBySlug(slug: string) {
  try {
    const record = await withOfferQueryTimeout(prisma.offer.findUnique({ where: { slug } }));
    return record ? toSiteOffer(record) : null;
  } catch (error) {
    if (!isRecoverableOfferError(error)) {
      throw error;
    }

    console.warn(`Falling back to static offer for slug "${slug}" because Prisma is unavailable.`);
    return siteOffersBySlug.get(slug) ?? null;
  }
}

export async function getOfferRecordBySlug(slug: string) {
  return prisma.offer.findUnique({ where: { slug } });
}

export async function getOfferById(id: string) {
  try {
    const record = await withOfferQueryTimeout(prisma.offer.findUnique({ where: { id } }));
    return record ? toSiteOffer(record) : null;
  } catch (error) {
    if (!isRecoverableOfferError(error)) {
      throw error;
    }

    console.warn(`Falling back to static offer for id "${id}" because Prisma is unavailable.`);
    return siteOffers.find((offer) => offer.id === id) ?? null;
  }
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      offer: true,
      payment: true
    }
  });
}

export async function getUserBookings(userId: string) {
  return prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { offer: true, payment: true }
  });
}

export async function getUserFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { offer: true },
    orderBy: { createdAt: "desc" }
  });
}
