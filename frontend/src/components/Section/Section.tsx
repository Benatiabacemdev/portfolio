import type { ReactNode } from "react";

import styles from "./Section.module.css";

type SectionProps = {
  /** Ancre de la section (#parcours…), utilisée par le menu du haut. */
  id: string;
  title: string;
  /** Masque le titre à l'écran tout en le gardant pour les lecteurs d'écran. */
  hideTitle?: boolean;
  children: ReactNode;
};

// Cadre commun des sections de l'accueil : largeur, espacements, titre souligné.
export function Section({ id, title, hideTitle = false, children }: SectionProps) {
  const titleId = `${id}-titre`;
  return (
    <section aria-labelledby={titleId} className={styles.section} id={id}>
      <div className={styles.inner}>
        <h2 className={hideTitle ? styles.visuallyHidden : styles.title} id={titleId}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
