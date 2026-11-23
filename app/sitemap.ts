import type { MetadataRoute } from "next";

import { SITE_MAP } from "@/config/site-map";
import { getWeeklyOutlookSitemapEntries } from "@/lib/public-weekly-outlooks";
import { getLocalizedAlternates } from "@/lib/site-seo";

export const revalidate = 3600;

const priorities = {
  core: 0.9,
  dnh: 0.8,
  service: 0.8,
  audience: 0.75,
  knowledge: 0.7,
  conversion: 0.65,
  legal: 0.3,
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = SITE_MAP.filter(
    (page) => page.indexable,
  ).flatMap((page) =>
    (["fa", "en"] as const).map((locale) => {
      const alternates = getLocalizedAlternates(page.path, locale);
      return {
        url: alternates.canonical,
        alternates: { languages: alternates.languages },
        changeFrequency: page.path === "/" ? "weekly" : "monthly",
        priority: page.path === "/" ? 1 : priorities[page.type],
      };
    }),
  );

  const reports = await getWeeklyOutlookSitemapEntries().catch(() => {
    console.error("Weekly outlook entries could not be loaded for the sitemap.");
    return [];
  });
  const reportEntries: MetadataRoute.Sitemap = reports.flatMap((report) => {
    const path = `/knowledge/weekly-outlook/${report.slug}`;

    return report.locales.map((locale) => {
      const alternates = getLocalizedAlternates(path, locale, report.locales);
      return {
        url: alternates.canonical,
        alternates: { languages: alternates.languages },
        lastModified: report.lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  });

  return [...staticEntries, ...reportEntries];
}
