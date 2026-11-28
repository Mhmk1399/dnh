import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import {
  Activity, ArrowLeft, ArrowRight, Banknote, BarChart3, BookOpen, ChevronDown,
  CircleDollarSign, Clock3, ExternalLink, Eye, FileText, Landmark, Layers3,
  LineChart, ShieldAlert, Sparkles, Target, TrendingUp, TriangleAlert, WalletCards,
} from "lucide-react";
import { getLocalizedSiteHref, SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";
import type {
  PublicWeeklyOutlookReport, WeeklyOutlookBlock, WeeklyOutlookButtonVariant,
  WeeklyOutlookCalloutTone, WeeklyOutlookSectionDefinition, WeeklyOutlookSectionIcon,
  WeeklyOutlookSectionTone, WeeklyOutlookSectionVisual,
} from "@/lib/weekly-outlook";
import { formatWeeklyOutlookDate } from "@/lib/weekly-outlook-date";

const copy = {
  fa: {
    archive: "آرشیو گزارش‌های هفتگی", publication: "چشم‌انداز هفتگی DNH",
    contents: "فهرست این گزارش", section: "بخش", summary: "خلاصه گزارش",
    consultation: "درخواست مشاوره راهبردی",
    notice: "این گزارش برای کمک به فهم زمینه تصمیم تهیه شده است و سیگنال خرید یا فروش، توصیه سرمایه‌گذاری یا تضمین بازده محسوب نمی‌شود.",
  },
  en: {
    archive: "Weekly report archive", publication: "DNH Weekly Outlook",
    contents: "In this report", section: "Section", summary: "Report summary",
    consultation: "Request a strategic consultation",
    notice: "This report provides context for financial decisions. It does not provide trading signals, investment advice or a guarantee of returns.",
  },
};

const sectionIcons = {
  overview: FileText, risk: ShieldAlert, market: BarChart3, policy: Landmark,
  asset: CircleDollarSign, watch: Eye, conclusion: Layers3, trend: TrendingUp,
  liquidity: WalletCards, currency: Banknote, inflation: LineChart, portfolio: Activity,
  timeline: Clock3, target: Target, warning: TriangleAlert, opportunity: Sparkles,
} satisfies Record<WeeklyOutlookSectionIcon, typeof FileText>;

const sectionSurfaces = {
  light: "bg-white text-ink", soft: "bg-surface-soft text-ink", dark: "bg-brand-secondary text-white",
  teal: "bg-[color-mix(in_srgb,var(--dnh-accent)_43%,var(--dnh-secondary))] text-white",
  accent: "bg-[color-mix(in_srgb,var(--dnh-primary)_15%,white)] text-ink",
} satisfies Record<WeeklyOutlookSectionTone, string>;

// Confine the selected pattern to the chapter header to keep long passages easy to read.
const sectionPatterns = {
  plain: "",
  grid: "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[20px_20px]",
  gradient: "bg-linear-to-br from-brand-accent to-transparent",
  blueprint: "bg-[repeating-linear-gradient(135deg,currentColor_0_1px,transparent_1px_13px)]",
  market: "bg-[repeating-linear-gradient(90deg,currentColor_0_3px,transparent_3px_16px)]",
  spotlight: "bg-[radial-gradient(ellipse_at_center,currentColor,transparent_72%)]",
  glass: "bg-[linear-gradient(115deg,transparent_30%,currentColor_30%_52%,transparent_52%_58%,currentColor_58%_70%,transparent_70%)]",
  accent: "border-e-[6px] border-brand-primary",
} satisfies Record<WeeklyOutlookSectionVisual, string>;

const calloutStyles = {
  info: "border-brand-accent bg-sky-50 text-sky-950",
  risk: "border-amber-700 bg-amber-50 text-amber-950",
  opportunity: "border-emerald-700 bg-emerald-50 text-emerald-950",
  neutral: "border-ink-muted bg-surface-soft text-ink",
} satisfies Record<WeeklyOutlookCalloutTone, string>;

const buttonStyles = {
  primary: "border border-transparent bg-brand-accent text-white hover:underline",
  secondary: "border border-transparent bg-page text-ink hover:underline",
  outline: "border border-current/45 text-current hover:underline",
} satisfies Record<WeeklyOutlookButtonVariant, string>;

export function WeeklyOutlookReportView({ report, locale, signedIn }: { report: PublicWeeklyOutlookReport; locale: SiteLocale; signedIn: boolean }) {
  const labels = copy[locale];
  const language = SITE_LANGUAGES[locale];
  const coverImage = report.coverImage || `/assets/images/weekly-outlook-${report.market ?? "global"}.webp`;
  const Back = locale === "fa" ? ArrowRight : ArrowLeft;
  const sectionNumber = new Intl.NumberFormat(language.languageTag, { minimumIntegerDigits: 2 });
  const contents = (
    <ol className="divide-y divide-line">
      {report.sections.map((section, index) => (
        <li key={section.id}>
          <a href={signedIn ? `#${section.id}` : "#report-sign-in"} className="flex min-h-11 items-baseline gap-3 py-3 text-sm leading-6 text-ink hover:text-brand-accent hover:underline focus-visible:outline-focus">
            <span aria-hidden="true" className="shrink-0 font-bold tabular-nums text-brand-accent">{sectionNumber.format(index + 1)}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <article dir={language.direction} lang={language.languageTag} className="relative isolate bg-page text-start text-ink [overflow-wrap:anywhere]">
      <header className="border-b-4 border-brand-primary bg-brand-secondary pb-8 pt-24 text-white sm:pb-12 sm:pt-28">
        <div className="dnh-site-shell">
          <Link href={getLocalizedSiteHref("/knowledge/weekly-outlook", locale)} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 hover:text-white hover:underline focus-visible:outline-brand-primary">
            <Back size={16} aria-hidden="true" />{labels.archive}
          </Link>
          <div dir="ltr" className="mt-3 grid min-w-0 grid-cols-[minmax(0,1fr)_6.25rem] items-start gap-4 border-t border-white/20 pt-7 sm:mt-5 sm:grid-cols-[minmax(0,1fr)_15rem] sm:gap-8 sm:pt-10">
            <div dir={language.direction} className="min-w-0 text-start">
              <p className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                <span aria-hidden="true" className="h-px w-10 bg-current" />{labels.publication}
              </p>
              <h1 className="mt-4 max-w-[37ch] text-balance text-[clamp(1.75rem,3.3vw,3.5rem)] font-black leading-[1.45] text-white">{report.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/85">
                {report.edition && <bdi className="border-e border-white/30 pe-4 font-bold">{report.edition}</bdi>}
                <time dateTime={report.reportDate}>{formatWeeklyOutlookDate(report.reportDate, report.dateCalendar, "long", locale)}</time>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-white/15 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- Editors can supply local uploads or external image URLs. */}
              <img src={coverImage} alt={report.coverImageAlt ?? ""} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </header>
      <div className="dnh-site-shell py-6 sm:py-10 lg:py-12">
        <div className="grid w-full items-start gap-5 lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          <nav aria-label={labels.contents} className="min-w-0 border-y border-ink/15 bg-surface-soft px-4 lg:sticky lg:top-28">
            <details className="group lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <BookOpen size={18} aria-hidden="true" />{labels.contents}
                <ChevronDown size={16} aria-hidden="true" className="ms-auto group-open:rotate-180" />
              </summary>
              {contents}
            </details>
            <div data-lenis-prevent className="hidden py-3 lg:block lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto">
              <p className="flex items-center gap-3 border-b border-ink/20 py-3 font-bold"><BookOpen size={18} aria-hidden="true" />{labels.contents}</p>
              {contents}
            </div>
          </nav>
          <div className="min-w-0 space-y-5 sm:space-y-7">
            {report.excerpt && (
              <section aria-labelledby="report-summary-title" className="border-s-4 border-brand-accent bg-white px-5 py-4 sm:px-8 sm:py-6">
                <h2 id="report-summary-title" className="font-bold text-ink">{labels.summary}</h2>
                <p className="mt-2 whitespace-pre-line text-base leading-8 text-ink-muted sm:text-lg sm:leading-9">{report.excerpt}</p>
              </section>
            )}
            {signedIn ? <>
            {report.sections.map((section, index) => (
              <ReportSection key={section.id} section={section} number={sectionNumber.format(index + 1)} locale={locale} />
            ))}
            <footer className="border-t border-line pt-5 text-sm leading-7 text-ink-muted">
              <p>{labels.notice}</p>
              <Link href={getLocalizedSiteHref("/request-strategic-consultation", locale)} className="inline-flex min-h-11 items-center font-bold text-brand-accent underline underline-offset-4 focus-visible:outline-focus">
                {labels.consultation}
              </Link>
            </footer>
            </> : (
        <div className="relative isolate grid min-h-[34rem] place-items-center overflow-hidden rounded-xl py-8 sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 top-5 -z-10 space-y-5 overflow-hidden blur-[3px]">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="space-y-4 rounded-xl border border-line bg-surface-soft px-5 py-7 sm:px-9">
                <div className="mb-5 h-5 w-1/3 rounded bg-brand-primary/30" />
                <div className="h-3 w-full rounded bg-ink/15" />
                <div className="h-3 w-4/5 rounded bg-ink/15" />
                <div className="h-3 w-3/5 rounded bg-ink/15" />
              </div>
            ))}
          </div>
          <section aria-labelledby="report-sign-in" className="relative w-full max-w-md rounded-xl border border-line border-t-4 border-t-brand-accent bg-white p-5 shadow-xl sm:p-8">
            <h2 id="report-sign-in" className="mb-2 scroll-mt-32 text-xl font-black">{locale === "fa" ? "برای خواندن گزارش وارد شوید" : "Sign in to read the report"}</h2>
            <p className="mb-5 text-sm leading-7 text-ink-muted">{locale === "fa" ? "با ایمیل و رمز عبور حساب خود وارد شوید." : "Use your account email and password."}</p>
            <AuthForm mode="login" locale={locale} emailLogin afterLogin={getLocalizedSiteHref(`/knowledge/weekly-outlook/${encodeURIComponent(report.slug)}`, locale)} />
            <Link href={getLocalizedSiteHref("/login", locale)} className="inline-flex min-h-11 items-center text-sm font-bold text-brand-accent underline">
              {locale === "fa" ? "ورود با شمارهٔ موبایل" : "Sign in with a mobile number"}
            </Link>
          </section>
        </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ReportSection({ section, number, locale }: { section: WeeklyOutlookSectionDefinition; number: string; locale: SiteLocale }) {
  const Icon = sectionIcons[section.icon] ?? FileText;
  const dark = section.tone === "dark" || section.tone === "teal";
  const pattern = sectionPatterns[section.visual ?? "grid"];
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className={`min-w-0 scroll-mt-28 border border-line px-5 py-6 sm:px-8 sm:py-8 lg:px-10 ${sectionSurfaces[section.tone]}`}>
      <header className="relative isolate border-b border-current/15 pb-4">
        {pattern && <span aria-hidden="true" className={`pointer-events-none absolute end-0 top-0 -z-10 h-10 w-16 opacity-[0.12] sm:w-24 ${pattern}`} />}
        <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold ${dark ? "text-white/85" : "text-ink-muted"}`}>
          <Icon size={16} aria-hidden="true" />{copy[locale].section} {number}
          {section.eyebrow && <span className="border-s border-current/30 ps-2">{section.eyebrow}</span>}
        </div>
        <h2 id={`${section.id}-title`} className="mt-3 font-black text-current">{section.title}</h2>
        {section.summary && <p className="mt-3 whitespace-pre-line text-base leading-8 opacity-85">{section.summary}</p>}
      </header>
      <div className="mt-5 w-full min-w-0 space-y-5 text-base leading-8 sm:text-[17px] sm:leading-9">
        {section.blocks.map((block) => <ReportBlock key={block.id} block={block} locale={locale} />)}
      </div>
    </section>
  );
}

function ReportBlock({ block, locale }: { block: WeeklyOutlookBlock; locale: SiteLocale }) {
  switch (block.type) {
    case "heading": {
      const Heading = block.level === "h2" ? "h2" : "h3";
      return <Heading className="mt-7 text-xl font-bold leading-relaxed">{block.text}</Heading>;
    }
    case "paragraph":
      return <p className="whitespace-pre-line">{block.text}</p>;
    case "list":
      return <ul className="list-disc space-y-2 ps-6 marker:text-current">{block.items.map((item, index) => <li key={index} className="whitespace-pre-line ps-1">{item}</li>)}</ul>;
    case "quote":
      return (
        <figure className="border-s-[3px] border-brand-primary py-1 ps-4 sm:ps-6">
          <blockquote className="whitespace-pre-line text-lg font-bold leading-9 sm:text-xl sm:leading-10">{block.text}</blockquote>
          {block.cite && <figcaption className="mt-2 text-sm opacity-85">{block.cite}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className={`border-s-[3px] px-4 py-3 sm:px-6 ${calloutStyles[block.tone]}`}>
          {block.title && <p className="mb-1 font-bold">{block.title}</p>}
          <p className="whitespace-pre-line">{block.text}</p>
        </aside>
      );
    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element -- Preserve the entire figure, including externally hosted charts. */}
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="mx-auto h-auto max-w-full" />
          {block.caption && <figcaption className="mt-2 border-s-2 border-current/25 ps-3 text-sm leading-6 opacity-85">{block.caption}</figcaption>}
        </figure>
      );
    case "button": {
      const external = /^(?:https?:)?\/\//i.test(block.href);
      const Icon = external ? ExternalLink : locale === "fa" ? ArrowLeft : ArrowRight;
      const className = `inline-flex min-h-11 max-w-full items-center justify-center gap-3 px-4 py-2 text-sm font-bold leading-6 focus-visible:outline focus-visible:outline-offset-2 ${buttonStyles[block.variant]}`;
      const label = <><span>{block.label}</span><Icon size={16} className="shrink-0" aria-hidden="true" /></>;
      return (
        <div>
          {block.note && <p className="mb-2 text-sm leading-6 opacity-85">{block.note}</p>}
          {external || block.href.startsWith("#") ? (
            <a href={block.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={className}>{label}</a>
          ) : (
            <Link href={getLocalizedSiteHref(block.href, locale)} className={className}>{label}</Link>
          )}
        </div>
      );
    }
    case "divider":
      return <hr className="border-current/20" />;
  }
}
