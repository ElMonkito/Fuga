import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBookingById } from "@/lib/queries";
import { formatChf } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ConfirmationPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[70vh] items-center justify-center py-8">
        <Card className="w-full max-w-xl p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-fuga-green">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="mt-5 font-display text-3xl font-bold text-fuga-midnight">C&apos;est parti !</div>
          <p className="mt-3 text-sm leading-6 text-fuga-slate">
            Ta réservation pour {booking.offer.destination} est confirmée. Le récap est dans ta
            boîte mail.
          </p>
          <div className="mt-5 rounded-2xl border border-fuga-border bg-white px-4 py-3 text-sm text-fuga-slate">
            Réf. <span className="font-medium text-fuga-midnight">{booking.reference}</span>
          </div>
          <div className="mt-4 text-lg font-medium text-fuga-orange">
            {formatChf(booking.total)}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/compte">Voir ma réservation</Button>
            <Button href="/recherche" variant="outline">
              Retour aux offres
            </Button>
          </div>
        </Card>
      </main>
    </>
  );
}
