import { Section } from "../Section/Section";
import type { SectionProps } from "../sectionProps";
import styles from "./ExpertiseGrid.module.css";

// Domaines d'expertise : le savoir-faire, sans liste d'outils (les outils sont dans TechGrid).
export function ExpertiseGrid({ profile, ui }: SectionProps) {
  return (
    <Section id="expertise" title={ui.sections.expertise}>
      <ul className={styles.grid}>
        {profile.expertise.map((item) => (
          <li className={styles.card} key={item.title}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.summary}>{item.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
