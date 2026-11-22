import type { NextConfig } from "next";

// Export statique : `next build` produit des fichiers HTML/CSS/JS dans `out/`,
// servis par Nginx. Aucun serveur Node en production.
// (cacheComponents / partialPrefetching retirés : ils exigent le runtime Node.)
const nextConfig: NextConfig = {
  output: "export",
  // /fr/missions -> out/fr/missions/index.html (plus simple à servir pour Nginx)
  trailingSlash: true,
  // L'optimiseur d'images de Next a besoin d'un serveur : désactivé en export.
  images: { unoptimized: true },
  experimental: {
    // 404 globale : nécessaire car le layout racine est sous app/[lang]/.
    globalNotFound: true,
  },
};

export default nextConfig;
