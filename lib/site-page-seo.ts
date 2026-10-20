import type { SiteLocale } from "@/lib/site-language";

export type LocalizedPageSeo = {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  noIndex?: boolean;
};

type PageSeoEntry = Record<SiteLocale, LocalizedPageSeo>;

const pageSeo: Record<string, PageSeoEntry> = {
  "/": {
    fa: {
      title: "معماری ثروت و مشاوره مالی راهبردی",
      description:
        "DNH به افراد، خانواده‌ها، صاحبان سرمایه و مدیران کمک می‌کند تصمیم‌های مالی مهم را با نگاهی ساختاریافته به ثروت، ریسک، نقدینگی و سناریوها بررسی کنند.",
      keywords: [
        "معماری ثروت",
        "مشاوره مالی راهبردی",
        "مدیریت ثروت",
        "تصمیم‌گیری مالی",
        "DNH",
      ],
      image: "/assets/images/dnh-hero-desktop.png",
    },
    en: {
      title: "Wealth Architecture and Strategic Financial Advisory",
      description:
        "DNH helps individuals, families, capital owners and executives evaluate important financial decisions through an integrated view of wealth, risk, liquidity and scenarios.",
      keywords: [
        "wealth architecture",
        "strategic financial advisory",
        "wealth management",
        "financial decision making",
        "DNH",
      ],
      image: "/assets/images/dnh-hero-desktop.png",
    },
  },
  "/about": {
    fa: {
      title: "درباره DNH و رویکرد معماری ثروت",
      description:
        "با DNH، فلسفه تصمیم‌سازی ساختاریافته و رویکرد دکتر نسیم محمدحسنی در پیوند مدیریت ثروت، ریسک، سرمایه‌گذاری و تصمیم‌های مالی آشنا شوید.",
      keywords: ["درباره DNH", "دکتر نسیم محمدحسنی", "معماری ثروت", "مشاور مالی راهبردی"],
      image: "/assets/images/about-hero-desktop.png",
    },
    en: {
      title: "About DNH and Its Wealth Architecture Approach",
      description:
        "Discover DNH, its structured decision-making philosophy, and Dr. Nasim Mohammadhassani’s approach to wealth, risk, investment and strategic financial decisions.",
      keywords: ["about DNH", "Nasim Mohammadhassani", "wealth architecture", "strategic financial adviser"],
      image: "/assets/images/about-hero-desktop.png",
    },
  },
  "/contact": {
    fa: {
      title: "تماس با DNH",
      description:
        "برای طرح مسئله مالی، پیگیری درخواست یا آشنایی با مسیر ارزیابی و مشاوره راهبردی با DNH در تماس باشید.",
      keywords: ["تماس با DNH", "درخواست مشاوره مالی", "مشاور مالی", "معماری ثروت"],
      image: "/assets/images/dnh-hero-desktop.png",
    },
    en: {
      title: "Contact DNH",
      description:
        "Contact DNH to discuss a financial issue, follow up on a request, or learn about the assessment and strategic advisory process.",
      keywords: ["contact DNH", "financial consultation request", "financial adviser", "wealth architecture"],
      image: "/assets/images/dnh-hero-desktop.png",
    },
  },
  "/dnh/wealth-architecture": {
    fa: {
      title: "معماری ثروت چیست؟",
      description:
        "معماری ثروت رویکردی یکپارچه برای شناخت نقش دارایی‌ها، ریسک، نقدشوندگی، اهداف و افق زمانی در ساختار کلی ثروت است.",
      keywords: ["معماری ثروت", "ساختار ثروت", "مدیریت دارایی", "ریسک و نقدشوندگی", "اهداف مالی"],
      image: "/assets/images/DNH-Wealth-Architecture.webp",
    },
    en: {
      title: "What Is Wealth Architecture?",
      description:
        "Wealth architecture is an integrated approach to defining the role of assets, risk, liquidity, objectives and time horizon within an overall wealth structure.",
      keywords: ["wealth architecture", "wealth structure", "asset management", "risk and liquidity", "financial objectives"],
      image: "/assets/images/DNH-Wealth-Architecture.webp",
    },
  },
  "/dnh/framework": {
    fa: {
      title: "چارچوب DNH برای تصمیم‌گیری مالی",
      description:
        "چارچوب DNH داده، هدایت تصمیم و معماری افق را برای تحلیل شرایط، سناریوها، ریسک‌ها و اهداف بلندمدت کنار هم قرار می‌دهد.",
      keywords: ["چارچوب DNH", "تصمیم‌گیری مالی", "هوشمندی داده", "تحلیل سناریو", "معماری افق"],
      image: "/assets/images/dnh-framework-hero.webp",
    },
    en: {
      title: "The DNH Financial Decision Framework",
      description:
        "The DNH Framework connects data intelligence, decision navigation and horizon architecture to evaluate conditions, scenarios, risks and long-term objectives.",
      keywords: ["DNH framework", "financial decision framework", "data intelligence", "scenario analysis", "horizon architecture"],
      image: "/assets/images/dnh-framework-hero.webp",
    },
  },
  "/dnh/intelligence-desk": {
    fa: {
      title: "میز هوشمندی مالی DNH",
      description:
        "میز هوشمندی DNH متغیرهای اقتصاد، بازار، نقدینگی، دارایی و ریسک را به بینش ساختاریافته برای تصمیم‌های مالی تبدیل می‌کند.",
      keywords: ["هوشمندی مالی", "تحلیل بازار", "تحلیل اقتصاد", "ریسک کلان", "میز هوشمندی DNH"],
      image: "/assets/images/dnh-intelligence-desk-hero.webp",
    },
    en: {
      title: "DNH Financial Intelligence Desk",
      description:
        "The DNH Intelligence Desk turns economic, market, liquidity, asset and risk variables into structured insight for financial decisions.",
      keywords: ["financial intelligence", "market analysis", "economic analysis", "macro risk", "DNH intelligence desk"],
      image: "/assets/images/dnh-intelligence-desk-hero.webp",
    },
  },
  "/services": {
    fa: {
      title: "خدمات مشاوره مالی و مدیریت ثروت",
      description:
        "خدمات DNH شامل استراتژی ثروت خصوصی، هوشمندی پرتفوی، مشاوره مالی راهبردی، اقتصاد و بازار، مدیریت ریسک و نشست‌های مدیران است.",
      keywords: ["خدمات مشاوره مالی", "مدیریت ثروت", "مشاوره سرمایه‌گذاری", "تحلیل ریسک", "مشاوره مالی DNH"],
      image: "/assets/images/risk.webp",
    },
    en: {
      title: "Financial Advisory and Wealth Management Services",
      description:
        "DNH services include private wealth strategy, portfolio intelligence, strategic financial advisory, macro and market advisory, risk management and executive briefings.",
      keywords: ["financial advisory services", "wealth management", "investment advisory", "risk analysis", "DNH advisory"],
      image: "/assets/images/risk.webp",
    },
  },
  "/services/private-wealth-strategy": {
    fa: {
      title: "استراتژی ثروت خصوصی",
      description:
        "بررسی یکپارچه دارایی‌ها، اهداف، نقدینگی، ریسک و افق مالی برای طراحی یک استراتژی منسجم ثروت خصوصی.",
      keywords: ["استراتژی ثروت خصوصی", "مدیریت ثروت خانواده", "مشاوره ثروت", "برنامه‌ریزی مالی", "حفظ ثروت"],
      image: "/assets/images/private-wealth-strategy-hero.webp",
    },
    en: {
      title: "Private Wealth Strategy",
      description:
        "An integrated review of assets, objectives, liquidity, risk and financial horizon to shape a coherent private wealth strategy.",
      keywords: ["private wealth strategy", "family wealth management", "wealth advisory", "financial planning", "wealth preservation"],
      image: "/assets/images/private-wealth-strategy-hero.webp",
    },
  },
  "/services/portfolio-intelligence": {
    fa: {
      title: "هوشمندی پرتفوی سرمایه‌گذاری",
      description:
        "ارزیابی ترکیب دارایی، تمرکز ریسک، نقدشوندگی و تناسب پرتفوی سرمایه‌گذاری با اهداف و افق مالی شما.",
      keywords: ["هوشمندی پرتفوی", "تحلیل پرتفوی", "تمرکز ریسک", "نقدشوندگی", "تخصیص دارایی"],
      image: "/assets/images/portfolio-intelligence-hero.webp",
    },
    en: {
      title: "Investment Portfolio Intelligence",
      description:
        "Evaluate asset mix, concentration risk, liquidity and the alignment of an investment portfolio with your objectives and financial horizon.",
      keywords: ["portfolio intelligence", "portfolio analysis", "concentration risk", "liquidity analysis", "asset allocation"],
      image: "/assets/images/portfolio-intelligence-hero.webp",
    },
  },
  "/services/strategic-financial-advisory": {
    fa: {
      title: "مشاوره مالی راهبردی کسب‌وکار",
      description:
        "بررسی ساختار سرمایه، نقدینگی، تأمین مالی و گزینه‌های تصمیم‌گیری برای مسائل مالی پیچیده شرکت‌ها و هلدینگ‌ها.",
      keywords: ["مشاوره مالی راهبردی", "ساختار سرمایه", "تأمین مالی شرکت", "مدیریت نقدینگی", "مشاوره مالی هلدینگ"],
      image: "/assets/images/strategic-financial-advisory-hero.webp",
    },
    en: {
      title: "Strategic Financial Advisory for Businesses",
      description:
        "Review capital structure, liquidity, financing and decision options for complex financial issues facing companies and holding groups.",
      keywords: ["strategic financial advisory", "capital structure", "corporate finance", "liquidity management", "holding company advisory"],
      image: "/assets/images/strategic-financial-advisory-hero.webp",
    },
  },
  "/services/macro-market-advisory": {
    fa: {
      title: "مشاوره اقتصاد کلان و بازارهای مالی",
      description:
        "تحلیل تورم، ارز، سیاست‌های اقتصادی و تغییرات بازار برای شناخت سناریوها و پیامدهای آن‌ها بر تصمیم‌های مالی.",
      keywords: ["مشاوره اقتصاد کلان", "تحلیل بازارهای مالی", "تحلیل تورم", "تحلیل ارز", "سناریو اقتصادی"],
      image: "/assets/images/macro-market-advisory-hero.webp",
    },
    en: {
      title: "Macro and Financial Markets Advisory",
      description:
        "Analyse inflation, currencies, economic policy and market shifts to understand scenarios and their implications for financial decisions.",
      keywords: ["macro advisory", "financial markets analysis", "inflation analysis", "currency analysis", "economic scenarios"],
      image: "/assets/images/macro-market-advisory-hero.webp",
    },
  },
  "/services/risk-management-wealth-protection": {
    fa: {
      title: "مدیریت ریسک و حفاظت از ثروت",
      description:
        "شناسایی ریسک‌های پنهان و آشکار در ساختار ثروت و تعیین اولویت‌های مدیریت ریسک، نقدشوندگی و حفاظت از دارایی‌ها.",
      keywords: ["مدیریت ریسک ثروت", "حفاظت از ثروت", "ریسک نقدشوندگی", "حفظ دارایی", "ریسک سرمایه‌گذاری"],
      image: "/assets/images/risk-management-wealth-protection-hero.webp",
    },
    en: {
      title: "Risk Management and Wealth Protection",
      description:
        "Identify visible and hidden vulnerabilities in a wealth structure and define priorities for risk, liquidity and asset protection.",
      keywords: ["wealth risk management", "wealth protection", "liquidity risk", "asset protection", "investment risk"],
      image: "/assets/images/risk-management-wealth-protection-hero.webp",
    },
  },
  "/services/executive-briefings": {
    fa: {
      title: "نشست‌های راهبردی مدیران",
      description:
        "نشست تخصصی و متمرکز برای بررسی یک مسئله مهم مالی یا اقتصادی، سناریوهای مرتبط و نکات مؤثر بر تصمیم مدیران.",
      keywords: ["نشست مدیران", "مشاوره هیئت‌مدیره", "تحلیل مالی مدیران", "تصمیم‌گیری مدیریتی", "جلسه راهبردی"],
      image: "/assets/images/executive-briefings-hero.webp",
    },
    en: {
      title: "Strategic Executive Briefings",
      description:
        "Focused executive sessions that examine an important financial or economic issue, related scenarios and decision-relevant implications.",
      keywords: ["executive briefings", "board advisory", "executive financial analysis", "management decision making", "strategy session"],
      image: "/assets/images/executive-briefings-hero.webp",
    },
  },
  "/financial-decision-assessment": {
    fa: {
      title: "ارزیابی اولیه تصمیم مالی",
      description:
        "پیش از تصمیم، مسئله مالی، اهداف، فوریت، محدودیت‌ها و سطح پیچیدگی را در ارزیابی اولیه DNH روشن‌تر کنید.",
      keywords: ["ارزیابی تصمیم مالی", "تصمیم مالی", "تحلیل مسئله مالی", "مشاوره مالی اولیه", "ارزیابی مالی DNH"],
      image: "/assets/images/financial-decision-assessment.webp",
    },
    en: {
      title: "Initial Financial Decision Assessment",
      description:
        "Clarify the financial issue, objectives, urgency, constraints and level of complexity before making your next decision.",
      keywords: ["financial decision assessment", "financial decision", "financial issue analysis", "initial financial consultation", "DNH assessment"],
      image: "/assets/images/financial-decision-assessment.webp",
    },
  },
  "/request-strategic-consultation": {
    fa: {
      title: "درخواست مشاوره مالی راهبردی",
      description:
        "برای مسائل مالی چندلایه، درخواست مشاوره راهبردی ثبت کنید تا موضوع، دامنه، ریسک‌ها و مسیر مناسب بررسی شود.",
      keywords: ["درخواست مشاوره مالی", "مشاوره مالی راهبردی", "جلسه مشاوره مالی", "مشاور ثروت", "DNH"],
      image: "/assets/images/doctorHero.png",
    },
    en: {
      title: "Request Strategic Financial Consultation",
      description:
        "Request strategic advice for a complex financial issue so its scope, risks and most appropriate review path can be assessed.",
      keywords: ["request financial consultation", "strategic financial advice", "financial advisory meeting", "wealth adviser", "DNH"],
      image: "/assets/images/doctorHeroEN.png",
    },
  },
  "/who-we-help/big-financial-decision": {
    fa: {
      title: "تصمیم‌های مالی بزرگ و پیچیده",
      description:
        "برای تصمیم‌های مالی بزرگ، گزینه‌ها، ریسک‌ها، نقدشوندگی، زمان‌بندی و سناریوها را پیش از تخصیص سرمایه ساختاریافته بررسی کنید.",
      keywords: ["تصمیم مالی بزرگ", "تصمیم‌گیری سرمایه‌گذاری", "تحلیل ریسک مالی", "تحلیل سناریو", "تخصیص سرمایه"],
      image: "/assets/images/big-financial-decision4.webp",
    },
    en: {
      title: "Major and Complex Financial Decisions",
      description:
        "Evaluate options, risks, liquidity, timing and scenarios in a structured way before committing capital to a major financial decision.",
      keywords: ["major financial decision", "investment decision making", "financial risk analysis", "scenario analysis", "capital allocation"],
      image: "/assets/images/big-financial-decision4.webp",
    },
  },
  "/who-we-help/unstructured-portfolio": {
    fa: {
      title: "پرتفوی چنددارایی بدون ساختار روشن",
      description:
        "اگر دارایی‌های متنوع دارید اما نقش، ریسک، نقدشوندگی و هماهنگی آن‌ها روشن نیست، ساختار کل پرتفوی را یکپارچه بررسی کنید.",
      keywords: ["پرتفوی بدون ساختار", "سبد دارایی متنوع", "تحلیل ساختار پرتفوی", "تمرکز دارایی", "معماری پرتفوی"],
      image: "/assets/images/unstructured-portfolio4.webp",
    },
    en: {
      title: "A Multi-Asset Portfolio Without Clear Structure",
      description:
        "When asset roles, risk, liquidity and alignment are unclear, evaluate the full multi-asset portfolio as one connected structure.",
      keywords: ["unstructured portfolio", "multi-asset portfolio", "portfolio structure analysis", "asset concentration", "portfolio architecture"],
      image: "/assets/images/unstructured-portfolio4.webp",
    },
  },
  "/who-we-help/holdings-financial-capital-structure": {
    fa: {
      title: "ساختار مالی و سرمایه هلدینگ‌ها",
      description:
        "ساختار سرمایه، نقدینگی، تأمین مالی، تخصیص سرمایه و حاکمیت مالی شرکت‌ها و هلدینگ‌ها را در یک تصویر یکپارچه بررسی کنید.",
      keywords: ["ساختار مالی هلدینگ", "ساختار سرمایه", "تأمین مالی هلدینگ", "تخصیص سرمایه", "حاکمیت مالی"],
      image: "/assets/images/complex-financial-structure.png",
    },
    en: {
      title: "Financial and Capital Structure for Holding Groups",
      description:
        "Review capital structure, liquidity, financing, capital allocation and financial governance across companies and holding groups as one system.",
      keywords: ["holding company financial structure", "capital structure", "holding company finance", "capital allocation", "financial governance"],
      image: "/assets/images/complex-financial-structure.png",
    },
  },
  "/knowledge": {
    fa: {
      title: "دانش و تحلیل مالی DNH",
      description:
        "تحلیل‌ها، پژوهش‌ها، چشم‌اندازهای هفتگی و پرونده‌های تصمیم DNH برای درک بهتر اقتصاد، ریسک، بازار و ساختار ثروت.",
      keywords: ["دانش مالی", "تحلیل مالی", "پژوهش اقتصادی", "تحلیل بازار", "بینش‌های DNH"],
      image: "/assets/images/home-weekly-outlook-heading.webp",
    },
    en: {
      title: "DNH Financial Knowledge and Analysis",
      description:
        "DNH analysis, research, weekly outlooks and decision cases for a clearer understanding of economics, risk, markets and wealth structure.",
      keywords: ["financial knowledge", "financial analysis", "economic research", "market analysis", "DNH insights"],
      image: "/assets/images/home-weekly-outlook-heading.webp",
    },
  },
  "/knowledge/weekly-outlook": {
    fa: {
      title: "چشم‌انداز هفتگی اقتصاد و بازارها",
      description:
        "گزارش هفتگی DNH از مهم‌ترین متغیرهای اقتصاد، ریسک و بازارها و پیامدهای آن‌ها برای تصمیم‌گیری مالی.",
      keywords: ["چشم‌انداز هفتگی", "گزارش هفتگی اقتصاد", "تحلیل هفتگی بازار", "ریسک کلان", "DNH Weekly Outlook"],
      image: "/assets/images/home-weekly-outlook-heading.webp",
    },
    en: {
      title: "Weekly Economic and Market Outlook",
      description:
        "DNH’s weekly review of important economic, risk and market variables and their implications for financial decision-making.",
      keywords: ["weekly outlook", "weekly economic report", "weekly market analysis", "macro risk", "DNH Weekly Outlook"],
      image: "/assets/images/home-weekly-outlook-heading.webp",
    },
  },
  "/knowledge/research": {
    fa: {
      title: "پژوهش‌ها و تحلیل‌های مالی",
      description:
        "پژوهش‌ها و یادداشت‌های تحلیلی DNH درباره اقتصاد، بازارهای مالی، ریسک، تخصیص دارایی و مدیریت ثروت.",
      keywords: ["پژوهش مالی", "تحلیل اقتصادی", "تحلیل بازار مالی", "گزارش ریسک", "تحقیق مدیریت ثروت"],
      image: "/assets/images/research-and-case-studies.webp",
    },
    en: {
      title: "Financial Research and Analysis",
      description:
        "DNH research and analytical notes on economics, financial markets, risk, asset allocation and wealth management.",
      keywords: ["financial research", "economic analysis", "financial market analysis", "risk report", "wealth management research"],
      image: "/assets/images/research-and-case-studies.webp",
    },
  },
  "/knowledge/case-studies": {
    fa: {
      title: "پرونده‌های تحلیلی و مطالعات موردی",
      description:
        "مطالعات موردی DNH از مسائل واقعی مالی برای نمایش فرایند تحلیل، ارزیابی ریسک و منطق تصمیم‌گیری ساختاریافته.",
      keywords: ["مطالعه موردی مالی", "پرونده تحلیلی", "تحلیل تصمیم مالی", "نمونه مشاوره مالی", "مدیریت ریسک"],
      image: "/assets/images/research-and-case-studies.webp",
    },
    en: {
      title: "Financial Case Studies and Decision Files",
      description:
        "DNH case studies based on real financial questions, showing structured analysis, risk evaluation and decision logic.",
      keywords: ["financial case study", "decision case", "financial decision analysis", "financial advisory example", "risk management"],
      image: "/assets/images/research-and-case-studies.webp",
    },
  },
  "/knowledge/faq": {
    fa: {
      title: "پرسش‌های متداول درباره خدمات DNH",
      description:
        "پاسخ پرسش‌های متداول درباره معماری ثروت، خدمات مشاوره مالی، ارزیابی اولیه، محرمانگی و فرایند همکاری با DNH.",
      keywords: ["پرسش‌های متداول DNH", "سوالات مشاوره مالی", "معماری ثروت", "فرایند مشاوره", "محرمانگی مالی"],
    },
    en: {
      title: "Frequently Asked Questions About DNH",
      description:
        "Answers to common questions about wealth architecture, financial advisory services, initial assessment, confidentiality and working with DNH.",
      keywords: ["DNH FAQ", "financial advisory questions", "wealth architecture", "advisory process", "financial confidentiality"],
    },
  },
  "/legal/privacy-policy": {
    fa: {
      title: "سیاست حفظ حریم خصوصی",
      description: "نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران و متقاضیان خدمات DNH.",
      keywords: ["حریم خصوصی DNH", "حفاظت از اطلاعات", "محرمانگی اطلاعات مالی"],
    },
    en: {
      title: "Privacy Policy",
      description: "How DNH collects, uses, stores and protects information provided by website users and service applicants.",
      keywords: ["DNH privacy policy", "data protection", "financial information confidentiality"],
    },
  },
  "/legal/terms-of-use": {
    fa: {
      title: "شرایط استفاده از وب‌سایت",
      description: "شرایط و ضوابط استفاده از وب‌سایت، محتوای تحلیلی و خدمات آنلاین DNH.",
      keywords: ["شرایط استفاده DNH", "ضوابط وب‌سایت", "شرایط محتوای مالی"],
    },
    en: {
      title: "Website Terms of Use",
      description: "Terms governing the use of the DNH website, analytical content and online services.",
      keywords: ["DNH terms of use", "website terms", "financial content terms"],
    },
  },
  "/login": {
    fa: {
      title: "ورود به حساب کاربری",
      description: "ورود امن به حساب کاربری DNH.",
      keywords: ["ورود DNH"],
      noIndex: true,
    },
    en: {
      title: "Sign In to Your Account",
      description: "Secure sign-in to your DNH account.",
      keywords: ["DNH sign in"],
      noIndex: true,
    },
  },
  "/register": {
    fa: {
      title: "ساخت حساب کاربری",
      description: "ایجاد حساب کاربری DNH برای دسترسی به خدمات آنلاین.",
      keywords: ["ثبت‌نام DNH"],
      noIndex: true,
    },
    en: {
      title: "Create Your Account",
      description: "Create a DNH account to access online services.",
      keywords: ["DNH registration"],
      noIndex: true,
    },
  },
};

const dynamicSeo: Array<{
  prefix: string;
  inheritFrom: string;
  noIndex?: boolean;
}> = [
  {
    prefix: "/knowledge/weekly-outlook/",
    inheritFrom: "/knowledge/weekly-outlook",
  },
  { prefix: "/forms/", inheritFrom: "/financial-decision-assessment", noIndex: true },
];

export function getLocalizedPageSeo(path: string, locale: SiteLocale) {
  const normalizedPath = path === "/" ? path : path.replace(/\/+$/, "");
  const exact = pageSeo[normalizedPath]?.[locale];
  if (exact) return { ...exact, exact: true };

  const dynamic = dynamicSeo.find(({ prefix }) => normalizedPath.startsWith(prefix));
  if (!dynamic) return null;

  const inherited = pageSeo[dynamic.inheritFrom]?.[locale];
  if (!inherited) return null;

  return {
    ...inherited,
    noIndex: dynamic.noIndex ?? inherited.noIndex,
    exact: false,
  };
}
