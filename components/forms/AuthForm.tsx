"use client";

import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { siteToast } from "@/components/ui/siteToast";

import authCopy from "@/config/auth.json";
import type { SiteLocale } from "@/lib/site-language";

type ApiResult = {
  message?: string;
  errors?: Record<string, string>;
  role?: string;
};

export function AuthForm({ mode, locale }: { mode: "login" | "register"; locale: SiteLocale }) {
  const copy = authCopy[locale];
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(
    null,
  );
  const registering = mode === "register";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setResult(null);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": locale },
        body: JSON.stringify(
          Object.fromEntries(new FormData(form)),
        ),
      });
      const payload = (await response.json()) as ApiResult;
      if (response.ok) {
        siteToast.success(payload.message || (registering ? copy.created : copy.loginSuccess));
        router.push("/dashboard");
        router.refresh();
        return;
      }
      siteToast.error(payload.message || copy.correct);
      setResult({ ...payload, ok: false });
      if (payload.errors) requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
    } catch {
      siteToast.error(copy.network);
      setResult({
        ok: false,
        message: copy.network,
      });
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      method="post"
      action={`/api/auth/${mode}`}
      onSubmit={submit}
      noValidate
      className="space-y-4"
      aria-label={copy[mode]}
    >
      {registering && (
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={copy.firstName}
            name="firstName"
            autoComplete="given-name"
            required
            error={result?.errors?.firstName}
          />
          <FormField
            label={copy.lastName}
            name="lastName"
            autoComplete="family-name"
            required
            error={result?.errors?.lastName}
          />
        </div>
      )}
      <FormField
        label={copy.phone}
        name="phone"
        type="tel"
        dir="ltr"
        inputMode="tel"
        autoComplete="tel"
        required
        placeholder={copy.phoneExample}
        error={result?.errors?.phone}
      />
      <FormField
        label={copy.password}
        name="password"
        type="password"
        dir="ltr"
        autoComplete={registering ? "new-password" : "current-password"}
        required
        minLength={8}
        hint={registering ? copy.passwordHint : undefined}
        error={result?.errors?.password}
      />
      {registering && (
        <FormField
          label={copy.confirmPassword}
          name="confirmPassword"
          type="password"
          dir="ltr"
          autoComplete="new-password"
          required
          minLength={8}
          error={result?.errors?.confirmPassword}
        />
      )}
      {result?.message && <FormStatus kind="error" message={result.message} />}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center gap-2 bg-brand-secondary px-6 text-sm font-bold text-white transition hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Arrow aria-hidden="true" className="h-4 w-4" />
        )}{" "}
        {pending
          ? copy.busy
          : registering
            ? copy.create
            : copy.login}
      </button>
      <div className="border-t border-line pt-2 text-sm">
        <Link
          href={registering ? "/login" : "/register"}
          className="inline-flex min-h-11 items-center font-bold text-brand-accent underline underline-offset-4 focus-visible:outline-focus"
        >
          {registering ? copy.existing : copy.newAccount}
        </Link>
      </div>
    </form>
  );
}
