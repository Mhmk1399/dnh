import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ClipboardCheck,
  ContactRound,
  FileInput,
  BriefcaseBusiness,
  Inbox,
  MessageSquareText,
  Presentation,
  type LucideIcon,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import FormSubmission from "@/models/FormSubmission";
import { intakeSources, intakeTypes, type IntakeType } from "@/lib/admin-intake";

export const metadata: Metadata = {
  title: "ورودی‌ها و لیدها",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type IntakeCard = {
  title: string;
  description: string;
  href: string;
  code: string;
  count: number;
  icon: LucideIcon;
};

export default async function IntakeOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  let counts: number[] = [];
  let dynamicSubmissions = 0;
  let loadError = false;
  try {
    await connect();
    [counts, dynamicSubmissions] = await Promise.all([
      Promise.all(intakeTypes.map(type => intakeSources[type].count())),
      FormSubmission.countDocuments(),
    ]);
  } catch {
    loadError = true;
  }
  const icons: Record<IntakeType, LucideIcon> = {
    "strategic-consultations": BriefcaseBusiness,
    "financial-decision-assessments": ClipboardCheck,
    "decision-assessments": FileInput,
    "executive-briefings": Presentation,
    contacts: MessageSquareText,
    leads: ContactRound,
  };
  const cards: IntakeCard[] = intakeTypes.map((type, index) => ({
    ...intakeSources[type],
    href: `/admin/intake/${type}`,
    code: intakeSources[type].prefix,
    count: counts[index] ?? 0,
    icon: icons[type],
  }));
  const total = counts.reduce((sum, count) => sum + count, dynamicSubmissions);

  return (
    <section className="space-y-6">
      <header className="relative overflow-hidden border border-line bg-white/92 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7">
        <div className="absolute inset-y-0 start-0 w-1 bg-brand-primary" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.16em] text-brand-primary">
              INTAKE & LEADS
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              ورودی‌ها و لیدهای سایت
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              هر مسیر ورودی جدول مستقل دارد؛ جزئیات کامل رکورد را در مودال
              ببینید، جست‌وجو کنید و در صورت نیاز آن را حذف کنید.
            </p>
          </div>
          <div className="flex items-center gap-4 border border-line bg-surface-soft px-5 py-4">
            <Inbox
              size={21}
              className="text-brand-primary"
              aria-hidden="true"
            />
            <div>
              <p className="text-2xl font-black text-ink">
                {total.toLocaleString("fa-IR")}
              </p>
              <p className="text-[10px] font-bold text-ink-muted">
                کل ورودی‌ها
              </p>
            </div>
          </div>
        </div>
      </header>

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          دریافت آمار ورودی‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <IntakeOverviewCard key={card.href} card={card} />
        ))}
      </div>

      <section className="flex flex-col gap-4 border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center bg-surface-soft text-brand-primary">
            <FileInput size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-black text-ink">پاسخ فرم‌های پویا</h2>
            <p className="mt-2 text-xs leading-6 text-ink-muted">
              {dynamicSubmissions.toLocaleString("fa-IR")} پاسخ ثبت‌شده؛
              جدول پاسخ هر فرم از صفحه همان فرم در دسترس است.
            </p>
          </div>
        </div>
        <Link
          href="/admin/forms"
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-white px-4 text-xs font-black text-ink transition hover:border-brand-primary hover:bg-surface-soft"
        >
          مدیریت فرم‌ها <ArrowLeft size={15} aria-hidden="true" />
        </Link>
      </section>
    </section>
  );
}

function IntakeOverviewCard({ card }: { card: IntakeCard }) {
  const Icon = card.icon;

  return (
    <Link
      href={card.href}
      className="group relative min-w-0 overflow-hidden border border-line bg-white p-5 shadow-[0_14px_42px_rgba(3,45,59,0.04)] transition hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-[0_18px_48px_rgba(3,45,59,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 motion-reduce:transform-none sm:p-6"
    >
      <span className="absolute inset-y-0 start-0 w-1 origin-bottom scale-y-0 bg-brand-primary transition-transform group-hover:scale-y-100" />
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 shrink-0 place-items-center bg-surface-soft text-brand-primary transition group-hover:bg-brand-secondary group-hover:text-brand-primary">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span
          dir="ltr"
          className="text-[10px] font-black tracking-[0.16em] text-ink-muted"
        >
          {card.code}
        </span>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-ink">{card.title}</h2>
          <p className="mt-2 max-w-lg text-xs leading-6 text-ink-muted">
            {card.description}
          </p>
        </div>
        <span className="shrink-0 text-3xl font-black text-brand-primary">
          {card.count.toLocaleString("fa-IR")}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs font-black text-ink">
        مشاهده جدول مستقل
        <ArrowLeft
          size={16}
          className="text-brand-primary transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
