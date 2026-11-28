import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";

import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorFinancialDecisionHero({
  section,
  locale,
  rtl,
}: {
  section: MajorDecisionSection;
  locale: SiteLocale;
  rtl: boolean;
}) {
  return (
    <>
      <DnhPageHero
        id={section.id}
        direction={rtl ? "rtl" : "ltr"}
        lang={locale === "fa" ? "fa-IR" : "en"}
        eyebrow={section.eyebrow}
        heading={section.heading}
        headingHighlight={section.heading_highlight}
        paragraphs={(section.paragraphs ?? []).map((text, index) => ({
          id: `${section.id}-paragraph-${index + 1}`,
          text,
        }))}
        ctas={(section.ctas ?? []).map((cta) => ({
          id: cta.id,
          label: cta.label,
          type: cta.type,
          href: cta.href,
        }))}
        media={section.media}
        mediaMode="background"
      />
      {section.note ? (
        <div className="border-b border-line bg-surface-soft py-4 text-ink">
          <p className="dnh-site-shell border-s-2 border-brand-primary ps-4 text-start text-[13px] font-bold leading-[1.9] text-ink-muted sm:text-[14px]">
            {section.note}
          </p>
        </div>
      ) : null}
    </>
  );
}
