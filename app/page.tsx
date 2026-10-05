import { DnhFrameworkSection } from "@/components/static/Home/DnhFrameworkSection";
import { HomeHero } from "@/components/static/Home/HomeHero";
import { AdvisoryServicesSection } from "@/components/static/Home/AdvisoryServicesSection";
import { BrandPositioningStrip } from "@/components/static/Home/BrandPositioningStrip";
import { MarketNoiseVsWealthArchitectureSection } from "@/components/static/Home/MarketNoiseVsWealthArchitectureSection";
import { IntelligenceDeskPreviewSection } from "@/components/static/Home/IntelligenceDeskPreviewSection";
import { WholeWealthViewSection } from "@/components/static/Home/WholeWealthViewSection";
import { WeeklyOutlookSection } from "@/components/static/Home/WeeklyOutlookSection";
import { InsightsSection } from "@/components/static/Home/InsightsSection";
import { ResearchSection } from "@/components/static/Home/ResearchSection";
import { AboutDrNasimSection } from "@/components/static/Home/AboutDrNasimSection";
import { FinancialDecisionAssessmentSection } from "@/components/static/Home/FinancialDecisionAssessmentSection";

export default function HomePage() {
  return (
    <>
      <main>
        <HomeHero />

        <BrandPositioningStrip />

        <MarketNoiseVsWealthArchitectureSection />

        <DnhFrameworkSection />

        <IntelligenceDeskPreviewSection />

        <WholeWealthViewSection />
        <AdvisoryServicesSection />
        <WeeklyOutlookSection />
        <InsightsSection />
        <ResearchSection />
        <AboutDrNasimSection />
        <FinancialDecisionAssessmentSection />
      </main>
    </>
  );
}
