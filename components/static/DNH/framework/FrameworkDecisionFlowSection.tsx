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
      className="relative isolate overflow-hidden border-b border-white/10 bg-page py-14 text-white sm:py-18 lg:py-24"
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
        {/* Main grid: content + image */}
        <div
          className={`
      grid min-w-0 grid-cols-1 gap-x-8 gap-y-8
      lg:gap-x-10 lg:gap-y-8
      xl:gap-x-12

      ${
        content.media?.src
          ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]"
          : "lg:grid-cols-1"
      }
    `}
        >
          {/* 1. Heading + intro */}
          <header
            className="
        min-w-0 text-start
        lg:col-start-1 lg:row-start-1
      "
          >
            <DnhEditorialEyebrow
              eyebrow={content.eyebrow}
              englishLabel={content.english_label}
              locale={locale}
            />

            <h2
              id="framework-data-to-decision-heading"
              className={`
          mt-5 max-w-[27ch]
          text-black!
          text-[clamp(1.9rem,7vw,2.55rem)]
          font-black
          [overflow-wrap:break-word]
          sm:mt-6
          sm:text-[clamp(2.3rem,4.6vw,3.35rem)]
          ${isRTL ? "leading-[1.52]" : "leading-[1.12]"}
        `}
            >
              <DnhHighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>

            <p
              className={`
          mt-6 max-w-[68ch]
          border-s-2 border-brand-accent
          ps-4 text-[14px] text-black/72
          sm:ps-5 sm:text-[15px]
          ${isRTL ? "leading-[2]" : "leading-[1.72]"}
        `}
            >
              {content.intro}
            </p>
          </header>

          {/* 2. Image: beside heading and cards on desktop */}
          {content.media?.src ? (
            <div
              className="
          min-w-0
          lg:col-start-2
          lg:row-start-1
          lg:row-span-2
          lg:self-stretch
        "
            >
              <DnhEditorialMediaFrame
                media={content.media}
                label={content.english_label}
                sizes="(max-width: 1023px) calc(100vw - 24px), 35vw"
                className="
            aspect-[16/10]
            min-h-[240px]
            sm:min-h-[300px]
            lg:aspect-auto
            lg:h-full
            lg:min-h-[540px]
          "
              />
            </div>
          ) : null}

          {/* 3. Cards: directly below intro on desktop */}
          <ol
            className="
        grid min-w-0 grid-cols-1
        border-s border-t border-line
        sm:grid-cols-2
        lg:col-start-1
        lg:row-start-2
        lg:grid-cols-3
      "
          >
            {content.steps.map((step, index) => {
              const Icon = stepIcons[step.id] ?? Route;
              const finalStep = index === content.steps.length - 1;

              return (
                <li
                  key={step.id}
                  className={`
              group flex min-w-0 flex-col
              border-b border-e border-line
              p-4
              transition-colors duration-200
              sm:p-5
              lg:p-3.5
              xl:p-5

              ${
                finalStep
                  ? "bg-brand-accent text-white"
                  : "bg-white/[0.035] text-black hover:bg-black/[0.035]"
              }
            `}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`
                  flex size-10 shrink-0
                  items-center justify-center
                  border
                  transition-colors duration-200

                  ${
                    finalStep
                      ? "border-white/35 bg-white/10 text-white"
                      : "border-line text-brand-accent"
                  }
                `}
                    >
                      <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
                    </span>

                   
                  </div>

                  {/* Title */}
                  <h3
                    className={`
                mt-5 min-w-0
                text-start text-[15px]
                font-black
                [overflow-wrap:break-word]
                sm:text-[17px]
                lg:text-[15px]
                xl:text-[17px]
                ${isRTL ? "leading-[1.7]" : "leading-[1.38]"}
              `}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`
                mt-3 min-w-0
                text-start text-[13px]
                [overflow-wrap:break-word]
                ${finalStep ? "text-white/82" : "text-black/58"}
                ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}
              `}
                  >
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Footer */}
        <footer
          className="
      mt-8 grid min-w-0 gap-5
      lg:mt-10
      lg:grid-cols-[minmax(0,1fr)_auto]
      lg:items-center
    "
        >
          <DnhEditorialActions ctas={content.ctas} direction={direction} dark />
        </footer>
      </div>
    </section>
  );
}
