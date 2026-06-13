import {
  cn,
  formatChf,
  formatDateLabel,
  generateBookingReference,
  slugify
} from "@/lib/utils";

describe("lib/utils", () => {
  it("slugify normalise les accents et caractères spéciaux", () => {
    expect(slugify("Île d'Yeu - Été 2026")).toBe("ile-d-yeu-ete-2026");
  });

  it("cn fusionne proprement les classes Tailwind", () => {
    expect(cn("px-4", "py-2", "px-6")).toBe("py-2 px-6");
  });

  it("formatChf retourne un montant en francs suisses", () => {
    const formatted = formatChf(289);
    expect(formatted).toContain("CHF");
    expect(formatted).toMatch(/289/);
  });

  it("formatDateLabel retourne un libellé court en français suisse", () => {
    const formatted = formatDateLabel("2026-07-01");
    expect(formatted).toMatch(/01/);
  });

  it("generateBookingReference retourne une référence FUGA valide", () => {
    expect(generateBookingReference()).toMatch(/^FG-\d{8}-\d{3}$/);
  });
});
