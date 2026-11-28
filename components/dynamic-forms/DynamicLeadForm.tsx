"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import type { DynamicFieldDefinition, PublicDynamicForm } from "@/lib/dynamic-forms";
import { isValidEmail, isValidPhone, normalizeIranianPhone } from "@/lib/validation";

type Values = Record<string, string | boolean>;

export function DynamicLeadForm({ form, embedded = false }: { form: PublicDynamicForm; embedded?: boolean }) {
  const en = form.locale === "en";
  const t = (fa: string, english: string) => en ? english : fa;
  const languageTag = en ? "en-US" : "fa-IR";
  const NextArrow = en ? ArrowRight : ArrowLeft;
  const BackArrow = en ? ArrowLeft : ArrowRight;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [receipt, setReceipt] = useState<{ message: string; reference: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const current = form.steps[step];
  const position = (step + 1).toLocaleString(languageTag);
  const total = form.steps.length.toLocaleString(languageTag);
  const progress = t(`مرحله ${position} از ${total}`, `Step ${position} of ${total}`);
  const failed = t("ثبت درخواست انجام نشد.", "Could not submit your request. Please try again.");

  function validateCurrent() {
    const issues: Record<string, string> = {};
    for (const field of current.fields) {
      const value = values[field.id];
      const text = typeof value === "string" ? value.trim() : "";
      if (field.required && (field.type === "checkbox" ? value !== true : !text)) issues[field.id] = t("تکمیل این فیلد الزامی است.", "This field is required.");
      if (text && field.minLength && text.length < field.minLength) issues[field.id] = t(`حداقل ${field.minLength} نویسه وارد کنید.`, `Enter at least ${field.minLength} characters.`);
      if (text && field.maxLength && text.length > field.maxLength) issues[field.id] = t(`حداکثر ${field.maxLength} نویسه مجاز است.`, `Enter no more than ${field.maxLength} characters.`);
      if (field.type === "phone" && text && !isValidPhone(normalizeIranianPhone(text))) issues[field.id] = t("شماره موبایل معتبر وارد کنید.", "Enter a valid mobile number.");
      if (field.type === "email" && text && !isValidEmail(text)) issues[field.id] = t("ایمیل معتبر وارد کنید.", "Enter a valid email address.");
      if (field.type === "number" && text && !Number.isFinite(Number(text))) issues[field.id] = t("یک عدد معتبر وارد کنید.", "Enter a valid number.");
    }
    setErrors(issues);
    return Object.keys(issues).length === 0;
  }
  function changeStep(next: number) {
    setStep(next); setErrors({});
    requestAnimationFrame(() => {
      const heading = headingRef.current;
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  async function submit() {
    if (!validateCurrent()) return;
    setBusy(true); setFailure("");
    try {
      const response = await fetch(`/api/forms/${form.slug}/submissions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers: values, faxNumber: honeypotRef.current?.value ?? "" }) });
      const payload = await response.json() as { message?: string; reference?: string; errors?: Record<string, string> };
      if (!response.ok) { if (payload.errors) setErrors(en ? Object.fromEntries(Object.keys(payload.errors).map(id => [id, "Check the value entered for this field."])) : payload.errors); throw new Error(en ? (response.status === 422 ? "Please review your answers." : failed) : payload.message || failed); }
      setReceipt({ message: payload.message || form.successMessage, reference: payload.reference || "—" }); setValues({}); setStep(0);
    } catch (error) { setFailure(error instanceof Error ? error.message : failed); }
    finally { setBusy(false); }
  }

  if (receipt) return <div dir={en ? "ltr" : "rtl"} className="border border-emerald-300 bg-white p-7 sm:p-10"><CheckCircle2 className="h-10 w-10 text-emerald-600"/><p dir="ltr" className="mt-6 text-[10px] font-black tracking-[.2em] text-emerald-700">SUBMISSION / RECEIVED</p><h2 className="mt-2 text-2xl font-black">{t("درخواست شما ثبت شد", "Request received")}</h2><p className="mt-4 max-w-xl text-sm leading-8 text-ink-muted">{receipt.message}</p><div className="mt-8 border-y border-dashed border-line py-5"><p className="text-xs text-ink-muted">{t("کد پیگیری محرمانه", "Confidential reference number")}</p><p dir="ltr" className="mt-2 text-left font-black tracking-[.12em] text-brand-primary">{receipt.reference}</p></div><button onClick={() => setReceipt(null)} className="mt-7 bg-brand-primary px-5 py-3 text-xs font-black text-white">{t("ثبت درخواست دیگر", "Submit another request")}</button></div>;

  return <div dir={en ? "ltr" : "rtl"} className="border border-line bg-white shadow-[0_24px_70px_rgba(22,115,148,.10)]">
    {!embedded && <div className="bg-[#0d607b] px-5 py-5 text-white sm:px-8"><div className="flex items-center justify-between gap-4"><div><p dir="ltr" className="text-[11px] font-black tracking-[.2em] text-white/60">ADVISORY INTAKE / REV {form.revision.toString().padStart(2, "0")}</p><p className="mt-2 text-xs font-bold text-white/90">{en ? "Related service" : `خدمت مرتبط: ${form.serviceName}`}</p></div><Link href={`/${en ? "en" : "fa"}${form.serviceRoute}`} className="inline-flex items-center gap-1 text-[11px] font-bold text-white underline-offset-4 hover:underline">{t("معرفی خدمت", "View service")}<NextArrow size={13}/></Link></div></div>}
    <div className="px-5 pt-6 sm:px-8"><div className="flex gap-1.5" aria-label={progress}>{form.steps.map((item, index) => <div key={item.id} className={`h-1.5 flex-1 transition-colors ${index <= step ? "bg-brand-accent" : "bg-line"}`}/>)}</div><div className="mt-3 flex justify-between text-[10px] font-bold text-ink-muted"><span>{progress}</span><span>{Math.round(((step + 1) / form.steps.length) * 100).toLocaleString(languageTag)}{en ? "%" : "٪"}</span></div></div>
    <form className="p-5 sm:p-8" onSubmit={(event) => { event.preventDefault(); if (step < form.steps.length - 1) { if (validateCurrent()) changeStep(step + 1); } else void submit(); }} noValidate>
      <div className="border-b border-line pb-6"><p dir="ltr" className="text-[11px] font-black tracking-[.2em] text-brand-primary">STEP / {String(step + 1).padStart(2, "0")}</p><h2 ref={headingRef} tabIndex={-1} className="mt-2 scroll-mt-32 text-xl font-black outline-none sm:text-2xl">{current.title}</h2>{current.description && <p className="mt-2 text-sm leading-7 text-ink-muted">{current.description}</p>}</div>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">{current.fields.map((field) => <div key={field.id} className={`min-w-0 ${["textarea", "radio", "checkbox"].includes(field.type) ? "sm:col-span-2" : ""}`}><PublicField en={en} field={field} value={values[field.id]} error={errors[field.id]} onChange={(value) => { setValues((all) => ({ ...all, [field.id]: value })); setErrors((all) => ({ ...all, [field.id]: "" })); }}/></div>)}</div>
      <input ref={honeypotRef} type="text" name="fax_number" tabIndex={-1} autoComplete="new-password" readOnly data-lpignore="true" data-1p-ignore="true" data-bwignore="true" className="fixed -left-[9999px] top-0 h-px w-px opacity-0" aria-hidden="true" />
      {failure && <p role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-xs leading-6 text-red-800">{failure}</p>}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6"><button type="button" disabled={step === 0 || busy} onClick={() => changeStep(step - 1)} className="inline-flex items-center gap-2 px-2 py-3 text-xs font-black text-ink disabled:opacity-30"><BackArrow size={16}/>{t("مرحله قبل", "Back")}</button><button disabled={busy} className="inline-flex min-w-36 items-center justify-center gap-2 bg-brand-accent px-5 py-3.5 text-xs font-black text-white transition hover:bg-[#df7300] focus:outline-none focus:ring-4 focus:ring-brand-accent/25 disabled:opacity-50">{busy ? t("در حال ثبت…", "Submitting…") : step === form.steps.length - 1 ? form.submitLabel : t("مرحله بعد", "Next")}<NextArrow size={16}/></button></div>
      <p className="mt-6 flex items-start gap-2 text-[11px] leading-6 text-ink-muted"><LockKeyhole className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-primary"/>{t("اطلاعات این فرم محرمانه است و تنها برای بررسی درخواست مشاوره شما استفاده می‌شود.", "Your information is confidential and is used to review your advisory request.")}</p>
    </form>
  </div>;
}

function PublicField({ en, field, value, error, onChange }: { en: boolean; field: DynamicFieldDefinition; value: string | boolean | undefined; error?: string; onChange: (value: string | boolean) => void }) {
  const id = useId();
  const common = `mt-2 w-full border bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 ${error ? "border-red-500" : "border-line"}`;
  const help = error || field.helpText;
  if (field.type === "radio") return <fieldset aria-describedby={help ? `${id}-help` : undefined}><legend className="text-sm font-bold">{field.label}{field.required && <span className="mr-1 text-brand-accent">*</span>}</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{field.options?.map((option, optionIndex) => <label key={`${field.id}-option-${optionIndex}`} className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${value === option ? "border-brand-accent bg-orange-50" : "border-line"}`}><input type="radio" name={id} value={option} checked={value === option} onChange={() => onChange(option)} className="accent-[#fc8502]"/>{option}</label>)}</div>{help && <p id={`${id}-help`} role={error ? "alert" : undefined} className={`mt-2 text-xs ${error ? "text-red-700" : "text-ink-muted"}`}>{help}</p>}</fieldset>;
  if (field.type === "checkbox") return <fieldset><legend className="sr-only">{field.label}</legend><label className={`flex cursor-pointer items-start gap-3 border px-4 py-4 text-sm leading-7 ${error ? "border-red-500" : value ? "border-brand-accent bg-orange-50" : "border-line"}`}><input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="mt-1.5 accent-[#fc8502]"/><span>{field.label}{field.required && <span className="mr-1 text-brand-accent">*</span>}{field.helpText && <span className="block text-xs text-ink-muted">{field.helpText}</span>}</span></label>{error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}</fieldset>;
  return <div><label htmlFor={id} className="text-sm font-bold">{field.label}{field.required && <span className="mr-1 text-brand-accent">*</span>}</label>{field.type === "textarea" ? <textarea id={id} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} minLength={field.minLength} maxLength={field.maxLength} aria-invalid={Boolean(error)} aria-describedby={help ? `${id}-help` : undefined} className={`${common} min-h-32 resize-y`}/> : field.type === "select" ? <select id={id} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={help ? `${id}-help` : undefined} className={common}><option value="">{field.placeholder || (en ? "Select an option" : "انتخاب کنید")}</option>{field.options?.map((option, optionIndex) => <option key={`${field.id}-option-${optionIndex}`}>{option}</option>)}</select> : <input id={id} type={field.type === "email" ? "email" : field.type === "number" ? "text" : field.type === "phone" ? "tel" : "text"} inputMode={field.type === "phone" ? "tel" : field.type === "number" ? "decimal" : undefined} dir={field.type === "phone" || field.type === "email" || field.type === "number" ? "ltr" : undefined} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} minLength={field.minLength} maxLength={field.maxLength} aria-invalid={Boolean(error)} aria-describedby={help ? `${id}-help` : undefined} className={common}/>} {help && <p id={`${id}-help`} role={error ? "alert" : undefined} className={`mt-2 text-xs ${error ? "font-bold text-red-700" : "text-ink-muted"}`}>{help}</p>}</div>;
}
