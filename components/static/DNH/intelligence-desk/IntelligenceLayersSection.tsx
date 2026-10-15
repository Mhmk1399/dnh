"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Droplets,
  Globe2,
  Landmark,
  Radar,
  TrendingUp,
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

type MonitoringItem = {
  id:
    | "inflation-purchasing-power"
    | "currency"
    | "liquidity"
    | "economic-policy"
    | "macro-geopolitical-risk"
    | "market-conditions"
    | "capital-behaviour";
  title: string;
  description: string;
};

type WhatWeMonitorContent = {
  order: number;
  id: "what-we-monitor";
  type: "monitoring-areas";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  items: MonitoringItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<MonitoringItem["id"], LucideIcon> = {
  "inflation-purchasing-power": TrendingUp,
  currency: Banknote,
  liquidity: Droplets,
  "economic-policy": Landmark,
  "macro-geopolitical-risk": Globe2,
  "market-conditions": BarChart3,
  "capital-behaviour": Activity,
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

function MonitoringRow({
  item,
  isRTL,
  connectorSide,
}: {
  key?: string;
  item: MonitoringItem;
  isRTL: boolean;
  connectorSide?: "start" | "end";
}) {
  const Icon = itemIcons[item.id];

  return (
    <article className="group relative min-w-0 border-b border-line px-4 py-5 last:border-b-0 sm:px-6 sm:py-6 lg:min-h-[10.25rem] lg:px-7 lg:py-7">
      <div className="flex min-w-0 items-start gap-4 sm:gap-5">
        <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent/70 group-hover:bg-brand-accent/10 group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
          <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
        </span>

        <div className="min-w-0 flex-1 text-start">
          <h3
            className={`text-[16px] font-black text-ink sm:text-[17px] ${
              isRTL ? "leading-[1.8]" : "leading-[1.38]"
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

      {connectorSide ? (
        <div
          aria-hidden="true"
          className={`absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex ${
            connectorSide === "end" ? "end-0" : "start-0"
          }`}
        >
          <span className="h-px w-7 bg-brand-accent/60" />
          <span className="size-2 border border-brand-accent bg-surface-soft transition-transform duration-200 group-hover:scale-125 motion-reduce:transition-none" />
        </div>
      ) : null}
    </article>
  );
}

export function IntelligenceDeskWhatWeMonitor() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "what-we-monitor" && section.type === "monitoring-areas",
  ) as WhatWeMonitorContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const leftItems = content.items.filter((_, index) => index % 2 === 0);
  const rightItems = content.items.filter((_, index) => index % 2 === 1);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="what-we-monitor-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-page py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 hidden w-px bg-line xl:block"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.66fr)_minmax(19rem,0.34fr)] lg:items-end lg:gap-12 xl:gap-16">
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
              id="what-we-monitor-heading"
              className={`mt-4 max-w-[29ch] text-pretty text-[clamp(1.85rem,7vw,2.35rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.15rem,4.4vw,3rem)] lg:max-w-[25ch] lg:text-[clamp(2.55rem,3.25vw,3.4rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.12]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s-2 border-brand-accent ps-4 text-start sm:ps-5">
            <p
              className={`text-[14px] font-medium text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="mt-9 border-y border-line bg-surface-soft sm:mt-10 lg:mt-12">
          <div className="lg:hidden">
            <div className="flex min-w-0 items-center gap-4 border-b border-line bg-brand-primary px-4 py-5 text-white sm:px-6">
              <span className="flex size-11 shrink-0 items-center justify-center border border-white/25 bg-white/5 text-brand-accent">
                <Radar aria-hidden="true" size={20} strokeWidth={1.6} />
              </span>
              <div className="min-w-0 text-start">
                <bdi
                  dir="ltr"
                  className="block text-[10px] font-bold uppercase tracking-[0.075em] text-white/60"
                >
                  {intelligence.brand}
                </bdi>
              </div>
            </div>

            <div className="min-w-0">
              {content.items.map((item) => (
                <MonitoringRow key={item.id} item={item} isRTL={isRTL} />
              ))}
            </div>
          </div>

          <div className="hidden min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_16rem_minmax(0,1fr)]">
            <div className="min-w-0 border-e border-line">
              {leftItems.map((item) => (
                <MonitoringRow
                  key={item.id}
                  item={item}
                  isRTL={isRTL}
                  connectorSide="end"
                />
              ))}
            </div>

            <div className="relative isolate flex min-h-full items-center justify-center overflow-hidden bg-brand-primary px-6 py-10 text-white xl:px-8">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 start-1/2 w-px -translate-x-1/2 bg-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10"
              />

              <div className="relative z-10 w-full text-center">
                <span className="mx-auto flex size-14 items-center justify-center border border-white/25 bg-white/5 text-brand-accent xl:size-16">
                  <Radar aria-hidden="true" size={25} strokeWidth={1.5} />
                </span>

                <bdi
                  dir="ltr"
                  className="mt-5 block text-[10px] font-bold uppercase tracking-[0.1em] text-white/55 xl:text-[11px]"
                >
                  {intelligence.brand}
                </bdi>

                <span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-[2px] w-12 bg-brand-accent"
                />

                <p
                  className={`mt-5 text-[12.5px] font-semibold text-white/68 ${
                    isRTL ? "leading-[1.9]" : "leading-[1.65]"
                  }`}
                >
                  {content.closing}
                </p>
              </div>
            </div>

            <div className="min-w-0 border-s border-line">
              {rightItems.map((item) => (
                <MonitoringRow
                  key={item.id}
                  item={item}
                  isRTL={isRTL}
                  connectorSide="start"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid min-w-0 gap-5 border-s-2 border-brand-accent bg-surface-soft px-4 py-5 sm:mt-8 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-7">
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
