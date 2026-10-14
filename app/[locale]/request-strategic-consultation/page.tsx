import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { StrategicConsultationConfidentialitySection } from "@/components/static/request-strategic-consultation/StrategicConsultationConfidentialitySection";
import { StrategicConsultationFitSection } from "@/components/static/request-strategic-consultation/StrategicConsultationFitSection";
import { StrategicConsultationHero } from "@/components/static/request-strategic-consultation/StrategicConsultationHero";
import { StrategicConsultationPreparationSection } from "@/components/static/request-strategic-consultation/StrategicConsultationPreparationSection";
import { StrategicConsultationProcessSection } from "@/components/static/request-strategic-consultation/StrategicConsultationProcessSection";
import { StrategicConsultationRequestSection } from "@/components/static/request-strategic-consultation/StrategicConsultationRequestSection";

export default function RequestStrategicConsultationPage() {
  return (
    <main>
      <StrategicConsultationHero />
      <StrategicConsultationFitSection />
      <StrategicConsultationPreparationSection />
      <StrategicConsultationProcessSection />
      <StrategicConsultationRequestSection />
      <StrategicConsultationConfidentialitySection />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/request-strategic-consultation", normalizeSiteLocale(locale));
}
