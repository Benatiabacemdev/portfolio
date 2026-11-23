import { formatPeriod } from "@/lib/period";
import { Section } from "../Section/Section";
import type { SectionProps } from "../sectionProps";
import { Tag } from "../Tag/Tag";
import styles from "./ExperienceList.module.css";

// Parcours : une ligne compacte par expérience, dépliable au clic.
// <details>/<summary> natif : fonctionne sans JavaScript et au clavier.
export function ExperienceList({ profile, ui }: SectionProps) {
  return (
    <Section id="parcours" title={ui.sections.experience}>
      <ul className={styles.list}>
        {profile.experiences.map((xp) => (
          <li key={xp.id}>
            <details className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.heading}>
                  <span className={styles.company}>{xp.company}</span>
                  <span className={styles.role}>{xp.role}</span>
                </span>
                <span className={styles.period}>{formatPeriod(xp.start, xp.end, ui.experience.present)}</span>
              </summary>
              <div className={styles.body}>
                <p className={styles.text}>{xp.summary}</p>
                <div className={styles.tags}>
                  {xp.tags.map((tag) => (
                    <Tag key={tag} name={tag} />
                  ))}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
