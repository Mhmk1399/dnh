import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UsersRound } from "lucide-react";

import {
  AdminDataTable,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminDynamicForm } from "@/components/admin/AdminDynamicForm";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { UserTableActions } from "@/components/admin/users/UserTableActions";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "کاربران | مدیریت DNH" };
export const dynamic = "force-dynamic";

type AdminUserRow = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");
  if (currentUser.role !== "admin") redirect("/dashboard");

  const query = await searchParams;
  const hasFilters = Boolean(query.q?.trim() || query.role);
  let users: AdminUserRow[] = [];
  let loadError = false;

  try {
    await connect();

    const filter: Record<string, unknown> = {};

    if (query.role === "admin" || query.role === "user") {
      filter.role = query.role;
    }

    if (query.q?.trim()) {
      const search = query.q
        .trim()
        .slice(0, 80)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const rows = await User.find(filter)
      .select("firstName lastName phone role createdAt updatedAt")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    users = rows.map((row) => ({
      id: String(row._id),
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      role: row.role,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
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
      
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
            مدیریت کاربران
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            کاربران ثبت‌شده را ببینید، نقش و مشخصات آن‌ها را ویرایش کنید یا
            رکوردهای غیرضروری را حذف کنید.
          </p>
        </div>

        <span className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-white px-5 py-3 text-xs font-black text-ink-muted">
          <UsersRound size={16} aria-hidden="true" />
          {users.length.toLocaleString("fa-IR")} کاربر در این نما
        </span>
      </header>

      <AdminDynamicForm
        submitLabel="اعمال فیلتر"
        resetHref={hasFilters ? "/admin/users" : undefined}
        fields={[
          {
            type: "search",
            name: "q",
            label: "جست‌وجو",
            defaultValue: query.q,
            placeholder: "نام، نام خانوادگی یا موبایل",
          },
          {
            type: "select",
            name: "role",
            label: "نقش",
            defaultValue: query.role,
            options: [
              { value: "", label: "همه نقش‌ها" },
              { value: "user", label: "کاربر" },
              { value: "admin", label: "مدیر" },
            ],
          },
        ]}
      />

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          دریافت کاربران ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : (
        <AdminDataTable
          title="جدول کاربران"
          code="USERS / DATA TABLE"
          rows={users}
          getRowId={(user) => user.id}
          columns={userColumns}
          emptyTitle="کاربری در این نما نیست"
          emptyDescription="فیلترها را تغییر دهید یا پس از ثبت‌نام کاربران دوباره بررسی کنید."
          minWidth={940}
          actions={[
            {
              type: "custom",
              label: "عملیات کاربران",
              render: (user, compact) => (
                <UserTableActions
                  user={{
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    role: user.role,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                  }}
                  canDelete={user.id !== currentUser.id}
                  compact={compact}
                />
              ),
            },
          ]}
        />
      )}
    </section>
  );
}

function formatDateTime(value: Date) {
  return dateTimeFormatter.format(new Date(value));
}

const userColumns: AdminTableColumn<AdminUserRow>[] = [
  {
    key: "name",
    header: "کاربر",
    cell: (user) => (
      <div>
        <p className="text-sm font-black leading-7 text-ink">
          {user.firstName} {user.lastName}
        </p>
        <p dir="ltr" className="mt-1 text-left text-[10px] text-ink-muted">
          USR-{user.id.slice(-6).toUpperCase()}
        </p>
      </div>
    ),
  },
  {
    key: "phone",
    header: "موبایل",
    cell: (user) => (
      <span dir="ltr" className="text-right text-xs font-bold text-ink-muted">
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
      <span className="text-xs leading-6 text-ink-muted">
        {formatDateTime(user.createdAt)}
      </span>
    ),
  },
  {
    key: "updatedAt",
    header: "آخرین تغییر",
    cell: (user) => (
      <span className="text-xs leading-6 text-ink-muted">
        {formatDateTime(user.updatedAt)}
      </span>
    ),
  },
];
