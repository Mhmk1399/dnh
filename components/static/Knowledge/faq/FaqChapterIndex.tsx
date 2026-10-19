"use client";

import { useEffect, useState } from "react";
import { CornerDownLeft, CornerDownRight } from "lucide-react";

import type { FaqCategory } from "./FaqPage";

type FaqChapterIndexProps = {
  categories: FaqCategory[];
  label: string;
  direction: "rtl" | "ltr";
  variant: "top" | "rail";
};

export function FaqChapterIndex({
  categories,
  label,
  direction,
  variant,
}: FaqChapterIndexProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (categories.some((category) => category.id === id)) setActiveId(id);
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
      { rootMargin: "-20% 0px -62% 0px", threshold: [0, 0.1, 0.25] },
    );
    categories.forEach((category) => {
      const section = document.getElementById(category.id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [categories]);

  const CornerArrow = direction === "rtl" ? CornerDownLeft : CornerDownRight;

  if (variant === "top") {
    return (
      <nav
        id="faq-topics"
        aria-label={label}
        className="scroll-mt-28 border-s border-t border-ink/15"
      >
        <div className="grid min-w-0 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const active = category.id === activeId;
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                aria-current={active ? "location" : undefined}
                className={`group relative flex min-h-14 min-w-0 items-center border-e border-b border-ink/15 px-3 py-2.5 text-[11px] font-black leading-5 transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary min-[360px]:last:col-span-full md:last:col-span-1 ${active ? "bg-white text-brand-primary" : "text-ink hover:bg-white hover:text-brand-primary"}`}
              >
                <span className="min-w-0 text-pretty break-words">
                  {category.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-0.5 bg-brand-accent transition-transform ${active ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label={label}>
      {categories.map((category) => {
        const active = category.id === activeId;
        return (
          <a
            key={category.id}
            href={`#${category.id}`}
            aria-current={active ? "location" : undefined}
            className={`group relative flex min-h-[68px] items-center justify-between gap-5 border-b px-4 py-4 text-[13px] leading-6 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${active ? "border-brand-accent bg-white font-black text-ink" : "border-ink/15 font-bold text-ink-muted hover:border-ink hover:bg-white/60 hover:text-ink"}`}
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-3 start-0 w-0.5 bg-brand-accent transition-transform ${active ? "scale-y-100" : "scale-y-0"}`}
            />
            <span className="max-w-[250px] text-pretty">{category.label}</span>
            <CornerArrow
              aria-hidden="true"
              size={15}
              className={`shrink-0 text-brand-accent transition ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </a>
        );
      })}
    </nav>
  );
}
