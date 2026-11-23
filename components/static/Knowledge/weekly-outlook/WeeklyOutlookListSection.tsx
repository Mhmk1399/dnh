import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { getLocalizedSiteHref, SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";
import type { WeeklyOutlookListItem } from "@/lib/weekly-outlook";
import { formatWeeklyOutlookDate } from "@/lib/weekly-outlook-date";

const archiveLabels = {
  fa: { archive: "آرشیو چشم‌انداز هفتگی", latest: "آخرین گزارش", read: "خواندن گزارش", empty: "هنوز گزارشی به فارسی منتشر نشده است." },
  en: { archive: "Weekly Outlook archive", latest: "Latest report", read: "Read report", empty: "No reports have been published in English yet." },
};

export function WeeklyOutlookListSection({ reports, locale }: { reports: WeeklyOutlookListItem[]; locale: SiteLocale }) {
  const language = SITE_LANGUAGES[locale];
  const labels = archiveLabels[locale];
  const ReadArrow = locale === "fa" ? ArrowLeft : ArrowRight;
  return (
    <section id="weekly-outlook-reports" lang={language.languageTag} dir={language.direction} aria-labelledby="weekly-outlook-reports-title" className="scroll-mt-28 bg-page py-10 text-start sm:py-14">
      <div className="dnh-site-shell">
        <div className="mx-auto max-w-6xl">
          <h2 id="weekly-outlook-reports-title" className="border-b-2 border-brand-secondary pb-4 font-black text-ink">{labels.archive}</h2>
          {reports.length === 0 ? (
            <p className="mt-4 flex items-center gap-3 border border-line bg-white p-6 text-ink-muted"><FileText aria-hidden="true" size={22} className="shrink-0 text-brand-accent" />{labels.empty}</p>
          ) : (
            <ol className="divide-y divide-line border-b border-line bg-white">
              {reports.map((report, index) => (
                <li key={report.id} className="min-w-0">
                  <article className={`group/report relative grid items-start gap-3 px-4 py-6 [overflow-wrap:anywhere] hover:bg-surface-soft focus-within:outline-2 focus-within:outline-focus sm:grid-cols-[minmax(9rem,0.32fr)_minmax(0,1fr)] sm:gap-7 sm:px-7 lg:px-9 ${index === 0 ? "border-s-4 border-brand-accent" : ""}`}>
                    <header className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:flex-col sm:items-start sm:gap-2">
                      {index === 0 && <p className="font-bold text-brand-accent">{labels.latest}</p>}
                      <time dateTime={report.reportDate} className="font-bold text-ink">{formatWeeklyOutlookDate(report.reportDate, report.dateCalendar, "long", locale)}</time>
                      <span className="text-xs text-ink-muted">{report.sectionCount.toLocaleString(language.languageTag)} {locale === "fa" ? "بخش" : report.sectionCount === 1 ? "section" : "sections"}</span>
                    </header>
                    <div className={`grid min-w-0 items-start gap-4 ${report.coverImage ? "md:grid-cols-[minmax(0,1fr)_9rem]" : ""}`}>
                      <div>
                        {report.edition && <p className="mb-1 text-sm text-ink-muted"><bdi>{report.edition}</bdi></p>}
                        <h3 className="text-xl font-bold leading-relaxed text-ink sm:text-2xl">
                          <Link href={getLocalizedSiteHref(`/knowledge/weekly-outlook/${report.slug}`, locale)} className="after:absolute after:inset-0 group-hover/report:text-brand-accent focus-visible:outline-none">{report.title}</Link>
                        </h3>
                        <p className="mt-2 max-w-[78ch] text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">{report.excerpt}</p>
                      </div>
                      {report.coverImage && (
                        <div className="bg-surface-soft">
                          {/* eslint-disable-next-line @next/next/no-img-element -- Report covers can come from editor-supplied external sources. */}
                          <img loading="lazy" decoding="async" src={report.coverImage} alt={report.coverImageAlt ?? ""} className="aspect-[2/1] w-full object-contain md:aspect-[4/3]" />
                        </div>
                      )}
                      <span aria-hidden="true" className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent md:col-span-full">{labels.read}<ReadArrow size={16} /></span>
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
