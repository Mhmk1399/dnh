"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";

import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import { siteToast } from "@/components/ui/siteToast";
import type { ExecutiveBriefingSection } from "./executiveBriefingsTypes";

type ApiResult = {
  message?: string;
  reference?: string;
  errors?: Record<string, string>;
};

const fieldClass =
  "mt-2 min-h-12 w-full border border-line bg-page px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-muted/55 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15";

export function ExecutiveBriefingsFinalCtaSection({
  section,
  rtl,
}: {
  section: ExecutiveBriefingSection;
  rtl: boolean;
}) {
  const copy = section.form;
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(null);
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  if (!copy) return null;
  const errorMessage = copy.error_message;
  const successMessage = copy.success_message;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(null);
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/executive-briefing-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": rtl ? "fa" : "en",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const payload = (await response.json()) as ApiResult;
      const message = payload.message || (response.ok ? successMessage : errorMessage);
      setResult({ ...payload, message, ok: response.ok });
      if (response.ok) {
        siteToast.success(message);
        form.reset();
      } else {
        siteToast.error(message);
      }
    } catch {
      siteToast.error(errorMessage);
      setResult({ ok: false, message: errorMessage });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24 border-b border-white/10 bg-brand-secondary py-14 text-white sm:py-18 lg:py-24">
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-bold leading-7 text-white/85 sm:text-[13px]"><span aria-hidden="true" className="h-[2px] w-9 bg-brand-primary" />{section.eyebrow}</p>
            <h2 id={`${section.id}-title`} className="mt-4 max-w-[31ch] text-pretty text-[clamp(1.85rem,6.5vw,3.2rem)] font-black leading-[1.5] tracking-[-0.035em] text-white sm:leading-[1.4]">{section.heading}</h2>
          </div>
          <div className="max-w-[76ch] space-y-2 border-s-2 border-brand-primary/70 ps-5 text-white/75">
            {section.paragraphs?.map((paragraph, index) => <p key={`${section.id}-p-${index}`} className="text-start text-[14px] leading-[2] sm:text-[16px]">{paragraph}</p>)}
          </div>
        </header>

        <div className="mt-10 grid gap-px bg-white/15 lg:grid-cols-[minmax(17rem,.34fr)_minmax(0,.66fr)]">
          <aside className="bg-white/[.045] p-5 sm:p-7 lg:p-8">
            <ShieldCheck aria-hidden="true" className="size-9 text-brand-primary" strokeWidth={1.5} />
            <h3 className="mt-6 text-[22px] font-black leading-[1.65] text-white">{copy.title}</h3>
            <p className="mt-4 text-start text-[14px] leading-[2] text-white/70">{copy.intro}</p>
            <p className="mt-6 border-s-2 border-brand-primary ps-4 text-start text-[13px] leading-[1.9] text-white/70">{copy.sensitive_note}</p>
            <Link href={copy.privacy_href} className="mt-6 inline-flex min-h-11 items-center border-b border-brand-primary text-[13px] font-bold text-brand-primary transition-colors hover:text-white">{copy.privacy_label}</Link>
          </aside>

          <form onSubmit={submit} noValidate className="bg-page p-5 text-ink sm:p-7 lg:p-9">
            <input name="faxNumber" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="min-w-0">
                <span className="flex items-center justify-between gap-3 text-[13px] font-black text-ink">{copy.fields.contact}<small className="text-[10px] font-bold text-ink-muted">{copy.required_label}</small></span>
                <input name="contact" required dir="ltr" autoComplete="email" placeholder={copy.placeholders.contact} className={`${fieldClass} text-left`} aria-invalid={Boolean(result?.errors?.contact) || undefined} />
                {result?.errors?.contact ? <span className="mt-1 block text-[11px] text-red-700">{result.errors.contact}</span> : null}
              </label>
              <label className="min-w-0">
                <span className="flex items-center justify-between gap-3 text-[13px] font-black text-ink">{copy.fields.role}<small className="text-[10px] font-bold text-ink-muted">{copy.required_label}</small></span>
                <input name="role" required maxLength={120} placeholder={copy.placeholders.role} className={fieldClass} aria-invalid={Boolean(result?.errors?.role) || undefined} />
                {result?.errors?.role ? <span className="mt-1 block text-[11px] text-red-700">{result.errors.role}</span> : null}
              </label>
              <label className="min-w-0 sm:col-span-2">
                <span className="flex items-center justify-between gap-3 text-[13px] font-black text-ink">{copy.fields.urgency}<small className="text-[10px] font-bold text-ink-muted">{copy.required_label}</small></span>
                <select name="urgency" required defaultValue="" className={fieldClass} aria-invalid={Boolean(result?.errors?.urgency) || undefined}>
                  <option value="" disabled>{copy.fields.urgency}</option>
                  {copy.urgency_options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                {result?.errors?.urgency ? <span className="mt-1 block text-[11px] text-red-700">{result.errors.urgency}</span> : null}
              </label>
              <label className="min-w-0 sm:col-span-2">
                <span className="flex items-center justify-between gap-3 text-[13px] font-black text-ink">{copy.fields.description}<small className="text-[10px] font-bold text-ink-muted">{copy.required_label}</small></span>
                <textarea name="description" required minLength={10} maxLength={1600} rows={6} placeholder={copy.placeholders.description} className={`${fieldClass} resize-y py-3`} aria-invalid={Boolean(result?.errors?.description) || undefined} />
                {result?.errors?.description ? <span className="mt-1 block text-[11px] text-red-700">{result.errors.description}</span> : null}
              </label>
            </div>

            {result?.message ? (
              <div role="status" className={`mt-5 border-s-[3px] p-4 text-[13px] font-bold leading-[1.9] ${result.ok ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-red-600 bg-red-50 text-red-900"}`}>
                {result.message}{result.reference ? <bdi className="ms-2" dir="ltr">{result.reference}</bdi> : null}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[58ch] text-start text-[12px] leading-[1.9] text-ink-muted">{section.note}</p>
              <ActionButton type="submit" disabled={pending} loading={pending} variant="primary" shape="square" size="lg" icon={pending ? LoaderCircle : Arrow} className="shrink-0 shadow-none hover:shadow-none">
                {pending ? copy.pending_label : copy.submit_label}
              </ActionButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
