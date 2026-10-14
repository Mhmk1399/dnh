import "server-only";

import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  getLocaleFromPathname,
  getLocalizedSiteHref,
  type SiteLocale,
} from "@/lib/site-language";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export function getLocalizedAlternates(path: string, locale: SiteLocale) {
  const base = getSiteUrl();
  return {
    canonical: `${base}${getLocalizedSiteHref(path, locale)}`,
    languages: {
      "fa-IR": `${base}${getLocalizedSiteHref(path, "fa")}`,
      "en-US": `${base}${getLocalizedSiteHref(path, "en")}`,
      "x-default": `${base}${getLocalizedSiteHref(path, "fa")}`,
    },
  };
}

export async function getRequestLanguage() {
  const pathname = (await headers()).get("x-dnh-pathname") ?? "/fa";
  return { pathname, locale: getLocaleFromPathname(pathname) ?? "fa" };
}

export function localizePageMetadata(metadata: Metadata, path: string, locale: SiteLocale): Metadata {
  const alternates = getLocalizedAlternates(path, locale);
  return {
    ...metadata,
    alternates,
    openGraph: {
      ...metadata.openGraph,
      url: alternates.canonical,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
    },
  };
}
