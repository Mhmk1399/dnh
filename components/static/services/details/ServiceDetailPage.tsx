"use client";

import type { ComponentType } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";

import { normalizeServiceSections } from "./normalizeServiceSection";
import { ServiceAssessmentSection } from "./ServiceAssessmentSection";
import { ServiceAudienceSection } from "./ServiceAudienceSection";
import { ServiceDeepDiveOneSection } from "./ServiceDeepDiveOneSection";
import { ServiceDeepDiveTwoSection } from "./ServiceDeepDiveTwoSection";
import { ServiceDefinitionSection } from "./ServiceDefinitionSection";
import { ServiceFinalCtaSection } from "./ServiceFinalCtaSection";
import { ServiceFocusSection } from "./ServiceFocusSection";
import { ServiceHeroSection } from "./ServiceHeroSection";
import { ServiceOutcomesSection } from "./ServiceOutcomesSection";
import { ServiceProblemSection } from "./ServiceProblemSection";
import { ServiceProcessSection } from "./ServiceProcessSection";
import { ServiceStrategicViewSection } from "./ServiceStrategicViewSection";
import type {
  NormalizedServiceSection,
  ServiceCtaTargets,
  ServiceMediaMap,
  ServicePageSource,
  ServiceSectionOrder,
  ServiceSectionViewProps,
} from "./types";

type ServiceDetailPageProps = {
  faData: ServicePageSource;
  enData?: ServicePageSource;
  media?: ServiceMediaMap;
  ctaTargets?: ServiceCtaTargets;
};

const renderers: Record<
  ServiceSectionOrder,
  ComponentType<ServiceSectionViewProps>
> = {
  1: ServiceHeroSection,
  2: ServiceProblemSection,
  3: ServiceDefinitionSection,
  4: ServiceAudienceSection,
  5: ServiceFocusSection,
  6: ServiceAssessmentSection,
  7: ServiceDeepDiveOneSection,
  8: ServiceDeepDiveTwoSection,
  9: ServiceStrategicViewSection,
  10: ServiceProcessSection,
  11: ServiceOutcomesSection,
  12: ServiceFinalCtaSection,
};

function getSectionMap(sections: NormalizedServiceSection[]) {
  return new Map(sections.map((section) => [section.order, section]));
}

export function ServiceDetailPage({
  faData,
  enData,
  media,
  ctaTargets,
}: ServiceDetailPageProps) {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" && enData ? enData : faData;
  const sections = normalizeServiceSections(source.sections);
  const sectionMap = getSectionMap(sections);

  return (
    <div dir={direction} lang={languageTag} data-service-page={source.page}>
      {Array.from(
        { length: 12 },
        (_, index) => (index + 1) as ServiceSectionOrder,
      ).map((order) => {
        const section = sectionMap.get(order);
        if (!section) return null;

        const Renderer = renderers[order];

        return (
          <Renderer
            key={section.id}
            section={section}
            direction={direction}
            isRTL={isRTL}
            media={media?.[order]}
            ctaTargets={ctaTargets}
          />
        );
      })}
    </div>
  );
}
