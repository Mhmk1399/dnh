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

export function WealthAudienceSection({
  section,
  direction,
}: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const items = getItems(section);

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-audience-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-page py-14 text-white sm:py-18 lg:py-24"
    >
      <WealthGridPattern dark />

      <div className="dnh-site-shell relative z-10">
        <WealthSectionHeader
          section={section}
          direction={direction}
          headingId="wealth-audience-heading"
          as="h2"
          centered
          className="max-w-[1120px]"
        />

        {paragraphs[0] ? (
          <div className="mx-auto mt-3 max-w-[960px]">
            <WealthParagraph
              direction={direction}
              dark
              className="border-y border-white/15 text-black/70! py-5 text-center!"
            >
              <WealthRichText text={paragraphs[0].text} />
            </WealthParagraph>
          </div>
        ) : null}

        <div className="mt-9 grid min-w-0 grid-cols-1 border-s border-t border-white/15 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = getWealthIcon(item.icon);

            return (
              <article
                key={item.id}
                className="group min-w-0 border-b border-e border-white/15 bg-white/[0.035] p-5 transition-colors duration-200 hover:bg-white/[0.075] sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon
                    aria-hidden="true"
                    size={25}
                    strokeWidth={1.5}
                    className="text-brand-accent"
                  />
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/12"
                  />
                </div>
                <h3
                  className={`mt-5 text-start text-[17px] font-black text-black/80 sm:text-[14px] ${
                    direction === "rtl" ? "leading-[1.3]" : "leading-[1.4]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-start text-[13px] text-black/50 sm:text-[14px] ${
                    direction === "rtl" ? "leading-[1.9]" : "leading-[1.68]"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <footer className="mx-auto mt-7 grid max-w-[1100px] gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          {paragraphs[1] ? (
            <WealthParagraph
              direction={direction}
              dark
              className="border-s-2 text-black/60! border-brand-accent ps-4"
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
