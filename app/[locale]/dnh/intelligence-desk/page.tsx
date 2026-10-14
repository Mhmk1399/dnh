import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { IntelligenceBoundarySection } from "@/components/static/DNH/intelligence-desk/IntelligenceBoundarySection";
import { IntelligenceDeskHero } from "@/components/static/DNH/intelligence-desk/IntelligenceDeskHero";
import { IntelligenceFinalCtaSection } from "@/components/static/DNH/intelligence-desk/IntelligenceFinalCtaSection";
import { IntelligenceLayersSection } from "@/components/static/DNH/intelligence-desk/IntelligenceLayersSection";
import { IntelligenceViewSection } from "@/components/static/DNH/intelligence-desk/IntelligenceViewSection";
import { StrategicImplicationsSection } from "@/components/static/DNH/intelligence-desk/StrategicImplicationsSection";
import { WhatToWatchSection } from "@/components/static/DNH/intelligence-desk/WhatToWatchSection";

const page = () => {
  return (
    <div>
      <IntelligenceDeskHero />
      <IntelligenceViewSection />
      <IntelligenceLayersSection />
      <StrategicImplicationsSection />
      <WhatToWatchSection />
      <IntelligenceBoundarySection />
      <IntelligenceFinalCtaSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/dnh/intelligence-desk", normalizeSiteLocale(locale));
}
