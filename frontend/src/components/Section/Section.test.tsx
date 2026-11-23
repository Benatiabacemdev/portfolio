import { render, screen } from "@testing-library/react";

import { Section } from "./Section";

test("rend une <section> avec son ancre et un titre h2 qui la nomme", () => {
  render(
    <Section id="parcours" title="Parcours">
      <p>contenu</p>
    </Section>,
  );
  const section = screen.getByRole("region", { name: "Parcours" });
  expect(section).toHaveAttribute("id", "parcours");
  expect(screen.getByRole("heading", { level: 2, name: "Parcours" })).toBeInTheDocument();
  expect(screen.getByText("contenu")).toBeInTheDocument();
});

test("hideTitle garde le titre pour les lecteurs d'écran mais le masque visuellement", () => {
  render(
    <Section hideTitle id="chiffres" title="Chiffres clés">
      <p>x</p>
    </Section>,
  );
  expect(screen.getByRole("heading", { level: 2, name: "Chiffres clés" })).toHaveClass("visuallyHidden");
});
