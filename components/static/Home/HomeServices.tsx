"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Globe,
  Landmark,
  Layers,
  Presentation,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const serviceIcons = {
  wealth: Landmark,
  portfolio: Layers,
  advisory: BriefcaseBusiness,
  market: Globe,
  risk: ShieldCheck,
  briefing: Presentation,
} as const;

type ServiceIconKey = keyof typeof serviceIcons;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ServiceIconKey;
};

type ServicesContent = {
  id: "services";
  type: "service_cards";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  services: ServiceItem[];
};

export function HomeServices() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "services" && section.type === "service_cards",
  ) as ServicesContent | undefined;

  // Progressive enhancement: HTML and content are visible without JS.
  // Only cards still below the viewport are animated, once, on entry.
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

    root.querySelectorAll<HTMLElement>("[data-service-reveal]").forEach((card) => {
      card.removeAttribute("data-reveal");

      if (card.getBoundingClientRect().top > window.innerHeight - 40) {
        card.dataset.reveal = "pending";
        waiting.add(card);
      }
    });

    if (waiting.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target as HTMLElement;
          card.dataset.reveal = "shown";
          observer.unobserve(card);
          waiting.delete(card);
        });

        if (waiting.size === 0) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    waiting.forEach((card) => observer.observe(card));
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
      aria-labelledby="home-services-heading"
      className="relative isolate overflow-x-clip border-t border-line bg-surface-soft py-16 text-ink sm:py-20 md:py-24 xl:py-28"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 items-start gap-9 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.76fr)] lg:gap-12 xl:gap-16">
          <header className="min-w-0 text-start lg:sticky lg:top-28 lg:self-start lg:flex lg:min-h-[min(34rem,calc(100svh-10rem))] lg:flex-col lg:justify-center lg:py-6">
            <div className="flex items-center gap-3 text-[12px] font-semibold leading-[1.8] text-brand-primary sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-px w-9 shrink-0 bg-brand-accent sm:w-12"
              />
              <p className="min-w-0">{content.eyebrow}</p>
            </div>

            <h2
              id="home-services-heading"
              className="mt-5 max-w-[24ch] text-pretty text-start text-[clamp(1.875rem,7vw,2.25rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-6 md:max-w-[26ch] md:text-[clamp(2.25rem,4.7vw,2.875rem)] md:leading-[1.55] lg:max-w-none lg:text-[clamp(2.625rem,3.35vw,3.375rem)] lg:leading-[1.5]"
            >
              {highlightIndex === -1 ? (
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
              aria-hidden="true"
              className="mt-8 flex items-center gap-2 sm:mt-10 lg:mt-12"
            >
              <span className="h-[2px] w-12 bg-brand-accent" />
              <span className="h-px min-w-0 flex-1 bg-line" />
            </div>
          </header>

          <div className="grid min-w-0 grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Landmark;
              const featured = index === 0;

              return (
                <article
                  key={service.id}
                  data-servi=""
                  className={`group relative flex min-w-0 flex-col overflow-hidden p-5 sm:p-7 lg:p-7 xl:p-8 motion-safe:transition-[opacity,transform,backgroundprimary-color] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-3 motion-safe:data-[reveal=pending]:opacity-0 ${
                    featured
                      ? "bg-brand-primary text-[var(--dnh-text-on-brand)]"
                      : "bg-page text-ink hover:bg-surface-soft"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100 group-focus-within:scale-y-100"
                  />

                  <div className="mb-7 flex items-start justify-between gap-4 sm:mb-8">
                    <span
                      aria-hidden="true"
                      className={`flex size-12 shrink-0 items-center justify-center border sm:size-14 ${
                        featured
                          ? "border-[color-mix(in_srgb,var(--dnh-text-on-brand)_30%,transparent)] bg-brand-secondary/40 text-[var(--dnh-text-on-brand)]"
                          : "border-line bg-surface-soft text-brand-primary"
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.65} />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-6 h-px w-10 shrink-0 sm:w-12 ${
                        featured
                          ? "bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_35%,transparent)]"
                          : "bg-line"
                      }`}
                    />
                  </div>

                  <h3 className="max-w-[28ch] text-start text-[19px] font-bold leading-[1.75] [overflow-wrap:break-word] sm:text-[21px] lg:text-[22px]">
                    {service.title}
                  </h3>

                  <p
                    className={`mt-3 min-w-0 text-start text-[14px] font-normal sm:mt-4 sm:text-[15px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.72]"
                    } ${
                      featured
                        ? "text-[color-mix(in_srgb,var(--dnh-text-on-brand)_90%,transparent)]"
                        : "text-ink-muted"
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="mt-auto min-w-0 pt-7 sm:pt-8">
                    <ActionButton
                      href={service.href}
                      variant="secondary"
                      shape="square"
                      size="md"
                      icon={Arrow}
                      iconPosition="end"
                      dir={direction}
                      className="min-h-11 w-full min-w-0 whitespace-normal text-start text-[13px] [overflow-wrap:anywhere] sm:w-auto sm:max-w-full"
                    >
                      {service.cta}
                    </ActionButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
