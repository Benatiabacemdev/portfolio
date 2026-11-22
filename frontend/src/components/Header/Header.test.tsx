import { render, screen } from "@testing-library/react";

import { getContent } from "@/i18n/content";
import { Header } from "./Header";

const { ui, profile } = getContent("fr");

function renderHeader() {
  return render(<Header lang="fr" name={profile.identity.name} ui={ui} />);
}

test("le nom renvoie vers l'accueil de la langue", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: profile.identity.name })).toHaveAttribute("href", "/");
});

test("les ancres de l'accueil fonctionnent depuis n'importe quelle page", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: ui.nav.experience })).toHaveAttribute("href", "/#parcours");
  expect(screen.getByRole("link", { name: ui.nav.expertise })).toHaveAttribute("href", "/#expertise");
  expect(screen.getByRole("link", { name: ui.nav.contact })).toHaveAttribute("href", "/#contact");
});

test("missions et chat sont des pages dédiées", () => {
  renderHeader();
  expect(screen.getByRole("link", { name: ui.nav.missions })).toHaveAttribute("href", "/missions/");
  expect(screen.getByRole("link", { name: ui.nav.chat })).toHaveAttribute("href", "/chat/");
});

test("en anglais, les liens sont préfixés par /en", () => {
  render(<Header lang="en" name={profile.identity.name} ui={getContent("en").ui} />);
  expect(screen.getByRole("link", { name: profile.identity.name })).toHaveAttribute("href", "/en/");
  expect(screen.getByRole("link", { name: getContent("en").ui.nav.chat })).toHaveAttribute("href", "/en/chat/");
});

test("la barre est un <header> avec une navigation", () => {
  renderHeader();
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
