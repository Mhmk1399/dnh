"use client";

import {
  ChecklistGrid,
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceFinalCtaSection({
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
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-white/10 text-white"
      style={{
        background:
          "linear-gradient(135deg, #071f27 0%, #0a4251 52%, #167394 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 82% 18%, rgba(252,133,2,0.13), transparent 24%)" }}
      />
      <div className="dnh-site-shell relative py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} light />
        <SectionExtraCopy section={section} isRTL={isRTL} light className="mt-7" />
        <div className="mt-8 lg:mt-10">
          <ChecklistGrid items={section.checklist} isRTL={isRTL} light />
        </div>
        <SectionClosing closing={section.closing} isRTL={isRTL} light className="mt-7" />
        <div className="mt-7 border-t border-white/16 pt-6">
          <SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} light />
        </div>
      </div>
    </section>
  );
}
