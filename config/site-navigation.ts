/**
 * Shared navigation content for:
 * - Desktop Header
 * - Mega Menu
 * - Mobile Navigation
 * - Footer
 */

import shellContent from "@/config/site-shell.json";
import {
  getLocaleFromPathname,
  getLocalizedSiteHref,
  stripLocalePrefix,
  type SiteLocale,
} from "@/lib/site-language";

export type MegaMenuKey =
  | "dnh"
  | "services"
  | "who-we-help"
  | "knowledge";

export type NavigationIcon =
  | "architecture"
  | "framework"
  | "intelligence"
  | "wealth"
  | "portfolio"
  | "advisory"
  | "market"
  | "risk"
  | "briefing"
  | "decision"
  | "holdings"
  | "outlook"
  | "insight"
  | "research"
  | "case-study"
  | "faq";

export type SiteLink = {
  title: string;
  href: string;
};

export type MegaItem = SiteLink & {
  description: string;
  icon: NavigationIcon;
};

export type NavigationItem = {
  title: string;
  href?: string;
  menu?: MegaMenuKey;
};

export type MegaMenuDefinition = {
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  overview: SiteLink;
  items: MegaItem[];
};

/* =============================================================================
   Conversion
============================================================================= */

export const CONSULTATION_PATH =
  "/request-strategic-consultation";

export const ASSESSMENT_PATH =
  "/financial-decision-assessment";

export const CONTACT_PATH = "/contact";

/* =============================================================================
   Primary Navigation
============================================================================= */

export const NAVIGATION: NavigationItem[] = [
  {
    title: "خانه",
    href: "/",
  },

  {
    title: "DNH",
    menu: "dnh",
  },

  {
    title: "خدمات",
    href: "/services",
    menu: "services",
  },

  {
    title: "برای چه کسانی؟",
    menu: "who-we-help",
  },

  {
    title: "دانش و پژوهش",
    href: "/knowledge",
    menu: "knowledge",
  },

  {
    title: "درباره DNH",
    href: "/about",
  },
];

/* =============================================================================
   DNH
============================================================================= */

export const DNH_ITEMS: MegaItem[] = [
  {
    title: "معماری ثروت",
    description:
      "دیدن ثروت به‌عنوان یک ساختار منسجم از دارایی، ریسک، نقدینگی، اهداف و تصمیم‌ها.",
    href: "/dnh/wealth-architecture",
    icon: "architecture",
  },

  {
    title: "چارچوب DNH",
    description:
      "رویکرد اختصاصی DNH برای تبدیل داده و عدم‌قطعیت به سناریو و مسیر تصمیم.",
    href: "/dnh/framework",
    icon: "framework",
  },

  {
    title: "میز هوشمندی DNH",
    description:
      "رصد اقتصاد، بازار، ریسک و متغیرهای تصمیم برای شکل‌دادن به یک نگاه راهبردی.",
    href: "/dnh/intelligence-desk",
    icon: "intelligence",
  },
];

/* =============================================================================
   Services
============================================================================= */

export const SERVICE_ITEMS: MegaItem[] = [
  {
    title: "استراتژی ثروت خصوصی",
    description:
      "ساختن تصویری منسجم‌تر از ثروت، اهداف، ریسک و مسیرهای قابل بررسی.",
    href: "/services/private-wealth-strategy",
    icon: "wealth",
  },

  {
    title: "هوشمندی پرتفوی",
    description:
      "ارزیابی ساختار پرتفوی، تمرکز ریسک، نقدشوندگی و حوزه‌های نیازمند بازبینی.",
    href: "/services/portfolio-intelligence",
    icon: "portfolio",
  },

  {
    title: "مشاوره مالی راهبردی",
    description:
      "بررسی تصمیم‌هایی که سرمایه، نقدینگی، تأمین مالی   را به هم مرتبط می‌کنند.",
    href: "/services/strategic-financial-advisory",
    icon: "advisory",
  },

  {
    title: "مشاوره اقتصاد و بازار",
    description:
      "تحلیل شرایط اقتصادی، سناریوهای مرتبط و پیامدهای راهبردی برای تصمیم.",
    href: "/services/macro-market-advisory",
    icon: "market",
  },

  {
    title: "مدیریت ریسک و حفاظت از ثروت",
    description:
      "شناخت رGیسک‌های مهم و ایجاد تصویری ساختاریافته از اولویت‌های حفاظتی.",
    href: "/services/risk-management-wealth-protection",
    icon: "risk",
  },

  {
    title: "نشست‌های مدیران",
    description:
      "بررسی متمرکز موضوعات مهم برای مدیران ارشد، هیئت‌مدیره و تصمیم‌گیرندگان  .",
    href: "/services/executive-briefings",
    icon: "briefing",
  },
];

/* =============================================================================
   Who We Help
============================================================================= */

export const WHO_WE_HELP_ITEMS: MegaItem[] = [
  {
    title: "در آستانه یک تصمیم مالی بزرگ",
    description:
      "وقتی پیش از یک انتخاب مهم باید مسئله، ریسک، نقدشوندگی، افق زمانی و سناریوها روشن‌تر شوند.",
    href: "/who-we-help/big-financial-decision",
    icon: "decision",
  },

  {
    title: "پرتفوی پراکنده و بدون معماری",
    description:
      "وقتی دارایی‌های متعدد وجود دارند، اما هنوز در یک ساختار منسجم کنار هم دیده نمی‌شوند.",
    href: "/who-we-help/unstructured-portfolio",
    icon: "portfolio",
  },

  {
    title: "هلدینگ‌ها و ساختار مالی و سرمایه",
    description:
      "وقتی سرمایه، نقدینگی، تأمین مالی، ریسک و اهداف یک مجموعه باید در کنار هم بررسی شوند.",
    href: "/who-we-help/holdings-financial-capital-structure",
    icon: "holdings",
  },
];

/* =============================================================================
   Knowledge & Research
============================================================================= */

export const KNOWLEDGE_ITEMS: MegaItem[] = [
  {
    title: "DNH Weekly Outlook",
    description:
      "گزارش فشرده شرایط، ریسک‌های کلان، دارایی‌ها و آنچه باید زیر نظر باشد.",
    href: "/knowledge/weekly-outlook",
    icon: "outlook",
  },


  // {
  //   title: "پژوهش",
  //   description:
  //     "یادداشت‌های پژوهشی، گزارش‌های کلان، نمودارها و مطالعات قابل انتشار DNH.",
  //   href: "/knowledge/research",
  //   icon: "research",
  // },

  // {
  //   title: "مطالعات موردی",
  //   description:
  //     "پرونده‌های ناشناس برای نمایش منطق بررسی مسئله، سناریو و تصمیم.",
  //   href: "/knowledge/case-studies",
  //   icon: "case-study",
  // },

  {
    title: "پرسش‌های متداول",
    description:
      "پاسخ‌های روشن درباره خدمات، محرمانگی، مرزهای حرفه‌ای و شیوه همکاری.",
    href: "/knowledge/faq",
    icon: "faq",
  },
];

/* =============================================================================
   Mega Menus
============================================================================= */

export const MEGA_MENUS: Record<
  MegaMenuKey,
  MegaMenuDefinition
> = {
  dnh: {
    title: "DNH",

    eyebrow: "سیستم تصمیم‌سازی",

    headline:
      "ثروت را فقط به‌صورت دارایی نبینید؛ساختار پشت آن را ببینید.",

    description:
      "معماری ثروت، چارچوب DNH و میز هوشمندی، سه بخش اصلی سیستم فکری و تحلیلی DNH هستند.",

    overview: {
      title: "شروع از معماری ثروت",
      href: "/dnh/wealth-architecture",
    },

    items: DNH_ITEMS,
  },

  services: {
    title: "خدمات تخصصی",

    eyebrow: "مسیرهای همکاری",

    headline:
      "خدمت مناسب،\nاز مسئله درست آغاز می‌شود.",

    description:
      "شش مسیر تخصصی برای بررسی ساختار ثروت، پرتفوی، ریسک، محیط اقتصادی و تصمیم‌های مالی پیچیده.",

    overview: {
      title: "مشاهده همه خدمات",
      href: "/services",
    },

    items: SERVICE_ITEMS,
  },

  "who-we-help": {
    title: "برای چه کسانی؟",

    eyebrow: "از موقعیت خود شروع کنید",

    headline:
      "پیش از انتخاب راه‌حل،\nمسئله باید درست دیده شود.",

    description:
      "مسیر مناسب DNH از شناخت موقعیت، پیچیدگی و نوع تصمیم شما آغاز می‌شود.",

    overview: {
      title: "شروع با ارزیابی اولیه تصمیم مالی",
      href: ASSESSMENT_PATH,
    },

    items: WHO_WE_HELP_ITEMS,
  },

  knowledge: {
    title: "دانش و پژوهش",

    eyebrow: "Research & Insight Hub",

    headline:
      "تحلیل برای تصمیم؛\nنه هیجان بازار.",

    description:
      "گزارش‌ها، تحلیل‌ها و پژوهش‌های DNH برای شناخت بهتر شرایط، ریسک و پیامدهای راهبردی.",

    overview: {
      title: "چشم‌انداز هفتگی DNH",
      href: "/knowledge/weekly-outlook",
    },

    items: KNOWLEDGE_ITEMS,
  },
};

/* =============================================================================
   Legal
============================================================================= */

export const LEGAL_LINKS: SiteLink[] = [
  {
    title: "حریم خصوصی",
    href: "/legal/privacy-policy",
  },

  {
    title: "شرایط استفاده",
    href: "/legal/terms-of-use",
  }
];

/* =============================================================================
   Public links
============================================================================= */

/**
 * Current routing rule:
 *
 * Content keeps language-neutral hrefs; public navigation uses /fa and /en.
 * Shared admin, API and asset URLs remain unprefixed.
 */
export function getSiteHref(
  href: string,
  pathname = "/",
) {
  return getLocalizedSiteHref(href, getLocaleFromPathname(pathname) ?? "fa");
}

export function isSitePathActive(
  href: string,
  pathname: string,
) {
  const normalizedHref = stripLocalePrefix(href.split(/[?#]/, 1)[0]);
  const path = stripLocalePrefix(pathname);

  return normalizedHref === "/"
    ? path === "/"
    : path === normalizedHref ||
    path.startsWith(`${normalizedHref}/`);
}

/** Translate labels while keeping route and icon identities unchanged. */
export function getLocalizedSiteNavigation(locale: SiteLocale) {
  const links: Record<string, { title: string; description?: string }> =
    shellContent.en.links;
  const titles: Record<string, string> = shellContent.en.navigation;

  function translateLink<T extends SiteLink>(item: T): T {
    return locale === "en" && links[item.href]
      ? { ...item, ...links[item.href] }
      : item;
  }

  const navigation = NAVIGATION.map((item) => ({
    ...item,
    title:
      locale === "en"
        ? titles[item.menu ?? item.href ?? ""] ?? item.title
        : item.title,
  }));
  const megaMenus = { ...MEGA_MENUS };
  if (locale === "en") {
    for (const key of Object.keys(MEGA_MENUS) as MegaMenuKey[]) {
      const content = shellContent.en.menus[key];
      const menu = MEGA_MENUS[key];
      megaMenus[key] = {
        ...menu,
        title: content.title,
        eyebrow: content.eyebrow,
        headline: content.headline,
        description: content.description,
        overview: { ...menu.overview, title: content.overview_title },
        items: menu.items.map(translateLink),
      };
    }
  }

  return {
    navigation,
    megaMenus,
    legalLinks: LEGAL_LINKS.map(translateLink),
    translateLink,
  };
}
