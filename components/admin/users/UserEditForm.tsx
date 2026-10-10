"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Save } from "lucide-react";

import { adminToast } from "@/components/admin/adminToast";

export type AdminEditableUser = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "user" | "admin";
};

type FieldErrors = Partial<Record<keyof Omit<AdminEditableUser, "id">, string>>;

export function UserEditForm({
  user,
}: {
  user: AdminEditableUser;
}) {
  const router = useRouter();
  const [form, setForm] = useState(user);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      const payload = (await response.json()) as {
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok) {
        setFieldErrors(payload.errors ?? {});
        throw new Error(payload.message || "ذخیره کاربر انجام نشد.");
      }

      const successMessage = payload.message ?? "اطلاعات کاربر ذخیره شد.";

      adminToast.dismiss(toastId);
      adminToast.success(successMessage);
      setMessage(successMessage);
      router.refresh();
    } catch (submitError) {
      const errorMessage =
        submitError instanceof Error
          ? submitError.message
          : "خطای پیش‌بینی‌نشده";

      adminToast.dismiss(toastId);
      adminToast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="border border-line bg-white/92 shadow-[0_18px_52px_rgba(3,45,59,0.05)] backdrop-blur-xl"
    >
      <header className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            dir="ltr"
            className="text-[10px] font-black tracking-[0.2em] text-brand-primary"
          >
            USER / EDIT
          </p>
          <h1 className="mt-1 text-xl font-black text-ink">
            ویرایش کاربر
          </h1>
        </div>

        <Link
          href={`/admin/users/${user.id}`}
          className="inline-flex min-h-10 items-center justify-center gap-2 border border-line bg-white px-3 py-2 text-xs font-black text-ink-muted transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
        >
          <ArrowRight size={14} aria-hidden="true" />
          بازگشت به نمایش
        </Link>
      </header>

      <div className="grid gap-5 p-5 md:grid-cols-2">
        <UserField
          label="نام"
          error={fieldErrors.firstName}
        >
          <input
            value={form.firstName}
            onChange={(event) =>
              setForm((value) => ({ ...value, firstName: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.firstName)}
            className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField
          label="نام خانوادگی"
          error={fieldErrors.lastName}
        >
          <input
            value={form.lastName}
            onChange={(event) =>
              setForm((value) => ({ ...value, lastName: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.lastName)}
            className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField
          label="شماره موبایل"
          error={fieldErrors.phone}
        >
          <input
            dir="ltr"
            value={form.phone}
            inputMode="tel"
            onChange={(event) =>
              setForm((value) => ({ ...value, phone: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors.phone)}
            className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-left text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </UserField>

        <UserField
          label="نقش"
          error={fieldErrors.role}
        >
          <select
            value={form.role}
            onChange={(event) =>
              setForm((value) => ({
                ...value,
                role: event.target.value === "admin" ? "admin" : "user",
              }))
            }
            aria-invalid={Boolean(fieldErrors.role)}
            className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
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
            className={`border p-3 text-xs leading-6 ${
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
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-brand-primary px-5 py-2.5 text-xs font-black text-white transition hover:bg-brand-secondary disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
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
  children: React.ReactNode;
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
