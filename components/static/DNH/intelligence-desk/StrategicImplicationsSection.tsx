"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Layers3,
  RefreshCw,
  Scale,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type RiskQuestion = {
  id:
    | "uncertainty-direction"
    | "priority-risks"
    | "sensitive-exposures"
    | "assumptions-review"
    | "decision-flexibility";
  text: string;
};

type MacroRiskContent = {
  order: number;
  id: "macro-risk-view";
  type: "macro-risk";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  questions: RiskQuestion[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const questionIcons: Record<RiskQuestion["id"], LucideIcon> = {
  "uncertainty-direction": Activity,
  "priority-risks": ShieldAlert,
  "sensitive-exposures": Layers3,
  "assumptions-review": RefreshCw,
  "decision-flexibility": Scale,
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight: string;
}) {
  const index = highlight ? heading.indexOf(highlight) : -1;

  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-accent">
        {heading.slice(index, index + highlight.length)}
      </span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

export function IntelligenceDeskMacroRiskView() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "macro-risk-view" && section.type === "macro-risk",
  ) as MacroRiskContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="macro-risk-view-heading"
      className="relative isolate overflow-hidden border-y border-line bg-page py-14 text-ink sm:py-16 lg:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-brand-accent"
      />

      <div className="dnh-site-shell relative z-10 min-w-0">
        <header className="grid min-w-0 gap-7 border-b border-line pb-8 sm:pb-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)] lg:items-end lg:gap-14 xl:gap-20">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
         
            </div>

            <h2
              id="macro-risk-view-heading"
              className={`mt-4 max-w-[30ch] text-pretty text-[clamp(1.9rem,7vw,2.45rem)] font-black [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.2rem,4.5vw,3rem)] lg:text-[clamp(2.55rem,3.25vw,3.35rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.12]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s-2 border-brand-primary/20 ps-4 text-start sm:ps-5">
            <p
              className={`text-[14px] font-medium text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="mt-9 grid min-w-0 gap-7 lg:mt-12 lg:grid-cols-[minmax(13rem,0.27fr)_minmax(0,0.73fr)] lg:gap-10 xl:grid-cols-[minmax(15rem,0.25fr)_minmax(0,0.75fr)] xl:gap-14">
          <aside className="min-w-0 text-start lg:pt-3">
            

            <div className="mt-6   pt-5 sm:mt-7">
              <div
                className="grid grid-cols-[auto_1fr] items-center gap-3"
                aria-hidden="true"
              >
                <span className="size-2 bg-brand-accent" />
                <span className="h-px bg-line" />
              </div>
              <p
                className={`mt-4 max-w-[24rem] text-[13px] font-semibold text-ink-muted sm:text-[14px] ${
                  isRTL ? "leading-[1.95]" : "leading-[1.7]"
                }`}
              >
                {content.closing}
              </p>
            </div>
          </aside>

          <div className="min-w-0 border-y  border-line bg-surface-soft">
            <ul className="min-w-0 grid-cols-2 grid" aria-label={content.eyebrow}>
              {content.questions.map((question) => {
                const Icon = questionIcons[question.id];

                return (
                  <li
                    key={question.id}
                    className="group grid min-w-0 grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-4 border-b border-line px-4 py-5 last:border-b-0 sm:grid-cols-[3.75rem_minmax(0,1fr)] sm:gap-5 sm:px-6 sm:py-6 lg:min-h-[7.2rem] lg:grid-cols-[4.25rem_minmax(0,1fr)_5.5rem] lg:px-7"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[border-color,color,background-color] duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent/5 group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                    </span>

                    <p
                      className={`min-w-0 text-start text-[15px] font-extrabold text-ink transition-colors duration-200 group-hover:text-brand-primary motion-reduce:transition-none sm:text-[16px] lg:text-[17px] ${
                        isRTL ? "leading-[1.85]" : "leading-[1.48]"
                      }`}
                    >
                      {question.text}
                    </p>

                    <span
                      aria-hidden="true"
                      className="hidden items-center justify-end gap-2 lg:flex"
                    >
                      <span className="h-px w-10 bg-line transition-[width,background-color] duration-200 group-hover:w-12 group-hover:bg-brand-accent motion-reduce:transition-none" />
                      <span className="size-2 border border-brand-primary bg-page transition-[border-color,background-color] duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent motion-reduce:transition-none" />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {cta ? (
          <div className="mt-8 flex min-w-0 justify-start border-t border-line pt-7 sm:mt-10 sm:pt-8 lg:justify-end">
            <ActionButton
              href={cta.href}
              variant={cta.type}
              size="lg"
              icon={Arrow}
              iconPosition="end"
              contentAlignment="between"
              className="w-full sm:w-auto"
            >
              {cta.label}
            </ActionButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
