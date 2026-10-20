import {
  ArrowLeft,
  ArrowRight,
  CornerDownLeft,
  CornerDownRight,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { LocalizedLink } from "@/components/providers/LanguageProvider";
// Update this import only if DnhPageHero lives in another folder in your project.
 import { FaqChapterIndex } from "./FaqChapterIndex";
import { DnhPageHero, DnhPageHeroMedia } from "@/components/ui/DnhPageHero";

export type FaqLink = { label: string; href: string };
export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  link?: FaqLink;
};
export type FaqCategory = {
  id: string;
  label: string;
  title: string;
  intro: string;
  items: FaqItem[];
};
export type FaqContent = {
  page: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    indexLabel: string;
    indexNote: string;
    questionCountLabel: string;
    // Optional: add these values to the FAQ JSON whenever you have an image.
    highlight?: string;
    media?: DnhPageHeroMedia;
  };
  categories: FaqCategory[];
  boundaryFeature: {
    eyebrow: string;
    title: string;
    description: string;
    statements: string[];
  };
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: FaqLink;
    secondaryCta: FaqLink;
  };
  ui: { openAnswer: string; closeAnswer: string; backToIndex: string };
};

type FaqPageProps = { content: FaqContent };

const shell = "dnh-site-shell mx-auto w-full";

export function FaqPage({ content }: FaqPageProps) {
  const isRTL = content.direction === "rtl";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const CornerArrow = isRTL ? CornerDownLeft : CornerDownRight;
  const questionCount = content.categories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <main dir={content.direction} lang={content.locale} className="min-w-0 bg-[#f7f6f2] text-ink">
      {/* Shared dynamic hero. Image is optional; otherwise it uses an editorial gradient. */}
      <DnhPageHero
        id="faq-hero"
        headingId="faq-page-title"
        direction={content.direction}
        lang={content.locale}
        eyebrow={content.hero.eyebrow}
        heading={content.hero.title}
        headingHighlight={content.hero.highlight}
        paragraphs={[{ id: "faq-introduction", text: content.hero.description }]}
        ctas={[
          {
            id: "faq-topics-link",
            label: content.hero.indexLabel,
            href: "#faq-topics",
            type: "primary",
          },
        ]}
        media={content.hero.media?.src ? content.hero.media : undefined}
        mediaMode="background"
        compact
      />

      {/* Sticky mobile index is constrained to the FAQ section only. */}
      <div className="relative">
      <FaqChapterIndex
        categories={content.categories}
        label={content.hero.indexLabel}
        direction={content.direction}
        variant="top"
      />

      <section id="knowledge-index" aria-label={content.hero.indexLabel} className="scroll-mt-[150px] border-b border-line bg-[#f7f6f2]">
        <div className={`${shell} py-12 sm:py-16 lg:py-20`}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(240px,0.34fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(280px,0.33fr)_minmax(0,1fr)] xl:gap-20">
            {/* Desktop sticky index, limited by the FAQ section, not by the hero. */}
            <aside className="hidden min-w-0 lg:sticky lg:top-28 lg:block lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pe-2 lg:[scrollbar-width:thin]">
              <div className="mb-5 border-s-[3px] border-brand-accent ps-4">
                <p className="text-[11px] font-black text-brand-primary">
                  {content.hero.eyebrow}
                </p>
                <p className="mt-2 text-[12px] leading-6 text-ink-muted">
                  {content.hero.indexNote}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-ink-muted">
                
                  {content.hero.questionCountLabel}
                </p>
              </div>
              <FaqChapterIndex
                categories={content.categories}
                label={content.hero.indexLabel}
                direction={content.direction}
                variant="rail"
              />
            </aside>

            <div className="min-w-0">
              <header className="mb-10 flex items-end justify-between gap-5 border-b-2 border-ink pb-5 sm:mb-12">
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-brand-primary">
                    {content.hero.indexLabel}
                  </p>
                  <p className="mt-2 max-w-[55ch] text-[12px] leading-7 text-ink-muted">
                    {content.hero.indexNote}
                  </p>
                </div>
                <div className="shrink-0 text-end">
                 
                  <span className="mt-2 block text-[10px] font-semibold text-ink-muted">
                    {content.hero.questionCountLabel}
                  </span>
                </div>
              </header>

              {content.categories.map((category, categoryIndex) => {
                const inverted = category.id === "professional-boundaries";
                const chapterNumber = String(categoryIndex + 1).padStart(2, "0");
                return (
                  <section
                    key={category.id}
                    id={category.id}
                    aria-labelledby={`${category.id}-title`}
                    className={`group/chapter scroll-mt-[165px] sm:scroll-mt-[175px] lg:scroll-mt-32 ${categoryIndex ? "mt-16 sm:mt-20 lg:mt-24" : ""} ${
                      inverted ? "border border-white/10 bg-ink px-4 py-6 text-white sm:px-8 sm:py-9" : ""
                    }`}
                  >
                    <header className={`border-t-[3px] pt-5 sm:pt-6 ${inverted ? "border-brand-accent" : "border-brand-primary"}`}>
                      <div className="flex items-start gap-4 sm:gap-5">
                        <span
                          aria-hidden="true"
                          className={`flex size-11 shrink-0 items-center justify-center border font-mono text-[13px] font-black ${
                            inverted ? "border-brand-accent/45 text-brand-accent" : "border-line bg-page text-brand-primary"
                          }`}
                        >
                          {chapterNumber}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[11px] font-black ${inverted ? "text-brand-accent" : "text-brand-primary"}`}>
                            {category.label}
                          </p>
                          <h2
                            id={`${category.id}-title`}
                            className={`mt-2 max-w-[29ch] text-pretty !text-[clamp(1.35rem,2.8vw,1.875rem)] font-black tracking-[-.02em] ${
                              isRTL ? "leading-[1.65]" : "leading-[1.32]"
                            } ${inverted ? "text-white" : "text-ink"}`}
                          >
                            {category.title}
                          </h2>
                          <p className={`mt-3 max-w-[78ch] text-[13px] leading-[1.95] sm:text-[14px] ${inverted ? "text-white/65" : "text-ink-muted"}`}>
                            {category.intro}
                          </p>
                        </div>
                      </div>
                    </header>

                    <div className={`mt-6 border-t sm:mt-8 ${inverted ? "border-white/20" : "border-line"}`}>
                      {category.items.map((item, itemIndex) => (
                        <FaqDisclosure
                          key={item.id}
                          item={item}
                          number={String(itemIndex + 1).padStart(2, "0")}
                          categoryId={category.id}
                          openLabel={content.ui.openAnswer}
                          closeLabel={content.ui.closeAnswer}
                          inverted={inverted}
                          isRTL={isRTL}
                        />
                      ))}
                    </div>

                    <a
                      href="#faq-topics"
                      className={`mt-5 inline-flex min-h-11 items-center gap-2 border-b py-2 text-[11px] font-black transition focus-visible:outline-2 focus-visible:outline-offset-4 lg:hidden ${
                        inverted
                          ? "border-white/25 text-white hover:text-brand-accent"
                          : "border-line text-brand-primary hover:border-brand-primary"
                      }`}
                    >
                      {content.ui.backToIndex}
                      <CornerArrow aria-hidden="true" size={15} />
                    </a>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </div>

      <section className="border-b border-line bg-page">
        <div className={`${shell} py-14 sm:py-20`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] lg:gap-16">
            <div>
              <div className="inline-flex size-11 items-center justify-center border border-line text-brand-primary">
                <ShieldCheck aria-hidden="true" size={22} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-[11px] font-black text-brand-primary">
                {content.boundaryFeature.eyebrow}
              </p>
              <h2 className={`mt-3 max-w-[32ch] !text-[clamp(1.4rem,2.9vw,1.875rem)] font-black ${isRTL ? "leading-[1.7]" : "leading-[1.3]"}`}>
                {content.boundaryFeature.title}
              </h2>
              <p className="mt-4 max-w-[66ch] text-[13px] leading-[2] text-ink-muted sm:text-[14px]">
                {content.boundaryFeature.description}
              </p>
            </div>
            <ul className="border-t-2 border-brand-primary">
              {content.boundaryFeature.statements.map((statement) => (
                <li key={statement} className="flex items-start gap-3 border-b border-line py-4 text-[13px] font-semibold leading-7 text-ink">
                  <span aria-hidden="true" className="mt-[13px] h-[2px] w-5 shrink-0 bg-brand-accent" />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f2]">
        <div className={`${shell} py-14 sm:py-20`}>
          <div className="grid items-end gap-7 border-s-[3px] border-brand-accent ps-5 sm:ps-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div>
              <p className="text-[11px] font-black text-brand-primary">{content.closing.eyebrow}</p>
              <h2 className={`mt-3 max-w-[37ch] !text-[clamp(1.35rem,2.7vw,1.875rem)] font-black ${isRTL ? "leading-[1.7]" : "leading-[1.3]"}`}>
                {content.closing.title}
              </h2>
              <p className="mt-4 max-w-[70ch] text-[13px] leading-[2] text-ink-muted">
                {content.closing.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <LocalizedLink
                href={content.closing.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-brand-primary px-5 py-3 text-[12px] font-black text-white transition hover:bg-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                {content.closing.primaryCta.label}
                <Arrow aria-hidden="true" size={17} />
              </LocalizedLink>
              <LocalizedLink
                href={content.closing.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-line-strong px-5 py-3 text-[12px] font-black text-ink transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                {content.closing.secondaryCta.label}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqDisclosure({
  item,
  number,
  categoryId,
  openLabel,
  closeLabel,
  inverted,
  isRTL,
}: {
  item: FaqItem;
  number: string;
  categoryId: string;
  openLabel: string;
  closeLabel: string;
  inverted: boolean;
  isRTL: boolean;
}) {
  const answerId = `${categoryId}-${item.id}-answer`;
  return (
    <details
      id={`faq-question-${categoryId}-${item.id}`}
      className={`group scroll-mt-[165px] border-b transition-colors duration-200 sm:scroll-mt-[175px] lg:scroll-mt-32 ${inverted ? "border-white/15 open:bg-white/[0.05]" : "border-line open:bg-white"}`}
    >
      <summary
        aria-controls={answerId}
        className="flex min-h-[76px] cursor-pointer list-none items-center gap-3 px-2 py-4 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:min-h-[86px] sm:gap-5 sm:px-4 [&::-webkit-details-marker]:hidden"
      >
        <span
          aria-hidden="true"
          className={`w-6 shrink-0 font-mono text-[11px] tabular-nums ${inverted ? "text-brand-accent" : "text-brand-primary"}`}
        >
          {number}
        </span>
        <h3 className={`min-w-0 flex-1 text-pretty text-[14px] font-black leading-[1.9] sm:text-[15px] ${inverted ? "text-white" : "text-ink"}`}>
          {item.question}
        </h3>
        <span
          aria-hidden="true"
          className={`flex size-9 shrink-0 items-center justify-center border transition-[border-color,background-color,color] duration-200 group-open:border-brand-accent group-open:bg-brand-accent group-open:text-ink ${
            inverted ? "border-white/30 text-white" : "border-line-strong text-brand-primary"
          }`}
        >
          <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" strokeWidth={1.8} />
        </span>
        <span className="sr-only group-open:hidden">{openLabel}</span>
        <span className="sr-only hidden group-open:inline">{closeLabel}</span>
      </summary>
      <div id={answerId} className="pb-6 pe-3 ps-9 sm:pb-8 sm:pe-12 sm:ps-14">
        <div className="max-w-[75ch] border-s-2 border-brand-accent ps-4 sm:ps-5">
          {item.answer.map((paragraph, index) => (
            <p
              key={`${item.id}-${index}`}
              className={`mt-3 first:mt-0 text-[13px] font-medium sm:text-[14px] ${isRTL ? "leading-[2]" : "leading-[1.8]"} ${
                inverted ? "text-white/75" : "text-ink-muted"
              }`}
            >
              {paragraph}
            </p>
          ))}
          {item.link ? (
            <LocalizedLink
              href={item.link.href}
              className={`mt-5 inline-flex min-h-10 items-center border-b border-brand-accent pb-1 text-[12px] font-black transition focus-visible:outline-2 focus-visible:outline-offset-4 ${inverted ? "text-white hover:text-brand-accent" : "text-brand-primary hover:text-ink"}`}
            >
              {item.link.label}
            </LocalizedLink>
          ) : null}
        </div>
      </div>
    </details>
  );
}
