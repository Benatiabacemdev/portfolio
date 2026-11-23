import type { ComponentType } from "react";

import { Certifications } from "@/components/Certifications/Certifications";
import { Contact } from "@/components/Contact/Contact";
import { ExperienceList } from "@/components/ExperienceList/ExperienceList";
import { ExpertiseGrid } from "@/components/ExpertiseGrid/ExpertiseGrid";
import { Hero } from "@/components/Hero/Hero";
import type { SectionProps } from "@/components/sectionProps";
import { TechGrid } from "@/components/TechGrid/TechGrid";

// Ordre des sections de l'accueil : pour le changer, modifier uniquement cette liste.
// Les chiffres clés sont dans le Hero (ils apparaissent autour de la photo au défilement).
export const homeSections: ComponentType<SectionProps>[] = [
  Hero,
  ExperienceList,
  ExpertiseGrid,
  TechGrid,
  Certifications,
  Contact,
];
