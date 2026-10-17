"use client";

import {
  EntryGrid,
  FrameworkBand,
  QuestionList,
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceStrategicViewSection({
  section,
  direction,
  isRTL,
  ctaTargets,
}: ServiceSectionViewProps) {
  const questionLike = section.entries.every((entry) => !entry.description);

  return (
    <section id={section.id} dir={direction} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28 border-b border-line bg-surface-soft">
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} />
        <SectionExtraCopy section={section} isRTL={isRTL} className="mt-7" />
        {section.frameworkLogic ? <div className="mt-7"><FrameworkBand value={section.frameworkLogic} /></div> : null}
        <div className="mt-8 lg:mt-10">
          {questionLike ? (
            <QuestionList entries={section.entries} isRTL={isRTL} />
          ) : (
            <EntryGrid entries={section.entries} isRTL={isRTL} columns={3} />
          )}
        </div>
        <SectionClosing closing={section.closing} isRTL={isRTL} className="mt-7" />
        <div className="mt-6"><SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} /></div>
      </div>
    </section>
  );
}
