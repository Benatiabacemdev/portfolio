import type { Metadata } from "next";
import Link from "next/link";

import "@/styles/globals.css";

// 404 globale : utilisée pour toute URL sans route (ex. /de/, /page-inexistante).
// Elle ne passe pas par le layout [lang], d'où le document HTML complet.
// Texte en français : c'est la langue par défaut du site.
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <main style={{ padding: "64px 24px", textAlign: "center" }}>
          <h1>Page introuvable</h1>
          <p>
            <Link href="/fr/">Retour à l&apos;accueil</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
