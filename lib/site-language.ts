export type SiteLocale = "fa" | "en";
export type SiteDirection = "rtl" | "ltr";

export const LANGUAGE_COOKIE = "dnh-language";

export const SITE_LANGUAGES = {
  fa: { direction: "rtl", languageTag: "fa-IR" },
  en: { direction: "ltr", languageTag: "en-US" },
} as const;

export function normalizeSiteLocale(value: string | undefined): SiteLocale {
  return value === "en" ? "en" : "fa";
}

export function isSiteLocale(value: string): value is SiteLocale {
  return value === "fa" || value === "en";
}

export function getLocaleFromPathname(pathname: string): SiteLocale | null {
  const match = pathname.split(/[?#]/, 1)[0].match(/^\/(fa|en)(?:\/|$)/);
  return match && isSiteLocale(match[1]) ? match[1] : null;
}

export function stripLocalePrefix(pathname: string) {
  return pathname.replace(/^\/(fa|en)(?=\/|$)/, "") || "/";
}

/** Private tools, APIs and static files keep their existing shared URLs. */
export function isSharedSitePath(pathname: string) {
  return /^\/(?:admin|api|dashboard|test|test-form|_next|assets|icons|uploads|fonts)(?:\/|$)/.test(pathname)
    || /^\/[^/]+\.[^/]+$/.test(pathname);
}

export function getLocalizedSiteHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? "" : href.slice(suffixIndex);
  const path = stripLocalePrefix(pathname);
  if (isSharedSitePath(path)) return path + suffix;
  return `/${locale}${path === "/" ? "" : path}${suffix}`;
}
