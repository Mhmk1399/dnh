import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteLocale } from "@/lib/site-language";

type CTA = { label: string; type: string };
type Item = { number?: number; title: string; description: string; english_label?: string };
export type PortfolioSection = {
  order: number;
  id: string;
  type: string;
  eyebrow: string;
  english_label: string;
  heading: string;
  paragraphs?: string[];
  intro?: string;
  items?: Item[];
  assets?: Item[];
  routes?: Item[];
  questions?: string[];
  steps?: Item[];
  checklist?: string[];
  framework_logic?: string;
  closing?: string;
  closing_paragraphs?: string[];
  ctas?: CTA[];
};
export type PortfolioDocument = {
  page: string;
  brand: string;
  locale: string;
  direction: "rtl" | "ltr";
  title: string;
  english_title: string;
  section_count: number;
  sections: PortfolioSection[];
};

const ctaRoutes: Record<string, string[]> = {
  "multiple-assets-one-portfolio": ["/financial-decision-assessment", "/request-strategic-consultation"],
  "review-the-structure-before-adding-another-asset": ["/financial-decision-assessment", "/request-strategic-consultation"],
};

function Eyebrow({ section, dark = false }: { section: PortfolioSection; dark?: boolean }) {
  return <div className={dark ? "text-[#c7e2e7]" : "text-brand-primary"}><p className="flex items-center gap-3 text-[12px] font-black leading-7"><span className="h-0.5 w-9 bg-brand-accent" />{section.eyebrow}</p><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] opacity-65"><bdi dir="ltr">{section.english_label}</bdi></span></div>;
}

function Heading({ section, dark = false }: { section: PortfolioSection; dark?: boolean }) {
  return <h2 id={`${section.id}-title`} className={`mt-3 max-w-[29ch] text-pretty text-[clamp(1.7rem,3vw,2.5rem)] font-black leading-[1.42] ${dark ? "text-white" : "text-ink"}`}>{section.heading}</h2>;
}

function Copy({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[14px] leading-[2.05] sm:text-[15px] ${dark ? "text-white/75" : "text-ink-muted"}`}>{children}</p>;
}

function Actions({ section, rtl, dark = false }: { section: PortfolioSection; rtl: boolean; dark?: boolean }) {
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  if (!section.ctas?.length) return null;
  return <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{section.ctas.map((cta, index) => <ActionButton key={`${section.id}-${index}`} href={ctaRoutes[section.id]?.[index] ?? "/services/portfolio-intelligence"} variant={index ? "secondary" : "primary"} shape="square" size="lg" icon={Arrow} className={dark && index ? "border-white/25 bg-transparent text-white hover:bg-white hover:text-ink" : ""}>{cta.label}</ActionButton>)}</div>;
}

function Hero({ section, locale, rtl }: { section: PortfolioSection; locale: SiteLocale; rtl: boolean }) {
  const sideScrim = rtl ? "lg:bg-[linear-gradient(90deg,rgba(3,47,63,.08),rgba(3,47,63,.98)_70%)]" : "lg:bg-[linear-gradient(270deg,rgba(3,47,63,.08),rgba(3,47,63,.98)_70%)]";
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative isolate overflow-hidden bg-[#032f3f] text-white"><Image src="/assets/images/unstructured-portfolio.png" alt={locale === "fa" ? "نمای تحلیلی ساختار یک پرتفوی چنددارایی" : "Analytical view of a multi-asset portfolio structure"} fill priority sizes="100vw" className="object-cover object-center" /><div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,47,63,.62),rgba(3,47,63,.98)_88%)] ${sideScrim}`}/><div className="dnh-site-shell relative z-10 pb-10 pt-32 sm:pt-36"><div className="grid items-end gap-7 lg:grid-cols-[.82fr_1.18fr] lg:gap-12"><header><Eyebrow section={section} dark/><h1 id={`${section.id}-title`} className="mt-4 max-w-[22ch] text-pretty text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.42]">{section.heading}</h1></header><div className="grid gap-x-7 gap-y-2 border-s-2 border-brand-accent ps-5 sm:grid-cols-2">{section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-[12px] font-medium leading-6 text-white/78 sm:text-[13px]">{paragraph}</p>)}</div></div><Actions section={section} rtl={rtl} dark/></div></section>;
}

function CardSection({ section, rtl, dark = false }: { section: PortfolioSection; rtl: boolean; dark?: boolean }) {
  const entries = section.items ?? section.assets ?? section.routes ?? [];
  const paragraphsFirst = section.type === "problem-recognition" || section.type === "diversification" || section.type === "asset-roles";
  const paragraphsContent = section.paragraphs?.length ? <div className="mt-5 space-y-3">{section.paragraphs.map((paragraph, index) => <Copy key={`${section.id}-p-${index}`} dark={dark}>{paragraph}</Copy>)}</div> : null;
  const questionsContent = section.questions?.length ? <ol className={`mt-6 border-t ${dark ? "border-white/15" : "border-line"}`}>{section.questions.map((question, index) => <li key={`${section.id}-q-${index}`} className={`border-b py-3 text-[13px] font-bold leading-7 ${dark ? "border-white/15 text-white/85" : "border-line text-ink"}`}>{question}</li>)}</ol> : null;
  const audience = section.type === "audience";
  const signals = section.type === "diagnostic-signs" || section.type === "concentration-risk";
  const roles = section.type === "asset-roles";
  const routing = section.type === "routing";
  const sticky = section.type === "problem-recognition" || section.type === "diagnostic-signs";
  const entriesContent = entries.length ? <ol className={signals ? `grid border ${dark ? "border-white/15" : "border-line"} sm:grid-cols-2` : audience ? "border-y border-line" : roles ? "grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3" : routing ? "grid gap-4 sm:grid-cols-2" : `border-t ${dark ? "border-white/15" : "border-line"}`}>{entries.map((item, index) => <li key={`${section.id}-${index}`} className={signals ? `relative min-h-40 border-b border-e p-5 ${dark ? "border-white/15" : "border-line"}` : audience ? "grid border-b border-line py-5 sm:grid-cols-[.72fr_1.28fr] sm:gap-6" : roles ? "bg-page p-5" : routing ? "border border-line bg-page p-6" : `border-b py-5 ${dark ? "border-white/15" : "border-line"}`}><h3 className={`text-[17px] font-black leading-8 ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3><div>{item.english_label ? <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.12em] text-brand-primary"><bdi dir="ltr">{item.english_label}</bdi></span> : null}{item.description ? <p className={`mt-2 text-[13px] leading-7 ${dark ? "text-white/68" : "text-ink-muted"}`}>{item.description}</p> : null}</div></li>)}</ol> : null;
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : section.order % 2 ? "bg-page" : "bg-surface-soft"} border-b border-line py-14 sm:py-16 lg:py-18`}><div className="dnh-site-shell grid items-start gap-8 lg:grid-cols-[.76fr_1.24fr] lg:gap-14"><header className={sticky ? "lg:sticky lg:top-28 lg:self-start" : ""}><Eyebrow section={section} dark={dark} /><Heading section={section} dark={dark} />{paragraphsFirst ? paragraphsContent : null}{section.intro ? <div className="mt-5"><Copy dark={dark}>{section.intro}</Copy></div> : null}{section.framework_logic ? <ArchitectureRail logic={section.framework_logic} dark={dark} /> : null}</header><div>{entriesContent}{questionsContent}{!paragraphsFirst ? paragraphsContent : null}{section.closing ? <div className="mt-5 border-s-[3px] border-brand-accent ps-5"><Copy dark={dark}>{section.closing}</Copy></div> : null}{section.closing_paragraphs?.length ? <div className="mt-5 space-y-2 border-s-[3px] border-brand-accent ps-5">{section.closing_paragraphs.map((paragraph, index) => <Copy key={`${section.id}-closing-${index}`} dark={dark}>{paragraph}</Copy>)}</div> : null}<Actions section={section} rtl={rtl} dark={dark} /></div></div></section>;
}

function ArchitectureRail({ logic, dark = false }: { logic: string; dark?: boolean }) {
  return <div className="mt-8" aria-label={logic}><div className="flex flex-col border-s border-brand-accent/60 ps-4">{logic.split(" → ").map((label) => <div key={label} className="relative py-1.5"><span className="absolute -start-[21px] top-1/2 size-3 -translate-y-1/2 border-2 border-brand-accent bg-page" /><span className={`block border px-3 py-2 text-[10px] font-black uppercase tracking-[.1em] ${dark ? "border-white/20 text-white/80" : "border-line bg-white text-brand-primary"}`}><bdi dir="ltr">{label}</bdi></span></div>)}</div></div>;
}

function DiversificationField({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#f4f0e8] py-14 sm:py-16"><div className="dnh-site-shell"><header className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow section={section}/><Heading section={section}/></div><div className="space-y-3">{section.paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div></header><ol className="mt-9 grid gap-px bg-brand-primary/20 sm:grid-cols-2">{section.items?.map((item,index)=><li key={item.title} className={`bg-[#f4f0e8] p-5 ${index%2 ? "sm:translate-y-3" : ""}`}><span className="mb-3 block h-1 w-10 bg-brand-accent"/><h3 className="font-black leading-8 text-ink">{item.title}</h3>{item.description&&<p className="mt-2 text-[13px] leading-7 text-ink-muted">{item.description}</p>}</li>)}</ol><div className="mt-9 border-y border-line">{section.questions?.map((q)=><p key={q} className="border-b border-line py-4 text-sm font-black leading-8 text-ink last:border-b-0">{q}</p>)}</div><Actions section={section} rtl={rtl}/></div></section>;
}

function RoleTaxonomy({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell grid items-start gap-9 lg:grid-cols-[.66fr_1.34fr] lg:gap-16"><header className="lg:sticky lg:top-28 lg:self-start"><Eyebrow section={section}/><Heading section={section}/><div className="mt-5 space-y-3">{section.paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div></header><div><ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">{section.items?.map((item)=><li key={item.title} className="relative min-h-44 bg-page p-5 before:absolute before:start-0 before:top-0 before:h-full before:w-1 before:bg-brand-accent"><h3 className="font-black leading-8 text-ink">{item.title}</h3>{item.english_label&&<span className="mt-1 block text-[9px] tracking-[.13em] text-brand-primary"><bdi dir="ltr">{item.english_label}</bdi></span>}<p className="mt-2 text-[13px] leading-7 text-ink-muted">{item.description}</p></li>)}</ol><div className="mt-5 space-y-2 border-s-[3px] border-brand-accent ps-5">{section.closing_paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div><Actions section={section} rtl={rtl}/></div></div></section>;
}

function DependencyNetwork({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#071f2a] py-14 text-white sm:py-16"><div className="dnh-site-shell grid items-start gap-9 lg:grid-cols-[.66fr_1.34fr] lg:gap-16"><header><Eyebrow section={section} dark/><Heading section={section} dark/>{section.intro&&<div className="mt-5"><Copy dark>{section.intro}</Copy></div>}</header><div><div className="mb-6 border border-brand-accent/60 p-4 text-center text-[10px] font-black tracking-[.18em] text-brand-accent"><bdi dir="ltr">SHARED DEPENDENCY FIELD</bdi></div><ol className="grid gap-4 sm:grid-cols-2">{section.items?.map((item)=><li key={item.title} className="relative border border-white/15 p-5 before:absolute before:-top-4 before:start-1/2 before:h-4 before:w-px before:bg-brand-accent/50"><h3 className="font-black leading-8">{item.title}</h3><p className="mt-2 text-[13px] leading-7 text-white/68">{item.description}</p></li>)}</ol><div className="mt-5 space-y-2 border-s-2 border-brand-accent ps-4">{section.closing_paragraphs?.map((p)=><Copy key={p} dark>{p}</Copy>)}</div><Actions section={section} rtl={rtl} dark/></div></div></section>;
}

function HorizonAxes({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-[#edf3f2] py-14 sm:py-16"><div className="dnh-site-shell"><header className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow section={section}/><Heading section={section}/></div><div className="space-y-3">{section.paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}{section.intro&&<Copy>{section.intro}</Copy>}</div></header><ol className="mt-9 grid gap-0 lg:grid-cols-3">{section.items?.map((item,index)=><li key={item.title} className="relative border-s border-t border-line p-5 last:border-e lg:min-h-52"><span className="absolute inset-x-0 top-0 h-1 bg-brand-accent"/><span className="mb-5 block text-[9px] font-black uppercase tracking-[.16em] text-brand-primary"><bdi dir="ltr">{index===0?"LIQUIDITY":index===1?"GOALS":"TIME HORIZON"}</bdi></span><h3 className="font-black leading-8 text-ink">{item.title}</h3><p className="mt-2 text-[13px] leading-7 text-ink-muted">{item.description}</p></li>)}</ol><Actions section={section} rtl={rtl}/></div></section>;
}

function RoutingPanel({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16"><div className="dnh-site-shell"><header className="mx-auto max-w-4xl text-center"><div className="flex justify-center"><Eyebrow section={section}/></div><Heading section={section}/>{section.intro&&<div className="mt-5"><Copy>{section.intro}</Copy></div>}</header><ol className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2">{section.routes?.map((item)=><li key={item.title} className="border border-line bg-surface-soft p-6"><h3 className="font-black leading-8 text-ink">{item.title}</h3>{item.english_label&&<span className="mt-1 block text-[9px] tracking-[.13em] text-brand-primary"><bdi dir="ltr">{item.english_label}</bdi></span>}<p className="mt-2 text-[13px] leading-7 text-ink-muted">{item.description}</p></li>)}</ol><div className="mx-auto mt-6 max-w-3xl space-y-2 text-center">{section.closing_paragraphs?.map((p)=><Copy key={p}>{p}</Copy>)}</div><div className="flex justify-center"><Actions section={section} rtl={rtl}/></div></div></section>;
}

function WholePortfolio({ section, locale, rtl }: { section: PortfolioSection; locale: SiteLocale; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16 lg:py-18"><div className="dnh-site-shell"><div className="grid items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16"><div><Eyebrow section={section} /><Heading section={section} /><div className="mt-5"><Copy>{section.intro}</Copy></div><div className="mt-7 border-s border-t border-line">{section.items?.map((item, index) => <article key={`${section.id}-${index}`} className="border-b border-e border-line p-4"><h3 className="font-black leading-7 text-ink">{item.title}</h3><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></article>)}</div></div><figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[4/5]"><Image src="/assets/images/portfolio-intelligence.webp" alt={locale === "fa" ? "تحلیل یکپارچه نقش دارایی‌ها در پرتفوی" : "Integrated analysis of asset roles within a portfolio"} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-[#032f3f]/90 p-4 text-[11px] font-bold text-white">{section.english_label}</figcaption></figure></div>{section.closing ? <div className="mt-6 max-w-4xl border-s-[3px] border-brand-accent ps-5"><Copy>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl} /></div></section>;
}

function Process({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16 lg:py-18"><div className="dnh-site-shell"><Eyebrow section={section}/><Heading section={section}/><ol className="mt-10 grid gap-x-12 lg:grid-cols-2">{section.steps?.map((step, index) => <li key={`${section.id}-${index}`} className="relative border-s border-brand-accent/45 pb-8 ps-7"><span aria-hidden="true" className="absolute -start-2 top-1 block size-4 bg-brand-primary ring-4 ring-white"/><div><span className="block text-[9px] tracking-[.12em] text-brand-primary"><bdi dir="ltr">{step.english_label}</bdi></span><h3 className="mt-1 font-black leading-8 text-ink">{step.title}</h3><p className="mt-2 text-[13px] leading-7 text-ink-muted">{step.description}</p></div></li>)}</ol>{section.closing ? <div className="mt-5 max-w-4xl"><Copy>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl}/></div></section>;
}

function FinalSection({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative bg-[#032f3f] py-16 text-white sm:py-20"><span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-accent"/><div className="dnh-site-shell"><header className="mx-auto max-w-4xl text-center"><div className="flex justify-center"><Eyebrow section={section} dark /></div><h2 id={`${section.id}-title`} className="mx-auto mt-4 max-w-[28ch] text-pretty text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.45]">{section.heading}</h2><div className="mx-auto mt-5 max-w-3xl space-y-3">{section.paragraphs?.map((paragraph, index) => <Copy key={`${section.id}-p-${index}`} dark>{paragraph}</Copy>)}</div></header><ul className="mx-auto mt-10 grid max-w-5xl border-y border-white/15 sm:grid-cols-2">{section.checklist?.map((item, index) => <li key={`${section.id}-${index}`} className="flex gap-3 border-b border-white/15 p-5 text-sm leading-7 text-white/85 sm:[&:nth-child(odd)]:border-e"><Check className="mt-1 shrink-0 text-brand-accent" size={18}/>{item}</li>)}</ul><div className="mx-auto mt-7 max-w-3xl text-center">{section.closing_paragraphs?.length ? <div className="space-y-2">{section.closing_paragraphs.map((paragraph, index) => <Copy key={`${section.id}-closing-${index}`} dark>{paragraph}</Copy>)}</div> : section.closing ? <Copy dark>{section.closing}</Copy> : null}<div className="mt-7 border border-white/15 bg-white/[.04] p-5 [&>div]:justify-center"><Actions section={section} rtl={rtl} dark /></div></div></div></section>;
}

export function PortfolioIntelligencePage({ content, locale }: { content: PortfolioDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl";
  return <div dir={content.direction}>{content.sections.map((section) => {
    if (section.type === "hero") return <Hero key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "diversification") return <DiversificationField key={section.id} section={section} rtl={rtl}/>;
    if (section.type === "asset-roles") return <RoleTaxonomy key={section.id} section={section} rtl={rtl}/>;
    if (section.type === "concentration-risk") return <DependencyNetwork key={section.id} section={section} rtl={rtl}/>;
    if (section.type === "whole-wealth-view") return <WholePortfolio key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "liquidity-goals-horizon") return <HorizonAxes key={section.id} section={section} rtl={rtl}/>;
    if (section.type === "process") return <Process key={section.id} section={section} rtl={rtl} />;
    if (section.type === "routing") return <RoutingPanel key={section.id} section={section} rtl={rtl}/>;
    if (section.type === "final-cta") return <FinalSection key={section.id} section={section} rtl={rtl} />;
    return <CardSection key={section.id} section={section} rtl={rtl} dark={section.type === "diagnostic-signs"} />;
  })}</div>;
}
