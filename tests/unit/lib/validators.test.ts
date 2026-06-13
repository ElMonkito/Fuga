import {
  bookingSchema,
  loginSchema,
  paySchema,
  registerSchema
} from "@/lib/validators";

describe("lib/validators", () => {
  it("valide un formulaire d'inscription complet", () => {
    const result = registerSchema.safeParse({
      firstName: "Valentin",
      lastName: "Durand",
      email: "valentin@example.com",
      password: "motdepasse123",
      confirmPassword: "motdepasse123"
    });

    expect(result.success).toBe(true);
  });

  it("refuse des mots de passe différents à l'inscription", () => {
    const result = registerSchema.safeParse({
      firstName: "Valentin",
      lastName: "Durand",
      email: "valentin@example.com",
      password: "motdepasse123",
      confirmPassword: "motdepasse456"
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.confirmPassword).toContain(
      "Les mots de passe ne correspondent pas"
    );
  });

  it("refuse un email invalide à la connexion", () => {
    const result = loginSchema.safeParse({
      email: "pas-un-email",
      password: "secret"
    });

    expect(result.success).toBe(false);
  });

  it("coerce et valide une réservation complète", () => {
    const result = bookingSchema.safeParse({
      offerSlug: "barcelone",
      planId: "scholar",
      departureDate: "2026-07-01",
      returnDate: "2026-07-04",
      people: "2",
      rooms: "1",
      guestFirstName: "Valentin",
      guestLastName: "Durand",
      guestEmail: "valentin@example.com",
      guestPhone: "+41790000000"
    });

    expect(result.success).toBe(true);
    expect(result.data?.people).toBe(2);
  });

  it("n'accepte que les moyens de paiement supportés", () => {
    expect(paySchema.safeParse({ method: "TWINT" }).success).toBe(true);
    expect(paySchema.safeParse({ method: "CASH" }).success).toBe(false);
  });
});
