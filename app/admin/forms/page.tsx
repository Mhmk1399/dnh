import type { Metadata } from "next";
import { AdminTablePagination } from "@/components/admin/AdminTablePagination";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import {
  AdminDataTable,
  AdminTableCellPair,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminDynamicForm } from "@/components/admin/AdminDynamicForm";
import {
  FormTableActions,
  type AdminDynamicFormTableRow,
} from "@/components/admin/forms/FormTableActions";
import { AdminStatusBadge, type AdminStatusTone } from "@/components/admin/AdminStatusBadge";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import DynamicForm from "@/models/DynamicForm";
import FormSubmission from "@/models/FormSubmission";

export const metadata: Metadata = { title: "فرم‌های پویا" };
export const dynamic = "force-dynamic";

const statusLabel = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
  archived: "بایگانی",
} as const;

const typeLabel = {
  single_step: "تک‌مرحله‌ای",
  multi_step: "چندمرحله‌ای",
  service_assessment: "ارزیابی خدمت",
} as const;

type FormStatus = keyof typeof statusLabel;

type AdminFormRow = Omit<AdminDynamicFormTableRow, "updatedAt"> & {
  updatedAt: Date;
};

const statusTone: Record<FormStatus, AdminStatusTone> = {
  draft: "accent",
  published: "success",
  archived: "muted",
};

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function FormsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const query = await searchParams;
  const hasFilters = Boolean(query.q?.trim() || query.status);

  let forms: AdminFormRow[] = [];
  let loadError = false;
  const pageSize = 25;
  let page = 1;
  let totalPages = 1;

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
        { serviceName: { $regex: search, $options: "i" } },
      ];
    }

    const total = await DynamicForm.countDocuments(filter);
    totalPages = Math.max(1, Math.ceil(total / pageSize));
    const requestedPage = Number(query.page);
    page = Number.isSafeInteger(requestedPage) ? Math.min(totalPages, Math.max(1, requestedPage)) : 1;
    const rows = await DynamicForm.find(filter)
      .select("title slug status formType serviceName revision updatedAt")
      .sort({ updatedAt: -1, _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const counts = await FormSubmission.aggregate<{
      _id: unknown;
      count: number;
    }>([
      { $match: { formId: { $in: rows.map((row) => row._id) } } },
      { $group: { _id: "$formId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(
      counts.map((item) => [String(item._id), item.count]),
    );

    forms = rows.map((row) => ({
      id: String(row._id),
      title: row.title,
      slug: row.slug,
      status: row.status,
      formType: row.formType,
      serviceName: row.serviceName,
      revision: row.revision,
      updatedAt: row.updatedAt,
      submissions: countMap.get(String(row._id)) ?? 0,
    }));
  } catch {
    loadError = true;
  }

  return (
    <section className="space-y-7">
      <header className="flex flex-col gap-5 border border-line bg-white/90 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/admin" className="text-xs font-black text-brand-primary">
            دفتر مدیریت / بازگشت
          </Link>
          <p
            className="mt-5 text-[10px] font-black text-brand-primary"
          >
            مدیریت فرم‌های پویا
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
            فرم‌های دریافت سرنخ
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            پروتکل‌های چندمرحله‌ای هر خدمت را طراحی، منتشر و پاسخ‌های
            نسخه‌بندی‌شده را بررسی کنید.
          </p>
        </div>

        <Link
          href="/admin/forms/new"
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand-accent px-5 py-3 text-xs font-black text-white transition hover:bg-[#ec7d01] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
        >
          <Plus size={16} aria-hidden="true" />
          ساخت فرم جدید
        </Link>
      </header>

      <AdminDynamicForm
        submitLabel="اعمال فیلتر"
        resetHref={hasFilters ? "/admin/forms" : undefined}
        fields={[
          {
            type: "search",
            name: "q",
            label: "جست‌وجو",
            defaultValue: query.q,
            placeholder: "عنوان، مسیر یا خدمت",
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
          دریافت فرم‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : (
        <AdminDataTable
          title="لیست فرم‌ها"
          code="جدول فرم‌ها"
          rows={forms}
          getRowId={(form) => form.id}
          columns={formColumns}
          emptyTitle="فرمی در این پرونده نیست"
          emptyDescription="یک فرم جدید بسازید یا فیلترها را تغییر دهید."
          minWidth={980}
          actions={[
            {
              type: "custom",
              label: "عملیات فرم",
              render: (form, compact) => (
                <FormTableActions
                  form={{
                    ...form,
                    updatedAt: form.updatedAt.toISOString(),
                  }}
                  compact={compact}
                />
              ),
            },
          ]}
        />
      )}
      {!loadError && <AdminTablePagination basePath="/admin/forms" page={page} totalPages={totalPages} filters={{ q: query.q, status: query.status }} />}
    </section>
  );
}

const formColumns: AdminTableColumn<AdminFormRow>[] = [
  {
    key: "form",
    header: "فرم / مسیر عمومی",
    cell: (form) => (
      <AdminTableCellPair>
        <span className="text-sm font-bold leading-6 text-ink">{form.title}</span>
        <bdi dir="ltr" title={`/forms/${form.slug}`} className="max-w-full text-[11px] text-ink-muted lg:max-w-56 lg:truncate">
          /forms/{form.slug}
        </bdi>
      </AdminTableCellPair>
    ),
  },
  {
    key: "service",
    header: "خدمت مرتبط",
    cell: (form) => (
      <span className="text-xs leading-6 text-ink-muted">
        {form.serviceName}
      </span>
    ),
  },
  {
    key: "type",
    header: "نوع / وضعیت",
    cell: (form) => (
      <AdminTableCellPair>
        <AdminStatusBadge tone={statusTone[form.status]}>
          {statusLabel[form.status]}
        </AdminStatusBadge>
        <span className="text-[11px] text-ink-muted">
          {typeLabel[form.formType]}
        </span>
      </AdminTableCellPair>
    ),
  },
  {
    key: "revision",
    header: "نسخه / پاسخ",
    cell: (form) => (
      <AdminTableCellPair>
        <span className="text-xs font-bold text-ink">
          نسخه {String(form.revision).padStart(2, "0")}
        </span>
        <span className="text-xs text-ink-muted">
          {form.submissions.toLocaleString("fa-IR")} پاسخ
        </span>
      </AdminTableCellPair>
    ),
  },
  {
    key: "updatedAt",
    header: "آخرین تغییر",
    cell: (form) => (
      <span className="text-[10px] leading-6 text-ink-muted">
        {dateFormatter.format(form.updatedAt)}
      </span>
    ),
  },
];
