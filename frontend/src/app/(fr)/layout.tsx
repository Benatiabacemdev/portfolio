import type { ReactNode } from "react";

import { SiteLayout, buildMetadata } from "@/views/SiteLayout";

// Le français est la langue par défaut : servi à la racine, sans /fr dans l'URL.
// "(fr)" est un groupe de routes : le nom entre parenthèses n'apparaît pas dans l'URL.
export const metadata = buildMetadata("fr");

export default function FrLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="fr">{children}</SiteLayout>;
}
