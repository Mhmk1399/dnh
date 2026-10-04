import { AuthForm } from "@/components/forms/AuthForm";
import { FileKey2, ShieldCheck } from "lucide-react";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const registering = mode === "register";
  return (
    <div className="min-h-screen bg-surface-soft pt-24 sm:pt-28">
      <section className="mx-auto grid max-w-[1120px] px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
        <aside className="relative overflow-hidden bg-brand-secondary p-8 text-white sm:p-10 lg:p-12">
          <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="relative flex h-full min-h-72 flex-col justify-between">
            <div><p dir="ltr" className="text-[10px] font-black tracking-[0.23em] text-white/60">PRIVATE CLIENT ACCESS</p><h1 className="mt-7 text-3xl font-black leading-[1.6] tracking-[-0.035em] sm:text-4xl">{registering ? "پرونده کاربری شما، نقطه شروع یک مسیر دقیق‌تر." : "بازگشت به فضای خصوصی DNH."}</h1><p className="mt-5 text-sm leading-8 text-white/70">دسترسی امن به خدماتی که به‌تدریج برای تصمیم‌های مالی شما فعال خواهند شد.</p></div>
            <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6 text-xs text-white/70"><ShieldCheck className="h-5 w-5 text-brand-accent" /><span>رمز عبور شما به‌صورت امن و غیرقابل‌بازخوانی نگهداری می‌شود.</span></div>
          </div>
        </aside>
        <div className="bg-white p-6 shadow-[0_20px_80px_rgba(22,115,148,.12)] sm:p-10 lg:p-12">
          <div className="mb-8 flex items-start justify-between border-b border-line pb-6"><div><p className="text-xs font-black text-brand-primary">{registering ? "ایجاد حساب خصوصی" : "ورود به حساب"}</p><p className="mt-2 text-xs leading-6 text-ink-muted">{registering ? "اطلاعات پایه خود را ثبت کنید." : "با شماره موبایل و رمز عبور وارد شوید."}</p></div><FileKey2 className="h-6 w-6 text-brand-accent" /></div>
          <AuthForm mode={mode} />
        </div>
      </section>
    </div>
  );
}
