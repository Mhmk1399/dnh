"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ListChecks, Waves } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type ComparisonItem = {
  id: string;
  text: string;
};

type ComparisonColumn = {
  id: string;
  title: string;
  items: ComparisonItem[];
};

type ComparisonContent = {
  id: "market-noise-vs-structured-decision";
  type: "comparison";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  columns: ComparisonColumn[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeDecisionComparison() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "market-noise-vs-structured-decision" &&
      section.type === "comparison",
  ) as ComparisonContent | undefined;

  // The content is visible in the initial HTML. Motion enhances only elements
  // that are still below the viewport, and each element is observed just once.
  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pending = new Set<HTMLElement>();
    section
      .querySelectorAll<HTMLElement>("[data-comparison-entry]")
      .forEach((element) => {
        element.removeAttribute("data-reveal");
        if (element.getBoundingClientRect().top > window.innerHeight - 32) {
          element.dataset.reveal = "pending";
          pending.add(element);
        }
      });

    if (pending.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          observer.unobserve(element);
          pending.delete(element);
        }
        if (pending.size === 0) observer.disconnect();
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );

    pending.forEach((element) => observer.observe(element));
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
      aria-labelledby="home-decision-comparison-heading"
      className="relative isolate border-t border-line bg-surface-soft py-12 text-ink sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-4 pb-7 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:items-end md:gap-10 md:pb-9">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 items-center gap-3 text-xs font-semibold leading-[1.8] text-brand-primary sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-[2px] w-8 shrink-0 bg-brand-accent"
              />
              <p>{content.eyebrow}</p>
            </div>
            <h2
              id="home-decision-comparison-heading"
              className="mt-3 max-w-[34ch] text-pretty text-start text-[clamp(1.75rem,6.1vw,2.25rem)] font-extrabold leading-[1.55] [overflow-wrap:break-word] md:text-[clamp(2rem,3.2vw,2.625rem)]"
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
            className={`min-w-0 max-w-[77ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        <div className="grid min-w-0 grid-cols-1 border border-line md:grid-cols-2">
          {content.columns.map((column) => {
            const structured = column.id === "structured";
            const Icon = structured ? ListChecks : Waves;

            return (
              <article
                key={column.id}
                data-comparison-entry=""
                className={`min-w-0 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 ${
                  structured
                    ? "relative bg-[color-mix(in_srgb,var(--dnh-secondary)_24%,var(--dnh-text)_76%)] text-[var(--dnh-text-on-brand)]"
                    : "bg-page text-ink"
                }`}
              >
                <div
                  className={`flex min-w-0 items-center gap-3 border-b px-4 py-4 sm:px-6 md:min-h-[76px] lg:px-8 ${
                    structured ? "border-white/20" : "border-line"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-10 shrink-0 items-center justify-center border ${
                      structured
                        ? "border-white/25 text-brand-accent"
                        : "border-line text-brand-primary"
                    }`}
                  >
                    <Icon size={21} strokeWidth={1.65} />
                  </span>
                  <h3 className="min-w-0 text-start text-[17px] font-bold leading-[1.6] [overflow-wrap:break-word] sm:text-[19px] lg:text-[21px]">
                    {column.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`ms-auto h-px w-8 shrink-0 sm:w-12 ${
                      structured ? "bg-brand-accent" : "bg-line"
                    }`}
                  />
                </div>

                <ol className="min-w-0">
                  {column.items.map((item, index) => (
                    <li
                      key={item.id}
                      className={`group flex min-w-0 items-start gap-3 border-b px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4 lg:px-8 ${
                        structured
                          ? "border-white/15 hover:bg-white/5"
                          : "border-line hover:bg-surface-soft"
                      } motion-safe:transition-colors motion-safe:duration-200`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums leading-[1.8] ${
                          structured
                            ? "text-brand-accent"
                            : "text-brand-primary"
                        }`}
                      >
                        <bdi dir="ltr">
                          {String(index + 1).padStart(2, "0")}
                        </bdi>
                      </span>
                      <span
                        className={`min-w-0 flex-1 text-start text-[14px] font-medium [overflow-wrap:break-word] sm:text-[15px] ${
                          isRTL ? "leading-[1.9]" : "leading-[1.7]"
                        } ${structured ? "text-white/95" : "text-ink"}`}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <footer
          data-comparison-entry=""
          className="grid min-w-0 items-center gap-5 border-b border-s border-e border-line bg-page px-4 py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:px-6 sm:py-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 lg:px-8"
        >
          <p
            className={`min-w-0 max-w-[84ch] border-s-2 border-brand-accent ps-3 text-start text-[14px] text-ink-muted sm:ps-4 sm:text-[15px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
            }`}
          >
            {content.closing}
          </p>
          <div className="flex min-w-0 flex-wrap items-center gap-3">
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
