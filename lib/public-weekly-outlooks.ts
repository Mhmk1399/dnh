import "server-only";

import connect from "@/lib/data";
import WeeklyOutlookReport, {
  type WeeklyOutlookReportRecord,
} from "@/lib/models/WeeklyOutlookReport";
import type {
  PublicWeeklyOutlookReport,
  WeeklyOutlookBlock,
  WeeklyOutlookListItem,
  WeeklyOutlookSectionDefinition,
} from "@/lib/weekly-outlook";
import { normalizeWeeklyOutlookDateCalendar } from "@/lib/weekly-outlook-date";

type WeeklyOutlookLean = WeeklyOutlookReportRecord & {
  _id: unknown;
};

function isoDate(value: Date | string | undefined | null) {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString();
}

function reportDate(value: Date | string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10)
    : date.toISOString().slice(0, 10);
}

function mapSections(
  sections: WeeklyOutlookReportRecord["sections"],
): WeeklyOutlookSectionDefinition[] {
  return sections.map((section) => ({
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
  }));
}

function mapReport(row: WeeklyOutlookLean): PublicWeeklyOutlookReport {
  return {
    id: String(row._id),
    title: row.title,
    slug: row.slug,
    edition: row.edition,
    reportDate: reportDate(row.reportDate),
    dateCalendar: normalizeWeeklyOutlookDateCalendar(row.dateCalendar),
    excerpt: row.excerpt,
    coverImage: row.coverImage || undefined,
    coverImageAlt: row.coverImageAlt || undefined,
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    status: row.status,
    sections: mapSections(row.sections),
    revision: row.revision,
    publishedAt: isoDate(row.publishedAt) ?? null,
    createdAt: isoDate(row.createdAt),
    updatedAt: isoDate(row.updatedAt),
  };
}

function mapListItem(row: WeeklyOutlookLean): WeeklyOutlookListItem {
  return {
    id: String(row._id),
    title: row.title,
    slug: row.slug,
    edition: row.edition,
    reportDate: reportDate(row.reportDate),
    dateCalendar: normalizeWeeklyOutlookDateCalendar(row.dateCalendar),
    excerpt: row.excerpt,
    coverImage: row.coverImage || undefined,
    coverImageAlt: row.coverImageAlt || undefined,
    sectionCount: row.sections.length,
    publishedAt: isoDate(row.publishedAt) ?? null,
  };
}

export async function getPublishedWeeklyOutlookList(): Promise<
  WeeklyOutlookListItem[]
> {
  try {
    await connect();

    const rows = await WeeklyOutlookReport.find({ status: "published" })
      .select(
        "title slug edition reportDate dateCalendar excerpt coverImage coverImageAlt sections publishedAt",
      )
      .sort({ reportDate: -1, updatedAt: -1 })
      .limit(100)
      .lean();

    return (rows as WeeklyOutlookLean[]).map(mapListItem);
  } catch (error) {
    console.error("Unable to load weekly outlook list", error);
    return [];
  }
}

export async function getPublishedWeeklyOutlookReport(
  slug: string,
): Promise<PublicWeeklyOutlookReport | null> {
  try {
    await connect();

    const row = await WeeklyOutlookReport.findOne({
      slug,
      status: "published",
    }).lean();

    if (row) return mapReport(row as WeeklyOutlookLean);
  } catch (error) {
    console.error("Unable to load weekly outlook report", error);
  }

  return null;
}
