"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  Landmark,
  Layers,
  PieChart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkApplicationItem = {
  id: string;
  title: string;
  description: string;
};

type FrameworkApplicationsContent = {
  order: number;
  id: "where-framework-is-applied";
  type: "applications";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: FrameworkApplicationItem[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const applicationIcons: Record<string, LucideIcon> = {
  "wealth-architecture": Layers,
  "portfolio-intelligence": PieChart,
  "important-financial-decision": ArrowLeftRight,
  "business-capital-liquidity": Building2,
  "risk-wealth-protection": ShieldCheck,
  "macro-market": Globe2,
  "executive-decisions": BriefcaseBusiness,
};

export function FrameworkApplications() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "where-framework-is-applied" &&
      section.type === "applications",
  ) as FrameworkApplicationsContent | undefined;

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
      aria-labelledby="framework-applications-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-page py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-65"
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
              id="framework-applications-heading"
              className={`mt-5 max-w-[29ch] text-pretty text-start text-[clamp(1.9rem,7vw,2.4rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.85rem)] lg:text-[clamp(2.55rem,3vw,3.15rem)] ${
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

          <p
            data-framework-reveal=""
            className={`max-w-[68ch] border-s-2 border-brand-primary ps-4 text-start text-[14px] text-ink-muted motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        <div
          data-framework-reveal=""
          className="relative mt-9 overflow-hidden border border-[color-mix(in_srgb,var(--dnh-secondary)_34%,var(--dnh-text))] bg-[color-mix(in_srgb,var(--dnh-secondary)_48%,var(--dnh-text))] text-white shadow-[0_24px_70px_color-mix(in_srgb,var(--dnh-primary)_14%,transparent)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-10 lg:mt-12"
        >
          <div className="relative border-b border-white/12 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="flex min-w-0 items-center justify-between gap-5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center border border-white/20 bg-white/[0.055] text-[12px] font-black text-brand-accent sm:size-11 sm:text-[13px]"
                >
                  {framework.brand}
                </span>

             
              </div>

              <span
                aria-hidden="true"
                className="h-px min-w-8 flex-1 bg-gradient-to-r from-white/0 via-white/16 to-brand-accent/60"
              />
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 start-[21px] top-0 w-px bg-white/14 sm:start-[29px] lg:start-[calc(36%+28px)]"
            />

            {content.items.map((item, index) => {
              const Icon = applicationIcons[item.id] ?? Landmark;

              return (
                <article
                  key={item.id}
                  data-framework-reveal=""
                  style={{ transitionDelay: `${index * 42}ms` }}
                  className="group relative grid min-w-0 grid-cols-[44px_minmax(0,1fr)] border-b border-white/10 px-4 py-5 last:border-b-0 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 hover:bg-white/[0.035] sm:grid-cols-[56px_minmax(0,1fr)] sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,36%)_56px_minmax(0,1fr)] lg:px-8 lg:py-0"
                >
                  <div className="hidden min-w-0 items-center pe-7 text-start lg:flex lg:min-h-[112px] xl:min-h-[118px]">
                    <h3
                      className={`max-w-[42ch] text-[16px] font-extrabold text-white [overflow-wrap:break-word] xl:text-[17px] ${
                        isRTL ? "leading-[1.75]" : "leading-[1.35]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="relative z-10 col-start-1 row-span-2 flex items-start justify-center sm:pt-0.5 lg:col-start-2 lg:row-span-1 lg:items-center lg:pt-0">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center border border-white/20 bg-[color-mix(in_srgb,var(--dnh-secondary)_58%,var(--dnh-text))] text-white transition-[border-color,background-color,color,transform] duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-[var(--dnh-text-on-brand)] sm:size-11"
                    >
                      <Icon size={19} strokeWidth={1.65} />
                    </span>
                  </div>

                  <div className="col-start-2 min-w-0 text-start lg:col-start-3 lg:flex lg:min-h-[112px] lg:items-center lg:ps-7 xl:min-h-[118px]">
                    <div className="min-w-0">
                      <h3
                        className={`text-[16px] font-extrabold text-white [overflow-wrap:break-word] sm:text-[17px] lg:hidden ${
                          isRTL ? "leading-[1.75]" : "leading-[1.35]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2 max-w-[84ch] text-[13px] text-white/68 sm:text-[14px] lg:mt-0 ${
                          isRTL ? "leading-[1.95]" : "leading-[1.68]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 start-0 w-[2px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                  />
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-framework-reveal=""
          className="mt-7 flex min-w-0 justify-start border-t border-line pt-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-8 sm:pt-7 lg:justify-end"
        >
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
    </section>
  );
}
