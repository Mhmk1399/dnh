import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionDnhSection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <header className="max-w-4xl">
          <MajorDecisionEyebrow section={section} />
          <MajorDecisionHeading section={section} />
        </header>
        <ol className="relative mt-10 grid gap-x-10 gap-y-0 before:absolute before:inset-y-0 before:start-[7px] before:w-px before:bg-brand-accent/45 lg:grid-cols-4 lg:before:inset-x-0 lg:before:inset-y-auto lg:before:start-0 lg:before:top-[7px] lg:before:h-px lg:before:w-full">
          {section.steps?.map((step, index) => (
            <li
              key={`${section.id}-${index}`}
              className="relative grid grid-cols-[16px_1fr] gap-4 pb-8 lg:block lg:pb-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 mt-1 block size-4 bg-brand-primary ring-4 ring-page"
              />
              <div className="lg:mt-6">
                <h3 className="text-[18px] font-black leading-[1.65] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.95] text-ink-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
        {section.closing ? (
          <div className="mt-8 max-w-4xl border-s-[3px] border-brand-accent ps-5">
            <MajorDecisionCopy>{section.closing}</MajorDecisionCopy>
          </div>
        ) : null}
        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
