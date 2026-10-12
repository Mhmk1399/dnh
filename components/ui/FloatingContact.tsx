"use client";

import { ArrowUpLeft, Mail, MessageCircleMore, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const SESSION_KEY = "dnh-floating-contact-intro-seen";

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
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const whatsappDigits = whatsappNumber.replace(/\D/g, "");

  /* ------------------------------------------------------------------
     First-session introduction
  ------------------------------------------------------------------ */

  useEffect(() => {
    let revealTimer: number | undefined;
    let hideTimer: number | undefined;

    try {
      const hasSeenIntro = window.sessionStorage.getItem(SESSION_KEY) === "1";

      if (!hasSeenIntro) {
        /*
         * همان لحظه ثبت می‌کنیم تا اگر کاربر Route عوض کرد،
         * پیام دوباره نشان داده نشود.
         */
        window.sessionStorage.setItem(SESSION_KEY, "1");

        revealTimer = window.setTimeout(() => {
          setShowIntro(true);

          hideTimer = window.setTimeout(() => {
            setShowIntro(false);
          }, 7000);
        }, 0);
      }
    } catch {
      /*
       * اگر storage در مرورگر غیرفعال بود،
       * کامپوننت همچنان بدون مشکل کار می‌کند.
       */
    }

    return () => {
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  /* ------------------------------------------------------------------
     Escape + click outside
  ------------------------------------------------------------------ */

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function openContacts() {
    setShowIntro(false);
    setOpen(true);
  }

  function toggleContacts() {
    setShowIntro(false);
    setOpen((current) => !current);
  }

  return (
    <div
      ref={rootRef}
      dir="rtl"
      className="
        fixed
        z-[70]
        flex
        flex-col
        items-end
      "
      style={{
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(18px, env(safe-area-inset-bottom))",
      }}
    >
      {/* ============================================================
          First session hint
      ============================================================ */}

      <div
        aria-hidden={!showIntro}
        className={`
          absolute
          bottom-[72px]
          right-0

          w-[260px]

          transition-[opacity,transform,visibility]
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]

          motion-reduce:transition-none

          ${
            showIntro && !open
              ? `
                visible
                translate-y-0
                opacity-100
              `
              : `
                invisible
                translate-y-2
                opacity-0
                pointer-events-none
              `
          }
        `}
      >
        <button
          type="button"
          onClick={openContacts}
          className="
            group/intro

            relative
            w-full

            overflow-hidden

            border
            border-[color-mix(in_srgb,var(--dnh-primary)_20%,transparent)]

            bg-[color-mix(in_srgb,var(--dnh-bg-page)_94%,transparent)]

            px-4
            py-3.5

            text-right

            shadow-[0_16px_40px_color-mix(in_srgb,var(--dnh-text)_12%,transparent)]

            backdrop-blur-[18px]

            outline-none

            transition-[transform,border-color,box-shadow]
            duration-300

            hover:-translate-y-px
            hover:border-brand-primary/35

            focus-visible:ring-4
            focus-visible:ring-focus/25

            sm:w-[290px]
          "
        >
          {/* accent */}
          <span
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              right-0
              w-[3px]
              bg-brand-accent
            "
          />

          <span
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                mt-0.5
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                bg-surface-soft

                text-brand-primary
              "
            >
              <MessageCircleMore
                className="h-[18px] w-[18px]"
                strokeWidth={1.7}
              />
            </span>

            <span className="min-w-0 flex-1">
              <span
                className="
                  block
                  text-[12px]
                  font-black
                  leading-6
                  text-ink
                "
              >
                راه‌های ارتباط سریع
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[10px]
                  font-medium
                  leading-[1.9]
                  text-ink-muted
                "
              >
                برای تماس، واتساپ یا ایمیل از این بخش استفاده کنید.
              </span>
            </span>

            <ArrowUpLeft
              aria-hidden="true"
              className="
                mt-1
                h-4
                w-4
                shrink-0
                text-brand-primary

                transition-transform
                duration-300

                group-hover/intro:-translate-x-0.5
                group-hover/intro:-translate-y-0.5
              "
            />
          </span>

          {/* little connector */}
          <span
            aria-hidden="true"
            className="
              absolute
              -bottom-[11px]
              right-[25px]

              h-[14px]
              w-[14px]

              rotate-45

              border-b
              border-r
              border-[color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

              bg-[var(--dnh-bg-page)]
            "
          />
        </button>
      </div>

      {/* ============================================================
          Contact panel
      ============================================================ */}

      <div
        id="dnh-floating-contact-panel"
        aria-hidden={!open}
        className={`
          absolute
          bottom-[72px]
          right-0

          w-[min(330px,calc(100vw-32px))]

          origin-bottom-right

          overflow-hidden

          border
          border-[color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

          bg-[color-mix(in_srgb,var(--dnh-bg-page)_95%,transparent)]

          shadow-[0_24px_70px_color-mix(in_srgb,var(--dnh-text)_17%,transparent)]

          backdrop-blur-[22px]

          transition-[opacity,transform,visibility]
          duration-[420ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          motion-reduce:transition-none

          ${
            open
              ? `
                visible
                translate-y-0
                scale-100
                opacity-100
              `
              : `
                invisible
                translate-y-3
                scale-[0.97]
                opacity-0
                pointer-events-none
              `
          }
        `}
      >
        {/* header */}
        <div
          className="
            relative
            overflow-hidden

            border-b
            border-line

            px-5
            pb-4
            pt-5
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.55]
            "
            style={{
              background: `
                linear-gradient(
                  135deg,
                  color-mix(in srgb, var(--dnh-primary) 8%, white) 0%,
                  transparent 60%
                )
              `,
            }}
          />

          <div
            className="
              relative
              z-10
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div>
              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="h-px w-6 bg-brand-accent" />

                <span
                  className="
                    text-[11px]
                    font-black
                    tracking-[0.06em]
                    text-brand-primary
                  "
                >
                  ارتباط با DNH
                </span>
              </div>

              <h2
                className="
                  text-[17px]
                  font-black
                  leading-7
                  text-ink
                "
              >
                چطور می‌توانیم در ارتباط باشیم؟
              </h2>

              <p
                className="
                  mt-1
                  text-[10px]
                  font-medium
                  leading-[1.9]
                  text-ink-muted
                "
              >
                یکی از مسیرهای ارتباطی زیر را انتخاب کنید.
              </p>
            </div>

            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-label="بستن راه‌های ارتباط"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                border
                border-line

                bg-page

                text-ink-muted

                outline-none

                transition-[background-color,border-color,color]
                duration-200

                hover:border-line-strong
                hover:bg-surface-soft
                hover:text-brand-primary

                focus-visible:ring-4
                focus-visible:ring-focus/25
              "
            >
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* contacts */}
        <div className="p-2">
          <ContactItem
            href={`tel:${phone}`}
            label="تماس تلفنی"
            value={phoneDisplay}
            icon={<Phone className="h-[18px] w-[18px]" strokeWidth={1.65} />}
            open={open}
          />

          <ContactItem
            href={`https://wa.me/${whatsappDigits}`}
            label="واتساپ"
            value="شروع گفت‌وگو در واتساپ"
            icon={
              <MessageCircleMore
                className="h-[18px] w-[18px]"
                strokeWidth={1.65}
              />
            }
            target="_blank"
            rel="noopener noreferrer"
            open={open}
          />

          <ContactItem
            href={`mailto:${email}`}
            label="ایمیل"
            value={email}
            icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.65} />}
            open={open}
          />
        </div>

        {/* footer */}
        <div
          className="
            flex
            items-center
            gap-3

            border-t
            border-line

            px-5
            py-3
          "
        >
          <span
            aria-hidden="true"
            className="
              h-1.5
              w-1.5
              shrink-0
              bg-brand-accent
            "
          />

          <p
            className="
              text-[11px]
              font-medium
              leading-[1.8]
              text-ink-muted
            "
          >
            مسیر مناسب ارتباط را بر اساس نیازتان انتخاب کنید.
          </p>
        </div>
      </div>

      {/* ============================================================
          Main floating trigger
      ============================================================ */}

      <button
        type="button"
        onClick={toggleContacts}
        aria-expanded={open}
        aria-controls="dnh-floating-contact-panel"
        aria-label={
          open ? "بستن راه‌های ارتباط" : "نمایش راه‌های ارتباط با DNH"
        }
        className="
          group/contact-trigger

          relative

          flex
          h-[58px]
          w-[58px]
          items-center
          justify-center

          overflow-hidden

          border
          border-[color-mix(in_srgb,var(--dnh-text-on-brand)_18%,transparent)]

          bg-brand-primary

          text-[var(--dnh-text-on-brand)]

          shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-primary)_30%,transparent)]

          outline-none

          transition-[transform,background-color,border-color,box-shadow]
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]

          hover:-translate-y-1
          hover:bg-brand-secondary
          hover:shadow-[0_20px_44px_color-mix(in_srgb,var(--dnh-primary)_36%,transparent)]

          active:translate-y-0
          active:scale-[0.96]

          focus-visible:ring-4
          focus-visible:ring-focus/30

          motion-reduce:transform-none
          motion-reduce:transition-none

          sm:h-[62px]
          sm:w-[62px]
        "
      >
        {/* subtle grid */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "14px 14px",
          }}
        />

        {/* orange marker */}
        <span
          aria-hidden="true"
          className="
            absolute
            right-0
            top-0

            h-[3px]
            w-5

            bg-brand-accent
          "
        />

        <span
          className="
            relative
            z-10

            transition-transform
            duration-300

            group-hover/contact-trigger:scale-[1.04]
          "
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <MessageCircleMore
              className="h-[22px] w-[22px]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          )}
        </span>

        {/* notification marker */}
        {!open ? (
          <span
            aria-hidden="true"
            className="
              absolute
              left-[11px]
              top-[11px]

              h-2
              w-2

              bg-brand-accent

              shadow-[0_0_0_3px_color-mix(in_srgb,var(--dnh-primary)_85%,transparent)]
            "
          />
        ) : null}
      </button>
    </div>
  );
}

/* =============================================================================
   Contact item
============================================================================= */

function ContactItem({
  href,
  label,
  value,
  icon,
  target,
  rel,
  open,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  target?: "_blank";
  rel?: string;
  open: boolean;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      tabIndex={open ? 0 : -1}
      className="
        group/contact-item

        relative

        flex
        min-h-[68px]
        items-center
        gap-3

        border
        border-transparent

        px-3
        py-2.5

        outline-none

        transition-[background-color,border-color,transform]
        duration-250

        hover:border-line
        hover:bg-surface-soft

        focus-visible:border-line-strong
        focus-visible:bg-surface-soft
        focus-visible:ring-4
        focus-visible:ring-focus/20
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center

          border
          border-line

          bg-page

          text-brand-primary

          transition-[background-color,border-color,color]
          duration-250

          group-hover/contact-item:border-brand-primary
          group-hover/contact-item:bg-brand-primary
          group-hover/contact-item:text-[var(--dnh-text-on-brand)]
        "
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block
            text-[12px]
            font-black
            leading-6
            text-ink
          "
        >
          {label}
        </span>

        <span
          dir={label === "ایمیل" ? "ltr" : undefined}
          className={`
            mt-0.5
            block
            truncate

            text-[10px]
            font-medium
            leading-5

            text-ink-muted

            ${label === "ایمیل" ? "text-right" : ""}
          `}
        >
          {value}
        </span>
      </span>

      <ArrowUpLeft
        aria-hidden="true"
        className="
          h-4
          w-4
          shrink-0

          text-ink-muted

          transition-[color,transform]
          duration-250

          group-hover/contact-item:-translate-x-0.5
          group-hover/contact-item:-translate-y-0.5
          group-hover/contact-item:text-brand-accent
        "
        strokeWidth={1.7}
      />
    </a>
  );
}
