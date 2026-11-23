/**
 * Période d'une expérience en années ("2021 – 2023", "2023 – aujourd'hui", "2017").
 * `start` et `end` au format AAAA-MM ; `end` null = en cours.
 */
export function formatPeriod(start: string, end: string | null, presentLabel: string): string {
  const from = start.slice(0, 4);
  const to = end === null ? presentLabel : end.slice(0, 4);
  return from === to ? from : `${from} – ${to}`;
}
