import type { ComponentType } from "react";

import { Hero } from "@/components/Hero/Hero";
import type { SectionProps } from "@/components/sectionProps";

// Ordre des sections de l'accueil : pour le changer, modifier uniquement cette liste.
// Prochaines sections (Tâche 6) : KeyFigures (#chiffres), ExperienceList, ExpertiseGrid,
// TechGrid, Certifications, Contact.
export const homeSections: ComponentType<SectionProps>[] = [Hero];
