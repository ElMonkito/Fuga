import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "8 caractères minimum"),
    confirmPassword: z.string().min(8, "Confirmation requise")
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis")
});

export const bookingSchema = z.object({
  offerSlug: z.string().min(1),
  planId: z.string().min(1),
  departureDate: z.string().min(1),
  returnDate: z.string().min(1),
  people: z.coerce.number().int().min(1).max(6),
  rooms: z.coerce.number().int().min(1).max(4),
  guestFirstName: z.string().min(2),
  guestLastName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().optional().default("")
});

export const paySchema = z.object({
  method: z.enum(["TWINT", "INVOICE", "CARD"])
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type PayInput = z.infer<typeof paySchema>;
