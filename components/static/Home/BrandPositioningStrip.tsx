"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* =============================================================================
   Data

   این 4 مورد Step نیستند.
   چهار بُعد موازی Positioning برند هستند؛ بنابراین عمداً شماره ندارند.
============================================================================= */

const POSITIONING_ITEMS = [
  {
    fa: "ثروت خصوصی",
    en: "PRIVATE WEALTH",
    description: "نگاه ساختاری به ثروت، اهداف و تصمیم‌های مالی.",
  },
  {
    fa: "هوشمندی اقتصاد و محیط تصمیم",
    en: "MACRO INTELLIGENCE",
    description:
      "دیدن متغیرهای اقتصادی در نسبت با تصمیم، نه برای پیش‌بینی بازار.",
  },
  {
    fa: "معماری ریسک",
    en: "RISK ARCHITECTURE",
    description: "شناخت ریسک‌ها و ارتباط آن‌ها با ساختار مالی.",
  },
  {
    fa: "افق بلندمدت ثروت",
    en: "LONG-TERM WEALTH",
    description: "هماهنگ‌کردن تصمیم امروز با افق و ساختار بلندمدت.",
  },
] as const;

/* =============================================================================
   Component
============================================================================= */

export function BrandPositioningStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-positioning"
      dir="rtl"
      aria-labelledby="brand-positioning-title"
      data-visible={visible}
      className="
        brand-positioning
        relative
        isolate
        overflow-hidden

        border-y
        border-line

        bg-page
      "
    >
      {/* =========================================================
          Background
      ========================================================== */}

      <PositioningBackground />

      {/* =========================================================
          Content
      ========================================================== */}

      <div
        className="
          relative
          z-10

          dnh-site-shell
          mx-auto

          w-full
          max-w-[1536px]

          px-5
          py-14

          sm:px-8
          sm:py-16

          lg:px-12
          lg:py-[72px]

          xl:px-16

          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <header
          className="
            grid
            items-end
            gap-7

            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-16
          "
        >
          {/* title */}

          <div
            className="
              positioning-reveal
              positioning-reveal-1
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-9
                  bg-brand-accent
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                جایگاه DNH
              </span>
            </div>

            <h2
              id="brand-positioning-title"
              className="
                max-w-[720px]

                text-[30px]
                font-black
                leading-[1.6]
                tracking-[-0.04em]

                text-ink

                sm:text-[36px]

                lg:text-[40px]
                lg:leading-[1.5]

                xl:text-[44px]
              "
            >
              فراتر از سرمایه‌گذاری؛
              <br />
              <span className="text-brand-primary">معماری ثروت.</span>
            </h2>
          </div>

          {/* description */}

          <div
            className="
              positioning-reveal
              positioning-reveal-2

              lg:pb-1
            "
          >
            <p
              className="
                max-w-[680px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              DNH ثروت را فقط از زاویه سرمایه‌گذاری نمی‌بیند؛ ساختار مالی، ریسک،
              محیط تصمیم و افق بلندمدت را در یک نگاه منسجم کنار هم قرار می‌دهد
              تا مسئله پیش از انتخاب مسیر، روشن‌تر دیده شود.
            </p>
          </div>
        </header>

        {/* =======================================================
            Desktop positioning rail
        ======================================================== */}

        <div
          className="
            relative
            mt-12

            hidden

            md:block

            lg:mt-14
          "
        >
          {/* main line */}

          <div
            aria-hidden="true"
            className="
              positioning-line

              absolute
              left-0
              right-0
              top-[17px]

              h-px

              origin-right

              bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,var(--dnh-primary)_28%,transparent)_8%,color-mix(in_srgb,var(--dnh-primary)_28%,transparent)_92%,transparent_100%)]
            "
          />

          <ul
            aria-label="حوزه‌های اصلی جایگاه DNH"
            className="
              relative
              z-10

              grid
              grid-cols-4
            "
          >
            {POSITIONING_ITEMS.map((item, index) => (
              <PositioningRailItem key={item.en} item={item} index={index} />
            ))}
          </ul>
        </div>

        {/* =======================================================
            Mobile positioning grid
        ======================================================== */}

        <ul
          aria-label="حوزه‌های اصلی جایگاه DNH"
          className="
            mt-10
            grid
            grid-cols-2

            border
            border-line

            md:hidden
          "
        >
          {POSITIONING_ITEMS.map((item, index) => (
            <PositioningMobileItem key={item.en} item={item} index={index} />
          ))}
        </ul>

        {/* =======================================================
            Bottom statement
        ======================================================== */}

        <div
          className="
            positioning-reveal
            positioning-reveal-7

            mt-9

            flex
            items-center
            justify-between
            gap-5

            border-t
            border-line/70

            pt-5

            sm:mt-10
          "
        >
          <p
            className="
              max-w-[720px]

              text-[11px]
              font-medium
              leading-[1.9]

              text-ink-muted

              sm:text-[12px]
            "
          >
            بازار و اقتصاد در DNH ابزار هوشمندی و تصمیم‌سازی‌اند؛ نه هویت اصلی
            برند.
          </p>

          <div
            aria-hidden="true"
            className="
              hidden
              shrink-0
              items-center
              gap-3

              sm:flex
            "
          >
            <span
              className="
                h-[5px]
                w-[5px]
                bg-brand-accent
              "
            />

            <span
              className="
                h-px
                w-14
                bg-brand-primary/30
              "
            />

            <span
              dir="ltr"
              className="
                text-[8px]
                font-bold
                tracking-[0.2em]

                text-brand-primary/65
              "
            >
              PRIVATE WEALTH / DNH
            </span>
          </div>
        </div>
      </div>

      <PositioningMotionStyles />
    </section>
  );
}

/* =============================================================================
   Desktop item
============================================================================= */

function PositioningRailItem({
  item,
  index,
}: {
  item: (typeof POSITIONING_ITEMS)[number];
  index: number;
}) {
  const isSignature = index === 0;

  return (
    <li
      className="
        positioning-axis
        group/axis

        relative

        px-4
        pt-10
        text-center

        first:pr-0
        last:pl-0

        lg:px-7
      "
      style={
        {
          "--axis-delay": `${300 + index * 80}ms`,
        } as CSSProperties
      }
    >
      {/* marker */}

      <span
        aria-hidden="true"
        className={`
          absolute
          right-1/2
          top-[11px]

          z-20

          flex
          h-[13px]
          w-[13px]

          translate-x-1/2

          items-center
          justify-center

          border

          bg-page

          transition-[border-color,background-color,box-shadow,transform]
          duration-300

          ${
            isSignature
              ? `
                border-brand-accent
                shadow-[0_0_0_4px_color-mix(in_srgb,var(--dnh-accent)_8%,transparent)]
              `
              : `
                border-brand-primary/55
                group-hover/axis:border-brand-accent
              `
          }
        `}
      >
        <span
          className={`
            h-[5px]
            w-[5px]

            transition-colors
            duration-300

            ${
              isSignature
                ? "bg-brand-accent"
                : "bg-brand-primary group-hover/axis:bg-brand-accent"
            }
          `}
        />
      </span>

      {/* vertical tick */}

      <span
        aria-hidden="true"
        className="
          absolute
          right-1/2
          top-[24px]

          h-4
          w-px

          translate-x-1/2

          bg-brand-primary/15
        "
      />

      <h3
        className="
          text-[13px]
          font-black
          leading-7

          text-ink

          transition-colors
          duration-300

          group-hover/axis:text-brand-primary

          lg:text-[14px]
        "
      >
        {item.fa}
      </h3>

      <p
        dir="ltr"
        className="
          mt-1

          text-[8px]
          font-bold
          tracking-[0.13em]

          text-brand-primary/60

          lg:text-[9px]
        "
      >
        {item.en}
      </p>

      <p
        className="
          mx-auto
          mt-3
          max-w-[245px]

          text-[10px]
          font-medium
          leading-[1.9]

          text-ink-muted

          lg:text-[11px]
        "
      >
        {item.description}
      </p>
    </li>
  );
}

/* =============================================================================
   Mobile item
============================================================================= */

function PositioningMobileItem({
  item,
  index,
}: {
  item: (typeof POSITIONING_ITEMS)[number];
  index: number;
}) {
  const isRightColumn = index % 2 === 0;
  const isTopRow = index < 2;

  return (
    <li
      className={`
        positioning-axis

        relative

        min-h-[150px]

        px-4
        py-5

        ${isRightColumn ? "border-l border-line" : ""}

        ${isTopRow ? "border-b border-line" : ""}
      `}
      style={
        {
          "--axis-delay": `${250 + index * 70}ms`,
        } as CSSProperties
      }
    >
      <div
        className="
          mb-4
          flex
          items-center
          gap-2
        "
      >
        <span
          aria-hidden="true"
          className="
            flex
            h-[12px]
            w-[12px]
            items-center
            justify-center

            border
            border-brand-primary/55
          "
        >
          <span
            className={`
              h-1
              w-1

              ${index === 0 ? "bg-brand-accent" : "bg-brand-primary"}
            `}
          />
        </span>

        <span
          aria-hidden="true"
          className="
            h-px
            w-7

            bg-brand-primary/20
          "
        />
      </div>

      <h3
        className="
          text-[12px]
          font-black
          leading-6

          text-ink
        "
      >
        {item.fa}
      </h3>

      <p
        dir="ltr"
        className="
          mt-1

          text-right
          text-[7px]
          font-bold
          tracking-[0.12em]

          text-brand-primary/55
        "
      >
        {item.en}
      </p>

      <p
        className="
          mt-3

          text-[9px]
          font-medium
          leading-[1.9]

          text-ink-muted
        "
      >
        {item.description}
      </p>
    </li>
  );
}

/* =============================================================================
   Background
============================================================================= */

function PositioningBackground() {
  return (
    <>
      {/* very soft tint */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
        style={{
          background: `
            linear-gradient(
              105deg,
              color-mix(in srgb, var(--dnh-primary) 3%, white) 0%,
              white 42%,
              white 100%
            )
          `,
        }}
      />

      {/* restrained institutional grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          opacity-[0.22]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                transparent
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "120px 100%",
          maskImage:
            "linear-gradient(to right, transparent, black 16%, black 84%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 16%, black 84%, transparent)",
        }}
      />

      {/* left atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[130px]
          -left-[120px]

          h-[280px]
          w-[420px]

          bg-brand-primary/[0.055]

          blur-[100px]
        "
      />

      {/* tiny brand marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          z-[2]

          h-[6px]
          w-[2px]

          -translate-x-1/2

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   Motion
============================================================================= */

function PositioningMotionStyles() {
  return (
    <style>{`
      /* ==========================================================
         General reveal
      =========================================================== */

      .positioning-reveal {
        opacity: 0;
        transform: translate3d(0, 9px, 0);

        transition:
          opacity 560ms cubic-bezier(.22, 1, .36, 1),
          transform 560ms cubic-bezier(.22, 1, .36, 1);
      }

      .brand-positioning[data-visible="true"]
      .positioning-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .positioning-reveal-1 {
        transition-delay: 40ms;
      }

      .positioning-reveal-2 {
        transition-delay: 120ms;
      }

      .positioning-reveal-7 {
        transition-delay: 620ms;
      }

      /* ==========================================================
         Main positioning line
      =========================================================== */

      .positioning-line {
        transform: scaleX(0);

        transition:
          transform 720ms cubic-bezier(.22, 1, .36, 1);
      }

      .brand-positioning[data-visible="true"]
      .positioning-line {
        transform: scaleX(1);

        transition-delay: 180ms;
      }

      /* ==========================================================
         Axis items
      =========================================================== */

      .positioning-axis {
        opacity: 0;
        transform: translate3d(0, 7px, 0);

        transition:
          opacity 480ms ease,
          transform 480ms cubic-bezier(.22, 1, .36, 1);

        transition-delay:
          var(--axis-delay);
      }

      .brand-positioning[data-visible="true"]
      .positioning-axis {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* ==========================================================
         Reduced motion
      =========================================================== */

      @media (prefers-reduced-motion: reduce) {
        .positioning-reveal,
        .positioning-line,
        .positioning-axis {
          opacity: 1 !important;
          transform: none !important;

          transition: none !important;
          animation: none !important;
        }
      }
    `}</style>
  );
}
