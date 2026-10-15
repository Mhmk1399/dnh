"use client";

import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Droplets,
  TrendingUp,
  WalletCards,
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

type EconomicPressureItem = {
  id:
    | "liquidity-flow"
    | "currency-pressure"
    | "inflation"
    | "cash-opportunity-cost"
    | "liquidity-needs";
  title: string;
  description: string;
};

type EconomicPressureContent = {
  order: number;
  id: "liquidity-currency-economic-pressure";
  type: "economic-pressure";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  items: EconomicPressureItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<EconomicPressureItem["id"], LucideIcon> = {
  "liquidity-flow": Droplets,
  "currency-pressure": Banknote,
  inflation: TrendingUp,
  "cash-opportunity-cost": CircleDollarSign,
  "liquidity-needs": WalletCards,
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

function PressureCell({
  item,
  isRTL,
}: {
  item: EconomicPressureItem;
  isRTL: boolean;
}) {
  const Icon = itemIcons[item.id];

  return (
    <article className="group relative min-w-0 px-4 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8">
      <div className="flex min-w-0 items-start gap-4 sm:gap-5">
        <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent/5 group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
          <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
        </span>

        <div className="min-w-0 flex-1 text-start">
          <h3
            className={`text-[16px] font-black text-ink sm:text-[17px] ${
              isRTL ? "leading-[1.8]" : "leading-[1.42]"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2 text-[13.5px] font-medium text-ink-muted sm:text-[14px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.72]"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 bg-brand-accent transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </article>
  );
}

export function IntelligenceDeskEconomicPressure() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "liquidity-currency-economic-pressure" &&
      section.type === "economic-pressure",
  ) as EconomicPressureContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const primaryItems = content.items.slice(0, 3);
  const decisionItems = content.items.slice(3);
  const cta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="economic-pressure-heading"
      className="relative isolate overflow-hidden border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 hidden w-[3px] bg-brand-accent xl:block"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-10 lg:grid-cols-[minmax(0,0.64fr)_minmax(18rem,0.36fr)] lg:items-end lg:gap-14 xl:gap-20">
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
              id="economic-pressure-heading"
              className={`mt-4 max-w-[30ch] text-pretty text-[clamp(1.85rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.15rem,4.5vw,3rem)] lg:max-w-[26ch] lg:text-[clamp(2.55rem,3.2vw,3.35rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.12]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s-2 border-brand-primary/20 ps-4 text-start sm:ps-5">
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
          <div className="relative min-w-0 border-y border-line bg-page">
            <div className="grid min-w-0 md:grid-cols-3 md:divide-x md:divide-line md:rtl:divide-x-reverse">
              {primaryItems.map((item) => (
                <PressureCell key={item.id} item={item} isRTL={isRTL} />
              ))}
            </div>

            <div
              aria-hidden="true"
              className="relative hidden h-14 items-center justify-center border-t border-line md:flex"
            >
              <span className="absolute inset-x-[16.66%] top-1/2 h-px -translate-y-1/2 bg-line" />
              <span className="absolute start-[16.66%] top-0 h-1/2 w-px bg-line" />
              <span className="absolute start-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-line" />
              <span className="absolute end-[16.66%] top-0 h-1/2 w-px bg-line" />
              <span className="absolute bottom-0 start-1/2 h-1/2 w-px -translate-x-1/2 bg-brand-accent" />
              <span className="relative z-10 size-3 border-2 border-brand-accent bg-page" />
            </div>

            <div className="grid min-w-0 border-t border-line md:grid-cols-2 md:divide-x md:divide-line md:rtl:divide-x-reverse">
              {decisionItems.map((item) => (
                <PressureCell key={item.id} item={item} isRTL={isRTL} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid min-w-0 gap-6 border-t border-line pt-7 sm:mt-10 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7rem] size-2 shrink-0 bg-brand-accent"
              />
              <p
                className={`max-w-[58rem] text-[14px] font-semibold text-ink-muted sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.78]"
                }`}
              >
                {content.closing}
              </p>
            </div>
          </div>

          {cta ? (
            <ActionButton
              href={cta.href}
              variant={cta.type}
              size="lg"
              icon={Arrow}
              iconPosition="end"
              contentAlignment="between"
              className="w-full sm:w-auto"
            >
              {cta.label}
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
