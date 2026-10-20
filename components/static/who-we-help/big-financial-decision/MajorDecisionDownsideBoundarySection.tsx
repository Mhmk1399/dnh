import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionDownsideBoundarySection({
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
      className="relative isolate scroll-mt-24 border-b border-page/10 bg-brand-secondary py-14 text-page sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(19rem,.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14 xl:gap-20">
          <header className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <MajorDecisionEyebrow section={section} dark />
            <MajorDecisionHeading section={section} dark />
            <div className="mt-7 max-w-[58ch] space-y-3 border-s-2 border-brand-primary/70 ps-5">
              {section.paragraphs?.map((paragraph, index) => (
                <MajorDecisionCopy key={`${section.id}-p-${index}`} dark>
                  {paragraph}
                </MajorDecisionCopy>
              ))}
            </div>
          </header>

          <div className="min-w-0 border border-page/20 bg-page/[.035] p-5 sm:p-7 lg:p-9">
            <div className="flex items-center justify-between gap-5 border-b border-page/20 pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-brand-primary">
                {section.english_label}
              </p>
              <span aria-hidden="true" className="h-px w-14 bg-brand-accent" />
            </div>

            <ul className="divide-y divide-page/15">
              {questions.map((question, index) => (
                <li
                  key={`${section.id}-risk-${index}`}
                  className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[.65rem] size-2 border border-brand-primary bg-brand-primary/20 sm:size-2.5"
                  />
                  <p className="text-[15px] font-bold leading-[1.95] text-page sm:text-[16px]">
                    {question}
                  </p>
                </li>
              ))}
            </ul>

            {section.closing_paragraphs?.length ? (
              <div className="mt-3 border-t-2 border-brand-primary bg-page/[.04] px-1 pt-6 sm:px-5 sm:pt-7">
                {section.closing_paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.id}-closing-${index}`}
                    className={`${index === 0 ? "text-[18px] font-black leading-[1.9] text-page sm:text-[20px]" : "mt-3 text-[15px] leading-[2] text-page/70 sm:text-[16px]"}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <MajorDecisionActions section={section} rtl={rtl} dark />
      </div>
    </section>
  );
}
