"use client";

import {
  EntryGrid,
  FrameworkBand,
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
  const hasSideContent = Boolean(
    section.frameworkLogic || section.closing.length,
  );

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-b border-white/12 bg-brand-secondary text-white"
    >
      <div className="dnh-site-shell py-10 sm:py-12 lg:py-14">
        <SectionIntro
          section={section}
          direction={direction}
          isRTL={isRTL}
          light
          compact
        />
        <SectionExtraCopy
          section={section}
          isRTL={isRTL}
          light
          className="mt-6 lg:grid-cols-3"
        />

        <div className="mt-7 lg:mt-8">
          <EntryGrid
            entries={section.entries}
            isRTL={isRTL}
            light
            columns={3}
            numbered={false}
            compact
          />
        </div>

        <div
          className={`mt-6 grid items-start gap-5 border-t border-white/16 pt-5 ${
            hasSideContent ? "lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8" : ""
          }`}
        >
          {hasSideContent ? (
            <div className="min-w-0">
              <FrameworkBand value={section.frameworkLogic} light />
              <SectionClosing
                closing={section.closing}
                isRTL={isRTL}
                light
                className={section.frameworkLogic ? "mt-4" : ""}
              />
            </div>
          ) : null}
          <div className={hasSideContent ? "lg:pt-0" : ""}>
            <SectionCtas
              ctas={section.ctas}
              targets={ctaTargets}
              isRTL={isRTL}
              light
            />
          </div>
        </div>
      </div>
    </section>
  );
}
