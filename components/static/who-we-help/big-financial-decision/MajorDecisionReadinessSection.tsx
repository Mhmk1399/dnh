import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionReadinessSection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  const dark =
    section.type === "downside-risk" || section.type === "scenario-analysis";
  const entries = section.items ?? [];
  const questions = section.questions ?? [];
  const rows = entries.length
    ? entries.map((item) => ({
        title: item.title,
        description: item.description,
      }))
    : questions.map((question) => ({ title: question, description: "" }));

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`${dark ? "bg-brand-secondary text-page" : section.type === "options-tradeoffs" ? "bg-surface-soft text-ink" : "bg-page text-ink"} relative isolate scroll-mt-24 overflow-hidden border-b border-line py-14 sm:py-18 lg:py-24`}
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <MajorDecisionEyebrow section={section} dark={dark} />
            <MajorDecisionHeading section={section} dark={dark} />
          </div>

          <div
            className={`max-w-[68ch] space-y-3 border-s-2 ps-5 ${dark ? "border-brand-primary/70" : "border-brand-primary"}`}
          >
            {section.paragraphs?.map((paragraph, index) => (
              <MajorDecisionCopy key={`${section.id}-p-${index}`} dark={dark}>
                {paragraph}
              </MajorDecisionCopy>
            ))}
            {section.intro ? (
              <MajorDecisionCopy dark={dark}>{section.intro}</MajorDecisionCopy>
            ) : null}
          </div>
        </header>

        <ol
          className={`mx-auto mt-10 max-w-[1120px] border-t sm:mt-12 ${dark ? "border-page/20" : "border-line"}`}
        >
          {rows.map((row, index) => (
            <li
              key={`${section.id}-row-${index}`}
              className={`group relative grid min-w-0 gap-4 border-b py-6 transition-colors duration-200 sm:grid-cols-[72px_minmax(0,.7fr)_minmax(0,1.3fr)] sm:items-start sm:gap-6 sm:px-4 sm:py-7 motion-reduce:transition-none ${dark ? "border-page/15 hover:bg-page/[.035]" : "border-line hover:bg-brand-primary/[.055]"}`}
            >
              <bdi
                dir="ltr"
                className="text-start text-[28px] font-black leading-none text-brand-primary sm:text-[34px]"
              >
                {String(index + 1).padStart(2, "0")}
              </bdi>

              <h3
                className={`text-[17px] font-black leading-[1.8] sm:text-[18px] ${dark ? "text-page" : "text-ink"}`}
              >
                {row.title}
              </h3>

              {row.description ? (
                <p
                  className={`text-[15px] leading-[1.95] sm:text-[16px] ${dark ? "text-page/70" : "text-ink-muted"}`}
                >
                  {row.description}
                </p>
              ) : (
                <span
                  aria-hidden="true"
                  className={`hidden h-px self-center sm:block ${dark ? "bg-page/10" : "bg-line"}`}
                />
              )}

              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 w-1 origin-center scale-y-0 bg-brand-primary transition-transform duration-200 group-hover:scale-y-100 motion-reduce:transition-none"
              />
            </li>
          ))}
        </ol>

        {section.closing_paragraphs?.length ? (
          <div
            className={`mx-auto mt-8 max-w-[1120px] border-s-[3px] p-5 ps-6 sm:p-6 sm:ps-7 ${dark ? "border-brand-primary bg-page/[.035]" : "border-brand-primary bg-page"}`}
          >
            <div className="space-y-3">
              {section.closing_paragraphs.map((paragraph, index) => (
                <MajorDecisionCopy
                  key={`${section.id}-closing-${index}`}
                  dark={dark}
                >
                  {paragraph}
                </MajorDecisionCopy>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex justify-center">
          <MajorDecisionActions section={section} rtl={rtl} dark={dark} />
        </div>
      </div>
    </section>
  );
}
