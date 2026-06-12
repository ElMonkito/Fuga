import { prisma } from "@/lib/db";
import type { Offer, OfferPlan } from "@/lib/site-data";
import type { Offer as PrismaOffer, Prisma } from "@prisma/client";

type OfferRecord = PrismaOffer;

function parsePlans(value: Prisma.JsonValue): OfferPlan[] {
  return Array.isArray(value) ? (value as OfferPlan[]) : [];
}

function parseStrings(value: Prisma.JsonValue): string[] {
  return Array.isArray(value) ? (value as string[]) : [];
}

export function toSiteOffer(record: OfferRecord): Offer {
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
    tags: parseStrings(record.tags)
  };
}

export async function getOffers() {
  const records = await prisma.offer.findMany({
    orderBy: [{ priceFrom: "asc" }, { seatsLeft: "desc" }]
  });
  return records.map(toSiteOffer);
}

export async function getOfferBySlug(slug: string) {
  const record = await prisma.offer.findUnique({ where: { slug } });
  return record ? toSiteOffer(record) : null;
}

export async function getOfferRecordBySlug(slug: string) {
  return prisma.offer.findUnique({ where: { slug } });
}

export async function getOfferById(id: string) {
  const record = await prisma.offer.findUnique({ where: { id } });
  return record ? toSiteOffer(record) : null;
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
