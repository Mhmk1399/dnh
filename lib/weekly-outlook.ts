export const WEEKLY_OUTLOOK_STATUSES = [
  "draft",
  "published",
  "archived",
] as const;

export const WEEKLY_OUTLOOK_SECTION_TONES = [
  "light",
  "soft",
  "dark",
  "teal",
  "accent",
] as const;

export const WEEKLY_OUTLOOK_SECTION_ICONS = [
  "overview",
  "risk",
  "market",
  "policy",
  "asset",
  "watch",
  "conclusion",
  "trend",
  "liquidity",
  "currency",
  "inflation",
  "portfolio",
  "timeline",
  "target",
  "warning",
  "opportunity",
] as const;

export const WEEKLY_OUTLOOK_BLOCK_TYPES = [
  "paragraph",
  "heading",
  "list",
  "callout",
  "quote",
  "image",
  "button",
  "divider",
] as const;

export const WEEKLY_OUTLOOK_CALLOUT_TONES = [
  "info",
  "risk",
  "opportunity",
  "neutral",
] as const;

export const WEEKLY_OUTLOOK_BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "outline",
] as const;

export const WEEKLY_OUTLOOK_DATE_CALENDARS = [
  "jalali",
  "gregorian",
] as const;

export type WeeklyOutlookStatus =
  (typeof WEEKLY_OUTLOOK_STATUSES)[number];

export type WeeklyOutlookSectionTone =
  (typeof WEEKLY_OUTLOOK_SECTION_TONES)[number];

export type WeeklyOutlookSectionIcon =
  (typeof WEEKLY_OUTLOOK_SECTION_ICONS)[number];

export type WeeklyOutlookCalloutTone =
  (typeof WEEKLY_OUTLOOK_CALLOUT_TONES)[number];

export type WeeklyOutlookBlockType =
  (typeof WEEKLY_OUTLOOK_BLOCK_TYPES)[number];

export type WeeklyOutlookButtonVariant =
  (typeof WEEKLY_OUTLOOK_BUTTON_VARIANTS)[number];

export type WeeklyOutlookDateCalendar =
  (typeof WEEKLY_OUTLOOK_DATE_CALENDARS)[number];

type BaseWeeklyOutlookBlock = {
  id: string;
};

export type WeeklyOutlookParagraphBlock =
  BaseWeeklyOutlookBlock & {
    type: "paragraph";
    text: string;
  };

export type WeeklyOutlookHeadingBlock =
  BaseWeeklyOutlookBlock & {
    type: "heading";
    text: string;
    level: "h2" | "h3";
  };

export type WeeklyOutlookListBlock =
  BaseWeeklyOutlookBlock & {
    type: "list";
    items: string[];
  };

export type WeeklyOutlookCalloutBlock =
  BaseWeeklyOutlookBlock & {
    type: "callout";
    title?: string;
    text: string;
    tone: WeeklyOutlookCalloutTone;
  };

export type WeeklyOutlookQuoteBlock =
  BaseWeeklyOutlookBlock & {
    type: "quote";
    text: string;
    cite?: string;
  };

export type WeeklyOutlookImageBlock =
  BaseWeeklyOutlookBlock & {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
  };

export type WeeklyOutlookButtonBlock =
  BaseWeeklyOutlookBlock & {
    type: "button";
    label: string;
    href: string;
    variant: WeeklyOutlookButtonVariant;
    note?: string;
  };

export type WeeklyOutlookDividerBlock =
  BaseWeeklyOutlookBlock & {
    type: "divider";
  };

export type WeeklyOutlookBlock =
  | WeeklyOutlookParagraphBlock
  | WeeklyOutlookHeadingBlock
  | WeeklyOutlookListBlock
  | WeeklyOutlookCalloutBlock
  | WeeklyOutlookQuoteBlock
  | WeeklyOutlookImageBlock
  | WeeklyOutlookButtonBlock
  | WeeklyOutlookDividerBlock;

export type WeeklyOutlookSectionDefinition = {
  id: string;
  eyebrow?: string;
  title: string;
  summary?: string;
  icon: WeeklyOutlookSectionIcon;
  tone: WeeklyOutlookSectionTone;
  blocks: WeeklyOutlookBlock[];
};

export type WeeklyOutlookReportDefinition = {
  title: string;
  slug: string;
  edition: string;
  reportDate: string;
  dateCalendar: WeeklyOutlookDateCalendar;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: WeeklyOutlookStatus;
  sections: WeeklyOutlookSectionDefinition[];
  revision: number;
};

export type PublicWeeklyOutlookReport =
  WeeklyOutlookReportDefinition & {
    id: string;
    publishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };

export type WeeklyOutlookListItem = {
  id: string;
  title: string;
  slug: string;
  edition: string;
  reportDate: string;
  dateCalendar: WeeklyOutlookDateCalendar;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  sectionCount: number;
  publishedAt?: string | null;
};

export function makeWeeklyOutlookStableId(
  prefix: "section" | "block",
) {
  return `${prefix}_${
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}_${Math.random().toString(36).slice(2)}`
  }`;
}

export function createWeeklyOutlookTemplate(): WeeklyOutlookReportDefinition {
  return {
    title: "",
    slug: "",
    edition: "نسخه هفتگی",
    reportDate: new Date().toISOString().slice(0, 10),
    dateCalendar: "jalali",
    excerpt:
      "جمع‌بندی کوتاه این نسخه از چشم‌انداز هفتگی DNH را اینجا وارد کنید.",
    coverImage: "",
    coverImageAlt: "",
    seoTitle: "",
    seoDescription: "",
    status: "draft",
    revision: 0,
    sections: [
      {
        id: makeWeeklyOutlookStableId("section"),
        eyebrow: "تصویر هفته",
        title: "جهان در یک نگاه",
        summary: "مهم‌ترین متغیرهایی که زمینه تصمیم این هفته را شکل دادند.",
        icon: "overview",
        tone: "light",
        blocks: [
          {
            id: makeWeeklyOutlookStableId("block"),
            type: "paragraph",
            text: "متن مقدمه و جمع‌بندی اجرایی گزارش را اینجا بنویسید.",
          },
          {
            id: makeWeeklyOutlookStableId("block"),
            type: "list",
            items: [
              "مهم‌ترین تغییر هفته",
              "ریسکی که باید رصد شود",
              "پیام تصمیمی برای مخاطب",
            ],
          },
        ],
      },
      {
        id: makeWeeklyOutlookStableId("section"),
        eyebrow: "ریسک و بازار",
        title: "بدنه تحلیلی گزارش",
        summary: "تحلیل اقتصاد، بازارها، سیاست پولی و دارایی‌ها.",
        icon: "market",
        tone: "soft",
        blocks: [
          {
            id: makeWeeklyOutlookStableId("block"),
            type: "heading",
            level: "h3",
            text: "عنوان زیربخش",
          },
          {
            id: makeWeeklyOutlookStableId("block"),
            type: "paragraph",
            text: "متن تحلیلی این بخش را وارد کنید. برای تصویر هم می‌توانید بلوک تصویر اضافه کنید.",
          },
        ],
      },
      {
        id: makeWeeklyOutlookStableId("section"),
        eyebrow: "برداشت DNH",
        title: "نتیجه‌گیری تصمیم‌محور",
        summary: "گزارش با برداشت راهبردی و متغیرهای قابل رصد تمام می‌شود.",
        icon: "conclusion",
        tone: "dark",
        blocks: [
          {
            id: makeWeeklyOutlookStableId("block"),
            type: "callout",
            tone: "info",
            title: "برداشت نهایی",
            text: "جمع‌بندی تصمیم‌محور این نسخه را اینجا بنویسید.",
          },
        ],
      },
    ],
  };
}
