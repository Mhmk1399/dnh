import { HomeWhoWeHelp } from "@/components/static/Home/HomeWhoWeHelp";
import { HomeHero } from "@/components/static/Home/HomeHero";
import { HomeWholeWealthView } from "@/components/static/Home/HomeWholeWealthView";
import { HomeDecisionComparison } from "@/components/static/Home/HomeDecisionComparison";
import { HomeFramework } from "@/components/static/Home/WholeWealthViewSection";
import { HomeIntelligenceDesk } from "@/components/static/Home/HomeIntelligenceDesk";
import { HomeWeeklyOutlook } from "@/components/static/Home/HomeWeeklyOutlook";
import { HomeInsights } from "@/components/static/Home/HomeInsights";
import { AboutDrNasimSection } from "@/components/static/Home/AboutDrNasimSection";
import { FinancialDecisionAssessmentSection } from "@/components/static/Home/FinancialDecisionAssessmentSection";
import type { Metadata } from "next";
import { getHomepageContent } from "@/lib/homepage-content";
import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { HomeServices } from "@/components/static/Home/HomeServices";
import { HomeProblemRecognition } from "@/components/static/Home/HomeProblemRecognition";
import { PageSectionIndex } from "@/components/static/reviewed-pages/PageSectionIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const homepage = getHomepageContent(locale);
  return localizePageMetadata(
    {
      title: homepage.seo.title,
      description: homepage.seo.description,
      applicationName: homepage.brand,
    },
    "/",
    locale,
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const homepage = getHomepageContent(locale);
  return (
    <>
      <div className="dnh-home-sections [&>section[id]]:scroll-mt-24 lg:[&>section[id]]:scroll-mt-28">
        <HomeHero locale={locale} />
        <PageSectionIndex sections={homepage.sections.filter((section) => section.type !== "hero")} locale={locale} />

        <HomeProblemRecognition homepage={homepage} />

        <HomeDecisionComparison homepage={homepage} />

        <HomeFramework homepage={homepage} />

        <HomeIntelligenceDesk homepage={homepage} />

        <HomeWholeWealthView homepage={homepage} />

        <HomeServices homepage={homepage} />

        <HomeWeeklyOutlook homepage={homepage} />

        <HomeInsights homepage={homepage} />

        <AboutDrNasimSection homepage={homepage} />

        <HomeWhoWeHelp homepage={homepage} />

        <FinancialDecisionAssessmentSection homepage={homepage} />
      </div>
    </>
  );
}
