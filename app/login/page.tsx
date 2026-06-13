import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "@/components/login-form";
import { Card } from "@/components/ui/card";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getErrorMessage(error?: string) {
  switch (error) {
    case "Configuration":
      return "La configuration d'authentification est incomplète. Vérifie le secret et l'URL de prod.";
    case "AccessDenied":
      return "Connexion refusée. Vérifie tes identifiants ou réessaie plus tard.";
    case "CredentialsSignin":
      return "Email ou mot de passe incorrect.";
    default:
      return null;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/compte";
  const error = typeof params.error === "string" ? params.error : "";
  const errorMessage = getErrorMessage(error);

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
              {errorMessage ? (
                <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              ) : null}
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
