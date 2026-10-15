"use client";

import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Flag,
  GitBranch,
  ListChecks,
  LockKeyhole,
  ShieldCheck,
  Target,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkDecisionOutputItem = {
  id: string;
  title: string;
  description: string;
};

type FrameworkDecisionOutputsContent = {
  order: number;
  id: "decision-outputs";
  type: "outcomes";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: FrameworkDecisionOutputItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const outputIcons: Record<string, LucideIcon> = {
  "problem-definition": Target,
  "key-variables": Activity,
  "risks-vulnerabilities": ShieldCheck,
  constraints: LockKeyhole,
  scenarios: GitBranch,
  "path-implications": Waypoints,
  "decision-priorities": ListChecks,
  "long-term-horizon": Flag,
};

export function FrameworkDecisionOutputs() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "decision-outputs" && section.type === "outcomes",
  ) as FrameworkDecisionOutputsContent | undefined;

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
      aria-labelledby="framework-decision-outputs-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-70"
      />

      <div className="dnh-site-shell relative">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-12 xl:gap-16">
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
              id="framework-decision-outputs-heading"
              className={`mt-5 max-w-[30ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.55rem,3vw,3.1rem)] ${
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
            className="relative min-w-0 border-s border-brand-primary/35 ps-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-6"
          >
            <span
              aria-hidden="true"
              className="absolute -start-[3px] top-0 h-12 w-[5px] bg-brand-accent"
            />
            <p
              className={`max-w-[68ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div
          data-framework-reveal=""
          className="relative mt-9 overflow-hidden border border-line bg-page shadow-[0_24px_70px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-10 lg:mt-12"
        >
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-b border-line px-4 py-4 sm:px-6 lg:px-8">
            <span
              aria-hidden="true"
              className="h-px bg-gradient-to-r from-transparent to-brand-primary/28"
            />

            

            <span
              aria-hidden="true"
              className="h-px bg-gradient-to-l from-transparent to-brand-primary/28"
            />
          </div>

          <div className="relative lg:grid lg:grid-cols-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 start-5 top-0 w-px bg-line sm:start-7 lg:start-1/2"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute start-[17px] top-0 h-14 w-[7px] bg-brand-accent sm:start-[25px] lg:start-[calc(50%-3px)]"
            />

            {content.items.map((item, index) => {
              const Icon = outputIcons[item.id] ?? Target;
              const isFirstColumn = index % 2 === 0;
              const isNotLastRow = index < content.items.length - 2;

              return (
                <article
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 38}ms` }}
                  className={`group relative min-w-0 ps-11 pe-4 py-5 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-[color-mix(in_srgb,var(--dnh-primary)_3%,transparent)] sm:ps-14 sm:pe-6 sm:py-6 lg:min-h-[174px] lg:px-8 lg:py-7 ${
                    isFirstColumn ? "lg:border-e lg:border-line" : ""
                  } ${isNotLastRow ? "border-b border-line" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute start-[17px] top-7 z-10 h-2.5 w-2.5 border-2 border-page bg-brand-primary transition-[background-color,transform] duration-300 motion-reduce:transition-none group-hover:scale-110 group-hover:bg-brand-accent sm:start-[25px] sm:top-8 lg:hidden"
                  />

                  <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)] sm:size-11"
                    >
                      <Icon size={19} strokeWidth={1.65} />
                    </span>

                    <div className="min-w-0 text-start">
                      <h3
                        className={`text-[16px] font-extrabold text-ink [overflow-wrap:break-word] sm:text-[17px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.35]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2.5 max-w-[58ch] text-[13px] text-ink-muted sm:text-[14px] ${
                          isRTL ? "leading-[1.95]" : "leading-[1.68]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-line lg:block ${
                      isFirstColumn ? "end-0" : "start-0"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 hidden size-2.5 -translate-y-1/2 border-2 border-page bg-brand-primary transition-[background-color,transform] duration-300 motion-reduce:transition-none group-hover:scale-110 group-hover:bg-brand-accent lg:block ${
                      isFirstColumn ? "-end-[5px]" : "-start-[5px]"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-x-100"
                  />
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-framework-reveal=""
          className="relative mt-7 overflow-hidden bg-brand-secondary px-5 py-6 text-white motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-8 sm:px-7 sm:py-7 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-8"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
          />

          <p
            className={`max-w-[80ch] text-start text-[14px] text-white/78 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {content.closing}
          </p>

          <div className="mt-5 min-w-0 lg:mt-0">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant="assessment"
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
