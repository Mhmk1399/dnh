"use client";

import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Landmark,
  Layers3,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type HeroFocusArea = {
  id: "risk" | "liquidity" | "economy" | "assets" | "decision";
  label: string;
  english_label: string;
};

type IntelligenceDeskHeroContent = {
  order: number;
  id: "dnh-intelligence-desk-hero";
  type: "hero";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  paragraphs: Array<{
    id:
      | "market-noise"
      | "desk-purpose"
      | "decision-context"
      | "interpretation-thesis";
    text: string;
  }>;
  focus_areas: HeroFocusArea[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const focusIcons: Record<HeroFocusArea["id"], LucideIcon> = {
  risk: ShieldCheck,
  liquidity: Droplets,
  economy: Landmark,
  assets: Layers3,
  decision: SlidersHorizontal,
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight: string;
}) {
  const highlightIndex = highlight ? heading.indexOf(highlight) : -1;

  if (highlightIndex < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, highlightIndex)}
      <span className="text-brand-accent">
        {heading.slice(highlightIndex, highlightIndex + highlight.length)}
      </span>
      {heading.slice(highlightIndex + highlight.length)}
    </>
  );
}

export function IntelligenceDeskHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "dnh-intelligence-desk-hero" && section.type === "hero",
  ) as IntelligenceDeskHeroContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const thesis = content.paragraphs.find(
    (paragraph) => paragraph.id === "interpretation-thesis",
  );
  const prose = content.paragraphs.filter(
    (paragraph) => paragraph.id !== "interpretation-thesis",
  );

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-intelligence-desk-hero-heading"
      className="relative isolate overflow-x-clip border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_32%,#09151d_68%)] text-[var(--dnh-text-on-brand)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: [
            "linear-gradient(to bottom,color-mix(in srgb,var(--dnh-text-on-brand) 5%,transparent) 1px,transparent 1px)",
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-text-on-brand) 4%,transparent) 1px,transparent 1px)",
          ].join(","),
          backgroundSize: "76px 76px,76px 76px",
          maskImage:
            "linear-gradient(to bottom,black 0%,black 68%,transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-accent to-transparent"
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-10 pb-14 pt-[calc(7.75rem+env(safe-area-inset-top))] sm:gap-12 sm:pb-16 sm:pt-36 lg:grid-cols-[minmax(0,1.04fr)_minmax(25rem,0.96fr)] lg:items-center lg:gap-14 lg:pb-20 lg:pt-[clamp(9.25rem,13svh,11rem)] xl:gap-20">
        <div className="min-w-0 text-start">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              aria-hidden="true"
              className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
            />
            <p className="text-[12px] font-bold leading-[1.8] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_92%,transparent)] sm:text-[13px]">
              {content.eyebrow}
            </p>
            
          </div>

          <h1
            id="dnh-intelligence-desk-hero-heading"
            className={`mt-5 max-w-[26ch] text-pretty text-[clamp(2rem,8vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.6rem,5.6vw,3.7rem)] lg:max-w-[23ch] lg:text-[clamp(3rem,4.15vw,4.35rem)] ${
              isRTL ? "leading-[1.5]" : "leading-[1.1]"
            }`}
          >
            <HighlightedHeading
              heading={content.heading}
              highlight={content.heading_highlight}
            />
          </h1>

          <div
            className={`mt-6 max-w-[92ch] space-y-4 border-s-2 border-brand-accent ps-4 text-[14px] font-medium text-[color-mix(in_srgb,var(--dnh-text-on-brand)_78%,transparent)] sm:mt-7 sm:ps-5 sm:text-[15px] lg:text-[15.5px] ${
              isRTL ? "leading-[2]" : "leading-[1.76]"
            }`}
          >
            {prose.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>

          <div className="mt-7 flex min-w-0 flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                size="lg"
                icon={Arrow}
                iconPosition="end"
                dir={direction}
                className={`min-h-12 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto ${
                  cta.type === "primary"
                    ? "bg-brand-accent text-white shadow-none hover:bg-brand-primary hover:shadow-none"
                    : "border-[color-mix(in_srgb,var(--dnh-text-on-brand)_28%,transparent)] bg-transparent text-white shadow-none hover:border-brand-accent hover:bg-white/5 hover:text-white hover:shadow-none"
                }`}
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:ps-2">
          <div className="relative overflow-hidden border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_16%,transparent)] bg-[color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]">
            <div className="flex min-w-0 items-center justify-between gap-4 border-b border-[color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)] px-4 py-3.5 sm:px-5 sm:py-4">
              
              <ScanLine
                aria-hidden="true"
                size={19}
                strokeWidth={1.6}
                className="shrink-0 text-brand-accent"
              />
            </div>

            <div className="relative px-4 py-2 sm:px-5 sm:py-3">
           

              <div className="divide-y divide-[color-mix(in_srgb,var(--dnh-text-on-brand)_12%,transparent)]">
                {content.focus_areas.map((area) => {
                  const Icon = focusIcons[area.id];

                  return (
                    <div
                      key={area.id}
                      className="group relative grid min-w-0 grid-cols-[2.65rem_minmax(0,1fr)_1rem] items-center gap-3 py-4 sm:grid-cols-[3rem_minmax(0,1fr)_1.25rem] sm:gap-4 sm:py-5"
                    >
                      <span className="flex size-10 items-center justify-center border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_15%,transparent)] bg-white/[0.035] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_72%,transparent)] transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent/70 group-hover:bg-brand-accent/10 group-hover:text-brand-accent motion-reduce:transition-none sm:size-11">
                        <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                      </span>

                      <div className="min-w-0 text-start">
                        <p className="text-[15px] font-extrabold leading-[1.7] text-white sm:text-[16px]">
                          {area.label}
                        </p>
                     
                      </div>

                    
                    </div>
                  );
                })}
              </div>
            </div>

            {thesis ? (
              <div className="grid min-w-0 grid-cols-[3px_minmax(0,1fr)] border-t border-[color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)] bg-white/[0.035]">
                <span aria-hidden="true" className="bg-brand-accent" />
                <p
                  className={`min-w-0 px-4 py-4 text-start text-[14px] font-bold text-[color-mix(in_srgb,var(--dnh-text-on-brand)_92%,transparent)] sm:px-5 sm:py-5 sm:text-[15px] ${
                    isRTL ? "leading-[1.95]" : "leading-[1.7]"
                  }`}
                >
                  {thesis.text}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
