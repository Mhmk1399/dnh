import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { MacroMarketAdvisoryHero } from "@/components/static/services/macro-market-advisory/MacroMarketAdvisoryHero";
import { MacroMarketContextSection } from "@/components/static/services/macro-market-advisory/MacroMarketContextSection";
import { MacroMarketEnvironmentSection } from "@/components/static/services/macro-market-advisory/MacroMarketEnvironmentSection";
import { MacroMarketFinalCTASection } from "@/components/static/services/macro-market-advisory/MacroMarketFinalCTASection";
import { MacroMarketImplicationsSection } from "@/components/static/services/macro-market-advisory/MacroMarketImplicationsSection";
import { MacroMarketReviewSection } from "@/components/static/services/macro-market-advisory/MacroMarketReviewSection";

const page = () => {
  return (
    <div>
      <MacroMarketAdvisoryHero />
      <MacroMarketContextSection />
      <MacroMarketReviewSection />
      <MacroMarketEnvironmentSection />
      <MacroMarketImplicationsSection />
      <MacroMarketFinalCTASection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/services/macro-market-advisory", normalizeSiteLocale(locale));
}
