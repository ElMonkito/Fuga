"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, FileText, Smartphone } from "lucide-react";
import { paySchema, type PayInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { cn, formatChf } from "@/lib/utils";
import type { BookingWithOffer } from "@/lib/types";

type PaymentFormProps = {
  booking: BookingWithOffer;
};

const methods = [
  { value: "TWINT", label: "Twint", icon: Smartphone },
  { value: "INVOICE", label: "Facture", icon: FileText },
  { value: "CARD", label: "Carte bancaire", icon: CreditCard }
] as const;

export function PaymentForm({ booking }: PaymentFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedMethod, setSelectedMethod] = useState<PayInput["method"]>("TWINT");

  const { handleSubmit, register, setValue } = useForm<PayInput>({
    resolver: zodResolver(paySchema),
    defaultValues: {
      method: "TWINT"
    }
  });

  function onSubmit(values: PayInput) {
    startTransition(async () => {
      const response = await fetch(`/api/bookings/${booking.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        return;
      }

      router.push(`/confirmation/${booking.id}`);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" defaultValue={selectedMethod} {...register("method")} />

      <div className="rounded-2xl border border-fuga-border bg-white p-4">
        <div className="mb-3 font-display text-sm font-bold text-fuga-midnight">
          {booking.offer.destination} · {booking.people} pers.
        </div>
        <div className="space-y-1 text-sm text-fuga-slate">
          <div className="flex justify-between">
            <span>
              {booking.planName} × {booking.people}
            </span>
            <span>{formatChf(booking.planPrice * booking.people)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>{formatChf(booking.taxes)}</span>
          </div>
          <div className="flex justify-between border-t border-fuga-border pt-3 text-base font-medium text-fuga-midnight">
            <span>Total</span>
            <span className="text-fuga-orange">{formatChf(booking.total)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
          Moyen de paiement
        </div>
        <div className="space-y-2">
          {methods.map((method) => {
            const active = selectedMethod === method.value;
            const Icon = method.icon;
            return (
              <button
                key={method.value}
                type="button"
                onClick={() => {
                  setSelectedMethod(method.value);
                  setValue("method", method.value);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                  active
                    ? "border-fuga-orange bg-fuga-orange/5"
                    : "border-fuga-border bg-white hover:border-fuga-borderStrong"
                )}
              >
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border",
                    active ? "border-fuga-orange bg-fuga-orange" : "border-fuga-borderStrong"
                  )}
                />
                <span className="flex-1 text-sm font-medium text-fuga-midnight">{method.label}</span>
                <Icon className="h-4 w-4 text-fuga-slate" />
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        Payer {formatChf(booking.total)}
      </Button>
    </form>
  );
}
