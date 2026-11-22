import fs from "node:fs";
import path from "node:path";

/**
 * Renvoie `publicPath` si le fichier existe dans public/, sinon null.
 * Appelé au build (composants serveur) : le HTML généré contient la photo
 * ou le repli (initiales) selon ce qui est présent sur la machine de build.
 */
export function resolvePublicFile(
  publicPath: string,
  publicDir: string = path.join(process.cwd(), "public"),
): string | null {
  const root = path.resolve(publicDir);
  const file = path.resolve(root, `.${publicPath}`);
  // Sécurité : on ne regarde jamais en dehors de public/.
  if (!file.startsWith(root + path.sep)) return null;
  return fs.existsSync(file) ? publicPath : null;
}
