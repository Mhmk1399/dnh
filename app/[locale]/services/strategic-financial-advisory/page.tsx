import type { Metadata } from "next";

import strategicEn from "@/config/DNH_Strategic_Financial_Advisory_Final_EN.json";
import strategicFa from "@/config/DNH_Strategic_Financial_Advisory_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";

const ROUTE = "/services/strategic-financial-advisory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const alternates = getLocalizedAlternates(ROUTE, locale);
  const isFa = locale === "fa";

  const title = isFa
    ? "مشاوره مالی راهبردی | تصمیم‌های سرمایه و تأمین مالی | DNH"
    : "Strategic Financial Advisory | Capital & Financing Decisions | DNH";

  const description = isFa
    ? "مشاوره مالی راهبردی DNH برای تصمیم‌های مهم سرمایه، نقدینگی، تأمین مالی، ساختار سرمایه و آینده کسب‌وکار با نگاه ساختاریافته و سناریومحور."
    : "DNH Strategic Financial Advisory supports major decisions involving capital, liquidity, financing, capital structure and the future direction of the business.";

  return localizePageMetadata(
    {
      title,
      description,
      alternates,
      openGraph: {
        type: "website",
        locale: isFa ? "fa_IR" : "en_US",
        alternateLocale: isFa ? "en_US" : "fa_IR",
        url: alternates.canonical,
        title,
        description,
      },
    },
    ROUTE,
    locale,
  );
}

export default function StrategicFinancialAdvisoryPage() {
  return (
    <ServiceDetailPage
      faData={strategicFa}
      enData={strategicEn}
      media={{
        1: {
          src: "/assets/images/risk.webp",
          mobileSrc: "/assets/images/risk.webp",
          alt: "Strategic financial advisory for business and capital decisions",
          objectPosition: "center center",
        },
        6: {
          src: "/assets/images/risk.webp",
          mobileSrc: "/assets/images/risk.webp",
          alt: "Review of financial structure, liquidity and financing decisions",
          objectPosition: "center center",
        },
      }}
      ctaTargets={{
        primary: "/financial-decision-assessment",
        secondary: "/request-strategic-consultation",
      }}
    />
  );
}
