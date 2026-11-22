// Ajoute les matchers DOM (toBeInTheDocument, toHaveAttribute…) à expect().
import "@testing-library/jest-dom";

// Reproduit `trailingSlash: true` de next.config.ts : au build, Next injecte
// cette variable et <Link> génère /fr/missions/ ; sans elle, Jest verrait /fr/missions.
process.env.__NEXT_TRAILING_SLASH = "true";
