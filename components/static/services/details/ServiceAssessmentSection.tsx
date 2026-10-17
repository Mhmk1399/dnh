"use client";

import Image from "next/image";

import {
  EntryGrid,
  FrameworkBand,
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceAssessmentSection({
  section,
  direction,
  isRTL,
  media,
  ctaTargets,
}: ServiceSectionViewProps) {
  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-b border-line bg-surface-soft"
    >
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} />
        <SectionExtraCopy section={section} isRTL={isRTL} className="mt-7" />

        <div
          className={`mt-8 grid gap-7 lg:mt-10 ${media ? "lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 xl:gap-12" : "grid-cols-1"}`}
        >
          {media ? (
            <div className="relative min-h-[280px] overflow-hidden border border-line bg-page sm:min-h-[360px] lg:min-h-[520px]">
              <picture>
                {media.mobileSrc ? (
                  <source media="(max-width: 767px)" srcSet={media.mobileSrc} />
                ) : null}
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes={media.sizes ?? "(max-width: 1024px) 100vw, 36vw"}
                  className="object-cover"
                  style={{ objectPosition: media.objectPosition ?? "center" }}
                />
              </picture>
            </div>
          ) : null}

          <div className="min-w-0">
            <EntryGrid
              entries={section.entries}
              isRTL={isRTL}
              columns={media ? 2 : 3}
            />
          </div>
        </div>

        {section.frameworkLogic ? (
          <div className="mt-7">
            <FrameworkBand value={section.frameworkLogic} />
          </div>
        ) : null}
        <SectionClosing
          closing={section.closing}
          isRTL={isRTL}
          className="mt-7"
        />
        <div className="mt-6">
          <SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}
