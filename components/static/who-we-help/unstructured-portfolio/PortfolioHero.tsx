import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";

import type { PortfolioSection } from "./portfolioTypes";

const heroRoutes = [
  "/financial-decision-assessment",
  "/request-strategic-consultation",
] as const;

export function PortfolioHero({
  section,
  locale,
  rtl,
}: {
  section: PortfolioSection;
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
        href: heroRoutes[index] ?? "/services/portfolio-intelligence",
      }))}
      media={{
        src: "/assets/images/unstructured-portfolio4.webp",
        alt:
          locale === "fa"
            ? "نمای یکپارچه دارایی‌های یک پرتفوی"
            : "A unified view of a multi-asset portfolio",
      }}
      mediaMode="background"
    />
  );
}
