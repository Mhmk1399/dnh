import { ActionButton } from "@/components/ui/ActionButton";
import type { MajorDecisionSection } from "./majorDecisionTypes";

const ctaRoutes: Record<string, string[]> = {
  "major-financial-decision-hero": [
    "/financial-decision-assessment",
    "/request-strategic-consultation",
  ],
  "what-happens-after-the-assessment": ["/services"],
  "clarify-the-decision-before-you-commit-capital": [
    "/financial-decision-assessment",
    "/request-strategic-consultation",
  ],
};

export function MajorDecisionEyebrow({
  section,
  dark = false,
}: {
  section: MajorDecisionSection;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "text-page/90" : "text-brand-primary"}>
      <p className="flex items-center gap-3 text-[12px] font-bold leading-[1.8] sm:text-[13px]">
        <span
          aria-hidden="true"
          className="h-[2px] w-9 shrink-0 bg-brand-accent"
        />
        {section.eyebrow}
      </p>
    </div>
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
      className={`mt-5 max-w-[38ch] text-pretty text-[clamp(2rem,7.7vw,2.8rem)] font-black leading-[1.45] tracking-[-0.03em] sm:text-[clamp(2.8rem,5.2vw,2.8rem)] ${dark ? "text-page" : "text-ink"}`}
    >
      {section.heading}
    </h2>
  );
}

export function MajorDecisionCopy({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-[14px] leading-[2] sm:text-[16px] ${dark ? "text-page/80" : "text-ink-muted"}`}
    >
      {children}
    </p>
  );
}

export function MajorDecisionActions({
  section,
  dark = false,
}: {
  section: MajorDecisionSection;
  dark?: boolean;
  rtl: boolean;
}) {
  if (!section.ctas?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {section.ctas.map((cta, index) => (
        <ActionButton
          key={`${section.id}-cta-${index}`}
          href={
            ctaRoutes[section.id]?.[index] ?? "/financial-decision-assessment"
          }
          variant={index ? "secondary" : "primary"}
          shape="square"
          size="lg"

          className={
            dark && index
              ? "border-page/30 bg-transparent text-page hover:bg-page hover:text-ink"
              : "shadow-none hover:shadow-none"
          }
        >
          {cta.label}
        </ActionButton>
      ))}
    </div>
  );
}
