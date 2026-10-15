"use client";

import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Droplets,
  Gauge,
  Layers3,
  Radar,
  ThermometerSun,
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

type SnapshotIndicator = {
  id:
    | "macro-risk-level"
    | "asset-positioning"
    | "dnh-risk-temperature"
    | "liquidity-flow"
    | "weekly-bias"
    | "strategic-signal";
  title: string;
  english_label: string;
  description: string;
};

type CurrentIntelligenceSnapshotContent = {
  order: number;
  id: "current-intelligence-snapshot";
  type: "intelligence-snapshot";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  indicators: SnapshotIndicator[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const indicatorIcons: Record<SnapshotIndicator["id"], LucideIcon> = {
  "macro-risk-level": Gauge,
  "asset-positioning": Layers3,
  "dnh-risk-temperature": ThermometerSun,
  "liquidity-flow": Droplets,
  "weekly-bias": Compass,
  "strategic-signal": Radar,
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

export function CurrentIntelligenceSnapshot() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "current-intelligence-snapshot" &&
      section.type === "intelligence-snapshot",
  ) as CurrentIntelligenceSnapshotContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="current-intelligence-snapshot-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 lg:grid-cols-[minmax(0,0.63fr)_minmax(20rem,0.37fr)] lg:items-end lg:gap-12 lg:pb-10 xl:gap-16">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
         
            </div>

            <h2
              id="current-intelligence-snapshot-heading"
              className={`mt-4 max-w-[28ch] text-pretty text-[clamp(1.85rem,7vw,2.35rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.2rem,4.5vw,3rem)] lg:max-w-[24ch] lg:text-[clamp(2.6rem,3.35vw,3.45rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.12]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div
            className={`min-w-0 border-s-2 border-brand-accent ps-4 text-start text-[14px] font-medium text-ink-muted sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.78]"
            }`}
          >
            <p>{content.intro}</p>
          </div>
        </header>

        <div className="mt-8 overflow-hidden border border-line bg-page sm:mt-10 lg:mt-12">
          <div className="flex min-w-0 items-center justify-between gap-4 border-b border-line bg-brand-primary px-4 py-3.5 text-white sm:px-6 sm:py-4">
            <div className="min-w-0 text-start">
              <bdi
                dir="ltr"
                className="block truncate text-[11px] font-bold uppercase tracking-[0.075em] text-white/65 sm:text-[12px]"
              >
                {content.english_label}
              </bdi>
            </div>
            <span className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white/55 sm:text-[11px]">
              <span
                aria-hidden="true"
                className="size-1.5 bg-brand-accent shadow-[0_0_0_4px_rgba(252,133,2,0.12)]"
              />
              <span aria-hidden="true">DNH</span>
            </span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {content.indicators.map((indicator) => {
              const Icon = indicatorIcons[indicator.id];

              return (
                <article
                  key={indicator.id}
                  className="group relative min-w-0 bg-page px-4 py-5 transition-colors duration-200 hover:bg-surface-soft motion-reduce:transition-none sm:px-6 sm:py-6 lg:min-h-[15.5rem] lg:px-7 lg:py-7"
                >
                  <div className="flex min-w-0 items-start justify-between gap-5">
                    <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent/70 group-hover:bg-brand-accent/10 group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-2 h-px min-w-8 flex-1 bg-line"
                    />

                    <span
                      aria-hidden="true"
                      className="mt-[0.4rem] size-2 shrink-0 border border-brand-accent bg-page transition-transform duration-200 group-hover:scale-125 motion-reduce:transition-none"
                    />
                  </div>

                  <div className="mt-5 min-w-0 text-start sm:mt-6">
                    <h3
                      className={`text-[17px] font-black text-ink sm:text-[18px] ${
                        isRTL ? "leading-[1.75]" : "leading-[1.35]"
                      }`}
                    >
                      {indicator.title}
                    </h3>

                    {locale === "fa" ? (
                      <bdi
                        dir="ltr"
                        className="mt-1 block w-fit max-w-full text-[10px] font-bold uppercase tracking-[0.055em] text-brand-primary/70 sm:text-[11px]"
                      >
                        {indicator.english_label}
                      </bdi>
                    ) : null}

                    <p
                      className={`mt-3 text-[13.5px] font-medium text-ink-muted sm:text-[14px] ${
                        isRTL ? "leading-[1.95]" : "leading-[1.72]"
                      }`}
                    >
                      {indicator.description}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-0 h-[2px] overflow-hidden bg-transparent sm:inset-x-6 lg:inset-x-7"
                  >
                    <span className="block h-full w-10 bg-brand-accent transition-[width] duration-200 group-hover:w-20 motion-reduce:transition-none" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid min-w-0 gap-5 border-s-2 border-brand-accent bg-page px-4 py-5 sm:mt-8 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-7">
          <p
            className={`min-w-0 max-w-[78ch] text-start text-[14px] font-semibold text-ink sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.72]"
            }`}
          >
            {content.closing}
          </p>

          {content.ctas[0] ? (
            <ActionButton
              href={content.ctas[0].href}
              variant={content.ctas[0].type}
              size="lg"
              icon={Arrow}
              iconPosition="end"
              dir={direction}
              className="min-h-12 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto"
            >
              {content.ctas[0].label}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
