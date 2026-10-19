import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";

import type { MajorDecisionSection } from "./majorDecisionTypes";

const heroCtaRoutes = [
  "/financial-decision-assessment",
  "/request-strategic-consultation",
] as const;

export function MajorFinancialDecisionHero({
  section,
  locale,
  rtl,
}: {
  section: MajorDecisionSection;
  locale: SiteLocale;
  rtl: boolean;
}) {
  const words = section.heading.trim().split(/\s+/);

  return (
    <DnhPageHero
      id={section.id}
      direction={rtl ? "rtl" : "ltr"}
      lang={locale === "fa" ? "fa-IR" : "en"}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headingHighlight={words.slice(-Math.min(rtl ? 4 : 3, words.length)).join(" ")}
      paragraphs={(section.paragraphs ?? []).map((text, index) => ({
        id: `${section.id}-paragraph-${index + 1}`,
        text,
      }))}
      ctas={(section.ctas ?? []).map((cta, index) => ({
        id: `${section.id}-cta-${index + 1}`,
        label: cta.label,
        type: index === 0 ? "primary" : "secondary",
        href: heroCtaRoutes[index] ?? "/financial-decision-assessment",
      }))}
      media={{
        src: "/assets/images/big-financial-decision4.webp",
        alt:
          locale === "fa"
            ? "تصویر تحلیلی برای یک تصمیم مالی بزرگ"
            : "Analytical context for a major financial decision",
      }}
      mediaMode="background"
    />
  );
}
