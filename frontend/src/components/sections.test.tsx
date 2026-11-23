// Tests des sections de défilement de l'accueil (contenu réel ou gabarit, selon ce qui est présent).
import { render, screen, within } from "@testing-library/react";

import { site } from "@/config/site";
import { getContent } from "@/i18n/content";
import { formatPeriod } from "@/lib/period";
import { resolvePublicFile } from "@/lib/publicFile";
import { Certifications } from "./Certifications/Certifications";
import { Contact } from "./Contact/Contact";
import { ExperienceList } from "./ExperienceList/ExperienceList";
import { ExpertiseGrid } from "./ExpertiseGrid/ExpertiseGrid";
import { Tag } from "./Tag/Tag";
import { TechGrid } from "./TechGrid/TechGrid";

jest.mock("@/lib/publicFile");
const mockedResolve = jest.mocked(resolvePublicFile);

const { profile, ui } = getContent("fr");
const props = { lang: "fr" as const, profile, ui };

beforeEach(() => mockedResolve.mockReturnValue(null));

describe("ExperienceList", () => {
  test("une entrée dépliable (<details>) par expérience, toutes fermées au départ", () => {
    const { container } = render(<ExperienceList {...props} />);
    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(profile.experiences.length);
    details.forEach((d) => expect(d).not.toHaveAttribute("open"));
  });

  test("le résumé visible montre l'entreprise, le rôle et la période", () => {
    render(<ExperienceList {...props} />);
    const first = profile.experiences[0];
    expect(screen.getByText(first.company)).toBeInTheDocument();
    expect(screen.getByText(first.role)).toBeInTheDocument();
    expect(screen.getAllByText(formatPeriod(first.start, first.end, ui.experience.present)).length).toBeGreaterThan(0);
  });

  test("est la section #parcours", () => {
    render(<ExperienceList {...props} />);
    expect(screen.getByRole("region", { name: ui.sections.experience })).toHaveAttribute("id", "parcours");
  });
});

describe("ExpertiseGrid", () => {
  test("est la section #expertise et affiche chaque domaine avec son résumé", () => {
    render(<ExpertiseGrid {...props} />);
    expect(screen.getByRole("region", { name: ui.sections.expertise })).toHaveAttribute("id", "expertise");
    for (const item of profile.expertise) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.summary)).toBeInTheDocument();
    }
  });
});

describe("TechGrid", () => {
  test("est la section #technologies et range les technologies par catégorie", () => {
    render(<TechGrid {...props} />);
    expect(screen.getByRole("region", { name: ui.sections.technologies })).toHaveAttribute("id", "technologies");
    for (const category of profile.techCategories) {
      const list = screen.getByRole("list", { name: category.name });
      expect(within(list).getAllByRole("listitem")).toHaveLength(category.items.length);
    }
  });
});

describe("Tag", () => {
  test("sans fichier de logo : texte seul", () => {
    render(<Tag logo="react.svg" name="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("avec un fichier de logo présent dans public/logos : image décorative + texte", () => {
    mockedResolve.mockReturnValue("/logos/react.svg");
    const { container } = render(<Tag logo="react.svg" name="React" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/logos/react.svg");
    expect(img).toHaveAttribute("alt", "");
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});

describe("Certifications", () => {
  test("est la section #certifications et liste certifications et formation", () => {
    render(<Certifications {...props} />);
    expect(screen.getByRole("region", { name: ui.sections.certifications })).toHaveAttribute("id", "certifications");
    for (const text of [...profile.certifications, ...profile.education]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });
});

describe("Contact", () => {
  const originalUrl = site.linkedinUrl;
  afterEach(() => {
    site.linkedinUrl = originalUrl;
  });

  test("est la section #contact, rappelle la disponibilité et propose le chat", () => {
    render(<Contact {...props} />);
    expect(screen.getByRole("region", { name: ui.sections.contact })).toHaveAttribute("id", "contact");
    expect(screen.getByText(new RegExp(profile.identity.availability))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(ui.contact.chatCta) })).toHaveAttribute("href", "/chat/");
  });

  test("sans URL LinkedIn configurée, pas de bouton LinkedIn", () => {
    site.linkedinUrl = "";
    render(<Contact {...props} />);
    expect(screen.queryByRole("link", { name: new RegExp(ui.contact.linkedinCta) })).not.toBeInTheDocument();
  });

  test("avec une URL LinkedIn, le lien s'ouvre dans un nouvel onglet en toute sécurité", () => {
    site.linkedinUrl = "https://www.linkedin.com/in/exemple";
    render(<Contact {...props} />);
    const link = screen.getByRole("link", { name: new RegExp(ui.contact.linkedinCta) });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/exemple");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("aucune adresse e-mail ni numéro de téléphone n'est affiché", () => {
    const { container } = render(<Contact {...props} />);
    expect(container.textContent).not.toMatch(/@|\+33|\b0[1-9](?:[ .]?\d{2}){4}\b/);
  });
});
