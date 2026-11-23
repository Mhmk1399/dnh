import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";
import type { ExecutiveBriefingSection } from "./executiveBriefingsTypes";

export function ExecutiveBriefingsHero({
  section,
  locale,
}: {
  section: ExecutiveBriefingSection;
  locale: SiteLocale;
}) {
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <>
      <DnhPageHero
        id={section.id}
        direction={direction}
        lang={locale === "fa" ? "fa-IR" : "en-US"}
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
        <div className="border-b border-line bg-surface-soft py-4">
          <p className="dnh-site-shell border-s-2 border-brand-accent ps-4 text-start text-[13px] font-bold leading-[1.9] text-ink-muted sm:text-[14px]">
            {section.note}
          </p>
        </div>
      ) : null}
    </>
  );
}
