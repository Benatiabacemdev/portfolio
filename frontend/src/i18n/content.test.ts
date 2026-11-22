import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import enExample from "@/content/en/profile.example.json";
import frExample from "@/content/fr/profile.example.json";
import { defaultLocale, enabledLocales, isLocale, locales } from "./config";
import { getContent, loadProfile } from "./content";
import type { Profile } from "./types";

// Vérifié par TypeScript (tsc) : les gabarits commités respectent le type Profile.
const typedExamples: Profile[] = [frExample, enExample];

/** Clés facultatives du type Profile (peuvent manquer d'un côté). */
const OPTIONAL_KEYS = new Set(["logo"]);

/**
 * Liste les différences de structure entre le profil réel et le gabarit (clés, types).
 * Un tableau vide est compatible avec tout : le gabarit montre un élément, le réel peut en avoir 0 ou N.
 */
function shapeMismatches(real: unknown, example: unknown, at = "profile"): string[] {
  if (Array.isArray(real) && Array.isArray(example)) {
    if (real.length === 0 || example.length === 0) return [];
    return real.flatMap((item, i) => shapeMismatches(item, example[0], `${at}[${i}]`));
  }
  const isObj = (v: unknown) => v !== null && typeof v === "object" && !Array.isArray(v);
  if (isObj(real) && isObj(example)) {
    const r = real as Record<string, unknown>;
    const e = example as Record<string, unknown>;
    const keys = new Set([...Object.keys(r), ...Object.keys(e)]);
    return [...keys].flatMap((k) => {
      if (!(k in r) || !(k in e)) return OPTIONAL_KEYS.has(k) ? [] : [`${at}.${k} : clé présente d'un seul côté`];
      return shapeMismatches(r[k], e[k], `${at}.${k}`);
    });
  }
  // null et string sont interchangeables (ex. end: null = « en cours »).
  const kind = (v: unknown) => (v === null ? "string" : Array.isArray(v) ? "array" : typeof v);
  return kind(real) === kind(example) ? [] : [`${at} : ${kind(real)} au lieu de ${kind(example)}`];
}

test("isLocale accepte fr et en, refuse de", () => {
  expect(isLocale("fr")).toBe(true);
  expect(isLocale("en")).toBe(true);
  expect(isLocale("de")).toBe(false);
});

test("enabledLocales est inclus dans locales et contient defaultLocale", () => {
  for (const l of enabledLocales) expect(locales).toContain(l);
  expect(enabledLocales).toContain(defaultLocale);
  expect(typedExamples).toHaveLength(2);
});

describe("loadProfile", () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "content-"));
    fs.mkdirSync(path.join(dir, "fr"));
    fs.writeFileSync(path.join(dir, "fr", "profile.example.json"), JSON.stringify({ identity: { name: "Gabarit" } }));
  });

  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  test("utilise le gabarit quand profile.json est absent (clone Git, build Docker)", () => {
    expect(loadProfile("fr", dir).identity.name).toBe("Gabarit");
  });

  test("utilise profile.json quand il existe (contenu réel, local)", () => {
    fs.writeFileSync(path.join(dir, "fr", "profile.json"), JSON.stringify({ identity: { name: "Réel" } }));
    expect(loadProfile("fr", dir).identity.name).toBe("Réel");
  });
});

test.each(locales)("le profil chargé pour %s a la même structure que son gabarit", (lang) => {
  const example = lang === "fr" ? frExample : enExample;
  expect(shapeMismatches(loadProfile(lang), example)).toEqual([]);
});

test('getContent("fr") renvoie un nom, au moins une expérience et les textes d\'interface', () => {
  const { profile, ui } = getContent("fr");
  expect(profile.identity.name).not.toBe("");
  expect(profile.experiences.length).toBeGreaterThan(0);
  expect(ui.hero.chatCta).not.toBe("");
});

test("les textes d'interface ont les mêmes clés en fr et en", () => {
  expect(Object.keys(getContent("en").ui).sort()).toEqual(Object.keys(getContent("fr").ui).sort());
});
