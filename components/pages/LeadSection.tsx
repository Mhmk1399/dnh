import { LeadForm } from "@/components/forms/LeadForm";

export function LeadSection() {
  return (
    <section aria-labelledby="lead-title" className="mx-auto mt-24 max-w-[1400px] px-2 sm:px-3">
      <div className="grid overflow-hidden bg-brand-secondary text-white lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative p-7 sm:p-10 lg:p-14"><div aria-hidden="true" className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:64px_64px]" /><div className="relative"><div className="mb-5 flex items-center gap-3"><span className="h-px w-9 bg-brand-accent" /><span dir="ltr" className="text-[10px] font-bold tracking-[0.2em] text-white/65">DECISION INTAKE / QUICK NOTE</span></div><h2 id="lead-title" className="text-3xl font-black leading-[1.55] tracking-[-0.035em] sm:text-4xl">یک تصمیم مهم در ذهن دارید؟</h2><p className="mt-5 max-w-lg text-sm leading-8 text-white/70">موضوع را کوتاه بنویسید. تیم DNH زمینه تصمیم شما را بررسی می‌کند تا گفت‌وگوی اول، دقیق و بدون اتلاف وقت آغاز شود.</p><div className="mt-10 border-t border-white/15 pt-5"><p dir="ltr" className="text-[9px] font-bold tracking-[0.18em] text-white/45">RESPONSE PROTOCOL / DNH-24</p><p className="mt-2 text-xs text-white/70">بررسی اولیه و هماهنگی تماس در اولین فرصت کاری</p></div></div></div>
        <div className="bg-white p-6 text-ink sm:p-10 lg:p-14"><div className="mb-6 flex items-center justify-between border-b border-line pb-5"><div><p className="text-sm font-black text-brand-primary">یادداشت اولیه تصمیم</p><p className="mt-1 text-xs text-ink-muted">سه فیلد کوتاه؛ بدون تعهد</p></div><span dir="ltr" className="text-[9px] font-bold tracking-[0.18em] text-ink-muted">REF / OPEN</span></div><LeadForm /></div>
      </div>
    </section>
  );
}
