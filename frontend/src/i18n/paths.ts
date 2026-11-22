import { defaultLocale, type Locale } from "./config";

/**
 * Construit un lien interne pour une langue.
 * La langue par défaut est servie à la racine (/missions/), les autres sont préfixées (/en/missions/).
 * `path` commence toujours par "/".
 */
export function localePath(lang: Locale, path: string): string {
  return lang === defaultLocale ? path : `/${lang}${path}`;
}
