"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

type ApiResult = { message?: string; reference?: string; errors?: Record<string, string> };

export function LeadForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setResult(null);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const payload = (await response.json()) as ApiResult;
      setResult({ ...payload, ok: response.ok }); if (response.ok) form.reset();
    } catch { setResult({ ok: false, message: "ارتباط با سامانه برقرار نشد. لطفاً دوباره تلاش کنید." }); }
    finally { setPending(false); }
  }
  return (
    <form onSubmit={submit} noValidate className="space-y-4" aria-label="فرم درخواست بررسی اولیه">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="نام" name="name" autoComplete="name" required placeholder="نام شما" error={result?.errors?.name} />
        <FormField label="شماره موبایل" name="phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" required placeholder="09xxxxxxxxx" error={result?.errors?.phone} />
      </div>
      <FormField label="موضوع تصمیم" name="text" multiline required minLength={5} maxLength={1200} placeholder="در یک یا دو جمله بگویید درباره چه تصمیمی نیاز به گفت‌وگو دارید…" error={result?.errors?.text} />
      {result?.message && <FormStatus kind={result.ok ? "success" : "error"} message={result.message} reference={result.reference} />}
      <button disabled={pending} className="flex min-h-12 w-full items-center justify-center gap-2 bg-brand-accent px-6 text-sm font-black text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:cursor-wait disabled:opacity-60">
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowLeft className="h-4 w-4" />} {pending ? "در حال ارسال…" : "درخواست تماس اولیه"}
      </button>
    </form>
  );
}
