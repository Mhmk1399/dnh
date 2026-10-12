"use client";

import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  Eye,
  FilePenLine,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { AdminModal } from "@/components/admin/AdminModal";
import { adminToast } from "@/components/admin/adminToast";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";

export type AdminUserTableActionUser = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

type UserFormState = Pick<
  AdminUserTableActionUser,
  "firstName" | "lastName" | "phone" | "role"
>;

type FieldErrors = Partial<Record<keyof UserFormState, string>>;

const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export function UserTableActions({
  user,
  canDelete,
  compact = false,
}: {
  user: AdminUserTableActionUser;
  canDelete: boolean;
  compact?: boolean;
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setViewOpen(true)}
        title={compact ? "مشاهده" : undefined}
        aria-label={compact ? `مشاهده ${user.firstName} ${user.lastName}` : undefined}
        className={tableActionButtonClass({ compact })}
      >
        <Eye size={15} aria-hidden="true" />
        {compact ? null : "مشاهده"}
      </button>

      <button
        type="button"
        onClick={() => setEditOpen(true)}
        title={compact ? "ویرایش" : undefined}
        aria-label={compact ? `ویرایش ${user.firstName} ${user.lastName}` : undefined}
        className={tableActionButtonClass({ compact, primary: true })}
      >
        <FilePenLine size={15} aria-hidden="true" />
        {compact ? null : "ویرایش"}
      </button>

      {canDelete ? (
        <DeleteRecordButton
          endpoint={`/api/admin/users/${user.id}`}
          title={`حذف کاربر «${user.firstName} ${user.lastName}»`}
          description={`این عملیات حساب کاربری ${user.phone} و نشست‌های فعال آن را حذف می‌کند و قابل بازگشت نیست.`}
          compact={compact}
        />
      ) : null}

      <AdminModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        eyebrow="USER / VIEW"
        title={`جزئیات ${user.firstName} ${user.lastName}`}
        size="md"
      >
        <UserViewPanel user={user} />
      </AdminModal>

      <AdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        eyebrow="USER / QUICK EDIT"
        title="ویرایش سریع کاربر"
        size="lg"
      >
        <UserQuickEditForm user={user} />
      </AdminModal>
    </>
  );
}

function tableActionButtonClass({
  compact,
  primary = false,
}: {
  compact: boolean;
  primary?: boolean;
}) {
  return `
    inline-flex
    cursor-pointer
    items-center
    justify-center
    gap-2
    rounded-[14px]
    border
    text-xs
    font-black
    transition
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-focus/20

    ${
      primary
        ? "border-brand-primary bg-brand-primary text-white hover:bg-brand-secondary"
        : "border-line bg-white text-ink hover:border-brand-accent hover:text-brand-primary"
    }

    ${compact ? "h-9 w-9" : "min-h-10 px-3 py-2"}
  `;
}

function UserViewPanel({ user }: { user: AdminUserTableActionUser }) {
  return (
    <div className="p-5">
      <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2">
        <UserViewItem
          icon={UserRound}
          label="نام و نام خانوادگی"
          value={`${user.firstName} ${user.lastName}`}
          code={`USR-${user.id.slice(-6).toUpperCase()}`}
        />
        <UserViewItem
          icon={Phone}
          label="موبایل"
          value={user.phone}
          ltr
        />
        <UserViewItem
          icon={ShieldCheck}
          label="نقش"
          value={
            <AdminStatusBadge tone={user.role === "admin" ? "accent" : "brand"}>
              {user.role === "admin" ? "مدیر" : "کاربر"}
            </AdminStatusBadge>
          }
        />
        <UserViewItem
          icon={CalendarClock}
          label="آخرین تغییر"
          value={formatDateTime(user.updatedAt)}
        />
        <UserViewItem
          icon={CalendarClock}
          label="تاریخ ثبت"
          value={formatDateTime(user.createdAt)}
          wide
        />
      </div>
    </div>
  );
}

function UserViewItem({
  icon: Icon,
  label,
  value,
  code,
  ltr = false,
  wide = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: ReactNode;
  code?: string;
  ltr?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`bg-white p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 text-[10px] font-black text-ink-muted">
        <Icon size={14} aria-hidden="true" />
        {label}
      </div>

      <div
        dir={ltr ? "ltr" : "rtl"}
        className={`mt-3 text-sm font-black leading-7 text-ink ${ltr ? "text-left" : ""}`}
      >
        {value || "—"}
      </div>

      {code ? (
        <p
          dir="ltr"
          className="mt-3 text-[10px] font-bold tracking-[0.16em] text-ink-muted/70"
        >
          {code}
        </p>
      ) : null}
    </div>
  );
}

function UserQuickEditForm({ user }: { user: AdminUserTableActionUser }) {
  const router = useRouter();
  const [form, setForm] = useState<UserFormState>({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role,
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    setFieldErrors({});
    const toastId = adminToast.loading("در حال ذخیره تغییرات کاربر...");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        errors?: FieldErrors;
      } | null;

      if (!response.ok) {
        setFieldErrors(payload?.errors ?? {});
        throw new Error(payload?.message || "ذخیره کاربر انجام نشد.");
      }

      const successMessage = payload?.message ?? "اطلاعات کاربر ذخیره شد.";

      adminToast.dismiss(toastId);
      adminToast.success(successMessage);
      setMessage(successMessage);
      router.refresh();
    } catch (submitError) {
      const errorMessage =
        submitError instanceof Error
          ? submitError.message
          : "خطای پیش‌بینی‌نشده در ذخیره.";

      adminToast.dismiss(toastId);
      adminToast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 p-5 md:grid-cols-2">
        <UserField label="نام" error={fieldErrors.firstName}>
          <input
            value={form.firstName}
            onChange={(event) =>
              setForm((value) => ({ ...value, firstName: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.firstName)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField label="نام خانوادگی" error={fieldErrors.lastName}>
          <input
            value={form.lastName}
            onChange={(event) =>
              setForm((value) => ({ ...value, lastName: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.lastName)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField label="شماره موبایل" error={fieldErrors.phone}>
          <input
            dir="ltr"
            value={form.phone}
            inputMode="tel"
            onChange={(event) =>
              setForm((value) => ({ ...value, phone: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.phone)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-left text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField label="نقش" error={fieldErrors.role}>
          <select
            value={form.role}
            onChange={(event) =>
              setForm((value) => ({
                ...value,
                role: event.target.value === "admin" ? "admin" : "user",
              }))
            }
            aria-invalid={Boolean(fieldErrors.role)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          >
            <option value="user">کاربر</option>
            <option value="admin">مدیر</option>
          </select>
        </UserField>
      </div>

      {error || message ? (
        <div className="px-5 pb-5">
          <p
            role={error ? "alert" : "status"}
            className={`rounded-[14px] border p-3 text-xs leading-6 ${
              error
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {error || message}
          </p>
        </div>
      ) : null}

      <footer className="sticky bottom-0 flex justify-end gap-2 border-t border-line bg-white/95 p-4 backdrop-blur-xl">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-brand-primary px-5 py-2.5 text-xs font-black text-white transition hover:bg-brand-secondary disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
        >
          <Save size={15} aria-hidden="true" />
          {busy ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </footer>
    </form>
  );
}

function UserField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-ink">
      {label}
      {children}
      {error ? (
        <span className="mt-2 block text-[11px] leading-5 text-red-700">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}
