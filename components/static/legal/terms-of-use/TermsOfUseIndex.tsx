"use client";

import { useEffect, useState } from "react";

export type TermsIndexItem = { id: string; label: string; title: string };

export function TermsOfUseIndex({
  items,
  label,
  direction,
  variant,
}: {
  items: TermsIndexItem[];
  label: string;
  direction: "rtl" | "ltr";
  variant: "mobile" | "rail";
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (items.some((item) => item.id === id)) setActiveId(id);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.08, 0.2] },
    );
    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [items]);

  if (variant === "mobile") {
    return (
      <nav id="terms-contents" aria-label={label} className="scroll-mt-28 lg:hidden">
        <p className="border-b-2 border-ink pb-3 text-[11px] font-black uppercase tracking-[.16em] text-brand-accent">
          {label}
        </p>
        <div className="grid grid-cols-1 border-s border-ink/15 min-[360px]:grid-cols-2 md:grid-cols-3">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`relative flex min-h-[64px] min-w-0 items-center border-b border-e border-ink/15 px-4 py-3 text-start text-[12px] font-black leading-6 transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus ${
                  active ? "bg-white text-ink" : "text-ink-muted hover:bg-white hover:text-ink"
                }`}
              >
                <span className="min-w-0 text-pretty break-words">{item.label}</span>
                <span aria-hidden="true" className={`absolute inset-y-3 start-0 w-[3px] bg-brand-accent transition-transform ${active ? "scale-y-100" : "scale-y-0"}`} />
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label={label} dir={direction} className="border-s border-white/15 bg-[#032f3f]">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? "location" : undefined}
            className={`group relative flex min-h-[52px] items-center border-b border-e px-6 py-3.5 text-start transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white ${
              active
                ? "border-brand-primary bg-white/10 text-white"
                : "border-white/15 text-white/62 hover:border-white/35 hover:bg-white/[.06] hover:text-white"
            }`}
          >
            <span aria-hidden="true" className={`absolute inset-y-3 start-0 w-[3px] bg-brand-accent transition-transform ${active ? "scale-y-100" : "scale-y-0"}`} />
            <span className="min-w-0 max-w-[285px] text-pretty text-[14px] font-black leading-6">{item.label}</span>
            <span aria-hidden="true" className={`ms-auto h-px w-6 shrink-0 bg-brand-accent transition-transform ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </a>
        );
      })}
    </nav>
  );
}
