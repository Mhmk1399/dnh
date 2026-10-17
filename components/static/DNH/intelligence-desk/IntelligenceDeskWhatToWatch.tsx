"use client";

import {
  Activity,
  Banknote,
  Globe2,
  Landmark,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  DnhEditorialActions,
  DnhEditorialEyebrow,
  DnhEditorialMediaFrame,
  DnhHighlightedHeading,
  type DnhEditorialCta,
  type DnhEditorialMedia,
} from "@/components/static/DNH/DnhEditorialPrimitives";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";

type WatchItem = {
  id: string;
  text: string;
};

type WhatToWatchContent = {
  id: "what-to-watch";
  type: "watchlist";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  watch_items: WatchItem[];
  closing: string;
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const watchIcons: Record<string, LucideIcon> = {
  "economic-policy-decisions": Landmark,
  "inflation-path": Activity,
  "currency-moves": Banknote,
  "liquidity-flow": Waves,
  geopolitics: Globe2,
  "asset-class-conditions": Layers3,
  "risk-signals": ShieldCheck,
  "assumption-changing-events": RefreshCw,
};

export function IntelligenceDeskWhatToWatch() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "what-to-watch" && section.type === "watchlist",
  ) as WhatToWatchContent | undefined;

  if (!content) return null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-what-to-watch-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell relative z-10 min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.22fr)_minmax(360px,0.78fr)] lg:items-stretch lg:gap-12">
          <div className="min-w-0">
            <header className="text-start">
              <DnhEditorialEyebrow
                eyebrow={content.eyebrow}
                englishLabel={content.english_label}
                locale={locale}
              />
              <h2
                id="dnh-what-to-watch-heading"
                className={`mt-5 max-w-[29ch] text-pretty text-[clamp(1.9rem,7vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,4.7vw,3.4rem)] ${
                  isRTL ? "leading-[1.52]" : "leading-[1.1]"
                }`}
              >
                <DnhHighlightedHeading
                  heading={content.heading}
                  highlight={content.heading_highlight}
                />
              </h2>
              <p
                className={`mt-6 max-w-[72ch] border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:ps-5 sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.72]"
                }`}
              >
                {content.intro}
              </p>
            </header>

            <div className="mt-7 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2">
              {content.watch_items.map((item) => {
                const Icon = watchIcons[item.id] ?? RefreshCw;
                return (
                  <article
                    key={item.id}
                    className="group min-w-0 border-b border-e border-line p-5 transition-colors duration-200 hover:bg-surface-soft"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center bg-surface-soft text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                        <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                      </span>
                      <p
                        className={`min-w-0 pt-1 text-start text-[15px] font-black sm:text-[16px] ${
                          isRTL ? "leading-[1.8]" : "leading-[1.45]"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {content.media?.src ? (
            <DnhEditorialMediaFrame
              media={content.media}
              label={content.english_label}
              sizes="(max-width: 1023px) calc(100vw - 24px), 35vw"
              className="aspect-[4/5] min-h-[430px] border-line lg:min-h-[680px] lg:aspect-auto"
            />
          ) : null}
        </div>

        <footer className="mt-7 grid min-w-0 gap-5 border-t border-line pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p
            className={`border-s-2 border-brand-accent ps-4 text-start text-[14px] font-semibold text-ink-muted sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {content.closing}
          </p>
          <DnhEditorialActions
            ctas={content.ctas}
            direction={direction}
          />
        </footer>
      </div>
    </section>
  );
}
