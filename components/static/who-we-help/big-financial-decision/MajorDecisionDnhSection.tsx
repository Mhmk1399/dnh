import {
  MajorDecisionActions,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
  MajorDecisionIntro,
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
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div>
            <MajorDecisionEyebrow section={section} />
            <MajorDecisionHeading section={section} />
          </div>
          <MajorDecisionIntro section={section} />
        </header>

        <ol className="mt-10 grid gap-px bg-line lg:grid-cols-3">
          {section.steps?.map((step) => (
            <li key={step.id} className="relative min-h-72 bg-page p-6 sm:p-8">
              <span className="text-[12px] font-black tracking-[.2em] text-brand-primary">
                {step.number}
              </span>
              <h3 className="mt-6 text-[22px] font-black leading-[1.6] text-ink">
                {step.title}
              </h3>
              {step.subtitle ? (
                <p className="mt-2 text-[14px] font-bold leading-[1.8] text-brand-secondary">
                  {step.subtitle}
                </p>
              ) : null}
              <p className="mt-5 text-start text-[14px] leading-[2] text-ink-muted sm:text-[15px]">
                {step.description}
              </p>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-brand-primary" />
            </li>
          ))}
        </ol>

        {section.result ? (
          <div className="mt-7 grid gap-2 border-s-[3px] border-brand-accent bg-brand-secondary p-5 text-white sm:grid-cols-[minmax(12rem,.35fr)_minmax(0,.65fr)] sm:items-center sm:gap-8 sm:p-7">
            <h3 className="text-[16px] font-black leading-[1.8] text-brand-primary">
              {section.result_label}
            </h3>
            <p className="text-start text-[14px] leading-[2] text-white/78 sm:text-[15px]">
              {section.result}
            </p>
          </div>
        ) : null}

        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
