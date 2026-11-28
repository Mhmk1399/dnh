import {
  ArrowUpLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleDollarSign,
  Clock3,
  Coins,
  Eye,
  GitBranch,
  Landmark,
  Layers3,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import {
  MajorDecisionActions,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
  MajorDecisionIntro,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

const ICONS: Record<string, LucideIcon> = {
  investment: TrendingUp,
  financing: CircleDollarSign,
  business: BriefcaseBusiness,
  family: UsersRound,
  issue: Target,
  risk: ShieldCheck,
  liquidity: WalletCards,
  horizon: Clock3,
  scenarios: GitBranch,
  cost: Coins,
  flexibility: Waypoints,
  expected: ChartNoAxesCombined,
  delay: Clock3,
  economy: Landmark,
  investors: TrendingUp,
  wealth: Landmark,
  portfolio: Layers3,
  strategy: GitBranch,
  market: ChartNoAxesCombined,
  executive: Building2,
  clarity: Eye,
  confidentiality: LockKeyhole,
  responsibility: Scale,
};

function SectionHeader({
  section,
  dark,
}: {
  section: MajorDecisionSection;
  dark: boolean;
}) {
  return (
    <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
      <div className="min-w-0">
        <MajorDecisionEyebrow section={section} dark={dark} />
        <MajorDecisionHeading section={section} dark={dark} />
      </div>
      <MajorDecisionIntro section={section} dark={dark} />
    </header>
  );
}

export function MajorDecisionContentSection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  const dark = section.type === "scenarios";
  const services = section.type === "services";
  const dimensions = section.type === "decision-dimensions";
  const cards = section.items ?? [];
  const columns =
    dimensions
      ? "md:grid-cols-2 xl:grid-cols-5"
      : cards.length === 3
        ? "md:grid-cols-3"
        : services
          ? "md:grid-cols-2 xl:grid-cols-3"
          : "md:grid-cols-2 xl:grid-cols-4";
  const Arrow = rtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`relative isolate scroll-mt-24 overflow-hidden border-b py-14 sm:py-18 lg:py-24 ${dark ? "border-white/10 bg-brand-secondary text-white" : section.order % 2 === 0 ? "border-line bg-surface-soft text-ink" : "border-line bg-page text-ink"}`}
    >
      <div className="dnh-site-shell relative z-10">
        <SectionHeader section={section} dark={dark} />

        <ol className={`mt-9 grid min-w-0 gap-px sm:mt-12 ${dark ? "bg-white/15" : "bg-line"} ${columns}`}>
          {cards.map((item, index) => {
            const Icon = ICONS[item.icon ?? ""] ?? Waypoints;
            const body = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className={`flex size-12 shrink-0 items-center justify-center border sm:size-14 ${dark ? "border-white/20 bg-white/5 text-brand-primary" : "border-line bg-surface-soft text-brand-secondary"}`}
                  >
                    <Icon size={23} strokeWidth={1.55} />
                  </span>
                  <span className={`text-[11px] font-bold tracking-[.16em] ${dark ? "text-white/35" : "text-ink-muted/55"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className={`text-[18px] font-black leading-[1.7] sm:text-[20px] ${dark ? "text-white" : "text-ink"}`}>
                    {item.title}
                  </h3>
                  {item.question ? (
                    <p className={`mt-3 text-[14px] font-bold leading-[1.9] ${dark ? "text-brand-primary" : "text-brand-secondary"}`}>
                      {item.question}
                    </p>
                  ) : null}
                  {item.description ? (
                    <p className={`mt-3 text-start text-[14px] leading-[1.95] sm:text-[15px] ${dark ? "text-white/70" : "text-ink-muted"}`}>
                      {item.description}
                    </p>
                  ) : null}
                </div>
                {item.href ? (
                  <span
                    aria-hidden="true"
                    className="mt-auto flex size-10 items-center justify-center border border-brand-primary/40 text-brand-secondary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-ink"
                  >
                    <Arrow size={18} />
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={item.id} className="min-w-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={item.title}
                    className={`group flex h-full min-h-64 flex-col p-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset sm:p-6 ${dark ? "bg-brand-secondary hover:bg-white/[.04]" : "bg-page hover:bg-surface-soft"}`}
                  >
                    {body}
                  </Link>
                ) : (
                  <article className={`flex h-full min-h-64 flex-col p-5 sm:p-6 ${dark ? "bg-brand-secondary" : "bg-page"}`}>
                    {body}
                  </article>
                )}
              </li>
            );
          })}
        </ol>

        {section.closing ? (
          <p className={`mt-7 border-s-2 ps-5 text-start text-[14px] font-bold leading-[2] sm:text-[16px] ${dark ? "border-brand-primary text-white/80" : "border-brand-primary text-ink-muted"}`}>
            {section.closing}
          </p>
        ) : null}

        <MajorDecisionActions section={section} rtl={rtl} dark={dark} />
      </div>
    </section>
  );
}

export function MajorDecisionComparisonSection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-24 border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <SectionHeader section={section} dark={false} />
        <div className="mt-10 grid gap-px bg-line lg:grid-cols-2">
          {section.groups?.map((group, groupIndex) => (
            <article key={group.id} className={groupIndex === 0 ? "bg-brand-secondary p-6 text-white sm:p-8" : "bg-surface-soft p-6 sm:p-8"}>
              <p className={`text-[12px] font-bold ${groupIndex === 0 ? "text-brand-primary" : "text-brand-secondary"}`}>
                {group.subtitle}
              </p>
              <h3 className="mt-3 text-[22px] font-black leading-[1.65] sm:text-[25px]">
                {group.title}
              </h3>
              <ul className={`mt-7 border-t ${groupIndex === 0 ? "border-white/15" : "border-line"}`}>
                {group.items.map((item) => (
                  <li key={item} className={`flex gap-3 border-b py-4 text-[14px] leading-[1.9] sm:text-[15px] ${groupIndex === 0 ? "border-white/15 text-white/78" : "border-line text-ink-muted"}`}>
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {section.note ? (
          <p className="mt-6 border-s-[3px] border-brand-accent bg-surface-soft p-5 ps-6 text-start text-[14px] font-bold leading-[2] text-ink sm:text-[15px]">
            {section.note}
          </p>
        ) : null}
        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </section>
  );
}
