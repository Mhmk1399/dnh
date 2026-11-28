import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, FileText, Globe2, MapPin } from "lucide-react";
import { getLocalizedSiteHref, SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";
import type { WeeklyOutlookListItem } from "@/lib/weekly-outlook";
import { formatWeeklyOutlookDate } from "@/lib/weekly-outlook-date";

const archiveLabels = {
  fa: {
    archive: "آرشیو چشم‌انداز هفتگی", latest: "آخرین گزارش", read: "خواندن گزارش",
    markets: "دسته‌بندی گزارش‌ها", iran: "ایران", global: "جهان",
    empty: "هنوز گزارشی به فارسی در این بخش منتشر نشده است.",
  },
  en: {
    archive: "Weekly Outlook archive", latest: "Latest report", read: "Read report",
    markets: "Report markets", iran: "Iran", global: "Global",
    empty: "No reports in this category have been published in English yet.",
  },
};

const markets = [
  { key: "iran", Icon: MapPin },
  { key: "global", Icon: Globe2 },
] as const;

export function WeeklyOutlookListSection({ reports, locale, market }: {
  reports: WeeklyOutlookListItem[];
  locale: SiteLocale;
  market?: "iran" | "global";
}) {
  const language = SITE_LANGUAGES[locale];
  const labels = archiveLabels[locale];
  const ReadArrow = locale === "fa" ? ArrowLeft : ArrowRight;
  const iranReports = reports.filter((report) => report.market === "iran");
  const globalReports = reports.filter((report) => report.market !== "iran");
  const activeMarket = market ?? (iranReports.length > 0 ? "iran" : "global");
  const activeReports = activeMarket === "iran" ? iranReports : globalReports;
  return (
    <section id="weekly-outlook-reports" lang={language.languageTag} dir={language.direction} aria-labelledby="weekly-outlook-reports-title" className="scroll-mt-28 bg-page py-10 text-start sm:py-14">
      <div className="dnh-site-shell">
        <div className="mx-auto max-w-6xl">
          <div className="border-b-2 border-brand-secondary pb-5">
            <h2 id="weekly-outlook-reports-title" className="text-2xl font-black text-ink sm:text-3xl">{labels.archive}</h2>
            <nav aria-label={labels.markets} className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
              {markets.map(({ key, Icon }) => (
                <Link
                  key={key}
                  href={getLocalizedSiteHref(`/knowledge/weekly-outlook?market=${key}#weekly-outlook-reports`, locale)}
                  aria-current={activeMarket === key ? "page" : undefined}
                  className={`group relative isolate flex min-h-24 min-w-0 items-end overflow-hidden rounded-[10px] border-2 bg-brand-secondary p-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:min-h-40 sm:p-5 ${activeMarket === key ? "border-brand-accent" : "border-transparent"}`}
                >
                  <Image src={`/assets/images/weekly-outlook-${key}.webp`} alt="" fill sizes="(max-width: 640px) 50vw, 560px" className="-z-20 object-cover motion-safe:transition-transform motion-safe:group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <span className="flex items-center gap-2">
                    <Icon size={18} aria-hidden="true" className="shrink-0" />
                    {labels[key]}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          {activeReports.length === 0 ? (
            <p className="flex items-center gap-3 border-b border-line bg-white px-4 py-8 leading-8 text-ink-muted sm:px-7"><FileText aria-hidden="true" size={22} className="shrink-0 text-brand-accent" />{labels.empty}</p>
          ) : (
            <ol className="space-y-3 bg-surface-soft py-3 sm:space-y-4 sm:p-4">
              {activeReports.map((report, index) => (
                <li key={report.id} className="min-w-0">
                  <article dir="ltr" className={`group/report relative grid h-52 max-h-52 grid-cols-[minmax(0,1fr)_6.5rem] sm:h-56 sm:max-h-56 gap-3 rounded-lg border border-line bg-white py-4 pl-5 pr-3 [overflow-wrap:anywhere] hover:bg-surface-soft focus-within:outline-2 focus-within:outline-focus sm:grid-cols-[minmax(0,1fr)_12rem] sm:gap-7 sm:pl-8 sm:pr-5 ${index === 0 ? "border-s-4 border-brand-accent" : ""}`}>
                    <div dir={language.direction} className="flex min-h-0 min-w-0 flex-col text-start">
                      <header className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:gap-2">
                        {index === 0 && <p className="font-bold text-brand-accent">{labels.latest}</p>}
                        <time dateTime={report.reportDate} className="font-bold text-ink">{formatWeeklyOutlookDate(report.reportDate, report.dateCalendar, "long", locale)}</time>
                        <span className="text-xs text-ink-muted">{report.sectionCount.toLocaleString(language.languageTag)} {locale === "fa" ? "بخش" : report.sectionCount === 1 ? "section" : "sections"}</span>
                      </header>
                      <div className="mt-1 flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-1">
                        <div>
                          {report.edition && <p className="hidden truncate text-xs text-ink-muted sm:block"><bdi>{report.edition}</bdi></p>}
                          <h3 className="line-clamp-2 text-base font-bold leading-6 text-ink sm:text-lg sm:leading-7">
                            <Link href={getLocalizedSiteHref(`/knowledge/weekly-outlook/${report.slug}`, locale)} className="after:absolute after:inset-0 group-hover/report:text-brand-accent focus-visible:outline-none">{report.title}</Link>
                          </h3>
                          <p className="mt-2 line-clamp-2 max-w-[68ch] text-sm leading-6 text-ink-muted sm:leading-7">{report.excerpt}</p>
                        </div>
                        <span aria-hidden="true" className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent">{labels.read}<ReadArrow size={16} /></span>
                      </div>
                    </div>
                    <div className="relative min-h-0 overflow-hidden rounded-md bg-surface-soft">
                    {report.coverImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element -- Report covers can come from editor-supplied external sources. */}
                        <img loading="lazy" decoding="async" src={report.coverImage} alt={report.coverImageAlt ?? ""} className="absolute inset-0 size-full object-cover" />
                      </>
                    ) : (
                      <Image src={`/assets/images/weekly-outlook-${report.market ?? "global"}.webp`} alt="" fill sizes="(max-width: 639px) 104px, 192px" className="object-cover" />
                    )}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
