import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Inbox } from "lucide-react";

import {
  AdminDataTable,
  AdminTableCellPair,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminDynamicForm } from "@/components/admin/AdminDynamicForm";
import {
  IntakeTableActions,
  type IntakeActionRecord,
} from "@/components/admin/intake/IntakeTableActions";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { intakeSources, intakeTypes, isIntakeType, type IntakeType } from "@/lib/admin-intake";
import { AdminTablePagination } from "@/components/admin/AdminTablePagination";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

type IntakeRow = IntakeActionRecord & {
  contact: string;
  summary: string;
  createdAt: Date;
};

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const config = isIntakeType(type) ? intakeSources[type] : undefined;

  return {
    title: config?.title ?? "ورودی‌ها و لیدها",
    robots: { index: false, follow: false },
  };
}

export default async function IntakeTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const { type } = await params;
  if (!isIntakeType(type)) notFound();
  const config = intakeSources[type];
  const query = await searchParams;
  const search = query.q?.trim().slice(0, 100) ?? "";
  const requestedPage = Number.parseInt(query.page ?? "1", 10);
  let page = Number.isSafeInteger(requestedPage) ? Math.max(1, requestedPage) : 1;

  let rows: IntakeRow[] = [];
  let total = 0;
  let loadError = false;

  try {
    await connect();
    total = await config.count(search);
    page = Math.min(page, Math.max(1, Math.ceil(total / PAGE_SIZE)));
    const records = await config.list(search, (page - 1) * PAGE_SIZE, PAGE_SIZE);
    const userIds = [...new Set(records.flatMap(record => record.userId ? [record.userId] : []))];
    const users = userIds.length
      ? await User.find({ _id: { $in: userIds } })
          .select("firstName lastName phone")
          .lean()
      : [];
    const userMap = new Map(
      users.map((item) => [
        String(item._id),
        `${item.firstName} ${item.lastName} · ${item.phone}`,
      ]),
    );

    rows = records.map((record) => ({
      ...record,
      user: record.userId ? userMap.get(record.userId) : undefined,
      createdAtLabel: dateTimeFormatter.format(record.createdAt),
      updatedAtLabel: dateTimeFormatter.format(record.updatedAt ?? record.createdAt),
    }));
  } catch {
    loadError = true;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="space-y-6">
      <header className="border border-line bg-white/92 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7">
        <Link
          href="/admin/intake"
          className="inline-flex items-center gap-2 text-xs font-black text-brand-primary"
        >
          <ArrowRight size={14} aria-hidden="true" />
          ورودی‌ها و لیدها
        </Link>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.14em] text-brand-primary">
              {config.prefix}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              {config.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              {config.description}
            </p>
          </div>
          <div className="flex items-center gap-3 border border-line bg-surface-soft px-4 py-3">
            <Inbox
              size={18}
              className="text-brand-primary"
              aria-hidden="true"
            />
            <span className="text-xs font-black text-ink">
              {total.toLocaleString("fa-IR")} رکورد
            </span>
          </div>
        </div>
      </header>

      <IntakeTypeNavigation active={type} />

      <AdminDynamicForm
        submitLabel="جست‌وجو"
        resetHref={search ? `/admin/intake/${type}` : undefined}
        fields={[
          {
            type: "search",
            name: "q",
            label: "جست‌وجوی درخواست",
            defaultValue: search,
            placeholder: "کد پیگیری، نام، اطلاعات تماس یا متن درخواست",
          },
        ]}
      />

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          دریافت اطلاعات ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : (
        <>
          <AdminDataTable
            title={config.title}
            code={`صفحه ${page.toLocaleString("fa-IR")} از ${totalPages.toLocaleString("fa-IR")}`}
            rows={rows}
            getRowId={(record) => record.id}
            columns={intakeColumns}
            minWidth={1020}
            emptyTitle="رکوردی برای نمایش وجود ندارد"
            emptyDescription="هنوز ورودی‌ای ثبت نشده یا عبارت جست‌وجو نتیجه‌ای ندارد."
            actions={[
              {
                type: "custom",
                label: "مشاهده جزئیات",
                render: (record, compact) => (
                  <IntakeTableActions record={record} compact={compact} />
                ),
              },
              {
                type: "delete",
                label: "حذف",
                endpoint: (record) => `/api/admin/intake/${type}/${record.id}`,
                title: (record) => `حذف رکورد «${record.title}»`,
                description: () =>
                  "این ورودی برای همیشه از پایگاه داده حذف می‌شود و قابل بازگشت نیست.",
              },
            ]}
          />

          <AdminTablePagination basePath={`/admin/intake/${type}`} page={page} totalPages={totalPages} filters={{ q: search }} />
        </>
      )}
    </section>
  );
}

const intakeColumns: AdminTableColumn<IntakeRow>[] = [
  {
    key: "record",
    header: "رکورد",
    cell: (record) => (
      <AdminTableCellPair>
        <span className="text-sm font-bold leading-6 text-ink">
          {record.title}
        </span>
        <bdi
          dir="ltr"
          className="text-[11px] text-ink-muted"
        >
          {record.code}
        </bdi>
      </AdminTableCellPair>
    ),
  },
  {
    key: "contact",
    header: "اطلاعات تماس",
    cell: (record) => (
      <span dir="auto" className="break-all text-xs font-bold text-ink">
        {record.contact || "—"}
      </span>
    ),
  },
  {
    key: "summary",
    header: "خلاصه درخواست",
    cell: (record) => (
      <span title={record.summary || undefined} className="line-clamp-2 max-w-[300px] text-xs leading-6 text-ink-muted lg:block lg:truncate">
        {record.summary || "—"}
      </span>
    ),
  },
  {
    key: "user",
    header: "کاربر / زبان",
    cell: (record) => (
      <AdminTableCellPair>
        <span className="text-xs text-ink-muted">{record.user ?? "ارسال عمومی"}</span>
        {record.locale ? (
          <span className="text-[11px] text-ink-muted">
            {record.locale === "fa" ? "فرم فارسی" : "فرم انگلیسی"}
          </span>
        ) : null}
      </AdminTableCellPair>
    ),
  },
  {
    key: "createdAt",
    header: "زمان ثبت",
    cell: (record) => (
      <time
        dateTime={record.createdAt.toISOString()}
        className="text-[11px] leading-6 text-ink-muted"
      >
        {record.createdAtLabel}
      </time>
    ),
  },
];

function IntakeTypeNavigation({ active }: { active: IntakeType }) {
  return (
    <nav
      aria-label="انواع ورودی سایت"
      className="grid gap-2 border border-line bg-white/85 p-2 sm:grid-cols-2 xl:grid-cols-3"
    >
      {intakeTypes.map((type) => (
        <Link
          key={type}
          href={`/admin/intake/${type}`}
          aria-current={active === type ? "page" : undefined}
          className={`min-h-11 px-4 py-3 text-center text-xs font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 ${
            active === type
              ? "bg-brand-primary text-brand-secondary"
              : "border border-line bg-white text-ink hover:border-brand-primary hover:bg-surface-soft"
          }`}
        >
          {intakeSources[type].title}
        </Link>
      ))}
    </nav>
  );
}
