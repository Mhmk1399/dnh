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
  const { slug, locale } = await params;
  const report = await getPublishedWeeklyOutlookReport(slug);

  if (!report) {
    return localizePageMetadata({
      title: "گزارش پیدا نشد",
      robots: { index: false, follow: false },
    }, `/knowledge/weekly-outlook/${slug}`, normalizeSiteLocale(locale));
  }

  return localizePageMetadata({
    title: report.seoTitle || report.title,
    description: report.seoDescription || report.excerpt,
  }, `/knowledge/weekly-outlook/${slug}`, normalizeSiteLocale(locale));
}

export default async function WeeklyOutlookReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = await getPublishedWeeklyOutlookReport(slug);

  if (!report) notFound();

  return <WeeklyOutlookReportView report={report} />;
}
