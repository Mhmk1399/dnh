"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  Route,
  SearchCheck,
  Telescope,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkProcessStep = {
  id: string;
  title: string;
  english_label?: string;
  description: string;
};

type FrameworkProcessContent = {
  order: number;
  id: "from-data-to-decision";
  type: "process-overview";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  steps: FrameworkProcessStep[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
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
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "from-data-to-decision" &&
      section.type === "process-overview",
  ) as FrameworkProcessContent | undefined;

  useEffect(() => {
    const root = sectionRef.current;

    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-framework-reveal]"),
    );
    const waiting = new Set<HTMLElement>();

    items.forEach((item) => {
      item.removeAttribute("data-reveal");

      if (item.getBoundingClientRect().top > window.innerHeight - 36) {
        item.dataset.reveal = "pending";
        waiting.add(item);
      }
    });

    if (waiting.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const item = entry.target as HTMLElement;
          item.dataset.reveal = "shown";
          waiting.delete(item);
          observer.unobserve(item);
        });

        if (waiting.size === 0) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
    );

    waiting.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale]);

  if (!content) return null;

  const highlight = content.heading_highlight?.trim() ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-data-to-decision-heading"
      className="relative isolate border-y border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell relative">
        <header className="min-w-0 border-b border-line pb-7 sm:pb-8 lg:grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end lg:gap-12 lg:pb-10 xl:gap-16">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-bold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>

            
            </div>

            <h2
              id="framework-data-to-decision-heading"
              className={`mt-4 max-w-[30ch] text-pretty text-start text-[clamp(1.9rem,7.4vw,2.35rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.15rem,5vw,2.7rem)] lg:max-w-[28ch] lg:text-[clamp(2.35rem,3.05vw,3rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.16]"
              }`}
            >
              {highlightIndex < 0 ? (
                content.heading
              ) : (
                <>
                  {content.heading.slice(0, highlightIndex)}
                  <span className="text-brand-accent">
                    {content.heading.slice(
                      highlightIndex,
                      highlightIndex + highlight.length,
                    )}
                  </span>
                  {content.heading.slice(highlightIndex + highlight.length)}
                </>
              )}
            </h2>
          </div>

          <div className="mt-5 min-w-0 text-start lg:mt-0 lg:border-s lg:border-line lg:ps-7 xl:ps-9">
            <p
              className={`max-w-[50ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.72]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="relative mt-7 min-w-0 sm:mt-8 lg:mt-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 start-[27px] top-6 z-10 w-px bg-line md:hidden"
          />

          <ol className="min-w-0 border-y border-line bg-page">
            {content.steps.map((step, index) => {
              const Icon = stepIcons[step.id] ?? Route;
              const finalStep = index === content.steps.length - 1;
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={step.id}
                  data-framework-reveal=""
                  className={`group relative min-w-0 border-b border-line last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 ${
                    finalStep
                      ? "bg-brand-primary text-[var(--dnh-text-on-brand)]"
                      : "bg-page hover:bg-surface-soft"
                  }`}
                >
                  <div className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)] gap-x-4 px-4 py-5 sm:grid-cols-[64px_minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-x-6 sm:px-5 sm:py-6 lg:grid-cols-[72px_minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-x-8 lg:px-7 lg:py-6 xl:px-8">
                    <div className="relative z-10 flex min-w-0 flex-col items-center gap-2 sm:items-start">
                      <span
                        aria-hidden="true"
                        className={`flex size-11 items-center justify-center border transition-colors duration-300 motion-reduce:transition-none ${
                          finalStep
                            ? "border-[color-mix(in_srgb,var(--dnh-text-on-brand)_35%,transparent)] bg-brand-secondary/40 text-[var(--dnh-text-on-brand)]"
                            : "border-line bg-page text-brand-primary group-hover:border-brand-accent group-hover:text-brand-accent"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                    </div>

                    <div className="min-w-0 self-center text-start sm:pt-0.5">
                      <h3
                        className={`text-start text-[18px] font-extrabold [overflow-wrap:break-word] sm:text-[19px] lg:text-[20px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.36]"
                        } ${
                          finalStep
                            ? "text-[var(--dnh-text-on-brand)]"
                            : "text-ink"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className={`col-start-2 mt-3 min-w-0 self-start text-start text-[13px] sm:col-start-3 sm:mt-0 sm:text-[14px] lg:text-[15px] ${
                        isRTL ? "leading-[1.95]" : "leading-[1.68]"
                      } ${
                        finalStep
                          ? "text-[color-mix(in_srgb,var(--dnh-text-on-brand)_86%,transparent)]"
                          : "text-ink-muted"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          data-framework-reveal=""
          className="mt-7 grid min-w-0 gap-5 border-s-2 border-brand-accent ps-4 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-8 sm:ps-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10"
        >
          <p
            className={`max-w-[82ch] text-start text-[14px] font-semibold text-brand-primary sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.72]"
            }`}
          >
            {content.closing}
          </p>

          <div className="min-w-0">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                size="md"
                icon={Arrow}
                iconPosition="end"
                dir={direction}
                className="min-h-11 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto"
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
