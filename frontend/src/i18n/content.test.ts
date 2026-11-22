import { defaultLocale, enabledLocales, isLocale, locales } from "./config";
import { getContent } from "./content";

test("isLocale accepte fr et en, refuse de", () => {
  expect(isLocale("fr")).toBe(true);
  expect(isLocale("en")).toBe(true);
  expect(isLocale("de")).toBe(false);
});

test("enabledLocales est inclus dans locales et contient defaultLocale", () => {
  for (const l of enabledLocales) expect(locales).toContain(l);
  expect(enabledLocales).toContain(defaultLocale);
});

test('getContent("fr") renvoie un nom et au moins une expérience', () => {
  const { profile } = getContent("fr");
  expect(profile.identity.name).not.toBe("");
  expect(profile.experiences.length).toBeGreaterThan(0);
});

test('getContent("en") a la même forme que fr (mêmes clés de premier niveau)', () => {
  const fr = getContent("fr");
  const en = getContent("en");
  expect(Object.keys(en.ui).sort()).toEqual(Object.keys(fr.ui).sort());
  expect(Object.keys(en.profile).sort()).toEqual(Object.keys(fr.profile).sort());
});
