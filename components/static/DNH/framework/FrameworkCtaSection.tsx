"use client";

import {
  CalendarRange,
  Clock3,
  Layers3,
  ShieldCheck,
  Target,
  WalletCards,
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
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";

type HorizonItem = {
  id: string;
  title: string;
  description: string;
};

type HorizonArchitectureContent = {
  id: "horizon-architecture";
  type: "framework-pillar";
  code: "H";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: HorizonItem[];
  closing_question: string;
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const itemIcons: Record<string, LucideIcon> = {
  "long-term-goals": Target,
  liquidity: WalletCards,
  resilience: ShieldCheck,
  "whole-wealth-structure": Layers3,
  "time-horizon": Clock3,
  "future-needs": CalendarRange,
};

export function FrameworkHorizonArchitecture() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? frameworkEn : frameworkFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "horizon-architecture" &&
      section.type === "framework-pillar",
  ) as HorizonArchitectureContent | undefined;

  if (!content) return null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-horizon-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell relative z-10 min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.78fr)] lg:items-stretch lg:gap-12">
          <header className="min-w-0 text-start">
            <div className="flex items-start gap-4">
              <bdi
                dir="ltr"
                className="flex size-12 shrink-0 items-center justify-center bg-brand-primary text-[25px] font-black leading-none text-white sm:size-14 sm:text-[29px]"
              >
                {content.code}
              </bdi>
              <div className="min-w-0 flex-1">
                <DnhEditorialEyebrow
                  eyebrow={content.eyebrow}
                  englishLabel={content.english_label}
                  locale={locale}
                />
              </div>
            </div>
            <h2
              id="framework-horizon-heading"
              className={`mt-5 max-w-[27ch] text-pretty text-[clamp(1.9rem,7vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,4.7vw,3.4rem)] ${
                isRTL ? "leading-[1.52]" : "leading-[1.12]"
              }`}
            >
              <DnhHighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
            <p
              className={`mt-6 max-w-[70ch] border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:ps-5 sm:text-[15px] ${
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
              className="aspect-[4/5] min-h-[430px] border-line lg:min-h-[560px] lg:aspect-auto"
            />
          ) : null}
        </div>

        <div className="mt-8 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = itemIcons[item.id] ?? Target;
            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-line bg-page p-5 transition-colors duration-200 hover:bg-surface-soft sm:p-6"
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
            className={`border-s-2 border-brand-accent ps-4 text-start text-[15px] font-black text-ink sm:text-[16px] ${
              isRTL ? "leading-[1.85]" : "leading-[1.55]"
            }`}
          >
            {content.closing_question}
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
