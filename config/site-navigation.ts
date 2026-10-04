/** Shared navigation content for the header, mobile menu, and footer. */
export type MegaMenuKey = "dnh" | "services" | "target-markets";
export type NavigationIcon = "architecture" | "framework" | "intelligence" | "wealth" | "portfolio" | "advisory" | "market" | "risk" | "briefing" | "decision" | "holdings";

export type SiteLink = { title: string; href: string };
export type MegaItem = SiteLink & { description: string; icon: NavigationIcon };
export type NavigationItem = { title: string; href?: string; menu?: MegaMenuKey };
export type MegaMenuDefinition = {
  title: string;
  headline: string;
  description: string;
  eyebrow: string;
  overview: SiteLink;
  items: MegaItem[];
};

export const CONSULTATION_PATH = "/request-strategic-consultation";
export const ASSESSMENT_PATH = "/financial-decision-assessment";

export const NAVIGATION: NavigationItem[] = [
  { title: "خانه", href: "/" },
  { title: "دنیای DNH", menu: "dnh" },
  { title: "خدمات", menu: "services", href: "/services" },
  { title: "برای چه کسانی؟", menu: "target-markets" },
  { title: "دانش", href: "/knowledge" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس", href: "/contact" },
];

export const DNH_ITEMS: MegaItem[] = [
  { title: "معماری ثروت", description: "یک تصویر منسجم از ثروت، سرمایه و تصمیم‌های شما.", href: "/dnh/wealth-architecture", icon: "architecture" },
  { title: "چارچوب DNH", description: "از شناخت مسئله تا ساختن مسیر تصمیم.", href: "/dnh/framework", icon: "framework" },
  { title: "میز هوشمندی DNH", description: "داده و تحلیل برای دیدن تصویر بزرگ‌تر.", href: "/dnh/intelligence-desk", icon: "intelligence" },
];

export const SERVICE_ITEMS: MegaItem[] = [
  { title: "استراتژی ثروت خصوصی", description: "ساختاردهی و برنامه‌ریزی بلندمدت ثروت.", href: "/services/private-wealth-strategy", icon: "wealth" },
  { title: "هوشمندی پرتفوی", description: "شناخت ترکیب، تمرکز و رفتار دارایی‌ها.", href: "/services/portfolio-intelligence", icon: "portfolio" },
  { title: "مشاوره مالی راهبردی", description: "تحلیل ابعاد تصمیم‌های مهم مالی.", href: "/services/strategic-financial-advisory", icon: "advisory" },
  { title: "مشاوره اقتصاد و بازار", description: "درک روندها و سناریوهای پیش رو.", href: "/services/macro-market-advisory", icon: "market" },
  { title: "مدیریت ریسک و حفاظت از ثروت", description: "شناسایی ریسک و سنجش آسیب‌پذیری‌ها.", href: "/services/risk-management-wealth-protection", icon: "risk" },
  { title: "نشست‌های مدیران", description: "گفت‌وگوی تحلیلی برای تصمیم‌های راهبردی.", href: "/services/executive-briefings", icon: "briefing" },
];

export const TARGET_MARKET_ITEMS: MegaItem[] = [
  { title: "در آستانه یک تصمیم مالی بزرگ", description: "وقتی یک تصمیم، مسیر آینده را تغییر می‌دهد.", href: "/target-markets/big-financial-decision", icon: "decision" },
  { title: "پرتفوی پراکنده و بدون معماری", description: "وقتی دارایی‌ها به یک ساختار مشترک نیاز دارند.", href: "/target-markets/unstructured-portfolio", icon: "portfolio" },
  { title: "هلدینگ‌ها و ساختار سرمایه", description: "وقتی تصمیم‌های مالی چندلایه و به‌هم‌پیوسته‌اند.", href: "/target-markets/holdings-financial-capital-structure", icon: "holdings" },
];

export const MEGA_MENUS: Record<MegaMenuKey, MegaMenuDefinition> = {
  dnh: {
    title: "دنیای DNH", eyebrow: "نگاه ما به ثروت",
    headline: "پیش از هر تصمیم،\nتصویر کامل‌تر را ببینید.",
    description: "آشنایی با نگاه، چارچوب و ابزارهای تحلیلی دی‌ان‌اچ.",
    overview: { title: "آشنایی با DNH", href: "/about" }, items: DNH_ITEMS,
  },
  services: {
    title: "خدمات تخصصی", eyebrow: "مسیرهای همکاری",
    headline: "برای هر مسئله،\nیک نگاه دقیق‌تر.",
    description: "از معماری ثروت تا تحلیل بازار؛ خدماتی متناسب با مسئله شما.",
    overview: { title: "مشاهده همه خدمات", href: "/services" }, items: SERVICE_ITEMS,
  },
  "target-markets": {
    title: "از موقعیت خود شروع کنید", eyebrow: "شناخت موقعیت شما",
    headline: "مسئله شما،\nنقطه شروع ماست.",
    description: "مسیر مناسب را با شناخت موقعیت مالی و اولویت‌های خود پیدا کنید.",
    overview: { title: "ارزیابی تصمیم مالی", href: ASSESSMENT_PATH }, items: TARGET_MARKET_ITEMS,
  },
};

export const LEGAL_LINKS: SiteLink[] = [
  { title: "حریم خصوصی", href: "/legal/privacy-policy" },
  { title: "شرایط استفاده", href: "/legal/terms-of-use" },
  { title: "سلب مسئولیت مالی", href: "/legal/financial-disclaimer" },
  { title: "حفاظت داده", href: "/legal/data-protection-advisory-limitation" },
  { title: "عدم تضمین سرمایه‌گذاری", href: "/legal/no-investment-guarantee-no-trading-signal" },
];

/** Content routes currently live under app/[locale]; the public home is /. */
export function getSiteHref(href: string, pathname = "/") {
  if (href === "/" || !href.startsWith("/") || /^\/(fa|en)(\/|$)/.test(href)) return href;
  const locale = pathname.match(/^\/(fa|en)(?:\/|$)/)?.[1] ?? "fa";
  return `/${locale}${href}`;
}

export function isSitePathActive(href: string, pathname: string) {
  const path = pathname.replace(/^\/(fa|en)(?=\/|$)/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}
