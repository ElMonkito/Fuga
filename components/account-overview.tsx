import Link from "next/link";
import { formatChf } from "@/lib/utils";
import type { Booking, Favorite, Offer, User } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";

type BookingSummary = Booking & { offer: Offer };
type FavoriteSummary = Favorite & { offer: Offer };

type AccountOverviewProps = {
  user: User;
  bookings: BookingSummary[];
  favorites: FavoriteSummary[];
};

export function AccountOverview({ user, bookings, favorites }: AccountOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-fuga-border bg-white p-6">
        <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Compte</div>
        <div className="mt-2 font-display text-2xl font-bold text-fuga-midnight">
          {user.firstName} {user.lastName}
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fuga-slate">
          Tes réservations, tes favoris et tes informations personnelles centralisés dans un espace
          conçu pour aller vite.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-fuga-border bg-white p-4">
          <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Réservations</div>
          <div className="mt-2 font-display text-2xl font-bold text-fuga-orange">{bookings.length}</div>
        </div>
        <div className="rounded-2xl border border-fuga-border bg-white p-4">
          <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Favoris</div>
          <div className="mt-2 font-display text-2xl font-bold text-fuga-orange">{favorites.length}</div>
        </div>
        <div className="rounded-2xl border border-fuga-border bg-white p-4">
          <div className="text-xs uppercase tracking-[0.08em] text-fuga-slate">Profil</div>
          <div className="mt-2 text-sm text-fuga-midnight">{user.email}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-fuga-border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg font-bold text-fuga-midnight">Réservations récentes</div>
            <Badge className="border-fuga-orange bg-fuga-orange/10 text-fuga-orange">Actif</Badge>
          </div>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-2xl border border-fuga-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-base font-bold text-fuga-midnight">
                      {booking.offer.destination}
                    </div>
                    <div className="text-sm text-fuga-slate">{booking.reference}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-fuga-orange">{formatChf(booking.total)}</div>
                    <div className="text-xs text-fuga-slate">{booking.status}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-fuga-slate">
                  {booking.planName} · {booking.people} pers. · {booking.departureDate.toISOString().slice(0, 10)}
                </div>
                <div className="mt-4">
                  <Link href={`/confirmation/${booking.id}`} className="text-sm font-medium text-fuga-orange">
                    Voir le récap
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-fuga-border bg-white p-5">
          <div className="mb-4 font-display text-lg font-bold text-fuga-midnight">Favoris</div>
          <div className="space-y-3">
            {favorites.map((favorite) => (
              <Link
                key={favorite.id}
                href={`/offres/${favorite.offer.slug}`}
                className="block rounded-2xl border border-fuga-border p-4 transition-colors hover:border-fuga-borderStrong"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-base font-bold text-fuga-midnight">
                      {favorite.offer.destination}
                    </div>
                    <div className="text-sm text-fuga-slate">{favorite.offer.subtitle}</div>
                  </div>
                  <div className="text-sm font-medium text-fuga-orange">{formatChf(favorite.offer.priceFrom)}</div>
                </div>
              </Link>
            ))}
            {!favorites.length ? (
              <div className="rounded-2xl border border-dashed border-fuga-border p-5 text-sm text-fuga-slate">
                Aucun favori pour le moment.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
