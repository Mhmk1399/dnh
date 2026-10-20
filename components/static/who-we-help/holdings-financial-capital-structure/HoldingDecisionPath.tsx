import { Check, ClipboardCheck } from "lucide-react";
import { HoldingActions, HoldingCopy, HoldingIntro } from "./HoldingShared";
import type { HoldingSection } from "./holdingTypes";

export function HoldingDecisionPath({
  process,
  finalSection,
  rtl,
}: {
  process: HoldingSection;
  finalSection: HoldingSection;
  rtl: boolean;
}) {
  return (
    <>
      <section
        id={process.id}
        aria-labelledby={`${process.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <HoldingIntro section={process} />
              <ClipboardCheck
                className="mt-8 text-brand-primary"
                size={48}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </aside>
          <div>
            <ol className="divide-y divide-line border-y border-line">
              {process.steps?.map((step) => (
                <li
                  key={step.title}
                  className="grid gap-3 py-6 sm:grid-cols-[.75fr_1.25fr] sm:gap-5"
                >
                  <h3 className="text-lg font-black leading-8 text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-ink-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 space-y-3 border-s-4 border-brand-primary ps-6">
              {process.closing_paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
            <HoldingActions section={process} rtl={rtl} />
          </div>
        </div>
      </section>
      <section
        id={finalSection.id}
        aria-labelledby={`${finalSection.id}-title`}
        className="relative overflow-hidden bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 size-80 rounded-full border border-brand-primary/20"
        />
        <div
          aria-hidden="true"
          className="absolute -end-12 -top-12 size-56 rounded-full border border-brand-primary/20"
        />
        <div className="dnh-site-shell relative">
          <HoldingIntro section={finalSection} dark centered />
          <div className="mx-auto mt-7 max-w-3xl space-y-3">
            {finalSection.paragraphs?.map((t) => (
              <HoldingCopy key={t} dark>
                {t}
              </HoldingCopy>
            ))}
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-px bg-page/12 sm:grid-cols-2">
            {finalSection.checklist?.map((item) => (
              <li
                key={item}
                className="flex gap-4 bg-brand-secondary p-5 text-base font-bold leading-8 text-page/82"
              >
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center bg-brand-primary text-brand-secondary">
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center">
            {finalSection.closing_paragraphs?.map((t) => (
              <HoldingCopy key={t} dark>
                {t}
              </HoldingCopy>
            ))}
          </div>
          <HoldingActions section={finalSection} rtl={rtl} dark centered />
        </div>
      </section>
    </>
  );
}
