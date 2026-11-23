"use client";

import toast from "react-hot-toast";

const navigationToastKey = "dnh:navigation-success";

export const siteToast = {
  success: toast.success,
  error: toast.error,

  successOnNavigation(message: string) {
    try {
      sessionStorage.setItem(navigationToastKey, message);
    } catch {
      toast.success(message);
    }
  },
};

export function showNavigationToast() {
  try {
    const message = sessionStorage.getItem(navigationToastKey);
    if (message) {
      sessionStorage.removeItem(navigationToastKey);
      toast.success(message);
    }
  } catch {
    // Session storage may be disabled in this browser.
  }
}
