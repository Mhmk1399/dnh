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

type AssessmentRoutingContent = {
  order: number;
  id: "not-sure-where-to-start";
  type: "assessment-routing";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  if (!highlight) return <>{heading}</>;

  const index = heading.indexOf(highlight);
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

export function ServicesAssessmentRouting() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "not-sure-where-to-start" &&
      section.type === "assessment-routing",
  ) as AssessmentRoutingContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const intro = content.paragraphs[0];
  const situations = content.paragraphs.slice(1, 5);
  const assessmentIntro = content.paragraphs[5];
  const assessmentDetail = content.paragraphs[6];
  const primaryCta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="services-assessment-routing-heading"
      className="scroll-mt-28 border-b border-line bg-page text-ink"
    >
      <div className="dnh-site-shell py-14 sm:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
          <p
            className={`text-[12px] font-extrabold text-brand-primary sm:text-[13px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.5]"
            }`}
          >
            {content.eyebrow}
          </p>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <h2
              id="services-assessment-routing-heading"
              className={`max-w-[18ch] text-pretty font-black tracking-[-0.04em] ${
                isRTL ? "leading-[1.46]" : "leading-[1.04]"
              }`}
              style={{ fontSize: "clamp(2.35rem, 5.25vw, 4rem)" }}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0  border-line">
            <p
              className={`mt-6 max-w-[38rem] text-[14px] font-bold text-ink-muted sm:text-[15px] lg:text-[16px] ${
                isRTL ? "leading-[2]" : "leading-[1.8]"
              }`}
            >
              {intro}
            </p>
            {situations.map((situation) => (
              <div
                key={situation}
                className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-4 border-b border-line py-4 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.8rem] h-[2px] w-5 bg-brand-accent"
                />
                <p
                  className={`text-[14px] font-semibold text-ink sm:text-[15px] lg:text-[16px] ${
                    isRTL ? "leading-[1.95]" : "leading-[1.75]"
                  }`}
                >
                  {situation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-brand-primary text-white">
        <div className="dnh-site-shell py-8 sm:py-10 lg:py-12">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="max-w-[58rem]">
              <p
                className={`text-[17px] font-extrabold sm:text-[19px] lg:text-[21px] ${
                  isRTL ? "leading-[1.9]" : "leading-[1.55]"
                }`}
              >
                {assessmentIntro}
              </p>

              <p
                className={`mt-4 text-[13px] font-medium text-white/72 sm:text-[14px] lg:text-[15px] ${
                  isRTL ? "leading-[2.05]" : "leading-[1.8]"
                }`}
              >
                {assessmentDetail}
              </p>
            </div>

            {primaryCta ? (
              <ActionButton
                href={primaryCta.href}
                variant={primaryCta.type}
                size="lg"
                icon={Arrow}
                iconPosition="end"
                contentAlignment="between"
                className="w-full bg-brand-accent text-white shadow-none hover:bg-white hover:text-brand-primary hover:shadow-none sm:w-auto lg:min-w-[15rem]"
              >
                {primaryCta.label}
              </ActionButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
