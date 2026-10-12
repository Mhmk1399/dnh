"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type AdminModalSize = "sm" | "md" | "lg" | "xl";
type AdminModalTone = "brand" | "danger";

type AdminModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  size?: AdminModalSize;
  tone?: AdminModalTone;
  labelledById?: string;
};

const sizeClass: Record<AdminModalSize, string> = {
  sm: "w-[min(440px,calc(100vw-28px))]",
  md: "w-[min(560px,calc(100vw-28px))]",
  lg: "w-[min(720px,calc(100vw-28px))]",
  xl: "w-[min(920px,calc(100vw-28px))]",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function AdminModal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  size = "md",
  tone = "brand",
  labelledById,
}: AdminModalProps) {
  const generatedTitleId = useId();
  const titleId = labelledById ?? generatedTitleId;
  const surfaceRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      const surface = surfaceRef.current;
      const preferred = surface?.querySelector<HTMLElement>("[data-autofocus]");
      const firstFocusable = surface?.querySelector<HTMLElement>(
        focusableSelector,
      );

      (preferred ?? firstFocusable ?? closeRef.current ?? surface)?.focus({
        preventScroll: true,
      });
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      surfaceRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
        [],
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      surfaceRef.current?.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[#02151d]/55 backdrop-blur-[7px]"
        style={{ zIndex: "var(--dnh-layer-backdrop)" }}
      />

      <div
        dir="rtl"
        className="
          fixed
          inset-0
          grid
          place-items-center
          p-4
        "
        style={{ zIndex: "var(--dnh-layer-dialog)" }}
        onClick={handleBackdropClick}
      >
        <section
          ref={surfaceRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={`
            max-h-[calc(100dvh-32px)]
            ${sizeClass[size]}
            overflow-y-auto
            rounded-[26px]
            border
            border-line
            bg-white
            text-ink
            shadow-[0_30px_100px_rgba(3,45,59,0.24)]
            outline-none
          `}
        >
          <div className="rounded-t-[26px] border-b border-line bg-[#fbfdfd] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                {eyebrow ? (
                  <p
                    dir="ltr"
                    className={`text-[10px] font-black tracking-[0.22em] ${
                      tone === "danger" ? "text-red-700" : "text-brand-primary"
                    }`}
                  >
                    {eyebrow}
                  </p>
                ) : null}

                <h2
                  id={titleId}
                  className="mt-2 text-xl font-black leading-8 text-ink"
                >
                  {title}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="
                  grid
                  h-10
                  w-10
                  shrink-0
                  cursor-pointer
                  place-items-center
                  rounded-xl
                  border
                  border-line
                  bg-white
                  text-ink-muted
                  transition
                  hover:border-brand-primary
                  hover:text-ink
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-focus/20
                "
                aria-label="بستن پنجره"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          {children}
        </section>
      </div>
    </>,
    document.body,
  );
}
