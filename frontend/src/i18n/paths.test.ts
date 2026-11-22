import { localePath } from "./paths";

test("la langue par défaut (fr) n'a pas de préfixe dans l'URL", () => {
  expect(localePath("fr", "/")).toBe("/");
  expect(localePath("fr", "/missions/")).toBe("/missions/");
  expect(localePath("fr", "/#parcours")).toBe("/#parcours");
});

test("les autres langues sont préfixées", () => {
  expect(localePath("en", "/")).toBe("/en/");
  expect(localePath("en", "/chat/")).toBe("/en/chat/");
  expect(localePath("en", "/#contact")).toBe("/en/#contact");
});
