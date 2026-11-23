import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Clock3, FileLock2, Home, Layers3 } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "داشبورد خصوصی | DNH",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main
      lang="fa"
      dir="rtl"
      className="min-h-screen bg-surface-soft"
    >
      <section className="mx-auto max-w-[1180px] px-4 py-7 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-accent" />
              <span className="text-xs font-bold text-brand-accent">
                پرونده خصوصی شما
              </span>
            </div>
            <h1 className="text-2xl font-black leading-relaxed text-ink [overflow-wrap:anywhere] sm:text-4xl">
              خوش آمدید، {user.firstName}.
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink-muted">
              فضای خصوصی شما با موفقیت فعال شده است.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/fa"
              className="inline-flex min-h-11 items-center gap-2 border border-line bg-white px-5 text-xs font-bold text-ink hover:border-brand-accent focus-visible:outline-2 focus-visible:outline-brand-accent"
            >
              <Home className="h-4 w-4" aria-hidden="true" /> صفحه اصلی
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex min-h-11 items-center gap-2 bg-brand-accent px-5 text-xs font-bold text-white hover:bg-brand-secondary"
              >
                داشبورد مدیریت <ArrowLeft className="h-4 w-4" />
              </Link>
            )}
            <LogoutButton />
          </div>
        </header>
        <dl className="mt-6 grid gap-px border border-line bg-line sm:mt-10 sm:grid-cols-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 bg-white px-4 py-3 sm:block sm:p-5">
            <dt className="text-xs font-bold text-ink-muted">نام پرونده</dt>
            <dd className="text-sm font-bold text-ink [overflow-wrap:anywhere] sm:mt-2">
              {user.firstName} {user.lastName}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 bg-white px-4 py-3 sm:block sm:p-5">
            <dt className="text-xs font-bold text-ink-muted">
              شماره ثبت‌شده
            </dt>
            <dd
              dir="ltr"
              className="text-right text-sm font-bold text-ink sm:mt-2"
            >
              {user.phone}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 bg-white px-4 py-3 sm:block sm:p-5">
            <dt className="text-xs font-bold text-ink-muted">وضعیت دسترسی</dt>
            <dd className="text-sm font-bold text-emerald-700 sm:mt-2">فعال</dd>
          </div>
        </dl>
        <section className="relative mt-5 overflow-hidden border border-line bg-white p-5 sm:mt-8 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1 bg-brand-accent"
          />
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-brand-primary/20 bg-surface-soft">
              <Layers3 className="h-7 w-7 text-brand-primary" />
            </div>
            <h2 className="mt-4 text-xl font-black leading-relaxed text-ink sm:text-2xl">
              فضای خدمات اختصاصی در حال آماده‌سازی است
            </h2>
            <p className="mt-4 text-sm leading-8 text-ink-muted">
              به‌زودی ابزارها، گزارش‌ها و مسیرهای اختصاصی شما در این بخش قرار
              می‌گیرد. در حال حاضر نیازی به اقدام دیگری نیست.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 text-xs text-ink-muted sm:flex-row sm:gap-8">
              <span className="inline-flex items-center justify-center gap-2">
                <FileLock2 className="h-4 w-4 text-brand-primary" /> دسترسی
                خصوصی
              </span>
              <span className="inline-flex items-center justify-center gap-2">
                <Clock3 className="h-4 w-4 text-brand-primary" /> اطلاع‌رسانی پس
                از فعال‌سازی
              </span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
