"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  LANGUAGE_COOKIE,
  SITE_LANGUAGES,
  getLocaleFromPathname,
  getLocalizedSiteHref,
  isSharedSitePath,
  type SiteDirection,
  type SiteLocale,
} from "@/lib/site-language";

type LanguageContextValue = {
  locale: SiteLocale;
  direction: SiteDirection;
  languageTag: string;
  isRTL: boolean;
  setLocale: (locale: SiteLocale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: SiteLocale;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const locale = isSharedSitePath(pathname)
    ? "fa"
    : getLocaleFromPathname(pathname) ?? initialLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = SITE_LANGUAGES[locale].direction;
  }, [locale]);

  const setLocale = useCallback(
    (nextLocale: SiteLocale) => {
      if (isSharedSitePath(pathname)) return;
      if ((nextLocale !== "fa" && nextLocale !== "en") || nextLocale === locale)
        return;

      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${LANGUAGE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
      const target = getLocalizedSiteHref(window.location.pathname, nextLocale)
        + window.location.search + window.location.hash;
      // A new document replaces the HTML language and streamed SEO tags together.
      window.location.assign(target);
    },
    [locale, pathname],
  );

  const toggleLocale = useCallback(
    () => setLocale(locale === "fa" ? "en" : "fa"),
    [locale, setLocale],
  );

  const value = useMemo(
    () => ({
      locale,
      direction: SITE_LANGUAGES[locale].direction,
      languageTag: SITE_LANGUAGES[locale].languageTag,
      isRTL: locale === "fa",
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider.");
  return context;
}

/** Resolve public links in the current language, including server-rendered CTAs. */
export function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useLanguage();
  const localizedHref = typeof href === "string"
    ? getLocaleFromPathname(href) ? href : getLocalizedSiteHref(href, locale)
    : typeof href.pathname === "string" && !getLocaleFromPathname(href.pathname)
      ? { ...href, pathname: getLocalizedSiteHref(href.pathname, locale) }
      : href;

  return <NextLink {...props} href={localizedHref} />;
}
