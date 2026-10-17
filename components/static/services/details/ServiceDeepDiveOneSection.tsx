"use client";

import {
  FrameworkBand,
  QuestionList,
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceDeepDiveOneSection({
  section,
  direction,
  isRTL,
  ctaTargets,
}: ServiceSectionViewProps) {
  const hasSideContent = Boolean(section.frameworkLogic || section.closing.length);

  return (
    <section id={section.id} dir={direction} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28 border-b border-white/12 bg-brand-secondary text-white">
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} light />
        <SectionExtraCopy section={section} isRTL={isRTL} light className="mt-7" />

        <div className={`mt-8 grid gap-7 lg:mt-10 ${hasSideContent ? "lg:grid-cols-[1.12fr_0.88fr] lg:gap-10" : "grid-cols-1"}`}>
          <QuestionList entries={section.entries} isRTL={isRTL} light />

          {hasSideContent ? (
            <div>
              <FrameworkBand value={section.frameworkLogic} light />
              <SectionClosing closing={section.closing} isRTL={isRTL} light className={section.frameworkLogic ? "mt-6" : ""} />
            </div>
          ) : null}
        </div>

        <div className="mt-7 border-t border-white/16 pt-6">
          <SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} light />
        </div>
      </div>
    </section>
  );
}
