import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";

// Accueil provisoire : les sections arrivent à la Tâche 6.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { profile } = getContent(lang);

  return (
    <section id="hero" style={{ minHeight: "150vh", padding: "48px 24px" }}>
      <h1>{profile.identity.name}</h1>
      <p>{profile.identity.tagline}</p>
    </section>
  );
}
