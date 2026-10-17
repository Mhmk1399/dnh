"use client";

import {
  Droplets,
  Landmark,
  Layers3,
  ShieldCheck,
  SlidersHorizontal,
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

type HeroFocusArea = {
  id: "risk" | "liquidity" | "economy" | "assets" | "decision";
  label: string;
  english_label: string;
};

type IntelligenceDeskHeroContent = {
  id: "dnh-intelligence-desk-hero";
  type: "hero";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  paragraphs: Array<{ id: string; text: string }>;
  focus_areas: HeroFocusArea[];
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const focusIcons: Record<HeroFocusArea["id"], LucideIcon> = {
  risk: ShieldCheck,
  liquidity: Droplets,
  economy: Landmark,
  assets: Layers3,
  decision: SlidersHorizontal,
};

export function IntelligenceDeskHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "dnh-intelligence-desk-hero" &&
      section.type === "hero",
  ) as IntelligenceDeskHeroContent | undefined;

  if (!content) return null;

  const thesis = content.paragraphs.find(
    (paragraph) => paragraph.id === "interpretation-thesis",
  );
  const prose = content.paragraphs.filter(
    (paragraph) => paragraph.id !== "interpretation-thesis",
  );

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-intelligence-desk-hero-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      <div className="dnh-site-shell relative z-10 grid min-h-svh min-w-0 gap-8 pb-12 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(9.5rem+env(safe-area-inset-top))] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:gap-12 lg:pb-20 lg:pt-[calc(9rem+env(safe-area-inset-top))]">
        <div className="contents lg:block lg:col-start-1 lg:row-start-1">
          <div className="order-1 min-w-0 text-start">
            <DnhEditorialEyebrow
              eyebrow={content.eyebrow}
              englishLabel={content.english_label}
              locale={locale}
              dark
            />
            <h1
              id="dnh-intelligence-desk-hero-heading"
              className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,8.2vw,2.6rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.65rem,5.7vw,3.75rem)] lg:text-[clamp(3.05rem,4vw,4.25rem)] ${
                isRTL ? "leading-[1.52]" : "leading-[1.1]"
              }`}
            >
              <DnhHighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h1>

            <div
              className={`mt-6 max-w-[74ch] space-y-4 border-s-2 border-brand-accent ps-4 text-[14px] text-white/[0.78] sm:mt-7 sm:ps-5 sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.74]"
              }`}
            >
              {prose.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>
          </div>

          <DnhEditorialActions
            ctas={content.ctas}
            direction={direction}
            dark
            className="order-3 mt-0 lg:mt-8"
          />
        </div>

        {content.media?.src ? (
          <div className="order-2 lg:col-start-2 lg:row-start-1">
            <DnhEditorialMediaFrame
              media={content.media}
              label={content.english_label}
              priority
              sizes="(max-width: 1023px) calc(100vw - 24px), 46vw"
              className="aspect-[4/5] min-h-[430px] lg:h-[min(760px,76svh)] lg:aspect-auto"
            />
          </div>
        ) : null}

        <div className="order-4 grid min-w-0 grid-cols-1 border-s border-t border-white/15 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
          {content.focus_areas.map((area) => {
            const Icon = focusIcons[area.id];
            return (
              <article
                key={area.id}
                className="group min-w-0 border-b border-e border-white/15 bg-white/[0.035] p-5 transition-colors duration-200 hover:bg-white/[0.07]"
              >
                <span className="flex size-10 items-center justify-center border border-white/18 text-brand-accent">
                  <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                </span>
                <h2 className="mt-4 text-start text-[15px] font-black leading-[1.7] text-white sm:text-[16px]">
                  {area.label}
                </h2>
                {locale === "fa" ? (
                  <bdi
                    dir="ltr"
                    className="mt-1 block text-start text-[10px] font-bold uppercase tracking-[0.08em] text-white/42"
                  >
                    {area.english_label}
                  </bdi>
                ) : null}
              </article>
            );
          })}
        </div>

        {thesis ? (
          <p
            className={`order-5 border-s-2 border-brand-accent ps-4 text-start text-[14px] font-bold text-white/82 sm:ps-5 sm:text-[15px] lg:col-span-2 ${
              isRTL ? "leading-[1.95]" : "leading-[1.7]"
            }`}
          >
            {thesis.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
