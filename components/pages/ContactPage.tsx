import { ContactForm } from "@/components/forms/ContactForm";
import { Fingerprint, ShieldCheck } from "lucide-react";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--dnh-bg-soft),white_38%)] pt-24 sm:pt-28">
      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-brand-accent" /><span dir="ltr" className="text-[10px] font-black tracking-[0.22em] text-brand-primary">DNH / CONFIDENTIAL INTAKE</span></div>
            <h1 className="text-4xl font-black leading-[1.55] tracking-[-0.04em] text-ink sm:text-5xl">مسئله را روشن بنویسید؛<br /><span className="text-brand-primary">گفت‌وگو از همین‌جا آغاز می‌شود.</span></h1>
            <p className="mt-6 max-w-lg text-sm font-medium leading-8 text-ink-muted">این فرم برای شروع یک گفت‌وگوی دقیق درباره تصمیم‌های مالی، ساختار سرمایه یا معماری ثروت شماست. اطلاعات فقط برای بررسی اولیه استفاده می‌شود.</p>
            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="bg-white p-5"><ShieldCheck className="mb-4 h-5 w-5 text-brand-primary" /><p className="text-sm font-bold text-ink">بررسی محرمانه</p><p className="mt-2 text-xs leading-6 text-ink-muted">جزئیات درخواست شما عمومی نخواهد شد.</p></div>
              <div className="bg-white p-5"><Fingerprint className="mb-4 h-5 w-5 text-brand-accent" /><p className="text-sm font-bold text-ink">ارجاع قابل پیگیری</p><p className="mt-2 text-xs leading-6 text-ink-muted">پس از ثبت، یک شناسه مرجع دریافت می‌کنید.</p></div>
            </div>
          </header>
          <div className="relative border border-line bg-white p-5 shadow-[0_24px_80px_rgba(22,115,148,0.10)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--dnh-accent)_0_13%,var(--dnh-primary)_13_100%)]" />
            <div className="mb-8 flex items-start justify-between gap-6 border-b border-line pb-6"><div><p className="text-xs font-black text-brand-primary">فرم ارتباط راهبردی</p><p className="mt-2 text-xs leading-6 text-ink-muted">فیلدهای دارای علامت الزامی هستند.</p></div><span dir="ltr" className="text-[9px] font-bold tracking-[0.18em] text-ink-muted">FORM / 01-A</span></div>
            <ContactForm />
            <p className="mt-7 border-t border-dashed border-line pt-5 text-[11px] leading-6 text-ink-muted">با ثبت این فرم، با تماس کارشناسی DNH درباره همین درخواست موافقت می‌کنید. از درج اطلاعات بانکی یا رمزهای شخصی خودداری کنید.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
