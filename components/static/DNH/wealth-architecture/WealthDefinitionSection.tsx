import Image from "next/image";

import {
  WealthActions,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getItems,
  getParagraphs,
  getWealthIcon,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function WealthDefinitionSection({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-definition-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] py-14 text-white sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="dnh-site-shell relative z-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.85fr)] lg:items-stretch lg:gap-12">
          <div className="min-w-0">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="wealth-definition-heading"
              dark
            />

            <div className="mt-6 space-y-4">
              {paragraphs.slice(0, 2).map((paragraph) => (
                <WealthParagraph
                  key={paragraph.id}
                  direction={direction}
                  dark
                  className="border-s border-white/20 ps-4"
                >
                  <WealthRichText text={paragraph.text} />
                </WealthParagraph>
              ))}
            </div>
          </div>

          {media?.src ? (
            <div className="relative aspect-[4/5] min-h-[430px] overflow-hidden border border-white/16 bg-brand-primary lg:min-h-[560px] lg:aspect-auto">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 24px), 38vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
              />
              <span aria-hidden="true" className="absolute end-5 top-5 size-5 bg-brand-accent" />
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid min-w-0 grid-cols-1 border-s border-t border-white/14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getWealthIcon(item.icon);
            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-white/14 bg-white/[0.035] p-5 transition-colors duration-200 hover:bg-white/[0.07] sm:p-6"
              >
                <Icon
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.55}
                  className="text-brand-accent"
                />
                <h3
                  className={`mt-4 text-start text-[17px] font-black text-white sm:text-[18px] ${
                    direction === "rtl" ? "leading-[1.65]" : "leading-[1.38]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-start text-[13px] text-white/58 sm:text-[14px] ${
                    direction === "rtl" ? "leading-[1.9]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="grid gap-4 md:grid-cols-2">
            {paragraphs.slice(2).map((paragraph) => (
              <WealthParagraph
                key={paragraph.id}
                direction={direction}
                dark
                className="border-s-2 border-brand-accent ps-4"
              >
                <WealthRichText text={paragraph.text} />
              </WealthParagraph>
            ))}
          </div>
          <WealthActions ctas={section.ctas} direction={direction} dark />
        </div>
      </div>
    </section>
  );
}
