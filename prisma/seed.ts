import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { offers as catalogOffers, type Offer as SeedOffer } from "../lib/site-data";
import { PrismaClient, PaymentMethod, PaymentStatus, BookingStatus } from "../generated/prisma/client";

const connectionString =
  process.env["DATABASE_URL"] ??
  "postgresql://postgres:postgres@localhost:5432/fuga?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

type SeedPlan = {
  id: string;
  name: string;
  price: number;
  seatsLeft: number;
  description: string;
  included: string[];
};

type SeedUser = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

type SeedBooking = {
  reference: string;
  userEmail: string;
  offerSlug: string;
  planId: string;
  people: number;
  rooms: number;
  departureDate: string;
  returnDate: string;
  status: BookingStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
};

const offers: SeedOffer[] = catalogOffers;

const users: SeedUser[] = [
  {
    email: "demo@fuga.ch",
    firstName: "Demo",
    lastName: "User",
    phone: "+41 79 555 00 42"
  },
  {
    email: "chloe@fuga.ch",
    firstName: "Chloe",
    lastName: "Mercier",
    phone: "+41 78 120 44 10"
  },
  {
    email: "nicolas@fuga.ch",
    firstName: "Nicolas",
    lastName: "Rey",
    phone: "+41 77 220 88 31"
  },
  {
    email: "sarah@fuga.ch",
    firstName: "Sarah",
    lastName: "Meyer",
    phone: "+41 76 915 11 92"
  }
];

const favoritesSeed = [
  { userEmail: "demo@fuga.ch", offerSlug: "rome" },
  { userEmail: "demo@fuga.ch", offerSlug: "amsterdam" },
  { userEmail: "chloe@fuga.ch", offerSlug: "lisbonne" },
  { userEmail: "chloe@fuga.ch", offerSlug: "dubrovnik" },
  { userEmail: "nicolas@fuga.ch", offerSlug: "berlin" },
  { userEmail: "sarah@fuga.ch", offerSlug: "barcelone" },
  { userEmail: "sarah@fuga.ch", offerSlug: "budapest" }
];

const bookings: SeedBooking[] = [
  {
    reference: "FG-20260614-042",
    userEmail: "demo@fuga.ch",
    offerSlug: "lisbonne",
    planId: "scholar",
    people: 2,
    rooms: 1,
    departureDate: "2026-06-14T08:00:00.000Z",
    returnDate: "2026-06-17T17:00:00.000Z",
    status: BookingStatus.CONFIRMED,
    paymentMethod: PaymentMethod.TWINT,
    paymentStatus: PaymentStatus.SUCCEEDED
  },
  {
    reference: "FG-20260703-118",
    userEmail: "chloe@fuga.ch",
    offerSlug: "dubrovnik",
    planId: "premium",
    people: 2,
    rooms: 1,
    departureDate: "2026-07-03T09:30:00.000Z",
    returnDate: "2026-07-08T18:20:00.000Z",
    status: BookingStatus.CONFIRMED,
    paymentMethod: PaymentMethod.CARD,
    paymentStatus: PaymentStatus.SUCCEEDED
  },
  {
    reference: "FG-20260710-223",
    userEmail: "nicolas@fuga.ch",
    offerSlug: "berlin",
    planId: "scholar",
    people: 1,
    rooms: 1,
    departureDate: "2026-07-10T06:40:00.000Z",
    returnDate: "2026-07-13T20:10:00.000Z",
    status: BookingStatus.PENDING_PAYMENT,
    paymentMethod: PaymentMethod.INVOICE,
    paymentStatus: PaymentStatus.PENDING
  },
  {
    reference: "FG-20260718-307",
    userEmail: "sarah@fuga.ch",
    offerSlug: "barcelone",
    planId: "premium",
    people: 3,
    rooms: 2,
    departureDate: "2026-07-18T11:00:00.000Z",
    returnDate: "2026-07-21T16:45:00.000Z",
    status: BookingStatus.CONFIRMED,
    paymentMethod: PaymentMethod.TWINT,
    paymentStatus: PaymentStatus.SUCCEEDED
  },
  {
    reference: "FG-20260801-412",
    userEmail: "demo@fuga.ch",
    offerSlug: "rome",
    planId: "local",
    people: 2,
    rooms: 1,
    departureDate: "2026-08-01T07:25:00.000Z",
    returnDate: "2026-08-05T19:10:00.000Z",
    status: BookingStatus.CANCELLED,
    paymentMethod: PaymentMethod.CARD,
    paymentStatus: PaymentStatus.FAILED
  },
  {
    reference: "FG-20260812-509",
    userEmail: "chloe@fuga.ch",
    offerSlug: "budapest",
    planId: "scholar",
    people: 2,
    rooms: 1,
    departureDate: "2026-08-12T10:15:00.000Z",
    returnDate: "2026-08-16T18:00:00.000Z",
    status: BookingStatus.CONFIRMED,
    paymentMethod: PaymentMethod.TWINT,
    paymentStatus: PaymentStatus.SUCCEEDED
  }
];

function calculateBookingTotal(planPrice: number, people: number, taxes = 18) {
  return planPrice * people + taxes;
}

function paymentProviderRef(reference: string) {
  return `${reference}-PAY`;
}

async function seedOffers() {
  for (const offer of offers) {
    const { id: _id, image: _image, ...offerData } = offer;
    await prisma.offer.upsert({
      where: { slug: offer.slug },
      update: offerData,
      create: offerData
    });
  }
}

async function seedUsers() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        passwordHash
      },
      create: {
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        passwordHash,
        emailVerified: new Date()
      }
    });
  }
}

async function seedFavorites() {
  const dbUsers = await prisma.user.findMany({
    where: {
      email: { in: favoritesSeed.map((item) => item.userEmail) }
    }
  });

  const dbOffers = await prisma.offer.findMany({
    where: {
      slug: { in: favoritesSeed.map((item) => item.offerSlug) }
    }
  });

  const usersByEmail = new Map(dbUsers.map((user) => [user.email, user]));
  const offersBySlug = new Map(dbOffers.map((offer) => [offer.slug, offer]));

  for (const favorite of favoritesSeed) {
    const user = usersByEmail.get(favorite.userEmail);
    const offer = offersBySlug.get(favorite.offerSlug);

    if (!user || !offer) continue;

    await prisma.favorite.upsert({
      where: {
        userId_offerId: {
          userId: user.id,
          offerId: offer.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        offerId: offer.id
      }
    });
  }
}

async function seedBookings() {
  const dbUsers = await prisma.user.findMany({
    where: {
      email: { in: bookings.map((item) => item.userEmail) }
    }
  });

  const dbOffers = await prisma.offer.findMany({
    where: {
      slug: { in: bookings.map((item) => item.offerSlug) }
    }
  });

  const usersByEmail = new Map(dbUsers.map((user) => [user.email, user]));
  const offersBySlug = new Map(dbOffers.map((offer) => [offer.slug, offer]));

  for (const bookingSeed of bookings) {
    const user = usersByEmail.get(bookingSeed.userEmail);
    const offer = offersBySlug.get(bookingSeed.offerSlug);

    if (!user || !offer) continue;

    const plans = Array.isArray(offer.plans) ? (offer.plans as SeedPlan[]) : [];
    const plan = plans.find((item) => item.id === bookingSeed.planId);

    if (!plan) continue;

    const taxes = 18;
    const total = calculateBookingTotal(plan.price, bookingSeed.people, taxes);

    const booking = await prisma.booking.upsert({
      where: { reference: bookingSeed.reference },
      update: {
        status: bookingSeed.status,
        offerId: offer.id,
        userId: user.id,
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        taxes,
        total,
        people: bookingSeed.people,
        rooms: bookingSeed.rooms,
        departureDate: new Date(bookingSeed.departureDate),
        returnDate: new Date(bookingSeed.returnDate),
        guestFirstName: user.firstName,
        guestLastName: user.lastName,
        guestEmail: user.email,
        guestPhone: user.phone,
        paymentMethod: bookingSeed.paymentMethod,
        paymentStatus: bookingSeed.paymentStatus ?? PaymentStatus.PENDING
      },
      create: {
        reference: bookingSeed.reference,
        status: bookingSeed.status,
        offerId: offer.id,
        userId: user.id,
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        taxes,
        total,
        people: bookingSeed.people,
        rooms: bookingSeed.rooms,
        departureDate: new Date(bookingSeed.departureDate),
        returnDate: new Date(bookingSeed.returnDate),
        guestFirstName: user.firstName,
        guestLastName: user.lastName,
        guestEmail: user.email,
        guestPhone: user.phone,
        paymentMethod: bookingSeed.paymentMethod,
        paymentStatus: bookingSeed.paymentStatus ?? PaymentStatus.PENDING
      }
    });

    if (bookingSeed.paymentMethod) {
      await prisma.payment.upsert({
        where: { bookingId: booking.id },
        update: {
          method: bookingSeed.paymentMethod,
          status: bookingSeed.paymentStatus ?? PaymentStatus.PENDING,
          providerRef: paymentProviderRef(bookingSeed.reference)
        },
        create: {
          bookingId: booking.id,
          method: bookingSeed.paymentMethod,
          status: bookingSeed.paymentStatus ?? PaymentStatus.PENDING,
          providerRef: paymentProviderRef(bookingSeed.reference)
        }
      });
    }
  }
}

async function main() {
  await seedOffers();
  await seedUsers();
  await seedFavorites();
  await seedBookings();
}

main()
  .then(() => {
    console.log("Seed FUGA termine: offres, users, favoris, bookings, paiements.");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
