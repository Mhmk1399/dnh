"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  const isAdminRoute = pathname === "/admin" || pathname?.startsWith("/admin/");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setEnabled(!reducedMotion.matches);

    updatePreference();
    reducedMotion.addEventListener("change", updatePreference);

    return () => reducedMotion.removeEventListener("change", updatePreference);
  }, []);

  if (isAdminRoute || !enabled) return null;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
