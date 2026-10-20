import type { SiteLocale } from "@/lib/site-language";

import { HoldingComplexity } from "./HoldingComplexity";
import { HoldingDecisionPath } from "./HoldingDecisionPath";
import { HoldingFinanceArchitecture } from "./HoldingFinanceArchitecture";
import { HoldingHero } from "./HoldingHero";
import type {
  HoldingSection,
  HoldingsCapitalDocument,
} from "./holdingTypes";

export type { HoldingsCapitalDocument } from "./holdingTypes";

export function HoldingsCapitalStructurePage({
  content,
  locale,
}: {
  content: HoldingsCapitalDocument;
  locale: SiteLocale;
}) {
  const rtl = content.direction === "rtl";
  const sections = Object.fromEntries(
    content.sections.map((section) => [section.type, section]),
  ) as Record<string, HoldingSection>;

  return (
    <main dir={content.direction} className={rtl ? "[&_p]:text-justify" : ""}>
      <HoldingHero section={sections.hero} locale={locale} rtl={rtl} />
      <HoldingComplexity
        growth={sections["problem-recognition"]}
        group={sections["group-level-view"]}
        signs={sections["diagnostic-signs"]}
        audience={sections.audience}
        rtl={rtl}
      />
      <HoldingFinanceArchitecture
        whole={sections["whole-group-view"]}
        liquidity={sections["liquidity-working-capital"]}
        financing={sections["capital-structure-financing"]}
        allocation={sections["capital-allocation"]}
        governance={sections["ownership-governance"]}
        locale={locale}
        rtl={rtl}
      />
      <HoldingDecisionPath
        process={sections.process}
        finalSection={sections["final-cta"]}
        rtl={rtl}
      />
    </main>
  );
}
