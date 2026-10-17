"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Gauge,
  ShieldAlert,
  Waves,
  Wind,
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

type RiskLevelId = "low" | "moderate" | "elevated" | "high";

type RiskLevel = {
  id: RiskLevelId;
  title: string;
  english_label: string;
  description: string;
};

type RiskTemperatureContent = {
  order: number;
  id: "dnh-risk-temperature";
  type: "risk-temperature";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  levels: RiskLevel[];
  closing_paragraphs: Array<{
    id: string;
    text: string;
  }>;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const levelIcons: Record<RiskLevelId, LucideIcon> = {
  low: Wind,
  moderate: Waves,
  elevated: Activity,
  high: ShieldAlert,
};

const levelTone: Record<RiskLevelId, string> = {
  low: "bg-page text-ink",
  moderate: "bg-brand-primary/[0.035] text-ink",
  elevated: "bg-brand-primary/[0.075] text-ink",
  high: "bg-brand-primary text-[var(--dnh-text-on-brand)]",
};

const levelAccent: Record<RiskLevelId, string> = {
  low: "h-1 bg-brand-primary/30",
  moderate: "h-1.5 bg-brand-primary/50",
  elevated: "h-2 bg-brand-primary/75",
  high: "h-2.5 bg-brand-accent",
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

function RiskBand({
  level,
  locale,
  isRTL,
}: {
  level: RiskLevel;
  locale: string;
  isRTL: boolean;
}) {
  const Icon = levelIcons[level.id];
  const isHigh = level.id === "high";

  return (
    <article
      className={`group relative flex min-h-[15rem] min-w-0 flex-col border-line p-5 transition-[background-color,color] duration-200 motion-reduce:transition-none sm:p-6 lg:min-h-[18rem] lg:p-7 ${levelTone[level.id]}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 transition-[height] duration-200 motion-reduce:transition-none ${levelAccent[level.id]}`}
      />

      <div className="flex min-w-0 items-start justify-between gap-4">
        <span
          className={`flex size-11 shrink-0 items-center justify-center border sm:size-12 ${
            isHigh
              ? "border-white/25 bg-white/5 text-brand-accent"
              : "border-line bg-page text-brand-primary"
          }`}
        >
          <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
        </span>

      
      </div>

      <div className="mt-auto min-w-0 pt-8 text-start">
        <h3
          className={`text-[1.45rem] font-black sm:text-[1.65rem] lg:text-[1.8rem] ${
            isRTL ? "leading-[1.55]" : "leading-[1.1]"
          }`}
        >
          {level.title}
        </h3>

        <p
          className={`mt-4 text-[13.5px] font-medium sm:text-[14px] ${
            isHigh ? "text-white/78" : "text-ink-muted"
          } ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
        >
          {level.description}
        </p>
      </div>
    </article>
  );
}

export function IntelligenceDeskRiskTemperature() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "dnh-risk-temperature" &&
      section.type === "risk-temperature",
  ) as RiskTemperatureContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-risk-temperature-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:items-end lg:gap-14 xl:gap-20">
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
              id="dnh-risk-temperature-heading"
              className={`mt-4 max-w-[30ch] text-pretty text-[clamp(1.9rem,7vw,2.5rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.2rem,4.6vw,3.1rem)] lg:max-w-[27ch] lg:text-[clamp(2.6rem,3.25vw,3.5rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.1]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s-2 border-brand-primary/20 ps-4 text-start sm:ps-5">
            <div className="mb-4 flex size-11 items-center justify-center border border-line bg-page text-brand-primary sm:size-12">
              <Gauge aria-hidden="true" size={20} strokeWidth={1.6} />
            </div>
            <p
              className={`text-[14px] font-medium text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="mt-9 min-w-0 sm:mt-10 lg:mt-12">
          <div className="min-w-0 overflow-hidden border border-line bg-page">
            <div className="grid min-w-0 divide-y divide-line lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {content.levels.map((level) => (
                <RiskBand
                  key={level.id}
                  level={level}
                  locale={locale}
                  isRTL={isRTL}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 grid min-w-0 overflow-hidden border border-line bg-page lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:divide-x lg:divide-line">
            <div className="min-w-0 divide-y divide-line">
              {content.closing_paragraphs.map((paragraph, index) => (
                <div
                  key={paragraph.id}
                  className="flex min-w-0 items-start gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[0.62rem] shrink-0 ${
                      index === 0
                        ? "h-[2px] w-8 bg-brand-accent"
                        : "size-2 bg-brand-primary"
                    }`}
                  />
                  <p
                    className={`max-w-[58rem] text-[14px] font-semibold text-ink-muted sm:text-[15px] ${
                      isRTL ? "leading-[2]" : "leading-[1.78]"
                    }`}
                  >
                    {paragraph.text}
                  </p>
                </div>
              ))}
            </div>

            {cta ? (
              <div className="flex min-w-0 items-center border-t border-line bg-brand-primary p-4 sm:p-6 lg:border-t-0 lg:p-7">
                <ActionButton
                  href={cta.href}
                  variant="secondary"
                  size="lg"
                  icon={Arrow}
                  iconPosition="end"
                  contentAlignment="between"
                  className="w-full"
                >
                  {cta.label}
                </ActionButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
