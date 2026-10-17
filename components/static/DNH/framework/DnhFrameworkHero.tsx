"use client";

import { Database, Route, Telescope, type LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  DnhEditorialActions,
  DnhEditorialEyebrow,
  DnhEditorialMediaFrame,
  type DnhEditorialCta,
  type DnhEditorialMedia,
} from "@/components/static/DNH/DnhEditorialPrimitives";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";

type FrameworkHeroContent = {
  id: "dnh-framework-hero";
  type: "hero";
  eyebrow: string;
  english_label: string;
  heading: string;
  paragraphs: Array<{ id: string; text: string }>;
  pillars: Array<{
    id: "data" | "navigation" | "horizon";
    code: "D" | "N" | "H";
    title: string;
    english_label: string;
  }>;
  closing: string;
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const pillarIcons: Record<
  FrameworkHeroContent["pillars"][number]["id"],
  LucideIcon
> = {
  data: Database,
  navigation: Route,
  horizon: Telescope,
};

export function FrameworkHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? frameworkEn : frameworkFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "dnh-framework-hero" && section.type === "hero",
  ) as FrameworkHeroContent | undefined;

  if (!content) return null;

  const prose = content.paragraphs.slice(0, -1);
  const pillarsIntro = content.paragraphs.at(-1);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-framework-hero-heading"
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
              id="dnh-framework-hero-heading"
              className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,8.4vw,2.6rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.65rem,5.7vw,2.75rem)] lg:text-[clamp(3.05rem,4vw,3.25rem)] ${
                isRTL ? "leading-[1.52]" : "leading-[1.1]"
              }`}
            >
              {content.heading}
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

        <div className="order-4 min-w-0 border-y border-white/15 lg:col-span-2">
          {pillarsIntro ? (
            <p
              className={`border-b border-white/15 px-5 py-4 text-start text-[13px] font-bold text-white/70 sm:px-6 sm:text-[14px] ${
                isRTL ? "leading-[1.9]" : "leading-[1.65]"
              }`}
            >
              {pillarsIntro.text}
            </p>
          ) : null}

          <div className="grid min-w-0 sm:grid-cols-3">
            {content.pillars.map((pillar) => {
              const Icon = pillarIcons[pillar.id];
              return (
                <article
                  key={pillar.id}
                  className="group grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-4 border-b border-e border-white/15 bg-white/[0.035] p-5 transition-colors duration-200 hover:bg-white/[0.07] sm:block sm:border-b-0 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3 sm:mb-5">
                    <bdi
                      dir="ltr"
                      className="text-[34px] font-black leading-none text-brand-accent sm:text-[42px]"
                    >
                      {pillar.code}
                    </bdi>
                    <span className="hidden size-10 items-center justify-center border border-white/18 text-white/70 sm:flex">
                      <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                    </span>
                  </div>
                  <div className="min-w-0 text-start">
                    <h2 className="text-[17px] font-black leading-[1.65] text-white sm:text-[19px]">
                      {pillar.title}
                    </h2>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p
          className={`order-5 border-s-2 border-brand-accent ps-4 text-start text-[13.5px] font-semibold text-white/72 sm:ps-5 sm:text-[14.5px] lg:col-span-2 ${
            isRTL ? "leading-[1.95]" : "leading-[1.7]"
          }`}
        >
          {content.closing}
        </p>
      </div>
    </section>
  );
}
