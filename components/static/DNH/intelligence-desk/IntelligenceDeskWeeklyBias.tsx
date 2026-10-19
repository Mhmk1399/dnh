"use client";

import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Eye,
  FileText,
  Scale,
  ShieldCheck,
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

type BiasId =
  | "defensive"
  | "cautious"
  | "balanced"
  | "selective-opportunity";

type BiasType = {
  id: BiasId;
  title: string;
  description: string;
};

type WeeklyBiasContent = {
  order: number;
  id: "weekly-bias";
  type: "weekly-bias";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  bias_types: BiasType[];
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

const biasIcons: Record<BiasId, LucideIcon> = {
  defensive: ShieldCheck,
  cautious: Eye,
  balanced: Scale,
  "selective-opportunity": Crosshair,
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

function BiasFold({
  item,
  isRTL,
}: {
  item: BiasType;
  isRTL: boolean;
}) {
  const Icon = biasIcons[item.id];

  return (
    <article className="group relative min-w-0 overflow-hidden bg-page px-5 py-6 text-ink transition-colors duration-200 motion-reduce:transition-none sm:px-6 sm:py-7 lg:px-7 lg:py-8">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-start scale-x-0 bg-brand-accent transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
      />

      <div className="flex min-w-0 items-start justify-between gap-5">
        <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary sm:size-12">
          <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
        </span>

        <span
          aria-hidden="true"
          className="mt-1 h-px min-w-8 flex-1 bg-line transition-colors duration-200 group-hover:bg-brand-accent/55 motion-reduce:transition-none"
        />
      </div>

      <div className="mt-8 min-w-0 text-start sm:mt-9">
        <h3
          className={`text-[1.35rem] font-black text-ink sm:text-[1.55rem] ${
            isRTL ? "leading-[1.6]" : "leading-[1.15]"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-3.5 max-w-[34rem] text-[13.5px] font-medium text-ink-muted sm:text-[14px] ${
            isRTL ? "leading-[1.95]" : "leading-[1.72]"
          }`}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function IntelligenceDeskWeeklyBias() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "weekly-bias" && section.type === "weekly-bias",
  ) as WeeklyBiasContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-weekly-bias-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-line bg-brand-secondary py-14 text-[var(--dnh-text-on-brand)] sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-[8%] hidden w-px bg-white/8 xl:block"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.67fr)_minmax(18rem,0.33fr)] lg:items-end lg:gap-14 xl:gap-20">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-white/88 sm:text-[13px]">
                {content.eyebrow}
              </p>
             
            </div>

            <h2
              id="dnh-weekly-bias-heading"
              className={`mt-4 max-w-[31ch] text-pretty text-[clamp(1.95rem,7vw,2.6rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.25rem,4.7vw,3.2rem)] lg:max-w-[28ch] lg:text-[clamp(2.65rem,3.35vw,3.65rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.08]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s border-white/20 ps-4 text-start sm:ps-5 lg:ps-6">
            <div className="mb-4 flex size-11 items-center justify-center border border-white/20 bg-white/5 text-brand-accent sm:size-12">
              <FileText aria-hidden="true" size={20} strokeWidth={1.6} />
            </div>
            <p
              className={`text-[14px] font-medium text-white/72 sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="mt-10 min-w-0 sm:mt-12 lg:mt-14">
          <div className="relative min-w-0 border border-white/18 bg-white/[0.035] p-2 sm:p-3">
             

            <div className="relative min-w-0 overflow-hidden border-x border-b border-white/10 bg-page">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-1/2 z-10 hidden w-px bg-line lg:block"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden h-px bg-line lg:block"
              />

              <div className="grid min-w-0 gap-px bg-line lg:grid-cols-2">
                {content.bias_types.map((item) => (
                  <BiasFold key={item.id} item={item} isRTL={isRTL} />
                ))}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute start-1/2 top-1/2 z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 bg-brand-accent lg:block"
              />
            </div>
          </div>

          <div className="mt-7 grid min-w-0 overflow-hidden border border-white/18 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)]">
            <div className="min-w-0 divide-y divide-white/12 bg-white/[0.035]">
              {content.closing_paragraphs.map((paragraph, index) => (
                <div
                  key={paragraph.id}
                  className="flex min-w-0 items-start gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-7"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[0.68rem] shrink-0 ${
                      index === 0
                        ? "h-[2px] w-8 bg-brand-accent"
                        : "size-2 bg-white/45"
                    }`}
                  />
                  <p
                    className={`max-w-[60rem] text-[14px] font-semibold text-white/74 sm:text-[15px] ${
                      isRTL ? "leading-[2]" : "leading-[1.78]"
                    }`}
                  >
                    {paragraph.text}
                  </p>
                </div>
              ))}
            </div>

            {cta ? (
              <div className="flex min-w-0 items-center border-t border-white/15 bg-page p-4 text-ink sm:p-6 lg:border-s lg:border-t-0 lg:border-line lg:p-7">
                <ActionButton
                  href={cta.href}
                  variant="primary"
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
