import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Ui } from "@/i18n/types";
import styles from "./Header.module.css";

type HeaderProps = {
  lang: Locale;
  name: string;
  ui: Ui;
};

// Barre horizontale collée en haut (position: sticky) : c'est la page qui défile.
// Les ancres pointent vers /<lang>/#section pour marcher aussi depuis /missions ou /chat.
export function Header({ lang, name, ui }: HeaderProps) {
  const home = `/${lang}/`;
  const links = [
    { href: `${home}#parcours`, label: ui.nav.experience },
    { href: `${home}#expertise`, label: ui.nav.expertise },
    { href: `${home}missions/`, label: ui.nav.missions },
    { href: `${home}chat/`, label: ui.nav.chat },
    { href: `${home}#contact`, label: ui.nav.contact },
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
