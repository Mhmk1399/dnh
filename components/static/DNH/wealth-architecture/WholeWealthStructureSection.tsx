import Image from "next/image";

import {
  WealthActions,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getItems,
  getParagraphs,
  getQuestions,
  getWealthIcon,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function WholeWealthStructureSection({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const questions = getQuestions(section);
  const media = section.media;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="whole-wealth-structure-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell relative z-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.78fr)] lg:items-stretch lg:gap-12">
          <div className="min-w-0">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="whole-wealth-structure-heading"
            />
            <div className="mt-6 space-y-4">
              {paragraphs.slice(0, 2).map((paragraph) => (
                <WealthParagraph
                  key={paragraph.id}
                  direction={direction}
                  className="border-s-2 border-brand-primary ps-4"
                >
                  <WealthRichText text={paragraph.text} />
                </WealthParagraph>
              ))}
            </div>
          </div>

          {media?.src ? (
            <div className="relative aspect-[4/5] min-h-[430px] overflow-hidden border border-line bg-surface-soft lg:min-h-[550px] lg:aspect-auto">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1023px) calc(100vw - 24px), 35vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/32 via-transparent to-transparent"
              />
              <span aria-hidden="true" className="absolute end-5 top-5 size-5 bg-brand-accent" />
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = getWealthIcon(item.icon);
            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-line bg-page p-5 transition-colors duration-200 hover:bg-surface-soft"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center bg-surface-soft text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white"
                >
                  <Icon size={20} strokeWidth={1.55} />
                </span>
                <h3
                  className={`mt-4 text-start text-[16px] font-black sm:text-[17px] ${
                    direction === "rtl" ? "leading-[1.65]" : "leading-[1.38]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-start text-[13px] text-ink-muted ${
                    direction === "rtl" ? "leading-[1.9]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-7 border border-line bg-surface-soft p-5 sm:p-6">
          {paragraphs[2] ? (
            <WealthParagraph direction={direction} className="font-bold text-ink">
              <WealthRichText text={paragraphs[2].text} />
            </WealthParagraph>
          ) : null}
          <ol className="mt-5 grid min-w-0 grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-5">
            {questions.map((question, index) => (
              <li
                key={question.id}
                className="min-w-0 border-b border-e border-line bg-page p-4 text-start"
              >
                <bdi
                  dir="ltr"
                  className="text-[12px] font-black text-brand-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </bdi>
                <p
                  className={`mt-3 text-[13px] font-bold text-ink ${
                    direction === "rtl" ? "leading-[1.75]" : "leading-[1.45]"
                  }`}
                >
                  {question.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <footer className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {paragraphs[3] ? (
            <WealthParagraph
              direction={direction}
              className="border-s-2 border-brand-accent ps-4"
            >
              <WealthRichText text={paragraphs[3].text} />
            </WealthParagraph>
          ) : null}
          <WealthActions ctas={section.ctas} direction={direction} />
        </footer>
      </div>
    </section>
  );
}
