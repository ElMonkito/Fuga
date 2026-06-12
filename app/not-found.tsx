import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-3xl border border-fuga-border bg-white p-8 text-center">
        <div className="font-display text-3xl font-bold text-fuga-midnight">Page introuvable</div>
        <p className="mt-3 text-sm leading-6 text-fuga-slate">
          Le lien ne correspond à aucune page FUGA. Revenons sur une route valide.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/">Retour à l’accueil</Button>
          <Button href="/recherche" variant="outline">
            Explorer les offres
          </Button>
        </div>
      </div>
    </main>
  );
}
