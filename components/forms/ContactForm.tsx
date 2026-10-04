"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

type ApiResult = { message?: string; reference?: string; errors?: Record<string, string> };

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setResult(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const payload = (await response.json()) as ApiResult;
      setResult({ ...payload, ok: response.ok });
      if (response.ok) form.reset();
    } catch {
      setResult({ ok: false, message: "ارتباط با سامانه برقرار نشد. لطفاً اتصال خود را بررسی کنید." });
    } finally { setPending(false); }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-label="فرم تماس با DNH">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="نام و نام خانوادگی" name="name" autoComplete="name" required placeholder="مثلاً آرمان احمدی" error={result?.errors?.name} />
        <FormField label="شماره موبایل" name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" required placeholder="09xxxxxxxxx" error={result?.errors?.phone} />
        <FormField label="ایمیل" name="email" type="email" dir="ltr" autoComplete="email" hint="اختیاری" placeholder="name@example.com" error={result?.errors?.email} />
        <FormField label="موضوع" name="subject" autoComplete="off" hint="اختیاری" placeholder="موضوع درخواست" error={result?.errors?.subject} />
      </div>
      <FormField label="شرح درخواست" name="message" multiline required minLength={10} maxLength={3000} placeholder="مسئله، زمینه تصمیم و آنچه از DNH انتظار دارید را بنویسید…" error={result?.errors?.message} />
      {result?.message && <FormStatus kind={result.ok ? "success" : "error"} message={result.message} reference={result.reference} />}
      <button disabled={pending} className="flex min-h-12 w-full items-center justify-center gap-2 bg-brand-primary px-6 text-sm font-bold text-white transition hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-52">
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowLeft className="h-4 w-4" />} {pending ? "در حال ثبت…" : "ثبت درخواست محرمانه"}
      </button>
    </form>
  );
}
