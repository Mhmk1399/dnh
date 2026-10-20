import "server-only";

import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  getLocaleFromPathname,
  getLocalizedSiteHref,
  type SiteLocale,
} from "@/lib/site-language";
import { getLocalizedPageSeo } from "@/lib/site-page-seo";

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
  const pageSeo = getLocalizedPageSeo(path, locale);
  const title =
    pageSeo && (pageSeo.exact || !metadata.title)
      ? pageSeo.title
      : metadata.title;
  const description =
    pageSeo && (pageSeo.exact || !metadata.description)
      ? pageSeo.description
      : metadata.description;
  const suppliedKeywords = Array.isArray(metadata.keywords)
    ? metadata.keywords
    : metadata.keywords
      ? [metadata.keywords]
      : [];
  const keywords = pageSeo
    ? Array.from(new Set([...pageSeo.keywords, ...suppliedKeywords]))
    : metadata.keywords;
  const socialImage = pageSeo?.image
    ? [{ url: pageSeo.image, alt: typeof title === "string" ? title : pageSeo.title }]
    : undefined;
  const socialTitle =
    pageSeo?.exact
      ? pageSeo.title
      : metadata.openGraph?.title ??
        (typeof title === "string" ? title : undefined);
  const socialDescription =
    pageSeo?.exact
      ? pageSeo.description
      : metadata.openGraph?.description ?? description ?? undefined;
  const twitterMetadata: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: metadata.twitter?.images ?? socialImage?.map((image) => image.url),
  };

  return {
    ...metadata,
    title,
    description,
    keywords,
    alternates,
    robots: pageSeo?.noIndex
      ? { index: false, follow: false, nocache: true }
      : metadata.robots,
    openGraph: {
      ...metadata.openGraph,
      siteName: metadata.openGraph?.siteName ?? "DNH",
      title: socialTitle,
      description: socialDescription,
      images: metadata.openGraph?.images ?? socialImage,
      url: alternates.canonical,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
    },
    twitter: twitterMetadata,
  };
}
