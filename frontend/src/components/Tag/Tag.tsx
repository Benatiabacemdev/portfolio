import { resolvePublicFile } from "@/lib/publicFile";
import styles from "./Tag.module.css";

type TagProps = {
  name: string;
  /** Nom de fichier dans public/logos/ ; affiché seulement s'il existe au build. */
  logo?: string;
};

// Étiquette de technologie : logo (si le fichier existe) + nom.
export function Tag({ name, logo }: TagProps) {
  const logoSrc = logo ? resolvePublicFile(`/logos/${logo}`) : null;
  return (
    <span className={styles.tag}>
      {/* Image décorative (alt vide) : le nom est déjà écrit à côté. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- petit SVG statique, pas besoin de next/image */}
      {logoSrc && <img alt="" className={styles.logo} height={16} src={logoSrc} width={16} />}
      {name}
    </span>
  );
}
