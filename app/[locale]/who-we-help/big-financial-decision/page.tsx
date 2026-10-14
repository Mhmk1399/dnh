import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { MajorDecisionClaritySection } from "@/components/static/who-we-help/big-financial-decision/MajorDecisionClaritySection";
import { MajorDecisionDimensionsSection } from "@/components/static/who-we-help/big-financial-decision/MajorDecisionDimensionsSection";
import { MajorDecisionDnhSection } from "@/components/static/who-we-help/big-financial-decision/MajorDecisionDnhSection";
import { MajorDecisionFinalCtaSection } from "@/components/static/who-we-help/big-financial-decision/MajorDecisionFinalCtaSection";
import { MajorDecisionReadinessSection } from "@/components/static/who-we-help/big-financial-decision/MajorDecisionReadinessSection";
import { MajorFinancialDecisionHero } from "@/components/static/who-we-help/big-financial-decision/MajorFinancialDecisionHero";

const page = () => {
  return (
    <div>
      <MajorFinancialDecisionHero />
      <MajorDecisionClaritySection />
      <MajorDecisionDimensionsSection />
      <MajorDecisionReadinessSection />
      <MajorDecisionDnhSection />
      <MajorDecisionFinalCtaSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/who-we-help/big-financial-decision", normalizeSiteLocale(locale));
}
