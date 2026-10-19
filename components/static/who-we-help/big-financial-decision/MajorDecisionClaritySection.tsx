import { MajorDecisionActions, MajorDecisionCopy, MajorDecisionEyebrow, MajorDecisionHeading } from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorDecisionClaritySection({ section, rtl }: { section: MajorDecisionSection; rtl: boolean }) {
  const entries = section.items ?? section.routes ?? [];
  const audience = section.type === "audience";
  const routing = section.type === "routing";
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className={`${section.order % 2 === 0 ? "bg-surface-soft" : "bg-page"} relative isolate scroll-mt-24 overflow-hidden border-b border-line py-14 text-ink sm:py-18 lg:py-24`}>
    <div className="dnh-site-shell grid min-w-0 items-start gap-9 lg:grid-cols-[.76fr_1.24fr] lg:gap-16">
      <header className={`min-w-0 ${section.type === "problem-recognition" || audience ? "lg:sticky lg:top-28" : ""}`}><MajorDecisionEyebrow section={section} /><MajorDecisionHeading section={section} />{section.intro ? <div className="mt-5 max-w-[58ch]"><MajorDecisionCopy>{section.intro}</MajorDecisionCopy></div> : null}</header>
      <div className="min-w-0"><ol className={audience ? "border-y border-line" : routing ? "grid gap-5 sm:grid-cols-2" : "grid gap-1 bg-line sm:grid-cols-2"}>{entries.map((item, index) => <li key={`${section.id}-${index}`} className={audience ? "grid border-b border-line py-5 sm:grid-cols-[.72fr_1.28fr] sm:gap-6" : routing ? "border border-line bg-page p-5 transition-colors duration-300 hover:border-brand-accent sm:p-6" : "min-h-48 bg-page p-5 sm:p-6"}><div><bdi dir="ltr" className="text-[10px] font-bold tracking-[.18em] text-brand-accent">{String(item.number ?? index + 1).padStart(2, "0")}</bdi><h3 className="mt-2 text-[19px] font-black leading-[1.65] text-ink">{item.title}</h3></div><div>{item.english_label ? <bdi dir="ltr" className="mt-1 block text-start text-[9px] uppercase tracking-[.13em] text-brand-primary/70">{item.english_label}</bdi> : null}<p className="mt-3 text-[14px] leading-[1.95] text-ink-muted sm:text-[15px]">{item.description}</p></div></li>)}</ol>
        {section.closing ? <div className="mt-6 border-s-[3px] border-brand-accent ps-5"><MajorDecisionCopy>{section.closing}</MajorDecisionCopy></div> : null}
        {section.closing_paragraphs?.length ? <div className="mt-6 space-y-2 border-s-[3px] border-brand-accent ps-5">{section.closing_paragraphs.map((paragraph, index) => <MajorDecisionCopy key={`${section.id}-closing-${index}`}>{paragraph}</MajorDecisionCopy>)}</div> : null}
        <MajorDecisionActions section={section} rtl={rtl} />
      </div>
    </div>
  </section>;
}
