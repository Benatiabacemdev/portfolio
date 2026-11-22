import type { Locale } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { homeSections } from "./sections";

// Accueil d'une langue : les sections s'affichent dans l'ordre défini par homeSections.
export function HomePage({ lang }: { lang: Locale }) {
  const { profile, ui } = getContent(lang);

  return (
    <>
      {homeSections.map((Section, index) => (
        <Section key={index} lang={lang} profile={profile} ui={ui} />
      ))}
    </>
  );
}
