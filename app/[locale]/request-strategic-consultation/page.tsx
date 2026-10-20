import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import consultationEn from "@/config/DNH_Strategic_Consultation_Final_EN.json";
import consultationFa from "@/config/DNH_Strategic_Consultation_Final_FA.json";
import { StrategicConsultationConfidentialitySection } from "@/components/static/request-strategic-consultation/StrategicConsultationConfidentialitySection";
import { StrategicConsultationFitSection } from "@/components/static/request-strategic-consultation/StrategicConsultationFitSection";
import { StrategicConsultationHero } from "@/components/static/request-strategic-consultation/StrategicConsultationHero";
import { StrategicConsultationPreparationSection } from "@/components/static/request-strategic-consultation/StrategicConsultationPreparationSection";
import { StrategicConsultationProcessSection } from "@/components/static/request-strategic-consultation/StrategicConsultationProcessSection";
import { StrategicConsultationRequestSection } from "@/components/static/request-strategic-consultation/StrategicConsultationRequestSection";
import type { StrategicConsultationPageContent } from "@/components/static/request-strategic-consultation/strategicConsultationTypes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RequestStrategicConsultationPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = normalizeSiteLocale(localeParam);
  const pageContent = (locale === "en" ? consultationEn : consultationFa) as StrategicConsultationPageContent;
  const { direction, lang, sections } = pageContent;

  return (
    <main lang={lang} dir={direction}>
      <StrategicConsultationHero content={sections.hero} direction={direction} lang={lang} />
      <StrategicConsultationFitSection content={sections.fit} direction={direction} />
      <StrategicConsultationPreparationSection content={sections.preparation} direction={direction} />
      <StrategicConsultationProcessSection content={sections.process} direction={direction} />
      <StrategicConsultationRequestSection content={sections.request} direction={direction} />
      <StrategicConsultationConfidentialitySection content={sections.confidentiality} direction={direction} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return localizePageMetadata({}, "/request-strategic-consultation", normalizeSiteLocale(locale));
}
