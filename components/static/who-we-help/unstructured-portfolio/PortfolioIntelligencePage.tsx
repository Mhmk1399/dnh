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
  "portfolio-intelligence-hero": ["/financial-decision-assessment", "/request-strategic-consultation"],
  "see-the-portfolio-as-a-structure": ["/financial-decision-assessment", "/request-strategic-consultation"],
};

function Eyebrow({ section, dark = false }: { section: PortfolioSection; dark?: boolean }) {
  return <div className={dark ? "text-[#c7e2e7]" : "text-brand-primary"}><p className="flex items-center gap-3 text-[12px] font-black leading-7"><span className="h-0.5 w-9 bg-brand-accent" />{section.eyebrow}</p><bdi dir="ltr" className="mt-1 block text-start text-[9px] font-bold uppercase tracking-[.2em] opacity-65">{section.english_label}</bdi></div>;
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
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative isolate overflow-hidden bg-[#032f3f] text-white"><div className="relative min-h-[760px] lg:min-h-[720px]"><Image src="/assets/images/unstructured-portfolio.png" alt={locale === "fa" ? "نمای تحلیلی ساختار یک پرتفوی چنددارایی" : "Analytical view of a multi-asset portfolio structure"} fill priority sizes="100vw" className="object-cover object-center" /><div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,47,63,.22),rgba(3,47,63,.98)_66%)] ${sideScrim}`} /><div className="dnh-site-shell relative z-10 flex min-h-[760px] items-end py-12 pt-36 lg:min-h-[720px] lg:items-center"><div className="w-full lg:w-[62%]"><Eyebrow section={section} dark /><h1 id={`${section.id}-title`} className="mt-5 max-w-[18ch] text-pretty text-[clamp(2.25rem,5.1vw,4.55rem)] font-black leading-[1.42]">{section.heading}</h1><div className="mt-5 max-w-[760px] space-y-3">{section.paragraphs?.slice(0, 3).map((paragraph) => <Copy key={paragraph} dark>{paragraph}</Copy>)}</div></div></div></div><div className="border-t border-white/15 bg-[#022a37]"><div className="dnh-site-shell py-8"><div className="grid gap-3 border-s-2 border-brand-accent ps-5">{section.paragraphs?.slice(3).map((paragraph, index) => <p key={paragraph} className={index === 1 ? "text-xl font-black leading-9 text-white sm:text-2xl" : "text-xs font-bold text-white/65"}>{paragraph}</p>)}</div><Actions section={section} rtl={rtl} dark /></div></div></section>;
}

function CardSection({ section, rtl, dark = false }: { section: PortfolioSection; rtl: boolean; dark?: boolean }) {
  const entries = section.items ?? section.assets ?? [];
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : section.order % 2 ? "bg-page" : "bg-surface-soft"} border-b border-line py-14 sm:py-16 lg:py-18`}><div className="dnh-site-shell grid gap-8 lg:grid-cols-[.76fr_1.24fr] lg:gap-14"><div><Eyebrow section={section} dark={dark} /><Heading section={section} dark={dark} />{section.paragraphs?.length ? <div className="mt-5 space-y-3">{section.paragraphs.map((paragraph) => <Copy key={paragraph} dark={dark}>{paragraph}</Copy>)}</div> : null}{section.intro ? <div className="mt-5"><Copy dark={dark}>{section.intro}</Copy></div> : null}{section.framework_logic ? <ArchitectureRail logic={section.framework_logic} dark={dark} /> : null}</div><div><div className={`grid border-s border-t ${dark ? "border-white/15" : "border-line"} sm:grid-cols-2`}>{entries.map((item, index) => <article key={`${section.id}-${index}`} className={`border-b border-e p-5 sm:p-6 ${dark ? "border-white/15" : "border-line"}`}><bdi dir="ltr" className="text-[9px] font-black tracking-[.16em] text-brand-accent">{String(item.number ?? index + 1).padStart(2, "0")}</bdi><h3 className={`mt-2 text-[17px] font-black leading-8 ${dark ? "text-white" : "text-ink"}`}>{item.title}</h3><p className={`mt-2 text-[13px] leading-7 ${dark ? "text-white/68" : "text-ink-muted"}`}>{item.description}</p></article>)}</div>{section.closing ? <div className="mt-5 border-s-[3px] border-brand-accent ps-5"><Copy dark={dark}>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl} dark={dark} /></div></div></section>;
}

function ArchitectureRail({ logic, dark = false }: { logic: string; dark?: boolean }) {
  return <div className="mt-8" aria-label={logic}><div className="flex flex-col border-s border-brand-accent/60 ps-4">{logic.split(" → ").map((label, index) => <div key={label} className="relative py-1.5"><span className="absolute -start-[21px] top-1/2 size-3 -translate-y-1/2 border-2 border-brand-accent bg-page" /><span className={`block border px-3 py-2 text-[10px] font-black uppercase tracking-[.1em] ${dark ? "border-white/20 text-white/80" : "border-line bg-white text-brand-primary"}`}><bdi dir="ltr">{String(index + 1).padStart(2, "0")} — {label}</bdi></span></div>)}</div></div>;
}

function WholePortfolio({ section, locale, rtl }: { section: PortfolioSection; locale: SiteLocale; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16 lg:py-18"><div className="dnh-site-shell"><div className="grid items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16"><div><Eyebrow section={section} /><Heading section={section} /><div className="mt-5"><Copy>{section.intro}</Copy></div><div className="mt-7 border-s border-t border-line">{section.items?.map((item, index) => <article key={`${section.id}-${index}`} className="grid grid-cols-[44px_1fr] border-b border-e border-line"><bdi dir="ltr" className="flex items-center justify-center border-e border-line text-[10px] font-black text-brand-accent">{String(index + 1).padStart(2, "0")}</bdi><div className="p-4"><h3 className="font-black leading-7 text-ink">{item.title}</h3><p className="mt-1 text-[13px] leading-7 text-ink-muted">{item.description}</p></div></article>)}</div></div><figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[4/5]"><Image src="/assets/images/portfolio-intelligence.webp" alt={locale === "fa" ? "تحلیل یکپارچه نقش دارایی‌ها در پرتفوی" : "Integrated analysis of asset roles within a portfolio"} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-[#032f3f]/90 p-4 text-[11px] font-bold text-white">{section.english_label}</figcaption></figure></div>{section.closing ? <div className="mt-6 max-w-4xl border-s-[3px] border-brand-accent ps-5"><Copy>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl} /></div></section>;
}

function QuestionSection({ section, rtl, dark = false }: { section: PortfolioSection; rtl: boolean; dark?: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${dark ? "bg-[#032f3f] text-white" : "bg-surface-soft"} border-b border-line py-14 sm:py-16 lg:py-18`}><div className="dnh-site-shell grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:gap-14"><div><Eyebrow section={section} dark={dark} /><Heading section={section} dark={dark} /><div className="mt-5 space-y-3">{section.paragraphs?.map((paragraph) => <Copy key={paragraph} dark={dark}>{paragraph}</Copy>)}</div></div><div><ol className={`border-t ${dark ? "border-white/15" : "border-line"}`}>{section.questions?.map((question, index) => <li key={`${section.id}-${index}`} className={`grid grid-cols-[34px_1fr] gap-3 border-b py-4 text-[13px] font-bold leading-7 ${dark ? "border-white/15 text-white/85" : "border-line text-ink"}`}><bdi dir="ltr" className="text-brand-accent">{String(index + 1).padStart(2, "0")}</bdi>{question}</li>)}</ol><div className="mt-5 space-y-2">{section.closing_paragraphs?.map((paragraph) => <Copy key={paragraph} dark={dark}>{paragraph}</Copy>)}</div><Actions section={section} rtl={rtl} dark={dark} /></div></div></section>;
}

function Process({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-line bg-page py-14 sm:py-16 lg:py-18"><div className="dnh-site-shell"><Eyebrow section={section} /><Heading section={section} /><ol className="mt-9 grid border-s border-t border-line md:grid-cols-2 lg:grid-cols-4">{section.steps?.map((step, index) => <li key={`${section.id}-${index}`} className="border-b border-e border-line p-5"><bdi dir="ltr" className="text-[10px] font-black tracking-[.15em] text-brand-accent">STEP {String(step.number).padStart(2, "0")}</bdi><h3 className="mt-2 font-black leading-8 text-ink">{step.title}</h3><bdi dir="ltr" className="block text-start text-[9px] tracking-[.12em] text-brand-primary">{step.english_label}</bdi><p className="mt-2 text-[13px] leading-7 text-ink-muted">{step.description}</p></li>)}</ol>{section.closing ? <div className="mt-5 max-w-4xl"><Copy>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl} /></div></section>;
}

function FinalSection({ section, rtl }: { section: PortfolioSection; rtl: boolean }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="bg-[#032f3f] py-14 text-white sm:py-16 lg:py-18"><div className="dnh-site-shell grid gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16"><div><Eyebrow section={section} dark /><Heading section={section} dark /><div className="mt-5 space-y-3">{section.paragraphs?.map((paragraph) => <Copy key={paragraph} dark>{paragraph}</Copy>)}</div></div><div><ul className="border-t border-white/15">{section.checklist?.map((item, index) => <li key={`${section.id}-${index}`} className="flex gap-3 border-b border-white/15 py-4 text-sm leading-7 text-white/85"><Check className="mt-1 shrink-0 text-brand-accent" size={18} />{item}</li>)}</ul>{section.closing ? <div className="mt-5 border-s-2 border-brand-accent ps-4"><Copy dark>{section.closing}</Copy></div> : null}<Actions section={section} rtl={rtl} dark /></div></div></section>;
}

export function PortfolioIntelligencePage({ content, locale }: { content: PortfolioDocument; locale: SiteLocale }) {
  const rtl = content.direction === "rtl";
  return <div dir={content.direction}>{content.sections.map((section) => {
    if (section.type === "hero") return <Hero key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "whole-portfolio-view") return <WholePortfolio key={section.id} section={section} locale={locale} rtl={rtl} />;
    if (section.type === "liquidity-time-horizon") return <QuestionSection key={section.id} section={section} rtl={rtl} />;
    if (section.type === "scenario-analysis") return <QuestionSection key={section.id} section={section} rtl={rtl} dark />;
    if (section.type === "process") return <Process key={section.id} section={section} rtl={rtl} />;
    if (section.type === "final-cta") return <FinalSection key={section.id} section={section} rtl={rtl} />;
    return <CardSection key={section.id} section={section} rtl={rtl} dark={section.type === "structural-risk"} />;
  })}</div>;
}
