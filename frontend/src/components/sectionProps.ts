import type { Locale } from "@/i18n/config";
import type { Profile, Ui } from "@/i18n/types";

// Props communes à toutes les sections de l'accueil (voir app/[lang]/sections.ts).
export type SectionProps = {
  lang: Locale;
  profile: Profile;
  ui: Ui;
};
