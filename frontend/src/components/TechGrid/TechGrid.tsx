import { Section } from "../Section/Section";
import type { SectionProps } from "../sectionProps";
import { Tag } from "../Tag/Tag";
import styles from "./TechGrid.module.css";

// Technologies rangées par catégorie : l'inventaire des outils.
export function TechGrid({ profile, ui }: SectionProps) {
  return (
    <Section id="technologies" title={ui.sections.technologies}>
      <div className={styles.rows}>
        {profile.techCategories.map((category, index) => {
          // Identifiant sans espace : aria-labelledby lit une liste d'id séparés par des espaces.
          const labelId = `tech-categorie-${index}`;
          return (
            <div className={styles.row} key={category.name}>
              <span className={styles.category} id={labelId}>
                {category.name}
              </span>
              <ul aria-labelledby={labelId} className={styles.items}>
                {category.items.map((tech) => (
                  <li key={tech.name}>
                    <Tag logo={tech.logo} name={tech.name} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
