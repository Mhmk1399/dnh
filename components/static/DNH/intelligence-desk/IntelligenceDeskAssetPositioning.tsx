"use client";

import {
  ArrowLeft,
  ArrowRight,
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
import { ActionButton } from "@/components/ui/ActionButton";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type AssetId =
  | "gold"
  | "currency"
  | "equities"
  | "real-estate"
  | "fixed-income"
  | "cash"
  | "commodities"
  | "alternatives";

type AssetItem = {
  id: AssetId;
  title: string;
  description: string;
};

type AssetPositioningContent = {
  order: number;
  id: "asset-positioning";
  type: "asset-positioning";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  assets: AssetItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const assetIcons: Record<AssetId, LucideIcon> = {
  gold: Gem,
  currency: Banknote,
  equities: TrendingUp,
  "real-estate": Building2,
  "fixed-income": Landmark,
  cash: CircleDollarSign,
  commodities: Coins,
  alternatives: Layers3,
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

function AssetEntry({
  item,
  isRTL,
  side,
}: {
  item: AssetItem;
  isRTL: boolean;
  side: "start" | "end";
}) {
  const Icon = assetIcons[item.id];

  return (
    <article
      className={`group relative min-w-0 border-line py-6 sm:py-7 lg:py-8 ${
        side === "start" ? "lg:pe-12 xl:pe-16" : "lg:ps-12 xl:ps-16"
      }`}
    >
      <div
        className={`flex min-w-0 items-start gap-4 ${
          side === "end" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent/5 group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
          <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
        </span>

        <div
          className={`min-w-0 flex-1 ${
            side === "end" ? "lg:text-end" : "text-start"
          }`}
        >
          <h3
            className={`text-[16px] font-black text-ink sm:text-[17px] lg:text-[18px] ${
              isRTL ? "leading-[1.8]" : "leading-[1.38]"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2 max-w-[36rem] text-[13.5px] font-medium text-ink-muted sm:text-[14px] ${
              side === "end" ? "lg:ms-auto" : ""
            } ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
          >
            {item.description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-px w-12 -translate-y-1/2 bg-line transition-colors duration-200 group-hover:bg-brand-accent motion-reduce:transition-none lg:block xl:w-16 ${
          side === "start" ? "end-0" : "start-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden size-2 -translate-y-1/2 border border-brand-primary bg-page transition-[border-color,background-color] duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent motion-reduce:transition-none lg:block ${
          side === "start" ? "end-[-4px]" : "start-[-4px]"
        }`}
      />
    </article>
  );
}

export function IntelligenceDeskAssetPositioning() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "asset-positioning" &&
      section.type === "asset-positioning",
  ) as AssetPositioningContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];
  const leftAssets = content.assets.filter((_, index) => index % 2 === 0);
  const rightAssets = content.assets.filter((_, index) => index % 2 === 1);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="asset-positioning-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(18rem,0.34fr)] lg:items-end lg:gap-14 xl:gap-20">
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
              id="asset-positioning-heading"
              className={`mt-4 max-w-[31ch] text-pretty text-[clamp(1.9rem,7vw,2.5rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.2rem,4.6vw,3.1rem)] lg:max-w-[27ch] lg:text-[clamp(2.6rem,3.25vw,3.5rem)] ${
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
            <p
              className={`text-[14px] font-medium text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="relative mt-9 min-w-0 sm:mt-10 lg:mt-12">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
          />

          <div
            aria-hidden="true"
            className="absolute start-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 bg-page px-3 lg:block"
          >
            <span className="flex size-12 items-center justify-center border border-brand-primary bg-page text-brand-primary">
              <Layers3 size={20} strokeWidth={1.6} />
            </span>
          </div>

          <div className="grid min-w-0 gap-x-0 lg:grid-cols-2">
            <div className="min-w-0 divide-y divide-line lg:pe-0">
              {leftAssets.map((item) => (
                <AssetEntry
                  key={item.id}
                  item={item}
                  isRTL={isRTL}
                  side="start"
                />
              ))}
            </div>

            <div className="min-w-0 divide-y divide-line border-t border-line lg:border-t-0 lg:ps-0">
              {rightAssets.map((item) => (
                <AssetEntry
                  key={item.id}
                  item={item}
                  isRTL={isRTL}
                  side="end"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 min-w-0 border-y border-line bg-surface-soft px-4 py-5 sm:px-6 sm:py-6 lg:mt-10 lg:px-8">
            <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
              <div className="min-w-0 text-start">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7rem] size-2 shrink-0 bg-brand-accent"
                  />
                  <p
                    className={`max-w-[62rem] text-[14px] font-semibold text-ink-muted sm:text-[15px] ${
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
        </div>
      </div>
    </section>
  );
}
