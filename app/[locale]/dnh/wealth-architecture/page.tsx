import type { Metadata } from "next";

import wealthArchitectureEn from "@/config/DNH_Wealth_Architecture_Final_EN.json";
import wealthArchitectureFa from "@/config/DNH_Wealth_Architecture_Final_FA.json";
import { DnhApproachSection } from "@/components/static/DNH/wealth-architecture/DnhApproachSection";
import { StartWealthArchitectureSection } from "@/components/static/DNH/wealth-architecture/StartWealthArchitectureSection";
import { WealthArchitectureProcessSection } from "@/components/static/DNH/wealth-architecture/WealthArchitectureProcessSection";
import { WealthAudienceSection } from "@/components/static/DNH/wealth-architecture/WealthAudienceSection";
import { WealthBoundariesSection } from "@/components/static/DNH/wealth-architecture/WealthBoundariesSection";
import { WealthDefinitionSection } from "@/components/static/DNH/wealth-architecture/WealthDefinitionSection";
import { WealthOutcomesSection } from "@/components/static/DNH/wealth-architecture/WealthOutcomesSection";
import { WealthPageHero } from "@/components/static/DNH/wealth-architecture/WealthPageHero";
import { WealthReviewSection } from "@/components/static/DNH/wealth-architecture/WealthReviewSection";
import { WealthWithoutArchitectureSection } from "@/components/static/DNH/wealth-architecture/WealthWithoutArchitectureSection";
import { WholeWealthStructureSection } from "@/components/static/DNH/wealth-architecture/WholeWealthStructureSection";
import type {
  WealthArchitecturePageData,
  WealthArchitectureSection,
} from "@/components/static/DNH/wealth-architecture/wealthArchitectureTypes";
import {
  SITE_LANGUAGES,
  normalizeSiteLocale,
  type SiteLocale,
} from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

const WEALTH_ARCHITECTURE_ROUTE = "/dnh/wealth-architecture";

function getPageContent(locale: SiteLocale): WealthArchitecturePageData {
  return (locale === "fa"
    ? wealthArchitectureFa
    : wealthArchitectureEn) as WealthArchitecturePageData;
}

function getSection(
  page: WealthArchitecturePageData,
  sectionId: string,
): WealthArchitectureSection {
  const section = page.sections.find((entry) => entry.id === sectionId);

  if (!section) {
    throw new Error(`Missing wealth architecture section: ${sectionId}`);
  }

  return section;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const page = getPageContent(locale);

  return localizePageMetadata(
    {
      title: page.seo.title,
      description: page.seo.description,
      alternates: getLocalizedAlternates(WEALTH_ARCHITECTURE_ROUTE, locale),
      applicationName: page.brand,
    },
    WEALTH_ARCHITECTURE_ROUTE,
    locale,
  );
}

export default async function WealthArchitecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;    
  const locale = normalizeSiteLocale(routeLocale);
  const page = getPageContent(locale);
  const direction = SITE_LANGUAGES[locale].direction;

  return (
    <main lang={SITE_LANGUAGES[locale].languageTag} dir={direction}>
      <WealthPageHero
        section={getSection(page, "wealth-hero")}
        locale={locale}
        direction={direction}
      />
      <WealthWithoutArchitectureSection
        section={getSection(page, "wealth-without-architecture")}
        locale={locale}
        direction={direction}
      />
      <WealthDefinitionSection
        section={getSection(page, "what-is-wealth-architecture")}
        locale={locale}
        direction={direction}
      />
      <WealthReviewSection
        section={getSection(page, "what-we-review")}
        locale={locale}
        direction={direction}
      />
      <WealthAudienceSection
        section={getSection(page, "who-needs-architecture")}
        locale={locale}
        direction={direction}
      />
      <WholeWealthStructureSection
        section={getSection(page, "whole-wealth-structure")}
        locale={locale}
        direction={direction}
      />
      <DnhApproachSection
        section={getSection(page, "dnh-approach")}
        locale={locale}
        direction={direction}
      />
      <WealthArchitectureProcessSection
        section={getSection(page, "wealth-architecture-process")}
        locale={locale}
        direction={direction}
      />
      <WealthOutcomesSection
        section={getSection(page, "clearer-picture")}
        locale={locale}
        direction={direction}
      />
      <WealthBoundariesSection
        section={getSection(page, "what-wealth-architecture-is-not")}
        locale={locale}
        direction={direction}
      />
      <StartWealthArchitectureSection
        section={getSection(page, "start-wealth-architecture")}
        locale={locale}
        direction={direction}
      />
    </main>
  );
}
