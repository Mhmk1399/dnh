import {
  WealthActions,
  WealthGridPattern,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getItems,
  getParagraphs,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

const frameworkLetters = ["D", "N", "H"] as const;

export function DnhApproachSection({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="dnh-approach-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-page py-14   sm:py-18 lg:py-24"
    >
      <WealthGridPattern dark />

      <div className="dnh-site-shell relative z-10">
        <div className="mx-auto max-w-[980px]">
          <WealthSectionHeader
            section={section}
            direction={direction}
            headingId="dnh-approach-heading"
             
            centered
          />

          <div className="mx-auto mt-6 grid max-w-[900px] gap-4 md:grid-cols-2">
            {paragraphs.slice(0, 2).map((paragraph) => (
              <WealthParagraph
                key={paragraph.id}
                direction={direction}
                 
                className="border-s border-white/20 ps-4"
              >
                <WealthRichText text={paragraph.text} />
              </WealthParagraph>
            ))}
          </div>
        </div>

        <div className="mt-9 grid min-w-0 grid-cols-1  border-s border-t border-white/15 lg:grid-cols-3">
          {items.map((item, index) => {
            const letter = frameworkLetters[index] ?? String(index + 1);

            return (
              <article
                key={item.id}
                className="group relative min-w-0 border-b border-e border-white/15 bg-white/[0.035] p-6 transition-colors duration-200 hover:bg-white/[0.07] sm:p-8"
              >
                <bdi
                  dir="ltr"
                  aria-hidden="true"
                  className="block font-serif text-[72px] leading-none text-black/13 transition-colors duration-200 group-hover:text-brand-accent/65 sm:text-[92px]"
                >
                  {letter}
                </bdi>

                <h3
                  className={`mt-4 text-start text-[20px] font-black text-black sm:text-[22px] ${
                    direction === "rtl" ? "leading-[1.65]" : "leading-[1.3]"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mt-5 text-start text-[14px] text-black/62 ${
                    direction === "rtl" ? "leading-[1.95]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <footer className="mt-8 grid gap-6 border-t border-white/15  pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="grid gap-4 md:grid-cols-2">
            {paragraphs.slice(2).map((paragraph) => (
              <WealthParagraph
                key={paragraph.id}
                direction={direction}
                dark
                className="border-s-2 border-brand-accent text-black/50! ps-4"
              >
                <WealthRichText text={paragraph.text} />
              </WealthParagraph>
            ))}
          </div>
          <WealthActions ctas={section.ctas} direction={direction} dark />
        </footer>
      </div>
    </section>
  );
}
