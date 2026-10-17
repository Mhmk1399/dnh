import type { Metadata } from "next";

import riskEn from "@/config/DNH_Risk_Management_Wealth_Protection_Final_EN.json";
import riskFa from "@/config/DNH_Risk_Management_Wealth_Protection_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";

const ROUTE = "/services/risk-management-wealth-protection";

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
    ? "مدیریت ریسک و حفاظت از ثروت | شناخت آسیب‌پذیری‌ها | DNH"
    : "Risk Management & Wealth Protection | Structural Risk Review | DNH";

  const description = isFa
    ? "خدمت مدیریت ریسک و حفاظت از ثروت DNH برای شناخت تمرکز، وابستگی، نقدشوندگی و آسیب‌پذیری‌های ساختار ثروت و اولویت‌بندی حوزه‌های نیازمند توجه طراحی شده است."
    : "DNH Risk Management & Wealth Protection identifies concentration, dependency, liquidity and structural vulnerabilities to clarify protection priorities.";

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

export default function RiskManagementWealthProtectionPage() {
  return (
    <ServiceDetailPage
      faData={riskFa}
      enData={riskEn}
      media={{
        1: {
          src: "/assets/images/risk-management-wealth-protection-hero.webp",
          mobileSrc:
            "/assets/images/risk-management-wealth-protection-hero.webp",
          alt: "Risk management and wealth protection advisory",
          objectPosition: "center center",
        },
        6: {
          src: "/assets/images/concentration-dependency-risk.webp",
          mobileSrc: "/assets/images/concentration-dependency-risk.webp",
          alt: "Assessment of concentration, dependency and structural risk",
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
