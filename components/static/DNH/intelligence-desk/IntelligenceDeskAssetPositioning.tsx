"use client";

import {
  Banknote,
  Building2,
  CircleDollarSign,
  Coins,
  Gem,
  Landmark,
  Layers3,
  TrendingUp,
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

type AssetItem = {
  id: string;
  title: string;
  description: string;
};

type AssetPositioningContent = {
  id: "asset-positioning";
  type: "asset-positioning";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  assets: AssetItem[];
  closing: string;
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const assetIcons: Record<string, LucideIcon> = {
  gold: Gem,
  currency: Banknote,
  equities: TrendingUp,
  "real-estate": Building2,
  "fixed-income": Landmark,
  cash: CircleDollarSign,
  commodities: Coins,
  alternatives: Layers3,
};

export function IntelligenceDeskAssetPositioning() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "asset-positioning" &&
      section.type === "asset-positioning",
  ) as AssetPositioningContent | undefined;

  if (!content) return null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="asset-positioning-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell relative z-10 min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.78fr)] lg:items-stretch lg:gap-12">
          <header className="min-w-0 text-start">
            <DnhEditorialEyebrow
              eyebrow={content.eyebrow}
              englishLabel={content.english_label}
              locale={locale}
            />
            <h2
              id="asset-positioning-heading"
              className={`mt-5 max-w-[28ch] text-pretty text-[clamp(1.9rem,7vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,4.7vw,3.4rem)] ${
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

          {content.media?.src ? (
            <DnhEditorialMediaFrame
              media={content.media}
              label={content.english_label}
              sizes="(max-width: 1023px) calc(100vw - 24px), 35vw"
              className="aspect-square min-h-[360px] border-line lg:min-h-[560px] lg:aspect-auto"
            />
          ) : null}
        </div>

        <div className="mt-8 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {content.assets.map((item) => {
            const Icon = assetIcons[item.id] ?? Layers3;
            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-line bg-page p-5 transition-colors duration-200 hover:bg-surface-soft"
              >
                <span className="flex size-10 items-center justify-center bg-surface-soft text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.55} />
                </span>
                <h3
                  className={`mt-4 text-start text-[16px] font-black sm:text-[17px] ${
                    isRTL ? "leading-[1.65]" : "leading-[1.38]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-start text-[13px] text-ink-muted ${
                    isRTL ? "leading-[1.9]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <footer className="mt-7 grid min-w-0 gap-5 border border-line bg-surface-soft p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
