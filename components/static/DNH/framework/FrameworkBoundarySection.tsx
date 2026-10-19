"use client";

import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CircleDollarSign,
  Droplets,
  Landmark,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type DataIntelligenceItem = {
  id: string;
  title: string;
  description: string;
};

type DataIntelligenceContent = {
  order: number;
  id: "data-intelligence";
  type: "framework-pillar";
  code: "D";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{
    id: string;
    text: string;
  }>;
  items: DataIntelligenceItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const itemIcons: Record<string, LucideIcon> = {
  "economic-conditions": Activity,
  "currency-purchasing-power": CircleDollarSign,
  liquidity: Droplets,
  "markets-asset-classes": BarChart3,
  "financial-structure": Landmark,
  "individual-business-context": BriefcaseBusiness,
};

export function FrameworkDataIntelligence() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "data-intelligence" && section.type === "framework-pillar",
  ) as DataIntelligenceContent | undefined;

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
  const narrative = content.paragraphs.slice(0, -1);
  const scopeIntro = content.paragraphs.at(-1);

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="framework-data-intelligence-heading"
      className="relative isolate overflow-x-clip bg-page border-y border-line py-14 text-[var(--dnh-text-on-brand)] sm:py-18 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell relative">
        <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12 xl:gap-16">
          <header className="min-w-0 text-start lg:sticky lg:top-28 lg:self-start">
            <div className="flex min-w-0 items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center border border-[color-mix(in_srgb,var(--dnh-accent)_72%,transparent)] bg-[color-mix(in_srgb,var(--dnh-accent)_10%,transparent)] sm:size-16"
              >
                <bdi
                  dir="ltr"
                  className="text-[28px] font-black leading-none text-brand-accent sm:text-[32px]"
                >
                  {content.code}
                </bdi>
              </span>

              <div className="min-w-0">
                <p className="text-start text-[12px] font-bold leading-[1.8] text-black sm:text-[13px]">
                  {content.eyebrow}
                </p>
              </div>
            </div>

            <h2
              id="framework-data-intelligence-heading"
              className={`mt-5 max-w-[25ch] text-black text-start text-[clamp(1.95rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.9rem)] lg:text-[clamp(2.5rem,3.1vw,3.2rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.15]"
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

            <div
              className={`mt-5 max-w-[102ch] text-black/70 space-y-3.5 border-s border-[color-mix(in_srgb,var(--dnh-accent)_72%,transparent)] ps-4 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_72%,transparent)] sm:mt-6 sm:ps-5 sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {narrative.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>
          </header>

          <div className="min-w-0 lg:border-s lg:border-[color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)] lg:ps-8 xl:ps-10">
            {scopeIntro ? (
              <div className="mb-4 flex min-w-0 items-center gap-3 sm:mb-5">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-9 shrink-0 bg-brand-accent"
                />
                <p
                  className={`min-w-0 text-start text-[13px] font-bold text-black  sm:text-[14px] ${
                    isRTL ? "leading-[1.9]" : "leading-[1.6]"
                  }`}
                >
                  {scopeIntro.text}
                </p>
              </div>
            ) : null}

            <ol className="min-w-0 border-y border-[color-mix(in_srgb,var(--dnh-text-on-brand)_16%,transparent)]">
              {content.items.map((item, index) => {
                const Icon = itemIcons[item.id] ?? Activity;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <li
                    key={item.id}
                    data-framework-reveal=""
                    className="group relative min-w-0 border-b border-black/20 last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-[color-mix(in_srgb,var(--dnh-bg-page)_5%,transparent)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                    />

                    <div className="grid min-w-0 grid-cols-[52px_minmax(0,1fr)] gap-x-4 px-3 py-4 sm:grid-cols-[58px_minmax(0,0.78fr)_minmax(0,1.22fr)] sm:gap-x-5 sm:px-4 sm:py-5 lg:grid-cols-[60px_minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-x-6 lg:px-5">
                      <div className="flex min-w-0 items-start gap-2 sm:flex-col sm:gap-2.5">
                        <span
                          aria-hidden="true"
                          className="flex size-10 shrink-0 items-center justify-center border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_20%,transparent)] text-brand-accent transition-colors duration-300 motion-reduce:transition-none group-hover:border-brand-accent sm:size-11"
                        >
                          <Icon size={19} strokeWidth={1.65} />
                        </span>
                      </div>

                      <h3
                        className={`min-w-0 self-start text-black/80 text-start text-[17px] font-extrabold [overflow-wrap:break-word] sm:pt-1 sm:text-[18px] lg:text-[19px] ${
                          isRTL ? "leading-[1.75]" : "leading-[1.35]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`col-start-2 mt-2 min-w-0 text-start text-[13px] text-black/70 sm:col-start-3 sm:mt-0 sm:pt-1 sm:text-[14px] ${
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
        </div>

        <div
          data-framework-reveal=""
          className="mt-8 grid min-w-0 gap-5 border-t border-[color-mix(in_srgb,var(--dnh-text-on-brand)_18%,transparent)] pt-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-9 sm:pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        >
          <p
            className={`max-w-[94ch] text-start text-[13px] font-semibold text-black/70 sm:text-[14px] ${
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
                className="min-h-11 w-full min-w-0 whitespace-normal bg-brand-accent text-center text-[var(--dnh-text-on-brand)] shadow-none [overflow-wrap:anywhere] hover:bg-brand-primary hover:shadow-none sm:w-auto"
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
