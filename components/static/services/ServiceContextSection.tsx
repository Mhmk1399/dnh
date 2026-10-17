"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type ServiceCardContent = {
  id: "private-wealth-strategy";
  type: "service-card";
  service_slug: string;
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
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

export function ServicesPrivateWealthStrategy() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section: SectionLookup) =>
      section.id === "private-wealth-strategy" &&
      section.type === "service-card",
  ) as ServiceCardContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const primaryCta = content.ctas?.[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="private-wealth-strategy-heading"
      className="border-b border-line bg-page py-14 text-ink sm:py-16 lg:py-20"
    >
      <div className="dnh-site-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)] lg:gap-14 xl:gap-18">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand-accent"
              />
              <p className="text-[12px] font-bold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
            
            </div>

            <h2
              id="private-wealth-strategy-heading"
              className={`mt-5 max-w-[18ch] text-pretty text-[clamp(1.95rem,5vw,3.5rem)] font-black tracking-[-0.035em] ${
                isRTL ? "leading-[1.5]" : "leading-[1.08]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>

            <div className="mt-6 space-y-4">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`max-w-[58rem] text-[14px] text-ink-muted sm:text-[15px] lg:text-[16px] ${
                    isRTL ? "leading-[2]" : "leading-[1.8]"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {primaryCta ? (
              <div className="mt-7">
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
              </div>
            ) : null}
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative overflow-hidden   border border-line bg-surface-soft shadow-[0_24px_80px_rgba(22,115,148,0.10)]">
              <div className="relative aspect-[4/5] min-h-[320px] w-full lg:min-h-[560px]">
                {content.media?.src ? (
                  <Image
                    src={content.media.src}
                    alt={content.media.alt || content.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
