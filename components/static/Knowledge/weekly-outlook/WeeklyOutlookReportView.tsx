import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Eye,
  FileText,
  Landmark,
  Layers3,
  Quote,
  ShieldAlert,
} from "lucide-react";
import type {
  PublicWeeklyOutlookReport,
  WeeklyOutlookBlock,
  WeeklyOutlookCalloutTone,
  WeeklyOutlookSectionDefinition,
  WeeklyOutlookSectionIcon,
  WeeklyOutlookSectionTone,
} from "@/lib/weekly-outlook";

type WeeklyOutlookReportViewProps = {
  report: PublicWeeklyOutlookReport;
};

const iconMap = {
  overview: FileText,
  risk: ShieldAlert,
  market: BarChart3,
  policy: Landmark,
  asset: CircleDollarSign,
  watch: Eye,
  conclusion: Layers3,
} satisfies Record<WeeklyOutlookSectionIcon, typeof FileText>;

const toneClasses = {
  light: {
    section: "bg-white text-ink",
    panel: "border-brand-primary/12 bg-[#fbfdfd]",
    eyebrow: "text-brand-primary",
    title: "text-ink",
    summary: "text-ink-muted",
    rule: "border-line",
  },
  soft: {
    section: "bg-[#f6f9fa] text-ink",
    panel: "border-brand-primary/12 bg-white",
    eyebrow: "text-brand-primary",
    title: "text-ink",
    summary: "text-ink-muted",
    rule: "border-line",
  },
  dark: {
    section: "bg-[#022936] text-white",
    panel: "border-white/10 bg-white/[0.035]",
    eyebrow: "text-brand-accent",
    title: "text-white",
    summary: "text-white/62",
    rule: "border-white/10",
  },
  teal: {
    section: "bg-[#063d4d] text-white",
    panel: "border-white/10 bg-white/[0.04]",
    eyebrow: "text-[#9ce5fa]",
    title: "text-white",
    summary: "text-white/64",
    rule: "border-white/10",
  },
  accent: {
    section: "bg-[#fff7ef] text-ink",
    panel: "border-brand-accent/18 bg-white",
    eyebrow: "text-brand-accent",
    title: "text-ink",
    summary: "text-ink-muted",
    rule: "border-brand-accent/15",
  },
} satisfies Record<
  WeeklyOutlookSectionTone,
  {
    section: string;
    panel: string;
    eyebrow: string;
    title: string;
    summary: string;
    rule: string;
  }
>;

const calloutClasses = {
  info: "border-brand-primary/18 bg-[#eef8fb] text-[#143a45]",
  risk: "border-orange-300/40 bg-orange-50 text-orange-950",
  opportunity: "border-emerald-300/45 bg-emerald-50 text-emerald-950",
  neutral: "border-line bg-[#f7f9fa] text-ink",
} satisfies Record<WeeklyOutlookCalloutTone, string>;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "long",
  }).format(new Date(value));
}

export function WeeklyOutlookReportView({
  report,
}: WeeklyOutlookReportViewProps) {
  return (
    <article dir="rtl" className="bg-white">
      <header className="relative isolate overflow-hidden bg-[#021f2a] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 30%,rgba(22,115,148,.20),transparent 30%),linear-gradient(118deg,#021d27 0%,#022936 58%,#021e28 100%)",
          }}
        />

        <div className="dnh-site-shell relative z-10 mx-auto w-full max-w-[1536px] px-5 pb-12 pt-[118px] sm:px-8 sm:pb-14 sm:pt-[126px] lg:px-12 lg:pb-16 lg:pt-[120px] xl:px-16 2xl:px-20">
          <Link
            href="/knowledge/weekly-outlook"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-black text-white/64 transition hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            <ArrowRight aria-hidden="true" size={15} />
            بازگشت به آرشیو گزارش‌ها
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p
                dir="ltr"
                className="text-[11px] font-black tracking-[.22em] text-brand-accent"
              >
                {report.edition}
              </p>

              <p className="mt-4 inline-flex items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-white/58">
                {formatDate(report.reportDate)}
              </p>
            </div>

            <div>
              <h1 className="max-w-[980px] text-[33px] font-black leading-[1.7] tracking-[-0.055em] text-white sm:text-[42px] lg:text-[54px] lg:leading-[1.52]">
                {report.title}
              </h1>

              <p className="mt-6 max-w-[820px] text-[15px] font-medium leading-[2.05] text-white/62 sm:text-[16px]">
                {report.excerpt}
              </p>
            </div>
          </div>

          {report.coverImage ? (
            <figure className="mt-10 overflow-hidden border border-white/10 bg-white/[0.03]">
              <img
                src={report.coverImage}
                alt={report.coverImageAlt ?? ""}
                className="h-auto w-full object-cover"
              />

              {report.coverImageAlt ? (
                <figcaption className="border-t border-white/10 px-5 py-3 text-xs leading-6 text-white/52">
                  {report.coverImageAlt}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </header>

      <div>
        {report.sections.map((section, index) => (
          <ReportSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      <footer className="bg-white py-12">
        <div className="dnh-site-shell mx-auto w-full max-w-[1536px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="border border-line bg-[#fbfdfd] p-5 sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-3xl text-[13px] font-medium leading-7 text-ink-muted">
              این گزارش برای کمک به فهم زمینه تصمیم تهیه شده است و سیگنال خرید
              یا فروش، توصیه سرمایه‌گذاری یا تضمین بازده محسوب نمی‌شود.
            </p>

            <Link
              href="/request-strategic-consultation"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-brand-primary px-5 py-3 text-xs font-black text-white transition hover:bg-brand-secondary lg:mt-0"
            >
              درخواست مشاوره راهبردی
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}

function ReportSection({
  section,
  index,
}: {
  section: WeeklyOutlookSectionDefinition;
  index: number;
}) {
  const tone = toneClasses[section.tone];
  const Icon = iconMap[section.icon];

  return (
    <section className={`relative isolate overflow-hidden py-14 sm:py-16 lg:py-20 ${tone.section}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />

      <div className="dnh-site-shell relative z-10 mx-auto grid w-full max-w-[1536px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.38fr_1fr] lg:gap-14 lg:px-12 xl:px-16 2xl:px-20">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className={`border ${tone.panel} p-5 sm:p-6`}>
            <div className="flex items-start justify-between gap-5">
              <div className="grid size-11 place-items-center border border-current/12">
                <Icon aria-hidden="true" strokeWidth={1.6} className="size-5" />
              </div>

              <span
                dir="ltr"
                className="text-[11px] font-black tracking-[.18em] opacity-35"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {section.eyebrow ? (
              <p className={`mt-6 text-[12px] font-black ${tone.eyebrow}`}>
                {section.eyebrow}
              </p>
            ) : null}

            <h2 className={`mt-2 text-[25px] font-black leading-[1.7] tracking-[-0.04em] sm:text-[30px] ${tone.title}`}>
              {section.title}
            </h2>

            {section.summary ? (
              <p className={`mt-4 text-[14px] font-medium leading-8 ${tone.summary}`}>
                {section.summary}
              </p>
            ) : null}
          </div>
        </aside>

        <div className={`border ${tone.rule} ${tone.panel}`}>
          <div className="divide-y divide-current/10">
            {section.blocks.map((block) => (
              <ReportBlock
                key={block.id}
                block={block}
                tone={section.tone}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportBlock({
  block,
  tone,
}: {
  block: WeeklyOutlookBlock;
  tone: WeeklyOutlookSectionTone;
}) {
  const dark = tone === "dark" || tone === "teal";
  const textClass = dark ? "text-white/72" : "text-ink-muted";
  const titleClass = dark ? "text-white" : "text-ink";

  if (block.type === "heading") {
    const Heading = block.level === "h2" ? "h2" : "h3";

    return (
      <div className="px-5 py-6 sm:px-7 lg:px-9">
        <Heading
          className={`font-black leading-[1.7] tracking-[-0.035em] ${
            block.level === "h2" ? "text-[26px] sm:text-[32px]" : "text-[21px] sm:text-[24px]"
          } ${titleClass}`}
        >
          {block.text}
        </Heading>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <div className="px-5 py-6 sm:px-7 lg:px-9">
        <ul className="space-y-4">
          {block.items.map((item, index) => (
            <li key={`${item}-${index}`} className="grid grid-cols-[auto_1fr] gap-3">
              <span className="mt-3 h-1.5 w-1.5 bg-brand-accent" aria-hidden="true" />

              <span className={`text-[15px] font-medium leading-8 ${textClass}`}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <div className="px-5 py-6 sm:px-7 lg:px-9">
        <div className={`border p-5 sm:p-6 ${calloutClasses[block.tone]}`}>
          {block.title ? (
            <p className="text-[14px] font-black">{block.title}</p>
          ) : null}

          <p className="mt-2 whitespace-pre-line text-[15px] font-medium leading-8">
            {block.text}
          </p>
        </div>
      </div>
    );
  }

  if (block.type === "quote") {
    return (
      <figure className="px-5 py-6 sm:px-7 lg:px-9">
        <blockquote className={`relative border-r-2 border-brand-accent pr-5 text-[18px] font-black leading-9 ${titleClass}`}>
          <Quote
            aria-hidden="true"
            className="mb-4 h-5 w-5 text-brand-accent"
            strokeWidth={1.6}
          />
          {block.text}
        </blockquote>

        {block.cite ? (
          <figcaption className={`mt-4 text-[12px] font-bold ${textClass}`}>
            {block.cite}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="px-5 py-6 sm:px-7 lg:px-9">
        <img
          src={block.src}
          alt={block.alt}
          className="h-auto w-full border border-current/10 object-cover"
        />

        {block.caption ? (
          <figcaption className={`mt-3 text-[12px] font-medium leading-6 ${textClass}`}>
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "divider") {
    return (
      <div className="px-5 py-6 sm:px-7 lg:px-9">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-current/10" />
          <span className="h-1.5 w-1.5 bg-brand-accent" />
          <span className="h-px flex-1 bg-current/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 sm:px-7 lg:px-9">
      <p className={`whitespace-pre-line text-[16px] font-medium leading-[2.05] ${textClass}`}>
        {block.text}
      </p>
    </div>
  );
}
