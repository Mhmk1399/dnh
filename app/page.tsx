import { WealthArchitectureSection } from "@/components/static/Home/AboutDnhSection";
import { CaseStudiesSection } from "@/components/static/Home/CaseStudiesSection";
import { DecisionMarketsSection } from "@/components/static/Home/DecisionMarketsSection";
import { DnhFrameworkSection } from "@/components/static/Home/DnhFrameworkSection";
import { FaqSection } from "@/components/static/Home/FaqSection";
import { FinalCtaSection } from "@/components/static/Home/FinalCtaSection";
import { HomeHero } from "@/components/static/Home/HomeHero";
import { ServicesTimelineSection } from "@/components/static/Home/ServicesTimelineSection";

export default function HomePage() {
  return (
    <>
      <main>
        <HomeHero />
        <WealthArchitectureSection />
        <DnhFrameworkSection />
        <ServicesTimelineSection />
        <DecisionMarketsSection />
        <CaseStudiesSection />
        <FaqSection />
        <FinalCtaSection />
       </main>
    </>
  );
}
