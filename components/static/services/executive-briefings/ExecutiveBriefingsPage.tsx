import type { SiteLocale } from "@/lib/site-language";
import { PageSectionIndex } from "@/components/static/reviewed-pages/PageSectionIndex";
import { ExecutiveBriefingsFinalCtaSection } from "./ExecutiveBriefingsFinalCtaSection";
import { ExecutiveBriefingsHero } from "./ExecutiveBriefingsHero";
import {
  ExecutiveBriefingsContentSection,
  ExecutiveBriefingsExampleSection,
  ExecutiveBriefingsOutcomesSection,
  ExecutiveBriefingsProcessSection,
} from "./ExecutiveBriefingsSections";
import type {
  ExecutiveBriefingsDocument,
  ExecutiveBriefingSection,
} from "./executiveBriefingsTypes";

export type { ExecutiveBriefingsDocument } from "./executiveBriefingsTypes";

function renderSection(
  section: ExecutiveBriefingSection,
  locale: SiteLocale,
) {
  const rtl = locale === "fa";

  switch (section.type) {
    case "hero":
      return <ExecutiveBriefingsHero key={section.id} section={section} locale={locale} />;
    case "process":
      return <ExecutiveBriefingsProcessSection key={section.id} section={section} />;
    case "example":
      return <ExecutiveBriefingsExampleSection key={section.id} section={section} />;
    case "outcomes":
      return <ExecutiveBriefingsOutcomesSection key={section.id} section={section} />;
    case "request-form":
      return <ExecutiveBriefingsFinalCtaSection key={section.id} section={section} rtl={rtl} />;
    default:
      return <ExecutiveBriefingsContentSection key={section.id} section={section} rtl={rtl} />;
  }
}

export function ExecutiveBriefingsPage({
  content,
  locale,
}: {
  content: ExecutiveBriefingsDocument;
  locale: SiteLocale;
}) {
  const sections = [...content.sections].sort((a, b) => a.order - b.order);
  const body = sections.filter((section) => section.type !== "hero");
  const hero = sections.find((section) => section.type === "hero");
  return (
    <div dir={content.direction} lang={locale === "fa" ? "fa-IR" : "en-US"} className="[&>section[id]]:scroll-mt-24 lg:[&>section[id]]:scroll-mt-28">
      {hero && renderSection(hero, locale)}
      <PageSectionIndex sections={body} locale={locale} />
      {body.map((section) => renderSection(section, locale))}
    </div>
  );
}
