import type { Metadata } from "next";

import macroEn from "@/config/DNH_Macro_Market_Advisory_Final_EN.json";
import macroFa from "@/config/DNH_Macro_Market_Advisory_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";

const ROUTE = "/services/macro-market-advisory";

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
    ? "مشاوره اقتصاد و بازار | تحلیل سناریو برای تصمیم مالی | DNH"
    : "Macro & Market Advisory | Scenario Analysis for Decisions | DNH";

  const description = isFa
    ? "مشاوره اقتصاد و بازار DNH برای ترجمه تغییرات تورم، ارز، نقدینگی، سیاست‌های اقتصادی و بازارها به سناریوها و پیامدهای قابل استفاده در تصمیم‌گیری."
    : "DNH Macro & Market Advisory translates changes in inflation, currencies, liquidity, policy and markets into scenarios and implications for real financial decisions.";

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

export default function MacroMarketAdvisoryPage() {
  return (
    <ServiceDetailPage
      faData={macroFa}
      enData={macroEn}
      media={{
        1: {
          src:"/assets/images/risk.webp",
          mobileSrc:"/assets/images/risk.webp",
          alt: "Macro and market advisory for financial decision-making",
          objectPosition: "center center",
        },
        6: {
          src: "/assets/images/risk.webp",
          mobileSrc:
            "/assets/images/risk.webp",
          alt: "Economic environment and market implications assessment",
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
