"use client";

import {
  ArrowUpLeft,
  ArrowUpRight,
  Mail,
  MessageCircleMore,
  Phone,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";

const SESSION_KEY = "dnh-floating-contact-intro-seen";
const REVEAL_SCROLL_OFFSET = 100;

const COPY = {
  fa: {
    quickTitle: "راه‌های ارتباط سریع",
    quickDescription: "برای تماس، واتساپ یا ایمیل از این بخش استفاده کنید.",
    panelTitle: "راه‌های ارتباط با DNH",
    call: "تماس تلفنی",
    whatsapp: "واتساپ",
    whatsappDescription: "شروع گفت‌وگو در واتساپ",
    email: "ایمیل",
    open: "نمایش راه‌های ارتباط با DNH",
    close: "بستن راه‌های ارتباط",
  },
  en: {
    quickTitle: "Quick ways to connect",
    quickDescription: "Reach us by phone, WhatsApp, or email.",
    panelTitle: "Contact DNH",
    call: "Phone call",
    whatsapp: "WhatsApp",
    whatsappDescription: "Start a WhatsApp conversation",
    email: "Email",
    open: "Show DNH contact options",
    close: "Close contact options",
  },
} as const;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY >= REVEAL_SCROLL_OFFSET;
}

function getServerScrollSnapshot() {
  return false;
}

/** Always use ASCII digits in phone and WhatsApp URLs. */
function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660));
}

function toPersianDigits(value: string) {
  return toEnglishDigits(value).replace(/[0-9]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) - 48 + 0x06f0),
  );
}

type FloatingContactProps = {
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
};

export function FloatingContact({
  phone,
  phoneDisplay,
  whatsappNumber,
  email,
}: FloatingContactProps) {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const copy = locale === "en" ? COPY.en : COPY.fa;
  const DirectionArrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const isVisible = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const phoneHref = toEnglishDigits(phone).replace(/[^\d+]/g, "");
  const whatsappDigits = toEnglishDigits(whatsappNumber).replace(/\D/g, "");
  const displayedPhone =
    locale === "en"
      ? toEnglishDigits(phoneDisplay)
      : toPersianDigits(phoneDisplay);

  // Show the short introduction once per tab/session after scrolling.
  useEffect(() => {
    if (!isVisible) return;

    let revealTimer: number | undefined;
    let hideTimer: number | undefined;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;

      revealTimer = window.setTimeout(() => {
        // Mark as seen only when the intro actually appears (also safe in Strict Mode).
        window.sessionStorage.setItem(SESSION_KEY, "1");
        setShowIntro(true);
        hideTimer = window.setTimeout(() => setShowIntro(false), 7000);
      }, 180);
    } catch {
      // Browsers may disable sessionStorage. Contact actions remain available.
    }

    return () => {
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) return;
    setOpen(false);
    setShowIntro(false);
  }, [isVisible]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const introVisible = isVisible && showIntro && !open;

  return (
    <div
      ref={rootRef}
      dir={direction}
      lang={languageTag}
      aria-hidden={!isVisible}
      className={`fixed z-[70] flex flex-col items-end transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-3 opacity-0"
      }`}
      style={{
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(18px, env(safe-area-inset-bottom))",
      }}
    >
      {/* One-time introduction bubble */}
      <div
        aria-hidden={!introVisible}
        className={`absolute bottom-[72px] right-0 w-[min(290px,calc(100vw-32px))] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          introVisible
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-2 opacity-0"
        }`}
      >
        <button
          type="button"
          tabIndex={introVisible ? 0 : -1}
          onClick={() => {
            setShowIntro(false);
            setOpen(true);
          }}
          className="group/intro relative w-full border border-[color-mix(in_srgb,var(--dnh-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--dnh-bg-page)_94%,transparent)] px-4 py-3.5 text-start shadow-[0_16px_40px_color-mix(in_srgb,var(--dnh-text)_12%,transparent)] backdrop-blur-[18px] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-px hover:border-brand-primary/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary motion-reduce:transition-none"
        >
          <span className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-9 shrink-0 items-center justify-center bg-surface-soft text-brand-primary"
            >
              <MessageCircleMore size={18} strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-black leading-6 text-ink">
                {copy.quickTitle}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium leading-[1.8] text-ink-muted">
                {copy.quickDescription}
              </span>
            </span>
            <DirectionArrow
              aria-hidden="true"
              size={16}
              className="mt-1 shrink-0 text-brand-primary transition-transform duration-300 group-hover/intro:-translate-y-0.5"
            />
          </span>
        </button>
      </div>

      {/* Expanded contact panel */}
      <div
        id="dnh-floating-contact-panel"
        role="region"
        aria-label={copy.panelTitle}
        aria-hidden={!open}
        className={`absolute bottom-[72px] right-0 w-[min(330px,calc(100vw-32px))] origin-bottom-right overflow-hidden border border-[color-mix(in_srgb,var(--dnh-primary)_18%,transparent)] bg-[color-mix(in_srgb,var(--dnh-bg-page)_95%,transparent)] shadow-[0_24px_70px_color-mix(in_srgb,var(--dnh-text)_17%,transparent)] backdrop-blur-[22px] transition-[opacity,transform,visibility] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible translate-y-3 scale-[0.97] opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-between gap-4 border-b border-line bg-surface-soft px-4 py-3.5">
          <p className="text-start text-[13px] font-black text-ink">
            {copy.panelTitle}
          </p>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            aria-label={copy.close}
            className="flex size-9 shrink-0 items-center justify-center border border-line bg-page text-ink-muted transition-colors duration-200 hover:bg-brand-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <X size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <div className="p-2">
          <ContactItem
            href={`tel:${phoneHref}`}
            label={copy.call}
            value={displayedPhone}
            icon={<Phone size={18} strokeWidth={1.65} />}
            arrow={DirectionArrow}
            open={open}
            valueDirection="ltr"
          />
          <ContactItem
            href={`https://wa.me/${whatsappDigits}`}
            label={copy.whatsapp}
            value={copy.whatsappDescription}
            icon={<MessageCircleMore size={18} strokeWidth={1.65} />}
            arrow={DirectionArrow}
            target="_blank"
            rel="noopener noreferrer"
            open={open}
          />
          <ContactItem
            href={`mailto:${email}`}
            label={copy.email}
            value={email}
            icon={<Mail size={18} strokeWidth={1.65} />}
            arrow={DirectionArrow}
            open={open}
            valueDirection="ltr"
          />
        </div>
      </div>

      {/* Floating contact button */}
      <button
        type="button"
        tabIndex={isVisible ? 0 : -1}
        onClick={() => {
          setShowIntro(false);
          setOpen((current) => !current);
        }}
        aria-expanded={open}
        aria-controls="dnh-floating-contact-panel"
        aria-label={open ? copy.close : copy.open}
        className="group/contact-trigger relative flex size-[40px] items-center justify-center overflow-hidden border border-white/20 bg-brand-primary text-[var(--dnh-text-on-brand)] shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-primary)_30%,transparent)] transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-brand-secondary hover:shadow-[0_20px_44px_color-mix(in_srgb,var(--dnh-primary)_36%,transparent)] active:translate-y-0 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transform-none motion-reduce:transition-none sm:size-[52px]"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover/contact-trigger:scale-[1.04]">
          {open ? (
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <MessageCircleMore size={22} strokeWidth={1.7} aria-hidden="true" />
          )}
        </span>
      </button>
    </div>
  );
}

type ContactItemProps = {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  arrow: typeof ArrowUpLeft;
  target?: "_blank";
  rel?: string;
  valueDirection?: "ltr";
  open: boolean;
};

function ContactItem({
  href,
  label,
  value,
  icon,
  arrow: DirectionArrow,
  target,
  rel,
  valueDirection,
  open,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      tabIndex={open ? 0 : -1}
      className="group/contact-item relative flex min-h-[68px] items-center gap-3 border border-transparent px-3 py-2.5 transition-[background-color,border-color,transform] duration-200 hover:border-line hover:bg-surface-soft focus-visible:border-line-strong focus-visible:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center border border-line bg-page text-brand-primary transition-[background-color,border-color,color] duration-200 group-hover/contact-item:border-brand-primary group-hover/contact-item:bg-brand-primary group-hover/contact-item:text-white"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-start">
        <span className="block text-[12px] font-black leading-6 text-ink">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-medium leading-5 text-ink-muted">
          {valueDirection === "ltr" ? <bdi dir="ltr">{value}</bdi> : value}
        </span>
      </span>
      <DirectionArrow
        aria-hidden="true"
        size={16}
        strokeWidth={1.7}
        className="shrink-0 text-ink-muted transition-[color,transform] duration-200 group-hover/contact-item:-translate-y-0.5 group-hover/contact-item:text-brand-accent"
      />
    </a>
  );
}
