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
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "دکتر نسیم محمدحسنی | معماری ثروت و مشاوره مالی",

  description:
    "DNH، چارچوب تخصصی دکتر نسیم محمدحسنی برای معماری ثروت، ارزیابی ریسک و مشاوره مالی استراتژیک به سرمایه‌گذاران، خانواده‌ها و کسب‌وکارها.",
  applicationName: "DNH",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DNH",
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
};
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
