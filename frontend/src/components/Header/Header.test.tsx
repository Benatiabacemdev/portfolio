import { render, screen } from "@testing-library/react";

import { getContent } from "@/i18n/content";
import { Header } from "./Header";

const { ui, profile } = getContent("fr");

function renderHeader() {
  return render(<Header lang="fr" name={profile.identity.name} ui={ui} />);
}

test("le nom renvoie vers l'accueil de la langue", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: profile.identity.name })).toHaveAttribute("href", "/fr/");
});

test("les ancres de l'accueil fonctionnent depuis n'importe quelle page", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: ui.nav.experience })).toHaveAttribute("href", "/fr/#parcours");
  expect(screen.getByRole("link", { name: ui.nav.expertise })).toHaveAttribute("href", "/fr/#expertise");
  expect(screen.getByRole("link", { name: ui.nav.contact })).toHaveAttribute("href", "/fr/#contact");
});

test("missions et chat sont des pages dédiées", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: ui.nav.missions })).toHaveAttribute("href", "/fr/missions/");
  expect(screen.getByRole("link", { name: ui.nav.chat })).toHaveAttribute("href", "/fr/chat/");
});

test("la barre est un <header> avec une navigation", () => {
  renderHeader();
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
