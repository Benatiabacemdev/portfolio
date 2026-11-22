import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import type { Ui } from "@/i18n/types";
import styles from "./Header.module.css";

type HeaderProps = {
  lang: Locale;
  name: string;
  ui: Ui;
};

// Barre horizontale collée en haut (position: sticky) : c'est la page qui défile.
// Les ancres pointent vers l'accueil (/#section) pour marcher aussi depuis /missions ou /chat.
// localePath : pas de préfixe pour le français (langue par défaut), /en/... pour l'anglais.
export function Header({ lang, name, ui }: HeaderProps) {
  const home = localePath(lang, "/");
  const links = [
    { href: localePath(lang, "/#parcours"), label: ui.nav.experience },
    { href: localePath(lang, "/#expertise"), label: ui.nav.expertise },
    { href: localePath(lang, "/missions/"), label: ui.nav.missions },
    { href: localePath(lang, "/chat/"), label: ui.nav.chat },
    { href: localePath(lang, "/#contact"), label: ui.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href={home}>
          {name}
        </Link>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link className={styles.link} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
