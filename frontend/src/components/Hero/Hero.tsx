import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import { localePath } from "@/i18n/paths";
import { getInitials } from "@/lib/initials";
import { resolvePublicFile } from "@/lib/publicFile";
import type { SectionProps } from "../sectionProps";
import styles from "./Hero.module.css";

// Première partie de l'accueil : photo (ou initiales), titre du métier, description, actions,
// et les chiffres clés.
// Au défilement (CSS seul, voir Hero.module.css), la scène reste collée en haut le temps d'une
// transformation : la description et les actions s'estompent, la photo et le titre se centrent,
// les chiffres clés arrivent à gauche et à droite de la photo.
// Le nom n'est pas répété ici : il est déjà dans la barre du haut.
// id="hero" : le bouton de chat flottant (Tâche 7) apparaîtra quand cette section sort de l'écran.
export function Hero({ lang, profile, ui }: SectionProps) {
  const { identity, keyFigures } = profile;
  // La photo n'est pas dans Git : si elle manque au build, on affiche les initiales.
  const photo = resolvePublicFile(site.photo);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.stage}>
        <div aria-hidden="true" className={styles.spacer} />

        <div className={styles.portrait}>
          {photo ? (
            <Image
              alt={identity.name}
              className={styles.avatar}
              height={160}
              priority
              src={photo}
              width={160}
            />
          ) : (
            <div aria-label={identity.name} className={`${styles.avatar} ${styles.initials}`} role="img">
              {getInitials(identity.name)}
            </div>
          )}

          {/* display: contents en CSS : les cartes se placent dans la grille autour de la photo.
              role="list" rétablit la sémantique de liste que certains navigateurs perdent alors. */}
          <ul aria-label={ui.sections.keyFigures} className={styles.figures} role="list">
            {keyFigures.map((figure) => (
              <li className={styles.figure} key={figure.label}>
                <span className={styles.figureValue}>{figure.value}</span>
                <span className={styles.figureLabel}>{figure.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <h1 className={styles.title}>{identity.title}</h1>

        {/* Bloc qui s'estompe et se replie au défilement. */}
        <div className={styles.details}>
          <div className={styles.detailsInner}>
            <p className={styles.text}>{identity.description}</p>

            <div className={styles.actions}>
              <Link className={styles.chatCta} href={localePath(lang, "/chat/")}>
                <span aria-hidden="true">💬</span> {ui.hero.chatCta}
              </Link>
              <a className={styles.scrollHint} href="#chiffres">
                {ui.hero.scrollHint} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className={styles.spacer} />
      </div>

      {/* Ancre placée à la fin de la transformation : « Faites défiler » mène à l'état final. */}
      <span aria-hidden="true" className={styles.anchor} id="chiffres" />
    </section>
  );
}
