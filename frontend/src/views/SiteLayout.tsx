import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/Header/Header";
import type { Locale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import "@/styles/globals.css";

// Cadre commun à toutes les pages d'une langue. Chaque langue a son layout racine
// (app/(fr)/layout.tsx, plus tard app/(en)/en/layout.tsx) qui délègue ici.

export function buildMetadata(lang: Locale): Metadata {
  const { ui } = getContent(lang);
  return { title: ui.meta.title, description: ui.meta.description };
}

export function SiteLayout({ lang, children }: { lang: Locale; children: ReactNode }) {
  const { profile, ui } = getContent(lang);

  return (
    <html lang={lang}>
      <body>
        {/* Zone 1 : barre horizontale collée en haut, commune à toutes les pages */}
        <Header lang={lang} name={profile.identity.name} ui={ui} />
        {/* Zone 2 : contenu de la page ; c'est la page entière qui défile */}
        <main>{children}</main>
      </body>
    </html>
  );
}
