import fs from "node:fs";
import path from "node:path";

import type { Locale } from "./config";
import type { Profile, Ui } from "./types";

import enUi from "@/content/en/ui.json";
import frUi from "@/content/fr/ui.json";

// Textes d'interface : génériques, commités, importés directement (vérifiés par TypeScript).
const uis: Record<Locale, Ui> = { fr: frUi, en: enUi };

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/**
 * Profil d'une langue, lu au build (composants serveur uniquement).
 * - profile.json : contenu réel, local, gitignoré ;
 * - profile.example.json : gabarit commité, utilisé si le réel est absent (clone Git, CI).
 * La structure est vérifiée par les tests (src/i18n/content.test.ts).
 */
export function loadProfile(lang: Locale, contentDir: string = CONTENT_DIR): Profile {
  const real = path.join(contentDir, lang, "profile.json");
  const file = fs.existsSync(real) ? real : path.join(contentDir, lang, "profile.example.json");
  return JSON.parse(fs.readFileSync(file, "utf8")) as Profile;
}

export function getContent(lang: Locale): { profile: Profile; ui: Ui } {
  return { profile: loadProfile(lang), ui: uis[lang] };
}
