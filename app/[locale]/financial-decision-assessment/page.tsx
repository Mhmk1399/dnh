import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import assessmentEn from "@/config/DNH_Financial_Decision_Assessment_Final_EN.json";
import assessmentFa from "@/config/DNH_Financial_Decision_Assessment_Final_FA.json";
import { AfterSubmissionSection } from "@/components/static/financial-decision-assessment/AfterSubmissionSection";
import { AssessmentContactSection } from "@/components/static/financial-decision-assessment/AssessmentContactSection";
import { AssessmentFormSection } from "@/components/static/financial-decision-assessment/AssessmentFormSection";
import { AssessmentProcessSection } from "@/components/static/financial-decision-assessment/AssessmentProcessSection";
import { FinancialDecisionAssessmentHero } from "@/components/static/financial-decision-assessment/FinancialDecisionAssessmentHero";
import { PrivacyConfidentialitySection } from "@/components/static/financial-decision-assessment/PrivacyConfidentialitySection";
import { WhyAssessmentSection } from "@/components/static/financial-decision-assessment/WhyAssessmentSection";
import type { FinancialDecisionAssessmentPageContent } from "@/components/static/financial-decision-assessment/assessmentTypes";

type PageProps = { params: Promise<{ locale: string }> };

const page = async ({ params }: PageProps) => {
  const { locale: localeParam } = await params;
  const locale = normalizeSiteLocale(localeParam);
  const pageContent = (locale === "en" ? assessmentEn : assessmentFa) as FinancialDecisionAssessmentPageContent;
  const { direction, lang, sections } = pageContent;

  return (
    <main lang={lang} dir={direction}>
      <FinancialDecisionAssessmentHero content={sections.hero} direction={direction} lang={lang} />
      <WhyAssessmentSection content={sections.why} direction={direction} />
      <AssessmentProcessSection content={sections.process} direction={direction} />
      <AssessmentFormSection content={sections.form} direction={direction} />
      <PrivacyConfidentialitySection content={sections.privacy} direction={direction} />
      <AfterSubmissionSection content={sections.after_submission} direction={direction} />
      <AssessmentContactSection content={sections.contact} direction={direction} />
    </main>
  );
};

export default page;

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return localizePageMetadata({}, "/financial-decision-assessment", normalizeSiteLocale(locale));
}
