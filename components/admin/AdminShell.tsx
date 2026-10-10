"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  ArrowUpLeft,
  BarChart3,
  Bell,
  ChevronDown,
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
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

import { AdminToastProvider } from "@/components/admin/AdminToastProvider";
import type { SafeUser } from "@/lib/auth";

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

type AdminNavGroupDefinition = {
  title: string;
  items: AdminNavItem[];
};

const adminNavGroups: AdminNavGroupDefinition[] = [
  {
    title: "نمای کلی",
    items: [
      {
        title: "داشبورد",
        description: "داشبورد عملیات",
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
      {
        title: "نقش‌ها و دسترسی‌ها",
        description: "کنترل سطح دسترسی",
        href: "/admin/users",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "ارتباطات",
    items: [
      {
        title: "پیام‌ها",
        description: "تماس‌ها و درخواست‌ها",
        href: "/admin#intake",
        icon: Mail,
        exact: true,
      },
      {
        title: "ورودی‌های سایت",
        description: "لیدها و فرم‌های ثبت‌شده",
        href: "/admin#intake",
        icon: Inbox,
        exact: true,
      },
    ],
  },
  {
    title: "تنظیمات و سیستم",
    items: [
      {
        title: "تنظیمات",
        description: "پیکربندی پنل",
        href: "/admin#system",
        icon: Settings,
        exact: true,
      },
      {
        title: "گزارش فعالیت‌ها",
        description: "ردگیری عملیات اخیر",
        href: "/admin#activity",
        icon: Clock3,
        exact: true,
      },
    ],
  },
];

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const storedPreference = window.localStorage.getItem(
          "dnh-admin-sidebar-collapsed",
        );

        if (storedPreference) {
          setDesktopCollapsed(storedPreference === "true");
        }
      } catch {
        // localStorage can be unavailable in stricter browser contexts.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleDesktopSidebar() {
    setDesktopCollapsed((current) => {
      const next = !current;

      try {
        window.localStorage.setItem(
          "dnh-admin-sidebar-collapsed",
          String(next),
        );
      } catch {
        // Preference persistence is optional; keep the UI action working.
      }

      return next;
    });
  }

  return (
    <div
      dir="rtl"
      style={
        {
          "--admin-sidebar-width": desktopCollapsed ? "88px" : "292px",
        } as CSSProperties
      }
      className="min-h-screen bg-[#eef6f8] text-ink"
    >
      <AdminAtmosphere />

      <aside
        className="
          fixed
          inset-y-0
          right-0
          z-50
          hidden
          w-[var(--admin-sidebar-width)]
          border-l
          border-white/10
          bg-[#032d3b]
          text-white
          shadow-[0_28px_90px_rgba(1,22,30,0.28)]
          transition-[width]
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          xl:block
        "
        aria-label="ناوبری پنل مدیریت"
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
          collapsed={desktopCollapsed}
          onToggleCollapsed={toggleDesktopSidebar}
        />
      </aside>

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-line
          bg-white/90
          px-4
          py-3
          backdrop-blur-2xl
          xl:hidden
        "
      >
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="
              inline-flex
              min-h-11
              cursor-pointer
              items-center
              gap-2
              border
              border-line
              bg-white
              px-3
              text-xs
              font-black
              text-ink
              transition
              hover:border-brand-primary
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-focus/20
            "
            aria-label="باز کردن منوی مدیریت"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
            منوی ادمین
          </button>

          <AdminBrand compact user={user} />
        </div>
      </header>

      {mobileOpen ? (
        <MobileAdminDrawer
          user={user}
          pathname={pathname}
          onDismiss={() => setMobileOpen(false)}
        />
      ) : null}

      <main
        className="
          relative
          z-10
          min-h-screen
          transition-[padding]
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          xl:pr-[var(--admin-sidebar-width)]
        "
      >
        <DesktopAdminTopbar user={user} />

        <div className="mx-auto w-full max-w-[1560px] px-4 py-6 sm:px-6 lg:px-8 xl:px-8 xl:py-7">
          {children}
        </div>
      </main>

      <AdminToastProvider />
    </div>
  );
}

function DesktopAdminTopbar({ user }: { user: SafeUser }) {
  return (
    <div
      className="
        sticky
        top-0
        z-30
        hidden
        h-[66px]
        items-center
        justify-between
        gap-5
        border-b
        border-line
        bg-white/90
        px-8
        shadow-[0_8px_28px_rgba(3,45,59,0.04)]
        backdrop-blur-2xl
        xl:flex
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-line bg-surface-soft text-brand-primary">
          <UsersRound size={18} aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-xs font-black text-ink">
            {user.firstName} {user.lastName}
          </p>
          <p className="mt-0.5 text-[10px] font-bold text-ink-muted">
            مدیر سیستم
          </p>
        </div>

        <ChevronDown size={15} className="text-ink-muted" aria-hidden="true" />

        <button
          type="button"
          className="relative grid h-10 w-10 cursor-pointer place-items-center border border-line bg-white text-ink-muted transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
          aria-label="اعلان‌ها"
        >
          <Bell size={17} aria-hidden="true" />
          <span className="absolute left-2 top-2 h-1.5 w-1.5 bg-brand-accent" />
        </button>

        <button
          type="button"
          className="grid h-10 w-10 cursor-pointer place-items-center border border-line bg-white text-ink-muted transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
          aria-label="تنظیمات سریع"
        >
          <Settings size={17} aria-hidden="true" />
        </button>
      </div>

      <label className="relative hidden w-[min(420px,34vw)] lg:block">
        <span className="sr-only">جست‌وجو در پنل مدیریت</span>
        <input
          type="search"
          placeholder="جست‌وجو در بخش‌ها، گزارش‌ها و ..."
          className="
            h-11
            w-full
            border
            border-line
            bg-[#f8fbfc]/90
            pr-11
            pl-4
            text-xs
            font-bold
            text-ink
            outline-none
            transition
            placeholder:text-ink-muted/50
            focus:border-brand-primary
            focus:bg-white
            focus:ring-4
            focus:ring-focus/10
          "
        />
        <Search
          size={17}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted/60"
          aria-hidden="true"
        />
      </label>

      <div className="flex items-center gap-3 text-[11px] font-black text-ink-muted">
        <span>۱۰:۴۵</span>
        <Clock3 size={16} aria-hidden="true" />
      </div>
    </div>
  );
}

function SidebarContent({
  user,
  pathname,
  onNavigate,
  collapsed = false,
  onToggleCollapsed,
}: {
  user: SafeUser;
  pathname: string;
  onNavigate: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#053846_0%,#03313f_48%,#022733_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(135deg,rgba(22,115,148,.28),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-full bg-[linear-gradient(315deg,rgba(252,133,2,.12),transparent_56%)]"
      />

      <div
        className={`
          relative
          z-10
          border-b
          border-white/10

          ${collapsed ? "p-3" : "p-5"}
        `}
      >
        <div
          className={`
            gap-3

            ${collapsed ? "grid" : "flex items-center justify-between"}
          `}
        >
          <AdminBrand collapsed={collapsed} user={user} />

          {onToggleCollapsed ? (
            <button
              type="button"
              onClick={onToggleCollapsed}
              aria-label={
                collapsed
                  ? "باز کردن سایدبار مدیریت"
                  : "جمع کردن سایدبار مدیریت"
              }
              title={
                collapsed
                  ? "باز کردن سایدبار مدیریت"
                  : "جمع کردن سایدبار مدیریت"
              }
              className={`
                grid
                h-10
                w-10
                cursor-pointer
                place-items-center
                border
                border-white/10
                bg-white/[0.055]
                text-white/72
                transition
                hover:border-brand-accent/42
                hover:bg-white/[0.09]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-brand-accent/20

                ${collapsed ? "mx-auto" : ""}
              `}
            >
              {collapsed ? (
                <PanelRightOpen size={18} aria-hidden="true" />
              ) : (
                <PanelRightClose size={18} aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>

        {!collapsed ? (
          <div className="mt-5 border border-white/10 bg-white/[0.055] p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black">
                  {user.firstName} {user.lastName}
                </p>
                <p
                  dir="ltr"
                  className="mt-1 truncate text-left text-[11px] text-white/48"
                >
                  {user.phone}
                </p>
              </div>
              <span className="border border-brand-accent/34 bg-brand-accent/10 px-2 py-1 text-[10px] font-black text-brand-accent">
                مدیر
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`
          relative
          z-10
          flex-1
          overflow-y-auto
          py-4

          ${collapsed ? "px-3" : "px-3.5"}
        `}
        data-lenis-prevent
      >
        {adminNavGroups.map((group) => (
          <AdminNavGroup
            key={group.title}
            title={group.title}
            items={group.items}
            pathname={pathname}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div
        className={`
          relative
          z-10
          border-t
          border-white/10

          ${collapsed ? "p-3" : "p-4"}
        `}
      >
        <Link
          href="/"
          onClick={onNavigate}
          aria-label="مشاهده سایت"
          title={collapsed ? "مشاهده سایت" : undefined}
          className={`
            mb-3
            flex
            min-h-11
            items-center
            border
            border-white/10
            bg-white/[0.055]
            text-xs
            font-black
            text-white/82
            transition
            hover:border-brand-accent/45
            hover:bg-white/[0.085]
            hover:text-white
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-brand-accent/20

            ${
              collapsed
                ? "w-full justify-center px-0"
                : "justify-between px-3"
            }
          `}
        >
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard size={16} aria-hidden="true" />
            {!collapsed ? "مشاهده سایت" : null}
          </span>

          {!collapsed ? <ArrowUpLeft size={14} aria-hidden="true" /> : null}
        </Link>

        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            aria-label="خروج امن"
            title={collapsed ? "خروج امن" : undefined}
            className={`
              flex
              min-h-11
              w-full
              cursor-pointer
              items-center
              border
              border-white/10
              bg-white/[0.035]
              text-xs
              font-black
              text-white/72
              transition
              hover:border-red-300/45
              hover:bg-red-500/10
              hover:text-red-100
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-red-300/20

              ${
                collapsed
                  ? "justify-center px-0"
                  : "justify-between px-3"
              }
            `}
          >
            <span className="inline-flex items-center gap-2">
              <LogOut size={16} aria-hidden="true" />
              {!collapsed ? "خروج امن" : null}
            </span>
            {!collapsed ? <ShieldCheck size={14} aria-hidden="true" /> : null}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminBrand({
  collapsed = false,
  compact = false,
  user,
}: {
  collapsed?: boolean;
  compact?: boolean;
  user: SafeUser;
}) {
  if (compact) {
    return (
      <Link
        href="/admin"
        className="flex min-w-0 items-center gap-2"
        aria-label="داشبورد مدیریت DNH"
      >
        <span className="grid h-9 w-9 place-items-center bg-brand-primary text-white">
          <BarChart3 size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-black">مدیریت DNH</span>
          <span className="block truncate text-[10px] text-ink-muted">
            {user.firstName} {user.lastName}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/admin"
      className={`
        group
        flex
        min-w-0
        items-center
        transition

        ${collapsed ? "justify-center" : "gap-3"}
      `}
      aria-label="داشبورد مدیریت DNH"
    >
      <span
        aria-hidden="true"
        className="
          grid
          h-11
          w-11
          shrink-0
          place-items-center
          border
          border-brand-accent/30
          bg-brand-accent/10
          text-brand-accent
          transition
          group-hover:border-brand-accent/55
          group-hover:bg-brand-accent
          group-hover:text-white
        "
      >
        <Sparkles size={20} />
      </span>

      {!collapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-base font-black leading-7">
            مدیریت DNH
          </span>
          <span className="block truncate text-[10px] font-bold text-white/48">
            داشبورد عملیات
          </span>
        </span>
      ) : null}
    </Link>
  );
}

function AdminNavGroup({
  title,
  items,
  pathname,
  onNavigate,
  collapsed,
}: {
  title: string;
  items: AdminNavItem[];
  pathname: string;
  onNavigate: () => void;
  collapsed: boolean;
}) {
  return (
    <nav aria-label={title} className={collapsed ? "mb-4" : "mb-5"}>
      {collapsed ? (
        <span
          aria-hidden="true"
          className="mx-auto mb-2 block h-px w-8 bg-white/12"
        />
      ) : (
        <h2 className="mb-2 px-3 text-[10px] font-black text-white/42">
          {title}
        </h2>
      )}

      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={`${title}-${item.title}-${item.href}`}>
            <AdminNavLink
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
              collapsed={collapsed}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AdminNavLink({
  item,
  pathname,
  onNavigate,
  collapsed,
}: {
  item: AdminNavItem;
  pathname: string;
  onNavigate: () => void;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const hrefPath = item.href.split("#")[0];
  const active = item.exact
    ? pathname === hrefPath
    : pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? item.title : undefined}
      title={collapsed ? item.title : undefined}
      className={`
        group
        relative
        flex
        items-center
        overflow-hidden
        border
        text-right
        transition
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-brand-accent/20

        ${
          active
            ? "border-brand-accent bg-brand-accent text-white shadow-[0_10px_26px_rgba(252,133,2,.20)]"
            : "border-white/8 bg-white/[0.045] text-white/84 hover:border-white/16 hover:bg-white/[0.075] hover:text-white"
        }

        ${
          collapsed
            ? "min-h-12 justify-center px-0 py-1"
            : "min-h-[50px] gap-3 px-3 py-2"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          grid
          h-9
          w-9
          shrink-0
          place-items-center
          border
          transition

          ${
            active
              ? "border-white/18 bg-white/14 text-white"
              : "border-white/10 bg-white/[0.045] text-white/58 group-hover:text-white"
          }
        `}
      >
        <Icon size={17} strokeWidth={1.75} />
      </span>

      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-black">
              {item.title}
            </span>
            <span
              className={`
                mt-0.5
                block
                truncate
                text-[10px]
                font-medium

                ${active ? "text-white/70" : "text-white/42"}
              `}
            >
              {item.description}
            </span>
          </span>

          <ArrowUpLeft
            size={14}
            className={active ? "text-white/82" : "text-white/38"}
            aria-hidden="true"
          />
        </>
      ) : null}
    </Link>
  );
}

function MobileAdminDrawer({
  user,
  pathname,
  onDismiss,
}: {
  user: SafeUser;
  pathname: string;
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

  function dismissOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    onDismiss();
  }

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      className="
        fixed
        inset-y-0
        right-0
        m-0
        h-dvh
        max-h-none
        w-[min(440px,calc(100vw-18px))]
        max-w-none
        border-0
        bg-transparent
        p-0
        text-white
        backdrop:bg-[#02151d]/54
        backdrop:backdrop-blur-[6px]
      "
      aria-labelledby="admin-mobile-menu-title"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={dismissOnBackdrop}
    >
      <div className="h-full overflow-hidden border-l border-white/10 bg-[#032d3b] shadow-[0_24px_80px_rgba(1,22,30,0.28)]">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <p id="admin-mobile-menu-title" className="text-sm font-black">
              مدیریت DNH
            </p>
            <p className="mt-1 text-[10px] text-white/50">
              دسترسی سریع به پنل
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onDismiss}
            className="
              grid
              h-11
              w-11
              cursor-pointer
              place-items-center
              border
              border-white/12
              bg-white/8
              transition
              hover:bg-white/12
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-brand-accent/20
            "
            aria-label="بستن منوی مدیریت"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <SidebarContent user={user} pathname={pathname} onNavigate={onDismiss} />
      </div>
    </dialog>
  );
}

function AdminAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef6f8_0%,#ffffff_44%,#e5f1f4_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--dnh-primary) 8%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--dnh-primary) 7%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute left-[6%] top-[9%] h-[320px] w-[420px] bg-brand-primary/[0.075] blur-3xl" />
      <div className="absolute bottom-[8%] right-[18%] h-[260px] w-[420px] bg-brand-accent/[0.08] blur-3xl" />
    </div>
  );
}
