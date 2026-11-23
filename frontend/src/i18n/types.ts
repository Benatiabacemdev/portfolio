// Forme des contenus par langue (src/content/<lang>/*.json).
// Chaque langue doit respecter ces types : TypeScript signale toute clé manquante.

export type Tech = {
  name: string;
  /** Nom de fichier dans public/logos/ ; absent = texte seul. */
  logo?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  /** Format AAAA-MM */
  start: string;
  /** Format AAAA-MM ; null = en cours */
  end: string | null;
  summary: string;
  tags: string[];
};

export type Mission = {
  id: string;
  title: string;
  context: string;
  actions: string[];
  tags: string[];
};

export type Profile = {
  identity: {
    name: string;
    title: string;
    description: string;
    availability: string;
    location: string;
  };
  keyFigures: { value: string; label: string }[];
  experiences: Experience[];
  expertise: { title: string; summary: string }[];
  techCategories: { name: string; items: Tech[] }[];
  certifications: string[];
  education: string[];
  missions: Mission[];
};

export type Ui = {
  meta: { title: string; description: string };
  nav: {
    experience: string;
    expertise: string;
    missions: string;
    chat: string;
    contact: string;
  };
  hero: { chatCta: string; scrollHint: string };
  sections: {
    keyFigures: string;
    experience: string;
    expertise: string;
    technologies: string;
    certifications: string;
    contact: string;
  };
  experience: { present: string };
  certifications: { certificationsTitle: string; educationTitle: string };
  contact: { text: string; linkedinCta: string; chatCta: string };
  chat: { title: string; disclaimer: string; suggestions: string[]; comingSoon: string };
  missions: { title: string };
  theme: { toggleLabel: string };
  footer: { text: string };
};
