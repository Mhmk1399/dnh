import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";

import type { HoldingSection } from "./holdingTypes";

const heroRoutes = [
  "/financial-decision-assessment",
  "/request-strategic-consultation",
] as const;

export function HoldingHero({
  section,
  locale,
  rtl,
}: {
  section: HoldingSection;
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
      headingHighlight={words.slice(-Math.min(rtl ? 5 : 4, words.length)).join(" ")}
      paragraphs={(section.paragraphs ?? []).map((text, index) => ({
        id: `${section.id}-paragraph-${index + 1}`,
        text,
      }))}
      ctas={(section.ctas ?? []).map((cta, index) => ({
        id: `${section.id}-cta-${index + 1}`,
        label: cta.label,
        type: index === 0 ? "primary" : "secondary",
        href: heroRoutes[index] ?? "/request-strategic-consultation",
      }))}
      media={{
        src: "/assets/images/complex-financial-structure.png",
        alt:
          locale === "fa"
            ? "معماری مالی و سرمایه یک گروه شرکتی"
            : "Financial and capital architecture of a corporate group",
      }}
      mediaMode="background"
    />
  );
}
