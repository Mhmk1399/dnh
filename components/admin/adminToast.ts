"use client";

import toast, { type ToastOptions } from "react-hot-toast";
import { siteToast } from "@/components/ui/siteToast";

type ToastId = string;

function getMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export const adminToast = {
  success: siteToast.success,
  error: siteToast.error,

  loading(message: string, options?: ToastOptions) {
    return toast.loading(message, options);
  },

  info(message: string, options?: ToastOptions) {
    return toast(message, {
      ...options,
      icon: options?.icon ?? "●",
    });
  },

  warning(message: string, options?: ToastOptions) {
    return toast(message, {
      ...options,
      icon: options?.icon ?? "!",
      style: {
        borderColor: "color-mix(in srgb, var(--dnh-accent) 38%, transparent)",
        color: "var(--dnh-text)",
        ...(options?.style ?? {}),
      },
    });
  },

  dismiss(id?: ToastId) {
    toast.dismiss(id);
  },

  errorFrom(error: unknown, fallback: string, options?: ToastOptions) {
    return toast.error(getMessage(error, fallback), options);
  },
};

export function adminToastMessage(error: unknown, fallback: string) {
  return getMessage(error, fallback);
}
