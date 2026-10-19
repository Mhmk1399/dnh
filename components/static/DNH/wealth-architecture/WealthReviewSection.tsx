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

export function WealthReviewSection({
  section,
  direction,
}: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-review-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24"
    >
      <WealthGridPattern />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.55fr)] lg:gap-12">
        <div
          className="
    min-w-0
    lg:sticky
    lg:top-24
    lg:flex
    lg:h-[calc(100svh-6rem)]
    lg:flex-col
    lg:justify-center
    lg:self-start
  "
        >
          <WealthSectionHeader
            section={section}
            direction={direction}
            headingId="wealth-review-heading"
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

        <div className="min-w-0">
          <div className="grid min-w-0 grid-cols-1 border-s border-t border-line md:grid-cols-2">
            {items.map((item) => {
              const Icon = getWealthIcon(item.icon);

              return (
                <article
                  key={item.id}
                  className="group min-w-0 border-b border-e border-line bg-page p-5 transition-[background-color,border-color] duration-200 hover:border-brand-primary hover:bg-surface-soft sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center bg-brand-primary text-white transition-colors duration-200 group-hover:bg-brand-accent"
                    >
                      <Icon size={21} strokeWidth={1.55} />
                    </span>
                    <div className="min-w-0 text-start">
                      <h3
                        className={`text-[16px] font-black sm:text-[18px] ${
                          direction === "rtl"
                            ? "leading-[1.65]"
                            : "leading-[1.38]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-3 text-[13px] text-ink-muted sm:text-[14px] ${
                          direction === "rtl"
                            ? "leading-[1.9]"
                            : "leading-[1.68]"
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

          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            {paragraphs[1] ? (
              <WealthParagraph
                direction={direction}
                className="border-s-2 border-brand-accent bg-page p-5 ps-6"
              >
                <WealthRichText text={paragraphs[1].text} />
              </WealthParagraph>
            ) : null}
            <WealthActions ctas={section.ctas} direction={direction} />
          </div>
        </div>
      </div>
    </section>
  );
}
