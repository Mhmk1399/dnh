"use client";

import { ArrowLeft, ArrowRight, BarChart3, Droplets, Landmark, Layers3, ShieldCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";

type FocusId = "risk" | "liquidity" | "economy" | "assets" | "decision";
type HeroContent = {
  id: string;
  type: string;
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  paragraphs: Array<{ id: string; text: string }>;
  focus_areas: Array<{ id: FocusId; label: string; english_label: string }>;
  ctas: Array<{ id: string; label: string; type: "primary" | "secondary"; href: string }>;
};

const focusIcons: Record<FocusId, LucideIcon> = {
  risk: ShieldCheck,
  liquidity: Droplets,
  economy: Landmark,
  assets: Layers3,
  decision: BarChart3,
};

function HighlightedHeading({ heading, highlight }: { heading: string; highlight: string }) {
  const index = highlight ? heading.indexOf(highlight) : -1;
  if (index < 0) return <>{heading}</>;
  return <>{heading.slice(0, index)}<span className="text-brand-accent">{highlight}</span>{heading.slice(index + highlight.length)}</>;
}

export function IntelligenceDeskHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = source.sections.find((section) => section.id === "dnh-intelligence-desk-hero" && section.type === "hero") as HeroContent | undefined;
  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const thesis = content.paragraphs.find((paragraph) => paragraph.id === "interpretation-thesis");
  const paragraphs = content.paragraphs.filter((paragraph) => paragraph.id !== "interpretation-thesis");

  return (
    <section id={content.id} dir={direction} lang={languageTag} aria-labelledby="intelligence-desk-hero-heading" className="relative isolate overflow-x-clip border-b border-white/10 bg-[#071f2a] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-10 pb-14 pt-32 sm:pb-16 sm:pt-36 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,.96fr)] lg:items-center lg:gap-16 lg:pb-20 lg:pt-40">
        <div className="min-w-0 text-start">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand-accent" />
            <p className="text-xs font-bold text-white/85">{content.eyebrow}</p>
          </div>
          {locale === "fa" ? <bdi dir="ltr" className="mt-1 block w-fit text-[10px] font-bold uppercase tracking-[.16em] text-white/50">{content.english_label}</bdi> : null}

          <h1 id="intelligence-desk-hero-heading" className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,5vw,4.25rem)] font-black ${isRTL ? "leading-[1.5]" : "leading-[1.12]"}`}>
            <HighlightedHeading heading={content.heading} highlight={content.heading_highlight} />
          </h1>

          <div className={`mt-6 max-w-3xl space-y-3 border-s-2 border-brand-accent ps-5 text-sm text-white/72 sm:text-[15px] ${isRTL ? "leading-8" : "leading-7"}`}>
            {paragraphs.map((paragraph) => <p key={paragraph.id}>{paragraph.text}</p>)}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {content.ctas.map((cta) => (
              <ActionButton key={cta.id} href={cta.href} variant={cta.type} size="lg" icon={Arrow} iconPosition="end" className={cta.type === "secondary" ? "border-white/25 bg-transparent text-white hover:bg-white hover:text-ink" : ""}>
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>

        <aside className="min-w-0 border border-white/15 bg-white/[.035]">
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
            <bdi dir="ltr" className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Decision intelligence scope</bdi>
            <span aria-hidden="true" className="size-2 bg-brand-accent shadow-[0_0_0_5px_rgba(252,133,2,.12)]" />
          </div>
          <ol className="divide-y divide-white/15 px-5">
            {content.focus_areas.map((area, index) => {
              const Icon = focusIcons[area.id];
              return <li key={area.id} className="grid grid-cols-[44px_1fr_auto] items-center gap-4 py-5"><span className="flex size-11 items-center justify-center border border-white/15 text-brand-accent"><Icon aria-hidden="true" size={19} /></span><div><p className="font-black leading-7">{area.label}</p>{locale === "fa" ? <bdi dir="ltr" className="block text-[9px] uppercase tracking-[.12em] text-white/45">{area.english_label}</bdi> : null}</div><bdi dir="ltr" className="text-[10px] font-black text-white/30">{String(index + 1).padStart(2, "0")}</bdi></li>;
            })}
          </ol>
          {thesis ? <p className={`border-t border-white/15 border-s-[3px] border-s-brand-accent px-5 py-5 text-sm font-bold text-white/85 ${isRTL ? "leading-8" : "leading-7"}`}>{thesis.text}</p> : null}
        </aside>
      </div>
    </section>
  );
}
