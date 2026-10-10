import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  ClipboardList,
  ContactRound,
  FilePlus2,
  FileStack,
  Inbox,
  MessageSquareText,
  Newspaper,
  Sparkles,
  TrendingUp,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  AdminDataTable,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import Contact from "@/lib/models/Contact";
import DynamicForm from "@/lib/models/DynamicForm";
import FormSubmission from "@/lib/models/FormSubmission";
import Lead from "@/lib/models/Lead";
import User from "@/lib/models/User";
import WeeklyOutlookReport from "@/lib/models/WeeklyOutlookReport";

export const metadata: Metadata = { title: "داشبورد" };
export const dynamic = "force-dynamic";

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeZone: "Asia/Tehran",
});

type AdminUserRow = {
  _id: unknown;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  createdAt: Date;
};

type AdminContactRow = {
  _id: unknown;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt: Date;
};

type AdminLeadRow = {
  _id: unknown;
  name: string;
  phone: string;
  text: string;
  createdAt: Date;
};

type AdminFormRow = {
  _id: unknown;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  revision: number;
  updatedAt: Date;
};

type AdminReportRow = {
  _id: unknown;
  title: string;
  slug: string;
  edition: string;
  status: "draft" | "published" | "archived";
  reportDate: Date;
  updatedAt: Date;
};

type DashboardData = {
  counts: {
    users: number;
    contacts: number;
    leads: number;
    forms: number;
    submissions: number;
    reports: number;
    publishedReports: number;
  };
  users: Array<Omit<AdminUserRow, "_id"> & { id: string }>;
  contacts: Array<Omit<AdminContactRow, "_id"> & { id: string }>;
  leads: Array<Omit<AdminLeadRow, "_id"> & { id: string }>;
  forms: Array<Omit<AdminFormRow, "_id"> & { id: string }>;
  reports: Array<Omit<AdminReportRow, "_id"> & { id: string }>;
};

const statusLabel = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
  archived: "بایگانی",
} as const;

const emptyData: DashboardData = {
  counts: {
    users: 0,
    contacts: 0,
    leads: 0,
    forms: 0,
    submissions: 0,
    reports: 0,
    publishedReports: 0,
  },
  users: [],
  contacts: [],
  leads: [],
  forms: [],
  reports: [],
};

export default async function AdminPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");
  if (currentUser.role !== "admin") redirect("/dashboard");

  let loadError = false;
  let data = emptyData;

  try {
    await connect();

    const [
      users,
      contacts,
      leads,
      forms,
      submissions,
      reports,
      publishedReports,
      userRows,
      contactRows,
      leadRows,
      formRows,
      reportRows,
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Lead.countDocuments(),
      DynamicForm.countDocuments(),
      FormSubmission.countDocuments(),
      WeeklyOutlookReport.countDocuments(),
      WeeklyOutlookReport.countDocuments({ status: "published" }),
      User.find({})
        .select("firstName lastName phone role createdAt")
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      Contact.find({})
        .select("name phone email subject message createdAt")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
      Lead.find({})
        .select("name phone text createdAt")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
      DynamicForm.find({})
        .select("title slug status revision updatedAt")
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
      WeeklyOutlookReport.find({})
        .select("title slug edition status reportDate updatedAt")
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
    ]);

    data = {
      counts: {
        users,
        contacts,
        leads,
        forms,
        submissions,
        reports,
        publishedReports,
      },
      users: (userRows as AdminUserRow[]).map((row) => ({
        ...row,
        id: String(row._id),
      })),
      contacts: (contactRows as AdminContactRow[]).map((row) => ({
        ...row,
        id: String(row._id),
      })),
      leads: (leadRows as AdminLeadRow[]).map((row) => ({
        ...row,
        id: String(row._id),
      })),
      forms: (formRows as AdminFormRow[]).map((row) => ({
        ...row,
        id: String(row._id),
      })),
      reports: (reportRows as AdminReportRow[]).map((row) => ({
        ...row,
        id: String(row._id),
      })),
    };
  } catch {
    loadError = true;
  }

  const intakeItems = [
    ...data.contacts.map((item) => ({
      id: item.id,
      type: "پیام تماس",
      name: item.name,
      phone: item.phone,
      text: item.subject || item.message,
      createdAt: item.createdAt,
      code: "CNT",
    })),
    ...data.leads.map((item) => ({
      id: item.id,
      type: "سرنخ اولیه",
      name: item.name,
      phone: item.phone,
      text: item.text,
      createdAt: item.createdAt,
      code: "LED",
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);

  return (
    <section className="space-y-6">
      <header
        className="
          relative
          overflow-hidden
          border
          border-[color-mix(in_srgb,var(--dnh-primary)_16%,transparent)]
          bg-white/90
          p-5
          shadow-[0_24px_90px_rgba(3,45,59,0.09)]
          backdrop-blur-2xl
          sm:p-7
          lg:p-8
        "
      >
        <DashboardHeroBackdrop />

        <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              dir="ltr"
              className="text-[10px] font-black tracking-[0.24em] text-brand-primary"
            >
              DNH / ADMIN COMMAND CENTER
            </p>
            <h1 className="mt-4 text-[32px] font-black leading-[1.35] tracking-[-0.045em] text-ink sm:text-[42px]">
              به داشبورد مدیریت خوش آمدید
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              از این بخش می‌توانید گزارش‌های مالی، فرم‌های پویا، ورودی‌های مهم
              و دسترسی سریع به بخش‌های مختلف را مشاهده و مدیریت کنید.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:w-[420px]">
            <QuickAction
              href="/admin/weekly-outlooks/new"
              title="ساخت گزارش"
              subtitle="گزارش‌های هفتگی و دوره‌ای"
              icon={Newspaper}
              tone="brand"
            />
            <QuickAction
              href="/admin/forms/new"
              title="ساخت فرم"
              subtitle="ایجاد فرم درخواست سریع"
              icon={FilePlus2}
              tone="accent"
            />
          </div>
        </div>
      </header>

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-800"
        >
          دریافت بخشی از داده‌های داشبورد ممکن نشد. اتصال MongoDB و متغیرهای
          محیطی را بررسی کنید و صفحه را دوباره بارگذاری کنید.
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={UsersRound}
          label="کاربران"
          value={data.counts.users}
          caption="حساب‌های ثبت‌شده"
          code="USR"
          tone="green"
        />
        <Metric
          icon={Inbox}
          label="ورودی‌ها"
          value={data.counts.contacts + data.counts.leads}
          caption="تماس و لید اولیه"
          code="INT"
          tone="blue"
        />
        <Metric
          icon={ClipboardList}
          label="فرم‌ها"
          value={data.counts.forms}
          caption={`${data.counts.submissions.toLocaleString("fa-IR")} پاسخ ثبت‌شده`}
          code="FRM"
          tone="orange"
        />
        <Metric
          icon={Newspaper}
          label="گزارش‌ها"
          value={data.counts.reports}
          caption={`${data.counts.publishedReports.toLocaleString("fa-IR")} منتشرشده`}
          code="RPT"
          tone="teal"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel
          id="system"
          title="نقشه عملیاتی امروز"
          code="CONTROL / QUICK ACCESS"
          icon={Sparkles}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <OperationCard
              href="/admin/forms"
              icon={FileStack}
              title="مدیریت فرم‌های پویا"
              text="فرم‌ها را ویرایش، منتشر یا بایگانی کنید و پاسخ‌ها را ببینید."
            />
            <OperationCard
              href="/admin/weekly-outlooks"
              icon={Newspaper}
              title="مدیریت گزارش‌ها"
              text="نسخه‌های هفتگی را بسازید، بخش‌بندی کنید و منتشر کنید."
            />
            <OperationCard
              href="/admin#intake"
              icon={MessageSquareText}
              title="بررسی ورودی‌ها"
              text="آخرین پیام‌های تماس و سرنخ‌های صفحه اصلی را مرور کنید."
            />
            <OperationCard
              href="/admin/users"
              icon={UserRound}
              title="کاربران اخیر"
              text="ثبت‌نام‌ها و نقش‌های کاربری را سریع اسکن کنید."
            />
          </div>
        </Panel>

        <Panel
          id="activity"
          title="نبض انتشار"
          code="CONTENT / PUBLISHING"
          icon={TrendingUp}
        >
          <div className="space-y-3">
            {data.reports.length === 0 ? (
              <EmptyState text="هنوز گزارشی ساخته نشده است." />
            ) : (
              data.reports.map((report) => (
                <RecentReport key={report.id} report={report} />
              ))
            )}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="فرم‌های اخیر" code="FORMS / LATEST" icon={ClipboardList}>
          <div className="space-y-3">
            {data.forms.length === 0 ? (
              <EmptyState text="هنوز فرمی ساخته نشده است." />
            ) : (
              data.forms.map((form) => <RecentForm key={form.id} form={form} />)
            )}
          </div>
        </Panel>

        <Panel
          id="intake"
          title="آخرین ورودی‌های سایت"
          code="INTAKE / CONTACT + LEADS"
          icon={ContactRound}
        >
          {intakeItems.length === 0 ? (
            <EmptyState text="هنوز پیام یا سرنخ جدیدی ثبت نشده است." />
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {intakeItems.map((item) => (
                <article
                  key={`${item.code}-${item.id}`}
                  className="border border-line bg-[#fbfdfd] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black text-brand-primary">
                        {item.type}
                      </span>
                      <h3 className="mt-1 text-sm font-black text-ink">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      dir="ltr"
                      className="text-[10px] font-black text-ink-muted"
                    >
                      {item.code}-{item.id.slice(-5).toUpperCase()}
                    </span>
                  </div>
                  <p dir="ltr" className="mt-2 text-right text-xs text-ink-muted">
                    {item.phone}
                  </p>
                  <p className="mt-3 line-clamp-2 text-xs font-medium leading-6 text-ink">
                    {item.text}
                  </p>
                  <p className="mt-4 border-t border-dashed border-line pt-3 text-[10px] text-ink-muted">
                    {formatDateTime(item.createdAt)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Panel>
      </div>

      <Panel
        id="users"
        title="کاربران اخیر"
        code="REGISTRY / USERS"
        icon={UsersRound}
      >
        <AdminDataTable
          rows={data.users}
          getRowId={(user) => user.id}
          columns={userColumns}
          emptyTitle="هنوز کاربری ثبت‌نام نکرده است"
          emptyDescription="پس از ثبت‌نام کاربران، آخرین حساب‌ها اینجا نمایش داده می‌شوند."
          minWidth={760}
          actions={[
            {
              type: "delete",
              label: "حذف",
              endpoint: (user) => `/api/admin/users/${user.id}`,
              title: (user) => `حذف کاربر «${user.firstName} ${user.lastName}»`,
              description: (user) =>
                `این عملیات حساب کاربری ${user.phone} را حذف می‌کند. حساب‌های مدیر از این جدول حذف نمی‌شوند.`,
              hidden: (user) => user.role === "admin",
            },
          ]}
        />
      </Panel>
    </section>
  );
}

function formatDateTime(value: Date) {
  return dateTimeFormatter.format(new Date(value));
}

function formatDate(value: Date) {
  return dateFormatter.format(new Date(value));
}

function DashboardHeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(105deg,rgba(255,255,255,.96)_0%,rgba(245,251,252,.9)_38%,rgba(226,241,245,.78)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          w-[54%]
          bg-[radial-gradient(circle_at_55%_30%,rgba(255,139,0,.28),transparent_16%),linear-gradient(135deg,rgba(6,112,133,.14),rgba(255,255,255,0)_56%)]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[7%]
          h-[92px]
          w-[42%]
          bg-[linear-gradient(180deg,rgba(8,94,112,.1),rgba(8,94,112,.02))]
        "
        style={{
          clipPath:
            "polygon(0 100%, 10% 66%, 22% 92%, 36% 35%, 51% 86%, 66% 28%, 83% 78%, 100% 48%, 100% 100%)",
        }}
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[20%]
          h-[130px]
          w-[48%]
          bg-[linear-gradient(180deg,rgba(3,45,59,.16),rgba(255,255,255,0))]
          opacity-70
        "
        style={{
          clipPath:
            "polygon(0 100%, 13% 52%, 25% 78%, 39% 18%, 55% 73%, 70% 30%, 85% 88%, 100% 62%, 100% 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.42]
        "
        style={{
          backgroundImage: `linear-gradient(to right, rgba(3,45,59,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,45,59,.04) 1px, transparent 1px)`,
          backgroundSize: "42px 42px",
        }}
      />
    </>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  caption,
  code,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  caption: string;
  code: string;
  tone: "blue" | "orange" | "green" | "teal";
}) {
  const toneStyles = {
    blue: {
      icon: "bg-sky-100 text-sky-600",
      glow: "bg-sky-400/10",
      line: "#20a8ff",
    },
    orange: {
      icon: "bg-orange-100 text-brand-accent",
      glow: "bg-brand-accent/10",
      line: "var(--dnh-accent)",
    },
    green: {
      icon: "bg-emerald-100 text-emerald-600",
      glow: "bg-emerald-400/10",
      line: "#12c48b",
    },
    teal: {
      icon: "bg-cyan-100 text-brand-primary",
      glow: "bg-brand-primary/10",
      line: "var(--dnh-primary)",
    },
  } satisfies Record<
    typeof tone,
    {
      icon: string;
      glow: string;
      line: string;
    }
  >;

  const activeTone = toneStyles[tone];

  return (
    <article className="relative min-h-[132px] overflow-hidden border border-line bg-white/92 p-5 shadow-[0_16px_46px_rgba(3,45,59,0.07)] backdrop-blur-xl">
      <span
        aria-hidden="true"
        className={`absolute bottom-0 right-0 h-16 w-28 ${activeTone.glow} blur-2xl`}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black text-ink-muted">{label}</p>
          <p className="mt-3 text-[34px] font-black leading-none text-ink">
            {value.toLocaleString("fa-IR")}
          </p>
          <p className="mt-3 text-[11px] font-medium text-ink-muted">
            {caption}
          </p>
        </div>
        <div className="text-left">
          <span className={`grid h-12 w-12 place-items-center ${activeTone.icon}`}>
            <Icon size={20} aria-hidden="true" />
          </span>
          <p
            dir="ltr"
            className="mt-4 text-[10px] font-black tracking-[0.18em] text-ink-muted"
          >
            {code}
          </p>
        </div>
      </div>

      <Sparkline color={activeTone.line} />
    </article>
  );
}

function Sparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 150 36"
      fill="none"
      className="
        pointer-events-none
        absolute
        bottom-3
        right-5
        h-9
        w-[120px]
        opacity-80
      "
      aria-hidden="true"
    >
      <path
        d="M1 27C10 24 15 12 25 20C32 26 36 31 45 22C53 13 57 16 65 25C72 33 80 22 87 17C96 11 102 18 111 24C120 30 126 10 136 12C142 13 146 18 149 21"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M1 27C10 24 15 12 25 20C32 26 36 31 45 22C53 13 57 16 65 25C72 33 80 22 87 17C96 11 102 18 111 24C120 30 126 10 136 12C142 13 146 18 149 21V36H1V27Z"
        fill={color}
        opacity="0.09"
      />
    </svg>
  );
}

function QuickAction({
  href,
  title,
  subtitle,
  icon: Icon,
  tone,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone: "brand" | "accent";
}) {
  return (
    <Link
      href={href}
      className={`group flex min-h-[92px] items-center justify-between gap-4 border p-4 text-right transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 ${
        tone === "accent"
          ? "border-brand-accent bg-brand-accent text-white"
          : "border-brand-primary bg-brand-primary text-white"
      }`}
    >
      <span>
        <span className="block text-sm font-black">{title}</span>
        <span className="mt-1 block text-[11px] text-white/70">
          {subtitle}
        </span>
      </span>
      <span className="grid h-11 w-11 place-items-center bg-white/14">
        <Icon size={19} aria-hidden="true" />
      </span>
    </Link>
  );
}

function Panel({
  id,
  title,
  code,
  icon: Icon,
  children,
}: {
  id?: string;
  title: string;
  code: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border border-line bg-white/92 shadow-[0_16px_46px_rgba(3,45,59,0.06)] backdrop-blur-xl"
    >
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <p
            dir="ltr"
            className="text-[10px] font-black tracking-[0.2em] text-brand-primary"
          >
            {code}
          </p>
          <h2 className="mt-1 text-base font-black text-ink">{title}</h2>
        </div>
        <span className="grid h-10 w-10 place-items-center bg-surface-soft text-brand-primary">
          <Icon size={18} aria-hidden="true" />
        </span>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function OperationCard({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[132px] flex-col justify-between border border-line bg-[#fbfdfd] p-4 transition hover:border-brand-primary hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="grid h-10 w-10 place-items-center bg-surface-soft text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
          <Icon size={18} aria-hidden="true" />
        </span>
        <ArrowLeft
          size={15}
          className="text-ink-muted transition group-hover:-translate-x-1 group-hover:text-brand-accent"
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block text-sm font-black text-ink">{title}</span>
        <span className="mt-2 block text-xs leading-6 text-ink-muted">
          {text}
        </span>
      </span>
    </Link>
  );
}

function RecentReport({ report }: { report: DashboardData["reports"][number] }) {
  return (
    <Link
      href={`/admin/weekly-outlooks/${report.id}/edit`}
      className="group flex items-center justify-between gap-4 border border-line bg-[#fbfdfd] p-4 transition hover:border-brand-primary hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
    >
      <span className="min-w-0">
        <span className="line-clamp-1 text-sm font-black text-ink">
          {report.title}
        </span>
        <span className="mt-1 block text-[11px] text-ink-muted">
          {report.edition} · {formatDate(report.reportDate)}
        </span>
      </span>
      <StatusBadge
        tone={
          report.status === "published"
            ? "success"
            : report.status === "archived"
              ? "muted"
              : "accent"
        }
      >
        {statusLabel[report.status]}
      </StatusBadge>
    </Link>
  );
}

function RecentForm({ form }: { form: DashboardData["forms"][number] }) {
  return (
    <Link
      href={`/admin/forms/${form.id}/edit`}
      className="group flex items-center justify-between gap-4 border border-line bg-[#fbfdfd] p-4 transition hover:border-brand-primary hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
    >
      <span className="min-w-0">
        <span className="line-clamp-1 text-sm font-black text-ink">
          {form.title}
        </span>
        <span dir="ltr" className="mt-1 block text-left text-[11px] text-ink-muted">
          /forms/{form.slug} · REV {String(form.revision).padStart(2, "0")}
        </span>
      </span>
      <StatusBadge
        tone={
          form.status === "published"
            ? "success"
            : form.status === "archived"
              ? "muted"
              : "accent"
        }
      >
        {statusLabel[form.status]}
      </StatusBadge>
    </Link>
  );
}

function StatusBadge({
  tone,
  children,
}: {
  tone: "brand" | "accent" | "success" | "muted";
  children: React.ReactNode;
}) {
  const className =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : tone === "muted"
        ? "border-slate-200 bg-slate-100 text-slate-700"
        : tone === "brand"
          ? "border-teal-200 bg-teal-50 text-teal-800"
          : "border-orange-200 bg-orange-50 text-orange-800";

  return (
    <span className={`shrink-0 border px-2.5 py-1 text-[10px] font-black ${className}`}>
      {children}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-line bg-[#fbfdfd] px-5 py-10 text-center">
      <BarChart3 className="mx-auto h-9 w-9 text-brand-primary/28" />
      <p className="mt-4 text-sm font-bold text-ink-muted">{text}</p>
      <Link
        href="/admin"
        className="mt-4 inline-flex items-center justify-center gap-2 text-xs font-black text-brand-primary"
      >
        بازگشت به نمای کلی
        <ArrowLeft size={13} aria-hidden="true" />
      </Link>
    </div>
  );
}

const userColumns: AdminTableColumn<DashboardData["users"][number]>[] = [
  {
    key: "name",
    header: "نام",
    cell: (user) => (
      <span className="font-bold text-ink">
        {user.firstName} {user.lastName}
      </span>
    ),
  },
  {
    key: "phone",
    header: "موبایل",
    cell: (user) => (
      <span dir="ltr" className="text-right text-ink-muted">
        {user.phone}
      </span>
    ),
  },
  {
    key: "role",
    header: "نقش",
    cell: (user) => (
      <AdminStatusBadge tone={user.role === "admin" ? "accent" : "brand"}>
        {user.role === "admin" ? "مدیر" : "کاربر"}
      </AdminStatusBadge>
    ),
  },
  {
    key: "createdAt",
    header: "تاریخ ثبت",
    cell: (user) => (
      <span className="text-ink-muted">{formatDateTime(user.createdAt)}</span>
    ),
  },
  {
    key: "reference",
    header: "مرجع",
    cell: (user) => (
      <span dir="ltr" className="text-right text-ink-muted">
        USR-{user.id.slice(-6).toUpperCase()}
      </span>
    ),
  },
];
