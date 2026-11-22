import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import { localePath } from "@/i18n/paths";
import { getInitials } from "@/lib/initials";
import { resolvePublicFile } from "@/lib/publicFile";
import type { SectionProps } from "../sectionProps";
import styles from "./Hero.module.css";

// Première partie de l'accueil, centrée : photo (ou initiales), présentation, actions.
// Le nom n'est pas répété ici : il est déjà dans la barre du haut.
// id="hero" : le bouton de chat flottant (Tâche 7) apparaîtra quand cette section sort de l'écran.
export function Hero({ lang, profile, ui }: SectionProps) {
  const { identity } = profile;
  // La photo n'est pas dans Git : si elle manque au build, on affiche les initiales.
  const photo = resolvePublicFile(site.photo);

  return (
    <section className={styles.hero} id="hero">
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

      <h1 className={styles.title}>{identity.title}</h1>
      <p className={styles.text}>{identity.description}</p>

      <div className={styles.actions}>
        <Link className={styles.chatCta} href={localePath(lang, "/chat/")}>
          <span aria-hidden="true">💬</span> {ui.hero.chatCta}
        </Link>
        <a className={styles.scrollHint} href="#chiffres">
          {ui.hero.scrollHint} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
