import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { PortfolioDifferenceSection } from '@/components/static/DNH/wealth-architecture/PortfolioDifferenceSection'
import { WealthArchitectureBlindSpotsSection } from '@/components/static/DNH/wealth-architecture/WealthArchitectureBlindSpotsSection'
import { WealthArchitectureHero } from '@/components/static/DNH/wealth-architecture/WealthArchitectureHero'
import { WealthArchitectureIntro } from '@/components/static/DNH/wealth-architecture/WealthArchitectureIntro'
import { WealthClearerPictureSection } from '@/components/static/DNH/wealth-architecture/WealthClearerPictureSection'
import { WealthComponentsSection } from '@/components/static/DNH/wealth-architecture/WealthComponentsSection'
 
const page = () => {
  return (
    <main>
        <WealthArchitectureHero />
        <WealthArchitectureIntro />
        <WealthComponentsSection />
        <PortfolioDifferenceSection />
        <WealthArchitectureBlindSpotsSection  />
        <WealthClearerPictureSection  />
    </main>
  )
}

export default page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/dnh/wealth-architecture", normalizeSiteLocale(locale));
}
