import { PrivateWealthStrategyHero } from "@/components/static/services/private-wealth-strategy/PrivateWealthStrategyHero";
import { WealthStrategyFinalSection } from "@/components/static/services/private-wealth-strategy/WealthStrategyFinalSection";
import { WealthStrategyFitSection } from "@/components/static/services/private-wealth-strategy/WealthStrategyFitSection";
import { WealthStrategyProblemSection } from "@/components/static/services/private-wealth-strategy/WealthStrategyProblemSection";
import { WealthStrategyReviewSection } from "@/components/static/services/private-wealth-strategy/WealthStrategyReviewSection";
import { WealthStrategyViewSection } from "@/components/static/services/private-wealth-strategy/WealthStrategyViewSection";
import { Metadata } from "next";
import { localizePageMetadata, getLocalizedAlternates } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  return localizePageMetadata({
    title: "استراتژی ثروت خصوصی | DNH",
    description:
      "استراتژی ثروت خصوصی DNH برای بررسی یکپارچه دارایی‌ها، اهداف، نقدشوندگی، ریسک و مسیرهای تصمیم مالی طراحی شده است.",
    alternates: getLocalizedAlternates("/services/private-wealth-strategy", locale),
  }, "/services/private-wealth-strategy", locale);
}
const page = () => {
  return (
    <div>
      <PrivateWealthStrategyHero />
      <WealthStrategyFitSection />
      <WealthStrategyProblemSection />
      <WealthStrategyReviewSection />
      <WealthStrategyViewSection />
      <WealthStrategyFinalSection />
    </div>
  );
};

export default page;
