import type { Booking, Offer } from "@/generated/prisma/client";

export type BookingWithOffer = Booking & {
  offer: Pick<Offer, "destination" | "slug" | "priceFrom" | "title" | "subtitle">;
};
