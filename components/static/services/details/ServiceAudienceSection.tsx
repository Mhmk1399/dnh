"use client";

import {
  EntryGrid,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceAudienceSection({
  section,
  direction,
  isRTL,
  ctaTargets,
}: ServiceSectionViewProps) {
  return (
    <section id={section.id} dir={direction} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28 border-b border-white/12 bg-[#0b4655] text-white">
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} light />
        <SectionExtraCopy section={section} isRTL={isRTL} light className="mt-7" />
        <div className="mt-8 lg:mt-10">
          <EntryGrid entries={section.entries} isRTL={isRTL} light columns={3} />
        </div>
        <div className="mt-7 border-t border-white/16 pt-6">
          <SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} light />
        </div>
      </div>
    </section>
  );
}
