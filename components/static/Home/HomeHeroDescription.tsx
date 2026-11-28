"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function HomeHeroDescription({
  paragraphs,
  isRTL,
}: {
  paragraphs: { id: string; text: string }[];
  isRTL: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const collapsedHeight = isRTL ? "6.9em" : "6.4em";

  return (
    <div
      className={`relative mt-1 hidden min-w-0 border-s-2 border-white/40 ps-4 text-[14px] font-normal text-white/90 sm:ps-5 sm:text-[15px] lg:mt-5 lg:block lg:max-w-[80ch] ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}
    >
      <div
        id="hero-description"
        className="relative grid min-w-0 overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: `minmax(${collapsedHeight}, ${expanded ? 1 : 0}fr)` }}
      >
        <div className="min-h-0 space-y-3 overflow-hidden text-justify sm:space-y-4">
          {paragraphs.map((paragraph) => <p key={paragraph.id}>{paragraph.text}</p>)}
        </div>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent via-brand-secondary/75 to-brand-secondary transition-opacity duration-300 sm:h-18 lg:h-20 motion-reduce:transition-none ${expanded ? "opacity-0" : "opacity-100"}`}
        />
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="hero-description"
        onClick={() => setExpanded((current) => !current)}
        className="mt-2 inline-flex min-h-10 items-center gap-2 bg-transparent text-[13px] font-semibold text-brand-accent transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent sm:mt-3"
      >
        {expanded
          ? isRTL ? "نمایش کمتر" : "Show less"
          : isRTL ? "مشاهده بیشتر" : "Read more"}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${expanded ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  );
}
