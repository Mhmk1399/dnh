"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Map,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type NavigationStrategyItem = {
  id: string;
  title: string;
  description: string;
};

type NavigationStrategyContent = {
  order: number;
  id: "navigation-strategy";
  type: "framework-pillar";
  code: "N";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{
    id: string;
    text: string;
  }>;
  items: NavigationStrategyItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<string, LucideIcon> = {
  scenarios: Map,
  "risk-prioritization": ShieldCheck,
  constraints: SlidersHorizontal,
  "options-comparison": Scale,
  "decision-consequences": GitBranch,
};

export function FrameworkNavigationStrategy() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "navigation-strategy" &&
      section.type === "framework-pillar",
  ) as NavigationStrategyContent | undefined;

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
      aria-labelledby="framework-navigation-strategy-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-65"
      />

      <div className="dnh-site-shell relative">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12 lg:pb-10 xl:gap-16">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center border border-brand-accent bg-[color-mix(in_srgb,var(--dnh-accent)_7%,transparent)] sm:size-14"
              >
                <bdi
                  dir="ltr"
                  className="text-[25px] font-black leading-none text-brand-accent sm:text-[29px]"
                >
                  {content.code}
                </bdi>
              </span>

              <div className="min-w-0">
                <p className="text-start text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                  {content.eyebrow}
                </p>

              
              </div>
            </div>

            <h2
              id="framework-navigation-strategy-heading"
              className={`mt-5 max-w-[28ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.5rem,3.05vw,3.15rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.14]"
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

          <div
            className={`min-w-0 space-y-3.5 border-s-2 border-brand-primary ps-4 text-start text-[14px] text-ink-muted sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        <div className="relative mt-8 min-w-0 sm:mt-9 lg:mt-10">
          <div
            aria-hidden="true"
            className="absolute bottom-7 start-[26px] top-7 w-px bg-line sm:start-[31px] lg:start-[34px]"
          />
          <div
            aria-hidden="true"
            className="absolute start-[26px] top-7 h-[32%] w-px bg-brand-accent sm:start-[31px] lg:start-[34px]"
          />

          <ol className="relative min-w-0 border-y border-line">
            {content.items.map((item, index) => {
              const Icon = itemIcons[item.id] ?? Map;
              const number = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 45}ms` }}
                  className="group relative min-w-0 border-b border-line last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-surface-soft"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                  />

                  <div className="grid min-w-0 grid-cols-[52px_minmax(0,1fr)] gap-x-4 px-2 py-4 sm:grid-cols-[62px_minmax(0,0.78fr)_minmax(0,1.22fr)] sm:gap-x-5 sm:px-3 sm:py-5 lg:grid-cols-[68px_minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-x-7 lg:px-4 lg:py-[22px]">
                    <div className="relative z-10 flex min-w-0 items-start justify-center sm:justify-start">
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)] sm:size-11"
                      >
                        <Icon size={19} strokeWidth={1.65} />
                      </span>
                    </div>

                    <div className="min-w-0 sm:pt-0.5">
                   
                      <h3
                        className={`mt-2 min-w-0 text-start text-[17px] font-extrabold text-ink [overflow-wrap:break-word] sm:text-[18px] lg:text-[19px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.36]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`col-start-2 mt-2 min-w-0 text-start text-[13px] text-ink-muted sm:col-start-3 sm:mt-0 sm:pt-0.5 sm:text-[14px] ${
                        isRTL ? "leading-[1.95]" : "leading-[1.68]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          data-framework-reveal=""
          className="mt-7 grid min-w-0 gap-5 border-s-[3px] border-brand-accent bg-surface-soft px-4 py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:px-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-6"
        >
          <p
            className={`max-w-[88ch] text-start text-[13px] font-semibold text-ink sm:text-[14px] ${
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
