"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validators";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath = "/compte" }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  function onSubmit(values: LoginInput) {
    setServerError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (result?.error) {
        setServerError("Identifiants invalides");
        return;
      }

      router.push(params.get("next") ?? nextPath);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">Email</span>
        <Input type="email" placeholder="email@exemple.ch" {...register("email")} />
        {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
      </label>
      <label className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-[0.06em] text-fuga-slate">
          Mot de passe
        </span>
        <Input type="password" placeholder="••••••••" {...register("password")} />
        {errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
      </label>
      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        Se connecter
      </Button>
    </form>
  );
}
