"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ListFilter,
  Search,
} from "lucide-react";

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
  const [allOpen, setAllOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const rtl = direction === "rtl";
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  const searchLabel = rtl ? "جست‌وجو در سؤال‌ها" : "Search questions";
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const matches = normalizedQuery
    ? categories
        .flatMap((category) =>
          category.items
            .filter((item) =>
              `${category.label} ${item.question} ${item.answer.join(" ")}`
                .toLocaleLowerCase()
                .includes(normalizedQuery),
            )
            .map((item) => ({ category, item })),
        )
        .slice(0, 18)
    : [];

  function pickQuestion(categoryId: string, questionId: string) {
    const detail = document.getElementById(
      `faq-question-${categoryId}-${questionId}`,
    ) as HTMLDetailsElement | null;
    if (detail) detail.open = true;
    setActiveId(categoryId);
    setAllOpen(false);
    setSearchQuery("");
  }

  useEffect(() => {
    const syncHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (categories.some((category) => category.id === id)) {
        setActiveId(id);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (candidates[0]) setActiveId(candidates[0].target.id);
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    for (const category of categories) {
      const section = document.getElementById(category.id);
      if (section) observer.observe(section);
    }

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, [categories]);

  useEffect(() => {
    if (variant !== "top" || !activeId || !tabsRef.current) return;
    const tab = tabRefs.current[activeId];
    if (!tab) return;
    // Scroll only the horizontal tab strip; keep the document scroll position.
    const strip = tabsRef.current;
    const stripRect = strip.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const delta =
      tabRect.left + tabRect.width / 2 - (stripRect.left + stripRect.width / 2);
    strip.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeId, variant]);

  useEffect(() => {
    if (!allOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setAllOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAllOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [allOpen]);

  if (variant === "top") {
    return (
      <nav
        id="faq-topics"
        aria-label={label}
        dir={direction}
        className="sticky top-[76px] z-30 border-y border-line bg-[color-mix(in_srgb,var(--dnh-bg-page)_93%,transparent)] shadow-[0_12px_28px_rgba(10,30,45,0.08)] backdrop-blur-xl sm:top-[82px] lg:hidden"
      >
        <div ref={menuRef} className="relative dnh-site-shell min-w-0">
          <div className="flex min-h-[66px] min-w-0 items-center gap-2 py-2">
            <div className="hidden shrink-0 border-e border-line pe-3 sm:block">
              <span className="block text-[10px] font-black text-brand-primary">
                {label}
              </span>
              <span className="block text-[10px] text-ink-muted">
                {categories.length.toLocaleString(rtl ? "fa-IR" : "en-US")}
              </span>
            </div>

            <div
              ref={tabsRef}
              className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((category, index) => {
                const active = activeId === category.id;
                return (
                  <a
                    key={category.id}
                    ref={(element) => {
                      tabRefs.current[category.id] = element;
                    }}
                    href={`#${category.id}`}
                    aria-current={active ? "location" : undefined}
                    onClick={() => {
                      setActiveId(category.id);
                      setAllOpen(false);
                    }}
                    className={`group inline-flex min-h-10 shrink-0 items-center gap-2 border px-3 py-2 text-[11px] font-bold transition-[background-color,color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:text-[12px] ${
                      active
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-line bg-white/65 text-ink-muted hover:border-brand-primary/40 hover:text-brand-primary"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[10px] tabular-nums ${active ? "text-white/65" : "text-brand-accent"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-[160px] truncate">
                      {category.label}
                    </span>
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={rtl ? "نمایش همه دسته‌بندی‌ها" : "Show all topics"}
              aria-expanded={allOpen}
              aria-controls="faq-mobile-topic-list"
              onClick={() => setAllOpen((current) => !current)}
              className={`inline-flex size-11 shrink-0 items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-brand-accent ${
                allOpen
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-line bg-page text-brand-primary hover:bg-surface-soft"
              }`}
            >
              {allOpen ? (
                <ChevronDown aria-hidden="true" size={19} />
              ) : (
                <ListFilter aria-hidden="true" size={19} />
              )}
            </button>
          </div>

          <div
            id="faq-mobile-topic-list"
            data-open={allOpen}
            aria-hidden={!allOpen}
            inert={!allOpen}
            className={`absolute inset-x-0 top-full z-40 max-h-[min(66dvh,440px)] overflow-y-auto border-x border-b border-line bg-page p-3 shadow-[0_26px_50px_rgba(10,30,45,0.18)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${
              allOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <p className="border-b border-line px-2 pb-3 text-[12px] font-black text-ink">
              {label}
            </p>
            <div role="search" className="relative mt-3">
              <Search
                aria-hidden="true"
                size={17}
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-brand-primary"
              />
              <input
                type="search"
                dir={direction}
                aria-label={searchLabel}
                placeholder={searchLabel}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-h-12 w-full min-w-0 border border-line bg-surface-soft py-2 pe-4 ps-10 text-start text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-brand-primary"
              />
            </div>
            {normalizedQuery ? (
              <SearchResultLinks
                matches={matches}
                query={searchQuery}
                direction={direction}
                onPick={pickQuestion}
              />
            ) : (
              <div className="grid gap-1 py-2 min-[440px]:grid-cols-2">
                {categories.map((category, index) => {
                  const active = activeId === category.id;
                  return (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      onClick={() => {
                        setActiveId(category.id);
                        setAllOpen(false);
                      }}
                      aria-current={active ? "location" : undefined}
                      className={`flex min-h-12 min-w-0 items-center gap-3 border-s-[3px] px-3 py-2 text-[12px] font-bold leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-brand-accent ${
                        active
                          ? "border-brand-accent bg-surface-soft text-brand-primary"
                          : "border-transparent text-ink hover:bg-surface-soft"
                      }`}
                    >
                      <span className="font-mono text-[11px] text-brand-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">{category.label}</span>
                      <Arrow
                        aria-hidden="true"
                        className="shrink-0 text-brand-primary"
                        size={15}
                      />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label={label}
      dir={direction}
      className="border border-line bg-page/90 shadow-[0_16px_45px_rgba(11,33,49,0.05)]"
    >
      <div className="flex items-center justify-between border-b border-line bg-surface-soft px-5 py-4">
        <span className="text-[12px] font-black text-ink">{label}</span>
        <span className="font-mono text-[11px] text-brand-primary">
          {String(categories.length).padStart(2, "0")}
        </span>
      </div>
      <div className="p-2">
        <div role="search" className="relative mb-2">
          <Search
            aria-hidden="true"
            size={17}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-brand-primary"
          />
          <input
            type="search"
            dir={direction}
            aria-label={searchLabel}
            placeholder={searchLabel}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="min-h-11 w-full border border-line bg-surface-soft py-2 pe-3 ps-10 text-start text-[12px] text-ink outline-none placeholder:text-ink-muted focus:border-brand-primary"
          />
        </div>
        {normalizedQuery ? (
          <SearchResultLinks
            matches={matches}
            query={searchQuery}
            direction={direction}
            onPick={pickQuestion}
          />
        ) : (
          categories.map((category, index) => {
            const active = activeId === category.id;
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(category.id)}
                className={`group relative flex min-h-[62px] items-center gap-3 border-s-[3px] px-3 py-3 text-[12px] leading-[1.85] transition-[background-color,color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                  active
                    ? "border-brand-accent bg-surface-soft font-black text-brand-primary"
                    : "border-transparent font-bold text-ink-muted hover:border-brand-primary/30 hover:bg-surface-soft/70 hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`font-mono text-[11px] tabular-nums ${active ? "text-brand-primary" : "text-brand-accent"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-pretty">
                  {category.label}
                </span>
                <Arrow
                  aria-hidden="true"
                  size={15}
                  className={`shrink-0 transition-[opacity,transform] duration-200 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </a>
            );
          })
        )}
      </div>
    </nav>
  );
}

type SearchHit = {
  category: FaqCategory;
  item: FaqCategory["items"][number];
};

function SearchResultLinks({
  matches,
  query,
  direction,
  onPick,
}: {
  matches: SearchHit[];
  query: string;
  direction: "rtl" | "ltr";
  onPick: (categoryId: string, questionId: string) => void;
}) {
  const rtl = direction === "rtl";
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  if (!matches.length) {
    return (
      <p
        role="status"
        className="px-3 py-5 text-[12px] leading-7 text-ink-muted"
      >
        {rtl ? "سؤالی با این عبارت پیدا نشد." : "No matching questions found."}
      </p>
    );
  }
  return (
    <div
      className="max-h-[min(47dvh,340px)] overflow-y-auto py-2"
      aria-label={rtl ? "نتایج جست‌وجو" : "Search results"}
    >
      <p
        role="status"
        className="px-3 pb-2 text-[11px] font-semibold text-ink-muted"
      >
        {matches.length.toLocaleString(rtl ? "fa-IR" : "en-US")}{" "}
        {rtl ? "نتیجه برای" : "results for"} «{query}»
      </p>
      {matches.map(({ category, item }) => (
        <a
          key={`${category.id}-${item.id}`}
          href={`#faq-question-${category.id}-${item.id}`}
          onClick={() => onPick(category.id, item.id)}
          className="group flex min-h-14 items-center gap-3 border-b border-line px-3 py-3 transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-brand-primary"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold text-brand-primary">
              {category.label}
            </span>
            <span className="mt-1 block text-[12px] font-bold leading-6 text-ink">
              {item.question}
            </span>
          </span>
          <Arrow
            aria-hidden="true"
            size={15}
            className="shrink-0 text-brand-accent"
          />
        </a>
      ))}
    </div>
  );
}
