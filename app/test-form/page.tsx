import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { DynamicLeadForm } from "@/components/dynamic-forms/DynamicLeadForm";
import { getPublishedDynamicForm } from "@/lib/public-dynamic-form";

const TEST_FORM_SLUG = "test-strategic-advisory";
const CANONICAL_FORM_ROUTE = `/forms/${TEST_FORM_SLUG}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "آزمایش فرم پویا",
  description:
    "نمایش یک فرم پویای DNH در صفحه اختصاصی و مسیر استاندارد فرم.",
};

export default async function TestFormPage() {
  const form = await getPublishedDynamicForm(TEST_FORM_SLUG);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#edf7f8_0%,#ffffff_42%,#f5faf9_100%)] pt-28 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(22,115,148,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,115,148,.07)_1px,transparent_1px)] [background-size:68px_68px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full border-[64px] border-brand-primary/[.04]" />

      <section className="relative mx-auto max-w-[1240px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[.72fr_1fr] lg:gap-16">
          <header className="lg:sticky lg:top-36">
            <p dir="ltr" className="text-[10px] font-black tracking-[.24em] text-brand-primary">
              DNH / DYNAMIC FORM TEST
            </p>
            <div className="mt-5 h-px w-20 bg-brand-accent" />
            <h1 className="mt-6 text-3xl font-black leading-[1.5] tracking-[-.04em] text-ink sm:text-4xl lg:text-[2.7rem]">
              یک فرم، دو مسیر استفاده
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-ink-muted sm:text-base sm:leading-9">
              این صفحه نشان می‌دهد فرم ارزیابی از پایگاه داده دریافت می‌شود و بدون بازنویسی فیلدها، هم در یک صفحه اختصاصی و هم در مسیر استاندارد فرم قابل استفاده است.
            </p>

            {form ? (
              <>
                <div className="mt-8 border-y border-line bg-white/65 py-5">
                  <p className="text-[10px] font-black tracking-[.12em] text-ink-muted">خدمت مرتبط</p>
                  <Link href={form.serviceRoute} className="mt-2 inline-flex items-center gap-2 text-sm font-black text-brand-primary underline decoration-brand-accent/50 underline-offset-4 transition hover:decoration-brand-accent focus:outline-none focus:ring-4 focus:ring-brand-accent/20">
                    {form.serviceName}
                    <ArrowLeft size={15} aria-hidden="true" />
                  </Link>
                </div>

                <aside aria-label="مسیرهای استفاده از فرم" className="mt-7 border-r-2 border-brand-primary bg-white shadow-[0_16px_48px_rgba(22,115,148,.07)]">
                  <RouteReference
                    code="INLINE PAGE"
                    title="نمایش در همین صفحه"
                    route="/test-form"
                    active
                  />
                  <RouteReference
                    code="CANONICAL FORM"
                    title="صفحه استاندارد فرم"
                    route={CANONICAL_FORM_ROUTE}
                    href={CANONICAL_FORM_ROUTE}
                  />
                </aside>
              </>
            ) : null}
          </header>

          {form ? (
            <div>
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-3">
                <p className="text-xs font-black text-ink">نسخه زنده فرم</p>
                <span dir="ltr" className="text-[9px] font-black tracking-[.18em] text-brand-primary">
                  DATABASE / LIVE
                </span>
              </div>
              <DynamicLeadForm form={form} />
              <p className="mt-4 text-center text-[11px] leading-6 text-ink-muted">
                محتوای مراحل و فیلدها مستقیماً از فرم منتشرشده دریافت شده است.
              </p>
            </div>
          ) : (
            <MissingFormState />
          )}
        </div>
      </section>
    </div>
  );
}

function RouteReference({
  code,
  title,
  route,
  href,
  active = false,
}: {
  code: string;
  title: string;
  route: string;
  href?: string;
  active?: boolean;
}) {
  const content = (
    <div className="group flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0">
      <span className={`grid h-9 w-9 shrink-0 place-items-center border text-xs font-black ${active ? "border-brand-accent bg-brand-accent text-white" : "border-line bg-surface-soft text-brand-primary"}`}>
        {active ? "01" : "02"}
      </span>
      <span className="min-w-0 flex-1">
        <span dir="ltr" className="block text-[8px] font-black tracking-[.18em] text-brand-primary">{code}</span>
        <span className="mt-1 block text-xs font-black text-ink">{title}</span>
        <span dir="ltr" className="mt-1 block truncate text-left text-[10px] text-ink-muted">{route}</span>
      </span>
      {href ? <ArrowLeft size={15} className="text-brand-accent transition-transform group-hover:-translate-x-1" aria-hidden="true" /> : null}
    </div>
  );

  return href ? (
    <Link href={href} className="block focus:outline-none focus:ring-4 focus:ring-inset focus:ring-brand-accent/20">
      {content}
    </Link>
  ) : content;
}

function MissingFormState() {
  return (
    <section className="border border-line bg-white p-7 shadow-[0_24px_70px_rgba(22,115,148,.10)] sm:p-10" aria-labelledby="missing-form-title">
      <div className="flex h-12 w-12 items-center justify-center border border-brand-primary/20 bg-surface-soft text-brand-primary">
        <FileText size={22} aria-hidden="true" />
      </div>
      <p dir="ltr" className="mt-8 text-[9px] font-black tracking-[.2em] text-brand-primary">
        SETUP / REQUIRED
      </p>
      <h2 id="missing-form-title" className="mt-2 text-2xl font-black leading-10 text-ink">
        فرم آزمایشی هنوز منتشر نشده است
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-8 text-ink-muted">
        برای نمایش این نمونه، یک فرم منتشرشده با شناسه مسیر
        <span dir="ltr" className="mx-1 inline-block font-bold text-ink">{TEST_FORM_SLUG}</span>
        بسازید. پس از انتشار، همین صفحه به‌صورت خودکار فرم را از پایگاه داده بارگذاری می‌کند.
      </p>
      <Link href="/admin/forms/new" className="mt-8 inline-flex items-center gap-2 bg-brand-primary px-5 py-3.5 text-xs font-black text-white transition hover:bg-[#105f7a] focus:outline-none focus:ring-4 focus:ring-brand-accent/25">
        ساخت فرم در پنل مدیریت
        <ArrowLeft size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
