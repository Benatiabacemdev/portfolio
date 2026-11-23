import { formatPeriod } from "./period";

test("affiche les années de début et de fin", () => {
  expect(formatPeriod("2021-01", "2023-01", "aujourd'hui")).toBe("2021 – 2023");
});

test("une mission en cours affiche le libellé « aujourd'hui »", () => {
  expect(formatPeriod("2023-02", null, "aujourd'hui")).toBe("2023 – aujourd'hui");
});

test("une mission sur une seule année n'affiche qu'une année", () => {
  expect(formatPeriod("2017-06", "2017-11", "aujourd'hui")).toBe("2017");
});
