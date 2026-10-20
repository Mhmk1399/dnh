import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionOptionsLedgerSection({
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
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-8 border-b border-ink/20 pb-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:items-end lg:gap-16 lg:pb-12">
          <div className="min-w-0">
            <div className="[&>div]:!text-brand-secondary">
              <MajorDecisionEyebrow section={section} />
            </div>
            <MajorDecisionHeading section={section} />
          </div>
          <div className="max-w-[62ch] border-s-2 border-brand-primary ps-5">
            {section.paragraphs?.map((paragraph, index) => (
              <MajorDecisionCopy key={`${section.id}-p-${index}`}>
                {paragraph}
              </MajorDecisionCopy>
            ))}
          </div>
        </header>

        <div className="mt-9 grid min-w-0 gap-8 lg:grid-cols-[minmax(16rem,.56fr)_minmax(0,1.44fr)] lg:gap-12">
          <div className="min-w-0 lg:pt-5">
            <p className="text-[12px] font-bold uppercase tracking-[.18em] text-brand-secondary">
              {section.english_label}
            </p>
            <div className="mt-5 h-px w-16 bg-brand-accent" />
            <div className="mt-6 space-y-3">
              {section.closing_paragraphs?.map((paragraph, index) => (
                <p
                  key={`${section.id}-closing-${index}`}
                  className={`${index === 0 ? "text-[20px] font-black leading-[1.8] text-ink sm:text-[22px]" : "text-[15px] leading-[2] text-ink-muted sm:text-[16px]"}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ol className="min-w-0 border-t border-ink/30">
            {questions.map((question, index) => (
              <li
                key={`${section.id}-criterion-${index}`}
                className="group grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3 border-b border-line py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 items-center border-e border-line pe-3 sm:pe-5"
                >
                  <span className="h-[3px] w-8 bg-brand-secondary" />
                </span>
                <p className="min-w-0 text-[15px] font-bold leading-[1.9] text-ink sm:text-[16px]">
                  {question}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
