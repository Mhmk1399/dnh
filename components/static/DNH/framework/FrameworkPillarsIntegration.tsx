"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Route,
  Telescope,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type IntegrationStep = {
  id: string;
  code: "D" | "N" | "H";
  title: string;
  description: string;
};

type PillarsIntegrationContent = {
  order: number;
  id: "how-dnh-pillars-work-together";
  type: "integration";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{
    id: string;
    text: string;
  }>;
  steps: IntegrationStep[];
  framework_logic: string;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const stepIcons: Record<IntegrationStep["code"], LucideIcon> = {
  D: Database,
  N: Route,
  H: Telescope,
};

export function FrameworkPillarsIntegration() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "how-dnh-pillars-work-together" &&
      section.type === "integration",
  ) as PillarsIntegrationContent | undefined;

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

        if (element.getBoundingClientRect().top > window.innerHeight - 40) {
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
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
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
      aria-labelledby="framework-pillars-integration-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-page py-14   sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell relative z-10">
        <header className="grid min-w-0 gap-7 border-b border-[color-mix(in_srgb,var(--dnh-bg-page)_16%,transparent)] pb-8 sm:pb-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-12 lg:pb-10 xl:gap-16">
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
                <p className="text-start text-[12px] font-extrabold leading-[1.8] text-brand-accent sm:text-[13px]">
                  {content.eyebrow}
                </p>
              </div>
            </div>

            <h2
              id="framework-pillars-integration-heading"
              className={`mt-5 max-w-[31ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.55rem,3vw,3.25rem)] ${
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
            className="min-w-0 space-y-4 border-s-2 border-brand-accent ps-4 text-start motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-5"
          >
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph.id}
                className={`max-w-[68ch] text-[14px] text-black/70 sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.72]"
                }`}
              >
                {paragraph.text}
              </p>
            ))}
          </div>
        </header>

        <div className="mt-9 sm:mt-10 lg:mt-12">
          <ol className="min-w-0 border-y border-[color-mix(in_srgb,var(--dnh-bg-page)_16%,transparent)]">
            {content.steps.map((step, index) => {
               const isLast = index === content.steps.length - 1;

              return (
                <li
                  key={step.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 70}ms` }}
                  className={`group relative min-w-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-[color-mix(in_srgb,var(--dnh-bg-page)_6%,transparent)] ${
                    isLast
                      ? ""
                      : "border-b border-[color-mix(in_srgb,var(--dnh-bg-page)_14%,transparent)]"
                  }`}
                >
              
                  <article className="grid min-w-0 gap-4 py-5 sm:py-6 md:grid-cols-[88px_minmax(0,0.8fr)_minmax(0,1.55fr)] md:items-center md:gap-6 lg:grid-cols-[104px_minmax(0,0.76fr)_minmax(0,1.6fr)] lg:gap-8 lg:py-7">
                    <div className="flex items-center gap-3 md:gap-0">
                      <bdi
                        dir="ltr"
                        className="text-[36px] font-black leading-none px-1 text-brand-primary transition-colors duration-300 group-hover:text-brand-accent md:ms-[-5px] md:text-[48px] lg:text-[56px]"
                      >
                        {step.code}
                      </bdi>
                    </div>

                    <h3
                      className={`max-w-[28ch] text-start text-[18px] font-extrabold text-black [overflow-wrap:break-word] sm:text-[19px] lg:text-[21px] ${
                        isRTL ? "leading-[1.75]" : "leading-[1.35]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`max-w-[76ch] text-start text-[13px] text-black/70 sm:text-[14px] lg:text-[14.5px] ${
                        isRTL ? "leading-[1.95]" : "leading-[1.7]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          data-framework-reveal=""
          className="mt-8 grid min-w-0 gap-5 border border-[color-mix(in_srgb,var(--dnh-bg-page)_18%,transparent)] bg-[color-mix(in_srgb,var(--dnh-bg-page)_6%,transparent)] p-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:p-6 lg:mt-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)] lg:items-center lg:gap-10 lg:p-7"
        >
        

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
