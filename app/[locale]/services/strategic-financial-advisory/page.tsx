import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { StrategicAdvisoryArchitectureSection } from "@/components/static/services/strategic-financial-advisory/StrategicAdvisoryArchitectureSection";
import { StrategicAdvisoryContextSection } from "@/components/static/services/strategic-financial-advisory/StrategicAdvisoryContextSection";
import { StrategicAdvisoryCTASection } from "@/components/static/services/strategic-financial-advisory/StrategicAdvisoryCTASection";
import { StrategicAdvisoryOutcomeSection } from "@/components/static/services/strategic-financial-advisory/StrategicAdvisoryOutcomeSection";
import { StrategicAdvisoryReviewSection } from "@/components/static/services/strategic-financial-advisory/StrategicAdvisoryReviewSection";
import { StrategicFinancialAdvisoryHero } from "@/components/static/services/strategic-financial-advisory/StrategicFinancialAdvisoryHero";

const page = () => {
  return (
    <div>
      <StrategicFinancialAdvisoryHero />
      <StrategicAdvisoryContextSection />
      <StrategicAdvisoryReviewSection />
      <StrategicAdvisoryArchitectureSection />
      <StrategicAdvisoryOutcomeSection />
      <StrategicAdvisoryCTASection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/services/strategic-financial-advisory", normalizeSiteLocale(locale));
}
