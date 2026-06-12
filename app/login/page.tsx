import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "@/components/login-form";
import { Card } from "@/components/ui/card";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/compte";

  return (
    <>
      <SiteHeader />
      <main className="page-shell flex min-h-[70vh] items-center justify-center py-8">
        <div className="w-full max-w-md">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-fuga-slate">
            Popup depuis la navbar → Login
          </div>
          <Card className="p-6">
            <div className="mb-5">
              <div className="font-display text-2xl font-bold text-fuga-midnight">Connexion</div>
              <p className="mt-2 text-sm leading-6 text-fuga-slate">
                Accède à tes réservations, retrouves tes favoris et poursuis la réservation en
                cours sans perdre le contexte.
              </p>
            </div>
            <LoginForm nextPath={next} />
            <div className="mt-4 text-center text-sm text-fuga-slate">
              Pas de compte ?{" "}
              <Link href="/creer-un-compte" className="font-medium text-fuga-orange">
                Créer un compte
              </Link>
            </div>
            <div className="mt-2 text-center text-sm text-fuga-orange">
              <button type="button" className="font-medium">
                Mot de passe oublié ?
              </button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
