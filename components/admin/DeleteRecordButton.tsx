"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { AdminModal } from "@/components/admin/AdminModal";
import { adminToast } from "@/components/admin/adminToast";

type DeleteRecordButtonProps = {
  endpoint: string;
  title: string;
  description: string;
  confirmLabel?: string;
  compact?: boolean;
};

export function DeleteRecordButton({
  endpoint,
  title,
  description,
  confirmLabel = "حذف",
  compact = false,
}: DeleteRecordButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function closeDialog() {
    if (pending) return;

    setOpen(false);
    setError("");
  }

  async function deleteRecord() {
    setPending(true);
    setError("");
    const toastId = adminToast.loading("در حال حذف رکورد...");

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "حذف انجام نشد.");
      }

      adminToast.dismiss(toastId);
      adminToast.success(payload?.message || "رکورد با موفقیت حذف شد.");
      setOpen(false);
      router.refresh();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "خطای پیش‌بینی‌نشده در حذف.";

      adminToast.dismiss(toastId);
      adminToast.error(message);
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={title}
        title={compact ? title : undefined}
        className={`
          inline-flex
          cursor-pointer
          items-center
          justify-center
          gap-2
          rounded-[14px]
          border
          border-red-200
          bg-white
          text-xs
          font-black
          text-red-700
          transition
          hover:border-red-400
          hover:bg-red-50
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-red-200/60

          ${compact ? "h-9 w-9" : "min-h-10 px-3 py-2"}
        `}
      >
        <Trash2 size={15} aria-hidden="true" />
        {compact ? null : "حذف"}
      </button>

      <AdminModal
        open={open}
        onClose={closeDialog}
        eyebrow="DELETE / RECORD"
        title={title}
        size="sm"
        tone="danger"
      >
        <div className="p-5">
          <p className="text-sm leading-7 text-ink-muted">{description}</p>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-[14px] border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-800"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              data-autofocus
              onClick={closeDialog}
              disabled={pending}
              className="
                min-h-11
                cursor-pointer
                rounded-[14px]
                border
                border-line
                bg-white
                px-4
                py-2.5
                text-xs
                font-black
                text-ink
                transition
                hover:border-brand-primary
                disabled:pointer-events-none
                disabled:opacity-45
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-focus/20
              "
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={deleteRecord}
              disabled={pending}
              className="
                min-h-11
                cursor-pointer
                rounded-[14px]
                bg-red-700
                px-5
                py-2.5
                text-xs
                font-black
                text-white
                transition
                hover:bg-red-800
                disabled:pointer-events-none
                disabled:opacity-60
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-red-200
              "
            >
              {pending ? "در حال حذف..." : confirmLabel}
            </button>
          </div>
        </div>
      </AdminModal>
    </>
  );
}
