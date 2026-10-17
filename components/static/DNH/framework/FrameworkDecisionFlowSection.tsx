"use client";

import {
  CheckCircle2,
  Database,
  Route,
  SearchCheck,
  Telescope,
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

type FrameworkProcessStep = {
  id: string;
  title: string;
  english_label?: string;
  description: string;
};

type FrameworkProcessContent = {
  id: "from-data-to-decision";
  type: "process-overview";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  steps: FrameworkProcessStep[];
  closing: string;
  ctas: DnhEditorialCta[];
  media?: DnhEditorialMedia;
};

const stepIcons: Record<string, LucideIcon> = {
  "data-context": Database,
  intelligence: SearchCheck,
  navigation: Route,
  horizon: Telescope,
  "structured-decision": CheckCircle2,
};

export function FrameworkFromDataToDecision() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? frameworkEn : frameworkFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "from-data-to-decision" &&
      section.type === "process-overview",
  ) as FrameworkProcessContent | undefined;

  if (!content) return null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-data-to-decision-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] py-14 text-white sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.85fr)] lg:items-stretch lg:gap-12">
          <header className="min-w-0 text-start">
            <DnhEditorialEyebrow
              eyebrow={content.eyebrow}
              englishLabel={content.english_label}
              locale={locale}
              dark
            />
            <h2
              id="framework-data-to-decision-heading"
              className={`mt-5 max-w-[27ch] text-pretty text-[clamp(1.9rem,7vw,2.55rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,4.6vw,3.35rem)] ${
                isRTL ? "leading-[1.52]" : "leading-[1.12]"
              }`}
            >
              <DnhHighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
            <p
              className={`mt-6 max-w-[68ch] border-s-2 border-brand-accent ps-4 text-[14px] text-white/72 sm:ps-5 sm:text-[15px] ${
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
              sizes="(max-width: 1023px) calc(100vw - 24px), 38vw"
              className="aspect-[16/10] min-h-[300px] lg:min-h-[540px] lg:aspect-auto"
            />
          ) : null}
        </div>

        <ol className="mt-8 grid min-w-0 grid-cols-1 border-s border-t border-white/14 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, index) => {
            const Icon = stepIcons[step.id] ?? Route;
            const finalStep = index === content.steps.length - 1;
            return (
              <li
                key={step.id}
                className={`group min-w-0 border-b border-e border-white/14 p-5 transition-colors duration-200 sm:p-6 ${
                  finalStep
                    ? "bg-brand-accent text-white"
                    : "bg-white/[0.035] hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex size-10 items-center justify-center border ${
                      finalStep
                        ? "border-white/35 bg-white/10 text-white"
                        : "border-white/18 text-brand-accent"
                    }`}
                  >
                    <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                  </span>
                  <bdi
                    dir="ltr"
                    className={`text-[11px] font-black ${
                      finalStep ? "text-white/75" : "text-white/35"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </bdi>
                </div>
                <h3
                  className={`mt-5 text-start text-[16px] font-black sm:text-[17px] ${
                    isRTL ? "leading-[1.7]" : "leading-[1.38]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3 text-start text-[13px] ${
                    finalStep ? "text-white/82" : "text-white/58"
                  } ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
                >
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <footer className="mt-7 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p
            className={`border-s-2 border-brand-accent ps-4 text-start text-[14px] font-semibold text-white/75 sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.7]"
            }`}
          >
            {content.closing}
          </p>
          <DnhEditorialActions
            ctas={content.ctas}
            direction={direction}
            dark
          />
        </footer>
      </div>
    </section>
  );
}
