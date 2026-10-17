"use client";

import Image from "next/image";

import {
  BodyText,
  SectionCtas,
  SectionHeading,
  SectionMeta,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceHeroSection({
  section,
  direction,
  isRTL,
  media,
  ctaTargets,
}: ServiceSectionViewProps) {
  const lead = [section.intro, ...section.body].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby={`${section.id}-heading`}
      className="relative isolate overflow-hidden border-b border-white/10 text-white"
      style={{
        background:
          "linear-gradient(135deg, #071f27 0%, #0a3441 34%, #0f5c73 68%, #167394 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 22%, rgba(252,133,2,0.16), transparent 26%), radial-gradient(circle at 18% 78%, rgba(21,114,147,0.30), transparent 32%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/35 to-transparent"
      />

      <div className="dnh-site-shell relative pt-[7.75rem] pb-12 sm:pt-[8.5rem] sm:pb-14 lg:pt-[9.5rem] lg:pb-16 xl:pb-20">
        <div dir="ltr" className="grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 lg:order-1 lg:col-start-1">
            {media ? (
              <div className="relative min-h-[300px] overflow-hidden border border-white/18 bg-white/[0.05] sm:min-h-[380px] lg:min-h-[520px] xl:min-h-[560px]">
                <picture>
                  {media.mobileSrc ? (
                    <source media="(max-width: 767px)" srcSet={media.mobileSrc} />
                  ) : null}
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    priority
                    sizes={media.sizes ?? "(max-width: 1024px) 100vw, 42vw"}
                    className="object-cover"
                    style={{ objectPosition: media.objectPosition ?? "center" }}
                  />
                </picture>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071f27]/48 via-transparent to-black/10"
                />
                <span aria-hidden="true" className="absolute inset-y-0 end-0 w-[4px] bg-brand-accent" />
              </div>
            ) : (
              <div className="min-h-[300px] border border-white/18 bg-white/[0.05] sm:min-h-[380px] lg:min-h-[520px]" />
            )}
          </div>

          <div dir={direction} className="order-1 min-w-0 lg:order-2 lg:col-start-2">
            <SectionMeta section={section} light />
            <SectionHeading
              id={`${section.id}-heading`}
              isRTL={isRTL}
              light
              hero
              className="mt-5 max-w-[26ch]"
            >
              {section.heading}
            </SectionHeading>

            <div className="mt-6 max-w-[48rem] space-y-3">
              {lead.slice(0, 3).map((paragraph, index) => (
                <BodyText
                  key={`${paragraph}-${index}`}
                  isRTL={isRTL}
                  light
                  strong={index === 0}
                >
                  {paragraph}
                </BodyText>
              ))}
            </div>

            <div className="mt-7">
              <SectionCtas
                ctas={section.ctas}
                targets={ctaTargets}
                isRTL={isRTL}
                light
              />
            </div>

            {lead.length > 3 ? (
              <div className="mt-6 grid gap-3 border-t border-white/16 pt-5 sm:grid-cols-2">
                {lead.slice(3).map((paragraph, index) => (
                  <BodyText key={`${paragraph}-${index}`} isRTL={isRTL} light>
                    {paragraph}
                  </BodyText>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
