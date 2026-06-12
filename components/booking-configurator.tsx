"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, ChevronDown, Users, BedDouble } from "lucide-react";
import type { Offer, OfferPlan } from "@/lib/site-data";
import { bookingSchema, type BookingInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { cn, formatChf } from "@/lib/utils";

type BookingConfiguratorProps = {
  offer: Offer;
  guest?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
};

export function BookingConfigurator({ offer, guest }: BookingConfiguratorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedPlanId, setSelectedPlanId] = useState(offer.plans[0]?.id ?? "scholar");
  const fallbackPlan: OfferPlan =
    offer.plans[0] ?? {
      id: "scholar",
      name: "Scholar",
      price: offer.priceFrom,
      seatsLeft: offer.seatsLeft,
      included: [],
      description: offer.summary
    };
  const selectedPlan = offer.plans.find((plan) => plan.id === selectedPlanId) ?? fallbackPlan;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      offerSlug: offer.slug,
      planId: selectedPlanId,
      departureDate: "",
      returnDate: "",
      people: 2,
      rooms: 1,
      guestFirstName: guest?.firstName ?? "",
      guestLastName: guest?.lastName ?? "",
      guestEmail: guest?.email ?? "",
      guestPhone: guest?.phone ?? ""
    }
  });

  function selectPlan(planId: string) {
    setSelectedPlanId(planId);
    setValue("planId", planId);
  }

  function onSubmit(values: BookingInput) {
    startTransition(async () => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          planId: selectedPlan.id
        })
      });

      if (!response.ok) {
        return;
      }

      const booking = (await response.json()) as { id: string };
      router.push(`/paiement/${booking.id}`);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" defaultValue={offer.slug} {...register("offerSlug")} />
      <input type="hidden" defaultValue={selectedPlan.id} {...register("planId")} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
            Départ
          </span>
          <div className="brand-field flex items-center gap-2 px-3">
            <CalendarDays className="h-4 w-4 text-fuga-slate" />
            <input
              type="date"
              className="h-11 w-full bg-transparent outline-none"
              {...register("departureDate")}
            />
            <ChevronDown className="h-4 w-4 text-fuga-slate" />
          </div>
          {errors.departureDate ? (
            <p className="text-xs text-red-600">{errors.departureDate.message}</p>
          ) : null}
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
            Retour
          </span>
          <div className="brand-field flex items-center gap-2 px-3">
            <CalendarDays className="h-4 w-4 text-fuga-slate" />
            <input
              type="date"
              className="h-11 w-full bg-transparent outline-none"
              {...register("returnDate")}
            />
            <ChevronDown className="h-4 w-4 text-fuga-slate" />
          </div>
          {errors.returnDate ? <p className="text-xs text-red-600">{errors.returnDate.message}</p> : null}
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
            Personnes
          </span>
          <div className="brand-field flex items-center gap-2 px-3">
            <Users className="h-4 w-4 text-fuga-slate" />
            <select className="h-11 w-full bg-transparent outline-none" {...register("people")}>
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
            Chambres
          </span>
          <div className="brand-field flex items-center gap-2 px-3">
            <BedDouble className="h-4 w-4 text-fuga-slate" />
            <select className="h-11 w-full bg-transparent outline-none" {...register("rooms")}>
              {[1, 2, 3, 4].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <div className="space-y-2 border-b border-fuga-border pb-2">
        <div className="flex items-center gap-4">
          <button type="button" className="border-b-2 border-fuga-orange pb-2 text-sm font-medium text-fuga-orange">
            Détail
          </button>
          <button type="button" className="pb-2 text-sm font-medium text-fuga-slate">
            Programme
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {offer.plans.map((plan) => {
          const active = plan.id === selectedPlanId;
          return (
            <label
              key={plan.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors",
                active
                  ? "border-fuga-orange bg-fuga-orange/5"
                  : "border-fuga-border bg-white hover:border-fuga-borderStrong"
              )}
            >
              <input
                type="radio"
                checked={active}
                onChange={() => {
                  selectPlan(plan.id);
                }}
                className="mt-1 h-4 w-4 border-fuga-borderStrong text-fuga-orange"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-sm font-bold text-fuga-midnight">{plan.name}</div>
                  <div className="text-sm font-medium text-fuga-orange">{formatChf(plan.price)}</div>
                </div>
                <p className="mt-1 text-sm text-fuga-slate">{plan.description}</p>
                <p className="mt-2 text-xs text-fuga-slate">{plan.included.join(" · ")}</p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="space-y-2 rounded-2xl border border-fuga-border bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
              Prénom
            </span>
            <input className="brand-field h-11 w-full px-3" {...register("guestFirstName")} />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
              Nom
            </span>
            <input className="brand-field h-11 w-full px-3" {...register("guestLastName")} />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
              Email
            </span>
            <input type="email" className="brand-field h-11 w-full px-3" {...register("guestEmail")} />
          </label>
        </div>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
            Téléphone
          </span>
          <input className="brand-field h-11 w-full px-3" {...register("guestPhone")} />
        </label>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-fuga-border pt-4">
        <div>
          <div className="text-xs uppercase tracking-[0.06em] text-fuga-slate">Total estimé</div>
          <div className="font-display text-lg font-bold text-fuga-orange">
            {formatChf(selectedPlan.price)}
            <span className="ml-2 text-sm font-normal text-fuga-slate">/ personne</span>
          </div>
        </div>
        <Button type="submit" disabled={pending} className="px-5">
          Réserver · {formatChf(selectedPlan.price)}
        </Button>
      </div>
    </form>
  );
}
