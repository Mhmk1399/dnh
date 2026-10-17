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

type StrategicFinancialAdvisoryContent = {
  order: number;
  id: "strategic-financial-advisory";
  type: "service-card";
  service_slug: "strategic-financial-advisory";
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

export function ServicesStrategicFinancialAdvisory() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "strategic-financial-advisory" &&
      section.type === "service-card",
  ) as StrategicFinancialAdvisoryContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [audienceParagraph, thesisParagraph, scopeParagraph] =
    content.paragraphs;
  const primaryCta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="strategic-financial-advisory-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-line bg-page"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
      />

      <div className="dnh-site-shell relative py-14 sm:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-line pb-5 sm:pb-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              aria-hidden="true"
              className="h-[2px] w-9 shrink-0 bg-brand-accent"
            />
            <p className="text-[12px] font-extrabold leading-[1.8] text-ink sm:text-[13px]">
              {content.eyebrow}
            </p>
         
          </div>

        
        </div>

        <header className="pt-8 sm:pt-10 lg:pt-12 xl:pt-14">
          <h2
            id="strategic-financial-advisory-heading"
            className={`max-w-[61ch] text-pretty text-4xl font-black text-ink sm:max-w-[20ch] lg:max-w-[28ch] ${
              isRTL ? "leading-[1.42]" : "leading-[1.03]"
            }`}
          >
            <HighlightedHeading
              heading={content.heading}
              highlight={content.heading_highlight}
            />
          </h2>

         
        </header>

        <div
          dir="ltr"
          className={`mt-10 grid gap-0 border-y border-line sm:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] ${
            isRTL ? "" : "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
          }`}
        >
          <article
            dir={direction}
            className={`relative min-w-0 py-7 sm:py-8 lg:py-10 xl:py-12 ${
              isRTL
                ? "lg:col-start-2 lg:row-start-1 lg:ps-12 xl:ps-16"
                : "lg:col-start-1 lg:row-start-1 lg:pe-12 xl:pe-16"
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-0 hidden w-[3px] bg-brand-accent lg:block"
            />
            <span
              aria-hidden="true"
              className="mb-5 block h-[3px] w-10 bg-brand-accent lg:hidden"
            />
            <p
              className={`max-w-[50rem] text-[17px] font-extrabold text-ink sm:text-[18px] lg:text-[21px] xl:text-[22px] ${
                isRTL ? "leading-[2.02]" : "leading-[1.62]"
              }`}
            >
              {thesisParagraph}
            </p>
          </article>

          <article
            dir={direction}
            className={`min-w-0 border-t border-line py-7 sm:py-8 lg:row-start-1 lg:border-t-0 lg:py-10 xl:py-12 ${
              isRTL
                ? "lg:col-start-1 lg:border-e lg:pe-10 xl:pe-12"
                : "lg:col-start-2 lg:border-s lg:ps-10 xl:ps-12"
            }`}
          >
            <p
              className={`max-w-[36rem] text-[14px] font-medium text-ink-muted sm:text-[15px] lg:text-[16px] ${
                isRTL ? "leading-[2.08]" : "leading-[1.78]"
              }`}
            >
              {scopeParagraph}
            </p>
          </article>
        </div>

        <div className="mt-7 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-9">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-2.5 w-2.5 bg-brand-accent" />
            <bdi
              dir="ltr"
              className="text-[9.5px] font-black uppercase tracking-[0.13em] text-ink-muted/60"
            >
              Strategic Financial Advisory
            </bdi>
          </div>

          {primaryCta ? (
            <ActionButton
              href={primaryCta.href}
              variant={primaryCta.type}
              size="lg"
              icon={Arrow}
              iconPosition="end"
              className="w-full sm:w-auto sm:min-w-[19rem]"
            >
              {primaryCta.label}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
