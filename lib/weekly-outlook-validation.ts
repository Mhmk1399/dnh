import {
  WEEKLY_OUTLOOK_BLOCK_TYPES,
  WEEKLY_OUTLOOK_CALLOUT_TONES,
  WEEKLY_OUTLOOK_SECTION_ICONS,
  WEEKLY_OUTLOOK_SECTION_TONES,
  WEEKLY_OUTLOOK_STATUSES,
  makeWeeklyOutlookStableId,
  type WeeklyOutlookBlock,
  type WeeklyOutlookCalloutTone,
  type WeeklyOutlookReportDefinition,
  type WeeklyOutlookSectionDefinition,
  type WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";
import { cleanText } from "@/lib/validation";

export class WeeklyOutlookDefinitionError extends Error {
  constructor(public issues: Record<string, string>) {
    super("Invalid weekly outlook report definition");
  }
}

const isOneOf = <T extends readonly string[]>(
  value: unknown,
  values: T,
): value is T[number] =>
  typeof value === "string" && values.includes(value as T[number]);

export function normalizeWeeklyOutlookSlug(value: unknown) {
  return cleanText(value, 100)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanLongText(value: unknown, max: number) {
  return typeof value === "string"
    ? value.replace(/\r\n/g, "\n").trim().slice(0, max)
    : "";
}

function stableId(
  value: unknown,
  _path: string,
  _issues: Record<string, string>,
  prefix: "section" | "block",
) {
  const id = cleanText(value, 120);
  const validPattern = new RegExp(`^${prefix}_[a-zA-Z0-9_-]{1,100}$`);

  if (validPattern.test(id)) {
    return id;
  }

  const suffix = id
    .replace(new RegExp(`^${prefix}[-_]?`, "i"), "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[-_]+|[-_]+$/g, "")
    .slice(0, 100);

  const normalized = suffix ? `${prefix}_${suffix}` : "";

  if (validPattern.test(normalized)) {
    return normalized;
  }

  return makeWeeklyOutlookStableId(prefix);
}

function ensureUniqueStableIds(sections: WeeklyOutlookSectionDefinition[]) {
  const used = new Set<string>();

  function unique(id: string, prefix: "section" | "block") {
    if (!used.has(id)) {
      used.add(id);
      return id;
    }

    let next = makeWeeklyOutlookStableId(prefix);

    while (used.has(next)) {
      next = makeWeeklyOutlookStableId(prefix);
    }

    used.add(next);
    return next;
  }

  return sections.map((section) => ({
    ...section,
    id: unique(section.id, "section"),
    blocks: section.blocks.map((block) => ({
      ...block,
      id: unique(block.id, "block"),
    })),
  }));
}

function parseDate(value: unknown, issues: Record<string, string>) {
  const dateText = cleanText(value, 30);
  const date = new Date(dateText);

  if (!dateText || Number.isNaN(date.getTime())) {
    issues.reportDate = "تاریخ گزارش معتبر نیست.";
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

function parseImageSrc(value: unknown, path: string, issues: Record<string, string>) {
  const src = cleanText(value, 900);

  if (!src) return "";

  const isLocal = src.startsWith("/");
  const isRemote = /^https:\/\/[^\s]+$/i.test(src);

  if (!isLocal && !isRemote) {
    issues[path] = "آدرس تصویر باید مسیر داخلی سایت یا لینک امن https باشد.";
  }

  return src;
}

function parseListItems(value: unknown, maxItems = 24) {
  if (Array.isArray(value)) {
    return value
      .slice(0, maxItems)
      .map((item) => cleanLongText(item, 500))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .slice(0, maxItems)
      .map((item) => cleanLongText(item, 500).replace(/^[-•\d.\s]+/, ""))
      .filter(Boolean);
  }

  return [];
}

function parseBlock(
  raw: unknown,
  sectionIndex: number,
  blockIndex: number,
  issues: Record<string, string>,
): WeeklyOutlookBlock {
  const path = `sections.${sectionIndex}.blocks.${blockIndex}`;
  const value =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const type = isOneOf(value.type, WEEKLY_OUTLOOK_BLOCK_TYPES)
    ? value.type
    : "paragraph";
  const id = stableId(value.id, `${path}.id`, issues, "block");

  if (type === "heading") {
    const text = cleanText(value.text, 220);
    const level = value.level === "h2" ? "h2" : "h3";

    if (!text) issues[`${path}.text`] = "متن تیتر الزامی است.";

    return { id, type, text, level };
  }

  if (type === "list") {
    const items = parseListItems(value.items);

    if (items.length < 1) issues[`${path}.items`] = "حداقل یک آیتم وارد کنید.";

    return { id, type, items };
  }

  if (type === "callout") {
    const text = cleanLongText(value.text, 1800);
    const tone: WeeklyOutlookCalloutTone = isOneOf(
      value.tone,
      WEEKLY_OUTLOOK_CALLOUT_TONES,
    )
      ? value.tone
      : "info";

    if (!text) issues[`${path}.text`] = "متن نکته الزامی است.";

    return {
      id,
      type,
      title: cleanText(value.title, 140) || undefined,
      text,
      tone,
    };
  }

  if (type === "quote") {
    const text = cleanLongText(value.text, 1600);

    if (!text) issues[`${path}.text`] = "متن نقل‌قول الزامی است.";

    return {
      id,
      type,
      text,
      cite: cleanText(value.cite, 140) || undefined,
    };
  }

  if (type === "image") {
    const src = parseImageSrc(value.src, `${path}.src`, issues);
    const alt = cleanText(value.alt, 220);

    if (!src) issues[`${path}.src`] = "آدرس تصویر الزامی است.";
    if (!alt) issues[`${path}.alt`] = "متن جایگزین تصویر الزامی است.";

    return {
      id,
      type,
      src,
      alt,
      caption: cleanText(value.caption, 260) || undefined,
    };
  }

  if (type === "divider") {
    return { id, type };
  }

  const text = cleanLongText(value.text, 5000);

  if (!text) issues[`${path}.text`] = "متن پاراگراف الزامی است.";

  return { id, type: "paragraph", text };
}

function parseSection(
  raw: unknown,
  index: number,
  issues: Record<string, string>,
): WeeklyOutlookSectionDefinition {
  const path = `sections.${index}`;
  const value =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const blocksRaw = Array.isArray(value.blocks) ? value.blocks : [];
  const title = cleanText(value.title, 180);
  const icon = isOneOf(value.icon, WEEKLY_OUTLOOK_SECTION_ICONS)
    ? value.icon
    : "overview";
  const tone = isOneOf(value.tone, WEEKLY_OUTLOOK_SECTION_TONES)
    ? value.tone
    : "light";

  if (!title) issues[`${path}.title`] = "عنوان سکشن الزامی است.";
  if (blocksRaw.length > 40) {
    issues[`${path}.blocks`] = "حداکثر ۴۰ بلوک برای هر سکشن مجاز است.";
  }

  return {
    id: stableId(value.id, `${path}.id`, issues, "section"),
    eyebrow: cleanText(value.eyebrow, 120) || undefined,
    title,
    summary: cleanLongText(value.summary, 700) || undefined,
    icon,
    tone,
    blocks: blocksRaw
      .slice(0, 40)
      .map((block, blockIndex) =>
        parseBlock(block, index, blockIndex, issues),
      ),
  };
}

export function validateWeeklyOutlookReport(
  raw: unknown,
  requestedStatus?: WeeklyOutlookStatus,
): WeeklyOutlookReportDefinition {
  const issues: Record<string, string> = {};
  const value =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const title = cleanText(value.title, 180);
  const slug = normalizeWeeklyOutlookSlug(value.slug);
  const reportDate = parseDate(value.reportDate, issues);
  const status =
    requestedStatus ??
    (isOneOf(value.status, WEEKLY_OUTLOOK_STATUSES)
      ? value.status
      : "draft");
  const sectionsRaw = Array.isArray(value.sections) ? value.sections : [];
  const sections = ensureUniqueStableIds(
    sectionsRaw
      .slice(0, 24)
      .map((section, index) => parseSection(section, index, issues)),
  );

  if (title.length < 4) issues.title = "عنوان گزارش باید حداقل ۴ حرف باشد.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    issues.slug = "شناسه مسیر باید انگلیسی و با خط تیره باشد.";
  }
  if (cleanText(value.edition, 120).length < 2) {
    issues.edition = "نام نسخه گزارش الزامی است.";
  }
  if (cleanLongText(value.excerpt, 900).length < 10) {
    issues.excerpt = "توضیح کوتاه گزارش باید حداقل ۱۰ حرف باشد.";
  }
  if (sectionsRaw.length < 1) issues.sections = "حداقل یک سکشن لازم است.";
  if (sectionsRaw.length > 24) issues.sections = "حداکثر ۲۴ سکشن مجاز است.";
  const coverImage = parseImageSrc(
    value.coverImage,
    "coverImage",
    issues,
  );

  if (coverImage && !cleanText(value.coverImageAlt, 220)) {
    issues.coverImageAlt = "برای تصویر اصلی، متن جایگزین لازم است.";
  }

  if (Object.keys(issues).length) {
    throw new WeeklyOutlookDefinitionError(issues);
  }

  return {
    title,
    slug,
    edition: cleanText(value.edition, 120),
    reportDate,
    excerpt: cleanLongText(value.excerpt, 900),
    coverImage: coverImage || undefined,
    coverImageAlt: cleanText(value.coverImageAlt, 220) || undefined,
    seoTitle: cleanText(value.seoTitle, 180) || undefined,
    seoDescription: cleanLongText(value.seoDescription, 320) || undefined,
    status,
    sections,
    revision: Number.isInteger(Number(value.revision))
      ? Math.max(0, Number(value.revision))
      : 0,
  };
}
