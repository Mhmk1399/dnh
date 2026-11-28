import type { WeeklyOutlookBlock, WeeklyOutlookSectionDefinition } from "@/lib/weekly-outlook";
import type { WeeklyOutlookReportRecord } from "@/models/WeeklyOutlookReport";

export function mapWeeklyOutlookSections(
  sections: WeeklyOutlookReportRecord["sections"],
): WeeklyOutlookSectionDefinition[] {
  return sections.map((section) => ({
    id: section.id,
    eyebrow: section.eyebrow,
    title: section.title,
    summary: section.summary,
    icon: section.icon,
    tone: section.tone,
    visual: section.visual ?? "grid",
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
