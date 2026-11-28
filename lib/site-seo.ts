import "server-only";

import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  getLocaleFromPathname,
  getLocalizedSiteHref,
  type SiteLocale,
} from "@/lib/site-language";
import { getLocalizedPageSeo } from "@/lib/site-page-seo";

export const DEFAULT_SOCIAL_IMAGE = "/social/dnh-social-card.png";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (configured) {
    const normalized = /^https?:\/\//i.test(configured)
      ? configured
      : `https://${configured}`;
    return normalized.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export function getLocalizedAlternates(
  path: string,
  locale: SiteLocale,
  availableLocales: readonly SiteLocale[] = ["fa", "en"],
) {
  const base = getSiteUrl();
  return {
    canonical: `${base}${getLocalizedSiteHref(path, locale)}`,
    languages: {
      ...Object.fromEntries(availableLocales.map((language) => [
        language === "fa" ? "fa-IR" : "en-US",
        `${base}${getLocalizedSiteHref(path, language)}`,
      ])),
      "x-default": `${base}${getLocalizedSiteHref(path, "fa")}`,
    },
  };
}

export async function getRequestLanguage() {
  const pathname = (await headers()).get("x-dnh-pathname") ?? "/fa";
  return { pathname, locale: getLocaleFromPathname(pathname) ?? "fa" };
}

function getSocialImageUrls(images: unknown): string[] | undefined {
  if (!images) return undefined;
  const list = Array.isArray(images) ? images : [images];
  const urls = list.flatMap((image) => {
    if (typeof image === "string") return [image];
    if (image instanceof URL) return [image.toString()];
    if (
      image &&
      typeof image === "object" &&
      "url" in image &&
      (typeof image.url === "string" || image.url instanceof URL)
    ) {
      return [image.url.toString()];
    }
    return [];
  });

  return urls.length ? urls : undefined;
}

export function localizePageMetadata(
  metadata: Metadata,
  path: string,
  locale: SiteLocale,
  availableLocales: readonly SiteLocale[] = ["fa", "en"],
): Metadata {
  const alternates = getLocalizedAlternates(path, locale, availableLocales);
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
  const defaultImage = {
    url: DEFAULT_SOCIAL_IMAGE,
    width: 1200,
    height: 630,
    alt: typeof title === "string" ? title : "DNH",
  };
  const socialImage = pageSeo?.image
    ? [
        {
          url: pageSeo.image,
          alt: typeof title === "string" ? title : pageSeo.title,
        },
      ]
    : [defaultImage];
  const socialTitle = pageSeo?.exact
    ? pageSeo.title
    : (metadata.openGraph?.title ??
      (typeof title === "string" ? title : undefined));
  const socialDescription = pageSeo?.exact
    ? pageSeo.description
    : (metadata.openGraph?.description ?? description ?? undefined);
  const openGraphImages = metadata.openGraph?.images ?? socialImage;
  const openGraphType =
    metadata.openGraph && "type" in metadata.openGraph
      ? metadata.openGraph.type
      : "website";
  const renderedTitle =
    typeof title === "string" && /\bDNH\b/i.test(title)
      ? { absolute: title }
      : title;
  const twitterMetadata: NonNullable<Metadata["twitter"]> = {
    ...metadata.twitter,
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: metadata.twitter?.images ??
      getSocialImageUrls(openGraphImages) ?? [DEFAULT_SOCIAL_IMAGE],
  };

  return {
    ...metadata,
    title: renderedTitle,
    description,
    keywords,
    alternates,
    robots: pageSeo?.noIndex
      ? { index: false, follow: false, nocache: true }
      : (metadata.robots ?? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }),
    openGraph: {
      ...metadata.openGraph,
      type: openGraphType,
      siteName: metadata.openGraph?.siteName ?? "DNH",
      title: socialTitle,
      description: socialDescription,
      images: openGraphImages,
      url: alternates.canonical,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: availableLocales.filter((language) => language !== locale)
        .map((language) => language === "fa" ? "fa_IR" : "en_US"),
    },
    twitter: twitterMetadata,
  };
}
