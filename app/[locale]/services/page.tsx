import type { Metadata } from "next";

import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { ServicesHero } from "@/components/static/services/ServicesHero";
import { ServicesPositioning } from "@/components/static/services/ServiceFitSection";
import { ServicesServiceSection } from "@/components/static/services/ServicesServiceSection";
import { ServicesAssessmentRouting } from "@/components/static/services/ServicesAssessmentRouting";
import { ServicesFinalCtaSection } from "@/components/static/services/ServicesFinalCtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);

  return localizePageMetadata(
    {
      title: "خدمات DNH | معماری ثروت و مشاوره مالی راهبردی",
      description:
        "خدمات DNH شامل استراتژی ثروت خصوصی، هوشمندی پرتفوی، مشاوره مالی راهبردی، مشاوره اقتصاد و بازار، مدیریت ریسک و Executive Briefings است.",
      alternates: getLocalizedAlternates("/services", locale),
      openGraph: {
        type: "website",
        locale: locale === "fa" ? "fa_IR" : "en_US",
        alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
        url: getLocalizedAlternates("/services", locale).canonical,
        title: "خدمات DNH | مسیرهای تخصصی برای تصمیم‌های مالی",
        description:
          "آشنایی با خدمات DNH برای معماری ثروت، بررسی پرتفوی، تصمیم‌های مالی راهبردی، ریسک و محیط اقتصادی.",
      },
    },
    "/services",
    locale,
  );
}

const page = () => {
  return (
    <div >
      <ServicesHero />
      <ServicesPositioning />

      <ServicesServiceSection
        serviceId="private-wealth-strategy"
        layout="media"
        tone="page"
        mediaSide="end"
      />

      <ServicesServiceSection
        serviceId="portfolio-intelligence"
        layout="focus" 
        tone="soft" 
      />

      <ServicesServiceSection
        serviceId="strategic-financial-advisory"
        layout="statement"
        tone="page"
      />

      <ServicesServiceSection
        serviceId="macro-market-advisory"
        layout="analysis"
        tone="page"
      />

      <ServicesServiceSection
        serviceId="risk-management-wealth-protection"
        layout="protection"
        tone="secondary"
      />

      <ServicesServiceSection
        serviceId="executive-briefings"
        layout="briefing"
        tone="page"
      />
      <ServicesAssessmentRouting  />
      <ServicesFinalCtaSection />
    </div>
  );
};

export default page;
