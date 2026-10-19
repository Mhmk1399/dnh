"use client";

import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Layers3,
  SearchCheck,
  UserRound,
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

type ParagraphId =
  | "context-specificity"
  | "desk-role"
  | "assessment-entry"
  | "assessment-purpose";

type FinalParagraph = {
  id: ParagraphId;
  text: string;
};

type FinalCTAContent = {
  order: number;
  id: "turn-intelligence-into-better-decisions";
  type: "final-cta";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  paragraphs: FinalParagraph[];
  ctas: Array<{
    id: "assessment" | "weekly-outlook" | "consultation";
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const paragraphIcons: Record<ParagraphId, LucideIcon> = {
  "context-specificity": Layers3,
  "desk-role": Compass,
  "assessment-entry": UserRound,
  "assessment-purpose": SearchCheck,
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

function NarrativeBlock({
  paragraph,
  isRTL,
  inverted = false,
}: {
  paragraph: FinalParagraph;
  isRTL: boolean;
  inverted?: boolean;
}) {
  const Icon = paragraphIcons[paragraph.id];

  return (
    <article className="group relative min-w-0 text-start">
      <div
        className={`mb-4 flex size-11 items-center justify-center border sm:size-12 ${
          inverted
            ? "border-white/20 bg-white/5 text-brand-accent"
            : "border-line bg-surface-soft text-brand-primary"
        }`}
      >
        <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
      </div>

      <p
        className={`text-[14px] font-medium sm:text-[15px] lg:text-[15.5px] ${
          inverted ? "text-white/76" : "text-ink-muted"
        } ${isRTL ? "leading-[2.05]" : "leading-[1.78]"}`}
      >
        {paragraph.text}
      </p>
    </article>
  );
}

export function IntelligenceDeskFinalCTA() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "turn-intelligence-into-better-decisions" &&
      section.type === "final-cta",
  ) as FinalCTAContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const contextParagraph = content.paragraphs.find(
    (paragraph) => paragraph.id === "context-specificity",
  );
  const deskParagraph = content.paragraphs.find(
    (paragraph) => paragraph.id === "desk-role",
  );
  const assessmentEntry = content.paragraphs.find(
    (paragraph) => paragraph.id === "assessment-entry",
  );
  const assessmentPurpose = content.paragraphs.find(
    (paragraph) => paragraph.id === "assessment-purpose",
  );

  const primaryCTA = content.ctas.find((cta) => cta.id === "assessment");
  const weeklyCTA = content.ctas.find((cta) => cta.id === "weekly-outlook");
  const consultationCTA = content.ctas.find((cta) => cta.id === "consultation");

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-intelligence-final-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip bg-brand-secondary py-14 text-[var(--dnh-text-on-brand)] sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell min-w-0">
        <div className="relative min-w-0 overflow-hidden border border-white/15">
          <header className="relative grid min-w-0 gap-8 border-b border-white/15 px-5 py-8 sm:px-7 sm:py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(17rem,0.28fr)] lg:items-end lg:gap-14 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            <div className="relative z-10 min-w-0 text-start">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
                />
                <p className="text-[12px] font-extrabold leading-[1.8] sm:text-[13px]">
                  {content.eyebrow}
                </p>
              </div>

              <h2
                id="dnh-intelligence-final-heading"
                className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,7.4vw,2.8rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.45rem,5vw,3.45rem)] lg:text-[clamp(3rem,4vw,4.35rem)] ${
                  isRTL ? "leading-[1.52]" : "leading-[1.04]"
                }`}
              >
                <HighlightedHeading
                  heading={content.heading}
                  highlight={content.heading_highlight}
                />
              </h2>
            </div>

            <div className="relative z-10 hidden min-h-24 items-end justify-end lg:flex">
              <div className="w-full max-w-[16rem]">
                <span
                  className="block h-px w-full bg-white/15"
                  aria-hidden="true"
                />
                <span
                  className="ms-auto mt-3 block h-[3px] w-20 bg-brand-accent"
                  aria-hidden="true"
                />
              </div>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute end-0 top-0 h-full w-px bg-white/[0.08] lg:end-[28%]"
            />
          </header>

          <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)]">
            <div className="min-w-0 px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-10 xl:px-11">
              {contextParagraph ? (
                <NarrativeBlock
                  paragraph={contextParagraph}
                  isRTL={isRTL}
                  inverted
                />
              ) : null}
            </div>

            <div className="relative flex min-h-20 items-center justify-center border-y border-white/15 bg-white/[0.035] lg:min-h-full lg:border-x lg:border-y-0">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15 lg:inset-x-auto lg:inset-y-0 lg:start-1/2 lg:h-auto lg:w-px lg:-translate-x-1/2 lg:translate-y-0"
              />
              <span className="relative z-10 flex size-12 items-center justify-center border border-brand-accent bg-brand-primary text-brand-accent sm:size-14">
                <Arrow aria-hidden="true" size={20} strokeWidth={1.8} />
              </span>
            </div>

            <div className="min-w-0 px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-10 xl:px-11">
              {deskParagraph ? (
                <NarrativeBlock
                  paragraph={deskParagraph}
                  isRTL={isRTL}
                  inverted
                />
              ) : null}
            </div>
          </div>

          <div className="min-w-0 border-t border-white/15 bg-page text-ink">
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.58fr)_minmax(22rem,0.42fr)]">
              <div className="grid min-w-0 sm:grid-cols-2 lg:border-e lg:border-line">
                <div className="min-w-0 border-b border-line p-5 sm:border-b-0 sm:border-e sm:p-6 lg:p-7 xl:p-8">
                  {assessmentEntry ? (
                    <NarrativeBlock paragraph={assessmentEntry} isRTL={isRTL} />
                  ) : null}
                </div>

                <div className="min-w-0 p-5 sm:p-6 lg:p-7 xl:p-8">
                  {assessmentPurpose ? (
                    <NarrativeBlock
                      paragraph={assessmentPurpose}
                      isRTL={isRTL}
                    />
                  ) : null}
                </div>
              </div>

              <div className="min-w-0 border-t border-line bg-surface-soft p-4 sm:p-5 lg:border-t-0 lg:p-6 xl:p-7">
                <div className="flex min-w-0 flex-col gap-3">
                  {primaryCTA ? (
                    <ActionButton
                      href={primaryCTA.href}
                      variant="primary"
                      size="lg"
                      icon={Arrow}
                      iconPosition="end"
                      contentAlignment="between"
                      fullWidth
                    >
                      {primaryCTA.label}
                    </ActionButton>
                  ) : null}

                  {weeklyCTA ? (
                    <ActionButton
                      href={weeklyCTA.href}
                      variant="secondary"
                      size="md"
                      icon={Arrow}
                      iconPosition="end"
                      contentAlignment="between"
                      fullWidth
                    >
                      {weeklyCTA.label}
                    </ActionButton>
                  ) : null}

                  {consultationCTA ? (
                    <ActionButton
                      href={consultationCTA.href}
                      variant="secondary"
                      size="md"
                      icon={Arrow}
                      iconPosition="end"
                      contentAlignment="between"
                      fullWidth
                    >
                      {consultationCTA.label}
                    </ActionButton>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
