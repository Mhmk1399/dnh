import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { FrameworkDataIntelligence } from "@/components/static/DNH/framework/FrameworkBoundarySection";
import { FrameworkHorizonArchitecture } from "@/components/static/DNH/framework/FrameworkCtaSection";
import { FrameworkFromDataToDecision } from "@/components/static/DNH/framework/FrameworkDecisionFlowSection";
import { FrameworkNavigationStrategy } from "@/components/static/DNH/framework/FrameworkInPracticeSection";
import { FrameworkWhyDecisionMatters } from "@/components/static/DNH/framework/FrameworkLayersSection";
import { FrameworkPillarsIntegration } from "@/components/static/DNH/framework/FrameworkPillarsIntegration";
import { FrameworkDecisionContext } from "@/components/static/DNH/framework/FrameworkDecisionContext";
import { FrameworkApplications } from "@/components/static/DNH/framework/FrameworkApplications";
import { FrameworkDecisionOutputs } from "@/components/static/DNH/framework/FrameworkDecisionOutputs";
import { FrameworkBoundaries } from "@/components/static/DNH/framework/FrameworkBoundaries";
import { FrameworkStructuredAssessmentCTA } from "@/components/static/DNH/framework/FrameworkStructuredAssessmentCTA";
import { FrameworkHero } from "@/components/static/DNH/framework/DnhFrameworkHero";
import { PageSectionIndex } from "@/components/static/reviewed-pages/PageSectionIndex";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = normalizeSiteLocale((await params).locale);
  const sections = (locale === "fa" ? frameworkFa : frameworkEn).sections;
  return (
    <div className="[&>section[id]]:scroll-mt-24 lg:[&>section[id]]:scroll-mt-28">
      <FrameworkHero />
      <PageSectionIndex sections={sections.filter((section) => section.type !== "hero")} locale={locale} />
      <FrameworkWhyDecisionMatters />
      <FrameworkFromDataToDecision />
      <FrameworkDataIntelligence />
      <FrameworkNavigationStrategy />
      <FrameworkHorizonArchitecture />
      <FrameworkPillarsIntegration />
      <FrameworkDecisionContext />
      <FrameworkApplications />
      <FrameworkDecisionOutputs />
      <FrameworkBoundaries />
      <FrameworkStructuredAssessmentCTA />
    </div>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(
    {},
    "/dnh/framework",
    normalizeSiteLocale(locale),
  );
}
