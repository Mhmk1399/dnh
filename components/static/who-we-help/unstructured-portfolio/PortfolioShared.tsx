import { ArrowLeft, ArrowRight } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import type { PortfolioSection } from "./portfolioTypes";

const ctaRoutes: Record<string, string[]> = {
  "multiple-assets-one-portfolio": ["/financial-decision-assessment", "/request-strategic-consultation"],
  "review-the-structure-before-adding-another-asset": ["/financial-decision-assessment", "/request-strategic-consultation"],
};

export function SectionIntro({ section, dark = false, centered = false }: { section: PortfolioSection; dark?: boolean; centered?: boolean }) {
  return <header className={centered ? "mx-auto max-w-4xl text-center" : ""}>
    <p className={`flex items-center gap-3 text-sm font-black leading-7 text-brand-primary ${centered ? "justify-center" : ""}`}><span className="h-px w-9 bg-current" aria-hidden="true" />{section.eyebrow}</p>
    <h2 id={`${section.id}-title`} className={`mt-4 text-pretty text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.35] ${centered ? "mx-auto max-w-[27ch]" : "max-w-[25ch]"} ${dark ? "text-page" : "text-ink"}`}>{section.heading}</h2>
  </header>;
}

export function BodyCopy({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-base leading-[1.95] sm:text-[17px] ${dark ? "text-page/72" : "text-ink-muted"}`}>{children}</p>;
}

export function SectionActions({ section, rtl, dark = false, centered = false }: { section: PortfolioSection; rtl: boolean; dark?: boolean; centered?: boolean }) {
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  if (!section.ctas?.length) return null;
  return <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${centered ? "justify-center" : ""}`}>
    {section.ctas.map((cta, index) => <ActionButton key={`${section.id}-${cta.label}`} href={ctaRoutes[section.id]?.[index] ?? "/services/portfolio-intelligence"} variant={index ? "secondary" : "primary"} shape="square" size="lg" icon={Arrow} className={dark && index ? "border-page/25 bg-transparent text-page hover:bg-page hover:text-brand-secondary" : ""}>{cta.label}</ActionButton>)}
  </div>;
}
