import type { Metadata } from "next";
import Link from "next/link";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, FilePenLine } from "lucide-react";

import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import { AdminRecordView } from "@/components/admin/AdminRecordView";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import Session from "@/lib/models/Session";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "نمایش کاربر | مدیریت DNH" };
export const dynamic = "force-dynamic";

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function AdminUserViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");
  if (currentUser.role !== "admin") redirect("/dashboard");

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) notFound();

  await connect();

  const [user, sessionCount] = await Promise.all([
    User.findById(id)
      .select("firstName lastName phone role createdAt updatedAt")
      .lean(),
    Session.countDocuments({ userId: id }),
  ]);

  if (!user) notFound();

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <section className="mx-auto max-w-[980px] space-y-7">
      <header className="flex flex-col gap-5 border border-line bg-white/90 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-xs font-black text-brand-primary"
          >
            <ArrowRight size={14} aria-hidden="true" />
            کاربران / بازگشت
          </Link>
          <p
            dir="ltr"
            className="mt-5 text-[10px] font-black tracking-[0.22em] text-brand-primary"
          >
            USER / VIEW
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
            {fullName}
          </h1>
          <p dir="ltr" className="mt-3 text-left text-sm text-ink-muted">
            {user.phone}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/users/${id}/edit`}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-brand-primary px-5 py-2.5 text-xs font-black text-white transition hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
          >
            <FilePenLine size={15} aria-hidden="true" />
            ویرایش
          </Link>

          {currentUser.id !== id ? (
            <DeleteRecordButton
              endpoint={`/api/admin/users/${id}`}
              title={`حذف کاربر «${fullName}»`}
              description={`این عملیات حساب کاربری ${user.phone} و نشست‌های فعال آن را حذف می‌کند و قابل بازگشت نیست.`}
            />
          ) : null}
        </div>
      </header>

      <AdminRecordView
        defaultOpen
        code={`USR-${id.slice(-6).toUpperCase()}`}
        title="پرونده کاربر"
        description="اطلاعات ثبت‌نام و وضعیت دسترسی این کاربر در پنل مدیریت."
        items={[
          {
            label: "نام کامل",
            value: fullName,
          },
          {
            label: "نقش",
            value: (
              <AdminStatusBadge tone={user.role === "admin" ? "accent" : "brand"}>
                {user.role === "admin" ? "مدیر" : "کاربر"}
              </AdminStatusBadge>
            ),
          },
          {
            label: "شماره موبایل",
            value: user.phone,
            code: "PHONE",
          },
          {
            label: "نشست‌های فعال",
            value: `${sessionCount.toLocaleString("fa-IR")} نشست`,
            code: "ACTIVE SESSIONS",
          },
          {
            label: "تاریخ ثبت‌نام",
            value: formatDateTime(user.createdAt),
          },
          {
            label: "آخرین تغییر",
            value: formatDateTime(user.updatedAt),
          },
        ]}
      />
    </section>
  );
}

function formatDateTime(value: Date) {
  return dateTimeFormatter.format(new Date(value));
}
