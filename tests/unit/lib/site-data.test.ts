import { findOfferBySlug, offers, searchOffers } from "@/lib/site-data";

describe("lib/site-data", () => {
  it("fournit un catalogue d'au moins 35 offres", () => {
    expect(offers.length).toBeGreaterThanOrEqual(35);
  });

  it("garantit des slugs uniques pour les offres", () => {
    const uniqueSlugs = new Set(offers.map((offer) => offer.slug));
    expect(uniqueSlugs.size).toBe(offers.length);
  });

  it("associe une image Unsplash à chaque offre", () => {
    expect(offers.every((offer) => offer.image.includes("images.unsplash.com"))).toBe(true);
  });

  it("retrouve une offre par son slug", () => {
    const offer = findOfferBySlug("barcelone");
    expect(offer?.destination).toBe("Barcelone");
    expect(offer?.country).toBe("Espagne");
  });

  it("filtre les offres par destination, budget et badge flash", () => {
    const results = searchOffers({
      destination: "Barcelone",
      budget: 300,
      flashOnly: true
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((offer) => offer.destination === "Barcelone")).toBe(true);
    expect(results.every((offer) => offer.priceFrom <= 300)).toBe(true);
    expect(results.every((offer) => offer.badge === "Flash")).toBe(true);
  });
});
