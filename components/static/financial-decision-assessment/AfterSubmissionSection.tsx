import { ArrowLeft, ArrowRight, ClipboardCheck, FileSearch, MessageSquare, Presentation, Route, ShieldCheck, type LucideIcon } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { AfterSubmissionContent } from "./assessmentTypes";

const STEP_ICONS: Record<AfterSubmissionContent["board"]["steps"][number]["icon"], LucideIcon> = { received: ClipboardCheck, review: FileSearch, route: Route };
const PATH_ICONS: Record<AfterSubmissionContent["board"]["paths"][number]["icon"], LucideIcon> = { consultation: MessageSquare, briefing: Presentation };
const REASSURANCE_ICONS: Record<AfterSubmissionContent["reassurance"][number]["icon"], LucideIcon> = { received: ClipboardCheck, review: FileSearch, privacy: ShieldCheck };

export function AfterSubmissionSection({ content, direction }: { content: AfterSubmissionContent; direction: SiteDirection }) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id={content.id} dir={direction} aria-labelledby="after-submission-title" className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-page py-16 sm:scroll-mt-28 sm:py-20 lg:py-24 xl:py-28">
      <Background />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div><Eyebrow>{content.eyebrow}</Eyebrow><h2 id="after-submission-title" className="max-w-[720px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[1.5] xl:text-[50px]"><Highlight text={content.heading} highlight={content.heading_highlight} /></h2></div>
          <p className="max-w-[690px] text-[13px] font-medium leading-[2.2] text-ink-muted sm:text-[14px] lg:text-[15px]">{content.intro}</p>
        </div>

        <div className="relative mt-12 overflow-hidden border border-line bg-white shadow-[0_30px_90px_rgba(11,76,101,.08)] sm:mt-14 lg:mt-16">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[3px]"><span className="w-[20%] bg-brand-primary" /><span className="flex-1 bg-brand-accent" /></div>
          <div className="flex flex-col gap-4 border-b border-line px-5 pb-5 pt-7 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
            <div><bdi dir="ltr" className="text-[11px] font-black tracking-[0.19em] text-brand-primary/55">{content.board.eyebrow}</bdi><h3 className="mt-2 text-[16px] font-black text-ink sm:text-[18px]">{content.board.title}</h3></div>
            <div className="flex items-center gap-3"><span className="size-[11px] bg-brand-primary" aria-hidden="true" /><span className="text-[11px] font-bold text-ink-muted">{content.board.note}</span></div>
          </div>

          <div className="grid lg:grid-cols-[0.63fr_0.37fr]">
            <ol className="border-b border-line lg:border-b-0 lg:border-e">
              {content.board.steps.map((step) => { const Icon = STEP_ICONS[step.icon]; return <li key={step.id} className="grid gap-4 border-b border-line p-5 last:border-b-0 sm:grid-cols-[4rem_0.75fr_1.25fr] sm:items-center sm:p-6 lg:px-8"><div><span className="text-[12px] font-black text-brand-primary">{step.number}</span><bdi dir="ltr" className="mt-1 block text-[8px] font-black tracking-[0.15em] text-brand-primary/40">{step.code}</bdi></div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-line bg-surface-soft text-brand-primary"><Icon size={16} /></span><h4 className="text-[13px] font-black leading-7 text-ink">{step.title}</h4></div><p className="border-s border-line ps-5 text-[11px] font-medium leading-[2] text-ink-muted">{step.description}</p></li>; })}
            </ol>

            <div className="bg-surface-soft/45 px-5 py-6 sm:px-7 lg:px-8">
              <bdi dir="ltr" className="text-[11px] font-black tracking-[0.18em] text-brand-primary/55">{content.board.paths_eyebrow}</bdi>
              <h3 className="mt-2 text-[15px] font-black leading-[1.9] text-ink">{content.board.paths_title}</h3>
              <div className="mt-6 space-y-3">{content.board.paths.map((path) => { const Icon = PATH_ICONS[path.icon]; return <article key={path.id} className={`border p-5 ${path.tone === "orange" ? "border-brand-primary/25 bg-brand-primary/[0.035]" : "border-brand-accent/20 bg-white"}`}><div className="flex items-center gap-3"><Icon size={17} className={path.tone === "orange" ? "text-brand-primary" : "text-brand-accent"} /><div><bdi dir="ltr" className="text-[8px] font-black tracking-[0.14em] text-ink-muted/55">{path.code}</bdi><h4 className="mt-1 text-[12px] font-black text-ink">{path.title}</h4></div></div><p className="mt-3 text-[10px] font-medium leading-[2] text-ink-muted">{path.description}</p></article>; })}</div>
              <p className="mt-6 border-s-2 border-brand-primary ps-4 text-[11px] font-medium leading-[1.9] text-ink-muted">{content.board.caveat}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-line bg-brand-secondary px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
            <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center border border-white/15 bg-white/[0.07] text-brand-primary"><Route size={17} /></span><div><bdi dir="ltr" className="text-[11px] font-black tracking-[0.18em] text-white/40">{content.board.principle_eyebrow}</bdi><p className="mt-2 text-[11px] font-black leading-[2] sm:text-[12px]">{content.board.principle}</p></div></div><span aria-hidden="true" className="hidden h-px w-24 bg-brand-primary/65 sm:block" />
          </div>
        </div>

        <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">{content.reassurance.map((item) => { const Icon = REASSURANCE_ICONS[item.icon]; return <article key={item.id} className="bg-white p-5 sm:p-6"><Icon size={17} className="text-brand-primary" /><h3 className="mt-4 text-[12px] font-black text-ink">{item.title}</h3><p className="mt-2 text-[10px] leading-[2] text-ink-muted">{item.text}</p></article>; })}</div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[11px] font-medium text-ink-muted">{content.return_prompt}</p><a href={content.return_link.href} className="mt-2 inline-flex items-center gap-2 text-[10px] font-black text-brand-primary hover:text-brand-accent">{content.return_link.label}<Arrow size={14} /></a></div><ActionButton href={content.question_cta.href} variant="secondary" size="md" shape="square" icon={Arrow} className="w-full border-line-strong bg-white text-ink shadow-none hover:bg-brand-secondary hover:text-white sm:w-auto sm:min-w-[235px]">{content.question_cta.label}</ActionButton></div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: string }) { return <div className="mb-5 flex items-center gap-3"><span className="h-px w-10 bg-brand-accent" aria-hidden="true" /><span className="text-[10px] font-black text-brand-primary sm:text-[11px]">{children}</span></div>; }
function Highlight({ text, highlight }: { text: string; highlight: string }) { const index = text.indexOf(highlight); if (index < 0) return text; return <>{text.slice(0,index)}<span className="text-brand-primary">{highlight}</span>{text.slice(index + highlight.length)}</>; }
function Background() { return <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,var(--dnh-primary) 1px,transparent 1px)", backgroundSize: "118px 100%" }} />; }
