"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";

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
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const closeDialog = useCallback(() => {
    if (pending) return;

    setOpen(false);
    setError("");
  }, [pending]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    cancelRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      event.preventDefault();
      closeDialog();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, open]);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    closeDialog();
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

      {open ? (
        <div
          dir="rtl"
          className="
            fixed
            inset-0
            z-[9000]
            grid
            place-items-center
            bg-[#02151d]/55
            p-4
            backdrop-blur-[6px]
          "
          onClick={handleBackdropClick}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-record-title"
            aria-describedby="delete-record-description"
            className="
              h-fit
              max-h-[calc(100dvh-32px)]
              w-[min(440px,calc(100vw-28px))]
              overflow-y-auto
              border
              border-line
              bg-white
              text-ink
              shadow-[0_28px_90px_rgba(3,45,59,0.24)]
            "
          >
            <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  dir="ltr"
                  className="text-[10px] font-black tracking-[0.22em] text-red-700"
                >
                  DELETE / RECORD
                </p>
                <h2
                  id="delete-record-title"
                  className="mt-2 text-lg font-black leading-8"
                >
                  {title}
                </h2>
              </div>

              <button
                ref={cancelRef}
                type="button"
                onClick={closeDialog}
                disabled={pending}
                className="
                  grid
                  h-10
                  w-10
                  cursor-pointer
                  place-items-center
                  border
                  border-line
                  text-ink-muted
                  transition
                  hover:border-brand-primary
                  hover:text-ink
                  disabled:pointer-events-none
                  disabled:opacity-40
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-focus/20
                "
                aria-label="بستن پنجره حذف"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <p
              id="delete-record-description"
              className="mt-4 text-sm leading-7 text-ink-muted"
            >
              {description}
            </p>

            {error ? (
              <p
                role="alert"
                className="mt-4 border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-800"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDialog}
                disabled={pending}
                className="
                  min-h-11
                  cursor-pointer
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
          </section>
        </div>
      ) : null}
    </>
  );
}
