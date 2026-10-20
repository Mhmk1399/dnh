import { ArrowLeft, ArrowRight, CheckCircle2, Route } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { AssessmentProcessContent } from "./assessmentTypes";

export function AssessmentProcessSection({
  content,
  direction,
}: {
  content: AssessmentProcessContent;
  direction: SiteDirection;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      aria-labelledby="assessment-process-title"
      className="relative isolate overflow-hidden border-b border-white/10 bg-brand-secondary py-16 text-white sm:py-20 lg:py-24 xl:py-28"
    >
      <Background />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="assessment-process-title"
              className="max-w-[760px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] sm:text-[38px] lg:text-[45px] lg:leading-[1.5] xl:text-[50px]"
            >
              <Highlight
                text={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>
          <div>
            <p className="max-w-[690px] text-[13px] font-medium leading-[2.2] text-white/55 sm:text-[14px] lg:text-[15px]">
              {content.intro}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionButton
                href={content.start_cta.href}
                variant="primary"
                size="md"
                shape="square"
                icon={Arrow}
                className="shadow-none"
              >
                {content.start_cta.label}
              </ActionButton>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="border border-white/12 bg-white/[0.035] p-6 lg:sticky lg:top-28 lg:self-start lg:p-8">
            <bdi
              dir="ltr"
              className="text-[10px] font-black tracking-[0.2em] text-brand-primary/75"
            >
              {content.panel.eyebrow}
            </bdi>
            <h3 className="mt-5 text-[24px] font-black leading-[1.8] sm:text-[28px]">
              <Highlight
                text={content.panel.heading}
                highlight={content.panel.heading_highlight}
              />
            </h3>
            <p className="mt-5 text-[12px] font-medium leading-[2] text-white/50">
              {content.panel.intro}
            </p>
            <div className="mt-8 border-y border-white/10">
              {content.panel.phases.map((phase) => (
                <div
                  key={phase.id}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0"
                >
                  <span className="text-[12px] font-black text-white/72">
                    {phase.label}
                  </span>
              
                </div>
              ))}
            </div>
            <p className="mt-6 border-s-2 border-brand-primary ps-4 text-[10px] leading-[2] text-white/38">
              {content.panel.note}
            </p>
          </aside>

          <ol className="border-x border-t border-white/10 bg-white/[0.02]">
            {content.steps.map((step) => (
              <li
                key={step.id}
                className="group relative grid gap-4 border-b border-white/10 p-5 transition-colors hover:bg-white/[0.035] sm:grid-cols-2 sm:items-center sm:p-6 lg:p-7"
              >
               
                <h3 className="text-[15px] font-black leading-7 text-white">
                  {step.title}
                </h3>
                <div className="border-s border-white/10 ps-5">
                  <p className="text-[12px] font-medium leading-[2] text-white/52">
                    {step.description}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-[10px] font-black text-brand-primary">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    {content.outcome_label}: {step.outcome}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 start-0 w-[2px] origin-bottom scale-y-0 bg-brand-primary transition-transform group-hover:scale-y-100"
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Route
              size={18}
              className="text-brand-primary"
              aria-hidden="true"
            />
            <p className="text-[12px] font-medium leading-6 text-white/48">
              {content.footer}
            </p>
          </div>
          <ActionButton
            href={content.cta.href}
            variant="secondary"
            size="md"
            shape="square"
            icon={Arrow}
            className="w-full border-white/20 bg-white/[0.035] text-white shadow-none hover:bg-white/10 sm:w-auto"
          >
            {content.cta.label}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-brand-primary" aria-hidden="true" />
      <span className="text-[10px] font-black text-white/65 sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}
function Highlight({ text, highlight }: { text: string; highlight: string }) {
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-brand-primary">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(22,115,148,.18),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.3) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
