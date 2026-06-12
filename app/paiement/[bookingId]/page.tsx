import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { PaymentForm } from "@/components/payment-form";
import { Card } from "@/components/ui/card";
import { getBookingById } from "@/lib/queries";
import { formatChf } from "@/lib/utils";

type PaymentPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-6 sm:py-8">
        <section className="grid gap-6 xl:grid-cols-2">
          <Card className="p-5">
            <div className="font-display text-xl font-bold text-fuga-midnight">Paiement</div>
            <p className="mt-2 text-sm leading-6 text-fuga-slate">
              Le récapitulatif est clair, les montants restent visibles, et la confirmation ne
              nécessite qu’un seul clic une fois le moyen choisi.
            </p>
            <div className="mt-6 rounded-2xl border border-fuga-border bg-white p-4 text-sm text-fuga-slate">
              <div className="font-display text-base font-bold text-fuga-midnight">
                {booking.offer.destination} · {booking.people} pers.
              </div>
              <div className="mt-2 flex justify-between">
                <span>
                  {booking.planName} × {booking.people}
                </span>
                <span>{formatChf(booking.planPrice * booking.people)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Taxes</span>
                <span>{formatChf(booking.taxes)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-fuga-border pt-3 text-base font-medium text-fuga-midnight">
                <span>Total</span>
                <span className="text-fuga-orange">{formatChf(booking.total)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <PaymentForm booking={booking} />
          </Card>
        </section>
      </main>
    </>
  );
}
