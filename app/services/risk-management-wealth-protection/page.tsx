import { RiskManagementHero } from "@/components/static/services/risk-management-wealth-protection/RiskManagementHero"
import { RiskProtectionContextSection } from "@/components/static/services/risk-management-wealth-protection/RiskProtectionContextSection"
import { RiskProtectionExposureSection } from "@/components/static/services/risk-management-wealth-protection/RiskProtectionExposureSection"
import { RiskProtectionFinalCtaSection } from "@/components/static/services/risk-management-wealth-protection/RiskProtectionFinalCtaSection"
import { RiskProtectionPrioritiesSection } from "@/components/static/services/risk-management-wealth-protection/RiskProtectionPrioritiesSection"
import { RiskProtectionReviewSection } from "@/components/static/services/risk-management-wealth-protection/RiskProtectionReviewSection"

 
const page = () => {
  return (
    <div>
        <RiskManagementHero />
        <RiskProtectionContextSection />
        <RiskProtectionReviewSection />
        <RiskProtectionExposureSection />
        <RiskProtectionPrioritiesSection />
        <RiskProtectionFinalCtaSection />
    </div>
  )
}

export default page