"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Gem,
  Landmark,
  Menu,
  Network,
  PieChart,
  Presentation,
  ShieldCheck,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import {
  ASSESSMENT_PATH,
  CONSULTATION_PATH,
  MEGA_MENUS,
  NAVIGATION,
  getSiteHref,
  isSitePathActive,
  type MegaItem,
  type MegaMenuKey,
  type NavigationIcon,
} from "@/config/site-navigation";
import styles from "./Navbar.module.css";

const ICONS: Record<NavigationIcon, LucideIcon> = {
  architecture: Landmark,
  framework: Network,
  intelligence: BrainCircuit,
  wealth: Gem,
  portfolio: PieChart,
  advisory: BriefcaseBusiness,
  market: TrendingUp,
  risk: ShieldCheck,
  briefing: Presentation,
  decision: CircleDollarSign,
  holdings: Building2,
  "case-study": BriefcaseBusiness,
  outlook: TrendingUp,
  insight: BrainCircuit,
  research: PieChart,
  faq: CircleDollarSign,
  
};
const MENU_KEYS = Object.keys(MEGA_MENUS) as MegaMenuKey[];
const LOGIN_PATH = "/login";
const SIGNUP_PATH = "/register";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrollSnapshot = () => window.scrollY > 24;
const getServerScrollSnapshot = () => false;

export function Navbar() {
  const pathname = usePathname();
  // Route changes reset menus, including browser back/forward navigation.
  return <NavigationShell key={pathname} pathname={pathname} />;
}

function NavigationShell({ pathname }: { pathname: string }) {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<
    Partial<Record<MegaMenuKey, HTMLButtonElement | null>>
  >({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef<MegaMenuKey | null>(null);
  const id = useId();
  const href = (path: string) => getSiteHref(path, pathname);
  const forceSolid =
    pathname === "/admin/forms" ||
    pathname.startsWith("/admin/forms/") ||
    pathname.startsWith("/forms/");

  const clearTimers = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverTimer.current = null;
    closeTimer.current = null;
  }, []);

  const closeDesktop = useCallback(() => {
    clearTimers();
    openedByHover.current = null;
    setOpenMenu(null);
  }, [clearTimers]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    // Restore focus after the modal leaves the top layer and releases inertness.
    requestAnimationFrame(() =>
      mobileTriggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onBreakpoint = () => {
      closeDesktop();
      setMobileOpen(false);
    };
    desktop.addEventListener("change", onBreakpoint);
    return () => desktop.removeEventListener("change", onBreakpoint);
  }, [closeDesktop]);

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDesktop();
        triggerRefs.current[openMenu]?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) closeDesktop();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu, closeDesktop]);

  function openOnHover(menu: MegaMenuKey) {
    clearTimers();
    hoverTimer.current = setTimeout(() => {
      openedByHover.current = menu;
      setOpenMenu(menu);
    }, 130);
  }

  function scheduleClose() {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      const focusedPanel = document.activeElement?.closest(
        `.${styles.megaPanel}`,
      );
      if (!focusedPanel) closeDesktop();
    }, 180);
  }

  function openFromKeyboard(menu: MegaMenuKey) {
    clearTimers();
    openedByHover.current = null;
    setOpenMenu(menu);
    requestAnimationFrame(() => {
      document
        .getElementById(`${id}-${menu}`)
        ?.querySelector<HTMLAnchorElement>("a")
        ?.focus();
    });
  }

  return (
    <>
      {openMenu && <div className={styles.desktopScrim} aria-hidden="true" />}
      <header
        ref={shellRef}
        className={styles.header}
        data-scrolled={forceSolid || scrolled || openMenu !== null}
        dir="rtl"
        onPointerEnter={clearTimers}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") scheduleClose();
        }}
        onBlurCapture={(event) => {
          if (
            event.relatedTarget &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            closeDesktop();
        }}
      >
        <div className={styles.headerInner}>
          <div className={styles.bar}>
            <Link
              href="/"
              className={styles.brand}
              aria-label="دی‌ان‌اچ؛ صفحه اصلی"
              onClick={closeDesktop}
            >
              <Image
                src="/assets/images/LOGO.svg"
                alt="DNH"
                width={140}
                height={44}
                className={styles.logo}
                priority
              />
            </Link>
            <nav className={styles.desktopNavigation} aria-label="منوی اصلی">
              {NAVIGATION.map((item) => {
                const menu = item.menu;
                const active = menu
                  ? MEGA_MENUS[menu].items.some((link) =>
                      isSitePathActive(link.href, pathname),
                    ) ||
                    (item.href ? isSitePathActive(item.href, pathname) : false)
                  : isSitePathActive(item.href!, pathname);
                return menu ? (
                  <button
                    key={menu}
                    ref={(element) => {
                      triggerRefs.current[menu] = element;
                    }}
                    type="button"
                    className={styles.navItem}
                    data-active={active}
                    aria-expanded={openMenu === menu}
                    aria-controls={`${id}-${menu}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") openOnHover(menu);
                    }}
                    onClick={() => {
                      clearTimers();
                      if (openedByHover.current === menu) {
                        openedByHover.current = null;
                        return;
                      }
                      setOpenMenu((current) =>
                        current === menu ? null : menu,
                      );
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        openFromKeyboard(menu);
                      }
                    }}
                  >
                    {item.title}
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className={styles.chevron}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={href(item.href!)}
                    className={styles.navItem}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={closeDesktop}
                    onFocus={closeDesktop}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            <div className={styles.desktopAction}>
              <div className={styles.authActions} aria-label="ورود و ثبت‌نام">
                <ActionButton
                  href={LOGIN_PATH}
                  variant="secondary"
                  size="sm"
                  className={styles.authButton}
                  onClick={closeDesktop}
                >
                  ورود
                </ActionButton>
                <ActionButton
                  href={SIGNUP_PATH}
                  variant="secondary"
                  size="sm"
                  className={styles.authButton}
                  onClick={closeDesktop}
                >
                  ثبت‌نام
                </ActionButton>
              </div>
              <ActionButton
                href={href(CONSULTATION_PATH)}
                icon={ArrowUpLeft}
                size="sm"
                className={styles.consultButton}
                onClick={closeDesktop}
              >
                درخواست مشاوره
              </ActionButton>
            </div>
            <div className={styles.mobileActions}>
              <Link
                className={styles.mobileConsult}
                href={href(CONSULTATION_PATH)}
              >
                مشاوره
                <ArrowUpLeft size={15} aria-hidden="true" />
              </Link>
              <button
                ref={mobileTriggerRef}
                type="button"
                className={styles.menuToggle}
                aria-label="باز کردن منوی اصلی"
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                aria-controls={`${id}-mobile`}
                onClick={() => {
                  closeDesktop();
                  setMobileOpen(true);
                }}
              >
                <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
                <span className={styles.menuLabel}>منو</span>
              </button>
            </div>
          </div>

          {MENU_KEYS.map((menuKey) => {
            const menu = MEGA_MENUS[menuKey];
            const opened = openMenu === menuKey;
            return (
              <div
                key={menuKey}
                id={`${id}-${menuKey}`}
                className={styles.megaPositioner}
                data-open={opened}
                aria-hidden={!opened}
                inert={!opened}
              >
                <div className={styles.megaPanel} data-lenis-prevent>
                  <aside className={styles.megaIntro}>
                    <span className={styles.eyebrow}>{menu.eyebrow}</span>
                    <p className={styles.megaHeadline}>{menu.headline}</p>
                    <p className={styles.megaDescription}>{menu.description}</p>
                    <div
                      className={styles.architectureSignature}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                    <Link
                      className={styles.introLink}
                      href={href(menu.overview.href)}
                      onClick={closeDesktop}
                    >
                      {menu.overview.title}
                      <ArrowLeft size={17} aria-hidden="true" />
                    </Link>
                  </aside>
                  <div className={styles.megaContent}>
                    <div className={styles.megaHeading}>
                      <h2>{menu.title}</h2>
                      <span>
                        {new Intl.NumberFormat("fa").format(menu.items.length)}{" "}
                        مسیر تخصصی
                      </span>
                    </div>
                    <nav
                      aria-label={menu.title}
                      className={styles.megaLinks}
                      data-columns={menuKey === "services" ? "two" : "one"}
                    >
                      {menu.items.map((item) => (
                        <NavigationCard
                          key={item.href}
                          item={item}
                          pathname={pathname}
                          onNavigate={closeDesktop}
                        />
                      ))}
                    </nav>
                    <div className={styles.megaFoot}>
                      <span>برای انتخاب مسیر به راهنمایی نیاز دارید؟</span>
                      <Link href={href(ASSESSMENT_PATH)} onClick={closeDesktop}>
                        ارزیابی تصمیم مالی
                        <ArrowLeft size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>
      {mobileOpen && (
        <MobileNavigation
          id={`${id}-mobile`}
          pathname={pathname}
          onDismiss={closeMobile}
        />
      )}
    </>
  );
}

function NavigationCard({
  item,
  pathname,
  onNavigate,
  compact = false,
}: {
  item: MegaItem;
  pathname: string;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const Icon = ICONS[item.icon];
  const active = isSitePathActive(item.href, pathname);
  return (
    <Link
      href={getSiteHref(item.href, pathname)}
      className={styles.navigationCard}
      data-compact={compact}
      data-active={active}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <span className={styles.cardIcon}>
        <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className={styles.cardCopy}>
        <span className={styles.cardTitle}>{item.title}</span>
        <span className={styles.cardDescription}>{item.description}</span>
      </span>
      <ArrowUpLeft size={16} aria-hidden="true" className={styles.cardArrow} />
    </Link>
  );
}

function MobileNavigation({
  id,
  pathname,
  onDismiss,
}: {
  id: string;
  pathname: string;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<MegaMenuKey | null>(
    () =>
      MENU_KEYS.find((key) =>
        MEGA_MENUS[key].items.some((item) =>
          isSitePathActive(item.href, pathname),
        ),
      ) ?? "services",
  );
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    const padding = body.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
      body.style.paddingRight = padding;
    };
  }, []);

  function dismissOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onDismiss();
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      dir="rtl"
      className={styles.mobileDialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={dismissOnBackdrop}
    >
      <div className={styles.drawerHeader}>
        <Link href="/" onClick={onDismiss} aria-label="دی‌ان‌اچ؛ صفحه اصلی">
          <Image
            src="/assets/images/LOGO.svg"
            alt="DNH"
            width={127}
            height={40}
          />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onDismiss}
          className={styles.closeButton}
          aria-label="بستن منوی اصلی"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.drawerBody} data-lenis-prevent>
        <div className={styles.drawerIntro}>
          <span className={styles.drawerEyebrow}>دسترسی سریع</span>
          <h2 id={`${id}-title`}>مسیرتان را انتخاب کنید.</h2>
        </div>
        <div className={styles.mobileAuthActions} aria-label="ورود و ثبت‌نام">
          <ActionButton
            href={LOGIN_PATH}
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onDismiss}
          >
            ورود
          </ActionButton>
          <ActionButton
            href={SIGNUP_PATH}
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onDismiss}
          >
            ثبت‌نام
          </ActionButton>
        </div>
        <nav aria-label="لینک‌های اصلی موبایل" className={styles.quickLinks}>
          {NAVIGATION.filter((item) => !item.menu).map((item) => (
            <Link
              key={item.href}
              href={getSiteHref(item.href!, pathname)}
              onClick={onDismiss}
              aria-current={
                isSitePathActive(item.href!, pathname) ? "page" : undefined
              }
            >
              {item.title}
              <ArrowUpLeft size={15} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <nav aria-label="خدمات و مسیرهای تخصصی" className={styles.mobileGroups}>
          {MENU_KEYS.map((key) => {
            const menu = MEGA_MENUS[key];
            const opened = expanded === key;
            return (
              <div key={key} className={styles.mobileGroup} data-open={opened}>
                <button
                  className={styles.accordionTrigger}
                  type="button"
                  aria-expanded={opened}
                  aria-controls={`${id}-${key}`}
                  onClick={() => setExpanded(opened ? null : key)}
                >
                  <span>
                    {menu.title}
                    <span className={styles.groupCount}>
                      {new Intl.NumberFormat("fa").format(menu.items.length)}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={styles.chevron}
                  />
                </button>
                <div
                  className={styles.accordionBody}
                  data-open={opened}
                  inert={!opened}
                  aria-hidden={!opened}
                  id={`${id}-${key}`}
                >
                  <div className={styles.accordionClip}>
                    <div className={styles.accordionLinks}>
                      {menu.items.map((item) => (
                        <NavigationCard
                          key={item.href}
                          item={item}
                          pathname={pathname}
                          onNavigate={onDismiss}
                          compact
                        />
                      ))}
                      <Link
                        className={styles.mobileOverview}
                        href={getSiteHref(menu.overview.href, pathname)}
                        onClick={onDismiss}
                      >
                        {menu.overview.title}
                        <ArrowLeft size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      <div className={styles.drawerFooter}>
        <p>یک گفت‌وگو، شروع یک تصمیم روشن‌تر.</p>
        <ActionButton
          href={getSiteHref(CONSULTATION_PATH, pathname)}
          icon={ArrowLeft}
          fullWidth
          onClick={onDismiss}
        >
          درخواست مشاوره راهبردی
        </ActionButton>
        <Link
          href={getSiteHref(ASSESSMENT_PATH, pathname)}
          className={styles.assessmentLink}
          onClick={onDismiss}
        >
          ارزیابی موقعیت مالی من
          <ArrowLeft size={14} aria-hidden="true" />
        </Link>
      </div>
    </dialog>
  );
}
