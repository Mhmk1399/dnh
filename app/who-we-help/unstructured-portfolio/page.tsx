import { UnstructuredPortfolioFinalCtaSection } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioFinalCtaSection";
import { UnstructuredPortfolioHero } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioHero";
import { UnstructuredPortfolioProblemsSection } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioProblemsSection";
import { UnstructuredPortfolioReviewSection } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioReviewSection";
import { UnstructuredPortfolioSignsSection } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioSignsSection";
import { UnstructuredPortfolioStructureSection } from "@/components/static/who-we-help/unstructured-portfolio/UnstructuredPortfolioStructureSection";

const page = () => {
  return (
    <div>
      <UnstructuredPortfolioHero />
      <UnstructuredPortfolioSignsSection />
      <UnstructuredPortfolioProblemsSection />
      <UnstructuredPortfolioStructureSection />
      <UnstructuredPortfolioReviewSection />
      <UnstructuredPortfolioFinalCtaSection />
    </div>
  );
};

export default page;
