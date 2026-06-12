import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { RegisterForm } from "@/components/register-form";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[70vh] items-center justify-center py-8">
        <Card className="w-full max-w-lg p-6">
          <div className="mb-5">
            <div className="font-display text-2xl font-bold text-fuga-midnight">Créer un compte</div>
            <p className="mt-2 text-sm leading-6 text-fuga-slate">
              Un compte FUGA garde tes réservations, tes préférences et tes prochains départs sous
              la main.
            </p>
          </div>
          <RegisterForm />
          <div className="mt-4 text-center text-sm text-fuga-slate">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-fuga-orange">
              Se connecter
            </Link>
          </div>
        </Card>
      </main>
    </>
  );
}
