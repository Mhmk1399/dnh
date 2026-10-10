"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Clock3,
  ClipboardList,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

import { AdminToastProvider } from "@/components/admin/AdminToastProvider";
import type { SafeUser } from "@/lib/auth";
import Image from "next/image";

type AdminShellProps = {
  user: SafeUser;
  children: React.ReactNode;
};

type AdminNavItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

// Existing destinations are intentionally unchanged.
const adminNavGroups: AdminNavGroup[] = [
  {
    title: "نمای کلی",
    items: [
      {
        title: "داشبورد",
        description: "نمای کلی و آمار",
        href: "/admin",
        icon: Home,
        exact: true,
      },
    ],
  },
  {
    title: "مدیریت محتوا",
    items: [
      {
        title: "فرم‌های پویا",
        description: "ساخت و انتشار فرم‌ها",
        href: "/admin/forms",
        icon: ClipboardList,
      },
      {
        title: "گزارش‌های هفتگی",
        description: "نسخه‌های Weekly Outlook",
        href: "/admin/weekly-outlooks",
        icon: Newspaper,
      },
      {
        title: "محتوای انتشار",
        description: "ایجاد گزارش جدید",
        href: "/admin/weekly-outlooks/new",
        icon: Send,
      },
    ],
  },
  {
    title: "مدیریت کاربران",
    items: [
      {
        title: "کاربران",
        description: "حساب‌ها و نقش‌ها",
        href: "/admin/users",
        icon: UsersRound,
      },
    ],
  },
];

const allNavItems = adminNavGroups.flatMap((group) => group.items);
const accountName = (user: SafeUser) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
  "مدیر سیستم";

function normalizeSearch(text: string) {
  return text
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064B-\u065F\u0670\u200C]/g, "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setDesktopCollapsed(
          localStorage.getItem("dnh-admin-sidebar-collapsed") === "true",
        );
      } catch {
        // The preference is optional; the sidebar still works without storage.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    const frame = requestAnimationFrame(updateHash);
    window.addEventListener("hashchange", updateHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  function toggleDesktopSidebar() {
    setDesktopCollapsed((previous) => {
      const next = !previous;
      try {
        localStorage.setItem("dnh-admin-sidebar-collapsed", String(next));
      } catch {
        // Keep the toggle functional when storage is unavailable.
      }
      return next;
    });
  }

  const sidebarWidth = desktopCollapsed ? "84px" : "264px";

  return (
    <div
      dir="rtl"
      style={{ "--admin-sidebar-width": sidebarWidth } as CSSProperties}
      className="relative min-h-screen overflow-x-clip bg-[#f1f8fa] text-[#133648]"
    >
      <AdminAtmosphere />

      <aside
        aria-label="ناوبری پنل مدیریت"
        className="fixed inset-y-0 right-0 z-50 hidden w-[var(--admin-sidebar-width)] border-l border-[#0b4351] bg-[#042e3b] text-white shadow-[-12px_0_44px_rgba(3,45,59,.13)] transition-[width] duration-300 ease-out xl:block"
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          hash={currentHash}
          collapsed={desktopCollapsed}
          onNavigate={() => undefined}
          onToggleCollapsed={toggleDesktopSidebar}
        />
      </aside>

      <div className="relative z-10 min-h-screen min-w-0 transition-[padding] duration-300 ease-out xl:pr-[var(--admin-sidebar-width)]">
        <header className="sticky top-0 z-40 border-b border-[#e4eef2] bg-white/90 shadow-[0_3px_24px_rgba(15,62,80,.035)] backdrop-blur-2xl">
          <div className="flex h-[66px] items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:gap-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="باز کردن منوی مدیریت"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#deecf1] bg-[#f6fbfd] text-[#0c5065] transition hover:bg-[#eaf5f8] focus-visible:outline-2 focus-visible:outline-[#ff8a00] xl:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 xl:hidden">
              <p className="truncate text-sm font-black text-[#093443]">
                مدیریت DNH
              </p>
              <p className="text-[10px] text-[#8299a8]">داشبورد عملیات</p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 text-[11px] font-bold text-[#728ba0] lg:flex">
              <CalendarDays
                size={17}
                className="text-[#157493]"
                aria-hidden="true"
              />
              <TehranClock showDate />
            </div>

            <div className="mx-auto hidden w-full max-w-[440px] min-w-0 sm:block">
              <AdminSearch />
            </div>

            <div className="mr-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <TehranClock compact />
              <NotificationPopover />
              <Link
                href="/admin#system"
                aria-label="دسترسی‌های مدیریتی"
                title="دسترسی‌های مدیریتی"
                className="hidden h-10 w-10 place-items-center rounded-xl text-[#42647a] transition hover:bg-[#ecf5f8] hover:text-[#0c718e] sm:grid"
              >
                <Settings size={19} />
              </Link>
              <UserDropdown user={user} />
            </div>
          </div>

          <div className="border-t border-[#edf3f6] px-4 pb-3 pt-2 sm:hidden">
            <AdminSearch compact />
          </div>
        </header>

        <main className="relative min-w-0">
          <div className="mx-auto w-full max-w-[1650px] min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-7 lg:py-7 xl:px-7">
            {children}
          </div>
        </main>
      </div>

      {mobileOpen && (
        <MobileAdminDrawer
          user={user}
          pathname={pathname}
          hash={currentHash}
          onDismiss={() => setMobileOpen(false)}
        />
      )}

      <AdminToastProvider />
    </div>
  );
}

function TehranClock({
  showDate = false,
  compact = false,
}: {
  showDate?: boolean;
  compact?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const refresh = () => setNow(new Date());
    const frame = requestAnimationFrame(refresh);
    const timer = window.setInterval(refresh, 15_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const clock = now
    ? new Intl.DateTimeFormat("fa-IR", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(now)
    : "--:--";

  if (compact) {
    return (
      <span
        title="ساعت تهران"
        dir="ltr"
        className="inline whitespace-nowrap text-[10px] font-bold tabular-nums text-[#7f96a6] lg:hidden"
      >
        {clock}
      </span>
    );
  }

  if (!showDate) return <time suppressHydrationWarning>{clock}</time>;

  const date = now
    ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        timeZone: "Asia/Tehran",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now)
    : "تاریخ امروز";

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <span>{date}</span>
      <span className="h-4 w-px bg-[#dce9ee]" />
      <Clock3 size={16} className="text-[#157493]" aria-hidden="true" />
      <time className="tabular-nums" suppressHydrationWarning>
        {clock}
      </time>
    </span>
  );
}

type SearchResult = {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  target?: HTMLElement;
};

function AdminSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const normalized = useMemo(() => normalizeSearch(query), [query]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const matchesViewport =
        window.matchMedia("(min-width: 640px)").matches !== compact;
      if (!matchesViewport) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [compact]);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (!areaRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const matchedNav = allNavItems
        .filter(
          (item) =>
            !normalized ||
            normalizeSearch(`${item.title} ${item.description}`).includes(
              normalized,
            ),
        )
        .map(
          (item): SearchResult => ({
            key: `nav-${item.href}-${item.title}`,
            label: item.title,
            description: item.description,
            icon: item.icon,
            href: item.href,
          }),
        );

      if (!normalized) {
        setResults(matchedNav.slice(0, 6));
        return;
      }

      // No extra API or database logic: search existing navigation and actual
      // records visible on the currently rendered page (including table rows).
      const seen = new Set<string>();
      const displayed: SearchResult[] = [];
      const elements = document.querySelectorAll<HTMLElement>(
        "main [data-admin-searchable], main a[href], main tbody tr",
      );

      for (const element of Array.from(elements).slice(0, 180)) {
        const label = (
          element.dataset.adminSearchLabel ||
          element.textContent ||
          ""
        )
          .replace(/\s+/g, " ")
          .trim();
        const href =
          element instanceof HTMLAnchorElement
            ? element.getAttribute("href")
            : undefined;
        if (
          !label ||
          label.length < 2 ||
          !normalizeSearch(label).includes(normalized)
        )
          continue;
        const key = `${href ?? "row"}-${label}`;
        if (seen.has(key)) continue;
        seen.add(key);
        displayed.push({
          key: `data-${key}`,
          label: label.slice(0, 80),
          description: href ? "محتوای این صفحه" : "نمایش مورد در همین صفحه",
          icon: Search,
          href: href || undefined,
          target: element,
        });
        if (displayed.length >= 7) break;
      }

      setResults([...matchedNav, ...displayed].slice(0, 10));
    });
    return () => cancelAnimationFrame(frame);
  }, [normalized, open, pathname]);

  function choose(result: SearchResult) {
    setOpen(false);
    setQuery("");
    if (result.href) {
      if (result.href.startsWith("#")) {
        document
          .querySelector(result.href)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(result.href);
      }
    } else {
      result.target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div ref={areaRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (results[0]) choose(results[0]);
          else setOpen(true);
        }}
      >
        <label className="relative block">
          <span className="sr-only">
            جستجو در منو و اطلاعات قابل مشاهده پنل
          </span>
          <Search
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-[#92a9b8]"
          />
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            placeholder={
              compact
                ? "جستجو در پنل مدیریت..."
                : "جستجو در بخش‌ها، فرم‌ها، گزارش‌ها و..."
            }
            aria-expanded={open}
            aria-controls={
              compact ? "admin-search-mobile" : "admin-search-desktop"
            }
            className="h-10 w-full rounded-[13px] border border-[#e3edf1] bg-[#f6f9fb] py-2 pr-11 pl-14 text-right text-xs font-medium text-[#214459] shadow-[inset_0_1px_3px_rgba(9,51,66,.025)] outline-none transition placeholder:text-[#a4b5c2] focus:border-[#95c9d6] focus:bg-white focus:ring-4 focus:ring-[#1b8da9]/10 sm:h-11"
          />
          {!compact && (
            <span
              dir="ltr"
              className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-[#e2eaf0] bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#9bafbc] lg:block"
            >
              Ctrl K
            </span>
          )}
        </label>
      </form>

      {open && (
        <div
          id={compact ? "admin-search-mobile" : "admin-search-desktop"}
          className="absolute inset-x-0 top-full z-[80] mt-2 max-h-[min(70vh,410px)] overflow-y-auto rounded-2xl border border-[#e1edf1] bg-white p-2.5 shadow-[0_20px_60px_rgba(4,41,57,.17)]"
        >
          <p className="px-2 pb-2 pt-1 text-[10px] font-bold text-[#95a9b6]">
            {normalized ? "نتایج جستجو" : "دسترسی سریع"}
          </p>
          {results.length ? (
            <ul className="space-y-1" aria-label="نتایج جستجو">
              {results.map((result) => {
                const Icon = result.icon;
                return (
                  <li key={result.key}>
                    <button
                      type="button"
                      onClick={() => choose(result)}
                      className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-right transition hover:bg-[#eff8fb] focus-visible:bg-[#eff8fb] focus-visible:outline-2 focus-visible:outline-[#2b9cbd]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e8f5fa] text-[#167a9b]">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-[#13394c]">
                          {result.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] text-[#8aa0ae]">
                          {result.description}
                        </span>
                      </span>
                      <ArrowLeft
                        size={15}
                        className="shrink-0 text-[#91afbd]"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-7 text-center text-xs text-[#829baa]">
              موردی در منو یا اطلاعات همین صفحه پیدا نشد.
            </p>
          )}
          <p className="border-t border-[#edf2f5] px-2 pt-2 text-[10px] leading-5 text-[#9aafbb]">
            جستجو در صفحات مدیریت و اطلاعات نمایش‌داده‌شده انجام می‌شود.
          </p>
        </div>
      )}
    </div>
  );
}

function UserDropdown({ user }: { user: SafeUser }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const name = accountName(user);

  useEffect(() => {
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`حساب کاربری ${name}`}
        className="flex min-h-10 items-center gap-2 rounded-xl px-1.5 py-1 text-right transition hover:bg-[#f0f7fa] focus-visible:outline-2 focus-visible:outline-[#ff8a00]"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e9f0f4] to-[#d4e0e6] text-[#7691a2] ring-2 ring-white">
          <UserRound size={19} aria-hidden="true" />
        </span>
        <span className="hidden min-w-0 text-right md:block">
          <span className="block max-w-[135px] truncate text-[12px] font-extrabold text-[#173747]">
            {name}
          </span>
          <span className="block text-[10px] text-[#9aaebb]">مدیر سیستم</span>
        </span>
        <ChevronDown
          size={14}
          className="hidden text-[#6f8b9f] sm:block"
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[80] mt-2 w-[265px] max-w-[calc(100vw-24px)] rounded-2xl border border-[#e0ecf1] bg-white p-2 shadow-[0_20px_60px_rgba(4,41,57,.17)]"
        >
          <div className="rounded-xl bg-[#f1f8fa] px-3 py-3">
            <p className="text-sm font-extrabold text-[#103748]">{name}</p>
            <p className="mt-1 text-[11px] text-[#6d8796]">مدیر سیستم</p>
            {user.phone && (
              <p
                dir="ltr"
                className="mt-2 text-left text-[11px] tabular-nums text-[#6d8796]"
              >
                {user.phone}
              </p>
            )}
          </div>
          <Link
            role="menuitem"
            href="/admin/users"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-[#31556a] hover:bg-[#edf7fa]"
          >
            <UsersRound size={17} /> مدیریت کاربران
          </Link>
          <Link
            role="menuitem"
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-[#31556a] hover:bg-[#edf7fa]"
          >
            <ArrowUpLeft size={17} /> مشاهده سایت
          </Link>
          <div className="my-2 h-px bg-[#e6eff3]" />
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-xs font-bold text-[#b94a47] transition hover:bg-red-50"
            >
              <LogOut size={17} /> خروج امن از حساب
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOutside(event: globalThis.PointerEvent) {
      if (!areaRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <div ref={areaRef} className="relative">
      <button
        type="button"
        aria-label="پیام‌ها و اعلان‌ها"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative grid h-10 w-10 place-items-center rounded-xl text-[#45667b] transition hover:bg-[#eff7fa] hover:text-[#087d9c] focus-visible:outline-2 focus-visible:outline-[#ff8a00]"
      >
        <Bell size={19} />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="پیام‌ها و اعلان‌ها"
          className="absolute left-0 top-full z-[80] mt-2 w-[290px] max-w-[calc(100vw-22px)] rounded-2xl border border-[#dfeaf0] bg-white p-4 shadow-[0_20px_60px_rgba(4,41,57,.17)]"
        >
          <div className="flex items-center gap-2 text-sm font-black text-[#153b4c]">
            <Bell size={17} className="text-[#0b839e]" /> پیام‌ها و اعلان‌ها
          </div>
          <p className="mt-2 text-xs leading-6 text-[#708c9f]">
            برای بررسی پیام‌ها و سرنخ‌های ثبت‌شده در سایت، بخش ورودی‌ها را باز
            کنید.
          </p>
          <Link
            href="/admin#intake"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-between rounded-xl bg-[#edf8fb] px-3 py-3 text-xs font-extrabold text-[#0f7492] hover:bg-[#e3f3f8]"
          >
            مشاهده آخرین ورودی‌ها <ArrowLeft size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  user,
  pathname,
  hash,
  collapsed,
  onNavigate,
  onToggleCollapsed,
}: {
  user: SafeUser;
  pathname: string;
  hash: string;
  collapsed: boolean;
  onNavigate: () => void;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[linear-gradient(180deg,#073b48_0%,#043442_42%,#032b37_100%)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_65%_0%,rgba(33,160,170,.18),transparent_72%)]"
      />

      <div
        className={`relative z-10 flex shrink-0 items-center border-b border-white/10 ${collapsed ? "flex-col gap-3 px-2.5 py-5" : "justify-between gap-2 px-4 py-5"}`}
      >
        <Link
          href="/admin"
          onClick={onNavigate}
          title="مدیریت DNH"
          className={`flex min-w-0 items-center ${collapsed ? "justify-center" : "gap-2.5"}`}
        >
          <span
            className={`grid  ${!collapsed ? "w-36 " : "w-16"}  h-14   shrink-0 place-items-center   text-[#ff9100]`}
          >
            <Image
              alt="DNH"
              width={120}
              height={120}
              src="/assets/images/LOGOWHITE.svg"
            />
          </span>
        </Link>
        {onToggleCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            title={collapsed ? "باز کردن سایدبار" : "جمع کردن سایدبار"}
            aria-label={collapsed ? "باز کردن سایدبار" : "جمع کردن سایدبار"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.045] text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {collapsed ? (
              <PanelRightOpen size={17} />
            ) : (
              <PanelRightClose size={17} />
            )}
          </button>
        )}
      </div>

      <nav
        aria-label="بخش‌های مدیریت"
        data-lenis-prevent
        className={`relative z-10 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain py-4 [scrollbar-color:#4f8793_transparent] [scrollbar-width:thin] ${collapsed ? "px-2" : "px-3"}`}
      >
        {adminNavGroups.map((group) => (
          <div key={group.title}>
            {collapsed ? (
              <div
                aria-hidden="true"
                className="mx-auto mb-2 h-px w-8 bg-white/10"
              />
            ) : (
              <p className="mb-2 px-3 pt-1 text-[10px] font-bold text-[#7ca3b2]">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.title}-${item.href}`}>
                  <SidebarLink
                    item={item}
                    pathname={pathname}
                    hash={hash}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div
        className={`relative z-10 shrink-0 space-y-2 border-t border-white/10 ${collapsed ? "p-2" : "p-3"}`}
      >
        <Link
          href="/"
          onClick={onNavigate}
          title="مشاهده سایت"
          className={`flex min-h-11 items-center rounded-xl border border-white/10 bg-white/[0.055] text-xs font-bold text-white/85 transition hover:bg-white/10 ${collapsed ? "justify-center" : "justify-between px-3"}`}
        >
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard size={17} />
            {!collapsed && "مشاهده سایت"}
          </span>
          {!collapsed && <ArrowUpLeft size={16} className="text-white/60" />}
        </Link>
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            title="خروج امن"
            className={`flex min-h-11 w-full items-center rounded-xl border border-white/10 bg-white/[0.035] text-right text-xs font-bold text-white/75 transition hover:border-red-300/20 hover:bg-red-500/10 hover:text-red-100 ${collapsed ? "justify-center" : "justify-between px-3"}`}
          >
            <span className="inline-flex items-center gap-2">
              <LogOut size={17} />
              {!collapsed && "خروج امن"}
            </span>
            {!collapsed && <ShieldCheck size={15} className="text-white/40" />}
          </button>
        </form>
        {!collapsed && (
          <p className="truncate px-1 pt-1 text-center text-[10px] text-white/35">
            {accountName(user)}
          </p>
        )}
      </div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
  hash,
  collapsed,
  onNavigate,
}: {
  item: AdminNavItem;
  pathname: string;
  hash: string;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const [path, fragment] = item.href.split("#");
  const hasHash = Boolean(fragment);
  const active = hasHash
    ? pathname === path && hash === `#${fragment}`
    : item.exact
      ? pathname === path && !hash
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.title : undefined}
      aria-label={collapsed ? item.title : undefined}
      className={`group relative flex min-h-[43px] items-center overflow-hidden rounded-xl text-right transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#ffa12e] ${collapsed ? "justify-center px-1" : "gap-3 px-3"} ${
        active
          ? "bg-[linear-gradient(110deg,#ff8b00,#ff990a)] font-extrabold text-white shadow-[0_7px_19px_rgba(255,132,0,.23)]"
          : "text-white/75 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={1.85}
        aria-hidden="true"
        className="shrink-0"
      />
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate text-[12px] font-bold">
            {item.title}
          </span>
          <ChevronLeft
            size={16}
            aria-hidden="true"
            className={`shrink-0 ${active ? "text-white/85" : "text-white/35 transition group-hover:text-white/80"}`}
          />
        </>
      )}
    </Link>
  );
}

function MobileAdminDrawer({
  user,
  pathname,
  hash,
  onDismiss,
}: {
  user: SafeUser;
  pathname: string;
  hash: string;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function handleBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onDismiss();
  }

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      aria-label="منوی مدیریت"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={handleBackdrop}
      className="fixed inset-y-0 right-0 m-0 h-dvh max-h-none w-[min(336px,88vw)] max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-[#041d28]/60 backdrop:backdrop-blur-[3px] xl:hidden"
    >
      <div className="flex h-full min-h-0 flex-col bg-[#042f3d] shadow-[-20px_0_70px_rgba(0,20,30,.32)]">
        <div className="z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#073947] px-4 py-3">
          <span className="text-xs font-black text-white/90">منوی مدیریت</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onDismiss}
            aria-label="بستن منو"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <X size={19} />
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <SidebarContent
            user={user}
            pathname={pathname}
            hash={hash}
            collapsed={false}
            onNavigate={onDismiss}
          />
        </div>
      </div>
    </dialog>
  );
}

function AdminAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f8fa_0%,#f8fcfd_48%,#edf6f8_100%)]" />
      <div className="absolute -left-32 top-24 h-96 w-[32rem] rounded-full bg-[#87d1da]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[17%] h-80 w-80 rounded-full bg-[#ff9d40]/[0.035] blur-3xl" />
    </div>
  );
}
