"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  Focus,
  ScanSearch,
  ShieldCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FinalCtaParagraph = {
  id: string;
  text: string;
};

type FinalCtaContent = {
  order: number;
  id: "structured-assessment-cta";
  type: "final-cta";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: FinalCtaParagraph[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

type GateStep = {
  paragraph: FinalCtaParagraph;
  icon: LucideIcon;
};

const stepIcons: Record<string, LucideIcon> = {
  "first-step": Focus,
  assessment: ScanSearch,
  privacy: ShieldCheck,
};

export function FrameworkStructuredAssessmentCTA() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "structured-assessment-cta" &&
      section.type === "final-cta",
  ) as FinalCtaContent | undefined;

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

  const paragraphById = new Map(
    content.paragraphs.map((paragraph) => [paragraph.id, paragraph]),
  );

  const challenge =
    paragraphById.get("challenge") ?? content.paragraphs.at(0) ?? null;
  const nextStep =
    paragraphById.get("next-step") ?? content.paragraphs.at(-1) ?? null;

  const gateSteps = ["first-step", "assessment", "privacy"]
    .map((id) => paragraphById.get(id))
    .filter((paragraph): paragraph is FinalCtaParagraph => Boolean(paragraph))
    .map<GateStep>((paragraph) => ({
      paragraph,
      icon: stepIcons[paragraph.id] ?? ScanSearch,
    }));

  const highlight = content.heading_highlight?.trim() ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const brand = (framework as { brand?: string }).brand ?? "DNH";

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-structured-assessment-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip bg-surface-soft pb-10 pt-14 text-ink sm:pb-12 sm:pt-16 lg:pb-14 lg:pt-20 xl:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]"
      />

      <div className="dnh-site-shell relative">
        <header className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-end lg:gap-14 xl:gap-20">
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
              id="framework-structured-assessment-heading"
              className={`mt-5 max-w-[28ch] text-pretty text-start text-[clamp(1.95rem,7vw,2.5rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.3rem,5vw,3rem)] lg:text-[clamp(2.65rem,3vw,3.35rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.12]"
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

          {challenge ? (
            <div
              data-framework-reveal=""
              className="relative min-w-0 border-s border-brand-primary/30 ps-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-6"
            >
              <span
                aria-hidden="true"
                className="absolute -start-[3px] top-0 h-12 w-[5px] bg-brand-accent"
              />

              <div className="flex items-start gap-3">
                <CircleHelp
                  aria-hidden="true"
                  size={19}
                  strokeWidth={1.6}
                  className="mt-1 shrink-0 text-brand-primary"
                />
                <p
                  className={`max-w-[66ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${
                    isRTL ? "leading-[2]" : "leading-[1.75]"
                  }`}
                >
                  {challenge.text}
                </p>
              </div>
            </div>
          ) : null}
        </header>

        <div
          data-framework-reveal=""
          className="relative mt-10 overflow-hidden border border-line bg-page shadow-[0_26px_80px_color-mix(in_srgb,var(--dnh-primary)_9%,transparent)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-12 lg:mt-14"
        >
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-b border-line px-4 py-4 sm:px-6 lg:px-8">
            <span
              aria-hidden="true"
              className="h-px bg-gradient-to-r from-transparent to-brand-primary/26"
            />

            <span
              aria-hidden="true"
              className="h-px bg-gradient-to-l from-transparent to-brand-primary/26"
            />
          </div>

          <div className="relative grid min-w-0 lg:grid-cols-3">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[16.666%] top-[4.25rem] hidden h-px bg-line lg:block"
            />

            {gateSteps.map(({ paragraph, icon: Icon }, index) => {
              const isCore = paragraph.id === "assessment";

              return (
                <article
                  key={paragraph.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 65}ms` }}
                  className={`group relative min-w-0 border-b border-line px-5 py-7 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:px-7 sm:py-8 lg:min-h-[278px] lg:border-b-0 lg:px-8 lg:py-9 ${
                    index < gateSteps.length - 1
                      ? "lg:border-e lg:border-line"
                      : ""
                  } ${
                    isCore
                      ? "bg-brand-secondary text-white"
                      : "bg-page hover:bg-[color-mix(in_srgb,var(--dnh-primary)_3%,transparent)]"
                  }`}
                >
                  <div className="flex min-w-0 items-center justify-between gap-4">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center border sm:size-12 ${
                        isCore
                          ? "border-brand-accent/70 bg-brand-accent text-[var(--dnh-text-on-brand)]"
                          : "border-brand-primary/22 bg-surface-soft text-brand-primary"
                      }`}
                    >
                      <Icon aria-hidden="true" size={20} strokeWidth={1.65} />
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`mt-6 block h-[3px] w-12 origin-start transition-[width,background-color] duration-300 motion-reduce:transition-none group-hover:w-20 ${
                      isCore
                        ? "bg-brand-accent"
                        : "bg-brand-primary/18 group-hover:bg-brand-accent"
                    }`}
                  />

                  <p
                    className={`mt-5 max-w-[56ch] text-start text-[14px] sm:text-[15px] ${
                      isRTL ? "leading-[2]" : "leading-[1.75]"
                    } ${isCore ? "text-white/78" : "text-ink-muted"}`}
                  >
                    {paragraph.text}
                  </p>

                  {isCore ? (
                    <bdi
                      dir="ltr"
                      aria-hidden="true"
                      className="absolute bottom-5 end-6 text-[10px] font-black tracking-[0.22em] text-white/28 sm:bottom-6 sm:end-7"
                    >
                      D · N · H
                    </bdi>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        {nextStep ? (
          <div
            data-framework-reveal=""
            className="relative mt-8 overflow-hidden bg-brand-secondary text-white shadow-[0_28px_86px_color-mix(in_srgb,var(--dnh-primary)_16%,transparent)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-brand-accent"
            />

            <div className="min-w-0 px-5 py-7 sm:px-7 sm:py-8 lg:flex lg:items-center lg:px-8 xl:px-10">
              <div className="flex min-w-0 items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-10 shrink-0 items-center justify-center border border-white/16 bg-white/[0.045] text-brand-accent"
                >
                  <Waypoints size={19} strokeWidth={1.65} />
                </span>

                <p
                  className={`max-w-[76ch] text-start text-[14px] text-white/72 sm:text-[15px] ${
                    isRTL ? "leading-[2]" : "leading-[1.75]"
                  }`}
                >
                  {nextStep.text}
                </p>
              </div>
            </div>

            <div className="min-w-0 border-t border-white/12 bg-page p-3 text-ink sm:p-4 lg:flex lg:min-w-[21rem] lg:items-center lg:border-s lg:border-t-0 lg:border-line xl:min-w-[24rem]">
              <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {content.ctas.map((cta) => (
                  <ActionButton
                    key={cta.id}
                    href={cta.href}
                    variant={cta.type}
                    size="md"
                    icon={Arrow}
                    iconPosition="end"
                    dir={direction}
                    className="min-h-11 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere]"
                  >
                    {cta.label}
                  </ActionButton>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
