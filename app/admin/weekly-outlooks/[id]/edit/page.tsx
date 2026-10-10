import type { Metadata } from "next";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { WeeklyOutlookBuilder } from "@/components/weekly-outlooks/WeeklyOutlookBuilder";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/lib/models/WeeklyOutlookReport";
import type {
  WeeklyOutlookBlock,
  WeeklyOutlookReportDefinition,
} from "@/lib/weekly-outlook";

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
    edition: row.edition,
    reportDate: new Date(row.reportDate).toISOString().slice(0, 10),
    dateCalendar: row.dateCalendar ?? "jalali",
    excerpt: row.excerpt,
    coverImage: row.coverImage || "",
    coverImageAlt: row.coverImageAlt || "",
    seoTitle: row.seoTitle || "",
    seoDescription: row.seoDescription || "",
    status: row.status,
    revision: row.revision,
    sections: row.sections.map((section) => ({
      id: section.id,
      eyebrow: section.eyebrow,
      title: section.title,
      summary: section.summary,
      icon: section.icon,
      tone: section.tone,
      blocks: section.blocks.map((block) => {
        if (block.type === "heading") {
          return {
            id: block.id,
            type: "heading",
            text: block.text ?? "",
            level: block.level === "h2" ? "h2" : "h3",
          };
        }

        if (block.type === "list") {
          return {
            id: block.id,
            type: "list",
            items: block.items ? [...block.items] : [],
          };
        }

        if (block.type === "callout") {
          return {
            id: block.id,
            type: "callout",
            title: block.title,
            text: block.text ?? "",
            tone: block.tone ?? "info",
          };
        }

        if (block.type === "quote") {
          return {
            id: block.id,
            type: "quote",
            text: block.text ?? "",
            cite: block.cite,
          };
        }

        if (block.type === "image") {
          return {
            id: block.id,
            type: "image",
            src: block.src ?? "",
            alt: block.alt ?? "",
            caption: block.caption,
          };
        }

        if (block.type === "button") {
          return {
            id: block.id,
            type: "button",
            label: block.label ?? "",
            href: block.href ?? "/",
            variant: block.variant ?? "primary",
            note: block.note,
          };
        }

        if (block.type === "divider") {
          return {
            id: block.id,
            type: "divider",
          };
        }

        return {
          id: block.id,
          type: "paragraph",
          text: block.text ?? "",
        };
      }) as WeeklyOutlookBlock[],
    })),
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
