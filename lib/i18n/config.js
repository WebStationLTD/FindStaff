export const locales = ["bg", "it"];
export const defaultLocale = "bg";

/** Italian SEO slugs for services, keyed by BG source slug */
export const serviceSlugMap = {
  detegledachki: "tata-e-badanti",
  "hotelski-personal": "personale-alberghiero",
  "restorantyorski-personal": "personale-di-ristorazione",
  "stroitelni-rabotnitsi": "operai-edili",
  "sezonni-rabotnitsi": "lavoratori-stagionali",
  gradinari: "giardinieri",
  higienisti: "addetti-alle-pulizie",
  "rabotnitsi-v-sektor-proizvodstvo": "operai-produzione",
  "drugi-rabotnitsi": "altri-lavoratori",
};

/** Reverse map: IT slug → BG source slug */
export const serviceSlugMapReverse = Object.fromEntries(
  Object.entries(serviceSlugMap).map(([bg, it]) => [it, bg])
);

export function getServiceSlugForLocale(sourceSlug, locale) {
  if (locale === "it") {
    return serviceSlugMap[sourceSlug] || sourceSlug;
  }
  return sourceSlug;
}

export function resolveServiceSourceSlug(slug, locale) {
  if (locale === "it") {
    return serviceSlugMapReverse[slug] || slug;
  }
  return slug;
}

export function localePath(locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "bg" || locale === defaultLocale) {
    return normalized === "//" ? "/" : normalized;
  }
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getAlternates(path = "/", itPath) {
  const bgPath = path.startsWith("/") ? path : `/${path}`;
  const italianPath = itPath
    ? itPath.startsWith("/")
      ? itPath
      : `/${itPath}`
    : bgPath;

  return {
    canonical: bgPath === "/" ? "/" : bgPath,
    languages: {
      bg: bgPath === "/" ? "/" : bgPath,
      it: italianPath === "/" ? "/it" : `/it${italianPath}`,
      "x-default": bgPath === "/" ? "/" : bgPath,
    },
  };
}

/**
 * Build hreflang alternates.
 * Pass itPath=null/undefined/false to omit the Italian alternate
 * (protects BG SEO when an IT version does not exist yet).
 */
export function getAlternatesForLocale(locale, bgPath, itPath) {
  const bg = bgPath.startsWith("/") ? bgPath : `/${bgPath}`;
  const hasIt = itPath !== null && itPath !== undefined && itPath !== false;
  const it = hasIt
    ? itPath.startsWith("/")
      ? itPath
      : `/${itPath}`
    : null;
  const itFull = it ? (it === "/" ? "/it" : `/it${it}`) : null;
  const canonical =
    locale === "it" && itFull
      ? itFull
      : bg === "/"
        ? "/"
        : bg;

  const languages = {
    bg: bg === "/" ? "/" : bg,
    "x-default": bg === "/" ? "/" : bg,
  };
  if (itFull) languages.it = itFull;

  return {
    canonical,
    languages,
  };
}
