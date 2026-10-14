import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { ExecutiveBriefingsDecisionViewSection } from "@/components/static/services/executive-briefings/ExecutiveBriefingsDecisionViewSection";
import { ExecutiveBriefingsFinalCtaSection } from "@/components/static/services/executive-briefings/ExecutiveBriefingsFinalCtaSection";
import { ExecutiveBriefingsFitSection } from "@/components/static/services/executive-briefings/ExecutiveBriefingsFitSection";
import { ExecutiveBriefingsFocusSection } from "@/components/static/services/executive-briefings/ExecutiveBriefingsFocusSection";
import { ExecutiveBriefingsHero } from "@/components/static/services/executive-briefings/ExecutiveBriefingsHero";
import { ExecutiveBriefingsOutcomeSection } from "@/components/static/services/executive-briefings/ExecutiveBriefingsOutcomeSection";

const page = () => {
  return (
    <div>
      <ExecutiveBriefingsHero />
      <ExecutiveBriefingsFitSection />
      <ExecutiveBriefingsFocusSection />
      <ExecutiveBriefingsDecisionViewSection />
      <ExecutiveBriefingsOutcomeSection />
      <ExecutiveBriefingsFinalCtaSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/services/executive-briefings", normalizeSiteLocale(locale));
}
