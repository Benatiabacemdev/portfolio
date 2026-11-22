// Toutes les langues prévues par l'architecture.
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

// Langues réellement générées au build (et vérifiées par les tests de contenu).
// Ajouter "en" quand le contenu anglais sera rédigé.
export const enabledLocales: Locale[] = ["fr"];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
