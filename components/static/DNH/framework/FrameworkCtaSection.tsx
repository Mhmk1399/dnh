"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  CircleHelp,
  Clock3,
  Layers3,
  ShieldCheck,
  Target,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type HorizonItem = {
  id: string;
  title: string;
  description: string;
};

type HorizonArchitectureContent = {
  order: number;
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
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
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
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "horizon-architecture" &&
      section.type === "framework-pillar",
  ) as HorizonArchitectureContent | undefined;

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
      aria-labelledby="framework-horizon-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-70"
      />

      <div className="dnh-site-shell relative">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-12 lg:pb-10 xl:gap-16">
          <div
            data-framework-reveal=""
            className="min-w-0 text-start motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center border border-brand-accent bg-page text-brand-accent sm:size-14"
              >
                <bdi
                  dir="ltr"
                  className="text-[25px] font-black leading-none sm:text-[29px]"
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
              id="framework-horizon-heading"
              className={`mt-5 max-w-[30ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.5rem,3vw,3.2rem)] ${
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

          <div
            data-framework-reveal=""
            className="min-w-0 border-s-2 border-brand-primary ps-4 text-start motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-5"
          >
            <p
              className={`max-w-[68ch] text-[14px] text-ink-muted sm:text-[15px] lg:text-[15.5px] ${
                isRTL ? "leading-[2]" : "leading-[1.72]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="relative mt-9 sm:mt-10 lg:mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-[color-mix(in_srgb,var(--dnh-primary)_35%,var(--dnh-border))] lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-1/2 top-1/2 z-10 hidden size-2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent lg:block"
          />

          <ol className="grid min-w-0 grid-cols-1 lg:grid-cols-2">
            {content.items.map((item, index) => {
              const Icon = itemIcons[item.id] ?? Target;
              const number = String(index + 1).padStart(2, "0");
              const isLastMobile = index === content.items.length - 1;
              const isLastDesktopRow = index >= content.items.length - 2;
              const isSecondColumn = index % 2 === 1;

              return (
                <li
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 45}ms` }}
                  className={`group relative min-w-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-page ${
                    isLastMobile ? "border-b-0" : "border-b border-line"
                  } ${isLastDesktopRow ? "lg:border-b-0" : "lg:border-b lg:border-line"} ${
                    isSecondColumn ? "lg:ps-8 xl:ps-10" : "lg:pe-8 xl:pe-10"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                  />

                  <article className="flex min-w-0 items-start gap-4 px-2 py-5 sm:gap-5 sm:px-3 sm:py-6 lg:px-4 lg:py-7">
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="flex size-11 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)] sm:size-12"
                      >
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                    
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <h3
                        className={`text-start text-[17px] font-extrabold text-ink [overflow-wrap:break-word] sm:text-[18px] lg:text-[19px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.34]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2 max-w-[50ch] text-start text-[13px] text-ink-muted sm:text-[14px] ${
                          isRTL ? "leading-[1.95]" : "leading-[1.67]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          data-framework-reveal=""
          className="mt-8 grid min-w-0 gap-5 border border-line bg-page px-4 py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:px-5 sm:py-6 lg:grid-cols-[52px_minmax(0,1fr)_auto] lg:items-center lg:gap-7 lg:px-6"
        >
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center bg-brand-primary text-[var(--dnh-text-on-brand)] sm:size-12"
          >
            <CircleHelp size={21} strokeWidth={1.65} />
          </span>

          <p
            className={`max-w-[72ch] text-start text-[15px] font-extrabold text-ink sm:text-[16px] lg:text-[17px] ${
              isRTL ? "leading-[1.85]" : "leading-[1.55]"
            }`}
          >
            {content.closing_question}
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
