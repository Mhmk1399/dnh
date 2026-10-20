import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  Gauge,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { WhyAssessmentContent } from "./assessmentTypes";

const ICONS: Record<
  WhyAssessmentContent["reasons"][number]["icon"],
  LucideIcon
> = {
  question: CircleHelp,
  urgency: Gauge,
  route: Route,
};

export function WhyAssessmentSection({
  content,
  direction,
}: {
  content: WhyAssessmentContent;
  direction: SiteDirection;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      aria-labelledby="why-assessment-title"
      className="relative isolate overflow-hidden border-b border-line bg-page py-16 sm:py-20 lg:py-24 xl:py-28"
    >
      <GridBackground />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="why-assessment-title"
              className="max-w-[720px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[1.52] xl:text-[50px]"
            >
              <HighlightedText
                text={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>
          <p className="max-w-[680px] text-[13px] font-medium leading-[2.2] text-ink-muted sm:text-[14px] lg:text-[15px]">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-6">
          <article className="flex min-h-[390px] flex-col justify-between border border-line bg-brand-secondary px-5 py-6 text-white shadow-[0_24px_60px_rgba(15,92,120,.12)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
            <div>
              <h3 className="mt-7 text-[22px] font-black leading-[1.9] sm:text-[25px]">
                <HighlightedText
                  text={content.statement.heading}
                  highlight={content.statement.heading_highlight}
                  accent
                />
              </h3>
              <p className="mt-6 max-w-[440px] text-[11px] font-medium leading-[2.1] text-white/58 sm:text-[12px]">
                {content.statement.description}
              </p>
            </div>
            <div className="mt-10 border-t border-white/15 pt-5">
              <p className="text-[10px] font-medium leading-[2] text-white/42">
                {content.statement.comparison_before}
              </p>
              <p className="mt-1 text-[11px] font-black text-white">
                {content.statement.comparison_after}
              </p>
            </div>
          </article>

          <div className="border-x border-t border-line bg-white">
            {content.reasons.map((reason, index) => {
              const Icon = ICONS[reason.icon];
              return (
                <article
                  key={reason.id}
                  className="group grid gap-4 border-b border-line px-5 py-6 sm:grid-cols-[3rem_0.8fr_1.2fr] sm:items-center sm:px-7 lg:px-8"
                >
                  <span className="grid size-10 place-items-center border border-line bg-surface-soft text-brand-primary transition-colors group-hover:bg-brand-secondary group-hover:text-brand-primary">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="mt-1 text-[14px] font-black leading-7 text-ink">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="border-s border-line ps-5 text-[12px] font-medium leading-[2] text-ink-muted">
                    {reason.description}
                  </p>
                  <span className="sr-only">{index + 1}</span>
                </article>
              );
            })}

            <div className="relative border-b border-line bg-surface-soft/65 px-5 py-6 sm:px-7 lg:px-8">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
              />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
              
                  <h3 className="mt-2 text-[15px] font-black text-ink sm:text-[17px]">
                    {content.outcome.title}
                  </h3>
                  <p className="mt-2 max-w-[600px] text-[10px] font-medium leading-[2] text-ink-muted sm:text-[11px]">
                    {content.outcome.description}
                  </p>
                </div>
                <ActionButton
                  href={content.outcome.cta.href}
                  variant="secondary"
                  size="md"
                  icon={Arrow}
                  shape="square"
                  className="w-full shrink-0 border-line-strong bg-white text-ink shadow-none hover:bg-brand-primary! hover:text-white sm:w-auto sm:min-w-[205px]"
                >
                  {content.outcome.cta.label}
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 border border-line bg-white px-5 py-4 sm:px-6">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-brand-primary"
            strokeWidth={1.5}
          />
          <p className="text-[11px] font-medium leading-[2] text-ink-muted">
            {content.privacy_note}
          </p>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
      <span className="text-[10px] font-black text-brand-primary sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
  accent?: boolean;
}) {
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

function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(to right,var(--dnh-primary) 1px,transparent 1px)",
        backgroundSize: "118px 100%",
      }}
    />
  );
}
