"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterInput } from "@/lib/validators";

export function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  function onSubmit(values: RegisterInput) {
    setServerError(null);
    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setServerError(payload?.error ?? "Impossible de créer le compte");
        return;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });
      router.push("/compte");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">Prénom</span>
          <Input placeholder="Valentin" {...register("firstName")} />
          {errors.firstName ? <p className="text-xs text-red-600">{errors.firstName.message}</p> : null}
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">Nom</span>
          <Input placeholder="Martin" {...register("lastName")} />
          {errors.lastName ? <p className="text-xs text-red-600">{errors.lastName.message}</p> : null}
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">Email</span>
        <Input type="email" placeholder="email@exemple.ch" {...register("email")} />
        {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
      </label>

      <label className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
          Mot de passe
        </span>
        <Input type="password" placeholder="Au moins 8 caractères" {...register("password")} />
        {errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
      </label>

      <label className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
          Confirmation
        </span>
        <Input type="password" placeholder="Répétez le mot de passe" {...register("confirmPassword")} />
        {errors.confirmPassword ? (
          <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
        ) : null}
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-fuga-border bg-white p-4 text-sm text-fuga-slate">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-fuga-borderStrong" />
        <span>J’accepte les conditions générales et la politique de confidentialité.</span>
      </label>

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        Créer mon compte
      </Button>
    </form>
  );
}
