"use client";

import Image from "next/image";
import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
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
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
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
import { useLanguage } from "@/components/providers/LanguageProvider";
import shellContent from "@/config/site-shell.json";
import { getLocaleFromPathname, stripLocalePrefix } from "@/lib/site-language";
import {
  ASSESSMENT_PATH,
  CONSULTATION_PATH,
  MEGA_MENUS,
  getLocalizedSiteNavigation,
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
const PRIMARY_LOGO_SRC = "/assets/images/LOGO.svg";
const WHITE_LOGO_SRC = "/assets/images/LOGOWHITE.svg";

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
  const { locale, direction, languageTag, isRTL } = useLanguage();
  const copy = shellContent[locale].navbar;
  const { navigation, megaMenus } = getLocalizedSiteNavigation(locale);
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;
  const DiagonalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;
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
  const elevated = scrolled || openMenu !== null;
  const publicPath = stripLocalePrefix(pathname);
  const forceSolid =
    publicPath === "/admin/forms" ||
    publicPath.startsWith("/admin/forms/") ||
    publicPath.startsWith("/forms/") ||
    publicPath === "/test-form";

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
         data-scrolled={forceSolid || elevated || scrolled || openMenu !== null}
        dir={direction}
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
              aria-label={copy.home}
              onClick={closeDesktop}
            >
              <Image
                src={forceSolid || elevated ? PRIMARY_LOGO_SRC : WHITE_LOGO_SRC}
                alt="DNH"
                width={140}
                height={44}
                className={styles.logo}
                loading="eager"
                unoptimized
              />
            </Link>
            <nav className={styles.desktopNavigation} aria-label={copy.navigation}>
              {navigation.map((item) => {
                const menu = item.menu;
                const active = menu
                  ? megaMenus[menu].items.some((link) =>
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
              <LanguageSwitch onSwitch={closeDesktop} />
              <div className={styles.authActions} aria-label={copy.auth}>
                <ActionButton
                  href={LOGIN_PATH}
                  variant="secondary"
                  size="sm"
                  className={styles.authButton}
                  onClick={closeDesktop}
                >
                  {copy.login}
                </ActionButton>
                <ActionButton
                  href={SIGNUP_PATH}
                  variant="secondary"
                  size="sm"
                  className={styles.authButton}
                  onClick={closeDesktop}
                >
                  {copy.signup}
                </ActionButton>
              </div>
              <ActionButton
                href={href(CONSULTATION_PATH)}
                icon={DiagonalArrow}
                size="sm"
                className={styles.consultButton}
                onClick={closeDesktop}
              >
                {copy.consultation}
              </ActionButton>
            </div>
            <div className={styles.mobileActions}>
              {/* <LanguageSwitch onSwitch={closeDesktop} /> */}
              <Link
                className={styles.mobileConsult}
                href={href(CONSULTATION_PATH)}
              >
                {copy.mobileConsultation}
                <DiagonalArrow size={15} aria-hidden="true" />
              </Link>
              <button
                ref={mobileTriggerRef}
                type="button"
                className={styles.menuToggle}
                aria-label={copy.openMenu}
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                aria-controls={`${id}-mobile`}
                onClick={() => {
                  closeDesktop();
                  setMobileOpen(true);
                }}
              >
                <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
                <span className={styles.menuLabel}>{copy.menu}</span>
              </button>
            </div>
          </div>

          {MENU_KEYS.map((menuKey) => {
            const menu = megaMenus[menuKey];
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
                      <DirectionArrow size={17} aria-hidden="true" />
                    </Link>
                  </aside>
                  <div className={styles.megaContent}>
                    <div className={styles.megaHeading}>
                      <h2>{menu.title}</h2>
                      <span>
                        {new Intl.NumberFormat(languageTag).format(menu.items.length)}{" "}
                        {copy.paths}
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
                      <span>{copy.help}</span>
                      <Link href={href(ASSESSMENT_PATH)} onClick={closeDesktop}>
                        {copy.assessment}
                        <DirectionArrow size={14} aria-hidden="true" />
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
  const { isRTL } = useLanguage();
  const DiagonalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;
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
      <DiagonalArrow size={16} aria-hidden="true" className={styles.cardArrow} />
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
  const { locale, direction, languageTag, isRTL } = useLanguage();
  const copy = shellContent[locale].navbar;
  const { navigation, megaMenus } = getLocalizedSiteNavigation(locale);
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;
  const DiagonalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<MegaMenuKey | null>(
    () =>
      MENU_KEYS.find((key) =>
        megaMenus[key].items.some((item) =>
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
      dir={direction}
      className={styles.mobileDialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={dismissOnBackdrop}
    >
      <div className={styles.drawerHeader}>
        <Link href="/" onClick={onDismiss} aria-label={copy.home}>
          <Image
            src={PRIMARY_LOGO_SRC}
            alt="DNH"
            width={127}
            height={40}
            unoptimized
          />
        </Link>
        <LanguageSwitch onSwitch={onDismiss} />
        <button
          ref={closeRef}
          type="button"
          onClick={onDismiss}
          className={styles.closeButton}
          aria-label={copy.closeMenu}
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.drawerBody} data-lenis-prevent>
        <div className={styles.drawerIntro}>
          <span className={styles.drawerEyebrow}>{copy.quickAccess}</span>
          <h2 id={`${id}-title`}>{copy.choosePath}</h2>
        </div>
        <div className={styles.mobileAuthActions} aria-label={copy.auth}>
          <ActionButton
            href={LOGIN_PATH}
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onDismiss}
          >
            {copy.login}
          </ActionButton>
          <ActionButton
            href={SIGNUP_PATH}
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onDismiss}
          >
            {copy.signup}
          </ActionButton>
        </div>
        <nav aria-label={copy.mobileLinks} className={styles.quickLinks}>
          {navigation.filter((item) => !item.menu).map((item) => (
            <Link
              key={item.href}
              href={getSiteHref(item.href!, pathname)}
              onClick={onDismiss}
              aria-current={
                isSitePathActive(item.href!, pathname) ? "page" : undefined
              }
            >
              {item.title}
              <DiagonalArrow size={15} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <nav aria-label={copy.specialistLinks} className={styles.mobileGroups}>
          {MENU_KEYS.map((key) => {
            const menu = megaMenus[key];
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
                      {new Intl.NumberFormat(languageTag).format(menu.items.length)}
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
                        <DirectionArrow size={16} aria-hidden="true" />
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
        <p>{copy.conversation}</p>
        <ActionButton
          href={getSiteHref(CONSULTATION_PATH, pathname)}
          icon={DirectionArrow}
          fullWidth
          onClick={onDismiss}
        >
          {copy.strategicConsultation}
        </ActionButton>
        <Link
          href={getSiteHref(ASSESSMENT_PATH, pathname)}
          className={styles.assessmentLink}
          onClick={onDismiss}
        >
          {copy.myAssessment}
          <DirectionArrow size={14} aria-hidden="true" />
        </Link>
      </div>
    </dialog>
  );
}

function LanguageSwitch({ onSwitch }: { onSwitch: () => void }) {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();
  const copy = shellContent[locale].navbar;
  if (!getLocaleFromPathname(pathname)) return null;

  return (
    <button
      type="button"
      className={styles.languageSwitch}
      aria-label={copy.switchLabel}
      title={copy.switchLabel}
      data-language-switch
      onClick={() => {
        onSwitch();
        toggleLocale();
      }}
    >
      <bdi lang="en" dir="ltr">{copy.switchCode}</bdi>
    </button>
  );
}
