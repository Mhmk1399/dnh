"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  ArrowLeft,
  Clock3,
  Landmark,
  Layers3,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Whole wealth dimensions

   این‌ها Step نیستند؛ ابعاد هم‌زمان یک تصویر کل‌نگر از ثروت‌اند.
============================================================================= */

const WEALTH_DIMENSIONS = [
  {
    title: "دارایی‌ها",
    en: "ASSETS",
    description:
      "دیدن دارایی‌ها در نسبت با کل ساختار، نه به‌صورت جزیره‌های جدا.",
    icon: Layers3,
  },
  {
    title: "نقدینگی",
    en: "LIQUIDITY",
    description: "شناخت نیاز، محدودیت و انعطاف نقدینگی در مسیر تصمیم.",
    icon: WalletCards,
  },
  {
    title: "ریسک",
    en: "RISK",
    description:
      "بررسی ریسک‌هایی که می‌توانند تعادل ساختار ثروت را تغییر دهند.",
    icon: ShieldCheck,
  },
  {
    title: "افق زمانی",
    en: "HORIZON",
    description: "قرار دادن تصمیم امروز در نسبت با نیازها و اهداف آینده.",
    icon: Clock3,
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function WholeWealthViewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="whole-wealth-view"
      dir="rtl"
      aria-labelledby="whole-wealth-view-title"
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-line

        bg-surface-soft
      "
    >
      <Background />

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
            CONTENT
        ========================================================== */}

        <div
          className="
            order-1
            text-right

            lg:col-start-1
            lg:row-start-1
          "
        >
          <Reveal visible={visible} delay={40}>
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
                  font-black
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                نگاه یکپارچه به ثروت
              </span>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={100}>
            <h2
              id="whole-wealth-view-title"
              className="
                max-w-[660px]

                text-[31px]
                font-black
                leading-[1.62]
                tracking-[-0.045em]

                text-ink

                sm:text-[38px]

                lg:text-[44px]
                lg:leading-[1.55]

                xl:text-[49px]
              "
            >
              داشتن دارایی‌های بیشتر،
              <br />
              لزوماً به معنی داشتن
              <br />
              <span className="text-brand-primary">ساختار بهتر نیست.</span>
            </h2>
          </Reveal>

          <Reveal visible={visible} delay={170}>
            <p
              className="
                mt-6
                max-w-[610px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              در نگاه DNH، هر دارایی فقط زمانی معنا پیدا می‌کند که نقش آن در
              کنار نقدینگی، ریسک، افق زمانی و کل ساختار ثروت دیده شود. هدف،
              ساختن یک تصویر منسجم برای تصمیم است؛ نه صرفاً جمع‌کردن دارایی‌های
              بیشتر.
            </p>
          </Reveal>

          <Reveal visible={visible} delay={240}>
            <div
              className="
                mt-8
                max-w-[570px]

                border-r-2
                border-brand-accent

                pr-5
              "
            >
              <p
                className="
                  text-[13px]
                  font-black
                  leading-[2]

                  text-ink

                  sm:text-[14px]
                "
              >
                مسئله فقط «چه دارایی‌ای داریم؟» نیست؛
                <br />
                <span className="text-brand-primary">
                  مسئله این است که هر بخش چه نقشی در کل ساختار دارد.
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={310}>
            <div className="mt-8">
              <ActionButton
                href="/dnh/wealth-architecture"
                variant="secondary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full

                  border-line-strong
                  bg-page/75
                  text-ink

                  shadow-none

                  hover:bg-page
                  hover:text-brand-primary

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                مشاهده معماری ثروت
              </ActionButton>
            </div>
          </Reveal>
        </div>

        {/* =========================================================
            VISUAL
        ========================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <WholeWealthMap visible={visible} />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Whole wealth map
============================================================================= */

function WholeWealthMap({ visible }: { visible: boolean }) {
  return (
    <div
      className={`
        relative
        mx-auto

        w-full
        max-w-[820px]

        overflow-hidden

        border
        border-line

        bg-page/85

        shadow-[0_30px_90px_color-mix(in_srgb,var(--dnh-primary)_9%,transparent)]

        transition-all
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}
      `}
    >
      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-5

          border-b
          border-line

          px-5
          py-6

          sm:px-7

          lg:px-8
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[11px]
              font-black
              tracking-[0.2em]

              text-brand-primary/65
            "
          >
            WHOLE WEALTH VIEW
          </p>

          <p
            className="
              mt-2

              text-[14px]
              font-black

              text-ink

              sm:text-[16px]
            "
          >
            نقشه ساختار ثروت
          </p>
        </div>

        <span
          aria-hidden="true"
          className="
            mt-1
            h-[11px]
            w-[11px]

            bg-brand-accent
          "
        />
      </div>

      {/* =========================================================
          Desktop architecture
      ========================================================== */}

      <div
        className="
          relative
          hidden

          min-h-[520px]

          md:block
        "
      >
        {/* horizontal axis */}

        <span
          aria-hidden="true"
          className="
            absolute
            left-[11%]
            right-[11%]
            top-1/2

            h-px

            -translate-y-1/2

            bg-brand-primary/18
          "
        />

        {/* vertical axis */}

        <span
          aria-hidden="true"
          className="
            absolute
            bottom-[12%]
            left-1/2
            top-[12%]

            w-px

            -translate-x-1/2

            bg-brand-primary/18
          "
        />

        {/* center */}

        <div
          className={`
            absolute
            left-1/2
            top-1/2

            z-20

            flex
            h-[138px]
            w-[138px]

            -translate-x-1/2
            -translate-y-1/2

            items-center
            justify-center

            border
            border-brand-primary/35

            bg-page

            shadow-[0_0_0_14px_color-mix(in_srgb,var(--dnh-primary)_4%,transparent)]

            transition-all
            duration-500

            ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
          style={{
            transitionDelay: "260ms",
          }}
        >
          <div className="text-center">
            <Landmark
              aria-hidden="true"
              className="
                mx-auto
                h-5
                w-5

                text-brand-primary
              "
              strokeWidth={1.5}
            />

            <p
              className="
                mt-3

                text-[14px]
                font-black

                text-ink
              "
            >
              تصمیم
            </p>

            <p
              dir="ltr"
              className="
                mt-1

                text-[11px]
                font-bold
                tracking-[0.16em]

                text-brand-primary/50
              "
            >
              DECISION CONTEXT
            </p>
          </div>
        </div>

        {/* dimensions */}

        {WEALTH_DIMENSIONS.map((item, index) => (
          <Dimension
            key={item.en}
            item={item}
            index={index}
            visible={visible}
          />
        ))}

        {/* supporting label */}

        <div
          className="
            absolute
            bottom-7
            left-1/2

            -translate-x-1/2

            text-center
          "
        >
          <p
            className="
              text-[11px]
              font-medium

              text-ink-muted
            "
          >
            هر جزء، در نسبت با کل ساختار معنا پیدا می‌کند.
          </p>
        </div>
      </div>

      {/* =========================================================
          Mobile architecture
      ========================================================== */}

      <div
        className="
          md:hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-center

            border-b
            border-line

            px-5
            py-8
          "
        >
          <div
            className="
              flex
              h-[110px]
              w-[110px]

              items-center
              justify-center

              border
              border-brand-primary/30

              bg-page
            "
          >
            <div className="text-center">
              <Landmark
                aria-hidden="true"
                className="
                  mx-auto
                  h-4
                  w-4

                  text-brand-primary
                "
                strokeWidth={1.5}
              />

              <p
                className="
                  mt-2

                  text-[12px]
                  font-black

                  text-ink
                "
              >
                تصمیم
              </p>

              <p
                dir="ltr"
                className="
                  mt-1

                  text-[6px]
                  font-bold
                  tracking-[0.14em]

                  text-brand-primary/50
                "
              >
                DECISION CONTEXT
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-2
          "
        >
          {WEALTH_DIMENSIONS.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.en}
                className={`
                  min-h-[150px]

                  px-4
                  py-5

                  ${index % 2 === 0 ? "border-l border-line" : ""}

                  ${index < 2 ? "border-b border-line" : ""}
                `}
              >
                <Icon
                  aria-hidden="true"
                  className="
                    h-4
                    w-4

                    text-brand-primary
                  "
                  strokeWidth={1.5}
                />

                <h3
                  className="
                    mt-3

                    text-[11px]
                    font-black

                    text-ink
                  "
                >
                  {item.title}
                </h3>

                <p
                  dir="ltr"
                  className="
                    mt-1

                    text-right
                    text-[6px]
                    font-bold
                    tracking-[0.14em]

                    text-brand-primary/50
                  "
                >
                  {item.en}
                </p>

                <p
                  className="
                    mt-3

                    text-[11px]
                    font-medium
                    leading-[1.9]

                    text-ink-muted
                  "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
 
    </div>
  );
}

/* =============================================================================
   Dimension
============================================================================= */

function Dimension({
  item,
  index,
  visible,
}: {
  item: (typeof WEALTH_DIMENSIONS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  const positions = [
    "right-[7%] top-[12%]",
    "left-[7%] top-[12%]",
    "right-[7%] bottom-[14%]",
    "left-[7%] bottom-[14%]",
  ];

  return (
    <div
      className={`
        absolute
        z-10

        w-[220px]

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        ${positions[index]}

        ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      `}
      style={
        {
          transitionDelay: `${340 + index * 75}ms`,
        } as CSSProperties
      }
    >
      <div
        className="
          group/dimension

          border
          border-line

          bg-page/92

          px-4
          py-4

          transition-[border-color,transform,background-color]
          duration-300

          hover:-translate-y-0.5
          hover:border-brand-primary/40
          hover:bg-page
        "
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
              h-9
              w-9
              shrink-0

              items-center
              justify-center

              border
              border-line

              text-brand-primary

              transition-colors
              duration-300

              group-hover/dimension:border-brand-primary
              group-hover/dimension:bg-brand-primary
              group-hover/dimension:text-white
            "
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </span>

          <div>
            <h3
              className="
                text-[11px]
                font-black

                text-ink
              "
            >
              {item.title}
            </h3>

            <p
              dir="ltr"
              className="
                mt-1

                text-right
                text-[6px]
                font-bold
                tracking-[0.14em]

                text-brand-primary/50
              "
            >
              {item.en}
            </p>
          </div>
        </div>

        <p
          className="
            mt-3

            text-[11px]
            font-medium
            leading-[1.9]

            text-ink-muted
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Reveal
============================================================================= */

function Reveal({
  children,
  visible,
  delay,
}: {
  children: React.ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-all
        duration-[600ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   Background
============================================================================= */

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
              115deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 7%,
                white
              ) 0%,
              white 52%,
              white 100%
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

          opacity-[0.2]
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
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in srgb,
                var(--dnh-primary) 3%,
                transparent
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "96px 96px",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[16%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
