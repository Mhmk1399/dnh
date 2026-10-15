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

export function WealthArchitectureProcessSection({
  section,
  direction,
}: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-process-heading"
      className="relative overflow-hidden border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(420px,1.14fr)] lg:items-end lg:gap-12">
          <div className="min-w-0">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="wealth-process-heading"
            />
            {paragraphs[0] ? (
              <WealthParagraph
                direction={direction}
                className="mt-6 border-s-2 border-brand-primary ps-4"
              >
                <WealthRichText text={paragraphs[0].text} />
              </WealthParagraph>
            ) : null}
          </div>

          {media?.src ? (
            <div className="relative aspect-[16/8] min-h-[280px] overflow-hidden border border-line bg-brand-primary">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 24px), 54vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/38 via-transparent to-transparent"
              />
              <span aria-hidden="true" className="absolute end-5 top-5 size-5 bg-brand-accent" />
            </div>
          ) : null}
        </div>

        <ol className="relative mt-9 grid min-w-0 grid-cols-1 border-s border-t border-line md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getWealthIcon(item.icon);

            return (
              <li
                key={item.id}
                className={`relative min-w-0 border-b border-e border-line bg-page p-5 sm:p-6 ${
                  items.length % 4 === 3 && index === items.length - 1
                    ? "xl:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center bg-surface-soft text-brand-primary">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.55} />
                  </span>
                  <bdi dir="ltr" className="text-[12px] font-black text-brand-accent">
                    {String(index + 1).padStart(2, "0")}
                  </bdi>
                </div>
                <h3
                  className={`mt-5 text-start text-[17px] font-black text-ink ${
                    direction === "rtl" ? "leading-[1.7]" : "leading-[1.38]"
                  }`}
                >
                  {item.title}
                </h3>
                {item.english_label ? (
                  <bdi
                    dir="ltr"
                    className="mt-2 block text-start text-[9px] font-bold tracking-[0.18em] text-brand-primary/60"
                  >
                    {item.english_label}
                  </bdi>
                ) : null}
                <p
                  className={`mt-3 text-start text-[13px] text-ink-muted ${
                    direction === "rtl" ? "leading-[1.9]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>

        <footer className="mt-7 grid gap-6 border-t border-line pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="grid gap-4 md:grid-cols-2">
            {paragraphs.slice(1).map((paragraph) => (
              <WealthParagraph
                key={paragraph.id}
                direction={direction}
                className="border-s-2 border-brand-accent ps-4"
              >
                <WealthRichText text={paragraph.text} />
              </WealthParagraph>
            ))}
          </div>
          <WealthActions ctas={section.ctas} direction={direction} />
        </footer>
      </div>
    </section>
  );
}
