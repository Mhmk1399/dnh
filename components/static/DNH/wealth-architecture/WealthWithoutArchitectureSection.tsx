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

export function WealthWithoutArchitectureSection({
  section,
  direction,
}: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);
  const closing = paragraphs.at(-1);

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-without-architecture-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <WealthGridPattern />

      <div className="dnh-site-shell relative z-10">
        <WealthSectionHeader
          section={section}
          direction={direction}
          headingId="wealth-without-architecture-heading"
          centered
          className="max-w-[1080px]"
        />

        <div className="mx-auto mt-6 grid max-w-[1080px] gap-4 md:grid-cols-2">
          {paragraphs.slice(0, 2).map((paragraph) => (
            <WealthParagraph
              key={paragraph.id}
              direction={direction}
              className="border-s-2 border-brand-primary bg-page/90 p-4 ps-5"
            >
              <WealthRichText text={paragraph.text} />
            </WealthParagraph>
          ))}
        </div>

        <div className="mt-9 grid min-w-0 grid-cols-1 border-s border-t border-line sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = getWealthIcon(item.icon);

            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-line bg-page p-5 transition-colors duration-200 hover:bg-surface-soft sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-accent"
                  >
                    <Icon size={21} strokeWidth={1.55} />
                  </span>
                  <div className="min-w-0 text-start">
                    <h3
                      className={`text-[16px] font-black sm:text-[17px] ${
                        direction === "rtl" ? "leading-[1.7]" : "leading-[1.4]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 text-[13px] text-ink-muted sm:text-[14px] ${
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

        <div className="mx-auto mt-7 grid max-w-[1100px] gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {closing ? (
            <WealthParagraph
              direction={direction}
              className="border-s-2 border-brand-accent bg-surface-soft p-5 ps-6"
            >
              <WealthRichText text={closing.text} />
            </WealthParagraph>
          ) : null}
          <WealthActions ctas={section.ctas} direction={direction} />
        </div>
      </div>
    </section>
  );
}
