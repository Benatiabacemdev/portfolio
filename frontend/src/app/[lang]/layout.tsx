import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header/Header";
import { enabledLocales, isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import "@/styles/globals.css";

// Une version du site par langue active, générée au build.
export function generateStaticParams() {
  return enabledLocales.map((lang) => ({ lang }));
}

// Une langue non générée (ex. /de/) donne une 404 au lieu d'un rendu à la demande.
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = getContent(lang);
  return { title: ui.meta.title, description: ui.meta.description };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
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
