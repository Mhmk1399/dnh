"use client";

import {
  EntryGrid,
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceProblemSection({
  section,
  direction,
  isRTL,
  ctaTargets,
}: ServiceSectionViewProps) {
  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-b border-line bg-page"
    >
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} />
        <SectionExtraCopy section={section} isRTL={isRTL} className="mt-7" />
        <div className="mt-8 lg:mt-10">
          <EntryGrid entries={section.entries} isRTL={isRTL} columns={3} />
        </div>
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
