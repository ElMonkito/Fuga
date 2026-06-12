import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validators";
import { generateBookingReference } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
      { status: 400 }
    );
  }

  const offer = await prisma.offer.findUnique({
    where: { slug: parsed.data.offerSlug }
  });

  if (!offer) {
    return NextResponse.json({ error: "Offre introuvable" }, { status: 404 });
  }

  const plans = Array.isArray(offer.plans) ? (offer.plans as Array<Record<string, unknown>>) : [];
  const plan = plans.find((item) => item?.id === parsed.data.planId);

  if (!plan || typeof plan?.price !== "number") {
    return NextResponse.json({ error: "Formule introuvable" }, { status: 400 });
  }

  const planPrice = plan.price as number;
  const taxes = 18;
  const total = planPrice * parsed.data.people + taxes;
  const reference = generateBookingReference();

  const booking = await prisma.booking.create({
    data: {
      reference,
      offerId: offer.id,
      userId: session?.user?.id ?? null,
      planId: String(plan.id),
      planName: String(plan.name),
      planPrice,
      taxes,
      total,
      people: parsed.data.people,
      rooms: parsed.data.rooms,
      departureDate: new Date(parsed.data.departureDate),
      returnDate: new Date(parsed.data.returnDate),
      guestFirstName: parsed.data.guestFirstName,
      guestLastName: parsed.data.guestLastName,
      guestEmail: parsed.data.guestEmail,
      guestPhone: parsed.data.guestPhone || null,
      status: "PENDING_PAYMENT"
    }
  });

  return NextResponse.json({
    id: booking.id,
    reference: booking.reference
  });
}
