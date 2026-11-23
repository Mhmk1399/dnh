"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function SmoothScroll() {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname?.startsWith("/admin/");

  useEffect(() => {
    if (isAdminRoute) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Native scrolling is faster and more predictable on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const idleWindow = window as IdleWindow;
    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let instance: { destroy: () => void } | undefined;

    async function start() {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      instance = new Lenis({
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      });
    }

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(start, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(start, 900);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      instance?.destroy();
    };
  }, [isAdminRoute]);

  return null;
}
