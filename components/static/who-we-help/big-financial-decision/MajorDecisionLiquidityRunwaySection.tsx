import {
  MajorDecisionActions,
  MajorDecisionEyebrow,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionLiquidityRunwaySection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  const questions = section.questions ?? [];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <header className="mx-auto max-w-[1120px] text-center">
          <div className="flex justify-center">
            <div className="[&>div]:!text-brand-secondary">
              <MajorDecisionEyebrow section={section} />
            </div>
          </div>
          <h2
            id={`${section.id}-title`}
            className="mx-auto mt-5 max-w-[31ch] text-pretty text-[clamp(2rem,7.7vw,2.8rem)] font-black leading-[1.45] tracking-[-0.03em] sm:text-[clamp(2.8rem,5.2vw,2.8rem)]"
          >
            {section.heading}
          </h2>
          <div className="mx-auto mt-7 max-w-[58ch]  text-center [&_p]:!text-center">
            {section.paragraphs?.map((paragraph, index) => (
              <p
                key={`${section.id}-p-${index}`}
                className={
                  index === 2
                    ? "py-1 text-[19px]  text-ink sm:text-[21px]"
                    : "text-[15px] leading-[2] text-ink-muted sm:text-[16px]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </header>

        <div className="mt-11 sm:mt-14">
          <div className="flex  items-center gap-4 border-b-2 border-ink pb-4">
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
            <p
              dir="ltr"
              className="text-[12px] font-bold uppercase tracking-[.18em] text-brand-secondary"
            >
              {section.english_label}
            </p>
          </div>

          <ol className="grid min-w-0 border-s border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {questions.map((question, index) => (
              <li
                key={`${section.id}-runway-${index}`}
                className="relative min-w-0 border-b border-e border-line bg-page px-5 pb-6 pt-10 sm:min-h-52 lg:min-h-60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-5 h-px bg-ink/25"
                />
                <span
                  aria-hidden="true"
                  className="absolute start-5 top-[.88rem] size-3 border-[3px] border-page bg-brand-secondary"
                />
                <p className="text-[15px] font-bold leading-[1.95] text-ink sm:text-[16px]">
                  {question}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {section.closing_paragraphs?.length ? (
          <div className="mt-9 grid min-w-0 gap-4 border-t-2 border-ink pt-6 sm:grid-cols-3 sm:gap-7">
            {section.closing_paragraphs.map((paragraph, index) => (
              <p
                key={`${section.id}-closing-${index}`}
                className={`${index === 1 ? "text-[18px] font-black leading-[1.85] text-brand-secondary" : "text-[15px] leading-[2] text-ink-muted sm:text-[16px]"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <div className="flex justify-center">
          <MajorDecisionActions section={section} rtl={rtl} />
        </div>
      </div>
    </section>
  );
}
