"use client";

import Image from "next/image";
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

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: keyof typeof serviceIcons;
  media?: { src: string; alt: string };
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
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "services" && section.type === "service_cards",
  ) as ServicesContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-services-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -start-8 top-0 grid grid-cols-3 opacity-70">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className={`size-14 border border-line/60 sm:size-20 ${index % 4 === 0 ? "bg-[color-mix(in_srgb,var(--dnh-primary)_10%,white)]" : "bg-transparent"}`} />
        ))}
      </div>

      <div className="dnh-site-shell relative z-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
            <p>{content.eyebrow}</p>
          </div>
          <h2
            id="home-services-heading"
            className={`mx-auto mt-5 max-w-[22ch] text-pretty text-[clamp(2rem,8vw,3.1rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.75rem,5vw,4rem)] lg:text-[clamp(3.2rem,4.5vw,4.7rem)] ${isRTL ? "leading-[1.45]" : "leading-[1.12]"}`}
          >
            {highlightIndex < 0 ? content.heading : (
              <>
                {content.heading.slice(0, highlightIndex)}
                <span className="text-brand-accent">{content.heading.slice(highlightIndex, highlightIndex + highlight.length)}</span>
                {content.heading.slice(highlightIndex + highlight.length)}
              </>
            )}
          </h2>
        </header>

        <div className="mt-9 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {content.services.map((service) => {
            const Icon = serviceIcons[service.icon] ?? Landmark;
            const imageSrc = service.media?.src.trim() ?? "";

            return (
              <article key={service.id} className="group relative flex min-w-0 flex-col border border-line bg-page transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary motion-reduce:transform-none motion-reduce:transition-none">
                <div className="relative aspect-[16/8] overflow-hidden bg-brand-primary">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.media?.alt ?? ""}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1279px) 48vw, 31vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                  ) : null}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-e from-transparent via-transparent to-ink/45" />
                  <span aria-hidden="true" className="absolute end-4 top-4 size-5 bg-brand-accent" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <div className="flex min-w-0 items-start gap-4">
                    <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center bg-surface-soft text-brand-primary">
                      <Icon size={23} strokeWidth={1.65} />
                    </span>
                    <h3 className={`min-w-0 text-start text-[20px] font-black [overflow-wrap:break-word] sm:text-[22px] ${isRTL ? "leading-[1.65]" : "leading-[1.35]"}`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className={`mt-4 min-w-0 text-start text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}>
                    {service.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <ActionButton
                      href={service.href}
                      variant="secondary"
                      shape="square"
                      size="sm"
                      icon={Arrow}
                      iconPosition="end"
                      dir={direction}
                      className="min-h-11 max-w-full border-0 bg-transparent px-0 text-start text-[13px] text-brand-primary shadow-none hover:bg-transparent hover:shadow-none"
                    >
                      {service.cta}
                    </ActionButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
