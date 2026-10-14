import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { DnhFrameworkHero } from "@/components/static/DNH/framework/DnhFrameworkHero";
import { FrameworkBoundarySection } from "@/components/static/DNH/framework/FrameworkBoundarySection";
import { FrameworkCtaSection } from "@/components/static/DNH/framework/FrameworkCtaSection";
import { FrameworkDecisionFlowSection } from "@/components/static/DNH/framework/FrameworkDecisionFlowSection";
import { FrameworkInPracticeSection } from "@/components/static/DNH/framework/FrameworkInPracticeSection";
import { FrameworkLayersSection } from "@/components/static/DNH/framework/FrameworkLayersSection";

const page = () => {
  return (
    <div>
      <DnhFrameworkHero />
      <FrameworkLayersSection />
      <FrameworkDecisionFlowSection />
      <FrameworkBoundarySection />
      <FrameworkInPracticeSection />
      <FrameworkCtaSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/dnh/framework", normalizeSiteLocale(locale));
}
