"use client";

import { useEffect, useState } from "react";

export type PrivacyIndexItem = {
  id: string;
  label: string;
  title: string;
};

export function PrivacyPolicyIndex({
  items,
  label,
  direction,
  variant,
}: {
  items: PrivacyIndexItem[];
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
      <nav id="privacy-contents" aria-label={label} className="scroll-mt-28 lg:hidden">
        <p className="border-b-2 border-ink pb-3 text-[11px] font-black uppercase tracking-[.17em] text-brand-accent">
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
                  active
                    ? "bg-white text-ink"
                    : "bg-transparent text-ink-muted hover:bg-white hover:text-ink"
                }`}
              >
                <span className="min-w-0 text-pretty break-words">{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 start-0 w-[3px] origin-center bg-brand-accent transition-transform ${active ? "scale-y-100" : "scale-y-0"}`}
                />
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label={label} dir={direction} className="border-s border-t border-ink/15 bg-page">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? "location" : undefined}
            className={`group relative flex min-h-[50px] items-center border-b border-e px-6 py-3.5 text-start transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus ${
              active
                ? "border-brand-accent bg-white text-ink"
                : "border-ink/15 text-ink-muted hover:border-ink/35 hover:bg-white/70 hover:text-ink"
            }`}
          >
            <span aria-hidden="true" className={`absolute inset-y-3 start-0 w-[3px] origin-center bg-brand-accent transition-transform ${active ? "scale-y-100" : "scale-y-0"}`} />
            <span className="min-w-0 max-w-[285px] text-pretty text-[14px] font-black leading-6">{item.label}</span>
            <span aria-hidden="true" className={`ms-auto h-px w-6 shrink-0 origin-left bg-brand-accent transition-transform ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </a>
        );
      })}
    </nav>
  );
}
