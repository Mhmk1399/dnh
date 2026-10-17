"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type MacroMarketAdvisoryContent = {
  order: number;
  id: "macro-market-advisory";
  type: "service-card";
  service_slug: "macro-market-advisory";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  paragraphs: string[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
  icon: string;
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight: string;
}) {
  const index = highlight ? heading.indexOf(highlight) : -1;

  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-accent">
        {heading.slice(index, index + highlight.length)}
      </span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

export function ServicesMacroMarketAdvisory() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "macro-market-advisory" && section.type === "service-card",
  ) as MacroMarketAdvisoryContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [audience, analysis, boundaries, meaning] = content.paragraphs;
  const primaryCta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="macro-market-advisory-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#0a4553] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_88%_14%,rgba(252,133,2,0.09),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_40%)]"
      />

      <div className="dnh-site-shell relative py-14 sm:py-16 lg:py-20 xl:py-24">
        <header className="border-b border-white/12 pb-8 sm:pb-10 lg:pb-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span aria-hidden="true" className="h-[2px] w-9 bg-brand-accent" />
            <p className="text-[12px] font-extrabold leading-[1.8] text-white sm:text-[13px]">
              {content.eyebrow}
            </p>
            <bdi
              dir="ltr"
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/48 sm:text-[11px]"
            >
              {content.english_label}
            </bdi>
          </div>

          <h2
            id="macro-market-advisory-heading"
            style={{ fontSize: "clamp(2.75rem, 5.4vw, 5.4rem)" }}
            className={`mt-7 max-w-[17ch] font-black text-white sm:mt-8 lg:mt-10 ${
              isRTL ? "leading-[1.34]" : "leading-[1.03]"
            }`}
          >
            <HighlightedHeading
              heading={content.heading}
              highlight={content.heading_highlight}
            />
          </h2>

          <p className="mt-8 max-w-[52rem] border-s-2 border-brand-accent ps-5 text-[15px] font-semibold leading-[2.05] text-white/72 sm:mt-9 sm:ps-6 sm:text-[16px] lg:mt-10 lg:text-[17px]">
            {audience}
          </p>
        </header>

        <div className="grid border-b border-white/12 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="py-8 sm:py-9 lg:border-e lg:border-white/12 lg:py-11 lg:pe-12 xl:pe-16">
            <p className="max-w-[44rem] text-[20px] font-black leading-[1.95] text-white sm:text-[23px] lg:text-[27px]">
              {analysis}
            </p>
          </article>

          <article className="border-t border-white/12 py-8 sm:py-9 lg:border-t-0 lg:py-11 lg:ps-12 xl:ps-16">
            <p className="max-w-[42rem] text-[15px] font-medium leading-[2.1] text-white/66 sm:text-[16px] lg:text-[17px]">
              {boundaries}
            </p>
          </article>
        </div>

        <div className="grid gap-8 pt-8 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:pt-11">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-accent">
                DNH
              </span>
              <span aria-hidden="true" className="h-px w-12 bg-white/14" />
            </div>
            <p className="max-w-[52rem] text-[21px] font-black leading-[1.9] text-white sm:text-[24px] lg:text-[29px]">
              {meaning}
            </p>
          </div>

          {primaryCta ? (
            <ActionButton
              href={primaryCta.href}
              variant={primaryCta.type}
              size="lg"
              iconPosition="end"
              contentAlignment="between"
              className="w-full sm:w-auto lg:min-w-[19rem]"
            >
              {primaryCta.label}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
