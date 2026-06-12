import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";

const favoriteSchema = z.object({
  offerId: z.string().min(1)
});

async function requireUser() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return userId;
}

export async function POST(request: Request) {
  const userId = await requireUser();
  if (!userId) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = favoriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  await prisma.favorite.upsert({
    where: {
      userId_offerId: {
        userId,
        offerId: parsed.data.offerId
      }
    },
    update: {},
    create: {
      userId,
      offerId: parsed.data.offerId
    }
  });

  return NextResponse.json({ ok: true, favorited: true });
}

export async function DELETE(request: Request) {
  const userId = await requireUser();
  if (!userId) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = favoriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  await prisma.favorite.deleteMany({
    where: {
      userId,
      offerId: parsed.data.offerId
    }
  });

  return NextResponse.json({ ok: true, favorited: false });
}
