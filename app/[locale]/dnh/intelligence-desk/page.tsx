import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { IntelligenceDeskHero } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskHero";
import { IntelligenceDeskWhatWeMonitor } from "@/components/static/DNH/intelligence-desk/IntelligenceLayersSection";
import { CurrentIntelligenceSnapshot } from "@/components/static/DNH/intelligence-desk/IntelligenceViewSection";
import { IntelligenceDeskMacroRiskView } from "@/components/static/DNH/intelligence-desk/StrategicImplicationsSection";
import { IntelligenceDeskEconomicPressure } from "@/components/static/DNH/intelligence-desk/HighlightedHeading";
import { IntelligenceDeskAssetPositioning } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskAssetPositioning";
import { IntelligenceDeskRiskTemperature } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskRiskTemperature";
import { IntelligenceDeskWeeklyBias } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskWeeklyBias";
import { IntelligenceDeskWhatToWatch } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskWhatToWatch";
import { IntelligenceDeskStrategicImplications } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskStrategicImplications";
import { IntelligenceDeskBoundaries } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskBoundaries";
import { IntelligenceDeskFinalCTA } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskFinalCTA";

const page = () => {  
  return (
    <div>
      <IntelligenceDeskHero />
      <CurrentIntelligenceSnapshot />
      <IntelligenceDeskWhatWeMonitor />
      <IntelligenceDeskMacroRiskView />
      <IntelligenceDeskEconomicPressure />
      <IntelligenceDeskAssetPositioning />
      <IntelligenceDeskRiskTemperature />
      <IntelligenceDeskWeeklyBias />
      <IntelligenceDeskWhatToWatch />
      <IntelligenceDeskStrategicImplications />
      <IntelligenceDeskBoundaries />
      <IntelligenceDeskFinalCTA />
    </div>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(
    {},
    "/dnh/intelligence-desk",
    normalizeSiteLocale(locale),
  );
}
