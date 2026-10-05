"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Public framework definitions

   فقط تعریف عمومی Framework نمایش داده می‌شود.
   هیچ وزن‌دهی، Decision Tree، Scoring یا منطق داخلی منتشر نمی‌شود.
============================================================================= */

const FRAMEWORK = [
  {
    key: "D",
    en: "DATA INTELLIGENCE",
    title: "هوشمندی داده",
    description:
      "شناخت داده‌ها و متغیرهای مؤثر بر محیط تصمیم؛ از اقتصاد و نقدینگی تا بازار، ساختار مالی و شرایط مسئله.",
  },
  {
    key: "N",
    en: "NAVIGATION STRATEGY",
    title: "راهبرد مسیر",
    description:
      "تبدیل داده و تحلیل به سناریو، مسیرهای قابل بررسی و اولویت‌های تصمیم در شرایط عدم‌قطعیت.",
  },
  {
    key: "H",
    en: "HORIZON ARCHITECTURE",
    title: "معماری افق",
    description:
      "هماهنگ‌کردن تصمیم امروز با ساختار بلندمدت ثروت، نقدشوندگی، اهداف و افق زمانی.",
  },
] as const;

/* =============================================================================
   Component
============================================================================= */

export function DnhFrameworkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
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
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dnh-framework"
      dir="rtl"
      aria-labelledby="dnh-framework-title"
      data-visible={visible}
      className="
        dnh-framework
        relative
        isolate
        overflow-hidden
        bg-[#04384a]
        text-white
      "
    >
      <FrameworkBackground />

      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          grid
          w-full

          gap-12

          py-16

          sm:py-20

          lg:grid-cols-[0.88fr_1.12fr]
          lg:items-center
          lg:gap-16
          lg:py-24

          xl:grid-cols-[0.82fr_1.18fr]
          xl:gap-20
          xl:py-28

        "
      >
        {/* =========================================================
            CONTENT — RIGHT
        ========================================================== */}

        <div
          className="
            order-1
            text-right

            lg:col-start-1
            lg:row-start-1
          "
        >
          {/* eyebrow */}

          <div
            className="
              framework-reveal
              framework-reveal-1

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
                font-black
                text-white/80

                sm:text-[11px]
              "
            >
              چارچوب DNH
            </span>
          </div>

          {/* heading */}

          <h2
            id="dnh-framework-title"
            className="
              framework-reveal
              framework-reveal-2

              max-w-[650px]

              text-[32px]
              font-black
              leading-[1.58]
              tracking-[-0.045em]

              text-white

              sm:text-[39px]

              lg:text-[45px]
              lg:leading-[1.5]

              xl:text-[50px]
            "
          >
            از داده تا تصمیم؛
            <br />
            <span className="text-brand-accent">یک مسیر ساختاریافته</span> برای
            دیدن افق.
          </h2>

          {/* body */}

          <p
            className="
              framework-reveal
              framework-reveal-3

              mt-6
              max-w-[610px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-white/68

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            چارچوب DNH برای نگاه ساختاری به تصمیم‌های مالی و ثروت طراحی شده است؛
            مسیری که از شناخت محیط تصمیم آغاز می‌شود، به سناریو و جهت حرکت
            می‌رسد و تصمیم امروز را در نسبت با افق بلندمدت قرار می‌دهد.
          </p>

          {/* public boundary */}

          <div
            className="
              framework-reveal
              framework-reveal-4

              mt-8
              max-w-[600px]

              border-r
              border-brand-accent/75

              pr-5

              sm:pr-6
            "
          >
            <p
              className="
                text-[11px]
                font-medium
                leading-[2]

                text-white/58

                sm:text-[12px]
              "
            >
              این Framework برای سیگنال‌دهی، پیش‌بینی قطعی قیمت یا جایگزینی
              قضاوت حرفه‌ای طراحی نشده است.
            </p>
          </div>

          {/* CTA */}

          <div
            className="
              framework-reveal
              framework-reveal-5

              mt-8
            "
          >
            <ActionButton
              href="/fa/dnh/framework"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_16px_36px_rgba(252,133,2,0.18)]

                hover:bg-[#eb7c01]

                sm:w-auto
                sm:min-w-[235px]
              "
            >
              آشنایی با چارچوب DNH
            </ActionButton>
          </div>
        </div>

        {/* =========================================================
            FRAMEWORK VISUAL — LEFT
        ========================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <FrameworkInstrument />
        </div>
      </div>

      <FrameworkMotion />
    </section>
  );
}

/* =============================================================================
   Signature visual
============================================================================= */

function FrameworkInstrument() {
  return (
    <div
      aria-hidden="true"
      className="
        framework-instrument
        group/framework

        relative
        mx-auto

        aspect-[1.08/0.86]
        w-full
        max-w-[820px]

        select-none
      "
    >
      {/* =========================================================
          SVG field
      ========================================================== */}

      <svg
        viewBox="0 0 860 690"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <defs>
          <linearGradient id="frameworkBand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8edcf3" stopOpacity="0.06" />

            <stop offset="55%" stopColor="#78d0ec" stopOpacity="0.18" />

            <stop offset="100%" stopColor="#8edcf3" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="frameworkLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#63c4e6" stopOpacity="0.16" />

            <stop offset="50%" stopColor="#bcefff" stopOpacity="0.7" />

            <stop offset="100%" stopColor="#63c4e6" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* =======================================================
            architectural field
        ======================================================== */}

        <g className="framework-grid-field">
          {Array.from({ length: 11 }).map((_, index) => {
            const x = 75 + index * 68;

            return (
              <line
                key={`vertical-${x}`}
                x1={x}
                y1="62"
                x2={x}
                y2="620"
                stroke="#8ad7ef"
                strokeOpacity="0.07"
              />
            );
          })}

          {Array.from({ length: 8 }).map((_, index) => {
            const y = 90 + index * 72;

            return (
              <line
                key={`horizontal-${y}`}
                x1="55"
                y1={y}
                x2="807"
                y2={y}
                stroke="#8ad7ef"
                strokeOpacity="0.055"
              />
            );
          })}

          <path
            d="M62 560L430 325L807 555"
            stroke="#79cce7"
            strokeOpacity="0.08"
          />

          <path
            d="M62 122L430 325L807 125"
            stroke="#79cce7"
            strokeOpacity="0.075"
          />
        </g>

        {/* =======================================================
            data field — D
        ======================================================== */}

        <g className="framework-stage framework-stage-d">
          {[
            [115, 210],
            [160, 260],
            [100, 310],
            [190, 345],
            [130, 405],
            [215, 245],
            [240, 385],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="7"
              height="7"
              fill="#9de5f6"
              fillOpacity="0.72"
            />
          ))}

          <line
            x1="118"
            y1="214"
            x2="281"
            y2="325"
            stroke="#75cae6"
            strokeOpacity="0.2"
          />

          <line
            x1="164"
            y1="264"
            x2="281"
            y2="325"
            stroke="#75cae6"
            strokeOpacity="0.22"
          />

          <line
            x1="104"
            y1="314"
            x2="281"
            y2="325"
            stroke="#75cae6"
            strokeOpacity="0.18"
          />

          <line
            x1="194"
            y1="349"
            x2="281"
            y2="325"
            stroke="#75cae6"
            strokeOpacity="0.2"
          />

          <line
            x1="134"
            y1="409"
            x2="281"
            y2="325"
            stroke="#75cae6"
            strokeOpacity="0.18"
          />
        </g>

        {/* =======================================================
            navigation field — N
        ======================================================== */}

        <g className="framework-stage framework-stage-n">
          <path
            d="
              M281 325
              C340 325 348 255 406 255
              C454 255 464 325 520 325
            "
            stroke="url(#frameworkLine)"
            strokeWidth="1.8"
          />

          <path
            d="
              M281 325
              C338 325 357 390 410 390
              C465 390 474 325 520 325
            "
            stroke="#6ec9e7"
            strokeOpacity="0.18"
            strokeWidth="1.2"
          />

          <path
            d="
              M281 325
              C355 325 374 325 520 325
            "
            stroke="#FC8502"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />

          <rect x="399" y="316" width="18" height="18" fill="#FC8502" />

          <rect x="404" y="321" width="8" height="8" fill="white" />
        </g>

        {/* =======================================================
            horizon field — H
        ======================================================== */}

        <g className="framework-stage framework-stage-h">
          <polygon
            points="
              520,325
              735,230
              790,260
              580,354
            "
            fill="url(#frameworkBand)"
            stroke="#86d9ef"
            strokeOpacity="0.28"
          />

          <polygon
            points="
              520,325
              735,325
              790,355
              580,355
            "
            fill="#74cee9"
            fillOpacity="0.055"
            stroke="#86d9ef"
            strokeOpacity="0.16"
          />

          <polygon
            points="
              520,325
              735,420
              790,390
              580,296
            "
            fill="#74cee9"
            fillOpacity="0.035"
            stroke="#86d9ef"
            strokeOpacity="0.16"
          />

          <line
            x1="520"
            y1="325"
            x2="790"
            y2="325"
            stroke="#FC8502"
            strokeOpacity="0.7"
          />

          <rect x="782" y="317" width="16" height="16" fill="#FC8502" />
        </g>

        {/* =======================================================
            stage anchors
        ======================================================== */}

        <g className="framework-anchors">
          <rect
            x="270"
            y="314"
            width="22"
            height="22"
            fill="#04384A"
            stroke="#88DCF1"
            strokeOpacity="0.8"
          />

          <rect x="276" y="320" width="10" height="10" fill="#88DCF1" />

          <rect
            x="509"
            y="314"
            width="22"
            height="22"
            fill="#04384A"
            stroke="#88DCF1"
            strokeOpacity="0.8"
          />

          <rect x="515" y="320" width="10" height="10" fill="#FC8502" />
        </g>
      </svg>

      {/* =========================================================
          HTML labels
      ========================================================== */}

      <div
        className="
          absolute
          inset-0
          z-10

          hidden

          md:block
        "
      >
        {FRAMEWORK.map((item, index) => {
          const positions = [
            "right-[67%] top-[17%]",
            "right-[37%] top-[58%]",
            "right-[4%] top-[17%]",
          ];

          return (
            <FrameworkVisualLabel
              key={item.key}
              item={item}
              index={index}
              position={positions[index]}
            />
          );
        })}
      </div>

      {/* =========================================================
          Mobile framework
      ========================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          md:hidden
        "
      >
        <ol
          className="
            border
            border-white/12

            bg-[#053548]/80

            backdrop-blur-[8px]
          "
        >
          {FRAMEWORK.map((item, index) => (
            <li
              key={item.key}
              className={`
                framework-mobile-stage

                grid
                grid-cols-[52px_1fr]

                gap-4

                px-4
                py-4

                ${
                  index !== FRAMEWORK.length - 1
                    ? "border-b border-white/10"
                    : ""
                }
              `}
              style={
                {
                  "--framework-stage-delay": `${400 + index * 90}ms`,
                } as CSSProperties
              }
            >
              <div
                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  border
                  border-white/18

                  text-[20px]
                  font-black

                  text-brand-accent
                "
              >
                {item.key}
              </div>

              <div>
                <h3
                  className="
                    text-[12px]
                    font-black
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  dir="ltr"
                  className="
                    mt-1
                    text-right
                    text-[7px]
                    font-bold
                    tracking-[0.14em]
                    text-white/42
                  "
                >
                  {item.en}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* =============================================================================
   Visual label
============================================================================= */

function FrameworkVisualLabel({
  item,
  index,
  position,
}: {
  item: (typeof FRAMEWORK)[number];
  index: number;
  position: string;
}) {
  return (
    <div
      className={`
        framework-label
        absolute

        w-[205px]

        ${position}
      `}
      style={
        {
          "--framework-label-delay": `${400 + index * 100}ms`,
        } as CSSProperties
      }
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0

            items-center
            justify-center

            border
            border-white/18

            bg-[#053a4d]/72

            text-[18px]
            font-black

            text-brand-accent

            backdrop-blur-[6px]

            transition-[border-color,background-color,transform]
            duration-300

            group-hover/framework:border-brand-accent/50
            group-hover/framework:bg-[#06465d]/90
          "
        >
          {item.key}
        </span>

        <div>
          <h3
            className="
              text-[12px]
              font-black
              leading-6

              text-white
            "
          >
            {item.title}
          </h3>

          <p
            dir="ltr"
            className="
              mt-0.5

              text-right
              text-[7px]
              font-bold
              tracking-[0.14em]

              text-white/42
            "
          >
            {item.en}
          </p>
        </div>
      </div>

      <p
        className="
          mt-3
          max-w-[200px]

          text-[9px]
          font-medium
          leading-[1.9]

          text-white/48
        "
      >
        {item.description}
      </p>
    </div>
  );
}

/* =============================================================================
   Background
============================================================================= */

function FrameworkBackground() {
  return (
    <>
      {/* base */}

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
            radial-gradient(
              circle at 76% 32%,
              rgba(22,115,148,.22),
              transparent 31%
            ),

            linear-gradient(
              115deg,
              #032d3c 0%,
              #04384a 45%,
              #032f40 100%
            )
          `,
        }}
      />

      {/* restrained grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(120,215,240,.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(120,215,240,.075) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "88px 88px",

          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.72) 62%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.72) 62%, transparent 100%)",
        }}
      />

      {/* top marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-[22%]
          top-0
          z-[2]

          h-[7px]
          w-[2px]

          bg-brand-accent
        "
      />

      {/* bottom axis */}

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-[8%]
          right-[8%]

          h-px

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />
    </>
  );
}

/* =============================================================================
   Motion
============================================================================= */

function FrameworkMotion() {
  return (
    <style>{`
      /* ==========================================================
         Content
      =========================================================== */

      .framework-reveal {
        opacity: 0;
        transform: translate3d(0, 10px, 0);

        transition:
          opacity 580ms cubic-bezier(.22, 1, .36, 1),
          transform 580ms cubic-bezier(.22, 1, .36, 1);
      }

      .dnh-framework[data-visible="true"]
      .framework-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .framework-reveal-1 {
        transition-delay: 40ms;
      }

      .framework-reveal-2 {
        transition-delay: 110ms;
      }

      .framework-reveal-3 {
        transition-delay: 190ms;
      }

      .framework-reveal-4 {
        transition-delay: 270ms;
      }

      .framework-reveal-5 {
        transition-delay: 350ms;
      }

      /* ==========================================================
         Whole visual
      =========================================================== */

      .framework-instrument {
        opacity: 0;
        transform: translate3d(-10px, 0, 0);

        transition:
          opacity 760ms cubic-bezier(.22,1,.36,1),
          transform 760ms cubic-bezier(.22,1,.36,1);
      }

      .dnh-framework[data-visible="true"]
      .framework-instrument {
        opacity: 1;
        transform: translate3d(0,0,0);

        transition-delay: 120ms;
      }

      /* ==========================================================
         Grid
      =========================================================== */

      .framework-grid-field {
        opacity: 0;

        transition:
          opacity 700ms ease;
      }

      .dnh-framework[data-visible="true"]
      .framework-grid-field {
        opacity: 1;

        transition-delay: 180ms;
      }

      /* ==========================================================
         D / N / H stages
      =========================================================== */

      .framework-stage {
        opacity: 0;

        transform-box: fill-box;
        transform-origin: center;

        transition:
          opacity 560ms ease,
          transform 560ms cubic-bezier(.22,1,.36,1);
      }

      .framework-stage-d {
        transform: translate3d(-12px,0,0);
      }

      .framework-stage-n {
        transform: translate3d(-8px,0,0);
      }

      .framework-stage-h {
        transform: translate3d(-5px,0,0);
      }

      .dnh-framework[data-visible="true"]
      .framework-stage {
        opacity: 1;
        transform: translate3d(0,0,0);
      }

      .dnh-framework[data-visible="true"]
      .framework-stage-d {
        transition-delay: 260ms;
      }

      .dnh-framework[data-visible="true"]
      .framework-stage-n {
        transition-delay: 350ms;
      }

      .dnh-framework[data-visible="true"]
      .framework-stage-h {
        transition-delay: 440ms;
      }

      /* ==========================================================
         Anchors
      =========================================================== */

      .framework-anchors {
        opacity: 0;
        transform-box: fill-box;
        transform-origin: center;
        transform: scale(.82);

        transition:
          opacity 320ms ease,
          transform 320ms cubic-bezier(.22,1,.36,1);
      }

      .dnh-framework[data-visible="true"]
      .framework-anchors {
        opacity: 1;
        transform: scale(1);

        transition-delay: 560ms;
      }

      /* ==========================================================
         Labels
      =========================================================== */

      .framework-label,
      .framework-mobile-stage {
        opacity: 0;
        transform: translate3d(0,7px,0);

        transition:
          opacity 440ms ease,
          transform 440ms cubic-bezier(.22,1,.36,1);
      }

      .dnh-framework[data-visible="true"]
      .framework-label {
        opacity: 1;
        transform: translate3d(0,0,0);

        transition-delay:
          var(--framework-label-delay);
      }

      .dnh-framework[data-visible="true"]
      .framework-mobile-stage {
        opacity: 1;
        transform: translate3d(0,0,0);

        transition-delay:
          var(--framework-stage-delay);
      }

      /* ==========================================================
         Hover
      =========================================================== */

      @media (hover:hover) and (pointer:fine) {
        .framework-instrument:hover
        .framework-stage-n {
          transform: translate3d(2px,0,0);
        }

        .framework-instrument:hover
        .framework-stage-h {
          transform: translate3d(3px,0,0);
        }

        .framework-instrument:hover
        .framework-grid-field {
          opacity: .78;
        }
      }

      /* ==========================================================
         Mobile sizing
      =========================================================== */

      @media (max-width:767px) {
        .framework-instrument {
          aspect-ratio: 1 / 1.14;
        }

        .framework-instrument svg {
          transform:
            scale(.94)
            translateY(-6%);

          transform-origin: center top;
        }
      }

      /* ==========================================================
         Reduced motion
      =========================================================== */

      @media (prefers-reduced-motion: reduce) {
        .framework-reveal,
        .framework-instrument,
        .framework-grid-field,
        .framework-stage,
        .framework-anchors,
        .framework-label,
        .framework-mobile-stage {
          opacity: 1 !important;
          transform: none !important;

          transition: none !important;
          animation: none !important;
        }
      }
    `}</style>
  );
}
