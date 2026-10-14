"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type WealthAsset = {
  id: string;
  title: string;
  description: string;
};

type WholeWealthContent = {
  id: "whole-wealth-view";
  type: "asset_roles";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  assets: WealthAsset[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeWholeWealthView() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "whole-wealth-view" && section.type === "asset_roles",
  ) as WholeWealthContent | undefined;

  // Progressive enhancement: text is visible before hydration. Animate only
  // the elements that have not entered the viewport, and observe each once.
  useEffect(() => {
    const root = sectionRef.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pending = new Set<HTMLElement>();

    root.querySelectorAll<HTMLElement>("[data-wealth-entry]").forEach((item) => {
      item.removeAttribute("data-reveal");
      if (item.getBoundingClientRect().top > window.innerHeight - 36) {
        item.dataset.reveal = "pending";
        pending.add(item);
      }
    });

    if (pending.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          pending.delete(element);
          observer.unobserve(element);
        }
        if (pending.size === 0) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
    );

    pending.forEach((item) => observer.observe(item));
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
      aria-labelledby="home-whole-wealth-heading"
      className="relative isolate border-t border-line bg-page py-12 text-ink sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        {/* Editorial introduction: one hierarchy, no oversized empty boxes. */}
        <header className="grid min-w-0 gap-5 pb-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-end md:gap-10 md:pb-9 xl:gap-16">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span aria-hidden="true" className="h-[2px] w-9 shrink-0 bg-brand-accent" />
              <p className="text-[12px] font-semibold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
              {content.english_label && content.english_label !== content.eyebrow && (
                <span className="text-[11px] font-medium leading-[1.6] text-ink-muted">
                  <bdi dir="ltr">{content.english_label}</bdi>
                </span>
              )}
            </div>

            <h2
              id="home-whole-wealth-heading"
              className="mt-4 max-w-[31ch] text-pretty text-start text-[clamp(1.85rem,6.5vw,2.35rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-5 md:text-[clamp(2.15rem,3.45vw,3rem)] md:leading-[1.5]"
            >
              {highlightIndex === -1 ? (
                content.heading
              ) : (
                <>
                  {content.heading.slice(0, highlightIndex)}
                  <span className="text-brand-accent">
                    {content.heading.slice(highlightIndex, highlightIndex + highlight.length)}
                  </span>
                  {content.heading.slice(highlightIndex + highlight.length)}
                </>
              )}
            </h2>
          </div>

          <p
            className={`min-w-0 max-w-[72ch] border-s-2 border-brand-accent ps-4 text-start text-[14px] text-ink-muted sm:text-[15px] md:ps-5 ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        {/* The 7 assets form a 3 / 2 / 2 editorial register on desktop. */}
        <ol className="grid min-w-0 grid-cols-1 gap-x-6 border-t border-line md:grid-cols-2 md:gap-x-8 lg:grid-cols-12 lg:gap-x-9 xl:gap-x-12">
          {content.assets.map((asset, index) => (
            <li
              key={asset.id}
              data-wealth-entry=""
              className={`group relative min-w-0 border-b border-line py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:py-6 lg:py-7 ${
                index < 3 ? "lg:col-span-4" : "lg:col-span-6"
              } ${index === content.assets.length - 1 ? "md:col-span-2 lg:col-span-6" : ""}`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rtl:origin-right bg-brand-accent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />

              <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-line bg-surface-soft text-[12px] font-semibold tabular-nums text-brand-primary transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-secondary motion-reduce:transition-none sm:size-10"
                >
                  <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
                </span>

                <div className="min-w-0 flex-1 text-start">
                  <h3 className="text-[18px] font-bold leading-[1.65] [overflow-wrap:break-word] sm:text-[20px] lg:text-[21px]">
                    {asset.title}
                  </h3>
                  <p
                    className={`mt-1.5 max-w-[65ch] text-[14px] text-ink-muted sm:mt-2 sm:text-[15px] ${
                      isRTL ? "leading-[1.9]" : "leading-[1.7]"
                    }`}
                  >
                    {asset.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* A single anchored conclusion, rather than another decorative card. */}
        <footer
          data-wealth-entry=""
          className="relative mt-7 grid min-w-0 gap-5 bg-[color-mix(in_srgb,var(--dnh-secondary)_24%,var(--dnh-text)_76%)] p-5 text-[var(--dnh-text-on-brand)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-8 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 lg:p-8"
        >
          <span aria-hidden="true" className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent" />
          <p
            className={`min-w-0 max-w-[83ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_90%,transparent)] sm:text-[15px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
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
