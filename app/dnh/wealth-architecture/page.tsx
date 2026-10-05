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