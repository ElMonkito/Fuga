import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toSiteOffer } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination")?.toLowerCase() ?? "";
  const budget = Number(searchParams.get("budget") ?? "0");
  const flashOnly = searchParams.get("flashOnly") === "true";

  const records = await prisma.offer.findMany({
    orderBy: [{ priceFrom: "asc" }, { seatsLeft: "desc" }]
  });

  const filtered = records
    .map(toSiteOffer)
    .filter((offer) => {
      const destinationMatch = !destination || offer.destination.toLowerCase().includes(destination);
      const budgetMatch = !budget || offer.priceFrom <= budget;
      const flashMatch = !flashOnly || offer.badge === "Flash";
      return destinationMatch && budgetMatch && flashMatch;
    });

  return NextResponse.json({ offers: filtered });
}
