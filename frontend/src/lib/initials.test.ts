import { getInitials } from "./initials";

test("prend la première lettre des deux premiers mots, en majuscules", () => {
  expect(getInitials("Bacem Ben Atia")).toBe("BB");
  expect(getInitials("ada lovelace")).toBe("AL");
});

test("gère un seul mot et les espaces superflus", () => {
  expect(getInitials("  Bacem  ")).toBe("B");
});
