"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Eye,
  Globe2,
  Landmark,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Waves,
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

type WatchId =
  | "economic-policy-decisions"
  | "inflation-path"
  | "currency-moves"
  | "liquidity-flow"
  | "geopolitics"
  | "asset-class-conditions"
  | "risk-signals"
  | "assumption-changing-events";

type WatchItem = {
  id: WatchId;
  text: string;
};

type WhatToWatchContent = {
  order: number;
  id: "what-to-watch";
  type: "watchlist";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  watch_items: WatchItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const watchIcons: Record<WatchId, LucideIcon> = {
  "economic-policy-decisions": Landmark,
  "inflation-path": Activity,
  "currency-moves": Banknote,
  "liquidity-flow": Waves,
  geopolitics: Globe2,
  "asset-class-conditions": Layers3,
  "risk-signals": ShieldCheck,
  "assumption-changing-events": RefreshCw,
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

function WatchItemView({
  item,
  isRTL,
}: {
  item: WatchItem;
  isRTL: boolean;
}) {
  const Icon = watchIcons[item.id];

  return (
    <div className="group relative min-w-0 py-5 sm:py-6 lg:py-7">
      <div className="flex min-w-0 items-start gap-4 sm:gap-5">
        <span className="flex size-10 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-accent motion-reduce:transition-none sm:size-11">
          <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
        </span>

        <div className="min-w-0 flex-1 text-start">
          <p
            className={`max-w-[34rem] text-[1rem] font-extrabold text-ink transition-colors duration-200 group-hover:text-brand-primary motion-reduce:transition-none sm:text-[1.08rem] lg:text-[1.12rem] ${
              isRTL ? "leading-[1.9]" : "leading-[1.45]"
            }`}
          >
            {item.text}
          </p>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-full origin-start scale-x-[0.22] bg-brand-accent transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
          />
        </div>
      </div>
    </div>
  );
}

export function IntelligenceDeskWhatToWatch() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "what-to-watch" && section.type === "watchlist",
  ) as WhatToWatchContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];
  const rows = Array.from({ length: 4 }, (_, index) => [
    content.watch_items[index * 2],
    content.watch_items[index * 2 + 1],
  ]).filter(
    (pair): pair is [WatchItem, WatchItem] => Boolean(pair[0] && pair[1]),
  );

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-what-to-watch-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-surface-soft py-14 sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.66fr)_minmax(18rem,0.34fr)] lg:items-end lg:gap-14 xl:gap-20">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
              {locale === "fa" ? (
                <bdi
                  dir="ltr"
                  className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-muted sm:text-[11px]"
                >
                  {content.english_label}
                </bdi>
              ) : null}
            </div>

            <h2
              id="dnh-what-to-watch-heading"
              className={`mt-4 max-w-[33ch] text-pretty text-[clamp(1.95rem,7vw,2.6rem)] font-black text-ink [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.25rem,4.7vw,3.2rem)] lg:max-w-[30ch] lg:text-[clamp(2.65rem,3.35vw,3.65rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.08]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s border-line ps-4 text-start sm:ps-5 lg:ps-6">
            <div className="mb-4 flex size-11 items-center justify-center border border-line bg-page text-brand-primary sm:size-12">
              <Eye aria-hidden="true" size={20} strokeWidth={1.6} />
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

        <div className="mt-10 min-w-0 border-y border-line bg-page sm:mt-12 lg:mt-14">
          <div className="flex min-w-0 items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5 lg:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="size-2 shrink-0 bg-brand-accent" aria-hidden="true" />
              <bdi
                dir="ltr"
                className="truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-muted sm:text-[11px]"
              >
                DNH / WHAT TO WATCH
              </bdi>
            </div>
            <CircleDollarSign
              aria-hidden="true"
              size={18}
              strokeWidth={1.5}
              className="shrink-0 text-brand-primary/55"
            />
          </div>

          <div className="relative min-w-0">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
            />

            <div className="divide-y divide-line">
              {rows.map(([first, second]) => (
                <div
                  key={`${first.id}-${second.id}`}
                  className="relative grid min-w-0 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] lg:items-stretch"
                >
                  <div className="min-w-0 px-4 sm:px-5 lg:pe-8 xl:pe-10">
                    <WatchItemView item={first} isRTL={isRTL} />
                  </div>

                  <div className="relative hidden lg:flex lg:items-center lg:justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line"
                    />
                    <span
                      aria-hidden="true"
                      className="relative z-10 size-3 border-2 border-page bg-brand-accent shadow-[0_0_0_1px_var(--dnh-border-line)]"
                    />
                  </div>

                  <div className="min-w-0 border-t border-line px-4 sm:px-5 lg:border-t-0 lg:ps-8 xl:ps-10">
                    <WatchItemView item={second} isRTL={isRTL} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid min-w-0 overflow-hidden border border-line bg-page lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.36fr)]">
          <div className="min-w-0 px-5 py-6 text-start sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="flex min-w-0 items-start gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center bg-brand-primary text-[var(--dnh-text-on-brand)]">
                <ShieldCheck aria-hidden="true" size={18} strokeWidth={1.6} />
              </span>
              <p
                className={`max-w-[64rem] text-[14px] font-semibold text-ink-muted sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.78]"
                }`}
              >
                {content.closing}
              </p>
            </div>
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
    </section>
  );
}
