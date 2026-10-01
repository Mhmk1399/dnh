"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  ChevronDown,
  CircleDollarSign,
  CircleUserRound,
  Compass,
  Gem,
  Home,
  Landmark,
  Layers3,
  LayoutGrid,
  LineChart,
  Menu,
  Network,
  PieChart,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type MegaMenuKey = "dnh" | "services" | "target-markets";

type NavItem = {
  title: string;
  href?: string;
  menu?: MegaMenuKey;
  icon: LucideIcon;
};

type MegaItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index: string;
  badge?: string;
};

/* =============================================================================
   Main navigation
============================================================================= */

const NAVIGATION: NavItem[] = [
  {
    title: "خانه",
    href: "/",
    icon: Home,
  },
  {
    title: "DNH",
    menu: "dnh",
    icon: Compass,
  },
  {
    title: "خدمات",
    href: "/services",
    menu: "services",
    icon: Briefcase,
  },
  {
    title: "بازارهای هدف",
    menu: "target-markets",
    icon: Target,
  },
  {
    title: "دانش",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "درباره",
    href: "/about",
    icon: CircleUserRound,
  },
];

/* =============================================================================
   DNH items
============================================================================= */

const DNH_ITEMS: MegaItem[] = [
  {
    index: "01",
    title: "معماری ثروت",
    description: "ساختاری منسجم برای سازمان‌دهی ثروت، سرمایه و تصمیم‌های مالی.",
    href: "/dnh/wealth-architecture",
    icon: Landmark,
    badge: "DNH",
  },
  {
    index: "02",
    title: "چارچوب DNH",
    description:
      "چارچوب اختصاصی DNH برای تحلیل و سازمان‌دهی تصمیم‌های مالی راهبردی.",
    href: "/dnh/framework",
    icon: Network,
  },
  {
    index: "03",
    title: "میز هوشمندی DNH",
    description:
      "دسترسی به تحلیل، داده و هوشمندی مورد نیاز برای تصمیم‌های حساس.",
    href: "/dnh/intelligence-desk",
    icon: BrainCircuit,
  },
];

/* =============================================================================
   Services
============================================================================= */

const SERVICE_ITEMS: MegaItem[] = [
  {
    index: "01",
    title: "نمای کلی خدمات",
    description: "نگاهی جامع به خدمات راهبردی و حوزه‌های تخصصی DNH.",
    href: "/services",
    icon: LayoutGrid,
  },
  {
    index: "02",
    title: "استراتژی ثروت خصوصی",
    description: "طراحی رویکرد منسجم برای مدیریت، حفاظت و توسعه ثروت خصوصی.",
    href: "/services/private-wealth-strategy",
    icon: Gem,
  },
  {
    index: "03",
    title: "هوشمندی پرتفوی",
    description: "تحلیل ساختار، ترکیب، تمرکز و رفتار پرتفوی سرمایه‌گذاری.",
    href: "/services/portfolio-intelligence",
    icon: PieChart,
  },
  {
    index: "04",
    title: "مشاوره مالی راهبردی",
    description: "پشتیبانی تحلیلی برای تصمیم‌های مالی مهم، پیچیده و چندوجهی.",
    href: "/services/strategic-financial-advisory",
    icon: Briefcase,
  },
  {
    index: "05",
    title: "مشاوره اقتصاد و بازار",
    description: "تحلیل اقتصاد کلان، بازارها و متغیرهای مؤثر بر تصمیم سرمایه.",
    href: "/services/macro-market-advisory",
    icon: LineChart,
  },
  {
    index: "06",
    title: "مدیریت ریسک و حفاظت از ثروت",
    description: "شناسایی ریسک‌ها و طراحی ساختار مناسب برای حفاظت از سرمایه.",
    href: "/services/risk-management-wealth-protection",
    icon: ShieldCheck,
  },
  {
    index: "07",
    title: "نشست‌های مدیران",
    description: "جلسات تحلیلی و تصمیم‌محور برای مدیران و صاحبان سرمایه.",
    href: "/services/executive-briefings",
    icon: Presentation,
  },
];

/* =============================================================================
   Target markets
============================================================================= */

const TARGET_MARKET_ITEMS: MegaItem[] = [
  {
    index: "01",
    title: "تصمیم مالی بزرگ",
    description:
      "برای زمانی که یک تصمیم مهم مالی نیازمند تحلیل عمیق‌تر و نگاه چندبعدی است.",
    href: "/target-markets/big-financial-decision",
    icon: CircleDollarSign,
  },
  {
    index: "02",
    title: "پرتفوی پراکنده و بدون معماری",
    description:
      "برای دارایی‌هایی که رشد کرده‌اند اما هنوز ساختار منسجم و قابل مدیریت ندارند.",
    href: "/target-markets/unstructured-portfolio",
    icon: Layers3,
  },
  {
    index: "03",
    title: "هلدینگ‌ها و ساختار مالی و سرمایه",
    description:
      "برای مجموعه‌هایی با ساختار مالکیت، سرمایه و تصمیم‌گیری مالی پیچیده.",
    href: "/target-markets/holdings-financial-capital-structure",
    icon: Building2,
  },
];

/* =============================================================================
   Helpers
============================================================================= */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isRouteActive(pathname: string, href?: string) {
  if (!href) return false;

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isMegaRouteActive(pathname: string, menu?: MegaMenuKey) {
  if (!menu) return false;

  switch (menu) {
    case "dnh":
      return pathname.startsWith("/dnh/");

    case "services":
      return pathname === "/services" || pathname.startsWith("/services/");

    case "target-markets":
      return pathname.startsWith("/target-markets/");

    default:
      return false;
  }
}

/* =============================================================================
   Main Navbar
============================================================================= */

export default function DnhNavbar() {
  const pathname = usePathname();

  const menuBaseId = useId();
  const mobileMenuId = useId();

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [scrolled, setScrolled] = useState(false);

  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileSection, setMobileSection] = useState<MegaMenuKey | null>(null);

  const overlayVisible = Boolean(activeMenu) || mobileOpen;
  const headerElevated = scrolled || Boolean(activeMenu) || mobileOpen;
  /* =========================================================================
     Scroll morph
  ========================================================================= */

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      const next = window.scrollY > 24;

      setScrolled((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================================
     Desktop menu logic
  ========================================================================= */

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);

    closeTimerRef.current = null;
  }, []);

  const openMegaMenu = useCallback(
    (menu: MegaMenuKey) => {
      clearCloseTimer();

      setActiveMenu(menu);
    },
    [clearCloseTimer],
  );

  const closeMegaMenuDelayed = useCallback(() => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 170);
  }, [clearCloseTimer]);

  const closeEverything = useCallback(() => {
    clearCloseTimer();

    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [clearCloseTimer]);

  const handleMenuPointerEnter = (
    event: ReactPointerEvent,
    menu: MegaMenuKey,
  ) => {
    if (event.pointerType === "touch") {
      return;
    }

    openMegaMenu(menu);
  };

  /* =========================================================================
     Escape support
  ========================================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      closeEverything();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeEverything]);

  /* =========================================================================
     Cleanup timeout
  ========================================================================= */

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  /* =========================================================================
     Close after route change
  ========================================================================= */

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  /* =========================================================================
     Mobile scroll lock
  ========================================================================= */

  useEffect(() => {
    if (!mobileOpen) return;

    const body = document.body;

    const previousOverflow = body.style.overflow;

    const previousPaddingRight = body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;

      body.style.paddingRight = previousPaddingRight;
    };
  }, [mobileOpen]);

  /* =========================================================================
     Breakpoint synchronization
  ========================================================================= */

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1100px)");

    const sync = () => {
      if (media.matches) {
        setMobileOpen(false);
        setMobileSection(null);
      } else {
        setActiveMenu(null);
      }
    };

    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      {/* =====================================================================
          PAGE BACKDROP
      ====================================================================== */}

      <button
        type="button"
        aria-label="بستن منوی باز"
        tabIndex={overlayVisible ? 0 : -1}
        onClick={closeEverything}
        className={cn(
          `
            fixed
            inset-0
            z-[80]

            bg-brand-primary/10

            backdrop-blur-[11px]
            backdrop-saturate-[105%]

            transition-all
            duration-[400ms]
            ease-[cubic-bezier(.16,1,.3,1)]

            motion-reduce:transition-none
          `,
          overlayVisible
            ? `
                pointer-events-auto
                visible
                opacity-100
              `
            : `
                pointer-events-none
                invisible
                opacity-0
              `,
        )}
      />

      {/* =====================================================================
          HEADER
      ====================================================================== */}

      <header
        className="
    pointer-events-none

    fixed
    inset-x-0
    top-0

    z-[100]

    w-full
  "
      >
        <div
          className={cn(
            `
        pointer-events-auto

        relative

        mx-auto

        transition-[width,max-width,margin]
        duration-[650ms]
        ease-[cubic-bezier(.16,1,.3,1)]

        motion-reduce:transition-none
      `,
            scrolled
              ? `
            mt-[10px]

            w-[calc(100%-24px)]
            max-w-[1320px]
          `
              : `
            mt-[18px]

            w-[calc(100%-48px)]
            max-w-[1540px]
          `,
            `
        max-[640px]:
        mt-[8px]

        max-[640px]:
        w-[calc(100%-16px)]
      `,
          )}
        >
          {/* ===============================================================
        NAVBAR SHELL
    ================================================================ */}

          <div
            className={cn(
              `
          relative
          isolate

          transition-[height,background-color,border-color,border-radius,box-shadow,backdrop-filter]
          duration-[600ms]
          ease-[cubic-bezier(.16,1,.3,1)]

          motion-reduce:transition-none
        `,
              headerElevated
                ? `
              h-[70px]

              rounded-[24px]

              border
              border-line

              bg-page/[0.72]

              shadow-[0_14px_50px_color-mix(in_srgb,var(--dnh-primary)_16%,transparent)]

              backdrop-blur-[28px]
              backdrop-saturate-[150%]
            `
                : `
              h-[84px]

              rounded-[24px]

              border
              border-transparent

              bg-transparent

              shadow-none

              backdrop-blur-none
            `,
              `
          max-[1099px]:
          h-[64px]

          max-[1099px]:
          rounded-[21px]

          max-[1099px]:
          border-line

          max-[1099px]:
          bg-page/[0.88]

          max-[1099px]:
          shadow-[0_10px_35px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

          max-[1099px]:
          backdrop-blur-[24px]
        `,
            )}
          >
            {/* =============================================================
          GLASS REFLECTION - فقط در حالت Glass
      ============================================================== */}

            <span
              aria-hidden="true"
              className={cn(
                `
            pointer-events-none

            absolute
            inset-x-[10%]
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-page
            to-transparent

            transition-opacity
            duration-500
          `,
                headerElevated ? "opacity-80" : "opacity-0",
              )}
            />

            {/* =============================================================
          BRAND AMBIENT LIGHT
      ============================================================== */}

            <span
              aria-hidden="true"
              className={cn(
                `
            pointer-events-none

            absolute
            -top-[90px]
            right-[18%]

            z-[-1]

            h-[150px]
            w-[360px]

            rounded-full

            bg-brand-primary/[0.08]

            blur-[65px]

            transition-opacity
            duration-500
          `,
                headerElevated ? "opacity-100" : "opacity-0",
              )}
            />

            <span
              aria-hidden="true"
              className={cn(
                `
            pointer-events-none

            absolute
            -top-[90px]
            left-[18%]

            z-[-1]

            h-[130px]
            w-[240px]

            rounded-full

            bg-brand-accent/[0.045]

            blur-[60px]

            transition-opacity
            duration-500
          `,
                headerElevated ? "opacity-100" : "opacity-0",
              )}
            />

            {/* =============================================================
          DESKTOP
      ============================================================== */}

            <div
              dir="ltr"
              className="
          hidden
          h-full

          grid-cols-[minmax(220px,1fr)_auto_minmax(200px,1fr)]
          items-center

          gap-10

          px-6

          min-[1100px]:grid

          xl:gap-14
          xl:px-8

          2xl:gap-16
        "
            >
              {/* ===========================================================
            CTA
        ============================================================ */}

              <div
                dir="rtl"
                className="
            flex
            justify-start
          "
              >
                <ActionButton
                  href="/request-strategic-consultation"
                  aria-label="درخواست مشاوره راهبردی از DNH"
                  onPointerEnter={() => setActiveMenu(null)}
                  onFocus={() => setActiveMenu(null)}
                  variant="primary"
                  size="md"
                  icon={ArrowLeft}
                  iconPosition="end"
                  className="min-w-[220px]"
                >
                  درخواست مشاوره راهبردی
                </ActionButton>
              </div>

              {/* ===========================================================
            DESKTOP NAVIGATION
        ============================================================ */}

              <nav aria-label="ناوبری اصلی DNH" dir="rtl">
                <ul
                  className="
              flex
              items-center

              gap-[6px]

              xl:gap-[10px]
            "
                >
                  {NAVIGATION.map((item) => {
                    const Icon = item.icon;

                    const active =
                      isRouteActive(pathname, item.href) ||
                      isMegaRouteActive(pathname, item.menu);

                    /* =====================================================
                 MEGA MENU ITEM
              ====================================================== */

                    if (item.menu) {
                      const open = activeMenu === item.menu;

                      const panelId = `${menuBaseId}-${item.menu}`;

                      return (
                        <li
                          key={item.title}
                          className="relative"
                          onPointerEnter={(event) =>
                            handleMenuPointerEnter(event, item.menu!)
                          }
                          onPointerLeave={closeMegaMenuDelayed}
                        >
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId}
                            aria-haspopup="true"
                            onFocus={() => openMegaMenu(item.menu!)}
                            onClick={() => {
                              clearCloseTimer();

                              setActiveMenu((current) =>
                                current === item.menu ? null : item.menu!,
                              );
                            }}
                            className={cn(
                              `
                          group/nav

                          relative

                          flex
                          h-[46px]
                          items-center
                          gap-[8px]

                          rounded-[14px]

                          px-[13px]

                          text-[13px]
                          font-semibold

                          outline-none

                          transition-all
                          duration-300

                          focus-visible:ring-2
                          focus-visible:ring-focus/30

                          xl:px-[15px]
                        `,
                              active || open
                                ? `
                              bg-brand-primary/[0.075]

                              text-brand-primary
                            `
                                : `
                              text-ink

                              hover:bg-brand-primary/[0.055]
                              hover:text-brand-primary
                            `,
                            )}
                          >
                            {/* Icon */}

                            <Icon
                              aria-hidden="true"
                              strokeWidth={1.65}
                              className={cn(
                                `
                            h-[16px]
                            w-[16px]

                            shrink-0

                            transition-all
                            duration-300
                          `,
                                active || open
                                  ? `
                                text-brand-primary
                              `
                                  : `
                                text-ink-muted

                                group-hover/nav:text-brand-primary
                              `,
                              )}
                            />

                            {/* label */}

                            <span className="whitespace-nowrap">
                              {item.title}
                            </span>

                            {/* chevron */}

                            <ChevronDown
                              aria-hidden="true"
                              strokeWidth={1.7}
                              className={cn(
                                `
                            h-[12px]
                            w-[12px]

                            shrink-0

                            text-ink-muted

                            transition-all
                            duration-300

                            group-hover/nav:text-brand-primary
                          `,
                                open &&
                                  `
                              rotate-180

                              text-brand-primary
                            `,
                              )}
                            />

                            {/* Active line */}

                            {(active || open) && (
                              <span
                                aria-hidden="true"
                                className="
                            absolute
                            bottom-[5px]
                            left-1/2

                            h-[2px]
                            w-[16px]

                            -translate-x-1/2

                            rounded-full

                            bg-brand-accent
                          "
                              />
                            )}
                          </button>

                          {/* hover bridge */}

                          <span
                            aria-hidden="true"
                            className="
                        absolute
                        -bottom-[27px]
                        inset-x-0

                        h-[30px]
                      "
                          />
                        </li>
                      );
                    }

                    /* =====================================================
                 NORMAL ITEM
              ====================================================== */

                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href!}
                          aria-current={active ? "page" : undefined}
                          onPointerEnter={() => setActiveMenu(null)}
                          onFocus={() => setActiveMenu(null)}
                          className={cn(
                            `
                        group/nav

                        relative

                        flex
                        h-[46px]
                        items-center
                        gap-[8px]

                        rounded-[14px]

                        px-[13px]

                        text-[13px]
                        font-semibold

                        outline-none

                        transition-all
                        duration-300

                        focus-visible:ring-2
                        focus-visible:ring-focus/30

                        xl:px-[15px]
                      `,
                            active
                              ? `
                            bg-brand-primary/[0.075]

                            text-brand-primary
                          `
                              : `
                            text-ink

                            hover:bg-brand-primary/[0.055]
                            hover:text-brand-primary
                          `,
                          )}
                        >
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.65}
                            className={cn(
                              `
                          h-[16px]
                          w-[16px]

                          shrink-0

                          transition-colors
                          duration-300
                        `,
                              active
                                ? `
                              text-brand-primary
                            `
                                : `
                              text-ink-muted

                              group-hover/nav:text-brand-primary
                            `,
                            )}
                          />

                          <span className="whitespace-nowrap">
                            {item.title}
                          </span>

                          {active && (
                            <span
                              aria-hidden="true"
                              className="
                          absolute
                          bottom-[5px]
                          left-1/2

                          h-[2px]
                          w-[16px]

                          -translate-x-1/2

                          rounded-full

                          bg-brand-accent
                        "
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* ===========================================================
            LOGO
        ============================================================ */}

              <div
                className="
            flex
            justify-end
          "
              >
                <Link
                  href="/"
                  aria-label="DNH - صفحه اصلی"
                  className="
              flex
              h-[52px]
              min-w-[180px]
              items-center
              justify-end

              rounded-xl

              outline-none

              focus-visible:ring-2
              focus-visible:ring-focus/30
            "
                >
                  <Image
                    src="/assets/images/LOGO.svg"
                    alt="DNH"
                    width={175}
                    height={46}
                    sizes="175px"
                    priority
                    className="
                h-[38px]
                w-auto

                object-contain
              "
                  />
                </Link>
              </div>
            </div>

            {/* =============================================================
          MOBILE / TABLET
      ============================================================== */}

            <div
              dir="ltr"
              className="
          flex
          h-full
          items-center
          justify-between

          px-[10px]

          min-[1100px]:hidden
        "
            >
              {/* menu */}

              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls={mobileMenuId}
                aria-label={
                  mobileOpen ? "بستن منوی اصلی" : "باز کردن منوی اصلی"
                }
                onClick={() => {
                  setActiveMenu(null);

                  setMobileOpen((current) => !current);
                }}
                className={cn(
                  `
              relative

              flex
              h-[44px]
              w-[44px]
              items-center
              justify-center

              rounded-[14px]

              outline-none

              transition-all
              duration-300

              focus-visible:ring-4
              focus-visible:ring-focus/25
            `,
                  mobileOpen
                    ? `
                  bg-brand-primary

                  text-[var(--dnh-text-on-brand)]

                  shadow-[0_8px_22px_color-mix(in_srgb,var(--dnh-primary)_22%,transparent)]
                `
                    : `
                  bg-surface-soft

                  text-brand-primary
                `,
                )}
              >
                <Menu
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    `
                absolute

                h-[21px]
                w-[21px]

                transition-all
                duration-300
              `,
                    mobileOpen
                      ? `
                    scale-75
                    rotate-90
                    opacity-0
                  `
                      : `
                    scale-100
                    opacity-100
                  `,
                  )}
                />

                <X
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    `
                absolute

                h-[21px]
                w-[21px]

                transition-all
                duration-300
              `,
                    mobileOpen
                      ? `
                    scale-100
                    opacity-100
                  `
                      : `
                    scale-75
                    -rotate-90
                    opacity-0
                  `,
                  )}
                />
              </button>

              {/* logo */}

              <Link
                href="/"
                aria-label="DNH - صفحه اصلی"
                className="
            flex
            h-[44px]
            items-center
            justify-end
          "
              >
                <Image
                  src="/assets/images/LOGO.svg"
                  alt="DNH"
                  width={145}
                  height={38}
                  sizes="145px"
                  className="
              h-[31px]
              w-auto

              object-contain
            "
                />
              </Link>
            </div>
          </div>

          {/* ===============================================================
        DESKTOP MEGA MENU
    ================================================================ */}

          <div
            dir="rtl"
            inert={!activeMenu}
            aria-hidden={!activeMenu}
            onPointerEnter={(event) => {
              if (event.pointerType === "touch") {
                return;
              }

              clearCloseTimer();
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "touch") {
                return;
              }

              closeMegaMenuDelayed();
            }}
            className={cn(
              `
          absolute
          left-1/2

          z-[110]

          hidden

          w-[calc(100%-24px)]
          max-w-[1200px]

          -translate-x-1/2

          origin-top

          transition-all
          duration-[420ms]
          ease-[cubic-bezier(.16,1,.3,1)]

          min-[1100px]:block

          motion-reduce:transition-none
        `,
              scrolled ? "top-[82px]" : "top-[96px]",
              activeMenu
                ? `
              pointer-events-auto
              visible

              translate-y-0
              scale-100

              opacity-100
            `
                : `
              pointer-events-none
              invisible

              -translate-y-[9px]
              scale-[0.985]

              opacity-0
            `,
            )}
          >
            {/* hover bridge */}

            <span
              aria-hidden="true"
              className="
          absolute
          -top-[26px]
          inset-x-0

          h-[30px]
        "
            />

            {/* Mega Menu glass */}

            <div
              className="
          relative
          isolate

          overflow-hidden

          rounded-[26px]

          border
          border-line

          bg-page/[0.88]

          p-[9px]

          shadow-[0_30px_95px_color-mix(in_srgb,var(--dnh-primary)_19%,transparent)]

          backdrop-blur-[42px]
          backdrop-saturate-[160%]
        "
            >
              <span
                aria-hidden="true"
                className="
            pointer-events-none

            absolute
            -top-[190px]
            right-[2%]

            z-[-1]

            h-[380px]
            w-[520px]

            rounded-full

            bg-brand-primary/[0.10]

            blur-[95px]
          "
              />

              <span
                aria-hidden="true"
                className="
            pointer-events-none

            absolute
            -bottom-[170px]
            left-[4%]

            z-[-1]

            h-[300px]
            w-[340px]

            rounded-full

            bg-brand-accent/[0.05]

            blur-[90px]
          "
              />

              {activeMenu === "dnh" && <DnhMegaMenu id={`${menuBaseId}-dnh`} />}

              {activeMenu === "services" && (
                <ServicesMegaMenu id={`${menuBaseId}-services`} />
              )}

              {activeMenu === "target-markets" && (
                <TargetMarketsMegaMenu id={`${menuBaseId}-target-markets`} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MOBILE MENU
      ====================================================================== */}

      <aside
        id={mobileMenuId}
        dir="rtl"
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        aria-label="منوی اصلی موبایل DNH"
        className={cn(
          `
            fixed
            inset-x-[8px]

            z-[95]

            mx-auto

            max-h-[calc(100dvh-92px)]
            max-w-[720px]

            origin-top

            overflow-hidden

            rounded-[26px]

            border
            border-line

            bg-page/95

            shadow-[
              0_26px_85px_color-mix(in_srgb,var(--dnh-primary)_21%,transparent)
            ]

            backdrop-blur-[40px]
            backdrop-saturate-[155%]

            transition-all
            duration-[420ms]
            ease-[cubic-bezier(.16,1,.3,1)]

            min-[1100px]:hidden

            motion-reduce:transition-none
          `,
          scrolled
            ? "top-[83px]"
            : `
                top-[107px]

                max-[640px]:top-[81px]
              `,
          mobileOpen
            ? `
                pointer-events-auto
                visible

                translate-y-0
                scale-100

                opacity-100
              `
            : `
                pointer-events-none
                invisible

                -translate-y-[10px]
                scale-[0.98]

                opacity-0
              `,
        )}
      >
        <div
          className="
            max-h-[calc(100dvh-92px)]

            overflow-y-auto
            overscroll-contain

            p-[9px]
          "
        >
          {/* Mobile intro */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4

              px-[13px]
              pb-[14px]
              pt-[10px]
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-[7px]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-[5px]
                    w-[5px]

                    rounded-full

                    bg-brand-accent

                    shadow-[
                      0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_10%,transparent)
                    ]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    text-brand-primary
                  "
                >
                  DNH
                </span>
              </div>

              <p
                className="
                  mt-[5px]

                  text-[13px]
                  font-black

                  text-ink
                "
              >
                معماری تصمیم و ثروت
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-[6px]

                rounded-full

                border
                border-line

                bg-surface-soft

                px-[10px]
                py-[6px]

                text-[9px]
                font-bold

                text-ink-muted
              "
            >
              <Sparkles
                aria-hidden="true"
                strokeWidth={1.7}
                className="
                  h-[12px]
                  w-[12px]

                  text-brand-accent
                "
              />
              تصمیم‌گیری هوشمند
            </div>
          </div>

          <nav aria-label="ناوبری موبایل DNH">
            <ul
              className="
                rounded-[21px]

                border
                border-line

                bg-surface-soft/45

                p-[5px]
              "
            >
              <li>
                <MobileSimpleLink href="/" active={pathname === "/"}>
                  خانه
                </MobileSimpleLink>
              </li>

              <li>
                <MobileAccordion
                  title="DNH"
                  open={mobileSection === "dnh"}
                  active={pathname.startsWith("/dnh/")}
                  onToggle={() =>
                    setMobileSection((current) =>
                      current === "dnh" ? null : "dnh",
                    )
                  }
                >
                  {DNH_ITEMS.map((item) => (
                    <MobileMegaLink
                      key={item.href}
                      item={item}
                      active={isRouteActive(pathname, item.href)}
                    />
                  ))}
                </MobileAccordion>
              </li>

              <li>
                <MobileAccordion
                  title="خدمات"
                  open={mobileSection === "services"}
                  active={
                    pathname === "/services" ||
                    pathname.startsWith("/services/")
                  }
                  onToggle={() =>
                    setMobileSection((current) =>
                      current === "services" ? null : "services",
                    )
                  }
                >
                  {SERVICE_ITEMS.map((item) => (
                    <MobileMegaLink
                      key={item.href}
                      item={item}
                      active={isRouteActive(pathname, item.href)}
                    />
                  ))}
                </MobileAccordion>
              </li>

              <li>
                <MobileAccordion
                  title="بازارهای هدف"
                  open={mobileSection === "target-markets"}
                  active={pathname.startsWith("/target-markets/")}
                  onToggle={() =>
                    setMobileSection((current) =>
                      current === "target-markets" ? null : "target-markets",
                    )
                  }
                >
                  {TARGET_MARKET_ITEMS.map((item) => (
                    <MobileMegaLink
                      key={item.href}
                      item={item}
                      active={isRouteActive(pathname, item.href)}
                    />
                  ))}
                </MobileAccordion>
              </li>

              <li>
                <MobileSimpleLink
                  href="/knowledge"
                  active={pathname.startsWith("/knowledge")}
                >
                  دانش
                </MobileSimpleLink>
              </li>

              <li>
                <MobileSimpleLink
                  href="/about"
                  active={pathname.startsWith("/about")}
                >
                  درباره
                </MobileSimpleLink>
              </li>
            </ul>
          </nav>

          {/* Mobile CTA */}

          <div className="mt-[8px] space-y-[7px]">
            <ActionButton
              href="/request-strategic-consultation"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              iconPosition="end"
              contentAlignment="between"
              fullWidth
            >
              درخواست مشاوره راهبردی
            </ActionButton>

            <div
              className="
                grid
                grid-cols-2
                gap-[7px]
              "
            >
              <SecondaryMobileAction href="/financial-decision-assessment">
                ارزیابی تصمیم مالی
              </SecondaryMobileAction>

              <SecondaryMobileAction href="/contact">
                تماس با DNH
              </SecondaryMobileAction>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =============================================================================
   DNH Mega Menu
============================================================================= */

function DnhMegaMenu({ id }: { id: string }) {
  return (
    <section
      id={id}
      aria-label="بخش DNH"
      className="
        grid
        grid-cols-[1.08fr_.92fr]
        gap-[9px]
      "
    >
      <div
        className="
          rounded-[22px]

          border
          border-line

          bg-surface-soft/45

          p-[20px]
        "
      >
        <MegaHeading
          eyebrow="DNH"
          title="معماری برای تصمیم‌های بزرگ"
          description="سه لایه اصلی DNH برای ساختاردهی ثروت، تصمیم و هوشمندی."
        />

        <ul className="mt-[18px] space-y-[5px]">
          {DNH_ITEMS.map((item) => (
            <li key={item.href}>
              <MegaMenuRow item={item} />
            </li>
          ))}
        </ul>
      </div>

      <BrandPanel />
    </section>
  );
}

/* =============================================================================
   Services Mega Menu
============================================================================= */

function ServicesMegaMenu({ id }: { id: string }) {
  return (
    <section
      id={id}
      aria-label="خدمات DNH"
      className="
        grid
        grid-cols-[1fr_310px]
        gap-[9px]
      "
    >
      <div
        className="
          rounded-[22px]

          border
          border-line

          bg-surface-soft/45

          p-[20px]
        "
      >
        <MegaHeading
          eyebrow="خدمات DNH"
          title="خدمات راهبردی برای ثروت و سرمایه"
          description="مسیر تخصصی مورد نیاز خود را سریع و بدون پیچیدگی پیدا کنید."
          actionLabel="نمای کلی خدمات"
          actionHref="/services"
        />

        <ul
          className="
            mt-[17px]

            grid
            grid-cols-2
            gap-[5px]
          "
        >
          {SERVICE_ITEMS.filter((item) => item.href !== "/services").map(
            (item) => (
              <li key={item.href}>
                <MegaMenuRow item={item} compact />
              </li>
            ),
          )}
        </ul>
      </div>

      <DecisionPanel />
    </section>
  );
}

/* =============================================================================
   Target Markets Mega Menu
============================================================================= */

function TargetMarketsMegaMenu({ id }: { id: string }) {
  return (
    <section
      id={id}
      aria-label="بازارهای هدف DNH"
      className="
        rounded-[22px]

        border
        border-line

        bg-surface-soft/45

        p-[20px]
      "
    >
      <MegaHeading
        eyebrow="بازارهای هدف"
        title="مسئله شما از کجا شروع می‌شود؟"
        description="به‌جای جست‌وجوی نام سرویس، موقعیتی را انتخاب کنید که امروز با آن مواجه هستید."
      />

      <ul
        className="
          mt-[19px]

          grid
          grid-cols-3
          gap-[7px]
        "
      >
        {TARGET_MARKET_ITEMS.map((item) => (
          <li key={item.href} className="h-full">
            <TargetMarketCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =============================================================================
   Mega Heading
============================================================================= */

function MegaHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div
      className="
        flex
        items-end
        justify-between
        gap-8

        px-[4px]
      "
    >
      <div>
        <div
          className="
            flex
            items-center
            gap-[7px]
          "
        >
          <span
            aria-hidden="true"
            className="
              h-[5px]
              w-[5px]

              rounded-full

              bg-brand-accent

              shadow-[
                0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_10%,transparent)
              ]
            "
          />

          <span
            className="
              text-[9px]
              font-bold

              text-brand-primary
            "
          >
            {eyebrow}
          </span>
        </div>

        <h2
          className="
            mt-[8px]

            text-[19px]
            font-black

            tracking-[-0.035em]

            text-ink
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-[4px]

            max-w-[560px]

            text-[10px]
            leading-[1.9]

            text-ink-muted
          "
        >
          {description}
        </p>
      </div>

      {actionLabel && actionHref && (
        <ActionButton
          href={actionHref}
          variant="secondary"
          size="sm"
          icon={ArrowLeft}
          iconPosition="end"
          className="shrink-0"
        >
          {actionLabel}
        </ActionButton>
      )}
    </div>
  );
}

/* =============================================================================
   Mega Item Row
============================================================================= */

function MegaMenuRow({
  item,
  compact = false,
}: {
  item: MegaItem;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        `
          group/item

          flex
          w-full
          items-center
          gap-[12px]

          rounded-[18px]

          border
          border-transparent

          outline-none

          transition-all
          duration-300

          hover:border-line
          hover:bg-page

          hover:shadow-[
            0_9px_28px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)
          ]

          focus-visible:border-line-strong
          focus-visible:bg-page
          focus-visible:ring-2
          focus-visible:ring-focus/25
        `,
        compact
          ? `
              min-h-[76px]
              px-[10px]
            `
          : `
              min-h-[82px]
              px-[12px]
            `,
      )}
    >
      <IconTile icon={Icon} compact={compact} />

      <div className="min-w-0 flex-1">
        <div
          className="
            flex
            items-center
            gap-[7px]
          "
        >
          <span
            className={cn(
              `
                font-black
                text-ink
              `,
              compact ? "text-[11px]" : "text-[12px]",
            )}
          >
            {item.title}
          </span>

          {item.badge && (
            <span
              className="
                rounded-full

                bg-brand-accent/10

                px-[7px]
                py-[3px]

                text-[7px]
                font-black

                text-brand-accent
              "
            >
              {item.badge}
            </span>
          )}
        </div>

        <p
          className={cn(
            `
              mt-[3px]

              leading-[1.9]

              text-ink-muted
            `,
            compact
              ? `
                  line-clamp-1
                  text-[8px]
                `
              : "text-[9px]",
          )}
        >
          {item.description}
        </p>
      </div>

      <span
        className="
          flex
          h-[29px]
          w-[29px]
          shrink-0
          items-center
          justify-center

          translate-x-[4px]

          rounded-full

          bg-surface-soft

          text-brand-primary

          opacity-0

          transition-all
          duration-300

          group-hover/item:translate-x-0
          group-hover/item:opacity-100
        "
      >
        <ArrowLeft
          aria-hidden="true"
          strokeWidth={1.8}
          className="
            h-[12px]
            w-[12px]
          "
        />
      </span>
    </Link>
  );
}

/* =============================================================================
   Unified Icon Tile
============================================================================= */

function IconTile({
  icon: Icon,
  compact = false,
}: {
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `
          relative

          flex
          shrink-0
          items-center
          justify-center

          overflow-hidden

          rounded-[14px]

          border
          border-line

          bg-surface-soft

          text-brand-primary

          shadow-[
            0_6px_18px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)
          ]

          transition-all
          duration-300

          group-hover/item:border-line-strong
          group-hover/item:bg-page

          group-hover/item:shadow-[
            0_9px_24px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)
          ]
        `,
        compact
          ? `
              h-[42px]
              w-[42px]
            `
          : `
              h-[46px]
              w-[46px]
            `,
      )}
    >
      <span
        className="
          absolute
          -right-[12px]
          -top-[12px]

          h-[25px]
          w-[25px]

          rounded-full

          bg-brand-accent/10

          blur-[8px]
        "
      />

      <Icon
        strokeWidth={1.65}
        className={cn(
          `
            relative
            z-10
          `,
          compact
            ? `
                h-[18px]
                w-[18px]
              `
            : `
                h-[20px]
                w-[20px]
              `,
        )}
      />
    </span>
  );
}

/* =============================================================================
   Target Market Card
============================================================================= */

function TargetMarketCard({ item }: { item: MegaItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="
        group/card

        relative

        flex
        h-full
        min-h-[220px]
        flex-col

        overflow-hidden

        rounded-[20px]

        border
        border-line

        bg-page/80

        p-[18px]

        outline-none

        transition-all
        duration-300

        hover:-translate-y-[2px]

        hover:border-line-strong
        hover:bg-page

        hover:shadow-[
          0_18px_44px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)
        ]

        focus-visible:ring-2
        focus-visible:ring-focus/30

        motion-reduce:transform-none
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <span
          className="
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center

            rounded-[14px]

            border
            border-line

            bg-surface-soft

            text-brand-primary

            transition-all
            duration-300

            group-hover/card:border-line-strong
            group-hover/card:bg-brand-primary

            group-hover/card:text-[var(--dnh-text-on-brand)]
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.65}
            className="
              h-[20px]
              w-[20px]
            "
          />
        </span>

        <span
          className="
            text-[9px]
            font-black

            text-brand-primary/65
          "
        >
          {item.index}
        </span>
      </div>

      <h3
        className="
          mt-[22px]

          text-[14px]
          font-black
          leading-[1.8]

          tracking-[-0.025em]

          text-ink
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-[7px]

          text-[9px]
          leading-[2]

          text-ink-muted
        "
      >
        {item.description}
      </p>

      <div
        className="
          mt-auto
          pt-[20px]
        "
      >
        <span
          className="
            inline-flex
            h-[31px]
            w-[31px]
            items-center
            justify-center

            rounded-full

            bg-surface-soft

            text-brand-primary

            transition-all
            duration-300

            group-hover/card:-translate-x-[2px]

            group-hover/card:bg-brand-primary

            group-hover/card:text-[var(--dnh-text-on-brand)]
          "
        >
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={1.8}
            className="
              h-[13px]
              w-[13px]
            "
          />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          -right-[80px]
          -top-[80px]

          h-[170px]
          w-[170px]

          rounded-full

          bg-brand-primary/0

          blur-[50px]

          transition-colors
          duration-500

          group-hover/card:bg-brand-primary/10
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-[18px]

          h-px
          w-[50px]

          bg-brand-accent

          opacity-0

          transition-opacity
          duration-300

          group-hover/card:opacity-100
        "
      />
    </Link>
  );
}

/* =============================================================================
   DNH Brand Panel
============================================================================= */

function BrandPanel() {
  return (
    <aside
      className="
        relative

        overflow-hidden

        rounded-[22px]

        bg-brand-primary

        p-[27px]

        text-[var(--dnh-text-on-brand)]

        shadow-[
          0_20px_50px_color-mix(in_srgb,var(--dnh-primary)_28%,transparent)
        ]
      "
      aria-label="معرفی معماری DNH"
    >
      <BrandDecoration />

      <div className="relative z-10">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-[6px]

              rounded-full

              border
              border-page/15

              bg-page/10

              px-[10px]
              py-[6px]

              text-[9px]
              font-bold
            "
          >
            <Sparkles
              aria-hidden="true"
              strokeWidth={1.7}
              className="
                h-[12px]
                w-[12px]

                text-brand-accent
              "
            />
            DNH Wealth Architecture
          </span>

          <span
            className="
              flex
              h-[44px]
              w-[44px]
              items-center
              justify-center

              rounded-full

              border
              border-page/15

              bg-page/10
            "
          >
            <Compass
              aria-hidden="true"
              strokeWidth={1.6}
              className="
                h-[19px]
                w-[19px]
              "
            />
          </span>
        </div>

        <div className="mt-[42px]">
          <p
            dir="ltr"
            className="
              text-[52px]
              font-black

              tracking-[-0.07em]
            "
          >
            DNH
          </p>

          <h3
            className="
              mt-[5px]

              text-[17px]
              font-black
            "
          >
            معماری تصمیم و ثروت
          </h3>

          <p
            className="
              mt-[9px]

              max-w-[320px]

              text-[10px]
              leading-[2]

              opacity-65
            "
          >
            ساختاری برای دیدن تصویر بزرگ‌تر، کاهش پراکندگی و افزایش کیفیت
            تصمیم‌های مالی.
          </p>
        </div>

        <ActionButton
          href="/dnh/wealth-architecture"
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          iconPosition="end"
          contentAlignment="between"
          fullWidth
          className="mt-[28px]"
        >
          کشف معماری ثروت
        </ActionButton>
      </div>
    </aside>
  );
}

/* =============================================================================
   Decision Panel
============================================================================= */

function DecisionPanel() {
  return (
    <aside
      aria-label="ارزیابی تصمیم مالی"
      className="
        relative

        overflow-hidden

        rounded-[22px]

        bg-brand-primary

        p-[24px]

        text-[var(--dnh-text-on-brand)]

        shadow-[
          0_20px_50px_color-mix(in_srgb,var(--dnh-primary)_28%,transparent)
        ]
      "
    >
      <BrandDecoration />

      <div className="relative z-10">
        <span
          className="
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center

            rounded-[14px]

            border
            border-page/15

            bg-page/10
          "
        >
          <CircleDollarSign
            aria-hidden="true"
            strokeWidth={1.65}
            className="
              h-[20px]
              w-[20px]
            "
          />
        </span>

        <p
          className="
            mt-[30px]

            text-[9px]
            font-bold

            opacity-55
          "
        >
          نقطه شروع
        </p>

        <h3
          className="
            mt-[6px]

            text-[20px]
            font-black
            leading-[1.7]

            tracking-[-0.035em]
          "
        >
          یک تصمیم مالی
          <br />
          مهم پیش رو دارید؟
        </h3>

        <p
          className="
            mt-[9px]

            text-[10px]
            leading-[2]

            opacity-65
          "
        >
          قبل از انتخاب مسیر، مسئله را دقیق‌تر تعریف و ارزیابی کنید.
        </p>

        <ActionButton
          href="/financial-decision-assessment"
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          iconPosition="end"
          contentAlignment="between"
          fullWidth
          className="mt-[25px]"
        >
          ارزیابی تصمیم مالی
        </ActionButton>
      </div>
    </aside>
  );
}

/* =============================================================================
   Brand Decorations
============================================================================= */

function BrandDecoration() {
  return (
    <>
      <span
        aria-hidden="true"
        className="
          absolute
          -left-[100px]
          -top-[100px]

          h-[250px]
          w-[250px]

          rounded-full

          bg-page/10

          blur-[65px]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-[90px]
          -right-[75px]

          h-[205px]
          w-[205px]

          rounded-full

          bg-brand-accent/15

          blur-[60px]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-[10%]
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-page/35
          to-transparent
        "
      />
    </>
  );
}

/* =============================================================================
   Mobile Accordion
============================================================================= */

function MobileAccordion({
  title,
  active,
  open,
  onToggle,
  children,
}: {
  title: string;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={cn(
          `
            flex
            min-h-[55px]
            w-full
            items-center
            justify-between

            rounded-[17px]

            px-[15px]

            text-[13px]
            font-bold

            outline-none

            transition-all
            duration-200

            focus-visible:ring-2
            focus-visible:ring-focus/25
          `,
          active || open
            ? `
                bg-page

                text-brand-primary

                shadow-[
                  0_5px_18px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)
                ]
              `
            : `
                text-ink

                hover:bg-page
                hover:text-brand-primary
              `,
        )}
      >
        {title}

        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.8}
          className={cn(
            `
              h-[14px]
              w-[14px]

              transition-transform
              duration-300
            `,
            open && "rotate-180",
          )}
        />
      </button>

      <div
        inert={!open}
        aria-hidden={!open}
        className={cn(
          `
            grid

            transition-[grid-template-rows,opacity]
            duration-[380ms]
            ease-[cubic-bezier(.16,1,.3,1)]

            motion-reduce:transition-none
          `,
          open
            ? `
                grid-rows-[1fr]
                opacity-100
              `
            : `
                grid-rows-[0fr]
                opacity-0
              `,
        )}
      >
        <div className="overflow-hidden">
          <ul
            className="
              space-y-[3px]

              px-[4px]
              pb-[8px]
              pt-[5px]
            "
          >
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Mobile mega link
============================================================================= */

function MobileMegaLink({ item, active }: { item: MegaItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          `
            group/mobile-item

            flex
            min-h-[64px]
            items-center
            gap-[11px]

            rounded-[15px]

            border

            px-[9px]

            outline-none

            transition-all
            duration-200

            focus-visible:ring-2
            focus-visible:ring-focus/25
          `,
          active
            ? `
                border-line

                bg-page
              `
            : `
                border-transparent

                hover:border-line
                hover:bg-page/80
              `,
        )}
      >
        <span
          className="
            flex
            h-[40px]
            w-[40px]
            shrink-0
            items-center
            justify-center

            rounded-[12px]

            border
            border-line

            bg-surface-soft

            text-brand-primary

            transition-all
            duration-200

            group-hover/mobile-item:border-line-strong
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.65}
            className="
              h-[17px]
              w-[17px]
            "
          />
        </span>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-center
              gap-[6px]
            "
          >
            <span
              className="
                truncate

                text-[11px]
                font-black

                text-ink
              "
            >
              {item.title}
            </span>

            {item.badge && (
              <span
                className="
                  rounded-full

                  bg-brand-accent/10

                  px-[5px]
                  py-[2px]

                  text-[7px]
                  font-black

                  text-brand-accent
                "
              >
                {item.badge}
              </span>
            )}
          </div>

          <p
            className="
              mt-[2px]

              truncate

              text-[8px]

              text-ink-muted
            "
          >
            {item.description}
          </p>
        </div>

        {active && (
          <span
            aria-hidden="true"
            className="
              h-[5px]
              w-[5px]

              shrink-0

              rounded-full

              bg-brand-accent
            "
          />
        )}
      </Link>
    </li>
  );
}

/* =============================================================================
   Mobile simple link
============================================================================= */

function MobileSimpleLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        `
          flex
          min-h-[55px]
          items-center
          justify-between

          rounded-[17px]

          px-[15px]

          text-[13px]
          font-bold

          outline-none

          transition-all
          duration-200

          focus-visible:ring-2
          focus-visible:ring-focus/25
        `,
        active
          ? `
              bg-page

              text-brand-primary

              shadow-[
                0_5px_18px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)
              ]
            `
          : `
              text-ink

              hover:bg-page
              hover:text-brand-primary
            `,
      )}
    >
      {children}

      {active && (
        <span
          aria-hidden="true"
          className="
            h-[5px]
            w-[5px]

            rounded-full

            bg-brand-accent

            shadow-[
              0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_10%,transparent)
            ]
          "
        />
      )}
    </Link>
  );
}

/* =============================================================================
   Mobile secondary action
============================================================================= */

function SecondaryMobileAction({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <ActionButton
      href={href}
      variant="secondary"
      size="sm"
      icon={ArrowLeft}
      iconPosition="end"
      contentAlignment="between"
      fullWidth
    >
      {children}
    </ActionButton>
  );
}
