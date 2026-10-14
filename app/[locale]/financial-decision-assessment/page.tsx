import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { AfterSubmissionSection } from "@/components/static/financial-decision-assessment/AfterSubmissionSection";
import { AssessmentContactSection } from "@/components/static/financial-decision-assessment/AssessmentContactSection";
import { AssessmentFormSection } from "@/components/static/financial-decision-assessment/AssessmentFormSection";
import { AssessmentProcessSection } from "@/components/static/financial-decision-assessment/AssessmentProcessSection";
import { FinancialDecisionAssessmentHero } from "@/components/static/financial-decision-assessment/FinancialDecisionAssessmentHero";
import { PrivacyConfidentialitySection } from "@/components/static/financial-decision-assessment/PrivacyConfidentialitySection";
import { WhyAssessmentSection } from "@/components/static/financial-decision-assessment/WhyAssessmentSection";

const page = () => {
  return (
    <div>
      <FinancialDecisionAssessmentHero />
      <WhyAssessmentSection />
      <AssessmentProcessSection />
      <AssessmentFormSection />
      <PrivacyConfidentialitySection />
      <AfterSubmissionSection />
      <AssessmentContactSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/financial-decision-assessment", normalizeSiteLocale(locale));
}
