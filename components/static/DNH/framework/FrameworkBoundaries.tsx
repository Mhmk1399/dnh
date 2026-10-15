"use client";

import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CircleOff,
  Copy,
  LineChart,
  LockKeyhole,
  Scale,
  ShieldX,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkBoundaryItem = {
  id: string;
  title: string;
  description: string;
};

type FrameworkBoundariesContent = {
  order: number;
  id: "what-framework-is-not";
  type: "boundaries";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: FrameworkBoundaryItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const boundaryIcons: Record<string, LucideIcon> = {
  "not-trading-system": Activity,
  "not-buy-sell-signal": CircleOff,
  "not-certain-price-prediction": LineChart,
  "not-return-guarantee": ShieldX,
  "not-professional-judgment-replacement": Scale,
  "not-public-copyable-formula": LockKeyhole,
};

export function FrameworkBoundaries() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "what-framework-is-not" && section.type === "boundaries",
  ) as FrameworkBoundariesContent | undefined;

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
      aria-labelledby="framework-boundaries-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-white/10 bg-brand-secondary py-14 text-white sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 hidden w-[34vw] max-w-[34rem] border-s border-white/[0.06] lg:block"
      />

      <div className="dnh-site-shell relative">
        <header className="relative grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] lg:items-end lg:gap-14 xl:gap-20">
          <div
            data-framework-reveal=""
            className="relative min-w-0 text-start motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
              />

              <div className="min-w-0">
                <p className="text-start text-[12px] font-extrabold leading-[1.8] text-white sm:text-[13px]">
                  {content.eyebrow}
                </p>
              </div>
            </div>

            <h2
              id="framework-boundaries-heading"
              className={`mt-5 max-w-[29ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.45rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.9rem)] lg:text-[clamp(2.55rem,3vw,3.15rem)] ${
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

          <div
            data-framework-reveal=""
            className="relative min-w-0 border-s border-white/18 ps-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-6"
          >
            <span
              aria-hidden="true"
              className="absolute -start-[3px] top-0 h-12 w-[5px] bg-brand-accent"
            />

            <p
              className={`max-w-[62ch] text-start text-[14px] text-white/68 sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div
          data-framework-reveal=""
          className="relative mt-10 overflow-hidden border-y border-white/14 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 lg:mt-12"
        >
          <div className="relative grid min-w-0 lg:grid-cols-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px bg-white/10 lg:block"
            />

            {content.items.map((item, index) => {
              const Icon = boundaryIcons[item.id] ?? CircleOff;
              const hasBottomBorder = index < content.items.length - 2;
              const isStartColumn = index % 2 === 0;

              return (
                <article
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 42}ms` }}
                  className={`group relative min-w-0 px-0 py-6 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:py-7 lg:min-h-[188px] lg:px-7 lg:py-8 xl:px-8 ${
                    hasBottomBorder ? "border-b border-white/10" : ""
                  } ${isStartColumn ? "lg:pe-9" : "lg:ps-9"}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 start-0 w-[3px] scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100 lg:hidden"
                  />

                  <div className="flex min-w-0 items-start gap-4 px-1 sm:gap-5 sm:px-0">
                    <span
                      aria-hidden="true"
                      className="relative flex size-11 shrink-0 items-center justify-center border border-white/18 bg-white/[0.035] text-white/72 transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:border-brand-accent/70 group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)]"
                    >
                      <Icon size={19} strokeWidth={1.6} />
                    </span>

                    <div className="min-w-0 text-start">
                      <h3
                        className={`text-[16px] font-extrabold text-white [overflow-wrap:break-word] sm:text-[17px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.35]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2.5 max-w-[62ch] text-[13px] text-white/58 sm:text-[14px] ${
                          isRTL ? "leading-[1.95]" : "leading-[1.68]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-0 hidden h-[3px] w-14 origin-center scale-x-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-x-100 lg:block ${
                      isStartColumn ? "end-7 xl:end-8" : "start-7 xl:start-8"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-framework-reveal=""
          className="relative mt-8 overflow-hidden bg-page px-5 py-6 text-ink shadow-[0_24px_70px_color-mix(in_srgb,var(--dnh-primary)_14%,transparent)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:px-7 sm:py-7 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-8"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
          />

          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <Copy
                aria-hidden="true"
                size={18}
                strokeWidth={1.6}
                className="mt-1 shrink-0 text-brand-primary"
              />
              <p
                className={`max-w-[80ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${
                  isRTL ? "leading-[2]" : "leading-[1.75]"
                }`}
              >
                {content.closing}
              </p>
            </div>
          </div>

          <div className="mt-5 min-w-0 lg:mt-0">
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
