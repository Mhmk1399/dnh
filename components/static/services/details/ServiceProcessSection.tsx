"use client";

import {
  SectionClosing,
  SectionCtas,
  SectionExtraCopy,
  SectionIntro,
} from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

export function ServiceProcessSection({
  section,
  direction,
  isRTL,
  ctaTargets,
}: ServiceSectionViewProps) {
  return (
    <section id={section.id} dir={direction} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28 border-b border-white/12 bg-[#093c49] text-white">
      <div className="dnh-site-shell py-12 sm:py-14 lg:py-16 xl:py-20">
        <SectionIntro section={section} direction={direction} isRTL={isRTL} light />
        <SectionExtraCopy section={section} isRTL={isRTL} light className="mt-7" />

        <ol className="mt-8 grid border-t border-s border-white/18 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4">
          {section.entries.map((entry, index) => (
            <li key={`${entry.title}-${index}`} className="border-e border-b border-white/18 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
              
                <span aria-hidden="true" className="h-px flex-1 bg-white/16" />
              </div>
              <h3 className={`mt-4 text-[15px] font-extrabold text-white sm:text-[16px] ${isRTL ? "leading-[1.85]" : "leading-[1.45]"}`}>
                {entry.title}
              </h3>
         
              {entry.description ? (
                <p className={`mt-3 text-[13px] font-medium text-white/68 sm:text-[14px] ${isRTL ? "leading-[1.95]" : "leading-[1.68]"}`}>
                  {entry.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <SectionClosing closing={section.closing} isRTL={isRTL} light className="mt-7" />
        <div className="mt-7 border-t border-white/16 pt-6"><SectionCtas ctas={section.ctas} targets={ctaTargets} isRTL={isRTL} light /></div>
      </div>
    </section>
  );
}
