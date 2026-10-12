import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Clock3, FileLock2, Layers3 } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "داشبورد خصوصی | DNH" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser(); if (!user) redirect("/login");
  return (
    <div className="min-h-screen bg-surface-soft pt-24 sm:pt-28">
      <section className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div><div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-brand-accent" /><span dir="ltr" className="text-[10px] font-black tracking-[0.2em] text-brand-primary">PRIVATE CLIENT DOSSIER</span></div><h1 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">خوش آمدید، {user.firstName}.</h1><p className="mt-3 text-sm leading-7 text-ink-muted">فضای خصوصی شما با موفقیت فعال شده است.</p></div>
          <div className="flex flex-wrap items-center gap-3">{user.role === "admin" && <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 bg-brand-primary px-5 text-xs font-bold text-white hover:bg-brand-secondary">داشبورد مدیریت <ArrowLeft className="h-4 w-4" /></Link>}<LogoutButton /></div>
        </header>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-white p-5"><p className="text-[10px] font-bold text-ink-muted">نام پرونده</p><p className="mt-2 text-sm font-black text-ink">{user.firstName} {user.lastName}</p></div>
          <div className="bg-white p-5"><p className="text-[10px] font-bold text-ink-muted">شماره ثبت‌شده</p><p dir="ltr" className="mt-2 text-right text-sm font-black text-ink">{user.phone}</p></div>
          <div className="bg-white p-5"><p className="text-[10px] font-bold text-ink-muted">وضعیت دسترسی</p><p className="mt-2 text-sm font-black text-emerald-700">فعال</p></div>
        </div>
        <section className="relative mt-8 overflow-hidden border border-line bg-white p-7 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1 bg-brand-accent" />
          <div className="mx-auto max-w-2xl text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center border border-brand-primary/20 bg-surface-soft"><Layers3 className="h-7 w-7 text-brand-primary" /></div><p dir="ltr" className="mt-7 text-[11px] font-black tracking-[0.2em] text-ink-muted">SERVICES / PREPARING</p><h2 className="mt-3 text-2xl font-black text-ink">فضای خدمات اختصاصی در حال آماده‌سازی است</h2><p className="mt-4 text-sm leading-8 text-ink-muted">به‌زودی ابزارها، گزارش‌ها و مسیرهای اختصاصی شما در این بخش قرار می‌گیرد. در حال حاضر نیازی به اقدام دیگری نیست.</p><div className="mt-8 flex flex-col justify-center gap-3 text-xs text-ink-muted sm:flex-row sm:gap-8"><span className="inline-flex items-center justify-center gap-2"><FileLock2 className="h-4 w-4 text-brand-primary" /> دسترسی خصوصی</span><span className="inline-flex items-center justify-center gap-2"><Clock3 className="h-4 w-4 text-brand-primary" /> اطلاع‌رسانی پس از فعال‌سازی</span></div></div>
        </section>
      </section>
    </div>
  );
}
