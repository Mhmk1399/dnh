import type { Metadata } from "next";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { WeeklyOutlookBuilder } from "@/components/weekly-outlooks/WeeklyOutlookBuilder";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/models/WeeklyOutlookReport";
import type { WeeklyOutlookReportDefinition } from "@/lib/weekly-outlook";
import { mapWeeklyOutlookSections } from "@/lib/weekly-outlook-sections";

export const metadata: Metadata = {
  title: "ویرایش گزارش هفتگی | مدیریت DNH",
};

export const dynamic = "force-dynamic";

export default async function EditWeeklyOutlookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) notFound();

  let row;

  try {
    await connect();
    row = await WeeklyOutlookReport.findById(id).lean();
  } catch {
    return <LoadError />;
  }

  if (!row) notFound();

  const initial: WeeklyOutlookReportDefinition = {
    title: row.title,
    slug: row.slug,
    market: row.market ?? "global",
    edition: row.edition,
    reportDate: new Date(row.reportDate).toISOString().slice(0, 10),
    dateCalendar: row.dateCalendar ?? "jalali",
    excerpt: row.excerpt,
    coverImage: row.coverImage || "",
    coverImageAlt: row.coverImageAlt || "",
    seoTitle: row.seoTitle || "",
    seoDescription: row.seoDescription || "",
    english: row.english && {
      ...row.english,
      sections: mapWeeklyOutlookSections(row.english.sections),
    },
    status: row.status,
    revision: row.revision,
    sections: mapWeeklyOutlookSections(row.sections),
  };

  return <WeeklyOutlookBuilder reportId={id} initial={initial} />;
}

function LoadError() {
  return (
    <div
      role="alert"
      className="mx-auto max-w-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800"
    >
      بارگذاری گزارش ممکن نشد. اتصال پایگاه داده را بررسی کنید.
    </div>
  );
}
