import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { paySchema } from "@/lib/validators";
import { generateBookingReference } from "@/lib/utils";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ bookingId: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  const { bookingId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = paySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
      { status: 400 }
    );
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  });

  if (!booking) {
    return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
  }

  const payment = await prisma.payment.upsert({
    where: { bookingId },
    update: {
      method: parsed.data.method,
      status: "SUCCEEDED",
      providerRef: generateBookingReference()
    },
    create: {
      bookingId,
      method: parsed.data.method,
      status: "SUCCEEDED",
      providerRef: generateBookingReference()
    }
  });

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentMethod: parsed.data.method,
      paymentStatus: "SUCCEEDED",
      status: "CONFIRMED"
    },
    include: {
      offer: true,
      payment: true
    }
  });

  return NextResponse.json({
    id: updated.id,
    reference: updated.reference,
    paymentId: payment.id
  });
}
