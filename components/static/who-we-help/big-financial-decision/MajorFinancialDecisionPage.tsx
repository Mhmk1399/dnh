import type { SiteLocale } from "@/lib/site-language";
import { MajorDecisionClaritySection } from "./MajorDecisionClaritySection";
import { MajorDecisionDimensionsSection } from "./MajorDecisionDimensionsSection";
import { MajorDecisionDnhSection } from "./MajorDecisionDnhSection";
import { MajorDecisionFinalCtaSection } from "./MajorDecisionFinalCtaSection";
import { MajorDecisionReadinessSection } from "./MajorDecisionReadinessSection";
import { MajorFinancialDecisionHero } from "./MajorFinancialDecisionHero";
import type {
  MajorDecisionDocument,
  MajorDecisionSection,
} from "./majorDecisionTypes";

export type { MajorDecisionDocument } from "./majorDecisionTypes";

function renderSection(
  section: MajorDecisionSection,
  locale: SiteLocale,
  rtl: boolean,
) {
  switch (section.type) {
    case "hero":
      return (
        <MajorFinancialDecisionHero
          key={section.id}
          section={section}
          locale={locale}
          rtl={rtl}
        />
      );
    case "decision-dimensions":
      return (
        <MajorDecisionDimensionsSection
          key={section.id}
          section={section}
          locale={locale}
          rtl={rtl}
        />
      );
    case "options-tradeoffs":
    case "downside-risk":
    case "liquidity-timing":
    case "scenario-analysis":
      return (
        <MajorDecisionReadinessSection
          key={section.id}
          section={section}
          rtl={rtl}
        />
      );
    case "process":
      return (
        <MajorDecisionDnhSection key={section.id} section={section} rtl={rtl} />
      );
    case "final-cta":
      return (
        <MajorDecisionFinalCtaSection
          key={section.id}
          section={section}
          rtl={rtl}
        />
      );
    default:
      return (
        <MajorDecisionClaritySection
          key={section.id}
          section={section}
          rtl={rtl}
        />
      );
  }
}

export function MajorFinancialDecisionPage({
  content,
  locale,
}: {
  content: MajorDecisionDocument;
  locale: SiteLocale;
}) {
  const rtl = content.direction === "rtl";
  return (
    <main dir={content.direction} className={rtl ? "[&_p]:text-justify" : ""}>
      {content.sections.map((section) => renderSection(section, locale, rtl))}
    </main>
  );
}
