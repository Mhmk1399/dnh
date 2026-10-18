"use client";

import Image from "next/image";
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
  media: {
    src: string;
    alt: string;
  };
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

    root
      .querySelectorAll<HTMLElement>("[data-service-reveal]")
      .forEach((card) => {
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
      className="relative isolate overflow-x-clip border-t border-line bg-page py-16 text-ink sm:py-20 md:py-24 xl:py-28"
    >
      <div className="dnh-site-shell">
        <div className="min-w-0">
          <header className="mx-auto max-w-[980px] min-w-0 text-center">
            <div className="flex items-center justify-center gap-3 text-[12px] font-semibold leading-[1.8] text-brand-primary sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-px w-9 shrink-0 bg-brand-accent sm:w-9"
              />
              <p className="min-w-0">{content.eyebrow}</p>
            </div>

            <h2
              id="home-services-heading"
              className="mx-auto mt-5  max-w-[24ch] text-pretty text-center text-[clamp(1.875rem,7vw,2.25rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-6 md:max-w-[56ch] md:text-[clamp(2.25rem,4.7vw,2.175rem)] md:leading-[1.55] lg:text-[clamp(2.625rem,3.35vw,2.6rem)] lg:leading-[1.5]"
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
          </header>

          <div className="mt-10 grid min-w-0 grid-cols-1 gap-1 border border-line bg-line sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Landmark;
              const featured = index === 0;

              return (
                <article
                  key={service.id}
                  data-service-reveal=""
                  className="group relative flex min-h-[430px] min-w-0 flex-col overflow-hidden bg-brand-secondary p-5 text-white sm:min-h-[460px] sm:p-7 lg:p-7 xl:p-8 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-3 motion-safe:data-[reveal=pending]:opacity-0"
                >
                  {service.media.src.trim() ? (
                    <Image
                      src={service.media.src.trim()}
                      alt={service.media.alt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(50vw - 24px), calc(33vw - 32px)"
                      className="object-cover group-hover:blur-sm object-center transition-all duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.035]"
                    />
                  ) : null}

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/65 to-ink/95 ${
                      featured ? "opacity-95" : "opacity-90"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 z-20   origin-top scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100 group-focus-within:scale-y-100"
                  />

                  <div className="relative z-10 mb-7 flex items-start justify-between gap-4 sm:mb-8">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center border border-white/30 bg-brand-secondary/65 text-white sm:size-14"
                    >
                      <Icon size={24} strokeWidth={1.65} />
                    </span>
                  </div>

                  <h3 className="relative  pb-3 border-b z-10 max-w-[28ch] text-start text-[19px] font-bold leading-[1.75] [overflow-wrap:break-word] sm:text-[21px] lg:text-[22px] lg:text-nowrap">
                    {service.title}
                  </h3>

                  <p
                    className={`relative z-10 mt-3 min-w-0 text-start text-[14px] font-normal text-white/82 sm:mt-4 sm:text-[15px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.72]"
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="relative z-10 mt-auto min-w-0  ">
                    <ActionButton
                      href={service.href}
                      variant="secondary"
                      shape="square"
                      size="md"
                      iconPosition="end"
                      dir={direction}
                      className="min-h-11 w-full min-w-0 whitespace-normal text-white! border-white/35 bg-black/10! text-start text-[13px] text-brand-primary shadow-none [overflow-wrap:anywhere] hover:border-white hover:bg-page hover:text-brand-primary sm:w-auto sm:max-w-full"
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
