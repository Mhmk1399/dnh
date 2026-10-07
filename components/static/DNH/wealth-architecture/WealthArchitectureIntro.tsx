"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const STRUCTURE_LABELS = [
  { label: "دارایی", top: "15%", right: "6%" },
  { label: "ریسک", top: "35%", right: "4%" },
  { label: "نقدینگی", top: "55%", right: "6%" },
  { label: "هدف", top: "71%", right: "8%" },
  { label: "زمان", top: "82%", right: "15%" },
];

const STRUCTURE_STEPS = [
  {
    title: "اجزای پراکنده",
    description: "دارایی‌ها و عوامل مؤثر",
    active: false,
  },
  {
    title: "ایجاد ارتباط",
    description: "دیدن رابطه میان اجزا",
    active: false,
  },
  {
    title: "یک ساختار منسجم",
    description: "تصویری کامل‌تر از ثروت",
    active: true,
  },
] as const;

export function WealthArchitectureIntro() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

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
      ref={ref}
      id="wealth-architecture-intro"
      dir="rtl"
      aria-labelledby="wealth-architecture-intro-title"
      data-visible={visible}
      className="
        group/wealth-intro
        relative
        isolate
        scroll-mt-24
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      <SectionBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1536px]

          gap-12

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:grid-cols-[1.05fr_0.95fr]
          lg:items-center
          lg:gap-16
          lg:px-12
          lg:py-24

          xl:gap-20
          xl:px-16

          2xl:px-20
        "
      >
        {/* ============================================================
            CONTENT — RIGHT
        ============================================================ */}

        <div
          className="
            order-1

            lg:col-start-1
            lg:row-start-1
          "
        >
          <div className="wealth-intro-reveal wealth-delay-1 mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

            <span className="text-[10px] font-black text-brand-primary sm:text-[11px]">
              معماری ثروت چیست؟
            </span>
          </div>

          <h2
            id="wealth-architecture-intro-title"
            className="
              wealth-intro-reveal
              wealth-delay-2

              max-w-[660px]

              text-[32px]
              font-black
              leading-[1.6]
              tracking-[-0.045em]

              text-ink

              sm:text-[40px]

              lg:text-[46px]

              xl:text-[50px]
            "
          >
            داشتن دارایی،
            <br />
            با داشتن <span className="text-brand-primary">ساختار</span> یکی
            نیست.
          </h2>

          <p
            className="
              wealth-intro-reveal
              wealth-delay-3

              mt-6
              max-w-[650px]

              text-[13px]
              font-medium
              leading-[2.25]

              text-ink-muted

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            ممکن است مجموعه‌ای از دارایی‌ها داشته باشید؛ از سرمایه‌گذاری‌ها
            گرفته تا کسب‌وکار، دارایی‌های واقعی و نقدینگی. اما تا زمانی که رابطه
            میان این اجزا، ریسک‌ها، اهداف، زمان و تصمیم‌های مالی به‌صورت یک
            تصویر منسجم دیده نشود، تصویر کامل ثروت شکل نمی‌گیرد.
          </p>

          {/* ==========================================================
              CONTRAST
          ========================================================== */}

          <div
            className="
              wealth-intro-reveal
              wealth-delay-4

              mt-8
              grid
              gap-px

              border-y
              border-line

              bg-line

              sm:grid-cols-2
            "
          >
            <div
              className="
                bg-page
                px-4
                py-5

                sm:px-5
              "
            >
              <span
                aria-hidden="true"
                className="
                  mb-4
                  block
                  h-[2px]
                  w-7
                  bg-ink-muted/25
                "
              />

              <h3 className="text-[15px] font-black text-ink">
                فقط دارایی‌ها نیست
              </h3>

              <p className="mt-2 text-[11px] font-medium leading-6 text-ink-muted sm:text-[12px]">
                دیدن اجزای مالی به‌صورت جداگانه، تصویر کامل تصمیم را نمی‌سازد.
              </p>
            </div>

            <div
              className="
                bg-surface-soft
                px-4
                py-5

                sm:px-5
              "
            >
              <span
                aria-hidden="true"
                className="
                  mb-4
                  block
                  h-[2px]
                  w-7
                  bg-brand-accent
                "
              />

              <h3 className="text-[15px] font-black text-ink">
                یک ساختار منسجم
              </h3>

              <p className="mt-2 text-[11px] font-medium leading-6 text-ink-muted sm:text-[12px]">
                دیدن رابطه میان اجزا، اهداف، ریسک‌ها و تصمیم‌های مالی.
              </p>
            </div>
          </div>

          {/* ==========================================================
              ACTIONS
          ========================================================== */}

          <div
            className="
              wealth-intro-reveal
              wealth-delay-5

              mt-8
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
              sm:items-center
            "
          >
            {/* این لینک به سکشن سوم وصل می‌شود */}
            <ActionButton
              href="#wealth-components"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_14px_32px_color-mix(in_srgb,var(--dnh-accent)_22%,transparent)]

                hover:bg-[#ec7d01]

                  sm:w-auto
                sm:min-w-[240px]
              "
            >
              دیدن اجزای معماری ثروت
            </ActionButton>

            <ActionButton
              href="/financial-decision-assessment"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-transparent
                bg-transparent
                shadow-none

                hover:border-line
                hover:bg-surface-soft

                sm:w-auto
              "
            >
              ارزیابی اولیه تصمیم مالی
            </ActionButton>
          </div>
        </div>

        {/* ============================================================
            VISUAL — LEFT
        ============================================================ */}

        <div
          className="
            order-2 rotate-360

            lg:col-start-2
            lg:row-start-1
          "
        >
          <WealthTransitionVisual visible={visible} />
        </div>
      </div>

      <MotionStyles />
    </section>
  );
}

/* =============================================================================
   VISUAL
============================================================================= */

function WealthTransitionVisual({ visible }: { visible: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div
        aria-hidden="true"
        className="
          group/wealth-visual
          relative
          mx-auto

          w-full
          max-w-[720px]

          overflow-hidden

          border
          border-line

          bg-[linear-gradient(135deg,#ffffff_0%,color-mix(in_srgb,var(--dnh-primary)_4%,white)_100%)]

          lg:aspect-[1.12/1]
          lg:border-0
          lg:bg-transparent
        "
      >
        <div
          className="
            relative
            h-[280px]
            min-[390px]:h-[315px]
            sm:h-[410px]

            lg:absolute
            lg:inset-0
            lg:h-full
          "
        >
          {/* Labels فقط دسکتاپ */}
          {STRUCTURE_LABELS.map((item, index) => (
            <div
              key={item.label}
              className={`
                absolute
                z-20

                hidden
                min-w-[112px]
                items-center
                justify-end
                gap-2

                rounded-sm
                bg-page/[0.8]
                px-2.5
                py-1.5

                text-right

                shadow-[0_8px_22px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

                backdrop-blur-[2px]

                lg:flex

                transition-[opacity,transform]
                duration-500
                ease-[cubic-bezier(.22,1,.36,1)]

                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0"
                }
              `}
              style={{
                top: item.top,
                right: item.right,
                transitionDelay: `${430 + index * 70}ms`,
              }}
            >
              <span className="text-[11px] font-extrabold leading-none text-ink">
                {item.label}
              </span>

              <span className="h-px w-7 bg-line-strong/35" />

              <span className="h-2.5 w-2.5 shrink-0 border border-line-strong bg-page" />
            </div>
          ))}

          <svg
            viewBox="0 0 760 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full"
          >
        <defs>
          <linearGradient id="fragment-fill" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.04"
            />
            <stop
              offset="100%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.2"
            />
          </linearGradient>

          <linearGradient id="structure-fill" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.28"
            />
          </linearGradient>

          <pattern
            id="wealth-intro-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0H0V30"
              stroke="var(--dnh-primary)"
              strokeOpacity="0.045"
            />
          </pattern>
        </defs>

        {/* grid */}
        <rect width="760" height="620" fill="url(#wealth-intro-grid)" />

        {/* ==========================================================
            FRAGMENTS
        ========================================================== */}

        <g
          className={`
            wealth-fragment
            wealth-fragment-1

            transition-[opacity,transform]
            duration-600
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="676,140 627,164 627,250 676,226"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.28"
          />
        </g>

        <g
          className={`
            wealth-fragment
            wealth-fragment-2

            transition-[opacity,transform]
            delay-75
            duration-600
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="633,265 579,291 579,390 633,364"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.25"
          />
        </g>

        <g
          className={`
            wealth-fragment
            wealth-fragment-3

            transition-[opacity,transform]
            delay-150
            duration-600
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="596,90 544,117 544,198 596,172"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.25"
          />
        </g>

        <g
          className={`
            wealth-fragment
            wealth-fragment-4

            transition-[opacity,transform]
            delay-200
            duration-600
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="590,408 546,430 546,494 590,472"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.2"
          />
        </g>

        {/* ==========================================================
            RELATIONSHIP ZONE
        ========================================================== */}

        <g
          className={`
            transition-[opacity,transform]
            delay-200
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
            }
          `}
        >
          <polygon
            points="500,145 427,181 427,349 500,312"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.36"
          />

          <polygon
            points="453,229 378,267 378,440 453,400"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.28"
          />

          <polygon
            points="418,105 339,145 339,303 418,265"
            fill="url(#fragment-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.26"
          />
        </g>

        {/* arrows */}
        <g
          className={`
            transition-opacity
            delay-300
            duration-500

            ${visible ? "opacity-100" : "opacity-0"}
          `}
          stroke="var(--dnh-primary)"
          strokeOpacity="0.55"
        >
          <path d="M541 305H508" />
          <path d="M517 296L508 305L517 314" />

          <path d="M323 305H291" />
          <path d="M300 296L291 305L300 314" />
        </g>

        {/* ==========================================================
            STRUCTURED FIELD
        ========================================================== */}

        <g
          className={`
            wealth-final-structure

            transition-[opacity,transform]
            delay-300
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]

            ${
              visible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
            }
          `}
        >
          <polygon
            points="266,200 187,159 103,200 182,242"
            fill="url(#structure-fill)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.55"
          />

          <polygon
            points="266,200 266,395 182,438 182,242"
            fill="var(--dnh-primary)"
            fillOpacity="0.08"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.4"
          />

          <polygon
            points="182,242 103,200 103,394 182,438"
            fill="var(--dnh-primary)"
            fillOpacity="0.12"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.42"
          />

          <polygon
            points="240,248 182,218 128,245 185,275"
            fill="var(--dnh-primary)"
            fillOpacity="0.13"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.34"
          />

          <polygon
            points="240,302 183,272 129,299 186,329"
            fill="var(--dnh-primary)"
            fillOpacity="0.1"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.26"
          />

          <polygon
            points="240,356 184,326 130,353 186,383"
            fill="var(--dnh-primary)"
            fillOpacity="0.08"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.2"
          />
        </g>

        {/* ==========================================================
            CONNECTION LINES
        ========================================================== */}

        <g
          className={`
            wealth-connection-lines

            transition-opacity
            delay-500
            duration-700

            ${visible ? "opacity-100" : "opacity-0"}
          `}
          stroke="var(--dnh-primary)"
          strokeOpacity="0.24"
        >
          <path d="M544 158L266 260" />
          <path d="M579 331L266 303" />
          <path d="M546 455L266 348" />
          <path d="M427 207L266 274" />
          <path d="M378 357L266 330" />
        </g>

        {/* vertical accent */}
        <line
          x1="184"
          y1="99"
          x2="184"
          y2="487"
          stroke="var(--dnh-accent)"
          strokeOpacity={visible ? "0.5" : "0"}
          className="transition-opacity delay-700 duration-500"
        />

        {/* core marker */}
        <g
          className={`
            wealth-structure-core

            transition-[opacity,transform]
            delay-700
            duration-400
            ease-[cubic-bezier(.22,1,.36,1)]

            ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
          style={{
            transformOrigin: "184px 305px",
          }}
        >
          <rect
            x="176"
            y="297"
            width="16"
            height="16"
            fill="var(--dnh-accent)"
          />

          <rect
            x="170"
            y="291"
            width="28"
            height="28"
            stroke="var(--dnh-accent)"
            strokeOpacity="0.4"
          />
        </g>

        {/* guide lines */}
        <g stroke="var(--dnh-primary)" strokeOpacity="0.07">
          <path d="M184 40V560" />
          <path d="M310 50V550" />
          <path d="M430 55V545" />
          <path d="M550 60V540" />

          <path d="M40 305H710" />
        </g>
          </svg>

      {/* ============================================================
          BOTTOM STEPS
      ============================================================ */}

          <div
            className="
              absolute
              inset-x-8
              bottom-5
              z-20

              hidden
              grid-cols-[1fr_1fr_1fr]
              items-end
              gap-10

              lg:grid
            "
          >
            {STRUCTURE_STEPS.map((step) => (
              <VisualStep
                key={step.title}
                title={step.title}
                description={step.description}
                active={step.active}
              />
            ))}
          </div>
        </div>

        <MobileTransitionLegend />
      </div>
    </div>
  );
}

function MobileTransitionLegend() {
  return (
    <div
      dir="rtl"
      className="
        relative
        z-20

        border-t
        border-line

        bg-page/[0.94]

        lg:hidden
      "
    >
      <div
        className="
          grid
          grid-cols-3

          divide-x
          divide-x-reverse
          divide-line
        "
      >
        {STRUCTURE_STEPS.map((step, index) => (
          <div
            key={step.title}
            className={`
              relative
              min-h-[46px]

              border-t-2

              px-2.5
              py-2.5

              text-right

              ${
                step.active
                  ? "border-t-brand-accent bg-brand-accent/[0.07]"
                  : "border-t-transparent bg-page"
              }
            `}
          >
            <span
              dir="ltr"
              className={`
                block
                text-[8px]
                font-black
                leading-none

                ${step.active ? "text-brand-accent" : "text-ink-muted"}
              `}
            >
              0{index + 1}
            </span>

            <p className="mt-1.5 text-[8.5px] font-black leading-4 text-ink">
              {step.title}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
          flex
          flex-wrap
          justify-start
          gap-1

          border-t
          border-line

          px-2
          py-2
        "
      >
        {STRUCTURE_LABELS.map((item) => (
          <span
            key={item.label}
            className="
              inline-flex
              min-h-6
              items-center
              gap-1.5

              border
              border-line

              bg-surface-soft

              px-2

              text-[8px]
              font-extrabold
              leading-none
              text-ink
            "
          >
            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                border
                border-line-strong
              "
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function VisualStep({
  title,
  description,
  active = false,
}: {
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className="
        group/step
        max-w-[180px]

        rounded-sm
        bg-page/[0.82]

        px-3
        py-2

        shadow-[0_10px_26px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[2px]
      "
    >
      <span
        aria-hidden="true"
        className={`
          mb-2.5
          block
          h-px
          w-12

          transition-[width,background-color]
          duration-300

          group-hover/step:w-16

          ${active ? "bg-brand-accent" : "bg-brand-primary/45"}
        `}
      />

      <p className="text-[11px] font-black leading-5 text-ink">{title}</p>

      <p className="mt-1.5 text-[9.5px] font-medium leading-5 text-ink-muted">
        {description}
      </p>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              105deg,
              color-mix(in srgb, var(--dnh-primary) 3%, white) 0%,
              #ffffff 45%,
              #ffffff 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.28]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 4%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--dnh-primary) 3%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "82px 82px",
          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.55) 56%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.55) 56%, transparent 100%)",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-primary/30
          to-transparent
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[4%]
          top-8

          hidden

          items-center
          gap-3

          lg:flex
        "
      >
        <span className="h-px w-8 bg-brand-accent" />

        <span
          dir="ltr"
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.28em]
            text-brand-primary/35
          "
        >
          Section 02
        </span>
      </span>
    </>
  );
}

/* =============================================================================
   MOTION
============================================================================= */

function MotionStyles() {
  return (
    <style>{`
      .wealth-intro-reveal {
        opacity: 0;
        transform: translate3d(0, 12px, 0);

        transition:
          opacity 620ms cubic-bezier(.22, 1, .36, 1),
          transform 620ms cubic-bezier(.22, 1, .36, 1);
      }

      .group\\/wealth-intro[data-visible="true"] .wealth-intro-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .wealth-delay-1 {
        transition-delay: 50ms;
      }

      .wealth-delay-2 {
        transition-delay: 120ms;
      }

      .wealth-delay-3 {
        transition-delay: 190ms;
      }

      .wealth-delay-4 {
        transition-delay: 260ms;
      }

      .wealth-delay-5 {
        transition-delay: 330ms;
      }

      @media (hover: hover) and (pointer: fine) {
        .group\\/wealth-visual:hover .wealth-fragment {
          opacity: .42;
        }

        .group\\/wealth-visual:hover .wealth-final-structure {
          transform: translate3d(-2px, -2px, 0);
        }

        .group\\/wealth-visual:hover .wealth-connection-lines {
          opacity: .72;
        }

        .group\\/wealth-visual:hover .wealth-structure-core {
          transform: scale(1.08);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .wealth-intro-reveal,
        .wealth-fragment,
        .wealth-final-structure,
        .wealth-connection-lines,
        .wealth-structure-core {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
