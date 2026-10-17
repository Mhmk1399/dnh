import { Metadata } from "next";
import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { ServiceDetailPage } from "@/components/static/services/details/ServiceDetailPage";
import serviceFa from "@/config/DNH_Private_Wealth_Strategy_Final_FA.json";
import serviceEn from "@/config/DNH_Private_Wealth_Strategy_Final_EN.json";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  return localizePageMetadata(
    {
      title: "استراتژی ثروت خصوصی | DNH",
      description:
        "استراتژی ثروت خصوصی DNH برای بررسی یکپارچه دارایی‌ها، اهداف، نقدشوندگی، ریسک و مسیرهای تصمیم مالی طراحی شده است.",
      alternates: getLocalizedAlternates(
        "/services/private-wealth-strategy",
        locale,
      ),
    },
    "/services/private-wealth-strategy",
    locale,
  );
}
const page = () => {
  return (
    <main>
      <ServiceDetailPage
        faData={serviceFa}
        enData={serviceEn}
        media={{
          1: {
            src: "/assets/images/risk.webp",
            mobileSrc: "/assets/images/risk.webpp",
            alt: "Private Wealth Strategy",
          },

          6: {
            src: "/assets/images/risk.webp",
            mobileSrc: "/assets/images/risk.webp",
            alt: "Wealth assessment",
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
