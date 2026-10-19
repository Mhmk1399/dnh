"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleDollarSign,
  Monitor,
  Newspaper,
  Radio,
  TrendingUp,
  UserRound,
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

type BoundaryId =
  | "trading-terminal"
  | "signal-panel"
  | "crypto-dashboard"
  | "deterministic-price-forecast"
  | "news-media"
  | "personal-assessment-substitute";

type BoundaryItem = {
  id: BoundaryId;
  title: string;
  description: string;
};

type BoundariesContent = {
  order: number;
  id: "what-intelligence-desk-is-not";
  type: "boundaries";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  items: BoundaryItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const boundaryIcons: Record<BoundaryId, LucideIcon> = {
  "trading-terminal": Monitor,
  "signal-panel": Radio,
  "crypto-dashboard": CircleDollarSign,
  "deterministic-price-forecast": TrendingUp,
  "news-media": Newspaper,
  "personal-assessment-substitute": UserRound,
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

function BoundaryMark({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="relative flex size-12 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary sm:size-14">
      <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-[2px] w-9 -rotate-45 bg-brand-accent sm:w-10"
      />
    </span>
  );
}

function BoundaryCell({
  item,
  isRTL,
}: {
  item: BoundaryItem;
  isRTL: boolean;
}) {
  const Icon = boundaryIcons[item.id];

  return (
    <article className="group relative min-w-0 px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8 xl:px-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-accent transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none rtl:origin-right"
      />

      <div className="flex min-w-0 items-start gap-4 sm:gap-5">
        <BoundaryMark Icon={Icon} />

        <div className="min-w-0 text-start">
          <h3
            className={`text-[1rem] font-extrabold text-ink sm:text-[1.08rem] ${
              isRTL ? "leading-[1.9]" : "leading-[1.48]"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2.5 text-[13.5px] font-medium text-ink-muted sm:text-[14.5px] ${
              isRTL ? "leading-[2]" : "leading-[1.76]"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function IntelligenceDeskBoundaries() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "what-intelligence-desk-is-not" &&
      section.type === "boundaries",
  ) as BoundariesContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];
  const firstColumn = content.items.slice(0, 3);
  const secondColumn = content.items.slice(3);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-intelligence-boundaries-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-surface-soft py-14 sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell min-w-0">
        <div className="grid min-w-0 overflow-hidden border border-line bg-page lg:grid-cols-[minmax(20rem,0.38fr)_minmax(0,0.62fr)]">
          <header className="relative flex min-w-0 flex-col justify-between overflow-hidden bg-brand-secondary p-6 text-[var(--dnh-text-on-brand)] sm:p-8 lg:p-9 xl:p-11">
            <div className="relative z-10 min-w-0 text-start">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
                />
                <p className="text-[12px] font-extrabold leading-[1.8] sm:text-[13px]">
                  {content.eyebrow}
                </p>
              </div>

              

              <h2
                id="dnh-intelligence-boundaries-heading"
                className={`mt-5 max-w-[18ch] text-pretty text-[clamp(2rem,7vw,2.75rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.35rem,5vw,3.2rem)] lg:text-[clamp(2.5rem,3.25vw,3.55rem)] ${
                  isRTL ? "leading-[1.55]" : "leading-[1.08]"
                }`}
              >
                <HighlightedHeading
                  heading={content.heading}
                  highlight={content.heading_highlight}
                />
              </h2>

              <p
                className={`mt-5 max-w-[34rem] text-[14px] font-medium opacity-76 sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.78]"
                }`}
              >
                {content.intro}
              </p>
            </div>

            <div className="relative z-10 mt-10 border-t border-white/20 pt-6 sm:mt-12 lg:mt-16">
              <div className="grid gap-2" aria-hidden="true">
                {content.items.map((item, index) => (
                  <span key={item.id} className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/20" />
                    <span
                      className={`h-[3px] bg-brand-accent ${
                        index % 3 === 0
                          ? "w-8"
                          : index % 3 === 1
                            ? "w-5"
                            : "w-3"
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-14 -bottom-14 size-44 rounded-full border border-white/10 sm:size-52"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-6 -bottom-6 size-28 rounded-full border border-white/10 sm:size-32"
            />
          </header>

          <div className="grid min-w-0 md:grid-cols-2">
            <div className="min-w-0 divide-y divide-line border-b border-line md:border-b-0 md:border-e">
              {firstColumn.map((item) => (
                <BoundaryCell key={item.id} item={item} isRTL={isRTL} />
              ))}
            </div>

            <div className="min-w-0 divide-y divide-line">
              {secondColumn.map((item) => (
                <BoundaryCell key={item.id} item={item} isRTL={isRTL} />
              ))}
            </div>
          </div>

          <div className="min-w-0 border-t border-line lg:col-span-2">
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.34fr)]">
              <div className="relative min-w-0 bg-page px-5 py-6 text-start sm:px-7 sm:py-7 lg:px-8 lg:py-8 xl:px-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
                />
                <p
                  className={`max-w-[68rem] text-[15px] font-bold text-ink sm:text-[16px] ${
                    isRTL ? "leading-[2]" : "leading-[1.78]"
                  }`}
                >
                  {content.closing}
                </p>
              </div>

              {cta ? (
                <div className="flex min-w-0 items-center border-t border-line bg-surface-soft p-4 sm:p-5 lg:border-s lg:border-t-0 lg:p-6">
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
      </div>
    </section>
  );
}
