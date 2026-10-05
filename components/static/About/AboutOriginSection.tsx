"use client";

import { useEffect, useRef, useState } from "react";

const PRINCIPLES = [
  { label: "دارایی", y: 94 },
  { label: "ریسک", y: 178 },
  { label: "سناریو", y: 270 },
  { label: "زمان", y: 344 },
];

export function AboutOriginSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

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

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-story"
      dir="rtl"
      aria-labelledby="about-origin-title"
      data-visible={visible}
      className="
        group/origin
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      <Background />

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

          lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)]
          lg:items-center
          lg:gap-16
          lg:px-12
          lg:py-24

          xl:gap-20
          xl:px-16

          2xl:px-20
        "
      >
        {/* ======================================================
            CONTENT — RIGHT
        ====================================================== */}
        <div
          className="
            order-1
            text-right

            lg:col-start-1
            lg:row-start-1
          "
        >
          <div
            className="
              origin-reveal
              origin-delay-1

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
              چرا DNH؟
            </span>
          </div>

          <h2
            id="about-origin-title"
            className="
              origin-reveal
              origin-delay-2

              max-w-[650px]

              text-[31px]
              font-black
              leading-[1.65]
              tracking-[-0.04em]

              text-ink

              sm:text-[39px]

              lg:text-[44px]

              xl:text-[48px]
            "
          >
            وقتی تصمیم‌ها به هم مرتبط‌اند،
            <br />
            نگاه به آن‌ها هم باید
            <br />
            <span className="text-brand-primary">یکپارچه باشد.</span>
          </h2>

          <p
            className="
              origin-reveal
              origin-delay-3

              mt-6
              max-w-[620px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-ink-muted

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            DNH از این باور شکل گرفت که تصمیم‌های مالی مهم، به‌صورت جدا از هم
            دیده نمی‌شوند. دارایی، ریسک، زمان، سناریو و ساختار مالی در کنار
            یکدیگر قرار می‌گیرند و تنها با یک نگاه ساختاریافته می‌توان تصویر
            کامل‌تر و منسجم‌تری از تصمیم داشت.
          </p>

          {/* Statement */}
          <div
            className="
              origin-reveal
              origin-delay-4

              relative

              mt-8
              border-t
              border-line
              pt-6

              sm:mt-9
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                right-0
                top-[-1px]

                h-[2px]
                w-10

                bg-brand-accent
              "
            />

            <p
              className="
                max-w-[600px]

                text-[18px]
                font-black
                leading-[1.95]
                tracking-[-0.025em]

                text-ink

                sm:text-[20px]

                lg:text-[22px]
              "
            >
              مسئله فقط انتخاب بهتر نیست؛
              <br />
              <span className="text-brand-primary">
                دیدن ارتباط میان انتخاب‌هاست.
              </span>
            </p>
          </div>
        </div>

        {/* ======================================================
            VISUAL — LEFT
        ====================================================== */}
        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <DecisionArchitecture visible={visible} />
        </div>
      </div>
    </section>
  );
}

/* ========================================================================
   ARCHITECTURAL VISUAL
======================================================================== */

function DecisionArchitecture({ visible }: { visible: boolean }) {
  return (
    <div
      className="
        relative
        mx-auto

        aspect-[1.18/1]
        w-full
        max-w-[650px]

        overflow-hidden

        border
        border-line

        bg-[linear-gradient(135deg,#ffffff_0%,color-mix(in_srgb,var(--dnh-primary)_4%,white)_100%)]

        lg:border-0
        lg:bg-transparent
      "
    >
      {/* mobile title */}
      <div
        className="
          absolute
          left-5
          top-5
          z-20

          flex
          items-center
          gap-3

          lg:left-1
          lg:top-2
        "
      >
        <span className="h-2 w-2 bg-brand-accent" />

        <span
          className="
            text-[8px]
            font-bold
            tracking-[0.1em]
            text-brand-primary/50
          "
        >
          از پراکندگی به ساختار
        </span>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 660 520"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="plane-soft" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.025"
            />
            <stop
              offset="100%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.12"
            />
          </linearGradient>

          <linearGradient id="plane-strong" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.11"
            />
            <stop
              offset="100%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.42"
            />
          </linearGradient>

          <pattern
            id="origin-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              stroke="var(--dnh-primary)"
              strokeOpacity="0.045"
            />
          </pattern>
        </defs>

        <rect width="660" height="520" fill="url(#origin-grid)" />

        {/* horizontal system axis */}
        <line
          x1="66"
          y1="260"
          x2="610"
          y2="260"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.2"
        />

        {/* Vertical structure */}
        {[110, 184, 258, 332, 406, 480, 554].map((x) => (
          <line
            key={x}
            x1={x}
            y1="56"
            x2={x}
            y2="452"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.09"
          />
        ))}

        {/* scattered planes */}
        <g
          className={`
            transition-[opacity,transform]
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="110,150 176,174 176,338 110,358"
            fill="url(#plane-soft)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.12"
          />

          <polygon
            points="176,104 248,142 248,372 176,338"
            fill="var(--dnh-primary)"
            fillOpacity="0.07"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.14"
          />
        </g>

        {/* middle planes */}
        <g
          className={`
            transition-[opacity,transform]
            duration-700
            delay-100
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="248,74 330,124 330,398 248,372"
            fill="url(#plane-soft)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.16"
          />

          <polygon
            points="330,146 384,181 384,346 330,398"
            fill="url(#plane-strong)"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.28"
          />
        </g>

        {/* structured destination */}
        <g
          className={`
            transition-[opacity,transform]
            duration-700
            delay-200
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }
          `}
        >
          <polygon
            points="384,96 468,164 468,340 384,346"
            fill="var(--dnh-primary)"
            fillOpacity="0.06"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.32"
          />

          <polygon
            points="468,157 532,198 532,306 468,340"
            fill="var(--dnh-primary)"
            fillOpacity="0.035"
            stroke="var(--dnh-primary)"
            strokeOpacity="0.16"
          />
        </g>

        {/* orange decision point */}
        <rect
          x="324"
          y="254"
          width="12"
          height="12"
          fill="var(--dnh-accent)"
          className={`
            origin-center
            transition-[opacity,transform]
            duration-500
            delay-500

            ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
        />

        {/* structural lines */}
        <path
          d="M64 116L330 260L610 176"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.12"
        />

        <path
          d="M64 406L330 260L610 352"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.12"
        />

        <line
          x1="330"
          y1="68"
          x2="330"
          y2="450"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.18"
        />
      </svg>

      {/* labels */}
      <div
        className="
          absolute
          inset-y-0
          left-0
          z-10
          hidden
          w-[92px]

          lg:block
        "
      >
        {PRINCIPLES.map((item, index) => (
          <div
            key={item.label}
            className={`
              absolute
              left-0

              flex
              items-center
              gap-3

              transition-[opacity,transform]
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-2 opacity-0"
              }
            `}
            style={{
              top: item.y,
              transitionDelay: `${200 + index * 70}ms`,
            }}
          >
            <span
              className="
                text-[10px]
                font-bold
                text-ink-muted
              "
            >
              {item.label}
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-6
                bg-line-strong/35
              "
            />

            <span
              aria-hidden="true"
              className="
                h-2
                w-2
                bg-brand-primary
              "
            />
          </div>
        ))}
      </div>

      {/* bottom label */}
      <div
        className="
          absolute
          bottom-5
          left-1/2
          z-20

          flex
          -translate-x-1/2
          items-center
          gap-3
        "
      >
        <span className="h-px w-8 bg-brand-accent" />

        <span
          className="
            whitespace-nowrap
            text-[9px]
            font-black
            text-brand-primary
          "
        >
          ساختار مالی
        </span>
      </div>
    </div>
  );
}

/* ========================================================================
   BACKGROUND
======================================================================== */

function Background() {
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
              90deg,
              #ffffff 0%,
              color-mix(in srgb, var(--dnh-primary) 2.5%, white) 46%,
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
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 88%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 88%)",
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
    </>
  );
}
