import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteLocale } from "@/lib/site-language";

type CTA = { label: string; type: string };
type Entry = { number?: number; title: string; description: string; english_label?: string };
export type MajorDecisionSection = {
  order: number; id: string; type: string; eyebrow: string; english_label: string; heading: string;
  paragraphs?: string[]; intro?: string; items?: Entry[]; questions?: string[]; steps?: Entry[];
  routes?: Entry[]; checklist?: string[]; closing?: string; closing_paragraphs?: string[]; ctas?: CTA[];
};
export type MajorDecisionDocument = { page: string; brand: string; locale: string; direction: "rtl" | "ltr"; title: string; english_title: string; section_count: number; sections: MajorDecisionSection[] };

const ctaRoutes: Record<string, string[]> = {
  "major-financial-decision-hero": ["/financial-decision-assessment", "/request-strategic-consultation"],
  "what-happens-after-the-assessment": ["/services"],
  "clarify-the-decision-before-you-commit-capital": ["/financial-decision-assessment", "/request-strategic-consultation"],
};

function Kicker({ s, dark = false }: { s: MajorDecisionSection; dark?: boolean }) {
  return <div className={dark ? "text-[#b9d8de]" : "text-brand-primary"}><p className="flex items-center gap-3 text-[12px] font-black leading-7"><span className="h-0.5 w-9 bg-brand-accent" />{s.eyebrow}</p><span className="mt-1 block text-[9px] font-bold tracking-[.2em] opacity-65"><bdi dir="ltr">{s.english_label.toUpperCase()}</bdi></span></div>;
}
function Title({ s, dark = false }: { s: MajorDecisionSection; dark?: boolean }) {
  return <h2 id={`${s.id}-title`} className={`mt-3 max-w-[27ch] text-pretty text-[clamp(1.75rem,3vw,2.55rem)] font-black leading-[1.42] ${dark ? "text-white" : "text-ink"}`}>{s.heading}</h2>;
}
function Copy({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[14px] leading-[2.05] sm:text-[15px] ${dark ? "text-white/72" : "text-ink-muted"}`}>{children}</p>;
}
function Actions({ s, dark = false, rtl }: { s: MajorDecisionSection; dark?: boolean; rtl: boolean }) {
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  return s.ctas?.length ? <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{s.ctas.map((cta, i) => <ActionButton key={`${s.id}-${i}`} href={ctaRoutes[s.id]?.[i] ?? "/financial-decision-assessment"} variant={i ? "secondary" : "primary"} shape="square" size="lg" icon={Arrow} className={dark && i ? "border-white/25 bg-transparent text-white hover:bg-white hover:text-ink" : ""}>{cta.label}</ActionButton>)}</div> : null;
}

function Hero({ s, locale, rtl }: { s: MajorDecisionSection; locale: SiteLocale; rtl: boolean }) {
  const desktopScrim = rtl ? "lg:bg-[linear-gradient(90deg,rgba(3,47,63,.2),rgba(3,47,63,.98)_68%)]" : "lg:bg-[linear-gradient(270deg,rgba(3,47,63,.2),rgba(3,47,63,.98)_68%)]";
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative isolate overflow-hidden bg-[#032f3f] text-white"><Image src="/assets/images/major-financial-decision.jpg" alt={locale === "fa" ? "تصویر تحلیلی برای یک تصمیم مالی بزرگ" : "Analytical context for a major financial decision"} fill priority sizes="100vw" className="object-cover object-center" /><div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,47,63,.68),rgba(3,47,63,.98)_88%)] ${desktopScrim}`}/><div className="dnh-site-shell relative z-10 pb-10 pt-32 sm:pt-36"><div className="grid items-end gap-7 lg:grid-cols-[.82fr_1.18fr] lg:gap-12"><header><Kicker s={s} dark/><h1 id={`${s.id}-title`} className="mt-4 max-w-[22ch] text-pretty text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.42]">{s.heading}</h1></header><div className="grid gap-x-7 gap-y-2 border-s-2 border-brand-accent ps-5 sm:grid-cols-2">{s.paragraphs?.map((p) => <p key={p} className="text-[12px] font-medium leading-6 text-white/78 sm:text-[13px]">{p}</p>)}</div></div><Actions s={s} dark rtl={rtl}/></div></section>;
}

function EntryGrid({ s, rtl, dark = false }: { s: MajorDecisionSection; rtl: boolean; dark?: boolean }) {
  const entries = s.items ?? s.routes ?? [];
  const audience = s.type === "audience";
  const routing = s.type === "routing";
  const scenario = s.type === "scenario-analysis";
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : s.order % 2 ? "bg-page" : "bg-surface-soft"} border-b border-line py-14 sm:py-18 lg:py-22`}><div className="dnh-site-shell grid items-start gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14"><header className={entries.length > 5 ? "lg:sticky lg:top-28 lg:self-start" : ""}><Kicker s={s} dark={dark} /><Title s={s} dark={dark} />{s.intro ? <div className="mt-5"><Copy dark={dark}>{s.intro}</Copy></div> : null}</header><div><ol className={scenario ? "grid gap-px bg-white/15 sm:grid-cols-2" : audience ? "border-y border-line" : routing ? "grid gap-4 sm:grid-cols-2" : `border-t ${dark ? "border-white/15" : "border-line"}`}>{entries.map((item) => <li key={item.title} className={scenario ? "bg-[#032f3f] p-6" : audience ? "grid border-b border-line py-5 sm:grid-cols-[.72fr_1.28fr] sm:gap-6" : routing ? "border border-line bg-page p-6" : `border-b py-5 ${dark ? "border-white/15" : "border-line"}`}><h3 className={`text-[17px] font-black leading-8 ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3><div>{item.english_label ? <span className="mt-1 block text-[9px] tracking-[.13em] opacity-55"><bdi dir="ltr">{item.english_label}</bdi></span> : null}<div className="mt-2"><Copy dark={dark}>{item.description}</Copy></div></div></li>)}</ol>{s.closing ? <div className="mt-5 border-s-[3px] border-brand-accent ps-5"><Copy dark={dark}>{s.closing}</Copy></div> : null}{s.closing_paragraphs ? <div className="mt-5 space-y-2">{s.closing_paragraphs.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div> : null}<Actions s={s} dark={dark} rtl={rtl} /></div></div></section>;
}

function Architecture({ s, locale, rtl }: { s: MajorDecisionSection; locale: SiteLocale; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-page py-14 sm:py-18 lg:py-22"><div className="dnh-site-shell grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div><Kicker s={s} /><Title s={s} /><div className="mt-7 border-s border-t border-line">{s.items?.map((item) => <article key={item.title} className="border-b border-e border-line p-4"><div className="flex flex-wrap items-baseline gap-3"><h3 className="font-black">{item.title}</h3><bdi dir="ltr" className="text-[9px] tracking-[.14em] text-brand-primary">{item.english_label}</bdi></div><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></article>)}</div>{s.closing ? <div className="mt-5"><Copy>{s.closing}</Copy></div> : null}<Actions s={s} rtl={rtl} /></div><figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[4/5]"><Image src="/assets/images/big-financial-decision.png" alt={locale === "fa" ? "چارچوب بررسی ابعاد تصمیم مالی" : "Framework for evaluating a financial decision"} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><span className="absolute start-5 top-5 size-5 bg-brand-accent" /></figure></div></section>;
}

function Questions({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  const dark = s.type === "downside-risk";
  const horizon = s.type === "liquidity-timing";
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : horizon ? "bg-[#f4f0e8]" : "bg-surface-soft"} border-b border-line py-14 sm:py-18 lg:py-22`}><div className="dnh-site-shell grid items-start gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-14"><header className="lg:sticky lg:top-28 lg:self-start"><Kicker s={s} dark={dark} /><Title s={s} dark={dark} /><div className="mt-5 space-y-3">{s.paragraphs?.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div></header><div><ul className={dark ? "grid border border-white/15 sm:grid-cols-2" : horizon ? "relative border-s border-brand-accent/50 ps-7" : "border-y border-line"}>{s.questions?.map((q) => <li key={q} className={`relative border-b p-5 text-[13px] font-bold leading-7 ${dark ? "min-h-32 border-e border-white/15 text-white/85" : "border-line text-ink"}`}>{horizon ? <span aria-hidden="true" className="absolute -start-[35px] top-7 size-3 bg-brand-accent"/> : null}{q}</li>)}</ul><div className="mt-5 space-y-2">{s.closing_paragraphs?.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div><Actions s={s} dark={dark} rtl={rtl} /></div></div></section>;
}

function TradeoffField({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-[#f4f0e8] py-14 sm:py-16"><div className="dnh-site-shell"><header className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><Kicker s={s}/><Title s={s}/></div><div className="space-y-3">{s.paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div></header><ol className="mt-9 grid gap-px bg-brand-primary/20 sm:grid-cols-2">{s.questions?.map((q,index)=><li key={q} className={`relative min-h-32 bg-[#f4f0e8] p-5 ${index%2 ? "sm:translate-y-4" : ""}`}><span className="mb-3 block h-1 w-10 bg-brand-accent"/><p className="text-sm font-bold leading-8 text-ink">{q}</p></li>)}</ol><div className="mt-9 space-y-2 border-s-[3px] border-brand-accent ps-5">{s.closing_paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div><Actions s={s} rtl={rtl}/></div></section>;
}

function ScenarioLandscape({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-[#071f2a] py-14 text-white sm:py-16"><div className="dnh-site-shell grid items-start gap-9 lg:grid-cols-[.64fr_1.36fr] lg:gap-16"><header className="lg:sticky lg:top-28 lg:self-start"><Kicker s={s} dark/><Title s={s} dark/>{s.intro&&<div className="mt-5"><Copy dark>{s.intro}</Copy></div>}</header><div><ol className="grid gap-4 sm:grid-cols-2">{s.items?.map((item,index)=><li key={item.title} className={`border border-white/15 p-5 ${index===0||index===s.items!.length-1 ? "sm:col-span-2" : ""}`}><span className="mb-3 block h-px w-full bg-brand-accent/40"/><h3 className="font-black leading-8">{item.title}</h3>{item.english_label?<span className="mt-1 block text-[9px] tracking-[.13em] text-white/45"><bdi dir="ltr">{item.english_label}</bdi></span>:null}<Copy dark>{item.description}</Copy></li>)}</ol><div className="mt-5 space-y-2">{s.closing_paragraphs?.map((p)=><Copy key={p} dark>{p}</Copy>)}</div><Actions s={s} dark rtl={rtl}/></div></div></section>;
}

function Process({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-page py-14 sm:py-18 lg:py-22"><div className="dnh-site-shell"><Kicker s={s}/><Title s={s}/><ol className="mt-10 grid gap-x-12 lg:grid-cols-2">{s.steps?.map((step) => <li key={step.title} className="relative border-s border-brand-accent/45 pb-8 ps-7"><span aria-hidden="true" className="absolute -start-2 top-1 block size-4 bg-brand-primary ring-4 ring-white"/><div><span className="block text-[9px] tracking-[.12em] text-brand-primary"><bdi dir="ltr">{step.english_label}</bdi></span><h3 className="mt-1 font-black leading-8">{step.title}</h3><p className="mt-2 text-[13px] leading-7 text-ink-muted">{step.description}</p></div></li>)}</ol>{s.closing ? <div className="mt-5 max-w-4xl"><Copy>{s.closing}</Copy></div> : null}<Actions s={s} rtl={rtl}/></div></section>;
}

function Final({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative bg-[#032f3f] py-16 text-white sm:py-20"><span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-accent"/><div className="dnh-site-shell"><header className="mx-auto max-w-4xl text-center"><div className="flex justify-center"><Kicker s={s} dark /></div><h2 id={`${s.id}-title`} className="mx-auto mt-4 max-w-[28ch] text-pretty text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.45]">{s.heading}</h2><div className="mx-auto mt-5 max-w-3xl space-y-3">{s.paragraphs?.map((p) => <Copy key={p} dark>{p}</Copy>)}</div></header><ul className="mx-auto mt-10 grid max-w-5xl border-y border-white/15 sm:grid-cols-2">{s.checklist?.map((item) => <li key={item} className="flex gap-3 border-b border-white/15 p-5 text-sm leading-7 text-white/85 sm:[&:nth-child(odd)]:border-e"><Check className="mt-1 shrink-0 text-brand-accent" size={18}/>{item}</li>)}</ul><div className="mx-auto mt-7 max-w-3xl text-center"><div className="space-y-2">{s.closing_paragraphs?.map((p) => <Copy key={p} dark>{p}</Copy>)}</div><div className="mt-7 border border-white/15 bg-white/[.04] p-5 [&>div]:justify-center"><Actions s={s} dark rtl={rtl}/></div></div></div></section>;
}

export function MajorFinancialDecisionPage({ content, locale }: { content: MajorDecisionDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl";
  return <div dir={content.direction} className="[&>section:not(:first-child)]:sm:!py-16 [&>section:not(:first-child)]:lg:!py-18">{content.sections.map((s) => {
    if (s.type === "hero") return <Hero key={s.id} s={s} locale={locale} rtl={rtl} />;
    if (s.type === "decision-dimensions") return <Architecture key={s.id} s={s} locale={locale} rtl={rtl} />;
    if (s.type === "options-tradeoffs") return <TradeoffField key={s.id} s={s} rtl={rtl}/>;
    if (["downside-risk", "liquidity-timing"].includes(s.type)) return <Questions key={s.id} s={s} rtl={rtl} />;
    if (s.type === "scenario-analysis") return <ScenarioLandscape key={s.id} s={s} rtl={rtl}/>;
    if (s.type === "process") return <Process key={s.id} s={s} rtl={rtl} />;
    if (s.type === "final-cta") return <Final key={s.id} s={s} rtl={rtl} />;
    return <EntryGrid key={s.id} s={s} rtl={rtl} />;
  })}</div>;
}
