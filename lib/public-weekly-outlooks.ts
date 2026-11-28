import "server-only";

import { cache } from "react";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/models/WeeklyOutlookReport";
import { localizeContentDigits } from "@/lib/localized-digits";
import type { SiteLocale } from "@/lib/site-language";
import type { PublicWeeklyOutlookReport, WeeklyOutlookListItem } from "@/lib/weekly-outlook";
import { normalizeWeeklyOutlookDateCalendar } from "@/lib/weekly-outlook-date";
import { mapWeeklyOutlookSections } from "@/lib/weekly-outlook-sections";

const publicationFilter = (locale: SiteLocale) =>
  locale === "en" ? { status: "published", "english.ready": true } : { status: "published" };

function publishedLocales(hasEnglish?: boolean): SiteLocale[] {
  return hasEnglish ? ["fa", "en"] : ["fa"];
}

function isoDate(value: Date | string) {
  return new Date(value).toISOString();
}

export async function getPublishedWeeklyOutlookList(locale: SiteLocale): Promise<WeeklyOutlookListItem[]> {
  await connect();
  const copyFields = locale === "fa"
    ? "title edition excerpt coverImageAlt sections.id"
    : "english.title english.edition english.excerpt english.coverImageAlt english.sections.id";
  const rows = await WeeklyOutlookReport.find(publicationFilter(locale))
    .select(`slug reportDate dateCalendar market coverImage publishedAt ${copyFields}`)
    .sort({ reportDate: -1, updatedAt: -1 })
    .limit(100)
    .lean();

  return rows.map((row) => {
    const copy = locale === "en" ? row.english! : row;
    return localizeContentDigits({
      id: String(row._id),
      title: copy.title,
      slug: row.slug,
      market: row.market ?? "global",
      edition: copy.edition,
      reportDate: isoDate(row.reportDate).slice(0, 10),
      dateCalendar: normalizeWeeklyOutlookDateCalendar(row.dateCalendar),
      excerpt: copy.excerpt,
      coverImage: row.coverImage || undefined,
      coverImageAlt: copy.coverImageAlt || undefined,
      sectionCount: copy.sections.length,
      publishedAt: row.publishedAt ? isoDate(row.publishedAt) : null,
    }, locale);
  });
}

type PublishedReport = PublicWeeklyOutlookReport & { availableLocales: SiteLocale[] };

// The page and its metadata share one database read per request.
export const getPublishedWeeklyOutlookReport = cache(async (
  slug: string, locale: SiteLocale,
): Promise<PublishedReport | null> => {
  await connect();
  const copyFields = locale === "fa"
    ? "title edition excerpt coverImageAlt seoTitle seoDescription sections english.ready"
    : "english";
  const row = await WeeklyOutlookReport.findOne({ ...publicationFilter(locale), slug })
    .select(`slug reportDate dateCalendar market coverImage status revision publishedAt updatedAt createdAt ${copyFields}`)
    .lean();
  if (!row) return null;

  const copy = locale === "en" ? row.english! : row;
  return localizeContentDigits({
    id: String(row._id),
    title: copy.title,
    slug: row.slug,
    market: row.market ?? "global",
    edition: copy.edition,
    excerpt: copy.excerpt,
    coverImage: row.coverImage || undefined,
    coverImageAlt: copy.coverImageAlt || undefined,
    seoTitle: copy.seoTitle || undefined,
    seoDescription: copy.seoDescription || undefined,
    sections: mapWeeklyOutlookSections(copy.sections),
    reportDate: isoDate(row.reportDate).slice(0, 10),
    dateCalendar: normalizeWeeklyOutlookDateCalendar(row.dateCalendar),
    publishedAt: row.publishedAt ? isoDate(row.publishedAt) : null,
    createdAt: row.createdAt ? isoDate(row.createdAt) : undefined,
    updatedAt: row.updatedAt ? isoDate(row.updatedAt) : undefined,
    revision: row.revision,
    status: row.status,
    availableLocales: publishedLocales(row.english?.ready),
  }, locale);
});

export async function getWeeklyOutlookSitemapEntries() {
  await connect();
  const rows = await WeeklyOutlookReport.find({ status: "published" })
    .select("slug english.ready updatedAt reportDate")
    .sort({ reportDate: -1 })
    .lean();
  return rows.map((row) => ({
    slug: row.slug,
    locales: publishedLocales(row.english?.ready),
    lastModified: isoDate(row.updatedAt ?? row.reportDate),
  }));
}
