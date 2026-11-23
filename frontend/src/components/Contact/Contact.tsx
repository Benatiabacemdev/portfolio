import Link from "next/link";

import { site } from "@/config/site";
import { localePath } from "@/i18n/paths";
import { Section } from "../Section/Section";
import type { SectionProps } from "../sectionProps";
import styles from "./Contact.module.css";

// Contact public uniquement : LinkedIn (si configuré) et le chat. Jamais d'e-mail ni de téléphone.
export function Contact({ lang, profile, ui }: SectionProps) {
  return (
    <Section id="contact" title={ui.sections.contact}>
      <div className={styles.card}>
        <p className={styles.text}>{ui.contact.text}</p>
        <p className={styles.availability}>
          {profile.identity.availability} · {profile.identity.location}
        </p>
        <div className={styles.actions}>
          {site.linkedinUrl && (
            <a className={styles.linkedin} href={site.linkedinUrl} rel="noopener noreferrer" target="_blank">
              {ui.contact.linkedinCta}
            </a>
          )}
          <Link className={styles.chat} href={localePath(lang, "/chat/")}>
            <span aria-hidden="true">💬</span> {ui.contact.chatCta}
          </Link>
        </div>
      </div>
    </Section>
  );
}
