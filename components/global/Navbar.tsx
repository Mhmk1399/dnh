"use client";

import Image from "next/image";
import NextLink from "next/link";
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
  LogIn,
  Menu,
  Network,
  PieChart,
  Presentation,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  UserRoundPlus,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  LocalizedLink as Link,
  useLanguage,
} from "@/components/providers/LanguageProvider";
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
const PRIMARY_LOGO = "/assets/images/LOGO.svg";
const WHITE_LOGO = "/assets/images/LOGOWHITE.svg";

type OpenPanel = MegaMenuKey | "auth" | null;

function subscribeToScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

const getScrollSnapshot = () => window.scrollY > 24;
const getServerScrollSnapshot = () => false;

/** Re-create interactive state on route transitions, including back/forward. */
export function Navbar() {
  const pathname = usePathname();
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

  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const authTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRefs = useRef<
    Partial<Record<MegaMenuKey, HTMLButtonElement | null>>
  >({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef<MegaMenuKey | null>(null);
  const uid = useId();

  const href = (path: string) => getSiteHref(path, pathname);
  const publicPath = stripLocalePrefix(pathname);
  const forceSolid =
    publicPath === "/admin/forms" ||
    publicPath.startsWith("/admin/forms/") ||
    publicPath.startsWith("/forms/") ||
    publicPath === "/test-form";

  // No scroll: transparent, colorless frosted glass on both desktop and mobile.
  // Open menus deliberately elevate the navigation for legibility.
  const elevated = forceSolid || scrolled || openPanel !== null;

  const clearTimers = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverTimer.current = null;
    closeTimer.current = null;
  }, []);

  const closeDesktop = useCallback(() => {
    clearTimers();
    openedByHover.current = null;
    setOpenPanel(null);
  }, [clearTimers]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    // Focus is restored after the native modal releases the rest of the page.
    requestAnimationFrame(() =>
      mobileTriggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const reset = () => {
      closeDesktop();
      setMobileOpen(false);
    };
    breakpoint.addEventListener("change", reset);
    return () => breakpoint.removeEventListener("change", reset);
  }, [closeDesktop]);

  useEffect(() => {
    if (!openPanel) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const current = openPanel;
      closeDesktop();
      if (current === "auth") authTriggerRef.current?.focus();
      else if (current) menuTriggerRefs.current[current]?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) closeDesktop();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openPanel, closeDesktop]);

  const openOnHover = (key: MegaMenuKey) => {
    clearTimers();
    hoverTimer.current = setTimeout(() => {
      openedByHover.current = key;
      setOpenPanel(key);
    }, 110);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      if (!headerRef.current?.contains(document.activeElement)) closeDesktop();
    }, 180);
  };

  const openWithKeyboard = (key: MegaMenuKey) => {
    clearTimers();
    openedByHover.current = null;
    setOpenPanel(key);
    requestAnimationFrame(() => {
      document
        .getElementById(`${uid}-mega-${key}`)
        ?.querySelector<HTMLAnchorElement>("a")
        ?.focus();
    });
  };

  const authLabel = `${copy.login} / ${copy.signup}`;
  const closeAny = () => closeDesktop();

  return (
    <>
      {openPanel && openPanel !== "auth" ? (
        <div className={styles.desktopScrim} aria-hidden="true" />
      ) : null}

      <header
        ref={headerRef}
        dir={direction}
        lang={languageTag}
        className={styles.header}
        data-scrolled={elevated}
        onPointerEnter={clearTimers}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse" && openPanel !== "auth")
            scheduleClose();
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
              onClick={closeAny}
            >
              <Image
                src={elevated ? PRIMARY_LOGO : WHITE_LOGO}
                alt="DNH"
                width={140}
                height={44}
                className={styles.logo}
                loading="eager"
                unoptimized
              />
              <span className={styles.brandGlow} aria-hidden="true" />
            </Link>

            <nav
              className={styles.desktopNavigation}
              aria-label={copy.navigation}
            >
              {navigation.map((item) => {
                const key = item.menu;
                const active = key
                  ? megaMenus[key].items.some((link) =>
                      isSitePathActive(link.href, pathname),
                    ) ||
                    (item.href ? isSitePathActive(item.href, pathname) : false)
                  : isSitePathActive(item.href!, pathname);

                if (!key) {
                  return (
                    <Link
                      key={item.href}
                      href={href(item.href!)}
                      className={styles.navItem}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                      onPointerEnter={closeDesktop}
                      onFocus={closeDesktop}
                    >
                      <span>{item.title}</span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={key}
                    ref={(element) => {
                      menuTriggerRefs.current[key] = element;
                    }}
                    type="button"
                    className={styles.navItem}
                    data-active={active}
                    aria-expanded={openPanel === key}
                    aria-controls={`${uid}-mega-${key}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") openOnHover(key);
                    }}
                    onClick={() => {
                      clearTimers();
                      if (openedByHover.current === key) {
                        openedByHover.current = null;
                        return;
                      }
                      setOpenPanel((current) => (current === key ? null : key));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        openWithKeyboard(key);
                      }
                    }}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={styles.chevron}
                      size={14}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </nav>

            <div className={styles.desktopActions}>
              <LanguageSwitch onSwitch={closeDesktop} />

              <div className={styles.authArea}>
                <button
                  ref={authTriggerRef}
                  type="button"
                  className={styles.authTrigger}
                  aria-label={authLabel}
                  aria-haspopup="true"
                  aria-expanded={openPanel === "auth"}
                  aria-controls={`${uid}-auth`}
                  onClick={() => {
                    clearTimers();
                    openedByHover.current = null;
                    setOpenPanel((current) =>
                      current === "auth" ? null : "auth",
                    );
                  }}
                  onPointerEnter={() => {
                    if (openPanel !== "auth") closeDesktop();
                  }}
                >
                  <UserRound size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>{authLabel}</span>
                  <ChevronDown
                    className={styles.chevron}
                    size={13}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`${uid}-auth`}
                  className={styles.authPopover}
                  data-open={openPanel === "auth"}
                  inert={openPanel !== "auth"}
                  aria-hidden={openPanel !== "auth"}
                >
                  <span className={styles.authPopoverCaption}>{copy.auth}</span>
                  <NextLink
                    href={LOGIN_PATH}
                    onClick={closeDesktop}
                    className={styles.authOption}
                  >
                    <span className={styles.authOptionIcon}>
                      <LogIn size={17} aria-hidden="true" />
                    </span>
                    <span>{copy.login}</span>
                    <DirectionArrow size={15} aria-hidden="true" />
                  </NextLink>
                  <NextLink
                    href={SIGNUP_PATH}
                    onClick={closeDesktop}
                    className={styles.authOption}
                  >
                    <span className={styles.authOptionIcon}>
                      <UserRoundPlus size={17} aria-hidden="true" />
                    </span>
                    <span>{copy.signup}</span>
                    <DirectionArrow size={15} aria-hidden="true" />
                  </NextLink>
                </div>
              </div>

              <Link
                href={href(CONSULTATION_PATH)}
                className={styles.consultButton}
                onClick={closeDesktop}
              >
                <span>{copy.consultation}</span>
                <span className={styles.consultIcon}>
                  <DiagonalArrow size={17} aria-hidden="true" />
                </span>
              </Link>
            </div>

            <div className={styles.mobileActions}>
              <Link
                href={href(CONSULTATION_PATH)}
                className={styles.mobileConsult}
                onClick={closeDesktop}
                aria-label={copy.mobileConsultation}
              >
                <span className={styles.mobileConsultLabel}>
                  {copy.mobileConsultation}
                </span>
                <DiagonalArrow size={18} aria-hidden="true" />
              </Link>
              <button
                ref={mobileTriggerRef}
                type="button"
                className={styles.menuToggle}
                aria-label={copy.openMenu}
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                aria-controls={`${uid}-mobile`}
                onClick={() => {
                  closeDesktop();
                  setMobileOpen(true);
                }}
              >
                <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.menuLabel}>{copy.menu}</span>
              </button>
            </div>
          </div>

          {MENU_KEYS.map((key) => {
            const menu = megaMenus[key];
            const opened = openPanel === key;
            return (
              <div
                key={key}
                id={`${uid}-mega-${key}`}
                className={styles.megaPositioner}
                data-open={opened}
                aria-hidden={!opened}
                inert={!opened}
              >
                <div className={styles.megaPanel} data-lenis-prevent>
                  <aside className={styles.megaIntro}>
                    <div className={styles.megaIntroTop}>
                      <span className={styles.eyebrow}>{menu.eyebrow}</span>
                      <Sparkles size={19} aria-hidden="true" />
                    </div>
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
                      <span>{menu.overview.title}</span>
                      <DirectionArrow size={18} aria-hidden="true" />
                    </Link>
                  </aside>

                  <div className={styles.megaContent}>
                    <div className={styles.megaHeading}>
                      <p>{menu.title}</p>
                      <span>
                        {new Intl.NumberFormat(languageTag).format(
                          menu.items.length,
                        )}{" "}
                        {copy.paths}
                      </span>
                    </div>
                    <nav
                      aria-label={menu.title}
                      className={styles.megaLinks}
                      data-columns={key === "services" ? "two" : "one"}
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
                        <DirectionArrow size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {mobileOpen ? (
        <MobileNavigation
          id={`${uid}-mobile`}
          pathname={pathname}
          onDismiss={closeMobile}
        />
      ) : null}
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
        <Icon size={20} strokeWidth={1.55} aria-hidden="true" />
      </span>
      <span className={styles.cardCopy}>
        <span className={styles.cardTitle}>{item.title}</span>
        <span className={styles.cardDescription}>{item.description}</span>
      </span>
      <DiagonalArrow
        className={styles.cardArrow}
        size={16}
        aria-hidden="true"
      />
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
      ) ?? null,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    dialog.showModal();
    closeRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, []);

  function dismissOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.currentTarget !== event.target) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
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
        <Link
          href="/"
          onClick={onDismiss}
          aria-label={copy.home}
          className={styles.drawerBrand}
        >
          <Image
            src={PRIMARY_LOGO}
            alt="DNH"
            width={136}
            height={42}
            unoptimized
          />
        </Link>
        <div className={styles.drawerHeaderActions}>
          <LanguageSwitch onSwitch={onDismiss} />
          <button
            ref={closeRef}
            type="button"
            className={styles.closeButton}
            onClick={onDismiss}
            aria-label={copy.closeMenu}
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.drawerBody} data-lenis-prevent>
        <div className={styles.drawerIntro}>
          <span className={styles.drawerEyebrow}>{copy.quickAccess}</span>
          <p
            id={`${id}-title`}
            className={styles.drawerTitle}
            role="heading"
            aria-level={2}
          >
            {copy.choosePath}
          </p>
        </div>

        {/* One visible auth trigger; both existing destinations remain accessible. */}
        <details className={styles.mobileAuthDisclosure}>
          <summary className={styles.mobileAuthTrigger}>
            <span className={styles.mobileAuthIcon}>
              <UserRound size={19} aria-hidden="true" />
            </span>
            <span>
              {copy.login} / {copy.signup}
            </span>
            <ChevronDown
              className={styles.mobileAuthChevron}
              size={17}
              aria-hidden="true"
            />
          </summary>
          <div className={styles.mobileAuthOptions}>
            <NextLink href={LOGIN_PATH} onClick={onDismiss}>
              <LogIn size={17} aria-hidden="true" />
              {copy.login}
              <DirectionArrow size={15} aria-hidden="true" />
            </NextLink>
            <NextLink href={SIGNUP_PATH} onClick={onDismiss}>
              <UserRoundPlus size={17} aria-hidden="true" />
              {copy.signup}
              <DirectionArrow size={15} aria-hidden="true" />
            </NextLink>
          </div>
        </details>

        <nav aria-label={copy.mobileLinks} className={styles.quickLinks}>
          {navigation
            .filter((item) => !item.menu)
            .map((item) => {
              const active = isSitePathActive(item.href!, pathname);
              return (
                <Link
                  key={item.href}
                  href={getSiteHref(item.href!, pathname)}
                  onClick={onDismiss}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.title}</span>
                  <DiagonalArrow size={16} aria-hidden="true" />
                </Link>
              );
            })}
        </nav>

        <nav aria-label={copy.specialistLinks} className={styles.mobileGroups}>
          {MENU_KEYS.map((key) => {
            const menu = megaMenus[key];
            const opened = expanded === key;
            return (
              <div key={key} className={styles.mobileGroup} data-open={opened}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  aria-expanded={opened}
                  aria-controls={`${id}-group-${key}`}
                  onClick={() => setExpanded(opened ? null : key)}
                >
                  <span className={styles.accordionTitle}>
                    {menu.title}
                    <span className={styles.groupCount}>
                      {new Intl.NumberFormat(languageTag).format(
                        menu.items.length,
                      )}
                    </span>
                  </span>
                  <ChevronDown
                    className={styles.chevron}
                    size={18}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`${id}-group-${key}`}
                  className={styles.accordionBody}
                  data-open={opened}
                  inert={!opened}
                  aria-hidden={!opened}
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
                        <span>{menu.overview.title}</span>
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
        <Link
          href={getSiteHref(CONSULTATION_PATH, pathname)}
          className={styles.drawerConsult}
          onClick={onDismiss}
        >
          <span>{copy.strategicConsultation}</span>
          <span>
            <DirectionArrow size={18} aria-hidden="true" />
          </span>
        </Link>
        <Link
          href={getSiteHref(ASSESSMENT_PATH, pathname)}
          className={styles.assessmentLink}
          onClick={onDismiss}
        >
          {copy.myAssessment}
          <DirectionArrow size={15} aria-hidden="true" />
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
      data-language-switch
      aria-label={copy.switchLabel}
      title={copy.switchLabel}
      onClick={() => {
        onSwitch();
        toggleLocale();
      }}
    >
      <bdi lang="en" dir="ltr">
        {copy.switchCode}
      </bdi>
    </button>
  );
}
