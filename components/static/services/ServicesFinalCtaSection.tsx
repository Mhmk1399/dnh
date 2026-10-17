"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type FinalCtaContent = {
  order: number;
  id: "start-with-the-decision-not-the-service";
  type: "final-cta";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  checklist: string[];
  closing_paragraphs: string[];
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

export function ServicesFinalCtaSection() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "start-with-the-decision-not-the-service" &&
      section.type === "final-cta",
  ) as FinalCtaContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [primaryCta, secondaryCta] = content.ctas;
  const intro = content.paragraphs[0];
  const [
    contextParagraph,
    processParagraph,
    objectiveLabel,
    objectiveStatement,
  ] = content.closing_paragraphs;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="services-final-cta-heading"
      className="scroll-mt-28 border-t border-line bg-page text-ink"
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

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <h2
              id="services-final-cta-heading"
              className={`max-w-[17ch] text-pretty font-black tracking-[-0.04em] ${
                isRTL ? "leading-[1.46]" : "leading-[1.04]"
              }`}
              style={{ fontSize: "clamp(2.55rem, 5.4vw, 4.25rem)" }}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0   border-line">
            <p
              className={`mt-6 max-w-[42rem] text-[15px] font-semibold text-ink-muted sm:text-[16px] lg:text-[17px] ${
                isRTL ? "leading-[2]" : "leading-[1.8]"
              }`}
            >
              {intro}
            </p>
            {content.checklist.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[42px_minmax(0,1fr)] items-start gap-4 border-b border-line py-4 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="pt-[2px] text-[12px] font-black text-brand-accent sm:text-[13px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p
                  className={`text-[14px] font-semibold text-ink sm:text-[15px] lg:text-[16px] ${
                    isRTL ? "leading-[1.95]" : "leading-[1.72]"
                  }`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-primary text-white">
        <div className="dnh-site-shell py-10 sm:py-12 lg:py-14">
          <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
            <div className="min-w-0">
              <p
                className={`text-[15px] font-semibold text-white/78 sm:text-[16px] ${
                  isRTL ? "leading-[2]" : "leading-[1.8]"
                }`}
              >
                {contextParagraph}
              </p>
            </div>

            <div className="min-w-0 lg:border-s lg:border-white/18 lg:ps-10 xl:ps-14">
              <p className="text-[12px] font-extrabold text-brand-accent sm:text-[13px]">
                {objectiveLabel}
              </p>

              <p
                className={`mt-3 max-w-[30rem] text-[24px] font-black text-white sm:text-[28px] lg:text-[32px] ${
                  isRTL ? "leading-[1.65]" : "leading-[1.25]"
                }`}
              >
                {objectiveStatement}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex min-h-[54px] items-center justify-between gap-5 border border-brand-accent bg-brand-accent px-5 py-3 text-[13px] font-extrabold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/30 sm:min-w-[17rem] sm:text-[14px] motion-reduce:transition-none"
                  >
                    <span>{primaryCta.label}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center border border-current/30"
                    >
                      <Arrow className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </Link>
                ) : null}

                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="group inline-flex min-h-[54px] items-center justify-between gap-5 border border-white/45 bg-transparent px-5 py-3 text-[13px] font-extrabold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/30 sm:min-w-[13.5rem] sm:text-[14px] motion-reduce:transition-none"
                  >
                    <span>{secondaryCta.label}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center border border-current/30"
                    >
                      <Arrow className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
