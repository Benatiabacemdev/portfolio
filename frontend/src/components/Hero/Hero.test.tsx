import { render, screen } from "@testing-library/react";

import { site } from "@/config/site";
import { getContent } from "@/i18n/content";
import { getInitials } from "@/lib/initials";
import { resolvePublicFile } from "@/lib/publicFile";
import { Hero } from "./Hero";

// La présence de la photo dépend du disque : on la simule dans chaque test.
jest.mock("@/lib/publicFile");
const mockedResolve = jest.mocked(resolvePublicFile);

const { profile, ui } = getContent("fr");

function renderHero() {
  return render(<Hero lang="fr" profile={profile} ui={ui} />);
}

beforeEach(() => {
  mockedResolve.mockReturnValue(site.photo);
});

test("le hero est la section #hero, avec le titre du métier en titre principal", () => {
  const { container } = renderHero();
  expect(container.querySelector("section#hero")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: profile.identity.title })).toBeInTheDocument();
});

test("le nom n'est pas répété sous la photo (il est déjà dans la barre du haut)", () => {
  renderHero();
  expect(screen.queryByText(profile.identity.name)).not.toBeInTheDocument();
});

test("si la photo existe dans public/, elle est affichée", () => {
  renderHero();
  const img = screen.getByRole("img", { name: profile.identity.name });
  expect(img.tagName).toBe("IMG");
  expect(img.getAttribute("src")).toContain(site.photo);
});

test("si la photo est absente, les initiales sont affichées à la place", () => {
  mockedResolve.mockReturnValue(null);
  renderHero();
  const avatar = screen.getByRole("img", { name: profile.identity.name });
  expect(avatar.tagName).not.toBe("IMG");
  expect(avatar).toHaveTextContent(getInitials(profile.identity.name));
});

test("la description est visible, sans localisation ni disponibilité", () => {
  renderHero();
  expect(screen.getByText(profile.identity.description)).toBeInTheDocument();
  expect(screen.queryByText(new RegExp(profile.identity.availability))).not.toBeInTheDocument();
  expect(screen.queryByText(new RegExp(profile.identity.location))).not.toBeInTheDocument();
});

test("le bouton du chat pointe vers /chat/ (fr sans préfixe)", () => {
  renderHero();
  expect(screen.getByRole("link", { name: new RegExp(ui.hero.chatCta) })).toHaveAttribute(
    "href",
    "/chat/",
  );
});

test("le lien de défilement pointe vers la section suivante (#chiffres)", () => {
  renderHero();
  expect(screen.getByRole("link", { name: new RegExp(ui.hero.scrollHint) })).toHaveAttribute(
    "href",
    "#chiffres",
  );
});
