import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const HERO_INDEX = [
  {
    index: "01",
    title: "معماری ثروت چیست",
    href: "#wealth-architecture-intro",
    active: true,
  },
  {
    index: "02",
    title: "تفاوت با مدیریت پرتفوی",
    href: "#portfolio-difference",
  },
  {
    index: "03",
    title: "اجزای ساختار ثروت",
    href: "#wealth-components",
  },
  {
    index: "04",
    title: "خطاهای پرتکرار",
    href: "#common-mistakes",
  },
  {
    index: "05",
    title: "تصویر روشن‌تر",
    href: "#clearer-picture",
  },
];

export function WealthArchitectureHero() {
  return (
    <section
      id="wealth-architecture-hero"
      dir="rtl"
      aria-labelledby="wealth-architecture-title"
      className="
        wealth-hero
        relative
        isolate
        overflow-hidden
        bg-[#032c3a]
        text-white
      "
      style={{
        minHeight: "100dvh",
      }}
    >
      <HeroBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1600px]

          gap-8

          px-5
          pb-10
          pt-[118px]

          sm:px-8
          sm:pt-[130px]

          lg:grid-cols-[1.05fr_0.95fr]
          lg:items-center
          lg:gap-8
          lg:px-12
          lg:pb-8
          lg:pt-[115px]

          xl:px-16
          2xl:px-20
        "
        style={{
          minHeight: "100dvh",
        }}
      >
        {/* ============================================================
            CONTENT — RIGHT
        ============================================================ */}

        <div
          className="
            wealth-hero-content

            contents

            lg:block
            lg:col-start-1
            lg:row-start-1
          "
        >
          <div className="order-1">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-10
                bg-brand-accent
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                text-white/65

                sm:text-[11px]
              "
            >
              معماری ثروت
            </span>
          </div>

          <h1
            id="wealth-architecture-title"
            className="
              max-w-[720px]

              text-[34px]
              font-black
              leading-[1.62]
              tracking-[-0.045em]

              text-white

              sm:text-[42px]

              lg:text-[46px]

              xl:text-[52px]
            "
          >
            ثروت،
            <br />
            فقط مجموعه‌ای از دارایی‌ها نیست؛
            <br />
            <span className="text-brand-accent">یک ساختار</span> است.
          </h1>

          <p
            className="
              mt-5

              text-[15px]
              font-medium
              leading-[2]

              text-white/82

              sm:text-[16px]
            "
          >
            یک تصویر منسجم از ثروت، سرمایه و تصمیم‌های شما.
          </p>

          <p
            className="
              mt-4
              max-w-[650px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-white/60

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            در نگاه DNH ثروت از دارایی‌ها، نقدینگی، ریسک، اهداف، افق زمانی و
            تصمیم‌های مالی تشکیل می‌شود. معماری ثروت به معنای دیدن این اجزا در
            یک ساختار منسجم و مرتبط است.
          </p>

          </div>

          {/* ==========================================================
              ACTIONS
          ========================================================== */}

          <div
            className="
              order-3
              mt-0
              flex
              flex-col
              gap-3

              lg:order-none
              lg:mt-8

              sm:flex-row
              sm:items-center
              sm:gap-5
            "
          >
            <ActionButton
              href="#wealth-architecture-intro"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                hover:bg-[#ed7d00]

                sm:w-auto
                sm:min-w-[235px]
              "
            >
              آشنایی با معماری ثروت
            </ActionButton>

            <Link
              href="#wealth-architecture-intro"
              className="
                group/read

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-3

                border-white/15

                text-[12px]
                font-bold
                text-white/75

                outline-none

                transition-colors
                duration-300

                hover:text-white

                focus-visible:ring-4
                focus-visible:ring-focus/25

                sm:border-r
                sm:pr-5
              "
            >
              <span>بیشتر بخوانید</span>

              <ArrowDown
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  transition-transform
                  duration-300

                  group-hover/read:translate-y-1
                "
                strokeWidth={1.6}
              />
            </Link>
          </div>

          {/* ==========================================================
              PAGE INDEX — DESKTOP
          ========================================================== */}

          <nav
            aria-label="بخش‌های صفحه معماری ثروت"
            className="
              mt-10
              hidden

              grid-cols-5
              gap-3

              border-t
              border-white/10

              pt-5

              lg:grid
            "
          >
            {HERO_INDEX.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                aria-current={item.active ? "location" : undefined}
                className="
                  group/index
                  relative

                  min-w-0

                  border-t
                  border-white/25

                  pt-3

                  outline-none

                  transition-[border-color,transform]
                  duration-300

                  hover:-translate-y-px
                  hover:border-brand-accent

                  focus-visible:ring-2
                  focus-visible:ring-focus/40
                "
              >
                {item.active ? (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -top-[2px]
                      inset-x-0

                      h-[3px]

                      bg-brand-accent
                    "
                  />
                ) : null}

                <span
                  dir="ltr"
                  className={`
                    block
                    text-[14px]
                    font-medium

                    ${item.active ? "text-white" : "text-white/56"}
                  `}
                >
                  {item.index}
                </span>

                <span
                  className={`
                    mt-1.5
                    block

                    truncate

                    text-[10px]
                    font-medium
                    leading-5

                    transition-colors
                    duration-300

                    group-hover/index:text-white

                    ${item.active ? "font-black text-white" : "text-white/55"}
                  `}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* ============================================================
            VISUAL — LEFT
        ============================================================ */}

        <div
          className="
            wealth-visual-wrapper

            relative

            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <WealthStructureVisual />
        </div>
      </div>

      <HeroMotionStyles />
    </section>
  );
}

/* =============================================================================
   VISUAL
============================================================================= */

function WealthStructureVisual() {
  return (
    <div
      aria-hidden="true"
      className="
        wealth-structure

        group/wealth

        relative
        mx-auto

        aspect-square
        w-full
        max-w-[680px]

        select-none

        sm:max-w-[720px]
        lg:max-w-none
      "
    >
      {/* ============================================================
          LABELS
      ============================================================ */}

      <VisualLabel
        label="اهداف"
        className="left-[12%] top-[13%]"
        delay="1.05s"
      />

      <VisualLabel label="ریسک" className="left-[3%] top-[31%]" delay="1.12s" />

      <VisualLabel
        label="افق زمانی"
        className="left-[5%] top-[54%]"
        delay="1.19s"
      />

      <VisualLabel
        label="تصمیم‌های مالی"
        className="left-[2%] top-[72%]"
        delay="1.26s"
      />

      <VisualLabel
        label="دارایی‌ها"
        reverse
        className="right-[6%] top-[19%]"
        delay="1.08s"
      />

      <VisualLabel
        label="نقدینگی"
        reverse
        className="right-[1%] top-[43%]"
        delay="1.17s"
      />

      <VisualLabel
        label="ساختار مالی"
        reverse
        className="right-[1%] top-[70%]"
        delay="1.28s"
      />

      {/* ============================================================
          SVG
      ============================================================ */}

      <svg
        viewBox="0 0 760 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          inset-0
          h-full
          w-full
          overflow-visible
        "
      >
        <defs>
          <linearGradient id="wealth-plane-a" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.06"
            />
            <stop offset="48%" stopColor="#55cffd" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#dcf7ff" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="wealth-plane-b" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#9ae8ff" stopOpacity="0.4" />
            <stop
              offset="100%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.08"
            />
          </linearGradient>

          <linearGradient id="wealth-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#76d9ff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#dff8ff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#77d9ff" stopOpacity="0.13" />
          </linearGradient>

          <radialGradient
            id="wealth-core-glow"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(382 351) rotate(90) scale(105)"
          >
            <stop
              offset="0%"
              stopColor="var(--dnh-accent)"
              stopOpacity="0.48"
            />
            <stop
              offset="45%"
              stopColor="var(--dnh-accent)"
              stopOpacity="0.12"
            />
            <stop offset="100%" stopColor="var(--dnh-accent)" stopOpacity="0" />
          </radialGradient>

          <pattern
            id="wealth-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              stroke="#65d6ff"
              strokeOpacity="0.075"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
        </defs>

        {/* GRID */}
        <rect
          x="70"
          y="30"
          width="620"
          height="620"
          fill="url(#wealth-grid)"
          className="wealth-grid"
        />

        {/* Perspective guides */}
        <g
          className="wealth-guides"
          stroke="#54d1ff"
          strokeOpacity="0.13"
          strokeWidth="1"
        >
          <path d="M10 345L382 130L750 340" />
          <path d="M20 510L382 298L742 502" />
          <path d="M45 620L382 421L710 608" />

          <path d="M382 30V662" />

          <path d="M102 76L622 638" />
          <path d="M205 30L686 548" />
          <path d="M66 191L501 660" />

          <path d="M630 45L119 625" />
          <path d="M710 154L264 660" />
        </g>

        {/* glow */}
        <circle
          cx="382"
          cy="351"
          r="105"
          fill="url(#wealth-core-glow)"
          className="wealth-core-glow"
        />

        {/* ==========================================================
            GLASS PLANES
        ========================================================== */}

        <g className="wealth-plane wealth-plane-1">
          <polygon
            points="110,300 280,204 526,337 355,436"
            fill="url(#wealth-plane-a)"
            stroke="url(#wealth-line)"
            strokeWidth="1.5"
          />

          <polygon
            points="110,300 110,221 280,127 280,204"
            fill="url(#wealth-plane-b)"
            fillOpacity="0.65"
            stroke="#8be3ff"
            strokeOpacity="0.44"
          />
        </g>

        <g className="wealth-plane wealth-plane-2">
          <polygon
            points="211,423 382,324 591,441 420,542"
            fill="url(#wealth-plane-a)"
            stroke="url(#wealth-line)"
            strokeWidth="1.5"
          />

          <polygon
            points="211,423 211,350 382,253 382,324"
            fill="url(#wealth-plane-b)"
            fillOpacity="0.42"
            stroke="#8be3ff"
            strokeOpacity="0.45"
          />
        </g>

        <g className="wealth-plane wealth-plane-3">
          <polygon
            points="248,526 419,430 586,526 415,624"
            fill="url(#wealth-plane-a)"
            stroke="url(#wealth-line)"
            strokeWidth="1.5"
          />
        </g>

        {/* vertical planes */}
        <g className="wealth-plane wealth-plane-4">
          <polygon
            points="276,177 276,376 339,412 339,139"
            fill="url(#wealth-plane-b)"
            stroke="#83e0ff"
            strokeOpacity="0.56"
            strokeWidth="1.3"
          />
        </g>

        <g className="wealth-plane wealth-plane-5">
          <polygon
            points="386,67 386,321 456,361 456,110"
            fill="url(#wealth-plane-b)"
            stroke="#d8f7ff"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </g>

        <g className="wealth-plane wealth-plane-6">
          <polygon
            points="504,231 504,432 559,401 559,260"
            fill="url(#wealth-plane-b)"
            fillOpacity="0.72"
            stroke="#9fe8ff"
            strokeOpacity="0.48"
          />
        </g>

        {/* secondary inner frame */}
        <g className="wealth-inner-frame" stroke="#79ddff" strokeOpacity="0.3">
          <path d="M321 281L382 246L448 284L386 320Z" />
          <path d="M321 281V397L386 434V320" />
          <path d="M448 284V397L386 434" />
        </g>

        {/* ==========================================================
            ORANGE AXIS
        ========================================================== */}

        <g className="wealth-axis">
          <line
            x1="382"
            y1="48"
            x2="382"
            y2="655"
            stroke="var(--dnh-accent)"
            strokeOpacity="0.68"
            strokeWidth="1.2"
          />

          <line
            x1="394"
            y1="118"
            x2="394"
            y2="585"
            stroke="var(--dnh-accent)"
            strokeOpacity="0.22"
          />
        </g>

        {/* ==========================================================
            CONNECTOR LINES
        ========================================================== */}

        <g
          className="wealth-connectors"
          stroke="#d8f7ff"
          strokeOpacity="0.5"
          strokeWidth="1"
        >
          <path d="M280 166L219 105L160 105" />
          <path d="M211 289L144 246L93 246" />
          <path d="M212 423L139 423L102 458" />
          <path d="M248 526L162 526L116 570" />

          <path d="M456 160L522 112L590 112" />
          <path d="M559 315L614 315L656 349" />
          <path d="M545 507L613 507L652 548" />
        </g>

        {/* ==========================================================
            CORE
        ========================================================== */}

        <g className="wealth-core">
          <rect
            x="369"
            y="338"
            width="26"
            height="26"
            fill="#082d3c"
            stroke="var(--dnh-accent)"
            strokeWidth="2"
          />

          <rect
            x="375"
            y="344"
            width="14"
            height="14"
            fill="var(--dnh-accent)"
            fillOpacity="0.94"
          />

          <path
            d="M382 330L402 341V363L382 375L362 363V341L382 330Z"
            stroke="var(--dnh-accent)"
            strokeWidth="1.4"
            fill="none"
          />
        </g>
      </svg>

      {/* signature */}
      <div
        className="
          wealth-signature

          absolute
          bottom-[5%]
          left-[4%]

          hidden

          text-left

          lg:block
        "
      >
        <span
          dir="ltr"
          className="
            block

            text-[7px]
            font-bold
            uppercase
            leading-[1.8]
            tracking-[0.34em]

            text-white/42
          "
        >
          DNH
          <br />
          Wealth
          <br />
          Architecture
        </span>
      </div>
    </div>
  );
}

function VisualLabel({
  label,
  className,
  reverse = false,
  delay,
}: {
  label: string;
  className: string;
  reverse?: boolean;
  delay: string;
}) {
  return (
    <div
      className={`
        wealth-label
        absolute
        z-20

        hidden
        items-center
        gap-2

        text-[11px]
        font-black
        text-white/86

        lg:flex

        ${className}
      `}
      style={{
        animationDelay: delay,
      }}
    >
      {reverse ? (
        <>
          <span
            aria-hidden="true"
            className="
              h-2
              w-2

              border
              border-white/50

              bg-[#052f3d]
            "
          />

          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-white/30
            "
          />

          <span>{label}</span>
        </>
      ) : (
        <>
          <span>{label}</span>

          <span
            aria-hidden="true"
            className="
              h-px
              w-6
              bg-white/30
            "
          />

          <span
            aria-hidden="true"
            className="
              h-2
              w-2

              border
              border-white/50

              bg-[#052f3d]
            "
          />
        </>
      )}
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              105deg,
              #033646 0%,
              #032f3e 38%,
              #022734 72%,
              #021f2a 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          wealth-bg-grid

          pointer-events-none
          absolute
          inset-0
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(93, 211, 255, .065) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(93, 211, 255, .045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "88px 88px",
          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.75) 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.75) 55%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[15%]
          top-[17%]

          h-[520px]
          w-[520px]

          bg-brand-primary/[0.08]

          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-1/2

          hidden
          w-px

          bg-white/[0.035]

          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />
    </>
  );
}

/* =============================================================================
   MOTION
============================================================================= */

function HeroMotionStyles() {
  return (
    <style>{`
      @keyframes wealthContentEnter {
        from {
          opacity: 0;
          transform: translate3d(18px, 12px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes wealthVisualEnter {
        from {
          opacity: 0;
          transform: translate3d(-18px, 10px, 0) scale(.985);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes wealthPlaneEnter {
        from {
          opacity: 0;
          transform: translate3d(-12px, 14px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes wealthLabelEnter {
        from {
          opacity: 0;
          transform: translate3d(-7px, 0, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes wealthAxisEnter {
        from {
          opacity: 0;
          transform: scaleY(0);
        }

        to {
          opacity: 1;
          transform: scaleY(1);
        }
      }

      @keyframes wealthCoreEnter {
        from {
          opacity: 0;
          transform: scale(.68);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .wealth-hero-content {
        opacity: 0;
        animation:
          wealthContentEnter
          720ms
          120ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .wealth-visual-wrapper {
        opacity: 0;
        animation:
          wealthVisualEnter
          850ms
          160ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .wealth-bg-grid {
        opacity: 0;
        animation:
          wealthContentEnter
          900ms
          40ms
          ease-out
          forwards;
      }

      .wealth-plane {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;

        animation:
          wealthPlaneEnter
          680ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;

        transition:
          opacity 320ms ease,
          transform 320ms cubic-bezier(.22, 1, .36, 1);
      }

      .wealth-plane-1 {
        animation-delay: 250ms;
      }

      .wealth-plane-2 {
        animation-delay: 330ms;
      }

      .wealth-plane-3 {
        animation-delay: 410ms;
      }

      .wealth-plane-4 {
        animation-delay: 490ms;
      }

      .wealth-plane-5 {
        animation-delay: 570ms;
      }

      .wealth-plane-6 {
        animation-delay: 650ms;
      }

      .wealth-axis {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;

        animation:
          wealthAxisEnter
          850ms
          650ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .wealth-core {
        transform-box: fill-box;
        transform-origin: center;

        opacity: 0;

        animation:
          wealthCoreEnter
          420ms
          920ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;

        transition:
          transform 280ms cubic-bezier(.22, 1, .36, 1);
      }

      .wealth-core-glow {
        transition:
          opacity 320ms ease,
          transform 320ms ease;
        transform-origin: center;
      }

      .wealth-guides,
      .wealth-connectors,
      .wealth-inner-frame {
        transition:
          opacity 320ms ease;
      }

      .wealth-label {
        opacity: 0;

        animation:
          wealthLabelEnter
          460ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;

        transition:
          color 260ms ease,
          transform 260ms ease;
      }

      .wealth-signature {
        opacity: 0;
        animation:
          wealthLabelEnter
          500ms
          1.35s
          ease-out
          forwards;
      }

      /* ============================================================
         VISUAL HOVER
      ============================================================ */

      @media (hover: hover) and (pointer: fine) {
        .wealth-structure:hover .wealth-plane {
          opacity: 1;
        }

        .wealth-structure:hover .wealth-plane-1 {
          transform: translate3d(-3px, -2px, 0);
        }

        .wealth-structure:hover .wealth-plane-2 {
          transform: translate3d(2px, -3px, 0);
        }

        .wealth-structure:hover .wealth-plane-3 {
          transform: translate3d(-1px, 3px, 0);
        }

        .wealth-structure:hover .wealth-plane-4 {
          transform: translate3d(-3px, 0, 0);
        }

        .wealth-structure:hover .wealth-plane-5 {
          transform: translate3d(2px, -4px, 0);
        }

        .wealth-structure:hover .wealth-plane-6 {
          transform: translate3d(3px, 1px, 0);
        }

        .wealth-structure:hover .wealth-guides {
          opacity: .72;
        }

        .wealth-structure:hover .wealth-connectors {
          opacity: .95;
        }

        .wealth-structure:hover .wealth-inner-frame {
          opacity: 1;
        }

        .wealth-structure:hover .wealth-core {
          transform: scale(1.075);
        }

        .wealth-structure:hover .wealth-core-glow {
          opacity: 1;
          transform: scale(1.08);
        }

        .wealth-structure:hover .wealth-label {
          color: rgba(255,255,255,.98);
        }
      }

      /* ============================================================
         MOBILE
      ============================================================ */

      @media (max-width: 1023px) {
        .wealth-structure {
          max-height: 520px;
        }
      }

      /* ============================================================
         REDUCED MOTION
      ============================================================ */

      @media (prefers-reduced-motion: reduce) {
        .wealth-hero-content,
        .wealth-visual-wrapper,
        .wealth-bg-grid,
        .wealth-plane,
        .wealth-axis,
        .wealth-core,
        .wealth-label,
        .wealth-signature {
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
