import {
  Activity,
  ArrowUpLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  Coins,
  Expand,
  GitBranch,
  House,
  Landmark,
  Layers3,
  LogOut,
  Network,
  Scale,
  ShieldAlert,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import {
  MajorDecisionActions,
  MajorDecisionCopy,
  MajorDecisionEyebrow,
  MajorDecisionHeading,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

const situationIcons: LucideIcon[] = [
  House,
  TrendingUp,
  Layers3,
  Coins,
  Building2,
  BriefcaseBusiness,
  Expand,
  Landmark,
  LogOut,
  UsersRound,
];

const complexityIcons: LucideIcon[] = [
  CircleDollarSign,
  WalletCards,
  ShieldAlert,
  Clock3,
  Target,
  ChartNoAxesCombined,
  Activity,
  GitBranch,
];

const audienceIcons: LucideIcon[] = [
  UsersRound,
  House,
  Landmark,
  TrendingUp,
  BriefcaseBusiness,
  Building2,
  Scale,
  Network,
];

const routeIcons: LucideIcon[] = [
  Landmark,
  Layers3,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ShieldAlert,
  UsersRound,
];

export function MajorDecisionClaritySection({
  section,
  rtl,
}: {
  section: MajorDecisionSection;
  rtl: boolean;
}) {
  const entries = section.items ?? section.routes ?? [];
  const situations = section.type === "problem-recognition";
  const complexity = section.type === "decision-complexity";
  const audience = section.type === "audience";
  const routing = section.type === "routing";
  const DirectionArrow = rtl ? ArrowUpLeft : ArrowUpRight;

  const icons = situations
    ? situationIcons
    : complexity
      ? complexityIcons
      : audience
        ? audienceIcons
        : routeIcons;

  const gridClass = situations
    ? "sm:grid-cols-2 xl:grid-cols-5"
    : complexity
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : audience
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`${section.order % 2 === 0 ? "bg-surface-soft" : "bg-page"} relative isolate scroll-mt-24 overflow-hidden border-b border-line py-14 text-ink sm:py-18 lg:py-24`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"
      />

      <div className="dnh-site-shell relative z-10">
        <header className="mx-auto max-w-[1120px] flex flex-col text-center">
          <div className="flex justify-center">
            <MajorDecisionEyebrow section={section} />
          </div>
          <div className="[&>h2]:mx-auto">
            <MajorDecisionHeading section={section} />
          </div>
          {section.intro ? (
            <p className="mx-auto mt-5 text-center text-[16px] leading-[1.95] text-ink-muted sm:text-[17px]">
              {section.intro}
            </p>
          ) : null}
        </header>

        <div
          className={`relative mt-10 sm:mt-12 ${complexity ? "bg-brand-secondary p-3 sm:p-5 lg:p-7" : ""}`}
        >
   

          <ol
            className={`grid min-w-0 gap-4 ${gridClass} ${complexity ? "gap-px bg-page/15" : ""}`}
          >
            {entries.map((item, index) => {
              const Icon = icons[index] ?? Waypoints;

              return (
                <li
                  key={`${section.id}-${index}`}
                  className={
                    complexity
                      ? "group relative min-h-64 overflow-hidden bg-brand-secondary p-5 text-page sm:p-6"
                      : routing
                        ? "group relative flex min-h-72 flex-col overflow-hidden border border-line bg-page p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary sm:p-6 motion-reduce:transform-none motion-reduce:transition-none"
                        : audience
                          ? "group relative min-h-64 overflow-hidden border border-line bg-page p-5 transition-[border-color,background-color] duration-300 hover:border-brand-primary hover:bg-surface-soft sm:p-6 motion-reduce:transition-none"
                          : "group relative min-h-72 overflow-hidden border border-line bg-page p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary sm:p-6 motion-reduce:transform-none motion-reduce:transition-none"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className={`flex size-12 shrink-0 items-center justify-center border transition-colors duration-300 ${complexity ? "border-page/20 text-brand-primary group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-brand-secondary" : "border-brand-primary/30 bg-brand-primary/10 text-brand-secondary group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-brand-secondary"}`}
                    >
                      <Icon size={23} strokeWidth={1.6} />
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3
                      className={`text-[19px] font-black leading-[1.65] sm:text-[16px] ${complexity ? "text-page" : "text-ink"}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-4 text-[15px] leading-[1.9] sm:text-[14px] ${complexity ? "text-page/70" : "text-ink-muted"}`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {routing ? (
                    <span
                      aria-hidden="true"
                      className="mt-auto flex size-10 items-center justify-center self-end border border-brand-primary/35 text-brand-secondary transition-colors duration-300 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-brand-secondary"
                    >
                      <DirectionArrow size={19} strokeWidth={1.7} />
                    </span>
                  ) : null}

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-start scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {section.closing ? (
          <div className="mx-auto mt-8 max-w-5xl border-s-[3px] border-brand-primary bg-page p-5 ps-6 sm:p-6 sm:ps-7">
            <MajorDecisionCopy>{section.closing}</MajorDecisionCopy>
          </div>
        ) : null}

        {section.closing_paragraphs?.length ? (
          <div className="mx-auto mt-8 max-w-4xl space-y-3 border-s-[3px] border-brand-primary bg-page p-5 ps-6 sm:p-6 sm:ps-7">
            {section.closing_paragraphs.map((paragraph, index) => (
              <MajorDecisionCopy key={`${section.id}-closing-${index}`}>
                {paragraph}
              </MajorDecisionCopy>
            ))}
          </div>
        ) : null}

        <div className="flex justify-center">
          <MajorDecisionActions section={section} rtl={rtl} />
        </div>
      </div>
    </section>
  );
}
