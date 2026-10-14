"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  GitBranch,
  Globe2,
  Landmark,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type InsightCategory = {
  id: string;
  title: string;
  english_label?: string;
  description: string;
};

type InsightsContent = {
  id: "insights";
  type: "insight_categories";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  categories: InsightCategory[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

// Only visual icon identifiers live in code; all wording comes from the JSON.
const categoryIcons = {
  "wealth-architecture": Landmark,
  "financial-decision-making": GitBranch,
  "risk-and-protection": ShieldCheck,
  "asset-allocation": Layers3,
  "economy-inflation-currency": Globe2,
  "behavioral-finance": BrainCircuit,
} as const;

export function HomeInsights() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "insights" && section.type === "insight_categories",
  ) as InsightsContent | undefined;

  // Progressive enhancement: all content is visible in the initial HTML.
  // Animate only offscreen entries, once; reduced motion skips this entirely.
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
      .querySelectorAll<HTMLElement>("[data-insights-entry]")
      .forEach((item) => {
        item.removeAttribute("data-reveal");
        if (item.getBoundingClientRect().top > window.innerHeight - 32) {
          item.dataset.reveal = "pending";
          waiting.add(item);
        }
      });

    if (!waiting.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.dataset.reveal = "shown";
          observer.unobserve(item);
          waiting.delete(item);
        });

        if (!waiting.size) observer.disconnect();
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );

    waiting.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale]);

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-insights-heading"
      className="relative isolate border-t border-line bg-[color-mix(in_srgb,var(--dnh-secondary)_18%,var(--dnh-text)_82%)] py-12 text-[var(--dnh-text-on-brand)] sm:py-14 lg:py-16"
    >
      <div className="dnh-site-shell">
        {/* Compact editorial masthead: the long copy keeps its natural length. */}
        <header className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] md:items-end md:gap-9 lg:gap-14">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent"
              />
              <p className="text-[12px] font-semibold leading-[1.8] sm:text-[13px]">
                {content.eyebrow}
              </p>
              {content.english_label &&
                content.english_label !== content.eyebrow && (
                  <span className="text-[11px] leading-[1.7] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_64%,transparent)]">
                    <bdi dir="ltr">{content.english_label}</bdi>
                  </span>
                )}
            </div>

            <h2
              id="home-insights-heading"
              className="mt-4 max-w-[32ch] text-pretty text-start text-[clamp(1.85rem,6.4vw,2.35rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-5 md:text-[clamp(2.15rem,3.3vw,3rem)] md:leading-[1.52]"
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
            className={`min-w-0 max-w-[76ch] space-y-3 border-s border-[color-mix(in_srgb,var(--dnh-text-on-brand)_25%,transparent)] ps-4 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_84%,transparent)] sm:space-y-4 sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        {/* Six editorial entries; rules and typography instead of heavy cards. */}
        <ol className="mt-8 grid min-w-0 grid-cols-1 border-t border-[color-mix(in_srgb,var(--dnh-text-on-brand)_23%,transparent)] sm:mt-9 md:grid-cols-2 lg:grid-cols-3">
          {content.categories.map((category, index) => {
            const Icon =
              categoryIcons[category.id as keyof typeof categoryIcons] ??
              BookOpenText;

            return (
              <li
                key={category.id}
                data-insights-entry=""
                className="group relative min-w-0 border-b border-[color-mix(in_srgb,var(--dnh-text-on-brand)_19%,transparent)] py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:py-6 md:border-s md:px-5 md:[&:nth-child(2n+1)]:border-s-0 lg:px-7 lg:[&:nth-child(2n+1)]:border-s lg:[&:nth-child(3n+1)]:border-s-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-accent transition-transform duration-300 ease-out group-hover:scale-x-100 rtl:origin-right motion-reduce:transition-none"
                />

                <div className="flex min-w-0 items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_24%,transparent)] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_88%,transparent)] transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-accent motion-reduce:transition-none sm:size-10"
                  >
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[12px] font-semibold tabular-nums text-[color-mix(in_srgb,var(--dnh-text-on-brand)_62%,transparent)]"
                  >
                    <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
                  </span>
                </div>

                <h3 className="mt-3 min-w-0 text-start text-[18px] font-bold leading-[1.6] [overflow-wrap:break-word] sm:text-[19px]">
                  {category.title}
                </h3>

                {category.english_label &&
                  category.english_label !== category.title && (
                    <p className="mt-1 text-start text-[11px] leading-[1.6] text-brand-accent">
                      <bdi dir="ltr">{category.english_label}</bdi>
                    </p>
                  )}

                <p
                  className={`mt-2 max-w-[58ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_81%,transparent)] sm:text-[15px] ${
                    isRTL ? "leading-[1.9]" : "leading-[1.7]"
                  }`}
                >
                  {category.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Closing and single real CTA, without a second oversized panel. */}
        <footer
          data-insights-entry=""
          className="mt-6 flex min-w-0 flex-col gap-5 border-s-[3px] border-brand-accent ps-4 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-7 sm:ps-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <p
            className={`min-w-0 max-w-[85ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_90%,transparent)] sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.closing}
          </p>

          <div className="flex min-w-0 shrink-0 flex-wrap gap-3">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                shape="square"
                size="md"
                icon={Arrow}
                iconPosition="end"
                dir={direction}
                className="min-h-11 w-full min-w-0 max-w-full whitespace-normal text-start text-[13px] [overflow-wrap:anywhere] sm:w-auto"
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
