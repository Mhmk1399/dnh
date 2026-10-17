import Image from "next/image";

import {
  WealthActions,
  WealthGridPattern,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getItems,
  getParagraphs,
  getWealthIcon,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function WealthBoundariesSection({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-boundaries-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] py-14 text-white sm:py-18 lg:py-24"
    >
      <WealthGridPattern dark />

      <div className="dnh-site-shell relative z-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:items-stretch lg:gap-12">
          <div className="min-w-0">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="wealth-boundaries-heading"
              dark
            />
            {paragraphs[0] ? (
              <WealthParagraph
                direction={direction}
                dark
                className="mt-6 border-s-2 border-brand-accent ps-4"
              >
                <WealthRichText text={paragraphs[0].text} />
              </WealthParagraph>
            ) : null}

            <div className="mt-7 grid min-w-0 grid-cols-1 border-s border-t border-white/15 sm:grid-cols-2">
              {items.map((item) => {
                const Icon = getWealthIcon(item.icon ?? "x");
                return (
                  <article
                    key={item.id}
                    className="min-w-0 border-b border-e border-white/15 bg-white/[0.035] p-5 transition-colors duration-200 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center border border-white/16 text-brand-accent">
                        <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-start text-[16px] font-black text-white ${
                            direction === "rtl" ? "leading-[1.7]" : "leading-[1.4]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 text-start text-[13px] text-white/58 ${
                            direction === "rtl" ? "leading-[1.9]" : "leading-[1.68]"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {media?.src ? (
            <div className="relative aspect-[4/5] min-h-[430px] overflow-hidden border border-white/16 bg-brand-primary lg:min-h-[650px] lg:aspect-auto">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 24px), 33vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-brand-primary/12"
              />
             </div>
          ) : null}
        </div>

        <footer className="mt-7 grid gap-5 border-t border-white/15 pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {paragraphs[1] ? (
            <WealthParagraph
              direction={direction}
              dark
              className="border-s-2 border-brand-accent ps-4"
            >
              <WealthRichText text={paragraphs[1].text} />
            </WealthParagraph>
          ) : null}
          <WealthActions ctas={section.ctas} direction={direction} dark />
        </footer>
      </div>
    </section>
  );
}
