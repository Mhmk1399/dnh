import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteLocale } from "@/lib/site-language";

type CTA = { label: string; type: string };
type Entry = { number?: number; title: string; description: string; english_label?: string };
export type HoldingsCapitalSection = {
  order: number; id: string; type: string; eyebrow: string; english_label: string; heading: string;
  paragraphs?: string[]; intro?: string; items?: Entry[]; questions?: string[]; steps?: Entry[];
  checklist?: string[]; closing?: string; closing_paragraphs?: string[]; ctas?: CTA[];
};
export type HoldingsCapitalDocument = {
  page: string; brand: string; locale: string; direction: "rtl" | "ltr"; title: string;
  english_title: string; section_count: number; sections: HoldingsCapitalSection[];
};

const actionRoutes: Record<string, string[]> = {
  "your-group-is-a-capital-structure": ["/financial-decision-assessment", "/request-strategic-consultation"],
  "review-structure-before-next-capital-decision": ["/financial-decision-assessment", "/request-strategic-consultation"],
};

function SectionLabel({ section, dark = false }: { section: HoldingsCapitalSection; dark?: boolean }) {
  return <div className={dark ? "text-[#c8e2e5]" : "text-brand-primary"}><p className="flex items-center gap-3 text-[11px] font-black leading-7"><span className="h-px w-10 bg-brand-accent" />{section.eyebrow}</p><span className="mt-1 block text-start text-[9px] font-bold uppercase tracking-[.2em] opacity-65"><bdi dir="ltr">{section.english_label}</bdi></span></div>;
}

function Title({ section, dark = false }: { section: HoldingsCapitalSection; dark?: boolean }) {
  return <h2 id={`${section.id}-title`} className={`mt-3 max-w-[30ch] text-pretty text-[clamp(1.65rem,3vw,2.45rem)] font-black leading-[1.48] ${dark ? "text-white" : "text-ink"}`}>{section.heading}</h2>;
}

function Paragraph({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[14px] leading-[2.05] sm:text-[15px] ${dark ? "text-white/75" : "text-ink-muted"}`}>{children}</p>;
}

function Actions({ section, rtl, dark = false }: { section: HoldingsCapitalSection; rtl: boolean; dark?: boolean }) {
  if (!section.ctas?.length) return null;
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  return <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{section.ctas.map((cta, index) => <ActionButton key={`${section.id}-cta-${index}`} href={actionRoutes[section.id]?.[index] ?? "/request-strategic-consultation"} variant={index === 0 ? "primary" : "secondary"} shape="square" size="lg" icon={Arrow} className={dark && index > 0 ? "border-white/25 bg-transparent text-white hover:bg-white hover:text-ink" : ""}>{cta.label}</ActionButton>)}</div>;
}

function LegacyHero({ section, locale, rtl }: { section: HoldingsCapitalSection; locale: SiteLocale; rtl: boolean }) {
  const scrim = rtl ? "lg:bg-[linear-gradient(90deg,rgba(3,47,63,.10),rgba(3,47,63,.98)_72%)]" : "lg:bg-[linear-gradient(270deg,rgba(3,47,63,.10),rgba(3,47,63,.98)_72%)]";
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative isolate overflow-hidden bg-[#032f3f] text-white"><div className="relative"><Image src="/assets/images/complex-financial-structure.png" alt={locale === "fa" ? "نمای معماری ساختار مالی و سرمایه یک گروه شرکتی" : "Capital and financial architecture of a corporate group"} fill priority sizes="100vw" className="object-cover object-center" /><div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,47,63,.42),rgba(3,47,63,.99)_84%)] ${scrim}`} /><div className="dnh-site-shell relative z-10 py-11 pt-32 sm:py-14 sm:pt-36 lg:min-h-[720px] lg:py-28 lg:pt-36"><div className="w-full lg:w-[76%]"><SectionLabel section={section} dark /><h1 id={`${section.id}-title`} className="mt-4 max-w-[32ch] text-pretty text-[clamp(1.75rem,3.15vw,2.9rem)] font-black leading-[1.38]">{section.heading}</h1><div className="mt-5 grid max-w-[980px] gap-x-9 gap-y-2 border-s-2 border-brand-accent ps-5 md:grid-cols-2">{section.paragraphs?.map((text, index) => <p key={`${section.id}-paragraph-${index}`} className="text-[13px] leading-[1.85] text-white/76 sm:text-[14px]">{text}</p>)}</div><Actions section={section} rtl={rtl} dark /></div></div></div></section>;
}

function Hero({ section, locale, rtl }: { section: HoldingsCapitalSection; locale: SiteLocale; rtl: boolean }) {
  const words = section.heading.trim().split(/\s+/);

  return (
    <DnhPageHero
      id={section.id}
      direction={rtl ? "rtl" : "ltr"}
      lang={locale === "fa" ? "fa-IR" : "en"}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headingHighlight={words.slice(-Math.min(rtl ? 5 : 4, words.length)).join(" ")}
      paragraphs={(section.paragraphs ?? []).map((text, index) => ({
        id: `${section.id}-paragraph-${index + 1}`,
        text,
      }))}
      ctas={(section.ctas ?? []).map((cta, index) => ({
        id: `${section.id}-cta-${index + 1}`,
        label: cta.label,
        type: index === 0 ? "primary" : "secondary",
        href: actionRoutes[section.id]?.[index] ?? "/request-strategic-consultation",
      }))}
      media={{
        src: "/assets/images/complex-financial-structure.png",
        alt: locale === "fa"
          ? "نمای معماری ساختار مالی و سرمایه یک گروه شرکتی"
          : "Capital and financial architecture of a corporate group",
      }}
      mediaMode="background"
    />
  );
}

function EntryGrid({ section, dark = false }: { section: HoldingsCapitalSection; dark?: boolean }) {
  if (!section.items?.length) return null;
  return <ol className={`grid border-s border-t ${dark ? "border-white/15" : "border-line"} sm:grid-cols-2`}>{section.items.map((item, index) => <li key={`${section.id}-item-${index}`} className={`border-b border-e p-5 sm:p-6 ${dark ? "border-white/15" : "border-line"}`}><h3 className={`text-[17px] font-black leading-8 ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3><p className={`mt-2 text-[13px] leading-7 ${dark ? "text-white/68" : "text-ink-muted"}`}>{item.description}</p></li>)}</ol>;
}

function Questions({ section, dark = false }: { section: HoldingsCapitalSection; dark?: boolean }) {
  if (!section.questions?.length) return null;
  return <ol className={`border-t ${dark ? "border-white/15" : "border-line"}`}>{section.questions.map((question, index) => <li key={`${section.id}-question-${index}`} className={`border-b py-4 text-[13px] font-bold leading-7 ${dark ? "border-white/15 text-white/85" : "border-line text-ink"}`}>{question}</li>)}</ol>;
}

function Tail({ section, dark = false }: { section: HoldingsCapitalSection; dark?: boolean }) {
  if (section.closing) return <div className="mt-5 border-s-[3px] border-brand-accent ps-5"><Paragraph dark={dark}>{section.closing}</Paragraph></div>;
  if (section.closing_paragraphs?.length) return <div className="mt-5 space-y-2 border-s-[3px] border-brand-accent ps-5">{section.closing_paragraphs.map((text, index) => <Paragraph key={`${section.id}-closing-${index}`} dark={dark}>{text}</Paragraph>)}</div>;
  return null;
}

function StandardSection({ section, rtl, dark = false }: { section: HoldingsCapitalSection; rtl: boolean; dark?: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : section.order % 2 === 0 ? "bg-surface-soft" : "bg-page"} border-b border-line py-14 sm:py-16`}><div className="dnh-site-shell grid gap-8 lg:grid-cols-[.76fr_1.24fr] lg:gap-14"><header><SectionLabel section={section} dark={dark} /><Title section={section} dark={dark} />{section.paragraphs?.length ? <div className="mt-5 space-y-3">{section.paragraphs.map((text, index) => <Paragraph key={`${section.id}-p-${index}`} dark={dark}>{text}</Paragraph>)}</div> : null}{section.intro ? <div className="mt-5"><Paragraph dark={dark}>{section.intro}</Paragraph></div> : null}</header><div><EntryGrid section={section} dark={dark} /><Questions section={section} dark={dark} /><Tail section={section} dark={dark} /><Actions section={section} rtl={rtl} dark={dark} /></div></div></section>;
}

function GrowthLedger({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#edf3f2] py-14 sm:py-16"><div className="dnh-site-shell"><div className="grid items-start gap-9 lg:grid-cols-[.68fr_1.32fr] lg:gap-16"><header className="lg:sticky lg:top-28 lg:self-start"><SectionLabel section={section} /><Title section={section} />{section.paragraphs?.map((text,index)=><div key={index} className="mt-4"><Paragraph>{text}</Paragraph></div>)}{section.intro && <div className="mt-5"><Paragraph>{section.intro}</Paragraph></div>}</header><div className="relative"><div aria-hidden="true" className="absolute inset-y-0 start-5 w-px bg-brand-accent/45"/><ol className="space-y-3">{section.items?.map((item,index)=><li key={`${section.id}-${index}`} className="relative w-full bg-page p-5 shadow-[0_8px_30px_rgba(3,47,63,.06)] sm:p-6"><span className="absolute start-0 top-0 h-full w-1 bg-brand-accent"/><h3 className="font-black leading-8 text-ink">{item.title}</h3><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></li>)}</ol><Tail section={section}/><Actions section={section} rtl={rtl}/></div></div></div></section>;
}

function BoardDocket({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><header><SectionLabel section={section}/><Title section={section}/>{section.paragraphs?.map((text,index)=><div key={index} className="mt-4"><Paragraph>{text}</Paragraph></div>)}{section.intro&&<div className="mt-4"><Paragraph>{section.intro}</Paragraph></div>}</header><ol className="border-y border-line">{section.questions?.map((question,index)=><li key={`${section.id}-${index}`} className="border-b border-line py-5 text-sm font-bold leading-8 text-ink last:border-b-0">{question}</li>)}</ol></div><Tail section={section}/><Actions section={section} rtl={rtl}/></div></section>;
}

function SignalMatrix({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#071f2a] py-14 text-white sm:py-16"><div className="dnh-site-shell"><div className="grid items-start gap-8 lg:grid-cols-[.62fr_1.38fr]"><header className="lg:sticky lg:top-28 lg:self-start"><SectionLabel section={section} dark/><Title section={section} dark/>{section.intro&&<div className="mt-5"><Paragraph dark>{section.intro}</Paragraph></div>}</header><ol className="grid border border-white/15 sm:grid-cols-2">{section.items?.map((item,index)=><li key={`${section.id}-${index}`} className="relative min-h-40 border-b border-e border-white/15 p-5"><span className="absolute end-4 top-4 size-2 bg-[#d78c38] shadow-[0_0_0_5px_rgba(215,140,56,.12)]"/><bdi dir="ltr" className="text-[9px] font-black tracking-[.18em] text-white/35">SIGNAL</bdi><h3 className="mt-4 max-w-[24ch] font-black leading-7">{item.title}</h3><p className="mt-2 text-[12px] leading-6 text-white/62">{item.description}</p></li>)}</ol></div><Tail section={section} dark/><Actions section={section} rtl={rtl} dark/></div></section>;
}

function AudienceIndex({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell"><header className="max-w-3xl"><SectionLabel section={section}/><Title section={section}/>{section.intro&&<div className="mt-5"><Paragraph>{section.intro}</Paragraph></div>}</header><ol className="mt-9">{section.items?.map((item,index)=><li key={`${section.id}-${index}`} className="grid border-t border-line py-5 sm:grid-cols-[90px_.72fr_1.28fr] sm:items-baseline sm:gap-6"><bdi dir="ltr" className="text-[11px] font-black tracking-[.18em] text-brand-accent">PROFILE</bdi><h3 className="mt-2 font-black leading-7 text-ink sm:mt-0">{item.title}</h3><p className="mt-2 text-[13px] leading-7 text-ink-muted sm:mt-0">{item.description}</p></li>)}</ol><Tail section={section}/><Actions section={section} rtl={rtl}/></div></section>;
}

function CashCycle({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#f4f0e8] py-14 sm:py-16"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><header><SectionLabel section={section}/><Title section={section}/>{section.paragraphs?.map((text,index)=><div key={index} className="mt-4"><Paragraph>{text}</Paragraph></div>)}{section.intro&&<div className="mt-4"><Paragraph>{section.intro}</Paragraph></div>}</header><ol className="relative grid gap-0 sm:grid-cols-2"><span aria-hidden="true" className="absolute inset-y-0 start-5 w-px bg-brand-accent sm:inset-x-0 sm:inset-y-auto sm:start-0 sm:top-5 sm:h-px sm:w-full"/>{section.questions?.map((q,index)=><li key={`${section.id}-${index}`} className="relative ps-14 pb-7 sm:px-4 sm:pt-14"><span className="absolute start-3 top-1 flex size-5 items-center justify-center border-4 border-[#f4f0e8] bg-brand-accent sm:start-4 sm:top-3"/><bdi dir="ltr" className="text-[9px] font-black tracking-[.18em] text-brand-primary">CASH POINT</bdi><p className="mt-2 text-[13px] font-bold leading-7 text-ink">{q}</p></li>)}</ol></div><Tail section={section}/><Actions section={section} rtl={rtl}/></div></section>;
}

function CapitalBalance({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#032f3f] py-14 text-white sm:py-16"><div className="dnh-site-shell"><header className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><SectionLabel section={section} dark/><Title section={section} dark/></div><div>{section.paragraphs?.map((text,index)=><div key={index} className="mt-3"><Paragraph dark>{text}</Paragraph></div>)}{section.intro&&<Paragraph dark>{section.intro}</Paragraph>}</div></header><ol className="mt-9 grid gap-px bg-white/15 lg:grid-cols-2">{section.questions?.map((q,index)=><li key={`${section.id}-${index}`} className={`min-h-32 bg-[#032f3f] p-5 ${index%2 ? "lg:translate-y-4" : ""}`}><bdi dir="ltr" className="text-[10px] font-black tracking-[.18em] text-brand-accent">{index%2 ? "OBLIGATION" : "CAPITAL SOURCE"}</bdi><p className="mt-3 text-sm font-bold leading-8 text-white/88">{q}</p></li>)}</ol><Tail section={section} dark/><Actions section={section} rtl={rtl} dark/></div></section>;
}

function AllocationTable({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.62fr_1.38fr] lg:gap-14"><header><SectionLabel section={section}/><Title section={section}/>{section.paragraphs?.map((text,index)=><div key={index} className="mt-4"><Paragraph>{text}</Paragraph></div>)}{section.intro&&<div className="mt-4"><Paragraph>{section.intro}</Paragraph></div>}</header><div><div className="hidden grid-cols-[.8fr_1.2fr] bg-brand-primary px-4 py-3 text-[9px] font-black uppercase tracking-[.15em] text-white sm:grid"><span>Mandate</span><span>Investment committee view</span></div><ol className="border-t border-line sm:border-t-0">{section.items?.map((item,index)=><li key={`${section.id}-${index}`} className="border-b border-line py-5 sm:grid sm:grid-cols-[.8fr_1.2fr] sm:px-4"><div className="mb-3 sm:hidden"><span className="text-[9px] font-black uppercase tracking-[.14em] text-brand-primary"><bdi dir="ltr">Allocation mandate</bdi></span></div><h3 className="text-sm font-black leading-7 text-ink sm:pe-4">{item.title}</h3><p className="mt-2 border-s-2 border-brand-accent/40 ps-3 text-[13px] leading-7 text-ink-muted sm:mt-0 sm:border-s-0 sm:ps-0">{item.description}</p></li>)}</ol></div></div><Tail section={section}/><Actions section={section} rtl={rtl}/></div></section>;
}

function GovernanceMap({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#101c21] py-14 text-white sm:py-16"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.7fr_1.3fr] lg:gap-16"><header><SectionLabel section={section} dark/><Title section={section} dark/>{section.paragraphs?.map((text,index)=><div key={index} className="mt-4"><Paragraph dark>{text}</Paragraph></div>)}{section.intro&&<div className="mt-4"><Paragraph dark>{section.intro}</Paragraph></div>}</header><div className="relative"><div className="mb-7 border border-brand-accent/60 p-4 text-center text-[10px] font-black tracking-[.18em] text-brand-accent">DECISION RIGHTS / GOVERNANCE CORE</div><ol className="grid gap-4 sm:grid-cols-2">{section.questions?.map((q,index)=><li key={`${section.id}-${index}`} className="relative border border-white/15 p-5 before:absolute before:-top-5 before:start-1/2 before:h-5 before:w-px before:bg-brand-accent/45"><bdi dir="ltr" className="text-[9px] font-black tracking-[.18em] text-white/40">NODE</bdi><p className="mt-2 text-[13px] font-bold leading-7 text-white/82">{q}</p></li>)}</ol></div></div><Tail section={section} dark/><Actions section={section} rtl={rtl} dark/></div></section>;
}

function GroupView({ section, locale, rtl }: { section: HoldingsCapitalSection; locale: SiteLocale; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell"><div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16"><div><SectionLabel section={section} /><Title section={section} />{section.intro ? <div className="mt-5"><Paragraph>{section.intro}</Paragraph></div> : null}<div className="mt-7 border border-line bg-surface-soft p-4 sm:p-6"><div className="flex items-center gap-3 border-b border-line pb-4"><span className="relative flex size-10 shrink-0 items-center justify-center border border-brand-accent bg-page"><span className="size-2 bg-brand-accent" /><span className="absolute start-full top-1/2 h-px w-5 bg-brand-accent" /></span><p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-primary"><bdi dir="ltr">{locale === "fa" ? "GROUP FINANCIAL SYSTEM" : "GROUP FINANCIAL SYSTEM"}</bdi></p></div><ol className="relative ms-5 border-s border-brand-accent/60 ps-7 pt-4">{section.items?.map((item, index) => <li key={`${section.id}-${index}`} className="relative border-b border-line py-4 last:border-b-0"><span aria-hidden="true" className="absolute -start-[35px] top-[27px] size-3 border-2 border-brand-accent bg-surface-soft" /><span aria-hidden="true" className="absolute -start-[23px] top-8 h-px w-5 bg-brand-accent/60" /><h3 className="font-black leading-7 text-ink">{item.title}</h3><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></li>)}</ol></div></div><figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[4/5]"><Image src="/assets/images/complex-financial-structure.webp" alt={locale === "fa" ? "تصویر یکپارچه جریان سرمایه و نقدینگی در گروه" : "Integrated view of capital and liquidity flows across the group"} fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-[#032f3f]/90 p-4 text-[11px] font-bold text-white">{section.english_label}</figcaption></figure></div><Tail section={section} /><Actions section={section} rtl={rtl} /></div></section>;
}

function Process({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#edf3f2] py-14 sm:py-16"><div className="dnh-site-shell"><SectionLabel section={section} /><Title section={section} /><ol className="relative mt-10 space-y-0 before:absolute before:inset-y-0 before:start-[7px] before:w-px before:bg-brand-accent/40 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12 lg:before:inset-x-0 lg:before:inset-y-auto lg:before:start-0 lg:before:top-[7px] lg:before:h-px lg:before:w-full">{section.steps?.map((step, index) => <li key={`${section.id}-step-${index}`} className="relative grid grid-cols-[16px_1fr] gap-4 pb-8 lg:block lg:pb-0"><span aria-hidden="true" className="relative z-10 mt-1 block size-4 bg-brand-primary ring-4 ring-[#edf3f2]"/><div className="lg:mt-5"><span className="text-start text-[9px] font-black tracking-[.12em] text-brand-accent"><bdi dir="ltr">{step.english_label}</bdi></span><h3 className="mt-1 font-black leading-8 text-ink">{step.title}</h3><p className="mt-2 text-[13px] leading-7 text-ink-muted">{step.description}</p></div></li>)}</ol><Tail section={section} /><Actions section={section} rtl={rtl} /></div></section>;
}

function FinalSection({ section, rtl }: { section: HoldingsCapitalSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative overflow-hidden bg-[#032f3f] py-16 text-white sm:py-20"><div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-accent"/><div className="dnh-site-shell"><header className="mx-auto max-w-4xl text-center"><div className="flex justify-center"><SectionLabel section={section} dark /></div><h2 id={`${section.id}-title`} className="mx-auto mt-4 max-w-[28ch] text-pretty text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.45] text-white">{section.heading}</h2><div className="mx-auto mt-6 max-w-3xl space-y-3">{section.paragraphs?.map((text, index) => <Paragraph key={`${section.id}-p-${index}`} dark>{text}</Paragraph>)}</div></header><div className="mx-auto mt-10 max-w-5xl border-y border-white/15"><ul className="grid sm:grid-cols-2">{section.checklist?.map((item, index) => <li key={`${section.id}-check-${index}`} className="flex gap-3 border-b border-white/15 px-4 py-5 text-sm leading-7 text-white/85 sm:px-6 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-e"><span className="flex size-7 shrink-0 items-center justify-center border border-brand-accent/50"><Check className="text-brand-accent" size={15}/></span>{item}</li>)}</ul></div><div className="mx-auto max-w-3xl text-center"><Tail section={section} dark/><div className="mt-9 border border-white/15 bg-white/[.04] p-4 sm:p-6"><p className="mb-5 text-[9px] font-black uppercase tracking-[.24em] text-brand-accent"><bdi dir="ltr">Decision gateway</bdi></p><div className="[&>div]:mt-0 [&>div]:justify-center"><Actions section={section} rtl={rtl} dark/></div></div></div></div></section>;
}

export function HoldingsCapitalStructurePage({ content, locale }: { content: HoldingsCapitalDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl";
  return <div dir={content.direction}>{content.sections.map((section) => {
    if (section.type === "hero") return <Hero key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "problem-recognition") return <GrowthLedger key={section.id} section={section} rtl={rtl} />;
    if (section.type === "group-level-view") return <BoardDocket key={section.id} section={section} rtl={rtl} />;
    if (section.type === "diagnostic-signs") return <SignalMatrix key={section.id} section={section} rtl={rtl} />;
    if (section.type === "audience") return <AudienceIndex key={section.id} section={section} rtl={rtl} />;
    if (section.type === "whole-group-view") return <GroupView key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "liquidity-working-capital") return <CashCycle key={section.id} section={section} rtl={rtl} />;
    if (section.type === "capital-structure-financing") return <CapitalBalance key={section.id} section={section} rtl={rtl} />;
    if (section.type === "capital-allocation") return <AllocationTable key={section.id} section={section} rtl={rtl} />;
    if (section.type === "ownership-governance") return <GovernanceMap key={section.id} section={section} rtl={rtl} />;
    if (section.type === "process") return <Process key={section.id} section={section} rtl={rtl} />;
    if (section.type === "final-cta") return <FinalSection key={section.id} section={section} rtl={rtl} />;
    const dark = section.type === "capital-structure-financing" || section.type === "ownership-governance";
    return <StandardSection key={section.id} section={section} rtl={rtl} dark={dark} />;
  })}</div>;
}
