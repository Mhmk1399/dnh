import { PortfolioFinalCtaSection } from "@/components/static/services/portfolio-intelligence/PortfolioFinalCtaSection";
import { PortfolioIntelligenceHero } from "@/components/static/services/portfolio-intelligence/PortfolioIntelligenceHero";
import { PortfolioOutcomeSection } from "@/components/static/services/portfolio-intelligence/PortfolioOutcomeSection";
import { PortfolioReviewSection } from "@/components/static/services/portfolio-intelligence/PortfolioReviewSection";
import { PortfolioRiskSection } from "@/components/static/services/portfolio-intelligence/PortfolioRiskSection";
import { PortfolioWarningSignsSection } from "@/components/static/services/portfolio-intelligence/PortfolioWarningSignsSection";
import type { Metadata } from "next";
import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  return localizePageMetadata({
    title: "هوشمندی پرتفوی | بررسی ساختار، ریسک و نقدشوندگی | DNH",

    description:
      "هوشمندی پرتفوی DNH برای بررسی ساختار دارایی‌ها، تمرکز ریسک، نقدشوندگی و حوزه‌های نیازمند بازبینی در پرتفوی‌های متنوع طراحی شده است.",

    alternates: getLocalizedAlternates("/services/portfolio-intelligence", locale),
  }, "/services/portfolio-intelligence", locale);
}

const page = () => {
  return (
    <div>
      <PortfolioIntelligenceHero />
      <PortfolioWarningSignsSection />
      <PortfolioReviewSection />
      <PortfolioRiskSection />
      <PortfolioOutcomeSection />
      <PortfolioFinalCtaSection />
    </div>
  );
};

export default page;
