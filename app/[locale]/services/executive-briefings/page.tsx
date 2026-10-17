import type { Metadata } from "next";

import briefingsEn from "@/config/DNH_Executive_Briefings_Final_EN.json";
import briefingsFa from "@/config/DNH_Executive_Briefings_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";

const ROUTE = "/services/executive-briefings";

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
    ? "نشست‌های مدیران | Executive Briefings برای تصمیم‌های مهم | DNH"
    : "Executive Briefings | Focused Decision-Level Advisory | DNH";

  const description = isFa
    ? "Executive Briefings DNH نشست‌های خصوصی و متمرکز برای بررسی تصمیم‌های مهم مالی، سرمایه‌ای، اقتصادی و راهبردی در سطح مدیران، هیئت‌مدیره و صاحبان سرمایه است."
    : "DNH Executive Briefings are private, focused sessions for important financial, capital, economic and strategic decisions at executive and board level.";

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

export default function ExecutiveBriefingsPage() {
  return (
    <ServiceDetailPage
      faData={briefingsFa}
      enData={briefingsEn}
      media={{
        1: {
          src: "/assets/images/risk.webp",
          mobileSrc: "/assets/images/risk.webp",
          alt: "Private executive briefing for senior decision-makers",
          objectPosition: "center center",
        },
        6: {
          src: "/assets/images/risk.webp",
          mobileSrc:
            "/assets/images/risk.webp",
          alt: "Focused pre-briefing review for an executive decision",
          objectPosition: "center center",
        },
      }}
      ctaTargets={{
        primary: "/financial-decision-assessment",
        secondary: "/request-strategic-consultation",
        byLabel: {
          "درخواست نشست مدیران": "/request-strategic-consultation",
          "Request an executive briefing": "/request-strategic-consultation",
          "Request Executive Briefing": "/request-strategic-consultation",
          "درخواست یک نشست متمرکز": "/request-strategic-consultation",
          "Request a focused briefing": "/request-strategic-consultation",
        },
      }}
    />
  );
}
