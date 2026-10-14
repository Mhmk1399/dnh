import { HomeWhoWeHelp } from "@/components/static/Home/HomeWhoWeHelp";
import { HomeHero } from "@/components/static/Home/HomeHero";
import { HomeWholeWealthView } from "@/components/static/Home/HomeWholeWealthView";
import { HomeDecisionComparison } from "@/components/static/Home/HomeDecisionComparison";
import { HomeFramework } from "@/components/static/Home/WholeWealthViewSection";
import { HomeIntelligenceDesk } from "@/components/static/Home/HomeIntelligenceDesk";
import { HomeWeeklyOutlook } from "@/components/static/Home/HomeWeeklyOutlook";
import { HomeInsights } from "@/components/static/Home/HomeInsights";
import { HomeResearchCaseStudies } from "@/components/static/Home/HomeResearchCaseStudies";
import { AboutDrNasimSection } from "@/components/static/Home/AboutDrNasimSection";
import { FinancialDecisionAssessmentSection } from "@/components/static/Home/FinancialDecisionAssessmentSection";
import type { Metadata } from "next";
import homepageFa from "@/config/DNH_Homepage_Final_FA.json";
import homepageEn from "@/config/DNH_Homepage_Final_EN.json";
import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { HomeServices } from "@/components/static/Home/HomeServices";
import { HomeProblemRecognition } from "@/components/static/Home/HomeProblemRecognition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const homepage = locale === "fa" ? homepageFa : homepageEn;
  return localizePageMetadata(
    {
      title: homepage.seo.title,
      description: homepage.seo.description,
      alternates: getLocalizedAlternates("/", locale),
      applicationName: homepage.brand,
      manifest: "/manifest.webmanifest",
      appleWebApp: {
        capable: true,
        title: homepage.brand,
        statusBarStyle: "default",
      },
      formatDetection: {
        telephone: false,
      },
      icons: {
        icon: [
          {
            url: "/favicon.ico",
            sizes: "any",
          },
          {
            url: "/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            url: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        apple: [
          {
            url: "/icons/icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        shortcut: ["/favicon.ico"],
      },
      other: {
        "mobile-web-app-capable": "yes",
        "msapplication-TileColor": "#167394",
        "msapplication-config": "none",
      },
    },
    "/",
    locale,
  );
}

export default function HomePage() {
  return (
    <>
      <main>
        <HomeHero />

        <HomeServices />

        <HomeProblemRecognition />

        <HomeWhoWeHelp />

        <HomeDecisionComparison />

        <HomeFramework />

        <HomeWholeWealthView />

        <HomeIntelligenceDesk />

        <HomeWeeklyOutlook />

        <HomeInsights />

        <HomeResearchCaseStudies />

        <FinancialDecisionAssessmentSection />

        <AboutDrNasimSection />
      </main>
    </>
  );
}
