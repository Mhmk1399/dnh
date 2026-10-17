"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type PortfolioIntelligenceContent = {
  order: number;
  id: "portfolio-intelligence";
  type: "service-card";
  service_slug: "portfolio-intelligence";
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
  focus_areas: Array<{
    id: string;
    label: string;
  }>;
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

export function ServicesPortfolioIntelligence() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "portfolio-intelligence" &&
      section.type === "service-card",
  ) as PortfolioIntelligenceContent | undefined;

  if (!content) return null;

  const [audienceParagraph, issuesParagraph, closingParagraph] =
    content.paragraphs;
  const primaryCta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="portfolio-intelligence-heading"
      className="scroll-mt-28 border-b border-line bg-page"
    >
      <div className="dnh-site-shell py-14 sm:py-16 lg:py-20 xl:py-24">
        <div className="border-t border-line-strong pt-5 sm:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 bg-brand-accent"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
            </div>

            {locale === "fa" ? (
              <bdi
                dir="ltr"
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-muted sm:text-[11px]"
              >
                {content.english_label}
              </bdi>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end lg:gap-14 xl:gap-20">
          <h2
            id="portfolio-intelligence-heading"
            className={`max-w-[19ch] text-pretty font-black tracking-[-0.035em] text-ink ${
              isRTL ? "leading-[1.45]" : "leading-[1.04]"
            }`}
            style={{ fontSize: "clamp(2.35rem, 4.4vw, 4.6rem)" }}
          >
            <HighlightedHeading
              heading={content.heading}
              highlight={content.heading_highlight}
            />
          </h2>

          <p
            className={`max-w-[40rem] border-s-2 border-brand-accent ps-5 text-[15px] font-semibold text-ink sm:text-[16px] lg:text-[17px] ${
              isRTL ? "leading-[2.05]" : "leading-[1.75]"
            }`}
          >
            {audienceParagraph}
          </p>
        </div>

        <div className="mt-9 border-y border-line py-6 sm:mt-10 sm:py-7 lg:mt-12 lg:py-8">
          <p
            className={`max-w-[70rem] text-[16px] font-bold text-ink sm:text-[17px] lg:text-[19px] ${
              isRTL ? "leading-[2]" : "leading-[1.7]"
            }`}
          >
            {issuesParagraph}
          </p>
        </div>

        <ul className="grid grid-cols-2 bg-brand-primary text-white lg:grid-cols-4">
          {content.focus_areas.map((item, index) => (
            <li
              key={item.id}
              className={`relative flex min-h-[7.5rem] items-end p-4 sm:min-h-[8.5rem] sm:p-5 lg:min-h-[10rem] lg:p-6 ${
                index % 2 === 1 ? "border-s border-white/20" : ""
              } ${index >= 2 ? "border-t border-white/20 lg:border-t-0" : ""} ${
                index > 0 ? "lg:border-s lg:border-white/20" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute start-4 top-4 h-[2px] w-7 bg-brand-accent sm:start-5 sm:top-5 lg:start-6 lg:top-6"
              />
              <span className="text-[13px] font-extrabold leading-[1.9] sm:text-[14px] lg:text-[15px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 border-b border-line py-7 sm:py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:py-10">
          <p
            className={`max-w-[54rem] text-[14px] font-medium text-ink-muted sm:text-[15px] lg:text-[16px] ${
              isRTL ? "leading-[2.05]" : "leading-[1.8]"
            }`}
          >
            {closingParagraph}
          </p>

          {primaryCta ? (
            <ActionButton
              href={primaryCta.href}
              variant={primaryCta.type}
              size="lg"
              className="w-full shadow-none sm:w-auto lg:min-w-[18rem]"
            >
              {primaryCta.label}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
