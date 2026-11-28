"use client";

import { LocalizedLink as Link, useLanguage } from "@/components/providers/LanguageProvider";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import type {
  DynamicFieldDefinition,
  PublicDynamicForm,
} from "@/lib/dynamic-forms";
import { SubmissionError, validateSubmission } from "@/lib/submission-validation";
import { siteToast } from "@/components/ui/siteToast";

type Values = Record<string, string | boolean>;

export function DynamicLeadForm({ form, embedded = false }: { form: PublicDynamicForm; embedded?: boolean }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [receipt, setReceipt] = useState<{
    message: string;
    reference: string;
  } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const current = form.steps[step];
  const { locale: pageLocale } = useLanguage();
  const locale = form.locale ?? pageLocale;
  const isRTL = locale === "fa";
  const NextArrow = isRTL ? ArrowLeft : ArrowRight;
  const PreviousArrow = isRTL ? ArrowRight : ArrowLeft;
  const stepText = isRTL ? `مرحله ${(step + 1).toLocaleString(locale)} از ${form.steps.length.toLocaleString(locale)}` : `Step ${step + 1} of ${form.steps.length}`;
  const failureMessage = isRTL ? "ثبت درخواست انجام نشد." : "We could not submit your request.";
  const submittedMessage = isRTL ? "درخواست شما ثبت شد" : "Your request has been submitted";

  function validateCurrent() {
    try {
      const answers = Object.fromEntries(current.fields.map(field => [field.id, values[field.id]]));
      validateSubmission({ steps: [current] }, { answers }, locale);
      setErrors({});
      return true;
    } catch (error) {
      if (!(error instanceof SubmissionError)) throw error;
      setErrors(error.issues);
      const firstInvalid = current.fields.find(field => error.issues[field.id]);
      if (firstInvalid) requestAnimationFrame(() => document.getElementById(`answer-${firstInvalid.id}`)?.focus());
      return false;
    }
  }
  function changeStep(next: number) {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => {
      const heading = headingRef.current;
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  }
  async function submit() {
    if (!validateCurrent()) return;
    setBusy(true);
    setFailure("");
    try {
      const response = await fetch(`/api/forms/${form.slug}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": locale },
        body: JSON.stringify({
          formId: form.id,
          formRevision: form.revision,
          answers: values,
          faxNumber: honeypotRef.current?.value ?? "",
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        reference?: string;
        errors?: Record<string, string>;
      } | null;
      if (!response.ok || !payload?.reference) {
        if (payload?.errors) {
          const firstStep = form.steps.findIndex(item => item.fields.some(field => payload.errors?.[field.id]));
          if (firstStep >= 0) changeStep(firstStep);
          setErrors(payload.errors);
        }
        const message = (!response.ok && payload?.message) || failureMessage;
        setFailure(message);
        siteToast.error(message);
        return;
      }
      setReceipt({
        message: payload.message || form.successMessage,
        reference: payload.reference,
      });
      setValues({});
      setStep(0);
      siteToast.success(submittedMessage);
    } catch {
      const message = isRTL ? "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید." : "We couldn’t reach the server. Please try again.";
      setFailure(message);
      siteToast.error(message);
    } finally {
      setBusy(false);
    }
  }

  if (receipt)
    return (
      <div className="border border-emerald-300 bg-white p-7 sm:p-10">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />

        <h2 className="mt-2 text-2xl font-black">{submittedMessage}</h2>
        <p className="mt-4 max-w-xl text-sm leading-8 text-ink-muted">
          {receipt.message}
        </p>
        <div className="mt-8 border-y border-dashed border-line py-5">
          <p className="text-xs text-ink-muted">{isRTL ? "کد پیگیری" : "Reference number"}</p>
          <bdi dir="ltr" className="mt-2 inline-block font-bold text-ink">{receipt.reference}</bdi>
        </div>
        <button type="button" onClick={() => setReceipt(null)} className="mt-6 min-h-11 bg-brand-secondary px-5 py-2 text-sm font-bold text-white">
          {isRTL ? "ثبت درخواست دیگر" : "Submit another request"}
        </button>
      </div>
    );

  return (
    <div className="min-w-0 border border-line bg-white shadow-sm">
      {!embedded && <div className="flex flex-wrap items-center justify-between gap-x-3 bg-brand-secondary px-5 py-3 text-white sm:px-8">
        <span dir="auto" className="text-sm font-semibold">{form.serviceName}</span>
        <Link href={form.serviceRoute} className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">
          {isRTL ? "معرفی خدمت" : "View service"}<NextArrow aria-hidden="true" size={15} />
        </Link>
      </div>}
      <div className="px-5 pt-6 sm:px-8">
        <p className="mb-3 text-sm font-bold text-brand-accent">{stepText}</p>
        <div aria-hidden="true" className="flex gap-1.5">{form.steps.map((item, index) => (
          <span key={item.id} className={`h-1 flex-1 ${index <= step ? "bg-brand-accent" : "bg-line"}`} />
        ))}</div>
      </div>
      <form noValidate className="p-5 sm:p-8" onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        if (step === form.steps.length - 1) void submit();
        else if (validateCurrent()) changeStep(step + 1);
      }}>
        <div className="border-b border-line pb-5">

          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 scroll-mt-32 text-xl font-black outline-none sm:text-2xl"
          >
            {current.title}
          </h2>
          {current.description && (
            <p className="mt-2 text-sm leading-7 text-ink-muted">
              {current.description}
            </p>
          )}
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {current.fields.map((field) => (
            <div key={field.id} className={`min-w-0 ${["textarea", "radio", "checkbox"].includes(field.type) ? "sm:col-span-2" : ""}`}>
              <PublicField
                field={field}
                selectPlaceholder={isRTL ? "انتخاب کنید" : "Select an option"}
                value={values[field.id]}
                error={errors[field.id]}
                onChange={(value) => {
                  setValues((all) => ({ ...all, [field.id]: value }));
                  setErrors((all) => ({ ...all, [field.id]: "" }));
                }}
              />
            </div>
          ))}
        </div>
        <input
          ref={honeypotRef}
          type="text"
          name="fax_number"
          tabIndex={-1}
          autoComplete="new-password"
          readOnly
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          className="fixed -left-[9999px] top-0 h-px w-px opacity-0"
          aria-hidden="true"
        />
        {failure && (
          <p
            role="alert"
            className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-xs leading-6 text-red-800"
          >
            {failure}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            disabled={step === 0 || busy}
            onClick={() => changeStep(step - 1)}
            className="inline-flex min-h-11 items-center gap-2 px-2 py-3 text-xs font-black text-ink disabled:opacity-30"
          >
            <PreviousArrow aria-hidden="true" size={16} />
            {isRTL ? "مرحله قبل" : "Previous"}
          </button>
          <button
            disabled={busy}
            className="inline-flex min-w-36 items-center justify-center gap-2 bg-brand-accent px-5 py-3.5 text-xs font-black text-white transition hover:bg-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-accent/25 disabled:opacity-50"
          >
            {busy
              ? (isRTL ? "در حال ثبت…" : "Submitting…")
              : step === form.steps.length - 1
                ? form.submitLabel
                : (isRTL ? "مرحله بعد" : "Next")}
            <NextArrow aria-hidden="true" size={16} />
          </button>
        </div>
        <p className="mt-6 flex items-start gap-2 text-[11px] leading-6 text-ink-muted">
          <LockKeyhole className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-primary" />
          {isRTL ? "اطلاعات این فرم محرمانه است و تنها برای بررسی درخواست مشاوره شما استفاده می‌شود." : "Your information is confidential and is used to review your advisory request."}
        </p>
      </form>
    </div>
  );
}

function PublicField({
  field,
  selectPlaceholder,
  value,
  error,
  onChange,
}: {
  field: DynamicFieldDefinition;
  selectPlaceholder: string;
  value: string | boolean | undefined;
  error?: string;
  onChange: (value: string | boolean) => void;
}) {
  const id = `answer-${field.id}`;
  const common = `mt-2 min-h-12 scroll-mt-32 w-full border bg-white px-4 py-3.5 text-base sm:text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 ${error ? "border-red-500" : "border-line"}`;
  const help = error || field.helpText;
  if (field.type === "radio")
    return (
      <fieldset aria-describedby={help ? `${id}-help` : undefined}>
        <legend className="text-sm font-bold">
          {field.label}
          {field.required && <span className="ms-1 text-brand-accent">*</span>}
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {field.options?.map((option, optionIndex) => (
            <label
              key={`${field.id}-option-${optionIndex}`}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${value === option ? "border-brand-accent bg-brand-accent/5" : "border-line"}`}
            >
              <input
                type="radio"
                id={optionIndex === 0 ? id : undefined}
                name={id}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                className="accent-brand-accent"
              />
              {option}
            </label>
          ))}
        </div>
        {help && (
          <p
            id={`${id}-help`}
            role={error ? "alert" : undefined}
            className={`mt-2 text-xs ${error ? "text-red-700" : "text-ink-muted"}`}
          >
            {help}
          </p>
        )}
      </fieldset>
    );
  if (field.type === "checkbox")
    return (
      <fieldset>
        <legend className="sr-only">{field.label}</legend>
        <label
          className={`flex cursor-pointer items-start gap-3 border px-4 py-4 text-sm leading-7 ${error ? "border-red-500" : value ? "border-brand-accent bg-brand-accent/5" : "border-line"}`}
        >
          <input
            type="checkbox"
            id={id}
            aria-invalid={Boolean(error)}
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1.5 accent-brand-accent"
          />
          <span>
            {field.label}
            {field.required && (
              <span className="ms-1 text-brand-accent">*</span>
            )}
            {field.helpText && (
              <span className="block text-xs text-ink-muted">
                {field.helpText}
              </span>
            )}
          </span>
        </label>
        {error && (
          <p role="alert" className="mt-2 text-xs text-red-700">
            {error}
          </p>
        )}
      </fieldset>
    );
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {field.label}
        {field.required && <span className="ms-1 text-brand-accent">*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={help ? `${id}-help` : undefined}
          className={`${common} min-h-32 resize-y`}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={help ? `${id}-help` : undefined}
          className={common}
        >
          <option value="">{field.placeholder || selectPlaceholder}</option>
          {field.options?.map((option, optionIndex) => (
            <option key={`${field.id}-option-${optionIndex}`}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={
            field.type === "email"
              ? "email"
              : field.type === "number"
                ? "text"
                : field.type === "phone"
                  ? "tel"
                  : "text"
          }
          inputMode={
            field.type === "phone"
              ? "tel"
              : field.type === "number"
                ? "decimal"
                : undefined
          }
          dir={
            field.type === "phone" ||
            field.type === "email" ||
            field.type === "number"
              ? "ltr"
              : undefined
          }
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={help ? `${id}-help` : undefined}
          className={common}
        />
      )}{" "}
      {help && (
        <p
          id={`${id}-help`}
          role={error ? "alert" : undefined}
          className={`mt-2 text-xs ${error ? "font-bold text-red-700" : "text-ink-muted"}`}
        >
          {help}
        </p>
      )}
    </div>
  );
}
