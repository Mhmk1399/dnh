import type { Metadata } from "next";
import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";
import portfolioFa from "@/config/DNH_Portfolio_Intelligence_Final_FA.json";
import portfolioEn from "@/config/DNH_Portfolio_Intelligence_Final_EN.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  return localizePageMetadata(
    {
      title: "هوشمندی پرتفوی | بررسی ساختار، ریسک و نقدشوندگی | DNH",

      description:
        "هوشمندی پرتفوی DNH برای بررسی ساختار دارایی‌ها، تمرکز ریسک، نقدشوندگی و حوزه‌های نیازمند بازبینی در پرتفوی‌های متنوع طراحی شده است.",

      alternates: getLocalizedAlternates(
        "/services/portfolio-intelligence",
        locale,
      ),
    },
    "/services/portfolio-intelligence",
    locale,
  );
}

const page = () => {
  return (
    <main>
      <ServiceDetailPage
        faData={portfolioFa}
        enData={portfolioEn}
        media={{
          1: {
            src: "/assets/images/risk.webp",
            mobileSrc: "/assets/images/risk.webp",
            alt: "Portfolio Intelligence advisory and portfolio structure review",
          },
          6: {
            src: "/assets/images/risk.webp",
            mobileSrc: "/assets/images/risk.webp",
            alt: "Portfolio structure, allocation and liquidity assessment",
          },
        }}
        ctaTargets={{
          primary: "/financial-decision-assessment",
          secondary: "/request-strategic-consultation",
        }}
      />
    </main>
  );
};

export default page;
