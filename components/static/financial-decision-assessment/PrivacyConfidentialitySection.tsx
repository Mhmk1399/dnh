import { ArrowLeft, ArrowRight, Building2, Clock3, FileText, FolderOpen, Landmark, LockKeyhole, Scale, ShieldCheck, UserRound, UsersRound, WalletCards, type LucideIcon } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { AssessmentPrivacyContent } from "./assessmentTypes";

const ICONS: Record<string, LucideIcon> = {
  user: UserRound,
  file: FileText,
  clock: Clock3,
  scale: Scale,
  bank: Landmark,
  identity: Building2,
  lock: LockKeyhole,
  wallet: WalletCards,
  users: UsersRound,
  folder: FolderOpen,
};

export function PrivacyConfidentialitySection({ content, direction }: { content: AssessmentPrivacyContent; direction: SiteDirection }) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id={content.id} dir={direction} aria-labelledby="privacy-confidentiality-title" className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-page py-16 sm:scroll-mt-28 sm:py-20 lg:py-24 xl:py-28">
      <Background />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div><Eyebrow>{content.eyebrow}</Eyebrow><h2 id="privacy-confidentiality-title" className="max-w-[760px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[1.5] xl:text-[50px]"><Highlight text={content.heading} highlight={content.heading_highlight} /></h2></div>
          <div><p className="max-w-[690px] text-[13px] font-medium leading-[2.2] text-ink-muted sm:text-[14px] lg:text-[15px]">{content.intro}</p><p className="mt-5 border-s-2 border-brand-primary ps-5 text-[11px] font-medium leading-[2] text-ink-muted">{content.principle}</p></div>
        </div>

        <div className="mt-12 grid border border-line bg-white shadow-[0_28px_80px_rgba(13,79,104,.06)] sm:mt-14 lg:mt-16 lg:grid-cols-2">
          <BoundaryColumn eyebrow={content.needed.eyebrow} title={content.needed.title} items={content.needed.items} positive />
          <BoundaryColumn eyebrow={content.not_needed.eyebrow} title={content.not_needed.title} items={content.not_needed.items} />
          <div className="relative border-t border-line bg-brand-secondary px-5 py-5 text-white lg:col-span-2 sm:px-7 lg:px-8">
            <span aria-hidden="true" className="absolute inset-y-0 start-0 w-[3px] bg-brand-primary" />
            <div className="flex items-start gap-3"><ShieldCheck className="mt-1 size-4 shrink-0 text-brand-primary" aria-hidden="true" /><p className="max-w-4xl text-[12px] font-medium leading-[2] text-white/62">{content.boundary}</p></div>
          </div>
        </div>

        <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
          {content.trust_points.map((point) => <article key={point.id} className="bg-white p-5 sm:p-6"><p className="text-[12px] font-black text-ink">{point.title}</p><p className="mt-2 text-[10px] font-medium leading-[2] text-ink-muted">{point.text}</p></article>)}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] font-bold text-ink-muted">{content.final.title}</p>
          <div className="flex flex-col gap-3 sm:flex-row"><ActionButton href={content.final.cta.href} variant="primary" size="md" shape="square" icon={Arrow}>{content.final.cta.label}</ActionButton><ActionButton href={content.final.next.href} variant="secondary" size="md" shape="square" icon={Arrow}>{content.final.next.label}</ActionButton></div>
        </div>
      </div>
    </section>
  );
}

function BoundaryColumn({ eyebrow, title, items, positive = false }: { eyebrow: string; title: string; items: AssessmentPrivacyContent["needed"]["items"]; positive?: boolean }) {
  return <div className="border-b border-line lg:border-b-0 lg:border-e last:lg:border-e-0"><div className={`border-b border-line px-5 py-5 sm:px-7 lg:px-8 ${positive ? "bg-brand-primary text-white" : "bg-surface-soft"}`}><bdi dir="ltr" className={`text-[9px] font-black tracking-[0.18em] ${positive ? "text-white/50" : "text-brand-primary/50"}`}>{eyebrow}</bdi><h3 className={`mt-2 text-[16px] font-black ${positive ? "text-white" : "text-ink"}`}>{title}</h3></div><div>{items.map((item) => { const Icon = ICONS[item.icon] ?? FileText; return <article key={item.id} className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line p-5 last:border-b-0 sm:p-6 lg:px-8"><span className={`grid size-10 place-items-center border ${positive ? "border-brand-primary/15 bg-brand-primary/[0.05] text-brand-primary" : "border-line bg-surface-soft text-ink-muted"}`}><Icon size={17} strokeWidth={1.5} /></span><div><h4 className="text-[12px] font-black text-ink">{item.title}</h4><p className="mt-1 text-[10px] font-medium leading-[2] text-ink-muted">{item.description}</p></div></article>; })}</div></div>;
}

function Eyebrow({ children }: { children: string }) { return <div className="mb-5 flex items-center gap-3"><span className="h-px w-10 bg-brand-accent" aria-hidden="true" /><span className="text-[10px] font-black text-brand-primary sm:text-[11px]">{children}</span></div>; }
function Highlight({ text, highlight }: { text: string; highlight: string }) { const index = text.indexOf(highlight); if (index < 0) return text; return <>{text.slice(0,index)}<span className="text-brand-primary">{highlight}</span>{text.slice(index + highlight.length)}</>; }
function Background() { return <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,var(--dnh-primary) 1px,transparent 1px)", backgroundSize: "118px 100%" }} />; }
