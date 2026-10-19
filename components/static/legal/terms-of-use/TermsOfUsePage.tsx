import { ArrowLeft, ArrowRight, CornerDownLeft, CornerDownRight } from "lucide-react";

import { LocalizedLink } from "@/components/providers/LanguageProvider";
import { TermsOfUseIndex } from "./TermsOfUseIndex";

type LinkItem = { id: string; label: string; href: string; description?: string };
type Notice = { label: string; text: string };
type TermsSection = {
  id: string;
  label: string;
  title: string;
  lead: string;
  paragraphs: string[];
  bullets: string[];
  note: Notice | null;
  links: LinkItem[];
};

export type TermsOfUseContent = {
  page: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
    statusLabel: string;
    status: string;
    indexLabel: string;
    indexNote: string;
  };
  publicationNote: Notice;
  summary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ id: string; label: string; description: string }>;
  };
  useMap: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ id: string; label: string; title: string; description: string }>;
  };
  sections: TermsSection[];
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    reviewLabel: string;
    reviewText: string;
  };
  ui: { backToContents: string; chapterLabel: string };
};

const shell = "dnh-site-shell";

const latinDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

export function TermsOfUsePage({ content }: { content: TermsOfUseContent }) {
  const isRtl = content.direction === "rtl";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const CornerArrow = isRtl ? CornerDownLeft : CornerDownRight;

  return (
    <main dir={content.direction} className="overflow-x-clip bg-page text-ink">
      <section className="bg-[#032f3f] text-white">
        <div aria-hidden="true" className="h-[116px]" />
        <div className={`${shell} pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20`}>
          <header className="border-b border-white/18 pb-9 sm:pb-11">
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-brand-primary">
                <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-[1080px] text-pretty text-[38px] font-black leading-[1.48] tracking-[-.05em] text-white sm:text-[52px] lg:text-[68px] lg:leading-[1.32]">
                {content.hero.title}
              </h1>
          </header>

          <div className="grid gap-9 pt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] lg:gap-20 lg:pt-10">
              <p className="max-w-[820px] text-[15px] font-medium leading-[2.1] text-white/74 sm:text-[17px]">
                {content.hero.lead}
              </p>
            <dl className="grid border-t border-white/20 sm:grid-cols-2 lg:border-s lg:border-t-0 lg:ps-7">
              <div className="grid grid-cols-[112px_1fr] gap-4 border-b border-white/15 py-4 sm:block sm:border-e sm:pe-5 lg:border-e-0 lg:pt-0">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.hero.lastUpdatedLabel}</dt>
                <dd className="text-[13px] font-bold leading-6 text-white sm:mt-2">
                  <bdi
                    dir={content.locale === "en" ? "ltr" : undefined}
                    lang={content.locale === "en" ? "en" : "fa-IR"}
                    style={content.locale === "en" ? { fontFamily: "Arial, Helvetica, sans-serif", fontVariantNumeric: "tabular-nums", unicodeBidi: "isolate" } : undefined}
                  >
                    {content.locale === "en" ? latinDigits(content.hero.lastUpdated) : content.hero.lastUpdated}
                  </bdi>
                </dd>
              </div>
              <div className="grid grid-cols-[112px_1fr] gap-4 border-b border-white/15 py-4 sm:block sm:ps-5 lg:ps-0">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.hero.statusLabel}</dt>
                <dd className="text-[12px] font-medium leading-6 text-white/72 sm:mt-2">{content.hero.status}</dd>
              </div>
              <div className="pt-4 sm:col-span-2">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.publicationNote.label}</dt>
                <dd className="mt-1 text-[10px] font-medium leading-6 text-white/58">{content.publicationNote.text}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="terms-use-map-title" className="border-b border-ink/15 bg-[#f7f4ef]">
        <div className={`${shell} py-14 sm:py-20`}>
          <div className="grid gap-10 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-16">
            <header>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">{content.useMap.eyebrow}</p>
              <h2 id="terms-use-map-title" className="mt-4 text-pretty !text-[27px] font-black !leading-[1.65] tracking-[-.035em] sm:!text-[34px]">{content.useMap.title}</h2>
              <p className="mt-5 text-[12px] font-medium leading-7 text-ink-muted">{content.useMap.intro}</p>
            </header>
            <div className="border-t-2 border-ink">
              {content.useMap.items.map((item) => (
                <article key={item.id} className="grid gap-3 border-b border-ink/15 py-6 md:grid-cols-[130px_minmax(0,.9fr)_minmax(0,1.1fr)] md:gap-7 md:py-7">
                  <p className="text-[10px] font-black uppercase tracking-[.16em] text-brand-accent">{item.label}</p>
                  <h3 className="text-pretty text-[17px] font-black leading-8 text-ink sm:text-[19px]">{item.title}</h3>
                  <p className="text-[12px] font-medium leading-7 text-ink-muted sm:text-[13px]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/15 bg-white">
        <div className={`${shell} py-14 sm:py-20`}>
          <header className="max-w-[900px]">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">{content.summary.eyebrow}</p>
            <h2 className="mt-4 text-pretty !text-[29px] font-black !leading-[1.6] tracking-[-.035em] sm:!text-[38px]">{content.summary.title}</h2>
            <p className="mt-5 max-w-[760px] text-[13px] font-medium leading-8 text-ink-muted">{content.summary.intro}</p>
          </header>
          <div className="mt-10 grid border-s border-t border-ink/15 md:grid-cols-3">
            {content.summary.items.map((item) => (
              <article key={item.id} className="border-b border-e border-ink/15 p-5 sm:p-6">
                <h3 className="text-[12px] font-black leading-7 text-ink">{item.label}</h3>
                <p className="mt-3 text-[12px] font-medium leading-7 text-ink-muted">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <TermsOfUseIndex items={content.sections} label={content.hero.indexLabel} direction={content.direction} variant="mobile" />
          </div>
        </div>
      </section>

      <div className={`${shell} py-14 sm:py-20 lg:py-28`}>
        <div className="grid items-start gap-12 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[350px_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden bg-[#032f3f] text-white lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:[scrollbar-width:thin]">
            <div className="border-b border-white/20 px-6 pb-5 pt-6">
              <p className="text-[12px] font-black uppercase tracking-[.18em] text-brand-primary">{content.hero.indexLabel}</p>
              <p className="mt-2 max-w-[290px] text-[11px] font-medium leading-6 text-white/60">{content.hero.indexNote}</p>
            </div>
            <TermsOfUseIndex items={content.sections} label={content.hero.indexLabel} direction={content.direction} variant="rail" />
          </aside>

          <article className="min-w-0 border-t-2 border-ink bg-white px-5 pb-8 sm:px-8 lg:px-10">
            {content.sections.map((section, index) => (
              <TermsChapter key={section.id} section={section} index={index} content={content} Arrow={Arrow} CornerArrow={CornerArrow} />
            ))}
          </article>
        </div>
      </div>

      <section className="border-y-2 border-ink bg-[#eee9df] text-ink">
        <div className={`${shell} py-14 sm:py-20 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)_310px] lg:items-end lg:gap-12">
            <p className="border-t-2 border-ink pt-4 text-[10px] font-black uppercase tracking-[.18em] text-ink">{content.closing.eyebrow}</p>
            <div>
              <h2 className="max-w-[800px] text-pretty !text-[29px] font-black !leading-[1.65] tracking-[-.035em] text-ink sm:!text-[38px]">{content.closing.title}</h2>
              <p className="mt-5 max-w-[760px] text-[13px] font-medium leading-8 text-ink-muted">{content.closing.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <LocalizedLink href={content.closing.primaryCta.href} className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-6 py-3 text-xs font-black text-white transition hover:bg-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
                {content.closing.primaryCta.label}<Arrow aria-hidden="true" size={15} />
              </LocalizedLink>
              <LocalizedLink href={content.closing.secondaryCta.href} className="inline-flex min-h-12 items-center justify-center border border-ink/30 px-6 py-3 text-xs font-black text-ink transition hover:border-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
                {content.closing.secondaryCta.label}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TermsChapter({
  section,
  index,
  content,
  Arrow,
  CornerArrow,
}: {
  section: TermsSection;
  index: number;
  content: TermsOfUseContent;
  Arrow: typeof ArrowRight;
  CornerArrow: typeof CornerDownRight;
}) {
  const isBoundary = section.id === "professional-boundaries";
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className={`grid scroll-mt-28 gap-5 border-b border-ink/15 pb-16 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7 sm:pb-20 ${index === 0 ? "pt-8" : "pt-16 sm:pt-20"}`}>
      <div className="border-t border-ink/25 pt-4">
        <p className="text-[10px] font-black uppercase tracking-[.17em] text-brand-accent">{section.label}</p>
        <p aria-hidden="true" className="mt-4 h-px w-8 bg-brand-accent" />
      </div>

      <div className="min-w-0">
      <header className={isBoundary ? "border-y border-[#032f3f]/20 bg-[#e9efef] px-5 py-6 sm:px-7" : ""}>
        <h2 id={`${section.id}-title`} className="max-w-[800px] text-pretty !text-[27px] font-black !leading-[1.65] tracking-[-.03em] text-ink sm:!text-[34px]">{section.title}</h2>
        <p className="mt-5 max-w-[76ch] border-s-2 border-brand-accent ps-5 text-[14px] font-bold leading-8 text-ink sm:ps-7">{section.lead}</p>
      </header>

      {section.bullets.length ? (
        <ul className="mt-8 grid border-s border-t border-ink/15 sm:grid-cols-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="grid min-h-[86px] grid-cols-[24px_1fr] gap-3 border-b border-e border-ink/15 p-4 text-[12px] font-semibold leading-7 text-ink-muted sm:p-5">
              <span aria-hidden="true" className="mt-[13px] h-px bg-brand-accent" />{bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {section.paragraphs.length ? (
        <div className="mt-8 max-w-[76ch] space-y-5">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[13px] font-medium leading-[2.08] text-ink-muted sm:text-[14px]">{paragraph}</p>
          ))}
        </div>
      ) : null}

      {section.note ? (
        <aside className="mt-8 grid gap-3 border-y border-ink/20 bg-[#eee9df] px-5 py-5 sm:grid-cols-[190px_1fr] sm:gap-7 sm:px-6" aria-label={section.note.label}>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-ink">{section.note.label}</p>
          <p className="text-[12px] font-semibold leading-7 text-ink-muted">{section.note.text}</p>
        </aside>
      ) : null}

      {section.links.length ? (
        <div className="mt-9 border-t-2 border-ink">
          {section.links.map((link) => (
            <LocalizedLink key={link.id} href={link.href} className="group grid min-h-[88px] grid-cols-[1fr_auto] items-center gap-5 border-b border-ink/15 py-4 transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <span>
                <span className="block text-[14px] font-black leading-7 text-ink transition group-hover:text-brand-accent">{link.label}</span>
                <span className="mt-1 block text-[11px] font-medium leading-6 text-ink-muted">{link.description}</span>
              </span>
              <Arrow aria-hidden="true" size={16} className="text-brand-accent" />
            </LocalizedLink>
          ))}
        </div>
      ) : null}

      </div>

      <a href="#terms-contents" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-ink/20 py-2 text-[11px] font-black text-brand-accent transition hover:border-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:col-start-2 lg:hidden">
        {content.ui.backToContents}<CornerArrow aria-hidden="true" size={13} />
      </a>
    </section>
  );
}
