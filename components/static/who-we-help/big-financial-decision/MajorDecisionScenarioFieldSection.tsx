import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionScenarioFieldSection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  const items = section.items ?? [];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate scroll-mt-24 border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(19rem,.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-14 xl:gap-20">
          <header className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="[&>div]:!text-brand-secondary">
              <MajorDecisionEyebrow section={section} />
            </div>
            <MajorDecisionHeading section={section} />
            {section.intro ? (
              <div className="mt-7 border-s-2 border-brand-primary ps-5">
                <MajorDecisionCopy>{section.intro}</MajorDecisionCopy>
              </div>
            ) : null}
          </header>

          <div className="min-w-0 border border-ink/25 bg-page  p-4 sm:p-6 lg:p-8">
            <div className="border-b-2 border-ink pb-5">
              <p className="text-[12px] font-bold uppercase tracking-[.18em] text-brand-secondary">
                {section.english_label}
              </p>
            </div>

            <ol className="grid min-w-0 sm:grid-cols-2">
              {items.map((item, index) => (
                <li
                  key={`${section.id}-scenario-${index}`}
                  className={`group relative min-w-0 border-b border-line p-5 sm:min-h-52 sm:p-6 ${index % 2 === 0 ? "sm:border-e" : ""} ${index === items.length - 1 && items.length % 2 === 1 ? "sm:col-span-2 sm:min-h-0" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-8 transition-[width,background-color] duration-300 group-hover:w-12 motion-reduce:transition-none bg-brand-accent `}
                    />
                    <h3 className="text-[17px] font-black leading-[1.7] text-ink sm:text-[18px]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.95] text-ink-muted sm:text-[16px]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            {section.closing_paragraphs?.length ? (
              <div className="border-t-2 border-ink bg-surface-soft p-5 sm:p-7">
                {section.closing_paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.id}-closing-${index}`}
                    className={`${index === 0 ? "text-[17px] font-black leading-[1.9] text-ink" : "mt-3 text-[15px] leading-[2] text-ink-muted sm:text-[16px]"}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
