import { Section } from "../Section/Section";
import type { SectionProps } from "../sectionProps";
import styles from "./Certifications.module.css";

// Certifications et formation, en deux colonnes (une seule sur mobile).
export function Certifications({ profile, ui }: SectionProps) {
  return (
    <Section id="certifications" title={ui.sections.certifications}>
      <div className={styles.columns}>
        <div>
          <h3 className={styles.subtitle}>{ui.certifications.certificationsTitle}</h3>
          <ul className={styles.list}>
            {profile.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.subtitle}>{ui.certifications.educationTitle}</h3>
          <ul className={styles.list}>
            {profile.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
