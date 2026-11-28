import { AuthForm } from "@/components/forms/AuthForm";
import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import authCopy from "@/config/auth.json";
import type { SiteLocale } from "@/lib/site-language";

export function AuthPage({ mode, locale }: { mode: "login" | "register"; locale: SiteLocale }) {
  const copy = authCopy[locale];
  const BackIcon = locale === "fa" ? ArrowRight : ArrowLeft;
  return (
    <main className="flex min-h-svh flex-col bg-surface-soft px-4 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink hover:text-brand-accent focus-visible:outline-focus">
          <BackIcon aria-hidden="true" size={16} />
          {copy.home}
        </Link>
      </div>
      <div className="mx-auto my-auto grid w-full max-w-4xl bg-white shadow-sm lg:grid-cols-[1.2fr_.8fr]">
      <section className="min-w-0 border border-line border-t-2 border-t-brand-accent bg-white p-5 sm:p-9">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{copy[mode]}</h1>
        <p className="mb-6 mt-2 text-sm leading-7 text-ink-muted">{mode === "login" ? copy.loginIntro : copy.registerIntro}</p>
        <AuthForm mode={mode} locale={locale} />
      </section>
      <aside className="flex flex-col justify-center gap-3 bg-brand-secondary p-5 text-white sm:p-9">
        <h2 className="max-w-prose text-xl font-bold leading-relaxed sm:text-2xl">{mode === "login" ? copy.welcome : copy.welcomeNew}</h2>
        <p className="max-w-prose text-sm leading-7 text-white/85">{copy.access}</p>
        <p className="mt-2 border-t border-white/20 pt-3 text-xs leading-6 text-white/80">{copy.passwordPrivacy}</p>
      </aside>
      </div>
    </main>
  );
}
