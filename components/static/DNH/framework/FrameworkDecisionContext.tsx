"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Coins,
  Crosshair,
  GitBranch,
  Landmark,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type DecisionContextItem = {
  id: string;
  title: string;
  description: string;
};

type DecisionContextContent = {
  order: number;
  id: "decision-context";
  type: "decision-context";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: DecisionContextItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<string, LucideIcon> = {
  "economic-conditions": Landmark,
  "asset-structure": BriefcaseBusiness,
  risk: ShieldCheck,
  liquidity: Coins,
  goals: Crosshair,
  constraints: SlidersHorizontal,
  "time-horizon": Clock3,
  scenarios: GitBranch,
  "strategic-implications": Scale,
};

export function FrameworkDecisionContext() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "decision-context" && section.type === "decision-context",
  ) as DecisionContextContent | undefined;

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

    root
      .querySelectorAll<HTMLElement>("[data-framework-reveal]")
      .forEach((element) => {
        element.removeAttribute("data-reveal");

        if (element.getBoundingClientRect().top > window.innerHeight - 36) {
          element.dataset.reveal = "pending";
          waiting.add(element);
        }
      });

    if (waiting.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          waiting.delete(element);
          observer.unobserve(element);
        });

        if (waiting.size === 0) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
    );

    waiting.forEach((element) => observer.observe(element));
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
      aria-labelledby="framework-decision-context-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-70"
      />

      <div className="dnh-site-shell relative">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12 xl:gap-16">
          <div
            data-framework-reveal=""
            className="min-w-0 text-start motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
              />

              <div className="min-w-0">
                <p className="text-start text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                  {content.eyebrow}
                </p>

               
              </div>
            </div>

            <h2
              id="framework-decision-context-heading"
              className={`mt-5 max-w-[30ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.55rem,3.05vw,3.2rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.13]"
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

          <p
            data-framework-reveal=""
            className={`max-w-[68ch] border-s-2 border-brand-primary ps-4 text-start text-[14px] text-ink-muted motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        <div className="relative mt-9 sm:mt-10 lg:mt-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-line"
          />

          <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => {
              const Icon = itemIcons[item.id] ?? Scale;
              const isLastColumn = (index + 1) % 3 === 0;
              const isLastRow = index >= content.items.length - 3;

              return (
                <article
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 45}ms` }}
                  className={`group relative min-w-0 border-b border-line py-5 last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-page sm:py-6 md:px-6 lg:px-7 lg:py-7 ${
                    index % 2 === 0 ? "md:border-e" : ""
                  } ${!isLastColumn ? "lg:border-e" : "lg:border-e-0"} ${
                    isLastRow ? "lg:border-b-0" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] origin-start scale-x-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-x-100"
                  />

                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)] sm:size-12"
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </span>

                    <div className="min-w-0 pt-0.5 text-start">
                      <h3
                        className={`text-[17px] font-extrabold text-ink [overflow-wrap:break-word] sm:text-[18px] lg:text-[19px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.35]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2 max-w-[44ch] text-[13px] text-ink-muted sm:text-[14px] ${
                          isRTL ? "leading-[1.95]" : "leading-[1.68]"
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

        <div
          data-framework-reveal=""
          className="mt-8 grid min-w-0 gap-5 border-t border-line pt-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-9 sm:pt-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:pt-8"
        >
          <p
            className={`max-w-[84ch] text-start text-[14px] font-semibold text-brand-primary sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.68]"
            }`}
          >
            {content.closing}
          </p>

          <div className="min-w-0 lg:justify-self-end">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                size="md"
                icon={Arrow}
                iconPosition="end"
                dir={direction}
                className="min-h-11 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto sm:max-w-full"
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
