import Link from "next/link";
import { ArrowLeft, CalendarDays, FileText, Layers3 } from "lucide-react";
import type { WeeklyOutlookListItem } from "@/lib/weekly-outlook";
import { formatWeeklyOutlookDate } from "@/lib/weekly-outlook-date";

type WeeklyOutlookListSectionProps = {
  reports: WeeklyOutlookListItem[];
};

export function WeeklyOutlookListSection({
  reports,
}: WeeklyOutlookListSectionProps) {
  return (
    <section
      id="weekly-outlook-reports"
      dir="rtl"
      aria-labelledby="weekly-outlook-reports-title"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.22) 1px,transparent 1px),linear-gradient(to bottom,rgba(22,115,148,.12) 1px,transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />

      <div className="dnh-site-shell relative z-10 mx-auto w-full max-w-[1536px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p className="text-[13px] font-black text-brand-primary">
                آرشیو چشم‌انداز هفتگی
              </p>
            </div>

            <h2
              id="weekly-outlook-reports-title"
              className="max-w-[720px] text-[30px] font-black leading-[1.65] tracking-[-0.04em] text-ink sm:text-[38px] lg:text-[44px]"
            >
              گزارش‌ها را بر اساس تاریخ و موضوع دنبال کنید.
            </h2>
          </div>

          <p className="max-w-[680px] text-[15px] font-medium leading-[2] text-ink-muted sm:text-[16px]">
            هر گزارش یک پرونده مستقل دارد و می‌تواند ساختار، تصویر، سکشن و
            بلوک‌های محتوایی متفاوت خودش را داشته باشد.
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="mt-8 border border-dashed border-line bg-[#fbfdfd] px-6 py-20 text-center">
            <FileText className="mx-auto h-10 w-10 text-brand-primary/30" />

            <h3 className="mt-5 text-lg font-black text-ink">
              هنوز گزارشی منتشر نشده است
            </h3>

            <p className="mt-2 text-sm text-ink-muted">
              بعد از انتشار گزارش از پنل ادمین، اینجا نمایش داده می‌شود.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
            {reports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReportCard({
  report,
  index,
}: {
  report: WeeklyOutlookListItem;
  index: number;
}) {
  return (
    <article className="group/report relative bg-white p-5 transition-colors hover:bg-[#fbfdfd] sm:p-6 lg:p-7">
      <div className="flex items-start justify-between gap-5">
        <div className="grid size-11 shrink-0 place-items-center border border-brand-primary/12 bg-[#f4fafb] text-brand-primary transition-colors group-hover/report:border-brand-accent group-hover/report:text-brand-accent">
          <FileText aria-hidden="true" strokeWidth={1.6} className="size-5" />
        </div>

        <span
          dir="ltr"
          className="text-[11px] font-black tracking-[.18em] text-brand-primary/35"
        >
          REPORT / {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-5 text-[12px] font-black text-brand-primary/65">
        {report.edition}
      </p>

      <h3 className="mt-2 max-w-[720px] text-[22px] font-black leading-[1.75] tracking-[-0.035em] text-ink sm:text-[24px]">
        <Link
          href={`/knowledge/weekly-outlook/${report.slug}`}
          className="outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
        >
          <span className="absolute inset-0" aria-hidden="true" />
          {report.title}
        </Link>
      </h3>

      <p className="mt-4 max-w-[720px] text-[14px] font-medium leading-8 text-ink-muted">
        {report.excerpt}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-4 text-[12px] font-bold text-ink-muted">
        <span className="inline-flex items-center gap-2">
          <CalendarDays aria-hidden="true" size={15} />
          {formatWeeklyOutlookDate(
            report.reportDate,
            report.dateCalendar,
            "long",
          )}
        </span>

        <span className="h-1 w-1 bg-brand-accent" aria-hidden="true" />

        <span className="inline-flex items-center gap-2">
          <Layers3 aria-hidden="true" size={15} />
          {report.sectionCount.toLocaleString("fa-IR")} سکشن
        </span>

        <span className="mr-auto inline-flex items-center gap-2 text-brand-primary transition-colors group-hover/report:text-brand-accent">
          خواندن گزارش
          <ArrowLeft
            aria-hidden="true"
            size={15}
            className="transition-transform group-hover/report:-translate-x-1"
          />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[2px] origin-bottom scale-y-0 bg-brand-accent transition-transform duration-200 group-hover/report:scale-y-100"
      />
    </article>
  );
}
