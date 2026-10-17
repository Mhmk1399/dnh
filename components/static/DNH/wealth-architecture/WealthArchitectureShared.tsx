import type { ElementType, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Blocks,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleX,
  Clock3,
  CloudSun,
  Coins,
  Compass,
  Database,
  Droplets,
  GitCompareArrows,
  Globe2,
  Landmark,
  Layers3,
  ListChecks,
  Navigation,
  RefreshCw,
  Route,
  ScanSearch,
  ShieldCheck,
  Target,
  Telescope,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type {
  WealthArchitectureSection,
  WealthCta,
  WealthItem,
  WealthItemsBlock,
  WealthParagraphBlock,
  WealthQuestionsBlock,
} from "./wealthArchitectureTypes";
import type { SiteDirection } from "@/lib/site-language";

const wealthIcons: Record<string, LucideIcon> = {
  layers: Layers3,
  blocks: Blocks,
  droplets: Droplets,
  route: Route,
  goal: Target,
  "git-compare": GitCompareArrows,
  landmark: Landmark,
  shield: ShieldCheck,
  target: Target,
  clock: Clock3,
  globe: Globe2,
  chart: ChartNoAxesCombined,
  briefcase: BriefcaseBusiness,
  compass: Compass,
  coins: Coins,
  banknote: Banknote,
  building: Building2,
  wallet: WalletCards,
  data: Database,
  navigation: Navigation,
  horizon: Telescope,
  scan: ScanSearch,
  list: ListChecks,
  refresh: RefreshCw,
  x: CircleX,
  cloud: CloudSun,
  users: UsersRound,
};

export function getWealthIcon(name?: string): LucideIcon {
  return (name && wealthIcons[name]) || Blocks;
}

export function getParagraphs(
  section: WealthArchitectureSection,
): WealthParagraphBlock[] {
  return section.blocks.filter(
    (block): block is WealthParagraphBlock => block.kind === "paragraph",
  );
}

export function getItems(section: WealthArchitectureSection): WealthItem[] {
  const block = section.blocks.find(
    (entry): entry is WealthItemsBlock => entry.kind === "items",
  );

  return block?.items ?? [];
}

export function getQuestions(
  section: WealthArchitectureSection,
): WealthQuestionsBlock["items"] {
  const block = section.blocks.find(
    (entry): entry is WealthQuestionsBlock => entry.kind === "questions",
  );

  return block?.items ?? [];
}

export function WealthRichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={`${index}-${part.slice(2, 14)}`} className="font-black text-current">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function WealthSectionHeader({
  section,
  direction,
  headingId,
  as = "h2",
  dark = false,
  centered = false,
  className = "",
}: {
  section: WealthArchitectureSection;
  direction: SiteDirection;
  headingId: string;
  as?: "h1" | "h2";
  dark?: boolean;
  centered?: boolean;
  className?: string;
}) {
  const Heading = as as ElementType;
  const highlight = section.heading_highlight ?? "";
  const highlightIndex = highlight ? section.heading.indexOf(highlight) : -1;
  const isRTL = direction === "rtl";

  return (
    <header className={`${centered ? "mx-auto text-center" : "text-start"} ${className}`}>
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold sm:text-[13px] ${
          centered ? "justify-center" : "justify-start"
        } ${dark ? "text-white/78" : "text-brand-primary"}`}
      >
        <span aria-hidden="true" className="h-[2px] w-10 shrink-0 bg-brand-accent" />
        <p>{section.eyebrow}</p>
     
      </div>

      <Heading
        id={headingId}
        className={`mt-5 text-pretty text-[clamp(2rem,7.5vw,3.05rem)] font-black tracking-[-0.035em] sm:text-[clamp(2.6rem,4.7vw,3.35rem)] ${
          isRTL ? "leading-[1.48]" : "leading-[1.14]"
        } ${dark ? "text-white" : "text-ink"}`}
      >
        {highlightIndex < 0 ? (
          section.heading
        ) : (
          <>
            {section.heading.slice(0, highlightIndex)}
            <span className="text-brand-accent">
              {section.heading.slice(
                highlightIndex,
                highlightIndex + highlight.length,
              )}
            </span>
            {section.heading.slice(highlightIndex + highlight.length)}
          </>
        )}
      </Heading>
    </header>
  );
}

export function WealthActions({
  ctas,
  direction,
  dark = false,
  className = "",
}: {
  ctas: WealthCta[];
  direction: SiteDirection;
  dark?: boolean;
  className?: string;
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className={`grid gap-3 sm:flex sm:flex-wrap ${className}`}>
      {ctas.map((cta) => (
        <ActionButton
          key={cta.id}
          href={cta.href}
          variant={cta.type}
          shape="square"
          size="md"
          icon={Arrow}
          iconPosition="end"
          contentAlignment="between"
          dir={direction}
          className={`w-full shadow-none hover:shadow-none sm:w-auto sm:min-w-[230px] ${
            cta.type === "primary"
              ? "bg-brand-accent hover:bg-brand-primary"
              : dark
                ? "border-white/30 bg-white/5 text-white hover:border-white/55 hover:bg-white/10 hover:text-white"
                : "border-brand-primary bg-page"
          }`}
        >
          {cta.label}
        </ActionButton>
      ))}
    </div>
  );
}

export function WealthParagraph({
  children,
  direction,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  direction: SiteDirection;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-start text-[14px] sm:text-[16px] ${
        direction === "rtl" ? "leading-[2]" : "leading-[1.75]"
      } ${dark ? "text-white/70" : "text-ink-muted"} ${className}`}
    >
      {children}
    </p>
  );
}

export function WealthGridPattern({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.12]" : "opacity-60"}`}
      style={{
        backgroundImage: dark
          ? "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px)"
          : "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 8%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 6%,transparent) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "linear-gradient(90deg,black,transparent 25%,transparent 75%,black)",
      }}
    />
  );
}
