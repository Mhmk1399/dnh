"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type HeroCTA = {
  id: string;
  label: string;
  type: "primary" | "secondary";
  href: string;
};

type HeroContent = {
  id: "dnh-advisory-services-hero";
  type: "hero";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  ctas: HeroCTA[];
  media?: {
    src: string;
    mobile_src?: string;
    alt: string;
    width: number;
    height: number;
  };
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  if (!highlight) return <>{heading}</>;

  const index = heading.indexOf(highlight);
  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-accent">
        {heading.slice(index, index + highlight.length)}
      </span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

export function ServicesHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section) =>
      section.id === "dnh-advisory-services-hero" && section.type === "hero",
  ) as HeroContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const primaryCta = content.ctas?.[0];
  const secondaryCta = content.ctas?.[1];
  const imageSrc = content.media?.src?.trim();

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="services-hero-heading"
      className="relative isolate overflow-hidden border-b border-line bg-[#167394]  text-ink"
    >
   

      <div className="dnh-site-shell relative z-10 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-14 xl:gap-18">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-start">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand-accent"
              />
              <p className="text-[12px] font-bold leading-[1.8] text-white sm:text-[13px]">
                {content.eyebrow}
              </p>
          
            </div>

            <h1
              id="services-hero-heading"
              className={`mt-5 max-w-[14ch] text-pretty text-[clamp(2.2rem,7vw,4rem)] font-black tracking-[-0.04em] text-ink ${
                isRTL ? "leading-[1.45]" : "leading-[1.02]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h1>

            <div className="mt-6 max-w-[62rem] space-y-3 sm:space-y-4">
              {content.paragraphs.slice(0, 2).map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-[14px] text-white sm:text-[15px] lg:text-[16px] ${
                    isRTL ? "leading-[2.05]" : "leading-[1.8]"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {primaryCta ? (
                <ActionButton
                  href={primaryCta.href}
                  variant={primaryCta.type}
                  shape="square"
                  size="lg"
                  icon={Arrow}
                  iconPosition="end"
                  dir={direction}
                  className="min-h-12 w-full sm:w-auto bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none"
                >
                  {primaryCta.label}
                </ActionButton>
              ) : null}

              {secondaryCta ? (
                <ActionButton
                  href={secondaryCta.href}
                  variant={secondaryCta.type}
                  shape="square"
                  size="lg"
                  icon={Arrow}
                  iconPosition="end"
                  dir={direction}
                  className="min-h-12 w-full border-brand-primary bg-page shadow-none hover:bg-surface-soft sm:w-auto"
                >
                  {secondaryCta.label}
                </ActionButton>
              ) : null}
            </div>
          </div>

          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface-soft shadow-[0_24px_80px_rgba(22,115,148,0.10)]">
              <div className="relative aspect-[5/6] min-h-[340px] w-full sm:aspect-[4/5] lg:min-h-[560px]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={content.media?.alt ?? content.heading}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                ) : null}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(16,24,32,0.18)] via-transparent to-transparent"
                />

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/35 bg-white/80 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-primary sm:text-[12px]">
                    DNH Advisory Services
                  </p>
                  <p
                    className={`mt-2 text-[13px] text-ink sm:text-[14px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.7]"
                    }`}
                  >
                    {content.paragraphs[2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
