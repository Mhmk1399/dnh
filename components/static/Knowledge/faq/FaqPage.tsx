import { ArrowLeft, ArrowRight, CornerDownLeft, CornerDownRight, Plus } from "lucide-react";

import { LocalizedLink } from "@/components/providers/LanguageProvider";
import { FaqChapterIndex } from "./FaqChapterIndex";

export type FaqLink = { label: string; href: string };
export type FaqItem = { id: string; question: string; answer: string[]; link?: FaqLink };
export type FaqCategory = { id: string; label: string; title: string; intro: string; items: FaqItem[] };
export type FaqContent = {
  page: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string; indexLabel: string; indexNote: string; questionCountLabel: string };
  categories: FaqCategory[];
  boundaryFeature: { eyebrow: string; title: string; description: string; statements: string[] };
  closing: { eyebrow: string; title: string; description: string; primaryCta: FaqLink; secondaryCta: FaqLink };
  ui: { openAnswer: string; closeAnswer: string; backToIndex: string };
};

type FaqPageProps = { content: FaqContent };
const shell = "dnh-site-shell mx-auto w-full max-w-[1536px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20";

export function FaqPage({ content }: FaqPageProps) {
  const isRtl = content.direction === "rtl";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const CornerArrow = isRtl ? CornerDownLeft : CornerDownRight;
  const questionCount = content.categories.reduce((total, category) => total + category.items.length, 0);

  return (
    <main dir={content.direction} className="bg-[#f7f6f2] text-ink">
      <div aria-hidden="true" className="h-[116px] bg-ink" />
      <section id="knowledge-index" className="border-b border-ink/15">
        <div className={`${shell} py-9 sm:py-12 lg:py-14`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end lg:gap-20 xl:grid-cols-[minmax(0,1fr)_280px]">
            <header>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-brand-primary">
                <span aria-hidden="true" className="h-px w-8 bg-brand-accent" />
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[990px] text-[35px] font-black leading-[1.55] tracking-[-.05em] text-ink sm:text-[46px] lg:text-[56px] lg:leading-[1.42]">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-[740px] text-[14px] font-medium leading-[2.05] text-ink-muted sm:text-[15px]">{content.hero.description}</p>
            </header>
            <aside className="flex items-center gap-4 border-t border-ink/15 pt-5 lg:block lg:border-s lg:border-t-0 lg:ps-6 lg:pt-0">
              <p className="font-mono text-[38px] font-light leading-none tracking-[-.08em] text-ink lg:text-[52px]">{String(questionCount).padStart(2, "0")}</p>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.15em] text-brand-primary">{content.hero.questionCountLabel}</p>
                <p className="mt-1 max-w-[280px] text-[11px] font-medium leading-5 text-ink-muted lg:mt-4 lg:max-w-[230px] lg:leading-6">{content.hero.indexNote}</p>
              </div>
            </aside>
          </div>
          <div className="mt-8 lg:mt-12">
            <FaqChapterIndex categories={content.categories} label={content.hero.indexLabel} direction={content.direction} variant="top" />
          </div>
        </div>
      </section>

      <div className={`${shell} py-14 sm:py-20 lg:py-28`}>
        <div className="grid items-start gap-12 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-auto lg:pe-2 lg:[scrollbar-width:thin]">
            <p className="border-b-2 border-ink pb-5 text-[12px] font-black uppercase tracking-[.2em] text-brand-primary">{content.hero.indexLabel}</p>
            <FaqChapterIndex categories={content.categories} label={content.hero.indexLabel} direction={content.direction} variant="rail" />
          </aside>

          <div className="min-w-0">
            {content.categories.map((category, categoryIndex) => {
              const isBoundary = category.id === "professional-boundaries";
              return (
                <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className={`group/chapter scroll-mt-28 ${categoryIndex === 0 ? "" : "mt-20 lg:mt-28"} ${isBoundary ? "bg-ink px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10" : ""}`}>
                  <header className={`grid gap-5 border-t-2 pt-6 ${isBoundary ? "border-white" : "border-ink"} xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-12`}>
                    <div>
                      <p className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[.18em] ${isBoundary ? "text-brand-accent" : "text-brand-primary"}`}>
                        <span aria-hidden="true" className="h-px w-0 bg-brand-accent transition-[width] duration-300 group-target/chapter:w-7" />{category.label}
                      </p>
                      <h2 id={`${category.id}-title`} className={`mt-4 max-w-[720px] text-[27px] font-black leading-[1.65] tracking-[-.035em] sm:text-[33px] ${isBoundary ? "text-white" : "text-ink"}`}>{category.title}</h2>
                    </div>
                    <p className={`border-s ps-5 text-[12px] font-medium leading-7 ${isBoundary ? "border-white/25 text-white/65" : "border-ink/20 text-ink-muted"}`}>{category.intro}</p>
                  </header>
                  <div className={`mt-9 border-t ${isBoundary ? "border-white/25" : "border-ink/25"}`}>
                    {category.items.map((item) => (
                      <FaqDisclosure key={item.id} item={item} categoryId={category.id} openLabel={content.ui.openAnswer} closeLabel={content.ui.closeAnswer} inverted={isBoundary} />
                    ))}
                  </div>
                  <a href="#faq-topics" className={`mt-6 inline-flex min-h-11 items-center gap-2 border-b py-2 text-[11px] font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 lg:hidden ${isBoundary ? "border-white/25 text-white focus-visible:outline-brand-accent" : "border-ink/20 text-brand-primary hover:border-brand-primary focus-visible:outline-brand-primary"}`}>
                    {content.ui.backToIndex}<CornerArrow aria-hidden="true" size={13} />
                  </a>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <section className="border-y border-ink/15 bg-white">
        <div className={`${shell} py-14 sm:py-20 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)] lg:items-start lg:gap-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-primary">{content.boundaryFeature.eyebrow}</p>
              <h2 className="mt-4 max-w-[760px] text-[29px] font-black leading-[1.65] tracking-[-.04em] text-ink sm:text-[38px]">{content.boundaryFeature.title}</h2>
              <p className="mt-5 max-w-[720px] text-[13px] font-medium leading-8 text-ink-muted">{content.boundaryFeature.description}</p>
            </div>
            <ul className="border-t-2 border-ink">
              {content.boundaryFeature.statements.map((statement) => (
                <li key={statement} className="grid grid-cols-[24px_1fr] gap-4 border-b border-ink/15 py-4 text-[13px] font-bold leading-7 text-ink">
                  <span aria-hidden="true" className="mt-[13px] h-px bg-brand-accent" />{statement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f2]">
        <div className={`${shell} py-14 sm:py-20 lg:py-24`}>
          <div className="border-s-2 border-brand-accent ps-6 sm:ps-9 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-primary">{content.closing.eyebrow}</p>
              <h2 className="mt-4 max-w-[830px] text-[28px] font-black leading-[1.7] tracking-[-.04em] text-ink sm:text-[36px]">{content.closing.title}</h2>
              <p className="mt-4 max-w-[760px] text-[13px] font-medium leading-8 text-ink-muted">{content.closing.description}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
              <LocalizedLink href={content.closing.primaryCta.href} className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-6 py-3 text-xs font-black text-white transition hover:bg-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
                {content.closing.primaryCta.label}<Arrow aria-hidden="true" size={15} />
              </LocalizedLink>
              <LocalizedLink href={content.closing.secondaryCta.href} className="inline-flex min-h-12 items-center justify-center border border-ink/25 bg-transparent px-6 py-3 text-xs font-black text-ink transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">{content.closing.secondaryCta.label}</LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqDisclosure({ item, categoryId, openLabel, closeLabel, inverted = false }: { item: FaqItem; categoryId: string; openLabel: string; closeLabel: string; inverted?: boolean }) {
  const answerId = `${categoryId}-${item.id}-answer`;
  return (
    <details className={`group border-b ${inverted ? "border-white/20" : "border-ink/15"}`}>
      <summary aria-controls={answerId} className={`flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-start marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-[80px] sm:py-6 [&::-webkit-details-marker]:hidden ${inverted ? "focus-visible:outline-brand-accent" : "focus-visible:outline-brand-primary"}`}>
        <h3 className={`max-w-[850px] text-[15px] font-black leading-8 transition sm:text-[16px] ${inverted ? "text-white group-hover:text-brand-accent" : "text-ink group-hover:text-brand-primary"}`}>{item.question}</h3>
        <span className={`relative flex size-8 shrink-0 items-center justify-center border transition group-open:bg-brand-accent group-open:text-ink ${inverted ? "border-white/30 text-white group-open:border-brand-accent" : "border-ink/25 text-brand-primary group-hover:border-brand-primary group-open:border-brand-accent"}`}>
          <Plus aria-hidden="true" size={14} className="transition-transform duration-300 group-open:rotate-45" />
          <span className="sr-only group-open:hidden">{openLabel}</span><span className="sr-only hidden group-open:inline">{closeLabel}</span>
        </span>
      </summary>
      <div id={answerId} className="pb-7 pe-1 sm:pb-9 sm:pe-14">
        <div className="max-w-[72ch] border-s-2 border-brand-accent ps-5 sm:ps-7">
          {item.answer.map((paragraph) => <p key={paragraph} className={`mt-4 first:mt-0 text-[13px] font-medium leading-[2.05] sm:text-sm ${inverted ? "text-white/70" : "text-ink-muted"}`}>{paragraph}</p>)}
          {item.link ? <LocalizedLink href={item.link.href} className={`mt-6 inline-flex min-h-10 items-center border-b border-brand-accent pb-1 text-xs font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${inverted ? "text-white hover:text-brand-accent focus-visible:outline-brand-accent" : "text-brand-primary hover:text-ink focus-visible:outline-brand-primary"}`}>{item.link.label}</LocalizedLink> : null}
        </div>
      </div>
    </details>
  );
}
