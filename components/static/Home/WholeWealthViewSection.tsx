"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type FrameworkPillar = {
  id: string;
  code: string;
  title: string;
  english_label?: string;
  description: string;
};

type FrameworkContent = {
  id: "dnh-framework";
  type: "framework";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  pillars: FrameworkPillar[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeFramework() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "dnh-framework" && section.type === "framework",
  ) as FrameworkContent | undefined;

  // Keep initial HTML visible. Animate only elements entering from below,
  // once per element, without continuous scroll listeners or extra packages.
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
      .querySelectorAll<HTMLElement>("[data-framework-entry]")
      .forEach((element) => {
        element.removeAttribute("data-reveal");
        if (element.getBoundingClientRect().top > window.innerHeight - 32) {
          element.dataset.reveal = "pending";
          waiting.add(element);
        }
      });

    if (!waiting.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          observer.unobserve(element);
          waiting.delete(element);
        }
        if (!waiting.size) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    waiting.forEach((element) => observer.observe(element));
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
      aria-labelledby="home-framework-heading"
      className="relative isolate border-t border-line bg-[color-mix(in_srgb,var(--dnh-secondary)_24%,var(--dnh-text)_76%)] py-12 text-[var(--dnh-text-on-brand)] sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        <header
          data-framework-entry=""
          className="grid min-w-0 items-end gap-5 pb-7 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:gap-9 md:pb-9 xl:gap-16"
        >
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-8 shrink-0 bg-brand-accent"
              />
              <p className="min-w-0 text-[12px] font-semibold leading-[1.8] sm:text-[13px]">
                {content.eyebrow}
              </p>
              {content.english_label &&
                content.english_label !== content.eyebrow && (
                  <span className="ms-auto text-[11px] font-medium text-[color-mix(in_srgb,var(--dnh-text-on-brand)_65%,transparent)]">
                    <bdi dir="ltr">{content.english_label}</bdi>
                  </span>
                )}
            </div>

            <h2
              id="home-framework-heading"
              className="mt-3 max-w-[28ch] text-pretty text-start text-[clamp(1.8rem,6.3vw,2.25rem)] font-extrabold leading-[1.55] [overflow-wrap:break-word] md:text-[clamp(2rem,3.2vw,2.75rem)]"
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
            className={`min-w-0 max-w-[70ch] border-s border-[color-mix(in_srgb,var(--dnh-text-on-brand)_22%,transparent)] ps-4 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_86%,transparent)] sm:text-[15px] md:ps-6 ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        {/* One continuous architectural structure, not three oversized cards. */}
        <div className="relative border-y border-[color-mix(in_srgb,var(--dnh-text-on-brand)_21%,transparent)]">
          <span
            aria-hidden="true"
            className="absolute start-0 top-[-1px] h-[2px] w-14 bg-brand-accent"
          />

          <ol className="grid min-w-0 lg:grid-cols-3 lg:[&>li+li]:border-s lg:[&>li+li]:border-[color-mix(in_srgb,var(--dnh-text-on-brand)_21%,transparent)]">
            {content.pillars.map((pillar) => (
              <li
                key={pillar.id}
                data-framework-entry=""
                className="group relative grid min-w-0 grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-b border-[color-mix(in_srgb,var(--dnh-text-on-brand)_18%,transparent)] py-5 last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-6 sm:py-6 lg:flex lg:flex-col lg:gap-0 lg:border-b-0 lg:px-7 lg:py-7 lg:hover:bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_4%,transparent)] lg:first:ps-0 lg:last:pe-0 xl:px-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 start-0 h-px w-0 bg-brand-accent motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-16 lg:bottom-auto lg:top-0"
                />

                <div className="flex min-w-0 items-start gap-2.5 lg:items-center lg:gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-3 hidden h-1.5 w-1.5 shrink-0 bg-brand-accent lg:block"
                  />
                  <bdi
                    dir="ltr"
                    className="block text-start text-[clamp(2.45rem,8vw,3.25rem)] font-extrabold leading-none text-[color-mix(in_srgb,var(--dnh-text-on-brand)_92%,transparent)] lg:text-[3.75rem]"
                  >
                    {pillar.code}
                  </bdi>
                </div>

                <div className="min-w-0 lg:mt-5">
                  <h3 className="min-w-0 text-start text-[18px] font-bold leading-[1.6] [overflow-wrap:break-word] sm:text-[20px] lg:text-[21px]">
                    {pillar.title}
                  </h3>

                  {pillar.english_label &&
                    pillar.english_label !== pillar.title && (
                      <p className="mt-0.5 text-start text-[12px] leading-[1.6] text-brand-accent">
                        <bdi dir="ltr">{pillar.english_label}</bdi>
                      </p>
                    )}

                  <p
                    className={`mt-2.5 min-w-0 max-w-[62ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_82%,transparent)] sm:mt-3 sm:text-[15px] ${
                      isRTL ? "leading-[1.9]" : "leading-[1.72]"
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <footer
          data-framework-entry=""
          className="grid min-w-0 items-center gap-5 pt-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
        >
          <p
            className={`min-w-0 max-w-[80ch] border-s-2 border-brand-accent ps-3 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_88%,transparent)] sm:ps-4 sm:text-[15px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.72]"
            }`}
          >
            {content.closing}
          </p>

          <div className="flex min-w-0 flex-wrap gap-3">
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
