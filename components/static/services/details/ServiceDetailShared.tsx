"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { ActionButton } from "@/components/ui/ActionButton";

import type {
  NormalizedEntry,
  NormalizedServiceSection,
  ServiceCta,
  ServiceCtaTargets,
} from "./types";

function sectionCopy(section: NormalizedServiceSection) {
  return [section.intro, ...section.body].filter((value): value is string =>
    Boolean(value),
  );
}

export function SectionMeta({
  section,
  light = false,
}: {
  section: NormalizedServiceSection;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        aria-hidden="true"
        className="h-[3px] w-9 shrink-0 bg-brand-accent"
      />
      <p
        className={`text-[11px] font-extrabold sm:text-[12px] ${
          light ? "text-white" : "text-brand-primary"
        }`}
      >
        {section.eyebrow}
      </p>
    </div>
  );
}

export function SectionHeading({
  id,
  children,
  isRTL,
  light = false,
  hero = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  isRTL: boolean;
  light?: boolean;
  hero?: boolean;
  className?: string;
}) {
  return (
    <h2
      id={id}
      style={{
        fontSize: hero
          ? "clamp(2.2rem, 4.6vw, 2.7rem)"
          : "clamp(1.8rem, 3.05vw, 2.7rem)",
        lineHeight: isRTL ? 1.46 : 1.08,
      }}
      className={`text-pretty font-black ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function BodyText({
  children,
  isRTL,
  light = false,
  strong = false,
  className = "",
}: {
  children: ReactNode;
  isRTL: boolean;
  light?: boolean;
  strong?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`${strong ? "font-bold" : "font-medium"} text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] ${
        light ? "text-white/78" : "text-ink-muted"
      } ${isRTL ? "leading-[2.02]" : "leading-[1.74]"} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionIntro({
  section,
  direction,
  isRTL,
  light = false,
  leadCount = 2,
}: {
  section: NormalizedServiceSection;
  direction: "rtl" | "ltr";
  isRTL: boolean;
  light?: boolean;
  leadCount?: number;
}) {
  const copy = sectionCopy(section).slice(0, leadCount);

  if (!copy.length) {
    return (
      <header dir={direction} className="max-w-[58rem]">
        <SectionMeta section={section} light={light} />
        <SectionHeading
          id={`${section.id}-heading`}
          isRTL={isRTL}
          light={light}
          className="mt-4 max-w-[22ch]"
        >
          {section.heading}
        </SectionHeading>
      </header>
    );
  }

  return (
    <div
      dir="ltr"
      className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16"
    >
      <header
        dir={direction}
        className={`min-w-0 ${
          isRTL ? "lg:col-start-2" : "lg:col-start-1"
        } lg:row-start-1`}
      >
        <SectionMeta section={section} light={light} />
        <SectionHeading
          id={`${section.id}-heading`}
          isRTL={isRTL}
          light={light}
          className="mt-4 max-w-[19ch]"
        >
          {section.heading}
        </SectionHeading>
      </header>

      <div
        dir={direction}
        className={`min-w-0 ${
          isRTL ? "lg:col-start-1" : "lg:col-start-2"
        } lg:row-start-1`}
      >
        <div className="max-w-[44rem] space-y-3">
          {copy.map((paragraph, index) => (
            <BodyText
              key={`${paragraph}-${index}`}
              isRTL={isRTL}
              light={light}
              strong={index === 0}
            >
              {paragraph}
            </BodyText>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionExtraCopy({
  section,
  isRTL,
  light = false,
  skip = 2,
  className = "",
}: {
  section: NormalizedServiceSection;
  isRTL: boolean;
  light?: boolean;
  skip?: number;
  className?: string;
}) {
  const remainder = sectionCopy(section).slice(skip);
  if (!remainder.length) return null;

  return (
    <div
      className={`grid gap-3 border-t pt-5 sm:grid-cols-2 sm:gap-x-8 lg:pt-6 ${
        light ? "border-white/16" : "border-line"
      } ${className}`}
    >
      {remainder.map((paragraph, index) => (
        <BodyText key={`${paragraph}-${index}`} isRTL={isRTL} light={light}>
          {paragraph}
        </BodyText>
      ))}
    </div>
  );
}

function resolveCtaHref(cta: ServiceCta, targets?: ServiceCtaTargets) {
  if (cta.href) return cta.href;
  if (targets?.byLabel?.[cta.label]) return targets.byLabel[cta.label];
  if (cta.type === "secondary") {
    return targets?.secondary ?? "/request-strategic-consultation";
  }
  return targets?.primary ?? "/financial-decision-assessment";
}

export function SectionCtas({
  ctas,
  targets,
  isRTL,
  light = false,
}: {
  ctas: ServiceCta[];
  targets?: ServiceCtaTargets;
  isRTL: boolean;
  light?: boolean;
}) {
  if (!ctas.length) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {ctas.map((cta) => {
        const isPrimary = cta.type === "primary";

        return (
          <ActionButton
            key={`${cta.type}-${cta.label}`}
            href={resolveCtaHref(cta, targets)}
            variant={cta.type}
            size="lg"
            icon={Arrow}
            iconPosition="end"
            contentAlignment="between"
            className={`w-full shadow-none sm:w-auto sm:min-w-[16rem] ${
              light && isPrimary
                ? "bg-brand-accent text-white hover:bg-white hover:text-brand-primary hover:shadow-none"
                : light
                  ? "border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-brand-primary"
                  : "hover:shadow-none"
            }`}
          >
            {cta.label}
          </ActionButton>
        );
      })}
    </div>
  );
}

export function EntryGrid({
  entries,
  isRTL,
  light = false,
  columns = 3,
  numbered = true,
}: {
  entries: NormalizedEntry[];
  isRTL: boolean;
  light?: boolean;
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  if (!entries.length) return null;

  const cols =
    columns === 4
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : columns === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <div
      className={`grid border-t border-s ${cols} ${
        light ? "border-white/18" : "border-line"
      }`}
    >
      {entries.map((entry, index) => (
        <article
          key={`${entry.title}-${index}`}
          className={`min-w-0 border-e border-b p-5 sm:p-6 ${
            light ? "border-white/18" : "border-line"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={`mt-2 text-[15px] font-extrabold sm:text-[16px] lg:text-[17px] ${
                  light ? "text-white" : "text-ink"
                } ${isRTL ? "leading-[1.85]" : "leading-[1.42]"}`}
              >
                {entry.title}
              </h3>
            </div>
          </div>

          {entry.englishLabel ? (
            <p
              dir="ltr"
              className={`mt-1 text-[9px] font-bold uppercase tracking-[0.1em] ${
                light ? "text-white/42" : "text-ink-muted/55"
              }`}
            >
              {entry.englishLabel}
            </p>
          ) : null}

          {entry.description ? (
            <p
              className={`mt-3 text-[13px] font-medium sm:text-[14px] ${
                light ? "text-white/68" : "text-ink-muted"
              } ${isRTL ? "leading-[1.95]" : "leading-[1.68]"}`}
            >
              {entry.description}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function QuestionList({
  entries,
  isRTL,
  light = false,
}: {
  entries: NormalizedEntry[];
  isRTL: boolean;
  light?: boolean;
}) {
  if (!entries.length) return null;

  return (
    <div className={`border-t ${light ? "border-white/18" : "border-line"}`}>
      {entries.map((entry, index) => (
        <div
          key={`${entry.title}-${index}`}
          className={`grid gap-2 border-b py-4 sm:grid-cols-1 sm:items-start sm:gap-5 sm:py-5 ${
            light ? "border-white/18" : "border-line"
          }`}
        >
          <div>
            <h3
              className={`text-[15px] font-extrabold sm:text-[16px] ${
                light ? "text-white" : "text-ink"
              } ${isRTL ? "leading-[1.85]" : "leading-[1.45]"}`}
            >
              {entry.title}
            </h3>
            {entry.description ? (
              <p
                className={`mt-1.5 text-[13px] font-medium sm:text-[14px] ${
                  light ? "text-white/66" : "text-ink-muted"
                } ${isRTL ? "leading-[1.95]" : "leading-[1.68]"}`}
              >
                {entry.description}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FrameworkBand({
  value,
  light = false,
}: {
  value?: string;
  light?: boolean;
}) {
  if (!value) return null;

  return (
    <div
      className={`border-s-[4px] border-brand-accent px-5 py-4 sm:px-6 ${
        light ? "bg-white/[0.07] text-white" : "bg-brand-primary text-white"
      }`}
    >
      <p
        dir="auto"
        className="text-[12px] font-black leading-[1.8] sm:text-[14px]"
      >
        {value}
      </p>
    </div>
  );
}

export function SectionClosing({
  closing,
  isRTL,
  light = false,
  className = "",
}: {
  closing: string[];
  isRTL: boolean;
  light?: boolean;
  className?: string;
}) {
  if (!closing.length) return null;

  return (
    <div
      className={`border-y py-5 ${light ? "border-white/18" : "border-line"} ${className}`}
    >
      <div className="max-w-[68rem]">
        {closing.map((paragraph, index) => (
          <BodyText
            key={`${paragraph}-${index}`}
            isRTL={isRTL}
            light={light}
            strong={index === closing.length - 1}
            className={index ? "mt-2.5" : ""}
          >
            {paragraph}
          </BodyText>
        ))}
      </div>
    </div>
  );
}

export function ChecklistGrid({
  items,
  isRTL,
  light = false,
}: {
  items: string[];
  isRTL: boolean;
  light?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div
      className={`grid border-t border-s sm:grid-cols-2 lg:grid-cols-4 ${
        light ? "border-white/18" : "border-line"
      }`}
    >
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className={`border-e border-b p-5 sm:p-6 ${
            light ? "border-white/18" : "border-line"
          }`}
        >
          <p
            className={`mt-2 text-[14px] font-bold sm:text-[13px] ${
              light ? "text-white" : "text-ink"
            } ${isRTL ? "leading-[1.9]" : "leading-[1.55]"}`}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
