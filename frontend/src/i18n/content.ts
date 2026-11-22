import type { Locale } from "./config";
import type { Profile, Ui } from "./types";

import frProfile from "@/content/fr/profile.json";
import frUi from "@/content/fr/ui.json";
import enProfile from "@/content/en/profile.json";
import enUi from "@/content/en/ui.json";

// L'annotation de type fait vérifier chaque JSON par le compilateur :
// une clé manquante dans une langue = erreur de build.
const contents: Record<Locale, { profile: Profile; ui: Ui }> = {
  fr: { profile: frProfile, ui: frUi },
  en: { profile: enProfile, ui: enUi },
};

export function getContent(lang: Locale): { profile: Profile; ui: Ui } {
  return contents[lang];
}
