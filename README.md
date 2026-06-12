# FUGA

FUGA is a Swiss last-minute travel platform built from the branded wireframes.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- React Hook Form
- Zod
- Lucide icons

## Setup

1. Install dependencies.

```bash
npm install
```

2. Copy the example environment file and fill in your database details.

```bash
cp .env.example .env.local
```

3. Create the database schema and generate the Prisma client.

```bash
npx prisma generate
npx prisma db push
```

4. Seed the demo content.

```bash
npm run prisma:seed
```

5. Start the app.

```bash
npm run dev
```

## Demo account

- Email: `demo@fuga.ch`
- Password: `Password123!`

## Main routes

- `/` landing page
- `/recherche` search and results
- `/offres/[slug]` offer detail and booking selection
- `/paiement/[bookingId]` fake checkout
- `/confirmation/[bookingId]` booking confirmation
- `/compte` authenticated account area
- `/login` sign-in modal-style page
- `/creer-un-compte` registration page

## Notes

- The booking flow uses Prisma-backed API routes.
- Payment is a simulated flow that always confirms successfully after validation.
- The visuals are intentionally faithful to the provided wireframes and brand tokens.
