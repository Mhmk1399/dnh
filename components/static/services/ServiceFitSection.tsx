"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type PositioningContent = {
  id: "different-decisions-require-different-advisory-paths";
  type: "services-positioning";
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

export function ServicesPositioning() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "different-decisions-require-different-advisory-paths" &&
      section.type === "services-positioning",
  ) as PositioningContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const primaryCta = content.ctas?.[0];
  const listItems = content.paragraphs.slice(0, 5);
  const closingParagraphs = content.paragraphs.slice(5);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="services-positioning-heading"
      className="border-b border-line bg-surface-soft/50 py-14 text-ink sm:py-16 lg:py-20"
    >
      <div className="dnh-site-shell">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
            <p className="text-[12px] font-bold leading-[1.8] text-brand-primary sm:text-[13px]">
              {content.eyebrow}
            </p>
         
          </div>

          <h2
            id="services-positioning-heading"
            className={`mt-5 max-w-[24ch] text-pretty text-[clamp(1.95rem,5vw,3rem)] font-black tracking-[-0.035em] ${
              isRTL ? "leading-[1.5]" : "leading-[1.08]"
            }`}
          >
            <HighlightedHeading
              heading={content.heading}
              highlight={content.heading_highlight}
            />
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
            <div className="grid gap-3 sm:grid-cols-2">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3   border border-line bg-page p-4 sm:p-5"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center   bg-surface-soft text-brand-primary">
                    <Check size={16} strokeWidth={2.2} />
                  </span>
                  <p
                    className={`text-[14px] text-ink sm:text-[15px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.7]"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className=" border border-line bg-page p-5 sm:p-6 lg:p-7">
              <div className="space-y-4">
                {closingParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-[14px] text-ink-muted sm:text-[15px] ${
                      isRTL ? "leading-[2]" : "leading-[1.75]"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {primaryCta ? (
                <div className="mt-6">
                  <ActionButton
                    href={primaryCta.href}
                    variant={primaryCta.type}
                    shape="square"
                    size="lg"
                    icon={Arrow}
                    iconPosition="end"
                    dir={direction}
                    className="min-h-12 w-full sm:w-auto bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none"
                  >
                    {primaryCta.label}
                  </ActionButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
