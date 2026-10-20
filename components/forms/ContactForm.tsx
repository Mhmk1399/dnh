"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

export type ContactFormContent = {
  eyebrow: string;
  title: string;
  description: string;
  fieldsetContact: string;
  fieldsetMessage: string;
  fields: {
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string; optional: string };
    subject: { label: string; placeholder: string; optional: string };
    message: { label: string; placeholder: string };
  };
  submit: string;
  submitting: string;
  review: string;
  privacy: string;
  networkError: string;
  formLabel: string;
  referenceLabel: string;
};

type ApiResult = {
  message?: string;
  reference?: string;
  errors?: Record<string, string>;
};

export function ContactForm({
  content,
  isRTL,
}: {
  content: ContactFormContent;
  isRTL: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(
    null,
  );
  const honeypotRef = useRef<HTMLInputElement>(null);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": isRTL ? "fa" : "en",
        },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as ApiResult;
      setResult({ ...payload, ok: response.ok });
      if (response.ok) form.reset();
    } catch {
      setResult({ ok: false, message: content.networkError });
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-title"
      className="scroll-mt-24 bg-page py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell mx-auto grid w-full max-w-[1536px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-12 xl:px-16 2xl:px-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="flex items-center gap-3 text-[13px] font-black text-brand-primary">
            <span className="h-px w-9 bg-brand-accent" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2
            id="contact-form-title"
            className="mt-5 text-pretty text-[clamp(2rem,4vw,3.45rem)] font-black leading-[1.55] text-ink"
          >
            {content.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-[2] text-ink-muted">
            {content.description}
          </p>
          <div className="mt-8 flex gap-3 border-y border-line py-5 text-[13px] leading-7 text-ink-muted">
            <ShieldCheck
              className="mt-1 size-5 shrink-0 text-brand-primary"
              aria-hidden="true"
            />
            <p>{content.privacy}</p>
          </div>
        </div>
        <div className="relative border border-line bg-white shadow-[0_28px_80px_rgba(3,55,70,.07)]">
          <span
            className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#fc8502_0_18%,#167394_18%_100%)]"
            aria-hidden="true"
          />
          <form
            onSubmit={submit}
            noValidate
            aria-label={content.formLabel}
            className="px-5 py-7 sm:px-8 sm:py-9"
          >
            <input
              ref={honeypotRef}
              type="text"
              name="faxNumber"
              readOnly
              tabIndex={-1}
              autoComplete="new-password"
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              aria-hidden="true"
              className="fixed start-[-9999px] top-[-9999px] h-px w-px opacity-0"
            />
            <fieldset>
              <legend className="mb-5 flex items-center gap-3 text-[13px] font-black text-[#31545e]">
                <span className="size-1.5 bg-brand-accent" aria-hidden="true" />
                {content.fieldsetContact}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label={content.fields.name.label}
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={content.fields.name.placeholder}
                  error={result?.errors?.name}
                />
                <FormField
                  label={content.fields.phone.label}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  autoComplete="tel"
                  required
                  placeholder={content.fields.phone.placeholder}
                  error={result?.errors?.phone}
                />
                <FormField
                  label={content.fields.email.label}
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  hint={content.fields.email.optional}
                  placeholder={content.fields.email.placeholder}
                  error={result?.errors?.email}
                />
                <FormField
                  label={content.fields.subject.label}
                  name="subject"
                  autoComplete="off"
                  hint={content.fields.subject.optional}
                  placeholder={content.fields.subject.placeholder}
                  error={result?.errors?.subject}
                />
              </div>
            </fieldset>
            <fieldset className="mt-7 border-t border-line pt-6">
              <legend className="mb-5 bg-white pe-3 text-[13px] font-black text-[#31545e]">
                {content.fieldsetMessage}
              </legend>
              <FormField
                label={content.fields.message.label}
                name="message"
                multiline
                required
                minLength={10}
                maxLength={3000}
                placeholder={content.fields.message.placeholder}
                error={result?.errors?.message}
              />
            </fieldset>
            {result?.message ? (
              <div className="mt-6">
                <FormStatus
                  kind={result.ok ? "success" : "error"}
                  message={result.message}
                  reference={result.reference}
                  referenceLabel={content.referenceLabel}
                />
              </div>
            ) : null}
            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <ActionButton
                type="submit"
                variant="primary"
                size="md"
                shape="square"
                icon={Arrow}
                loading={pending}
                disabled={pending}
                className="w-full !bg-[#fc8502] !text-[#10242c] hover:!bg-[#d96f00] hover:!text-white focus-visible:!ring-[#fc8502]/35 sm:w-auto sm:min-w-[220px]"
              >
                {pending ? content.submitting : content.submit}
              </ActionButton>
              <p className="max-w-[300px] text-[12px] leading-6 text-ink-muted">
                {content.review}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
