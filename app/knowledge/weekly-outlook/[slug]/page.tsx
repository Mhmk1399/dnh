import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeeklyOutlookReportView } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookReportView";
import { getPublishedWeeklyOutlookReport } from "@/lib/public-weekly-outlooks";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = await getPublishedWeeklyOutlookReport(slug);

  if (!report) {
    return {
      title: "گزارش پیدا نشد",
    };
  }

  return {
    title: report.seoTitle || report.title,
    description: report.seoDescription || report.excerpt,
  };
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
