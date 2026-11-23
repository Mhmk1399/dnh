import {
  ArrowUpLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleDollarSign,
  Clock3,
  FileSearch,
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
import type { ExecutiveBriefingSection } from "./executiveBriefingsTypes";

const ICONS: Record<string, LucideIcon> = {
  decision: Target,
  options: GitBranch,
  views: UsersRound,
  information: FileSearch,
  economy: ChartNoAxesCombined,
  board: Building2,
  owners: BriefcaseBusiness,
  finance: CircleDollarSign,
  investment: TrendingUp,
  financing: Landmark,
  liquidity: WalletCards,
  growth: ChartNoAxesCombined,
  capital: Layers3,
  shared: UsersRound,
  focus: Target,
  next: Waypoints,
  definition: FileSearch,
  open: Clock3,
  priorities: Waypoints,
  confidentiality: LockKeyhole,
  responsibility: ShieldCheck,
  boundaries: Scale,
};

function HighlightedHeading({
  section,
  dark = false,
}: {
  section: ExecutiveBriefingSection;
  dark?: boolean;
}) {
  const highlight = section.heading_highlight?.trim() ?? "";
  const index = highlight ? section.heading.indexOf(highlight) : -1;
  const className = dark ? "text-brand-primary" : "text-brand-accent";

  return (
    <h2
      id={`${section.id}-title`}
      className={`mt-4 max-w-[31ch] text-pretty text-[clamp(1.85rem,6.5vw,3.2rem)] font-black leading-[1.5] tracking-[-0.035em] sm:leading-[1.4] ${dark ? "text-white" : "text-ink"}`}
    >
      {index < 0 ? (
        section.heading
      ) : (
        <>
          {section.heading.slice(0, index)}
          <span className={className}>{highlight}</span>
          {section.heading.slice(index + highlight.length)}
        </>
      )}
    </h2>
  );
}

function SectionHeader({
  section,
  dark = false,
}: {
  section: ExecutiveBriefingSection;
  dark?: boolean;
}) {
  return (
    <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
      <div className="min-w-0">
        <p className={`flex items-center gap-3 text-[12px] font-bold leading-7 sm:text-[13px] ${dark ? "text-white/85" : "text-brand-accent"}`}>
          <span aria-hidden="true" className="h-[2px] w-9 bg-brand-primary" />
          {section.eyebrow}
        </p>
        <HighlightedHeading section={section} dark={dark} />
      </div>
      {section.paragraphs?.length ? (
        <div className={`max-w-[76ch] space-y-2 border-s-2 ps-5 ${dark ? "border-brand-primary/70 text-white/75" : "border-brand-accent text-ink-muted"}`}>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.id}-paragraph-${index}`} className="text-start text-[14px] leading-[2] sm:text-[16px]">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function gridClass(count: number) {
  if (count === 5) return "md:grid-cols-2 xl:grid-cols-6";
  if (count === 6) return "md:grid-cols-2 xl:grid-cols-3";
  if (count === 4) return "md:grid-cols-2";
  return "md:grid-cols-3";
}

export function ExecutiveBriefingsContentSection({
  section,
  rtl,
}: {
  section: ExecutiveBriefingSection;
  rtl: boolean;
}) {
  const dark = section.type === "principles";
  const items = section.items ?? [];
  const Arrow = rtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`relative scroll-mt-24 overflow-hidden border-b py-14 sm:py-18 lg:py-24 ${dark ? "border-white/10 bg-brand-secondary text-white" : section.order % 2 === 0 ? "border-line bg-surface-soft text-ink" : "border-line bg-page text-ink"}`}
    >
      <div className="dnh-site-shell">
        <SectionHeader section={section} dark={dark} />

        <ol className={`mt-10 grid min-w-0 gap-px ${dark ? "bg-white/15" : "bg-line"} ${gridClass(items.length)}`}>
          {items.map((item, index) => {
            const Icon = ICONS[item.icon ?? ""] ?? Target;
            const fiveCardPosition =
              items.length === 5
                ? index === 3
                  ? "xl:col-span-2 xl:col-start-2"
                  : "xl:col-span-2"
                : "";

            return (
              <li key={item.id} className={`min-w-0 ${fiveCardPosition}`}>
                <article className={`group flex h-full min-h-64 flex-col p-5 sm:p-6 ${dark ? "bg-brand-secondary" : "bg-page"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span aria-hidden="true" className={`flex size-12 items-center justify-center border sm:size-14 ${dark ? "border-white/20 bg-white/5 text-brand-primary" : "border-line bg-surface-soft text-brand-accent"}`}>
                      <Icon size={23} strokeWidth={1.55} />
                    </span>
                    <bdi dir="ltr" className={`text-[11px] font-bold tracking-[.16em] ${dark ? "text-white/35" : "text-ink-muted/55"}`}>
                      {item.number}
                    </bdi>
                  </div>
                  <h3 className={`mt-6 text-[18px] font-black leading-[1.7] sm:text-[20px] ${dark ? "text-white" : "text-ink"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-3 text-start text-[14px] leading-[1.95] sm:text-[15px] ${dark ? "text-white/70" : "text-ink-muted"}`}>
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        {section.distinction ? (
          <div className="mt-7 grid gap-5 border-s-[3px] border-brand-accent bg-page p-5 ps-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-7">
            <p className="text-start text-[14px] font-bold leading-[2] text-ink sm:text-[15px]">
              {section.distinction}
            </p>
            {section.service_link ? (
              <Link href={section.service_link.href} className="inline-flex min-h-11 items-center gap-2 text-[13px] font-black text-brand-accent transition-colors hover:text-ink">
                {section.service_link.label}
                <Arrow aria-hidden="true" size={17} />
              </Link>
            ) : null}
          </div>
        ) : null}

        {section.closing ? (
          <p className={`mt-7 border-s-2 ps-5 text-start text-[14px] font-bold leading-[2] sm:text-[15px] ${dark ? "border-brand-primary text-white/80" : "border-brand-accent text-ink-muted"}`}>
            {section.closing}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function ExecutiveBriefingsProcessSection({
  section,
}: {
  section: ExecutiveBriefingSection;
}) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 border-b border-line bg-surface-soft py-14 text-ink sm:py-18 lg:py-24">
      <div className="dnh-site-shell">
        <SectionHeader section={section} />
        <ol className="mt-10 grid gap-px bg-line lg:grid-cols-3">
          {section.steps?.map((step) => (
            <li key={step.id} className="relative min-h-72 bg-page p-6 sm:p-8">
              <bdi dir="ltr" className="text-[12px] font-black tracking-[.2em] text-brand-accent">{step.number}</bdi>
              <h3 className="mt-6 text-[22px] font-black leading-[1.6] text-ink">{step.title}</h3>
              <p className="mt-2 text-[14px] font-bold leading-[1.8] text-brand-accent">{step.subtitle}</p>
              <p className="mt-5 text-start text-[14px] leading-[2] text-ink-muted sm:text-[15px]">{step.description}</p>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-brand-primary" />
            </li>
          ))}
        </ol>
        {section.note ? (
          <p className="mt-7 border-s-[3px] border-brand-accent bg-brand-secondary p-5 ps-6 text-start text-[14px] font-bold leading-[2] text-white/80 sm:p-7 sm:text-[15px]">{section.note}</p>
        ) : null}
      </div>
    </section>
  );
}

export function ExecutiveBriefingsExampleSection({
  section,
}: {
  section: ExecutiveBriefingSection;
}) {
  const brief = section.brief;
  if (!brief) return null;

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 border-b border-white/10 bg-brand-secondary py-14 text-white sm:py-18 lg:py-24">
      <div className="dnh-site-shell">
        <SectionHeader section={section} dark />
        <article className="mt-10 border border-white/20 bg-white/[.035]">
          <header className="grid gap-4 border-b border-white/15 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand-primary">{brief.label}</p>
              <h3 className="mt-3 text-[22px] font-black leading-[1.6] text-white sm:text-[27px]">{brief.title}</h3>
            </div>
            <p className="border border-brand-primary/45 px-4 py-3 text-[12px] font-bold text-white/80">{brief.status}</p>
          </header>
          <div className="grid gap-px bg-white/15 lg:grid-cols-3">
            {brief.sections?.map((part) => (
              <section key={part.title} className="bg-brand-secondary p-5 sm:p-7">
                <h4 className="text-[18px] font-black text-white">{part.title}</h4>
                {part.description ? <p className="mt-4 text-start text-[14px] leading-[2] text-white/70">{part.description}</p> : null}
                {part.items?.length ? (
                  <ul className="mt-4 space-y-3">
                    {part.items.map((item) => <li key={item} className="flex gap-3 text-start text-[14px] leading-[1.9] text-white/70"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-primary" />{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <footer className="grid gap-3 border-t border-white/15 p-5 sm:p-7 lg:grid-cols-2">
            <p className="text-start text-[14px] font-bold leading-[2] text-white">{brief.closing}</p>
            <p className="text-start text-[13px] leading-[2] text-white/60">{brief.note}</p>
          </footer>
        </article>
      </div>
    </section>
  );
}

export function ExecutiveBriefingsOutcomesSection({
  section,
}: {
  section: ExecutiveBriefingSection;
}) {
  const brief = section.brief;

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24">
      <div className="dnh-site-shell">
        <SectionHeader section={section} />
        <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
          {section.items?.map((item) => {
            const Icon = ICONS[item.icon ?? ""] ?? FileSearch;
            return (
              <article key={item.id} className="grid min-h-52 grid-cols-[3rem_minmax(0,1fr)] gap-4 bg-surface-soft p-5 sm:p-7">
                <span aria-hidden="true" className="flex size-12 items-center justify-center border border-line bg-page text-brand-accent"><Icon size={22} /></span>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[18px] font-black leading-[1.7] text-ink sm:text-[20px]">{item.title}</h3>
                    <bdi dir="ltr" className="text-[11px] font-bold text-ink-muted/55">{item.number}</bdi>
                  </div>
                  <p className="mt-3 text-start text-[14px] leading-[1.95] text-ink-muted sm:text-[15px]">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        {brief ? (
          <article className="mt-8 border border-line bg-surface-soft">
            <header className="grid gap-3 border-b border-line p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand-accent">{brief.label}</p>
                <h3 className="mt-2 text-[23px] font-black text-ink">{brief.title}</h3>
              </div>
              <p className="border border-line bg-page px-4 py-3 text-[12px] font-bold text-ink-muted">{brief.status}</p>
            </header>
            <dl className="grid gap-px bg-line md:grid-cols-2">
              {brief.fields?.map((field) => (
                <div key={field.label} className="bg-page p-5 sm:p-6">
                  <dt className="text-[12px] font-black text-brand-accent">{field.label}</dt>
                  <dd className="mt-2 text-start text-[14px] leading-[1.9] text-ink-muted">{field.value}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line p-5 text-start text-[13px] leading-[2] text-ink-muted sm:p-7">{brief.note}</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
