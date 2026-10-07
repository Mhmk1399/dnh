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
