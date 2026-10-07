import { HoldingCapitalAllocationSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingCapitalAllocationSection";
import { HoldingFinalCtaSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingFinalCtaSection";
import { HoldingFinancialPressureSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingFinancialPressureSection";
import { HoldingFinancialStructureHero } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingFinancialStructureHero";
import { HoldingFinancialSystemSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingFinancialSystemSection";
import { HoldingOutcomeSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingOutcomeSection";
import { HoldingStrategicReviewSection } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingStrategicReviewSection";

const page = () => {
  return (
    <div>
      <HoldingFinancialStructureHero />
      <HoldingFinancialPressureSection />
      <HoldingCapitalAllocationSection />
      <HoldingFinancialSystemSection />
      <HoldingStrategicReviewSection />
      <HoldingOutcomeSection />
      <HoldingFinalCtaSection />
    </div>
  );
};

export default page;
