import Image from "next/image";
import { Clock3, Droplets, Focus, Landmark, Link2, ShieldCheck } from "lucide-react";
import type { SiteLocale } from "@/lib/site-language";
import { BodyCopy, SectionActions, SectionIntro } from "./PortfolioShared";
import type { PortfolioSection } from "./portfolioTypes";

const roleIcons = [Landmark, ShieldCheck, Droplets, Focus, Clock3, Link2];

export function PortfolioArchitecture({ whole, roles, risk, horizon, locale, rtl }: { whole: PortfolioSection; roles: PortfolioSection; risk: PortfolioSection; horizon: PortfolioSection; locale: SiteLocale; rtl: boolean }) {
  return <>
    <section id={whole.id} aria-labelledby={`${whole.id}-title`} className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"><div className="dnh-site-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div><SectionIntro section={whole} />{whole.intro && <div className="mt-6"><BodyCopy>{whole.intro}</BodyCopy></div>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">{whole.items?.map((item, index) => <article key={item.title} className="border-s-2 border-brand-primary bg-page p-5"><span className="text-xs font-black text-brand-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-2 text-lg font-black leading-8 text-ink">{item.title}</h3><p className="mt-2 text-[15px] leading-7 text-ink-muted">{item.description}</p></article>)}</div>
    </div><figure className="relative min-h-[34rem] overflow-hidden bg-brand-secondary"><Image src="/assets/images/whole-wealth-structure.webp" alt={locale === "fa" ? "تصویر ساختار یکپارچه ثروت" : "Integrated wealth structure"} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-75" /><div className="absolute inset-5 border border-page/30" /><div className="absolute inset-x-0 bottom-0 bg-brand-secondary/90 p-6"><p className="text-xl font-black leading-9 text-page">{whole.closing}</p></div></figure></div><div className="dnh-site-shell"><SectionActions section={whole} rtl={rtl} /></div></section>

    <section id={roles.id} aria-labelledby={`${roles.id}-title`} className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><SectionIntro section={roles} /><div className="space-y-3">{roles.paragraphs?.map((text) => <BodyCopy key={text}>{text}</BodyCopy>)}</div></div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{roles.items?.map((item, index) => { const Icon = roleIcons[index % roleIcons.length]; return <article key={item.title} className="group border border-line bg-surface-soft p-6 transition duration-300 hover:border-brand-secondary hover:bg-brand-secondary hover:text-page"><div className="flex size-12 items-center justify-center bg-brand-primary text-brand-secondary"><Icon size={23} /></div><h3 className="mt-6 text-xl font-black leading-8">{item.title}</h3><p className="mt-3 text-[15px] leading-7 text-ink-muted group-hover:text-page/68">{item.description}</p></article>; })}</div>
      <div className="mt-9 grid gap-3 border-s-4 border-brand-primary ps-6 lg:grid-cols-2">{roles.closing_paragraphs?.map((text) => <BodyCopy key={text}>{text}</BodyCopy>)}</div><SectionActions section={roles} rtl={rtl} />
    </div></section>

    <section id={risk.id} aria-labelledby={`${risk.id}-title`} className="border-b border-line bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"><div className="dnh-site-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><div className="lg:sticky lg:top-28"><SectionIntro section={risk} dark />{risk.intro && <div className="mt-6"><BodyCopy dark>{risk.intro}</BodyCopy></div>}<div className="mt-9 flex items-center gap-4"><span className="size-4 rounded-full bg-brand-primary ring-8 ring-brand-primary/15" /><span className="h-px flex-1 bg-brand-primary/35" /></div></div>
      <div><div className="grid gap-4 sm:grid-cols-2">{risk.items?.map((item) => <article key={item.title} className="relative border border-page/15 p-6 before:absolute before:start-0 before:top-6 before:h-10 before:w-1 before:bg-brand-primary"><h3 className="text-lg font-black leading-8">{item.title}</h3><p className="mt-3 text-[15px] leading-7 text-page/65">{item.description}</p></article>)}</div><div className="mt-7 space-y-3 border-s-4 border-brand-primary ps-6">{risk.closing_paragraphs?.map((text) => <BodyCopy key={text} dark>{text}</BodyCopy>)}</div><SectionActions section={risk} rtl={rtl} dark /></div>
    </div></section>

    <section id={horizon.id} aria-labelledby={`${horizon.id}-title`} className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"><div className="dnh-site-shell"><div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:gap-16"><SectionIntro section={horizon} /><div className="space-y-3">{horizon.paragraphs?.map((text) => <BodyCopy key={text}>{text}</BodyCopy>)}{horizon.intro && <BodyCopy>{horizon.intro}</BodyCopy>}</div></div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">{horizon.items?.map((item, index) => { const Icon = [Droplets, Focus, Clock3][index]; return <article key={item.title} className="relative border-t-4 border-brand-primary bg-page p-7 shadow-[0_18px_50px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]"><Icon className="text-brand-primary" size={30} /><h3 className="mt-7 text-xl font-black leading-8 text-ink">{item.title}</h3><p className="mt-3 text-[15px] leading-7 text-ink-muted">{item.description}</p></article>; })}</div><SectionActions section={horizon} rtl={rtl} />
    </div></section>
  </>;
}
