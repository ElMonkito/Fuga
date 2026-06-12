import type { Booking, Offer } from "@prisma/client";

export type BookingWithOffer = Booking & {
  offer: Pick<Offer, "destination" | "slug" | "priceFrom" | "title" | "subtitle">;
};
