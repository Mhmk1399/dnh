import type { SiteLocale } from "@/lib/site-language";
import { PageSectionIndex } from "@/components/static/reviewed-pages/PageSectionIndex";
import {
  MajorDecisionComparisonSection,
  MajorDecisionContentSection,
} from "./MajorDecisionContentSection";
import { MajorDecisionDnhSection } from "./MajorDecisionDnhSection";
import { MajorDecisionFinalCtaSection } from "./MajorDecisionFinalCtaSection";
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
    case "assessment-comparison":
      return (
        <MajorDecisionComparisonSection
          key={section.id}
          section={section}
          rtl={rtl}
        />
      );
    case "process":
      return (
        <MajorDecisionDnhSection key={section.id} section={section} rtl={rtl} />
      );
    case "assessment-form":
      return (
        <MajorDecisionFinalCtaSection
          key={section.id}
          section={section}
          rtl={rtl}
        />
      );
    default:
      return (
        <MajorDecisionContentSection
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
  const sections = [...content.sections].sort((a, b) => a.order - b.order);
  const body = sections.filter((section) => section.type !== "hero");
  const hero = sections.find((section) => section.type === "hero");

  return (
    <div dir={content.direction} className="[&>section[id]]:scroll-mt-24 lg:[&>section[id]]:scroll-mt-28">
      {hero && renderSection(hero, locale, rtl)}
      <PageSectionIndex sections={body} locale={locale} />
      {body.map((section) => renderSection(section, locale, rtl))}
    </div>
  );
}
