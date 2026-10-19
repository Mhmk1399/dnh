import type { SiteLocale } from "@/lib/site-language";
import { HoldingHero } from "./HoldingHero";
import { HoldingComplexity } from "./HoldingComplexity";
import { HoldingFinanceArchitecture } from "./HoldingFinanceArchitecture";
import { HoldingDecisionPath } from "./HoldingDecisionPath";
import type { HoldingsCapitalDocument } from "./holdingTypes";
export type { HoldingsCapitalDocument } from "./holdingTypes";

export function HoldingsCapitalStructurePage({ content, locale }: { content: HoldingsCapitalDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl"; const s = Object.fromEntries(content.sections.map((section) => [section.type, section]));
  return <main dir={content.direction} className={rtl ? "[&_p]:text-justify" : ""}><HoldingHero section={s.hero} locale={locale} rtl={rtl} /><HoldingComplexity growth={s["problem-recognition"]} group={s["group-level-view"]} signs={s["diagnostic-signs"]} audience={s.audience} rtl={rtl} /><HoldingFinanceArchitecture whole={s["whole-group-view"]} liquidity={s["liquidity-working-capital"]} financing={s["capital-structure-financing"]} allocation={s["capital-allocation"]} governance={s["ownership-governance"]} locale={locale} rtl={rtl} /><HoldingDecisionPath process={s.process} finalSection={s["final-cta"]} rtl={rtl} /></main>;
}
