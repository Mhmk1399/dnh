import Image from "next/image";
import { Layers3 } from "lucide-react";
import type { SiteLocale } from "@/lib/site-language";
import { SectionActions } from "./PortfolioShared";
import type { PortfolioSection } from "./portfolioTypes";

export function PortfolioHero({ section, locale, rtl }: { section: PortfolioSection; locale: SiteLocale; rtl: boolean }) {
  const paragraphs = section.paragraphs ?? [];
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative isolate overflow-hidden bg-brand-secondary text-page">
    <Image src="/assets/images/unstructured-portfolio4.webp" alt={locale === "fa" ? "نمای یکپارچه دارایی‌های یک پرتفوی" : "A unified view of a multi-asset portfolio"} fill priority sizes="100vw" className="object-cover opacity-45" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--dnh-secondary)_42%,transparent),var(--dnh-secondary)_94%)]" />
    <div className="dnh-site-shell relative z-10 pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pb-20"><div className="grid items-end gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
      <div><p className="flex items-center gap-3 text-sm font-black text-brand-primary"><span className="h-px w-10 bg-current" />{section.eyebrow}</p><h1 id={`${section.id}-title`} className="mt-5 max-w-[21ch] text-pretty text-[clamp(2.35rem,5.5vw,4.75rem)] font-black leading-[1.22]">{section.heading}</h1><div className="mt-6 max-w-3xl space-y-3 text-base leading-[1.95] text-page/78 sm:text-lg">{paragraphs.slice(0, 2).map((text) => <p key={text}>{text}</p>)}</div><SectionActions section={section} rtl={rtl} dark /></div>
      <div className="border border-page/15 bg-brand-secondary/70 p-5 backdrop-blur-sm sm:p-7"><div className="mb-5 flex size-12 items-center justify-center bg-brand-primary text-brand-secondary"><Layers3 size={24} /></div><div className="divide-y divide-page/12">{paragraphs.slice(2).map((text, index) => <p key={text} className="py-3 text-[15px] font-semibold leading-7 text-page/82"><span className="me-3 text-brand-primary">{String(index + 1).padStart(2, "0")}</span>{text}</p>)}</div></div>
    </div></div>
  </section>;
}
