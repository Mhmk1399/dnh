import { MajorDecisionActions, MajorDecisionCopy, MajorDecisionEyebrow, MajorDecisionHeading } from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionReadinessSection({ section, rtl }: { section: MajorDecisionSection; rtl: boolean }) {
  const dark = section.type === "downside-risk" || section.type === "scenario-analysis";
  const horizon = section.type === "liquidity-timing";
  const entries = section.items ?? [];
  const questions = section.questions ?? [];

  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${dark ? "bg-brand-secondary text-page" : section.type === "options-tradeoffs" ? "bg-surface-soft text-ink" : "bg-page text-ink"} relative isolate scroll-mt-24 overflow-hidden border-b border-line py-14 sm:py-18 lg:py-24`}>
    <div className="dnh-site-shell grid min-w-0 items-start gap-9 lg:grid-cols-[minmax(0,.76fr)_minmax(0,1.24fr)] lg:gap-16">
      <header className={`min-w-0 ${dark ? "lg:sticky lg:top-28" : ""}`}>
        <MajorDecisionEyebrow section={section} dark={dark} />
        <MajorDecisionHeading section={section} dark={dark} />
        <div className="mt-5 max-w-[62ch] space-y-3">{section.paragraphs?.map((paragraph, index) => <MajorDecisionCopy key={`${section.id}-p-${index}`} dark={dark}>{paragraph}</MajorDecisionCopy>)}{section.intro ? <MajorDecisionCopy dark={dark}>{section.intro}</MajorDecisionCopy> : null}</div>
      </header>

      <div className="min-w-0">
        {entries.length ? <ol className={`grid gap-1 ${dark ? "bg-page/15" : "bg-line"} sm:grid-cols-2`}>{entries.map((item, index) => <li key={`${section.id}-item-${index}`} className={`${dark ? "bg-brand-secondary" : "bg-page"} min-h-48 p-5 sm:p-6`}><bdi dir="ltr" className="text-[10px] font-bold tracking-[.18em] text-brand-primary">{String(item.number ?? index + 1).padStart(2, "0")}</bdi><h3 className={`mt-3 text-[19px] font-black leading-[1.65] ${dark ? "text-page" : "text-ink"}`}>{item.title}</h3>{item.english_label ? <bdi dir="ltr" className={`mt-1 block text-start text-[9px] uppercase tracking-[.13em] ${dark ? "text-page/50" : "text-brand-primary"}`}>{item.english_label}</bdi> : null}<p className={`mt-3 text-[14px] leading-[1.95] ${dark ? "text-page/72" : "text-ink-muted"}`}>{item.description}</p></li>)}</ol> : null}

        {questions.length ? <ol className={horizon ? "relative border-s border-brand-accent/55 ps-7" : `grid gap-1 ${dark ? "bg-page/15" : "bg-line"} sm:grid-cols-2`}>{questions.map((question, index) => <li key={`${section.id}-q-${index}`} className={horizon ? "relative border-b border-line bg-page py-5 text-[14px] font-semibold leading-[1.95] text-ink" : `${dark ? "bg-brand-secondary text-page/88" : "bg-page text-ink"} min-h-32 p-5 text-[14px] font-semibold leading-[1.95] sm:p-6`}>{horizon ? <span aria-hidden="true" className="absolute -start-[35px] top-7 size-3 bg-brand-accent" /> : <bdi dir="ltr" className="mb-3 block text-[10px] font-bold tracking-[.18em] text-brand-primary">{String(index + 1).padStart(2, "0")}</bdi>}{question}</li>)}</ol> : null}

        {section.closing_paragraphs?.length ? <div className={`mt-6 space-y-3 border-s-2 ps-5 ${dark ? "border-brand-primary" : "border-brand-accent"}`}>{section.closing_paragraphs.map((paragraph, index) => <MajorDecisionCopy key={`${section.id}-closing-${index}`} dark={dark}>{paragraph}</MajorDecisionCopy>)}</div> : null}
        <MajorDecisionActions section={section} rtl={rtl} dark={dark} />
      </div>
    </div>
  </section>;
}
