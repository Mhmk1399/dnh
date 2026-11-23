import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Eye,
  FilePenLine,
  Plus,
} from "lucide-react";

import {
  AdminDataTable,
  AdminTableCellPair,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminDynamicForm } from "@/components/admin/AdminDynamicForm";
import { AdminStatusBadge, type AdminStatusTone } from "@/components/admin/AdminStatusBadge";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import WeeklyOutlookReport from "@/models/WeeklyOutlookReport";
import type {
  WeeklyOutlookDateCalendar,
  WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";
import {
  formatWeeklyOutlookDate,
  normalizeWeeklyOutlookDateCalendar,
  weeklyOutlookDateCalendarLabels,
} from "@/lib/weekly-outlook-date";

export const metadata: Metadata = {
  title: "گزارش‌های هفتگی",
};

export const dynamic = "force-dynamic";

const statusLabel: Record<WeeklyOutlookStatus, string> = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
  archived: "بایگانی",
};

const statusTone: Record<WeeklyOutlookStatus, AdminStatusTone> = {
  draft: "accent",
  published: "success",
  archived: "muted",
};

type ReportRow = {
  _id: unknown;
  title: string;
  slug: string;
  edition: string;
  reportDate: Date;
  dateCalendar?: WeeklyOutlookDateCalendar;
  status: WeeklyOutlookStatus;
  revision: number;
  sections: unknown[];
  english?: { ready: boolean };
  updatedAt: Date;
};

export default async function WeeklyOutlooksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const query = await searchParams;
  const hasFilters = Boolean(query.q?.trim() || query.status);
  let reports: Array<Omit<ReportRow, "_id"> & { id: string }> = [];
  let loadError = false;

  try {
    await connect();

    const filter: Record<string, unknown> = {};

    if (["draft", "published", "archived"].includes(query.status ?? "")) {
      filter.status = query.status;
    }

    if (query.q?.trim()) {
      const search = query.q
        .trim()
        .slice(0, 80)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { edition: { $regex: search, $options: "i" } },
        { "english.title": { $regex: search, $options: "i" } },
        { "english.edition": { $regex: search, $options: "i" } },
      ];
    }

    const rows = await WeeklyOutlookReport.find(filter)
      .select(
        "title slug edition reportDate dateCalendar status revision sections.id english.ready updatedAt",
      )
      .sort({ reportDate: -1, updatedAt: -1 })
      .limit(150)
      .lean();

    reports = (rows as ReportRow[]).map((row) => ({
      ...row,
      id: String(row._id),
    }));
  } catch {
    loadError = true;
  }

  return (
    <section className="space-y-7">
      <header className="relative overflow-hidden border border-line bg-white/90 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7">
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/admin" className="text-xs font-black text-brand-primary">
              دفتر مدیریت / بازگشت
            </Link>
            <p
              dir="ltr"
              className="mt-5 text-[10px] font-black tracking-[0.22em] text-brand-primary"
            >
              میز گزارش‌های هفتگی
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              گزارش‌های چشم‌انداز هفتگی
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              گزارش‌ها را با سکشن، تصویر، نکته و بدنه تحلیلی بسازید و نسخه
              منتشرشده را در سایت نمایش دهید.
            </p>
          </div>

          <Link
            href="/admin/weekly-outlooks/new"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand-accent px-5 py-3 text-xs font-black text-white transition hover:bg-[#ec7d01] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
          >
            <Plus size={16} aria-hidden="true" />
            ساخت گزارش جدید
          </Link>
        </div>
      </header>

      <AdminDynamicForm
        submitLabel="اعمال فیلتر"
        resetHref={hasFilters ? "/admin/weekly-outlooks" : undefined}
        fields={[
          {
            type: "search",
            name: "q",
            label: "جست‌وجو",
            defaultValue: query.q,
            placeholder: "عنوان، مسیر یا نسخه",
          },
          {
            type: "select",
            name: "status",
            label: "وضعیت",
            defaultValue: query.status,
            options: [
              { value: "", label: "همه وضعیت‌ها" },
              { value: "draft", label: "پیش‌نویس" },
              { value: "published", label: "منتشرشده" },
              { value: "archived", label: "بایگانی" },
            ],
          },
        ]}
      />

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          دریافت گزارش‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : (
        <AdminDataTable
          title="لیست گزارش‌ها"
          code="جدول گزارش‌ها"
          rows={reports}
          getRowId={(report) => report.id}
          columns={reportColumns}
          emptyTitle="هنوز گزارشی ساخته نشده است"
          emptyDescription="یک گزارش جدید بسازید یا فیلترها را تغییر دهید."
          minWidth={980}
          actions={[
            {
              type: "link",
              label: "ویرایش",
              href: (report) => `/admin/weekly-outlooks/${report.id}/edit`,
              icon: FilePenLine,
              primary: true,
            },
            {
              type: "link",
              label: "مشاهده نسخه فارسی",
              href: (report) => `/fa/knowledge/weekly-outlook/${report.slug}`,
              icon: Eye,
              hidden: (report) => report.status !== "published",
            },
            {
              type: "delete",
              label: "حذف",
              endpoint: (report) => `/api/admin/weekly-outlooks/${report.id}`,
              title: (report) => `حذف گزارش «${report.title}»`,
              description: (report) =>
                `این عملیات گزارش /knowledge/weekly-outlook/${report.slug} را حذف می‌کند و قابل بازگشت نیست.`,
            },
          ]}
        />
      )}
    </section>
  );
}

const reportColumns: AdminTableColumn<Omit<ReportRow, "_id"> & { id: string }>[] =
  [
    {
      key: "report",
      header: "گزارش / مسیر عمومی",
      cell: (report) => (
        <AdminTableCellPair>
          <span className="text-sm font-bold leading-6 text-ink">
            {report.title}
          </span>
          <bdi dir="ltr" title={`/knowledge/weekly-outlook/${report.slug}`} className="max-w-full text-[11px] text-ink-muted lg:max-w-56 lg:truncate">
            /knowledge/weekly-outlook/{report.slug}
          </bdi>
        </AdminTableCellPair>
      ),
    },
    {
      key: "edition",
      header: "نسخه",
      cell: (report) => (
        <span className="text-xs leading-6 text-ink-muted">
          {report.edition}
        </span>
      ),
    },
    {
      key: "english",
      header: "ترجمه انگلیسی",
      cell: (report) => (
        report.status === "published" && report.english?.ready ? (
          <Link href={`/en/knowledge/weekly-outlook/${report.slug}`} className="inline-flex min-h-11 items-center text-xs font-bold text-brand-accent underline underline-offset-4">
            مشاهده نسخه انگلیسی
          </Link>
        ) : (
          <span className="text-xs text-ink-muted">
            {report.english?.ready ? "آماده انتشار" : report.english ? "پیش‌نویس" : "شروع نشده"}
          </span>
        )
      ),
    },
    {
      key: "date",
      header: "تاریخ",
      cell: (report) => (
        <AdminTableCellPair>
          <span className="text-xs leading-6 text-ink-muted">{formatWeeklyOutlookDate(
            report.reportDate,
            normalizeWeeklyOutlookDateCalendar(report.dateCalendar),
            "medium",
          )}</span>

          <span className="text-[11px] text-ink-muted">
            {
              weeklyOutlookDateCalendarLabels[
                normalizeWeeklyOutlookDateCalendar(report.dateCalendar)
              ]
            }
          </span>
        </AdminTableCellPair>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      cell: (report) => (
        <AdminStatusBadge tone={statusTone[report.status]}>
          {statusLabel[report.status]}
        </AdminStatusBadge>
      ),
    },
    {
      key: "structure",
      header: "ساختار",
      cell: (report) => (
        <AdminTableCellPair>
          <span className="text-xs font-bold text-ink">
            نسخه {String(report.revision).padStart(2, "0")}
          </span>
          <span className="text-xs text-ink-muted">
            {report.sections.length.toLocaleString("fa-IR")} سکشن
          </span>
        </AdminTableCellPair>
      ),
    },
  ];
