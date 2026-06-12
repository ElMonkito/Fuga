import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { AccountOverview } from "@/components/account-overview";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getUserBookings, getUserFavorites } from "@/lib/queries";
import { prisma } from "@/lib/db";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <>
        <SiteHeader />
        <main className="page-shell flex min-h-[70vh] items-center justify-center py-8">
          <div className="max-w-lg rounded-3xl border border-fuga-border bg-white p-8 text-center">
            <div className="font-display text-2xl font-bold text-fuga-midnight">Connexion requise</div>
            <p className="mt-3 text-sm leading-6 text-fuga-slate">
              L’espace compte affiche les réservations sauvegardées, les favoris et les détails
              personnels. Connecte-toi pour y accéder.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/login">Se connecter</Button>
              <Button href="/creer-un-compte" variant="outline">
                Créer un compte
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  const [bookings, favorites] = await Promise.all([
    getUserBookings(user.id),
    getUserFavorites(user.id)
  ]);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-8">
        <AccountOverview user={user} bookings={bookings} favorites={favorites} />
      </main>
    </>
  );
}
