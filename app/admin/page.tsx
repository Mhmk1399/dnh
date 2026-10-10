import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  CalendarDays,
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

  // Database queries, counts, sort order, limits and action endpoints are unchanged.
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
    <section dir="rtl" className="min-w-0 space-y-4 sm:space-y-5">
      <header className="relative isolate overflow-hidden rounded-[20px] border border-[#dfedf2] bg-white shadow-[0_13px_38px_rgba(9,55,75,.055)] sm:rounded-[22px]">
        <MountainBackdrop />

        <div className="relative z-10 flex min-h-[205px] flex-col justify-between gap-6 p-5 sm:p-7 lg:flex-row lg:items-end lg:gap-6 lg:p-8 xl:min-h-[220px]">
          <div className="relative min-w-0 flex-1 lg:self-center">
            
            <h1 className="mt-3 text-[26px] font-black leading-[1.5] tracking-[-.025em] text-[#123646] sm:text-[31px] lg:text-[34px] xl:text-[38px]">
              به داشبورد مدیریت خوش آمدید
            </h1>
            <p className="mt-2 max-w-[580px] text-xs font-medium leading-7 text-[#67889c] sm:text-[12px]">
              در این بخش می‌توانید وضعیت کلی سامانه، گزارش‌های مهم و دسترسی سریع
              به بخش‌های مختلف را مشاهده کنید.
            </p>
          </div>

          <div className="grid w-full shrink-0 grid-cols-1 gap-3 min-[470px]:grid-cols-2 lg:w-[410px] xl:w-[465px]">
            <QuickAction
              href="/admin/forms/new"
              title="ساخت فرم"
              subtitle="ایجاد فرم درخواست سریع"
              icon={FilePlus2}
              tone="orange"
            />
            <QuickAction
              href="/admin/weekly-outlooks/new"
              title="ساخت گزارش"
              subtitle="گزارش‌های هفتگی و دوره‌ای"
              icon={Newspaper}
              tone="teal"
            />
          </div>
        </div>
      </header>

      {loadError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-xs font-medium leading-7 text-red-800"
        >
          دریافت بخشی از داده‌های داشبورد ممکن نشد. اتصال MongoDB و متغیرهای
          محیطی را بررسی کنید و صفحه را دوباره بارگذاری کنید.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
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

      <div className="grid min-w-0 gap-4 lg:grid-cols-2 sm:gap-5">
        <Panel
          id="system"
          title="دسترسی سریع"
          subtitle="عملیات پرکاربرد را سریع‌تر انجام دهید."
          icon={Sparkles}
          minHeight
        >
          <div className="grid grid-cols-1 gap-3 min-[540px]:grid-cols-2 lg:grid-cols-2">
            <OperationCard
              href="/admin/forms"
              icon={FileStack}
              title="مدیریت فرم‌های پویا"
              text="فرم‌ها را ویرایش، منتشر یا بایگانی کنید و پاسخ‌ها را ببینید."
              tone="orange"
            />
            <OperationCard
              href="/admin/weekly-outlooks"
              icon={Newspaper}
              title="مدیریت گزارش‌ها"
              text="نسخه‌های هفتگی را بسازید، بخش‌بندی کنید و منتشر کنید."
              tone="blue"
            />
            <OperationCard
              href="/admin#intake"
              icon={MessageSquareText}
              title="بررسی ورودی‌ها"
              text="آخرین پیام‌های تماس و سرنخ‌های صفحه اصلی را مرور کنید."
              tone="blue"
            />
            <OperationCard
              href="/admin/users"
              icon={UserRound}
              title="کاربران اخیر"
              text="ثبت‌نام‌ها و نقش‌های کاربری را سریع بررسی کنید."
              tone="green"
            />
          </div>
        </Panel>

        <Panel
          id="activity"
          title="محتوا و انتشار"
          subtitle="آخرین محتوای منتشرشده در سایت"
          icon={TrendingUp}
          footer={{
            href: "/admin/weekly-outlooks",
            label: "مشاهده همه محتواها",
          }}
          minHeight
        >
          {data.reports.length === 0 ? (
            <EmptyState text="هنوز گزارشی ساخته نشده است." />
          ) : (
            <div className="space-y-2.5">
              {data.reports.map((report) => (
                <RecentReport key={report.id} report={report} />
              ))}
            </div>
          )}
        </Panel>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2 sm:gap-5">
        <Panel
          title="فرم‌های اخیر"
          subtitle="آخرین فرم‌های ایجادشده و وضعیت انتشار"
          icon={ClipboardList}
          footer={{ href: "/admin/forms", label: "مشاهده همه فرم‌ها" }}
        >
          {data.forms.length === 0 ? (
            <EmptyState text="هنوز فرمی ساخته نشده است." />
          ) : (
            <div className="space-y-2.5">
              {data.forms.map((form) => (
                <RecentForm key={form.id} form={form} />
              ))}
            </div>
          )}
        </Panel>

        <Panel
          id="intake"
          title="آخرین ورودی‌های سایت"
          subtitle="جدیدترین تماس‌ها و سرنخ‌های ثبت‌شده"
          icon={ContactRound}
        >
          {intakeItems.length === 0 ? (
            <EmptyState text="هنوز پیام یا سرنخ جدیدی ثبت نشده است." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {intakeItems.map((item) => (
                <article
                  key={`${item.code}-${item.id}`}
                  data-admin-searchable
                  data-admin-search-label={`${item.name} ${item.phone} ${item.type} ${item.text}`}
                  className="min-w-0 rounded-xl border border-[#e5edf1] bg-[#fbfdfe] p-3.5 transition hover:border-[#bad8e2]"
                >
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold text-[#1481a0]">
                        {item.type}
                      </p>
                      <h3 className="mt-1 truncate text-xs font-black text-[#173a4c]">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      dir="ltr"
                      className="shrink-0 rounded-md bg-[#edf7fa] px-2 py-1 text-[9px] font-bold tracking-wider text-[#6d9cad]"
                    >
                      {item.code}-{item.id.slice(-5).toUpperCase()}
                    </span>
                  </div>
                  <p
                    dir="ltr"
                    className="mt-2 text-right text-[11px] tabular-nums text-[#6c8b9e]"
                  >
                    {item.phone}
                  </p>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-6 text-[#456476]">
                    {item.text}
                  </p>
                  <p className="mt-3 border-t border-[#e8f0f3] pt-2.5 text-[10px] text-[#9aabb6]">
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
        subtitle="آخرین حساب‌های ایجادشده در سامانه"
        icon={UsersRound}
        footer={{ href: "/admin/users", label: "مدیریت کاربران" }}
      >
        <div className="min-w-0 overflow-x-auto rounded-xl border border-[#edf1f4]">
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
                title: (user) =>
                  `حذف کاربر «${user.firstName} ${user.lastName}»`,
                description: (user) =>
                  `این عملیات حساب کاربری ${user.phone} را حذف می‌کند. حساب‌های مدیر از این جدول حذف نمی‌شوند.`,
                hidden: (user) => user.role === "admin",
              },
            ]}
          />
        </div>
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

/** Illustrated mountains are inline SVG; no additional image file is needed. */
function MountainBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,#ebf6f9_0%,#ffffff_52%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_62%,rgba(199,230,236,.28),transparent_45%)]" />
      <svg
        viewBox="0 0 780 260"
        preserveAspectRatio="xMidYMid slice"
        className="absolute bottom-0 left-0 h-full w-[94%] opacity-85 sm:w-[76%] lg:w-[64%]"
      >
        <defs>
          <linearGradient id="dnh-mountain-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7d1df" stopOpacity=".85" />
            <stop offset="100%" stopColor="#e5f3f7" stopOpacity=".26" />
          </linearGradient>
          <linearGradient id="dnh-mountain-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8dbbce" stopOpacity=".78" />
            <stop offset="100%" stopColor="#dcecf2" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="dnh-mountain-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6496ad" stopOpacity=".7" />
            <stop offset="100%" stopColor="#e1f1f4" stopOpacity=".05" />
          </linearGradient>
          <linearGradient id="dnh-mountain-fog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="dnh-mountain-sun">
            <stop offset="0%" stopColor="#ffcb93" stopOpacity=".9" />
            <stop offset="100%" stopColor="#ffba77" stopOpacity=".5" />
          </radialGradient>
        </defs>
        <circle cx="487" cy="93" r="32" fill="url(#dnh-mountain-sun)" />
        <path
          d="M0 197 L48 171 L78 185 L140 104 L175 137 L203 117 L255 174 L317 123 L360 155 L422 111 L477 177 L536 135 L601 179 L664 124 L722 171 L780 134 V260 H0Z"
          fill="url(#dnh-mountain-far)"
        />
        <path
          d="M0 195 L65 146 L91 166 L146 91 L202 164 L239 119 L287 190 L343 103 L401 175 L460 142 L495 176 L548 138 L600 185 L657 148 L722 191 L780 155 V260 H0Z"
          fill="url(#dnh-mountain-mid)"
        />
        <path
          d="M0 212 L51 180 L87 193 L135 123 L161 161 L193 153 L250 215 L296 159 L325 178 L365 145 L409 200 L473 165 L525 201 L571 177 L638 218 L698 175 L780 211 V260 H0Z"
          fill="url(#dnh-mountain-near)"
        />
        <path
          d="M106 160 L135 123 L161 161 L142 151 L132 139Z M318 157 L365 145 L409 200 L366 164 L348 168Z M128 111 L146 91 L164 127 L147 118 L141 108Z M330 124 L343 103 L358 134 L347 125Z"
          fill="#ecf8fa"
          opacity=".65"
        />
        <path
          d="M0 185 Q91 163 178 181 T377 181 T780 183 V260 H0Z"
          fill="#f9fcfc"
          opacity=".35"
        />
        <path
          d="M0 205 Q125 169 263 199 T518 206 T780 198 V260 H0Z"
          fill="url(#dnh-mountain-fog)"
          opacity=".86"
        />
        <path
          d="M0 224 Q150 205 310 223 T645 222 T780 219 V260 H0Z"
          fill="white"
          opacity=".44"
        />
      </svg>
      <div className="absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-white via-white/85 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[24%] w-full bg-gradient-to-t from-white/80 to-transparent" />
    </div>
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
  tone: "orange" | "teal";
}) {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[123px] flex-col justify-between overflow-hidden rounded-[15px] p-4 text-right text-white shadow-[0_10px_22px_rgba(16,77,91,.1)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_17px_27px_rgba(16,77,91,.16)] focus-visible:outline-4 focus-visible:outline-[#ffbd75] ${
        tone === "orange"
          ? "bg-[linear-gradient(125deg,#ff8100,#ffa309)]"
          : "bg-[linear-gradient(125deg,#006782,#138f9d)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
      />
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/10">
        <Icon size={21} strokeWidth={1.9} aria-hidden="true" />
      </span>
      <span className="flex items-end justify-between gap-2">
        <span className="min-w-0">
          <span className="block text-[13px] font-black">{title}</span>
          <span className="mt-1 block text-[10px] leading-5 text-white/85">
            {subtitle}
          </span>
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 transition group-hover:bg-white/30">
          <ArrowLeft size={17} />
        </span>
      </span>
    </Link>
  );
}

type MetricTone = "blue" | "orange" | "green" | "teal";

const metricTones: Record<MetricTone, { icon: string; line: string }> = {
  blue: { icon: "bg-[#e7f5ff] text-[#168fe8]", line: "#18a5f3" },
  orange: { icon: "bg-[#fff1e7] text-[#ff8200]", line: "#ff9200" },
  green: { icon: "bg-[#e4faf1] text-[#08af86]", line: "#10bd8d" },
  teal: { icon: "bg-[#e7f6fa] text-[#087d9d]", line: "#1b9bd0" },
};

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
  tone: MetricTone;
}) {
  const styles = metricTones[tone];
  return (
    <article className="relative isolate min-h-[155px] min-w-0 overflow-hidden rounded-[17px] border border-[#e3edf1] bg-white px-4 py-4 shadow-[0_10px_26px_rgba(9,55,75,.045)] sm:px-5">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0 text-right">
          <h2 className="truncate text-[12px] font-extrabold text-[#506d80] sm:text-[13px]">
            {label}
          </h2>
          <p className="mt-3 text-[32px] font-black leading-none text-[#12384a] sm:text-[37px]">
            {value.toLocaleString("fa-IR")}
          </p>
          <p className="mt-3 line-clamp-2 text-[10px] font-medium leading-5 text-[#8aa1af] sm:text-[11px]">
            {caption}
          </p>
        </div>
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 ${styles.icon}`}
        >
          <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>
      <span className="sr-only">{code}</span>
      <Sparkline color={styles.line} />
    </article>
  );
}

// The sparkline is decorative; it is not represented as real historical data.
function Sparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 140 43"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-3 left-3 h-10 w-[92px] opacity-90 sm:left-4 sm:w-[115px]"
    >
      <path
        d="M1 31C11 28 15 18 24 22S38 35 47 29 61 17 69 24 81 36 91 26 106 9 116 18 128 25 139 12"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M1 31C11 28 15 18 24 22S38 35 47 29 61 17 69 24 81 36 91 26 106 9 116 18 128 25 139 12V43H1Z"
        fill={color}
        opacity=".08"
      />
    </svg>
  );
}

function Panel({
  id,
  title,
  subtitle,
  icon: Icon,
  footer,
  minHeight = false,
  children,
}: {
  id?: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  footer?: { href: string; label: string };
  minHeight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`flex min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-[19px] border border-[#e1edf1] bg-white px-4 pb-4 pt-4 shadow-[0_10px_28px_rgba(9,55,75,.046)] sm:px-5 ${minHeight ? "min-h-[318px]" : "min-h-[205px]"}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-[#ebf0f3] pb-3.5">
        <div className="min-w-0">
          <h2 className="text-[15px] font-black text-[#14384a] sm:text-base">
            {title}
          </h2>
          <p className="mt-1.5 text-[10px] font-medium leading-5 text-[#91a5b2] sm:text-[11px]">
            {subtitle}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf6fb] text-[#1587ae]">
          <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
        </span>
      </header>
      <div className="min-h-0 min-w-0 flex-1 py-3.5">{children}</div>
      {footer && (
        <Link
          href={footer.href}
          className="group mt-1 inline-flex w-fit items-center gap-2 self-end rounded-lg px-1 py-1.5 text-[11px] font-extrabold text-[#0e82a6] transition hover:text-[#075e7d] focus-visible:outline-2 focus-visible:outline-[#ff9000]"
        >
          {footer.label}{" "}
          <ArrowLeft
            size={15}
            className="transition group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </section>
  );
}

const operationTones = {
  orange: "bg-[#fff0e6] text-[#ff8500]",
  blue: "bg-[#e7f5ff] text-[#168bdd]",
  green: "bg-[#e4faf3] text-[#0cad80]",
} as const;

function OperationCard({
  href,
  icon: Icon,
  title,
  text,
  tone,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text: string;
  tone: keyof typeof operationTones;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[102px] min-w-0 items-center gap-3 rounded-xl border border-[#e1edf2] bg-[#fcfeff] p-3 transition hover:-translate-y-0.5 hover:border-[#acd4e0] hover:bg-[#f7fcfe] hover:shadow-[0_8px_20px_rgba(16,89,113,.07)] focus-visible:outline-2 focus-visible:outline-[#138fa9] sm:p-3.5"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${operationTones[tone]}`}
      >
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-black leading-5 text-[#1b4053] sm:text-xs">
          {title}
        </span>
        <span className="mt-1 block text-[10px] leading-5 text-[#819baa]">
          {text}
        </span>
      </span>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#dae7ee] bg-white text-[#587f95] transition group-hover:border-[#8fc4d2] group-hover:text-[#128bad]">
        <ArrowLeft size={15} />
      </span>
    </Link>
  );
}

function CityThumbnail() {
  return (
    <svg
      viewBox="0 0 82 84"
      role="img"
      aria-label="نمایی از ساختمان‌های شهر"
      className="h-[66px] w-[65px] shrink-0 overflow-hidden rounded-[10px] border border-[#dfe9ed] sm:h-[75px] sm:w-[75px]"
    >
      <defs>
        <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cb5cd" />
          <stop offset="57%" stopColor="#e4ae72" />
          <stop offset="100%" stopColor="#173c50" />
        </linearGradient>
      </defs>
      <rect width="82" height="84" fill="url(#city-sky)" />
      <circle cx="55" cy="40" r="19" fill="#ffcd87" opacity=".72" />
      <rect x="2" y="29" width="15" height="55" fill="#19475c" />
      <rect x="9" y="13" width="4" height="17" fill="#19475c" />
      <rect x="20" y="35" width="14" height="49" fill="#27546a" />
      <rect x="36" y="15" width="13" height="69" fill="#1c465c" />
      <rect x="41" y="8" width="3" height="9" fill="#1c465c" />
      <rect x="53" y="29" width="14" height="55" fill="#2b5667" />
      <rect x="69" y="22" width="14" height="62" fill="#143f56" />
      <path
        d="M0 75C24 69 34 80 52 73S70 75 82 69V84H0Z"
        fill="#123246"
        opacity=".8"
      />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <rect
            key={`${row}-${col}`}
            x={4 + col * 16}
            y={38 + row * 9}
            width="2"
            height="3"
            fill="#ffc986"
            opacity=".72"
          />
        )),
      )}
    </svg>
  );
}

function RecentReport({
  report,
}: {
  report: DashboardData["reports"][number];
}) {
  return (
    <Link
      href={`/admin/weekly-outlooks/${report.id}/edit`}
      data-admin-searchable
      data-admin-search-label={`${report.title} ${report.edition} ${statusLabel[report.status]}`}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#e3edf1] bg-[#fcfeff] p-3 transition hover:border-[#a8d3df] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#168aa7]"
    >
      <CityThumbnail />
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-[11px] font-black leading-6 text-[#193d50] transition group-hover:text-[#087897] sm:text-[12px]">
          {report.title}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] leading-5 text-[#819cac]">
          <CalendarDays size={12} aria-hidden="true" />
          {formatDate(report.reportDate)}
          <span className="text-[#b4c4cc]">·</span>
          <span dir="ltr">{report.edition}</span>
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
      data-admin-searchable
      data-admin-search-label={`${form.title} ${form.slug} ${statusLabel[form.status]}`}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#e4edf1] bg-[#fcfeff] px-3 py-3.5 transition hover:border-[#add3df] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#168aa7]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf6fb] text-[#178bb3]">
        <ClipboardList size={19} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-extrabold text-[#1b4154] transition group-hover:text-[#0d829f]">
          {form.title}
        </span>
        <span className="mt-1 block truncate text-[10px] text-[#90a3b1]">
          <span dir="ltr" className="inline-block">
            /forms/{form.slug}
          </span>
          <span className="px-1">·</span>
          <span dir="ltr" className="inline-block">
            REV {String(form.revision).padStart(2, "0")}
          </span>
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
      ? "border-[#bcebd7] bg-[#e3faf0] text-[#11956b]"
      : tone === "muted"
        ? "border-slate-200 bg-slate-100 text-slate-600"
        : tone === "brand"
          ? "border-[#bde3ee] bg-[#e7f7fc] text-[#15809b]"
          : "border-orange-200 bg-orange-50 text-orange-700";
  return (
    <span
      className={`shrink-0 rounded-md border px-2 py-1 text-[9px] font-black sm:text-[10px] ${className}`}
    >
      {children}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-dashed border-[#dae8ee] bg-[#fbfdfe] px-5 py-6 text-center">
      <BarChart3
        size={25}
        strokeWidth={1.65}
        className="text-[#9ec6d2]"
        aria-hidden="true"
      />
      <p className="mt-3 text-xs font-semibold leading-6 text-[#88a1af]">
        {text}
      </p>
      <Link
        href="/admin"
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-extrabold text-[#1484a5] hover:text-[#075d7a]"
      >
        بازگشت به نمای کلی <ArrowUpLeft size={13} />
      </Link>
    </div>
  );
}

const userColumns: AdminTableColumn<DashboardData["users"][number]>[] = [
  {
    key: "name",
    header: "نام",
    cell: (user) => (
      <span className="font-bold text-[#1b3e51]">
        {user.firstName} {user.lastName}
      </span>
    ),
  },
  {
    key: "phone",
    header: "موبایل",
    cell: (user) => (
      <span dir="ltr" className="text-right text-[#718b9c]">
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
      <span className="text-[#718b9c]">{formatDateTime(user.createdAt)}</span>
    ),
  },
  {
    key: "reference",
    header: "مرجع",
    cell: (user) => (
      <span dir="ltr" className="text-right text-[#718b9c]">
        USR-{user.id.slice(-6).toUpperCase()}
      </span>
    ),
  },
];
