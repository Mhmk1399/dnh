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

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-framework-hero-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-brand-secondary text-white"
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
              className={`mt-5 max-w-[44ch] text-pretty text-[clamp(2rem,8.4vw,2.6rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.65rem,5.7vw,2rem)] lg:text-[clamp(2.2rem,4vw,2.1rem)] ${
                isRTL ? "leading-[1.52]" : "leading-[1.1]"
              }`}
            >
              {content.heading}
            </h1>

            <div
              className={`mt-6 max-w-[104ch] space-y-4 border-s-2 border-brand-accent ps-4 text-[14px] text-white/[0.78] sm:mt-7 sm:ps-5 sm:text-[15px] ${
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
      </div>
    </section>
  );
}
