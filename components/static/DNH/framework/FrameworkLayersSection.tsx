"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  HeartPulse,
  Network,
  RefreshCw,
  Scale,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkProblemItem = {
  id: string;
  title: string;
  description: string;
};

type FrameworkProblemContent = {
  order: number;
  id: "why-decision-framework-matters";
  type: "problem-recognition";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: FrameworkProblemItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<string, LucideIcon> = {
  "information-overload": Database,
  "conflicting-analysis": Scale,
  "changing-economic-conditions": RefreshCw,
  "emotion-in-decisions": HeartPulse,
  "connected-impact": Network,
};

export function FrameworkWhyDecisionMatters() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "why-decision-framework-matters" &&
      section.type === "problem-recognition",
  ) as FrameworkProblemContent | undefined;

  useEffect(() => {
    const root = sectionRef.current;

    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const waiting = new Set<HTMLElement>();
    const revealItems = root.querySelectorAll<HTMLElement>(
      "[data-framework-reveal]",
    );

    revealItems.forEach((item) => {
      item.removeAttribute("data-reveal");

      if (item.getBoundingClientRect().top > window.innerHeight - 32) {
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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -24px 0px",
      },
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
      aria-labelledby="framework-why-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent"
      />

      <div className="dnh-site-shell relative">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-20">
          <header className="min-w-0 text-start lg:sticky lg:top-28 lg:self-start">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-brand-accent"
              />
              <p className="min-w-0 text-[12px] font-bold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
            </div>

           

            <h2
              id="framework-why-heading"
              className={`mt-5 max-w-[24ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.35rem)] font-black [overflow-wrap:break-word] sm:mt-6 md:text-[clamp(2.35rem,4.7vw,3rem)] lg:max-w-[21ch] lg:text-[clamp(2.7rem,3.35vw,2.55rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.18]"
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

            <p
              className={`mt-5 max-w-[62ch] text-start text-[14px] text-ink-muted sm:mt-6 sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {content.intro}
            </p>

            <div
              aria-hidden="true"
              className="mt-7 flex items-center gap-2 sm:mt-8"
            >
              <span className="h-[2px] w-12 bg-brand-accent" />
              <span className="h-px flex-1 bg-line" />
            </div>
          </header>

          <div className="min-w-0 border-t border-line">
            {content.items.map((item) => {
              const Icon = itemIcons[item.id] ?? Network;

              return (
                <article
                  key={item.id}
                  data-framework-reveal=""
                  className="group relative grid min-w-0 gap-4 border-b border-line py-5 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-3 motion-safe:data-[reveal=pending]:opacity-0 sm:py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 lg:px-4 lg:hover:bg-page/70"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-[2px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                  />

                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-colors duration-300 group-hover:border-brand-accent group-hover:text-brand-accent motion-reduce:transition-none sm:size-11"
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </span>

                    <h3
                      className={`min-w-0 text-start text-[17px] font-extrabold text-ink transition-colors duration-300 group-hover:text-brand-primary motion-reduce:transition-none sm:text-[18px] lg:text-[19px] ${
                        isRTL ? "leading-[1.8]" : "leading-[1.45]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className={`min-w-0 text-start text-[14px] text-ink-muted sm:text-[15px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.72]"
                    }`}
                  >
                    {item.description}
                  </p>
                </article>
              );
            })}

            <div
              data-framework-reveal=""
              className="grid min-w-0 gap-5 border-b border-line py-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-3 motion-safe:data-[reveal=pending]:opacity-0 sm:py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-4"
            >
              <p
                className={`max-w-[72ch] text-start text-[14px] font-semibold text-brand-primary sm:text-[15px] ${
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
        </div>
      </div>
    </section>
  );
}
