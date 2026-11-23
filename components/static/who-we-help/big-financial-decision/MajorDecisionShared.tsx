import { ArrowLeft, ArrowRight } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionEyebrow({
  section,
  dark = false,
}: {
  section: MajorDecisionSection;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[12px] font-bold leading-7 sm:text-[13px] ${dark ? "text-white/85" : "text-brand-secondary"}`}
    >
      <span aria-hidden="true" className="h-[2px] w-9 bg-brand-accent" />
      {section.eyebrow}
    </p>
  );
}

export function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  const value = highlight?.trim() ?? "";
  const index = value ? heading.indexOf(value) : -1;
  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-primary">{value}</span>
      {heading.slice(index + value.length)}
    </>
  );
}

export function MajorDecisionHeading({
  section,
  dark = false,
}: {
  section: MajorDecisionSection;
  dark?: boolean;
}) {
  return (
    <h2
      id={`${section.id}-title`}
      className={`mt-4 max-w-[30ch] text-pretty text-[clamp(1.85rem,6.5vw,3.15rem)] font-black leading-[1.5] tracking-[-0.035em] sm:leading-[1.4] ${dark ? "text-white" : "text-ink"}`}
    >
      <HighlightedHeading
        heading={section.heading}
        highlight={section.heading_highlight}
      />
    </h2>
  );
}

export function MajorDecisionIntro({
  section,
  dark = false,
}: {
  section: MajorDecisionSection;
  dark?: boolean;
}) {
  if (!section.paragraphs?.length) return null;
  return (
    <div
      className={`max-w-[76ch] space-y-2 border-s-2 ps-5 ${dark ? "border-brand-primary/70 text-white/75" : "border-brand-primary text-ink-muted"}`}
    >
      {section.paragraphs.map((paragraph, index) => (
        <p
          key={`${section.id}-intro-${index}`}
          className="text-start text-[14px] leading-[2] sm:text-[16px]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function MajorDecisionActions({
  section,
  rtl,
  dark = false,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
  dark?: boolean;
}) {
  if (!section.ctas?.length) return null;
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {section.ctas.map((cta) => (
        <ActionButton
          key={cta.id}
          href={cta.href}
          variant={cta.type}
          shape="square"
          size="lg"
          icon={Arrow}
          className={
            dark && cta.type === "secondary"
              ? "border-white/25 bg-transparent text-white shadow-none hover:bg-white hover:text-ink"
              : "shadow-none hover:shadow-none"
          }
        >
          {cta.label}
        </ActionButton>
      ))}
    </div>
  );
}
