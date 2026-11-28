"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";
import { LogOut } from "lucide-react";
import { siteToast } from "@/components/ui/siteToast";
import shellContent from "@/config/site-shell.json";
import { SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";

type DialogProps = { open: boolean; onClose: () => void; locale: SiteLocale };

export function LogoutConfirmDialog({ open, onClose, locale }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [pending, setPending] = useState(false);
  const copy = shellContent[locale].logoutDialog;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  async function signOut(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const response = await fetch(event.currentTarget.action, {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      if (response.status !== 204) throw new Error();
      siteToast.successOnNavigation(copy.success);
      window.location.replace(`/${locale}/login`);
    } catch {
      setPending(false);
      onClose();
      siteToast.error(copy.error);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      lang={locale}
      data-lenis-prevent
      dir={SITE_LANGUAGES[locale].direction}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!pending) onClose();
      }}
      onClick={(event) => {
        if (!pending && event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto w-[min(24rem,calc(100%-2rem))] max-h-[90dvh] overflow-y-auto overscroll-contain    border border-line bg-white p-0 text-start text-ink shadow-xl backdrop:bg-brand-secondary/60 backdrop:backdrop-blur-sm"
    >
      <form
        method="post"
        action={`/api/auth/logout?locale=${locale}`}
        onSubmit={signOut}
        aria-busy={pending}
        className="p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <LogOut
            size={21}
            aria-hidden="true"
            className="shrink-0 text-ink-muted"
          />
          <h2 id={titleId} className="text-lg font-bold leading-relaxed">
            {copy.title}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 text-sm font-bold">
          <button
            type="button"
            disabled={pending}
            onClick={onClose}
            className="min-h-11   border border-line px-3 text-ink hover:bg-surface-soft focus-visible:outline-focus"
          >
            {copy.cancel}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="min-h-11   bg-brand-secondary px-3 text-white hover:bg-ink-muted focus-visible:outline-focus"
          >
            {copy.confirm}
          </button>
        </div>
      </form>
    </dialog>
  );
}

type LogoutButtonProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "children" | "title" | "aria-label" | "className"
> & { locale?: SiteLocale };

export function LogoutButton({
  locale = "fa",
  children,
  ...props
}: LogoutButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        {...props}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <LogoutConfirmDialog
        open={open}
        locale={locale}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
