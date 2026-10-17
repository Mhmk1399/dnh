"use client";

import {
  ArrowLeftRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  Landmark,
  Layers,
  PieChart,
  ShieldCheck,
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

type FrameworkApplicationItem = {
  id: string;
  title: string;
  description: string;
};

type FrameworkApplicationsContent = {
  id: "where-framework-is-applied";
  type: "applications";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: FrameworkApplicationItem[];
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const applicationIcons: Record<string, LucideIcon> = {
  "wealth-architecture": Layers,
  "portfolio-intelligence": PieChart,
  "important-financial-decision": ArrowLeftRight,
  "business-capital-liquidity": Building2,
  "risk-wealth-protection": ShieldCheck,
  "macro-market": Globe2,
  "executive-decisions": BriefcaseBusiness,
};

export function FrameworkApplications() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? frameworkEn : frameworkFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "where-framework-is-applied" &&
      section.type === "applications",
  ) as FrameworkApplicationsContent | undefined;

  if (!content) return null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-applications-heading"
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
                id="framework-applications-heading"
                className={`mt-5 max-w-[28ch] text-pretty text-[clamp(1.9rem,7vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,4.7vw,3.4rem)] ${
                  isRTL ? "leading-[1.52]" : "leading-[1.12]"
                }`}
              >
                <DnhHighlightedHeading
                  heading={content.heading}
                  highlight={content.heading_highlight}
                />
              </h2>
              <p
                className={`mt-6 max-w-[74ch] border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:ps-5 sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.72]"
                }`}
              >
                {content.intro}
              </p>
            </header>

            <div className="mt-7 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2">
              {content.items.map((item, index) => {
                const Icon = applicationIcons[item.id] ?? Landmark;
                const isLastOdd =
                  index === content.items.length - 1 &&
                  content.items.length % 2 === 1;
                return (
                  <article
                    key={item.id}
                    className={`group min-w-0 border-b border-e border-line p-5 transition-colors duration-200 hover:bg-surface-soft ${
                      isLastOdd ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center bg-surface-soft text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                        <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-start text-[16px] font-black ${
                            isRTL ? "leading-[1.7]" : "leading-[1.4]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 text-start text-[13px] text-ink-muted ${
                            isRTL ? "leading-[1.9]" : "leading-[1.68]"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
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
              className="aspect-[4/5] min-h-[430px] border-line lg:min-h-[760px] lg:aspect-auto"
            />
          ) : null}
        </div>

        <footer className="mt-7 flex min-w-0 justify-start border-t border-line pt-7 lg:justify-end">
          <DnhEditorialActions
            ctas={content.ctas}
            direction={direction}
          />
        </footer>
      </div>
    </section>
  );
}
