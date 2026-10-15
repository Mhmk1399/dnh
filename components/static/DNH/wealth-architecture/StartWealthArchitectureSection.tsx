import Image from "next/image";

import {
  WealthActions,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getParagraphs,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function StartWealthArchitectureSection({
  section,
  direction,
}: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="start-wealth-architecture-heading"
      className="relative isolate overflow-hidden bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-8 py-14 sm:py-18 lg:min-h-[760px] lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)] lg:items-center lg:gap-12 lg:py-24">
        <div className="contents lg:block lg:col-start-1 lg:row-start-1">
          <div className="order-1">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="start-wealth-architecture-heading"
              dark
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {paragraphs.map((paragraph) => (
                <WealthParagraph
                  key={paragraph.id}
                  direction={direction}
                  dark
                  className="border-s border-white/20 ps-4 text-[13px] sm:text-[14px]"
                >
                  <WealthRichText text={paragraph.text} />
                </WealthParagraph>
              ))}
            </div>
          </div>

          <WealthActions
            ctas={section.ctas}
            direction={direction}
            dark
            className="order-3 mt-0 lg:mt-8"
          />
        </div>

        {media?.src ? (
          <div className="relative order-2 aspect-[4/5] min-h-[430px] overflow-hidden border border-white/16 bg-brand-primary lg:col-start-2 lg:row-start-1 lg:min-h-[610px] lg:aspect-auto">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 24px), 40vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-brand-primary/12"
            />
            <span aria-hidden="true" className="absolute end-6 top-6 size-6 bg-brand-accent" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
