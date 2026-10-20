import { Check, GitBranch, Route } from "lucide-react";
import { BodyCopy, SectionActions, SectionIntro } from "./PortfolioShared";
import type { PortfolioSection } from "./portfolioTypes";

export function PortfolioDecisionPath({
  process,
  routing,
  finalSection,
  rtl,
}: {
  process: PortfolioSection;
  routing: PortfolioSection;
  finalSection: PortfolioSection;
  rtl: boolean;
}) {
  return (
    <>
      <section
        id={process.id}
        aria-labelledby={`${process.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div
              data-process-sticky-intro
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <SectionIntro section={process} />
              <Route
                className="mt-8 text-brand-primary"
                size={48}
                strokeWidth={1.5}
              />
            </div>
          </aside>
          <div>
            <ol className="divide-y divide-line border-y border-line">
              {process.steps?.map((step) => (
                <li
                  key={step.title}
                  className="group relative grid gap-3 border-s-2 border-transparent py-6 ps-5 transition-colors duration-300 hover:border-brand-primary sm:grid-cols-[.75fr_1.25fr] sm:gap-5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute start-0 top-9 size-2 -translate-x-[calc(50%+1px)] bg-brand-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 rtl:translate-x-[calc(50%+1px)]"
                  />
                  <h3 className="text-lg font-black leading-8 text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-ink-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            {process.closing && (
              <p className="mt-7 border-s-4 border-brand-primary ps-5 text-lg font-black leading-9 text-ink">
                {process.closing}
              </p>
            )}
            <SectionActions section={process} rtl={rtl} />
          </div>
        </div>
      </section>

      <section
        id={routing.id}
        aria-labelledby={`${routing.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <SectionIntro section={routing} centered />
          {routing.intro && (
            <div className="mx-auto mt-6 max-w-3xl">
              <BodyCopy>{routing.intro}</BodyCopy>
            </div>
          )}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
              <GitBranch size={28} />
            </div>
            <div className="mx-auto h-8 w-px bg-brand-primary/50" />
            <ol className="grid gap-4 md:grid-cols-2">
              {routing.routes?.map((item, index) => (
                <li
                  key={item.title}
                  className={`group border border-line bg-page p-6 transition duration-300 hover:border-brand-primary hover:shadow-[0_16px_40px_color-mix(in_srgb,var(--dnh-primary)_14%,transparent)] ${index === (routing.routes?.length ?? 1) - 1 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-brand-primary transition-[width] duration-300 group-hover:w-16"
                  />
                  <h3 className="mt-5 text-xl font-black leading-8 text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center">
            {routing.closing_paragraphs?.map((text) => (
              <BodyCopy key={text}>{text}</BodyCopy>
            ))}
          </div>
          <SectionActions section={routing} rtl={rtl} centered />
        </div>
      </section>

      <section
        id={finalSection.id}
        aria-labelledby={`${finalSection.id}-title`}
        className="relative overflow-hidden bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"
      >
        <div className="absolute -end-24 -top-24 size-80 rounded-full border border-brand-primary/20" />
        <div className="absolute -end-12 -top-12 size-56 rounded-full border border-brand-primary/20" />
        <div className="dnh-site-shell relative">
          <SectionIntro section={finalSection} dark centered />
          <div className="mx-auto mt-7 max-w-3xl space-y-3">
            {finalSection.paragraphs?.map((text) => (
              <BodyCopy key={text} dark>
                {text}
              </BodyCopy>
            ))}
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-px bg-page/12 sm:grid-cols-2">
            {finalSection.checklist?.map((item) => (
              <li
                key={item}
                className="flex gap-4 bg-brand-secondary p-5 text-base font-bold leading-8 text-page/82"
              >
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center bg-brand-primary text-brand-secondary">
                  <Check size={16} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center">
            {finalSection.closing_paragraphs?.map((text) => (
              <BodyCopy key={text} dark>
                {text}
              </BodyCopy>
            ))}
          </div>
          <SectionActions section={finalSection} rtl={rtl} dark centered />
        </div>
      </section>
    </>
  );
}
