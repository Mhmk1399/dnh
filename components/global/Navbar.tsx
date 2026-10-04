"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  Briefcase,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Gem,
  Landmark,
  Layers3,
  LayoutGrid,
  LineChart,
  Menu as MenuIcon,
  Network,
  PieChart,
  Presentation,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ActionButton } from "@/components/ui/ActionButton";
import Image from "next/image";

/*
  این آرایه‌ها را همان‌هایی قرار بده که در پیام خودت فرستادی:
  NAVIGATION
  DNH_ITEMS
  SERVICE_ITEMS
  TARGET_MARKET_ITEMS
*/

type MegaMenuKey = "dnh" | "services" | "target-markets";

type NavItem = {
  title: string;
  href?: string;
  menu?: MegaMenuKey;
};

type MegaItem = {
  index: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type MegaMenuDefinition = {
  title: string;
  subtitle: string;
  items: MegaItem[];
};

/* -------------------------------------------------------------------------- */
/* Mega menu config                                                           */
/* -------------------------------------------------------------------------- */
const NAVIGATION: NavItem[] = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "DNH",
    menu: "dnh",
  },
  {
    title: "خدمات",
    href: "/services",
    menu: "services",
  },
  {
    title: "بازارهای هدف",
    menu: "target-markets",
  },
  {
    title: "دانش",
    href: "/knowledge",
  },
  {
    title: "درباره",
    href: "/about",
  },
];

/* =============================================================================
   DNH
============================================================================= */

const DNH_ITEMS: MegaItem[] = [
  {
    index: "01",
    title: "معماری ثروت",
    description: "ساختاری منسجم برای سازمان‌دهی ثروت، سرمایه و تصمیم‌های مالی.",
    href: "/dnh/wealth-architecture",
    icon: Landmark,
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
   Target Markets
============================================================================= */

const TARGET_MARKET_ITEMS: MegaItem[] = [
  {
    index: "01",
    title: "تصمیم مالی بزرگ",
    description:
      "برای تصمیم‌های مهم مالی که نیازمند تحلیل عمیق‌تر و نگاه چندبعدی هستند.",
    href: "/target-markets/big-financial-decision",
    icon: CircleDollarSign,
  },
  {
    index: "02",
    title: "پرتفوی پراکنده و بدون معماری",
    description:
      "برای دارایی‌هایی که رشد کرده‌اند اما هنوز ساختار منسجم ندارند.",
    href: "/target-markets/unstructured-portfolio",
    icon: Layers3,
  },
  {
    index: "03",
    title: "هلدینگ‌ها و ساختار مالی و سرمایه",
    description:
      "برای مجموعه‌هایی با ساختار مالکیت، سرمایه و تصمیم‌گیری پیچیده.",
    href: "/target-markets/holdings-financial-capital-structure",
    icon: Building2,
  },
];

const MEGA_MENUS: Record<MegaMenuKey, MegaMenuDefinition> = {
  dnh: {
    title: "DNH",
    subtitle: "معماری، چارچوب و هوشمندی برای تصمیم‌های مالی پیچیده",
    items: DNH_ITEMS,
  },

  services: {
    title: "خدمات DNH",
    subtitle: "خدمات راهبردی برای ثروت، سرمایه، ریسک و تصمیم‌گیری مالی",
    items: SERVICE_ITEMS,
  },

  "target-markets": {
    title: "بازارهای هدف",
    subtitle: "مسیرهای تخصصی برای موقعیت‌هایی که به تصمیم دقیق‌تری نیاز دارند",
    items: TARGET_MARKET_ITEMS,
  },
};

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MegaMenuKey | null>(null);

  /*
   * وقتی مگا منو باز است نیز Navbar سفید می‌شود.
   * در حالت عادی و قبل از Scroll کاملاً Transparent باقی می‌ماند.
   */
  const elevated = scrolled || openMenu !== null || mobileOpen;

  /* ---------------------------------------------------------------------- */
  /* Scroll state                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const updateNavbar = () => {
      const nextScrolled = window.scrollY > 20;

      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Close menus after navigation                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  /* ---------------------------------------------------------------------- */
  /* Escape                                                                 */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpenMenu(null);
      setMobileOpen(false);
      setMobileSection(null);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Mobile body lock                                                       */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ---------------------------------------------------------------------- */

  const megaColumns = useMemo(() => {
    if (openMenu === "services") {
      return "lg:grid-cols-3";
    }

    return "lg:grid-cols-3";
  }, [openMenu]);

  function isPathActive(href?: string) {
    if (!href) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isMenuActive(menu: MegaMenuKey) {
    return MEGA_MENUS[menu].items.some((item) => isPathActive(item.href));
  }

  function handleMenuToggle(menu: MegaMenuKey) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-[60]
          w-full

          border-b

          transition-[background-color,border-color,box-shadow]
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]

          ${
            elevated
              ? `
                border-line
                shadow-lg
              `
              : `
                border-transparent
                shadow-none
              `
          }
        `}
        style={
          elevated
            ? {
                backgroundColor:
                  "color-mix(in srgb, var(--dnh-bg-page) 86%, transparent)",
                backdropFilter: "blur(18px) saturate(145%)",
                WebkitBackdropFilter: "blur(18px) saturate(145%)",
              }
            : {
                backgroundColor: "transparent",
              }
        }
        onMouseLeave={() => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            setOpenMenu(null);
          }
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Main bar                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            mx-auto
            grid
            h-16
            w-full
            max-w-[1536px]
            grid-cols-[auto_1fr_auto]
            items-center
            gap-4
            px-5

            sm:px-8

            lg:h-20
            lg:gap-8
            lg:px-12

            xl:px-16
            2xl:px-20
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* Logo                                                           */}
          {/* -------------------------------------------------------------- */}

          <Link
            href="/"
            aria-label="DNH - صفحه اصلی"
            className={`
              relative
              z-10
              flex
              h-[52px]
              w-[156px]
              shrink-0
              items-center
              justify-center

              rounded-[16px]
              border

              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-focus/25

              transition-[background-color,border-color,box-shadow]
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                elevated
                  ? `
                    border-transparent
                    bg-transparent
                    shadow-none
                  `
                  : `
                    border-white/80
                    bg-white/95
                    shadow-lg
                    backdrop-blur-md
                  `
              }
            `}
          >
            <Image
              src={"/assets/images/LOGO.svg"}
              height={44}
              width={140}
              alt="DNH"
              className="h-11 w-[140px]"
            />

            <span className="sr-only">DNH</span>
          </Link>

          {/* -------------------------------------------------------------- */}
          {/* Desktop navigation                                             */}
          {/* -------------------------------------------------------------- */}

          <nav
            aria-label="ناوبری اصلی"
            dir="rtl"
            className="
              hidden
              h-full
              items-stretch
              justify-center
              lg:flex
            "
          >
            {NAVIGATION.map((item) => {
              const active = item.menu
                ? isMenuActive(item.menu)
                : isPathActive(item.href);

              if (item.menu) {
                const opened = openMenu === item.menu;

                return (
                  <div
                    key={item.title}
                    className="
                      relative
                      flex
                      h-full
                      items-center
                    "
                    onMouseEnter={() => setOpenMenu(item.menu!)}
                  >
                    <button
                      type="button"
                      aria-expanded={opened}
                      aria-controls={`mega-menu-${item.menu}`}
                      onClick={() => handleMenuToggle(item.menu!)}
                      className={`
                        group/nav
                        relative

                        flex
                        h-full
                        cursor-pointer
                        items-center
                        gap-1.5

                        px-4

                        text-[13px]
                        font-bold

                        outline-none

                        transition-colors
                        duration-300

                        focus-visible:ring-4
                        focus-visible:ring-focus/20

                        ${
                          elevated
                            ? "text-ink hover:text-brand-primary"
                            : "text-white hover:text-white"
                        }
                      `}
                    >
                      <span>{item.title}</span>

                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1.8}
                        className={`
                          h-3.5
                          w-3.5

                          transition-transform
                          duration-300

                          ${opened ? "rotate-180 text-brand-accent" : ""}
                        `}
                      />

                      <NavIndicator active={active} opened={opened} />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href!}
                  className={`
                    group/nav
                    relative

                    flex
                    h-full
                    items-center

                    px-4

                    text-[13px]
                    font-bold

                    outline-none

                    transition-colors
                    duration-300

                    focus-visible:ring-4
                    focus-visible:ring-focus/20

                    ${
                      elevated
                        ? "text-ink hover:text-brand-primary"
                        : "text-white hover:text-white"
                    }
                  `}
                >
                  {item.title}

                  <NavIndicator active={active} opened={false} />
                </Link>
              );
            })}
          </nav>

          {/* -------------------------------------------------------------- */}
          {/* Desktop CTA                                                    */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              hidden
              items-center
              justify-end
              lg:flex
            "
          >
            <ActionButton
              href="/consultation"
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              className={`
                min-w-[190px]

                ${
                  elevated
                    ? `
                      border-line
                      bg-page/70
                      text-ink
                    `
                    : `
                      border-white/35
                      bg-white/5
                      text-white
                      shadow-none
                      backdrop-blur-sm

                      hover:border-white/70
                      hover:bg-white/10
                      hover:text-white
                    `
                }
              `}
            >
              درخواست مشاوره راهبردی
            </ActionButton>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Mobile toggle                                                  */}
          {/* -------------------------------------------------------------- */}

          <button
            type="button"
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
            className={`
              col-start-3
              flex
              h-11
              w-11
              cursor-pointer
              items-center
              justify-center
              justify-self-end

              rounded-full
              border

              outline-none

              transition-[background-color,border-color,color,transform]
              duration-300

              active:scale-95

              focus-visible:ring-4
              focus-visible:ring-focus/25

              lg:hidden

              ${
                elevated
                  ? `
                    border-line
                    bg-surface-soft
                    text-brand-primary
                  `
                  : `
                    border-white/25
                    bg-white/5
                    text-white
                    backdrop-blur-sm
                  `
              }
            `}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            ) : (
              <MenuIcon
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Mega Menus                                               */}
        {/* ---------------------------------------------------------------- */}

        <div className="hidden lg:block">
          {(Object.keys(MEGA_MENUS) as MegaMenuKey[]).map((menuKey) => {
            const menu = MEGA_MENUS[menuKey];
            const opened = openMenu === menuKey;

            return (
              <div
                key={menuKey}
                id={`mega-menu-${menuKey}`}
                aria-hidden={!opened}
                className={`
                    absolute
                    inset-x-0
                    top-full

                    px-8
                    pt-3

                    transition-[opacity,transform,visibility]
                    duration-300
                    ease-[cubic-bezier(.22,1,.36,1)]

                    ${
                      opened
                        ? `
                          visible
                          translate-y-0
                          opacity-100
                          pointer-events-auto
                        `
                        : `
                          invisible
                          -translate-y-2
                          opacity-0
                          pointer-events-none
                        `
                    }
                  `}
              >
                <div
                  dir="rtl"
                  className="
                      mx-auto
                      w-full
                      max-w-[1320px]
                      overflow-hidden

                      rounded-[24px]

                      border
                      border-line

                      bg-page/95

                      shadow-2xl

                      backdrop-blur-xl
                    "
                >
                  {/* Header */}
                  <div
                    className="
                        flex
                        items-center
                        justify-between

                        border-b
                        border-line

                        px-7
                        py-5
                      "
                  >
                    <div>
                      <div
                        className="
                            mb-1.5
                            flex
                            items-center
                            gap-2.5
                          "
                      >
                        <span
                          aria-hidden="true"
                          className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-brand-accent
                            "
                        />

                        <h2
                          className="
                              text-[15px]
                              font-black
                              text-ink
                            "
                        >
                          {menu.title}
                        </h2>
                      </div>

                      <p
                        className="
                            text-[12px]
                            leading-6
                            text-ink-muted
                          "
                      >
                        {menu.subtitle}
                      </p>
                    </div>

                    <span
                      dir="ltr"
                      className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-brand-primary
                        "
                    >
                      DNH Advisory
                    </span>
                  </div>

                  {/* Items */}
                  <div
                    className={`
                        grid
                        gap-px
                        bg-line
                        ${megaColumns}
                      `}
                  >
                    {menu.items.map((item) => (
                      <MegaMenuItem
                        key={item.href}
                        item={item}
                        active={isPathActive(item.href)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile menu                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div
          aria-hidden={!mobileOpen}
          className={`
            absolute
            inset-x-0
            top-full

            overflow-y-auto
            overscroll-contain

            border-t
            border-line

            bg-page/95

            px-5
            pb-8
            pt-3

            shadow-xl
            backdrop-blur-xl

            transition-[opacity,transform,visibility]
            duration-300

            sm:px-8

            lg:hidden

            ${
              mobileOpen
                ? `
                  visible
                  translate-y-0
                  opacity-100
                  pointer-events-auto
                `
                : `
                  invisible
                  -translate-y-2
                  opacity-0
                  pointer-events-none
                `
            }
          `}
          style={{
            maxHeight: "calc(100dvh - 4rem)",
          }}
        >
          <nav
            dir="rtl"
            aria-label="منوی موبایل"
            className="
              mx-auto
              max-w-xl
            "
          >
            {NAVIGATION.map((item) => {
              const active = item.menu
                ? isMenuActive(item.menu)
                : isPathActive(item.href);

              if (!item.menu) {
                return (
                  <Link
                    key={item.title}
                    href={item.href!}
                    className={`
                      flex
                      min-h-14
                      items-center
                      justify-between

                      border-b
                      border-line

                      py-3

                      text-[14px]
                      font-bold

                      ${active ? "text-brand-primary" : "text-ink"}
                    `}
                  >
                    <span>{item.title}</span>

                    {active ? (
                      <span
                        aria-hidden="true"
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-brand-accent
                        "
                      />
                    ) : null}
                  </Link>
                );
              }

              const expanded = mobileSection === item.menu;

              return (
                <div
                  key={item.title}
                  className="
                    border-b
                    border-line
                  "
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSection((current) =>
                        current === item.menu ? null : item.menu!,
                      )
                    }
                    className={`
                      flex
                      min-h-14
                      w-full
                      cursor-pointer
                      items-center
                      justify-between
                      gap-4

                      py-3

                      text-right
                      text-[14px]
                      font-bold

                      outline-none

                      focus-visible:ring-4
                      focus-visible:ring-focus/20

                      ${active ? "text-brand-primary" : "text-ink"}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {item.title}

                      {active ? (
                        <span
                          aria-hidden="true"
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-brand-accent
                          "
                        />
                      ) : null}
                    </span>

                    <ChevronDown
                      aria-hidden="true"
                      className={`
                        h-4
                        w-4
                        shrink-0

                        text-brand-primary

                        transition-transform
                        duration-300

                        ${expanded ? "rotate-180" : ""}
                      `}
                      strokeWidth={1.8}
                    />
                  </button>

                  <div
                    className={`
                      grid

                      transition-[grid-template-rows,opacity]
                      duration-300

                      ${
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="
                          mb-4
                          grid
                          gap-2

                          rounded-2xl
                          bg-surface-soft
                          p-2
                        "
                      >
                        {MEGA_MENUS[item.menu].items.map((megaItem) => (
                          <MobileMegaItem
                            key={megaItem.href}
                            item={megaItem}
                            active={isPathActive(megaItem.href)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-6">
              <ActionButton
                href="/consultation"
                variant="primary"
                size="md"
                icon={ArrowLeft}
                fullWidth
              >
                درخواست مشاوره راهبردی
              </ActionButton>
            </div>
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Backdrop                                                           */}
      {/* ------------------------------------------------------------------ */}

      {openMenu !== null && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setOpenMenu(null)}
          className="
            fixed
            inset-0
            z-50
            hidden
            cursor-default
            bg-black/10
            backdrop-blur-[1px]
            lg:block
          "
        />
      )}
    </>
  );
}

/* =============================================================================
   Desktop mega item
============================================================================= */

function MegaMenuItem({ item, active }: { item: MegaItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
        group/mega
        relative

        flex
        min-h-[150px]
        gap-4

        bg-page

        p-6

        outline-none

        transition-[background-color,color]
        duration-300

        hover:bg-surface-soft

        focus-visible:z-10
        focus-visible:ring-4
        focus-visible:ring-inset
        focus-visible:ring-focus/20

        ${active ? "bg-surface-soft" : ""}
      `}
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center

          rounded-full

          border
          border-line

          bg-page
          text-brand-primary

          transition-[background-color,color,border-color,transform]
          duration-300

          group-hover/mega:-translate-y-0.5
          group-hover/mega:border-brand-primary
          group-hover/mega:bg-brand-primary
          group-hover/mega:text-white
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <h3
            className="
              text-[14px]
              font-black
              leading-7
              text-ink

              transition-colors
              duration-300

              group-hover/mega:text-brand-primary
            "
          >
            {item.title}
          </h3>

          <span
            dir="ltr"
            className="
              text-[9px]
              font-bold
              tracking-[0.12em]
              text-brand-accent
            "
          >
            {item.index}
          </span>
        </div>

        <p
          className="
            max-w-[330px]
            text-[11px]
            leading-[2]
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
            absolute
            inset-y-5
            right-0
            w-[3px]
            bg-brand-accent
          "
        />
      )}
    </Link>
  );
}

/* =============================================================================
   Mobile mega item
============================================================================= */

function MobileMegaItem({ item, active }: { item: MegaItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
        flex
        items-start
        gap-3

        rounded-xl
        border

        p-3

        transition-[background-color,border-color]
        duration-300

        ${
          active
            ? `
              border-brand-primary
              bg-page
            `
            : `
              border-transparent
              hover:border-line
              hover:bg-page
            `
        }
      `}
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-page
          text-brand-primary
        "
      >
        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="
              text-[12px]
              font-black
              leading-6
              text-ink
            "
          >
            {item.title}
          </span>

          <span
            dir="ltr"
            className="
              text-[8px]
              font-bold
              text-brand-accent
            "
          >
            {item.index}
          </span>
        </div>

        <p
          className="
            mt-1
            text-[10px]
            leading-5
            text-ink-muted
          "
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
}

/* =============================================================================
   Active / hover indicator
============================================================================= */

function NavIndicator({
  active,
  opened,
}: {
  active: boolean;
  opened: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`
        absolute
        bottom-0
        right-1/2

        h-[2px]

        translate-x-1/2

        bg-brand-accent

        transition-[width,opacity]
        duration-300

        ${
          active || opened
            ? "w-6 opacity-100"
            : `
              w-0
              opacity-0

              group-hover/nav:w-4
              group-hover/nav:opacity-100
            `
        }
      `}
    />
  );
}
