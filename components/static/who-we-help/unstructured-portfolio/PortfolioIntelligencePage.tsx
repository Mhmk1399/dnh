import type { SiteLocale } from "@/lib/site-language";

import { PortfolioArchitecture } from "./PortfolioArchitecture";
import { PortfolioDecisionPath } from "./PortfolioDecisionPath";
import { PortfolioFoundations } from "./PortfolioFoundations";
import { PortfolioHero } from "./PortfolioHero";
import type { PortfolioDocument, PortfolioSection } from "./portfolioTypes";

export type { PortfolioDocument } from "./portfolioTypes";

export function PortfolioIntelligencePage({
  content,
  locale,
}: {
  content: PortfolioDocument;
  locale: SiteLocale;
}) {
  const rtl = content.direction === "rtl";
  const sections = Object.fromEntries(
    content.sections.map((section) => [section.type, section]),
  ) as Record<string, PortfolioSection>;

  return (
    <main dir={content.direction} className={rtl ? "[&_p]:text-justify" : ""}>
      <PortfolioHero section={sections.hero} locale={locale} rtl={rtl} />
      <PortfolioFoundations
        problem={sections["problem-recognition"]}
        diversification={sections.diversification}
        signs={sections["diagnostic-signs"]}
        audience={sections.audience}
        rtl={rtl}
      />
      <PortfolioArchitecture
        whole={sections["whole-wealth-view"]}
        roles={sections["asset-roles"]}
        risk={sections["concentration-risk"]}
        horizon={sections["liquidity-goals-horizon"]}
        locale={locale}
        rtl={rtl}
      />
      <PortfolioDecisionPath
        process={sections.process}
        routing={sections.routing}
        finalSection={sections["final-cta"]}
        rtl={rtl}
      />
    </main>
  );
}
