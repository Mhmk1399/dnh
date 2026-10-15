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

export function WealthOutcomesSection({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-outcomes-heading"
      className="relative overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.22fr)_minmax(360px,0.78fr)] lg:items-stretch lg:gap-12">
          <div className="min-w-0">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="wealth-outcomes-heading"
            />
            {paragraphs[0] ? (
              <WealthParagraph
                direction={direction}
                className="mt-6 border-s-2 border-brand-primary ps-4"
              >
                <WealthRichText text={paragraphs[0].text} />
              </WealthParagraph>
            ) : null}

            <div className="mt-7 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2">
              {items.map((item, index) => {
                const Icon = getWealthIcon(item.icon);
                return (
                  <article
                    key={item.id}
                    className={`min-w-0 border-b border-e border-line p-5 ${
                      index === items.length - 1 && items.length % 2 === 1
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center bg-surface-soft text-brand-primary">
                        <Icon aria-hidden="true" size={20} strokeWidth={1.55} />
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-start text-[16px] font-black ${
                            direction === "rtl" ? "leading-[1.7]" : "leading-[1.4]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 text-start text-[13px] text-ink-muted ${
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
            <div className="relative aspect-[4/5] min-h-[430px] overflow-hidden border border-line bg-surface-soft lg:min-h-[680px] lg:aspect-auto">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 24px), 35vw"
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

        <footer className="mt-7 grid gap-5 border-t border-line pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {paragraphs[1] ? (
            <WealthParagraph
              direction={direction}
              className="border-s-2 border-brand-accent ps-4"
            >
              <WealthRichText text={paragraphs[1].text} />
            </WealthParagraph>
          ) : null}
          <WealthActions ctas={section.ctas} direction={direction} />
        </footer>
      </div>
    </section>
  );
}
