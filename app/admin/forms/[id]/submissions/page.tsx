import type { Metadata } from "next";
import Link from "next/link";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Inbox } from "lucide-react";

import {
  AdminDataTable,
  type AdminTableColumn,
} from "@/components/admin/AdminDataTable";
import { AdminRecordView } from "@/components/admin/AdminRecordView";
import {
  AdminStatusBadge,
  type AdminStatusTone,
} from "@/components/admin/AdminStatusBadge";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import DynamicForm from "@/lib/models/DynamicForm";
import FormSubmission from "@/lib/models/FormSubmission";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "پاسخ‌های فرم | مدیریت DNH" };
export const dynamic = "force-dynamic";

type SubmissionStatus = "new" | "read" | "archived";

type SubmissionRow = {
  id: string;
  reference: string;
  formRevision: number;
  status: SubmissionStatus;
  createdAt: Date;
  user?: string;
  answers: Array<{
    fieldId: string;
    label: string;
    type: string;
    value: string | string[] | boolean;
  }>;
};

const statusLabel: Record<SubmissionStatus, string> = {
  new: "جدید",
  read: "خوانده‌شده",
  archived: "بایگانی",
};

const statusTone: Record<SubmissionStatus, AdminStatusTone> = {
  new: "success",
  read: "brand",
  archived: "muted",
};

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");
  if (currentUser.role !== "admin") redirect("/dashboard");

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) notFound();

  let form: {
    title: string;
    slug: string;
    serviceName: string;
    revision: number;
  } | null = null;
  let rows: SubmissionRow[] = [];
  let loadError = false;

  try {
    await connect();

    const formRow = await DynamicForm.findById(id)
      .select("title slug serviceName revision")
      .lean();

    if (!formRow) notFound();

    form = {
      title: formRow.title,
      slug: formRow.slug,
      serviceName: formRow.serviceName,
      revision: formRow.revision,
    };

    const submissions = await FormSubmission.find({ formId: id })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    const userIds = [
      ...new Set(
        submissions
          .map((item) => (item.userId ? String(item.userId) : ""))
          .filter(Boolean),
      ),
    ];
    const users = userIds.length
      ? await User.find({ _id: { $in: userIds } })
          .select("firstName lastName phone")
          .lean()
      : [];
    const userMap = new Map(
      users.map((user) => [
        String(user._id),
        `${user.firstName} ${user.lastName} · ${user.phone}`,
      ]),
    );

    rows = submissions.map((item) => ({
      id: String(item._id),
      reference: item.reference,
      formRevision: item.formRevision,
      status: item.status,
      createdAt: item.createdAt,
      user: item.userId ? userMap.get(String(item.userId)) : undefined,
      answers: item.answers.map((answer) => ({
        fieldId: answer.fieldId,
        label: answer.label,
        type: answer.type,
        value: answer.value,
      })),
    }));
  } catch {
    loadError = true;
  }

  if (!form && !loadError) notFound();

  return (
    <section className="mx-auto max-w-[1320px] space-y-7">
      <header className="border border-line bg-white/90 p-5 shadow-[0_18px_52px_rgba(3,45,59,0.06)] backdrop-blur-xl sm:p-7">
        <Link
          href={`/admin/forms/${id}/edit`}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary"
        >
          <ArrowRight size={14} aria-hidden="true" />
          بازگشت به ویرایش فرم
        </Link>

        <p
          dir="ltr"
          className="mt-6 text-[10px] font-black tracking-[0.22em] text-brand-primary"
        >
          SUBMISSION DOSSIER / MAX 200
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-ink">
              {form?.title ?? "پاسخ‌های فرم"}
            </h1>
            <p className="mt-3 text-sm text-ink-muted">
              {form?.serviceName} · نسخه فعلی{" "}
              {form?.revision.toLocaleString("fa-IR")}
            </p>
          </div>

          <span className="border border-line bg-white px-4 py-2 text-xs font-black">
            {rows.length.toLocaleString("fa-IR")} پاسخ اخیر
          </span>
        </div>
      </header>

      {loadError ? (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          دریافت پاسخ‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.
        </div>
      ) : rows.length === 0 ? (
        <div className="border border-dashed border-line bg-white py-20 text-center">
          <Inbox className="mx-auto h-10 w-10 text-brand-primary/30" />
          <h2 className="mt-5 text-lg font-black">هنوز پاسخی ثبت نشده است</h2>
          <p className="mt-2 text-sm text-ink-muted">
            پس از انتشار و تکمیل فرم، پرونده‌ها اینجا نمایش داده می‌شوند.
          </p>
        </div>
      ) : (
        <>
          <AdminDataTable
            title="جدول پاسخ‌ها"
            code="SUBMISSIONS / DATA TABLE"
            rows={rows}
            getRowId={(submission) => submission.id}
            columns={submissionColumns}
            minWidth={880}
            actions={[
              {
                type: "delete",
                label: "حذف",
                endpoint: (submission) =>
                  `/api/admin/forms/${id}/submissions/${submission.id}`,
                title: (submission) => `حذف پاسخ ${submission.reference}`,
                description: () =>
                  "این پاسخ فرم از پرونده حذف می‌شود و قابل بازگشت نیست.",
              },
            ]}
          />

          <div className="space-y-4">
            <div className="border border-line bg-white/92 px-5 py-4">
              <p
                dir="ltr"
                className="text-[10px] font-black tracking-[0.2em] text-brand-primary"
              >
                SUBMISSIONS / DYNAMIC VIEW
              </p>
              <h2 className="mt-1 text-base font-black text-ink">
                نمایش جزئیات پاسخ‌ها
              </h2>
            </div>

            {rows.map((submission, index) => (
              <AdminRecordView
                key={submission.id}
                defaultOpen={index === 0}
                code={submission.reference}
                title={formatDateTime(submission.createdAt)}
                description={
                  submission.user
                    ? `کاربر واردشده: ${submission.user}`
                    : "ارسال عمومی یا بدون ورود"
                }
                items={submission.answers.map((answer) => ({
                  label: answer.label,
                  value: formatAnswerValue(answer.value),
                  code: `${answer.type} / ${answer.fieldId.slice(-8)}`,
                  wide: answer.type === "textarea",
                }))}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function formatDateTime(value: Date) {
  return dateTimeFormatter.format(new Date(value));
}

function formatAnswerValue(value: string | string[] | boolean) {
  if (typeof value === "boolean") return value ? "بله" : "خیر";
  if (Array.isArray(value)) return value.join("، ");

  return value || "—";
}

const submissionColumns: AdminTableColumn<SubmissionRow>[] = [
  {
    key: "reference",
    header: "مرجع",
    cell: (submission) => (
      <span dir="ltr" className="text-right font-black text-ink">
        {submission.reference}
      </span>
    ),
  },
  {
    key: "status",
    header: "وضعیت",
    cell: (submission) => (
      <AdminStatusBadge tone={statusTone[submission.status]}>
        {statusLabel[submission.status]}
      </AdminStatusBadge>
    ),
  },
  {
    key: "user",
    header: "کاربر",
    cell: (submission) => (
      <span className="text-xs leading-6 text-ink-muted">
        {submission.user ?? "ارسال عمومی"}
      </span>
    ),
  },
  {
    key: "answers",
    header: "پاسخ‌ها",
    cell: (submission) => (
      <span className="text-xs text-ink-muted">
        {submission.answers.length.toLocaleString("fa-IR")} فیلد
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "زمان ثبت",
    cell: (submission) => (
      <span className="text-xs leading-6 text-ink-muted">
        {formatDateTime(submission.createdAt)}
      </span>
    ),
  },
  {
    key: "revision",
    header: "نسخه فرم",
    cell: (submission) => (
      <span dir="ltr" className="font-black text-ink">
        FORM REV / {String(submission.formRevision).padStart(2, "0")}
      </span>
    ),
  },
];
