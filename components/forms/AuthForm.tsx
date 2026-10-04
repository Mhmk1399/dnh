"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle, LockKeyhole } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

type ApiResult = { message?: string; errors?: Record<string, string>; role?: string };

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter(); const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(null);
  const registering = mode === "register";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setResult(null);
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      const payload = (await response.json()) as ApiResult;
      if (response.ok) { router.push("/dashboard"); router.refresh(); return; }
      setResult({ ...payload, ok: false });
    } catch { setResult({ ok: false, message: "ارتباط با سامانه ورود برقرار نشد. لطفاً دوباره تلاش کنید." }); }
    finally { setPending(false); }
  }
  return (
    <form onSubmit={submit} noValidate className="space-y-4" aria-label={registering ? "فرم ثبت‌نام" : "فرم ورود"}>
      {registering && <div className="grid gap-4 sm:grid-cols-2"><FormField label="نام" name="firstName" autoComplete="given-name" required error={result?.errors?.firstName} /><FormField label="نام خانوادگی" name="lastName" autoComplete="family-name" required error={result?.errors?.lastName} /></div>}
      <FormField label="شماره موبایل" name="phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" required placeholder="09xxxxxxxxx" error={result?.errors?.phone} />
      <FormField label="رمز عبور" name="password" type="password" dir="ltr" autoComplete={registering ? "new-password" : "current-password"} required minLength={8} hint={registering ? "حداقل ۸ نویسه، حرف و عدد" : undefined} error={result?.errors?.password} />
      {registering && <FormField label="تکرار رمز عبور" name="confirmPassword" type="password" dir="ltr" autoComplete="new-password" required minLength={8} error={result?.errors?.confirmPassword} />}
      {result?.message && <FormStatus kind="error" message={result.message} />}
      <button disabled={pending} className="flex min-h-12 w-full items-center justify-center gap-2 bg-brand-primary px-6 text-sm font-bold text-white transition hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30 disabled:cursor-wait disabled:opacity-60">
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowLeft className="h-4 w-4" />} {pending ? "در حال بررسی…" : registering ? "ساخت حساب و ورود" : "ورود به حساب"}
      </button>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-4 text-xs text-ink-muted"><span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3.5 w-3.5" /> ارتباط امن و رمزگذاری‌شده</span><Link href={registering ? "/login" : "/register"} className="font-bold text-brand-primary underline-offset-4 hover:underline">{registering ? "قبلاً ثبت‌نام کرده‌اید؟" : "ایجاد حساب جدید"}</Link></div>
    </form>
  );
}
