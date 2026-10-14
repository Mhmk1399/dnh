"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Coins,
  Droplets,
  Gem,
  Landmark,
  TrendingUp,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type WholeWealthContent = {
  id: "whole-wealth-view";
  type: "asset_roles";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  assets: Array<{ id: string; title: string; description: string }>;
  closing: string;
  ctas: Array<{ id: string; label: string; type: "primary" | "secondary"; href: string }>;
};

const assetIcons = {
  gold: Gem,
  currency: Coins,
  equities: TrendingUp,
  "real-estate": Building2,
  "fixed-income": Banknote,
  liquidity: Droplets,
  alternatives: Landmark,
} as const;
const assetImages = [
  "/assets/images/private-wealth-strategy.webp",
  "/assets/images/macro-market-advisory.webp",
  "/assets/images/portfolio-intelligence.webp",
  "/assets/images/complex-financial-structure.png",
  "/assets/images/strategic-financial-advisory.webp",
  "/assets/images/risk-management-wealth-protection.webp",
  "/assets/images/executive-briefings.webp",
];

export function HomeWholeWealthView() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "whole-wealth-view" && section.type === "asset_roles",
  ) as WholeWealthContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id={content.id} dir={direction} lang={languageTag} aria-labelledby="home-whole-wealth-heading" className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24">
      <div className="dnh-site-shell grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.82fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-10 xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-1 lg:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
            {content.english_label && content.english_label !== content.eyebrow ? <bdi dir="ltr" className="w-full text-[11px] font-medium text-ink-muted">{content.english_label}</bdi> : null}
          </div>
          <h2 id="home-whole-wealth-heading" className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,7.7vw,3rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.65rem,4.7vw,3.8rem)] lg:max-w-none ${isRTL ? "leading-[1.45]" : "leading-[1.13]"}`}>
            {highlightIndex < 0 ? content.heading : (
              <>
                {content.heading.slice(0, highlightIndex)}
                <span className="text-brand-accent">{content.heading.slice(highlightIndex, highlightIndex + highlight.length)}</span>
                {content.heading.slice(highlightIndex + highlight.length)}
              </>
            )}
          </h2>
          <p className={`mt-4 max-w-[80ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}>{content.intro}</p>
        </header>

        <div className="relative aspect-[4/5] min-h-[480px] overflow-hidden border border-line bg-surface-soft lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-full lg:min-h-[820px] lg:aspect-auto">
          <Image src="/assets/images/Translucent Data City in Perspective.png" alt="" fill sizes="(max-width: 1023px) calc(100vw - 24px), 38vw" className="object-cover object-center" />
          <span aria-hidden="true" className="absolute end-6 top-6 size-6 bg-brand-accent" />
          <div aria-hidden="true" className="absolute bottom-8 end-8 start-8 border border-line bg-page/90 p-5 text-brand-primary backdrop-blur-sm">
            <TrendingUp size={36} strokeWidth={1.55} />
            <span className="mt-5 block h-px w-12 bg-brand-accent" />
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:col-start-1 lg:row-start-2 lg:mt-7">
          {content.assets.map((asset, index) => {
            const Icon = assetIcons[asset.id as keyof typeof assetIcons] ?? Landmark;
            return (
              <article key={asset.id} className="group min-w-0 border border-line bg-page transition-colors duration-300 hover:border-brand-primary motion-reduce:transition-none">
                <div className="relative aspect-[16/8] overflow-hidden bg-surface-soft">
                  <Image src={assetImages[index] ?? assetImages[0]} alt="" fill sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 1279px) 48vw, 18vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
                  <span aria-hidden="true" className="absolute end-3 top-3 size-4 bg-brand-accent" />
                </div>
                <div className="relative p-4 pt-7 sm:p-5 sm:pt-8">
                  <span aria-hidden="true" className="absolute start-4 top-0 flex size-10 -translate-y-1/2 items-center justify-center bg-surface-soft text-brand-primary sm:start-5"><Icon size={20} strokeWidth={1.6} /></span>
                  <h3 className={`text-start text-[17px] font-black sm:text-[18px] ${isRTL ? "leading-[1.65]" : "leading-[1.35]"}`}>{asset.title}</h3>
                  <p className={`mt-2 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.85]" : "leading-[1.65]"}`}>{asset.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="grid min-w-0 gap-4 border border-line bg-surface-soft p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:col-start-1 lg:row-start-3 lg:mt-5">
          <p className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}>{content.closing}</p>
          {content.ctas.map((cta) => (
            <ActionButton key={cta.id} href={cta.href} variant={cta.type} shape="square" size="md" icon={Arrow} iconPosition="end" dir={direction} className="w-full bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none sm:w-auto">
              {cta.label}
            </ActionButton>
          ))}
        </footer>
      </div>
    </section>
  );
}
