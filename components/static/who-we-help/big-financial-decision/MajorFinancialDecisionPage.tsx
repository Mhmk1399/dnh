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
  return <div className={dark ? "text-[#b9d8de]" : "text-brand-primary"}><p className="flex items-center gap-3 text-[12px] font-black leading-7"><span className="h-0.5 w-9 bg-brand-accent" />{s.eyebrow}</p><bdi dir="ltr" className="mt-1 block text-start text-[9px] font-bold tracking-[.2em] opacity-65">{s.english_label.toUpperCase()}</bdi></div>;
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
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative isolate overflow-hidden bg-[#032f3f] text-white"><div className="relative min-h-[820px] lg:min-h-[760px]"><Image src="/assets/images/major-financial-decision.jpg" alt={locale === "fa" ? "تصویر تحلیلی برای یک تصمیم مالی بزرگ" : "Analytical context for a major financial decision"} fill priority sizes="100vw" className="object-cover object-center" /><div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,47,63,.34),rgba(3,47,63,.96)_64%)] ${desktopScrim}`} /><div className="dnh-site-shell relative z-10 flex min-h-[820px] items-end py-14 pt-36 lg:min-h-[760px] lg:items-center"><div className="w-full lg:w-[61%]"><Kicker s={s} dark /><h1 id={`${s.id}-title`} className="mt-5 max-w-[18ch] text-pretty text-[clamp(2.3rem,5.5vw,4.8rem)] font-black leading-[1.43]">{s.heading}</h1><div className="mt-5 max-w-[760px] space-y-3">{s.paragraphs?.slice(0, 3).map((p) => <Copy key={p} dark>{p}</Copy>)}</div></div></div></div><div className="border-t border-white/15 bg-[#022a37]"><div className="dnh-site-shell py-9"><div className="grid sm:grid-cols-2 lg:grid-cols-5">{s.paragraphs?.slice(3, 8).map((p, i) => <p key={p} className="border-b border-white/15 p-5 text-[12px] font-bold leading-7 text-white/78 sm:border-e lg:border-b-0"><bdi dir="ltr" className="mb-2 block text-[9px] tracking-[.16em] text-brand-accent">0{i + 1}</bdi>{p}</p>)}</div><div className="mt-6 max-w-4xl space-y-3">{s.paragraphs?.slice(8).map((p) => <Copy key={p} dark>{p}</Copy>)}</div><Actions s={s} dark rtl={rtl} /></div></div></section>;
}

function EntryGrid({ s, rtl, dark = false }: { s: MajorDecisionSection; rtl: boolean; dark?: boolean }) {
  const entries = s.items ?? s.routes ?? [];
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : s.order % 2 ? "bg-page" : "bg-surface-soft"} border-b border-line py-14 sm:py-18 lg:py-22`}><div className="dnh-site-shell grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-14"><div><Kicker s={s} dark={dark} /><Title s={s} dark={dark} />{s.intro ? <div className="mt-5"><Copy dark={dark}>{s.intro}</Copy></div> : null}</div><div><div className={`grid border-s border-t ${dark ? "border-white/15" : "border-line"} sm:grid-cols-2`}>{entries.map((item, i) => <article key={item.title} className={`border-b border-e p-5 sm:p-6 ${dark ? "border-white/15" : "border-line"}`}><bdi dir="ltr" className="text-[9px] font-black tracking-[.16em] text-brand-accent">{String(item.number ?? i + 1).padStart(2, "0")}</bdi><h3 className={`mt-2 text-[17px] font-black leading-8 ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3>{item.english_label ? <bdi dir="ltr" className="mt-1 block text-start text-[9px] tracking-[.13em] opacity-55">{item.english_label}</bdi> : null}<div className="mt-2"><Copy dark={dark}>{item.description}</Copy></div></article>)}</div>{s.closing ? <div className="mt-5 border-s-[3px] border-brand-accent ps-5"><Copy dark={dark}>{s.closing}</Copy></div> : null}{s.closing_paragraphs ? <div className="mt-5 space-y-2">{s.closing_paragraphs.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div> : null}<Actions s={s} dark={dark} rtl={rtl} /></div></div></section>;
}

function Architecture({ s, locale, rtl }: { s: MajorDecisionSection; locale: SiteLocale; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-page py-14 sm:py-18 lg:py-22"><div className="dnh-site-shell grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div><Kicker s={s} /><Title s={s} /><div className="mt-7 border-s border-t border-line">{s.items?.map((item) => <article key={item.title} className="grid grid-cols-[48px_1fr] border-b border-e border-line"><bdi dir="ltr" className="flex items-center justify-center border-e border-line text-sm font-black text-brand-accent">0{item.number}</bdi><div className="p-4"><div className="flex flex-wrap items-baseline gap-3"><h3 className="font-black">{item.title}</h3><bdi dir="ltr" className="text-[9px] tracking-[.14em] text-brand-primary">{item.english_label}</bdi></div><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></div></article>)}</div>{s.closing ? <div className="mt-5"><Copy>{s.closing}</Copy></div> : null}<Actions s={s} rtl={rtl} /></div><figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[4/5]"><Image src="/assets/images/big-financial-decision.png" alt={locale === "fa" ? "چارچوب بررسی ابعاد تصمیم مالی" : "Framework for evaluating a financial decision"} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><span className="absolute start-5 top-5 size-5 bg-brand-accent" /></figure></div></section>;
}

function Questions({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  const dark = s.type === "downside-risk";
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : "bg-surface-soft"} border-b border-line py-14 sm:py-18 lg:py-22`}><div className="dnh-site-shell grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-14"><div><Kicker s={s} dark={dark} /><Title s={s} dark={dark} /><div className="mt-5 space-y-3">{s.paragraphs?.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div></div><div><ul className={`border-t ${dark ? "border-white/15" : "border-line"}`}>{s.questions?.map((q, i) => <li key={q} className={`grid grid-cols-[34px_1fr] gap-3 border-b py-4 text-[13px] font-bold leading-7 ${dark ? "border-white/15 text-white/85" : "border-line text-ink"}`}><bdi dir="ltr" className="text-brand-accent">{String(i + 1).padStart(2, "0")}</bdi>{q}</li>)}</ul><div className="mt-5 space-y-2">{s.closing_paragraphs?.map((p) => <Copy key={p} dark={dark}>{p}</Copy>)}</div><Actions s={s} dark={dark} rtl={rtl} /></div></div></section>;
}

function Process({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line bg-page py-14 sm:py-18 lg:py-22"><div className="dnh-site-shell"><Kicker s={s} /><Title s={s} /><ol className="mt-9 grid border-s border-t border-line md:grid-cols-2 lg:grid-cols-4">{s.steps?.map((step) => <li key={step.title} className="border-b border-e border-line p-5"><bdi dir="ltr" className="text-[10px] font-black tracking-[.15em] text-brand-accent">STEP {String(step.number).padStart(2, "0")}</bdi><h3 className="mt-2 font-black leading-8">{step.title}</h3><bdi dir="ltr" className="block text-start text-[9px] tracking-[.12em] text-brand-primary">{step.english_label}</bdi><p className="mt-2 text-[13px] leading-7 text-ink-muted">{step.description}</p></li>)}</ol>{s.closing ? <div className="mt-5 max-w-4xl"><Copy>{s.closing}</Copy></div> : null}<Actions s={s} rtl={rtl} /></div></section>;
}

function Final({ s, rtl }: { s: MajorDecisionSection; rtl: boolean }) {
  return <section id={s.id} aria-labelledby={`${s.id}-title`} className="bg-[#032f3f] py-14 text-white sm:py-18"><div className="dnh-site-shell grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"><div><Kicker s={s} dark /><Title s={s} dark /><div className="mt-5 space-y-3">{s.paragraphs?.map((p) => <Copy key={p} dark>{p}</Copy>)}</div></div><div><ul className="border-t border-white/15">{s.checklist?.map((item) => <li key={item} className="flex gap-3 border-b border-white/15 py-4 text-sm leading-7 text-white/85"><Check className="mt-1 shrink-0 text-brand-accent" size={18} />{item}</li>)}</ul><div className="mt-5 space-y-2">{s.closing_paragraphs?.map((p, i) => <div key={p} className={i === s.closing_paragraphs!.length - 1 ? "mt-5 border-s-2 border-brand-accent ps-4" : ""}><Copy dark>{p}</Copy></div>)}</div><Actions s={s} dark rtl={rtl} /></div></div></section>;
}

export function MajorFinancialDecisionPage({ content, locale }: { content: MajorDecisionDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl";
  return <div dir={content.direction} className="[&>section:not(:first-child)]:sm:!py-16 [&>section:not(:first-child)]:lg:!py-18">{content.sections.map((s) => {
    if (s.type === "hero") return <Hero key={s.id} s={s} locale={locale} rtl={rtl} />;
    if (s.type === "decision-dimensions") return <Architecture key={s.id} s={s} locale={locale} rtl={rtl} />;
    if (["options-tradeoffs", "downside-risk", "liquidity-timing"].includes(s.type)) return <Questions key={s.id} s={s} rtl={rtl} />;
    if (s.type === "process") return <Process key={s.id} s={s} rtl={rtl} />;
    if (s.type === "final-cta") return <Final key={s.id} s={s} rtl={rtl} />;
    return <EntryGrid key={s.id} s={s} rtl={rtl} dark={s.type === "scenario-analysis"} />;
  })}</div>;
}
