import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeeklyOutlookReportView } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookReportView";
import { getPublishedWeeklyOutlookReport } from "@/lib/public-weekly-outlooks";
import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const report = await getPublishedWeeklyOutlookReport(slug, locale);

  if (!report) {
    return {
      title: locale === "fa" ? "گزارش پیدا نشد" : "Report unavailable",
      robots: { index: false, follow: true },
      alternates: null,
    };
  }

  return localizePageMetadata(
    {
      title: report.seoTitle || report.title,
      description: report.seoDescription || report.excerpt,
      openGraph: {
        type: "article",
        publishedTime: report.publishedAt ?? undefined,
        modifiedTime: report.updatedAt,
        images: report.coverImage
          ? [
              {
                url: report.coverImage,
                alt: report.coverImageAlt || report.title,
              },
            ]
          : undefined,
      },
      twitter: report.coverImage
        ? {
            card: "summary_large_image",
            images: [report.coverImage],
          }
        : undefined,
    },
    `/knowledge/weekly-outlook/${slug}`,
    locale,
    report.availableLocales,
  );
}

export default async function WeeklyOutlookReportPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const report = await getPublishedWeeklyOutlookReport(slug, locale);

  if (!report) notFound();

  return <WeeklyOutlookReportView locale={locale} report={report} />;
}
