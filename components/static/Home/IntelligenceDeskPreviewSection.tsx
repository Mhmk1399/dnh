"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  Eye,
  Landmark,
  Layers3,
  Waves,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Intelligence domains

   هیچ وضعیت بازار، عدد، پیش‌بینی یا توصیه ساختگی در این Preview وجود ندارد.
   این آیتم‌ها فقط دامنه‌های تحلیلی میز هوشمندی DNH را معرفی می‌کنند.
============================================================================= */

const INTELLIGENCE_ROWS = [
  {
    title: "ریسک‌های کلان",
    en: "MACRO RISK VIEW",
    description:
      "رصد متغیرهای اقتصادی و ریسک‌هایی که می‌توانند محیط تصمیم را تغییر دهند.",
    icon: Landmark,
  },
  {
    title: "نگاه به دارایی‌ها",
    en: "ASSET VIEW",
    description: "بررسی شرایط و نقش دارایی‌ها در نسبت با ساختار کلی تصمیم.",
    icon: BarChart3,
  },
  {
    title: "نقدینگی",
    en: "LIQUIDITY VIEW",
    description:
      "دیدن محدودیت‌ها، نیازها و انعطاف نقدینگی در کنار سایر متغیرها.",
    icon: Waves,
  },
  {
    title: "متغیرهای تحت نظر",
    en: "WHAT TO WATCH",
    description:
      "مشخص‌کردن عواملی که برای ادامه مسیر تصمیم باید زیر نظر بمانند.",
    icon: Eye,
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function IntelligenceDeskPreviewSection() {
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
      id="intelligence-desk-preview"
      dir="rtl"
      aria-labelledby="intelligence-desk-title"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-line
        bg-page
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

          lg:grid-cols-[1.12fr_0.88fr]
          lg:items-center
          lg:gap-16
          lg:py-24

          xl:grid-cols-[1.17fr_0.83fr]
          xl:gap-20
          xl:py-28

        "
      >
        {/* =========================================================
            REPORT PREVIEW — LEFT
        ========================================================== */}

        <div
          className={`
            order-2
            transition-all
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]

            lg:col-start-2
            lg:row-start-1

            ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }
          `}
        >
          <IntelligenceReport visible={visible} />
        </div>

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
                میز هوشمندی DNH
              </span>
            </div>
          </Reveal>

          {/* title */}

          <Reveal visible={visible} delay={100}>
            <h2
              id="intelligence-desk-title"
              className="
                max-w-[650px]

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
              داده برای معامله نیست؛
              <br />
              برای <span className="text-brand-primary">
                دیدن بهتر تصمیم
              </span>{" "}
              است.
            </h2>
          </Reveal>

          {/* body */}

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
              میز هوشمندی DNH اقتصاد، بازار، ریسک، نقدینگی و متغیرهای مؤثر بر
              تصمیم را رصد می‌کند تا اطلاعات پراکنده به یک زمینه قابل‌فهم برای
              تصمیم‌سازی تبدیل شوند.
            </p>
          </Reveal>

          {/* boundary statement */}

          <Reveal visible={visible} delay={240}>
            <div
              className="
                mt-7
                max-w-[590px]

                border-r-2
                border-brand-accent

                pr-5
              "
            >
              <p
                className="
                  text-[12px]
                  font-bold
                  leading-[2]

                  text-ink

                  sm:text-[13px]
                "
              >
                نه پنل معامله.
                <br />
                نه سیگنال خرید و فروش.
                <br />
                <span className="text-brand-primary">
                  یک میز هوشمندی برای تصمیم‌سازی ثروت.
                </span>
              </p>
            </div>
          </Reveal>

          {/* CTA */}

          <Reveal visible={visible} delay={310}>
            <div className="mt-8">
              <ActionButton
                href="/fa/dnh/intelligence-desk"
                variant="primary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full

                  sm:w-auto
                  sm:min-w-[245px]
                "
              >
                ورود به میز هوشمندی DNH
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Intelligence report
============================================================================= */

function IntelligenceReport({ visible }: { visible: boolean }) {
  return (
    <div
      className="
        relative
        w-full
        overflow-hidden

        border
        border-line

        bg-white

        shadow-[0_28px_90px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]
      "
    >
      {/* top accent */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0

          h-[3px]

          bg-[linear-gradient(90deg,var(--dnh-accent)_0_12%,var(--dnh-primary)_12%_100%)]
        "
      />

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
          pb-5
          pt-7

          sm:px-7
          sm:pt-8

          lg:px-8
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2
                w-2
                bg-brand-accent
              "
            />

            <p
              dir="ltr"
              className="
                text-[8px]
                font-black
                tracking-[0.2em]

                text-brand-primary
              "
            >
              DNH INTELLIGENCE DESK
            </p>
          </div>

          <p
            className="
              mt-3

              text-[15px]
              font-black

              text-ink

              sm:text-[17px]
            "
          >
            نمای ساختاری محیط تصمیم
          </p>
        </div>

        <div
          dir="ltr"
          className="
            text-left
          "
        >
          <p
            className="
              text-[8px]
              font-bold
              tracking-[0.16em]

              text-ink-muted
            "
          >
            PRIVATE WEALTH
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-medium

              text-ink-muted/65
            "
          >
            INTELLIGENCE VIEW
          </p>
        </div>
      </div>

      {/* =========================================================
          Rows
      ========================================================== */}

      <div>
        {INTELLIGENCE_ROWS.map((item, index) => (
          <IntelligenceRow
            key={item.en}
            item={item}
            index={index}
            visible={visible}
          />
        ))}
      </div>

      {/* =========================================================
          Strategic implication
      ========================================================== */}

      <div
        className={`
          border-t
          border-line

          bg-surface-soft

          px-5
          py-5

          transition-all
          duration-500

          sm:px-7

          lg:px-8

          ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
        `}
        style={{
          transitionDelay: "520ms",
        }}
      >
        <div
          className="
            grid
            gap-4

            sm:grid-cols-[1fr_auto]
            sm:items-center
          "
        >
          <div>
            <p
              dir="ltr"
              className="
                text-[7px]
                font-black
                tracking-[0.18em]

                text-brand-primary/65
              "
            >
              STRATEGIC IMPLICATION
            </p>

            <p
              className="
                mt-2
                max-w-[560px]

                text-[11px]
                font-bold
                leading-[1.9]

                text-ink
              "
            >
              هدف، تبدیل داده و شرایط محیطی به پیامدهای قابل بررسی برای تصمیم
              است؛ نه تولید پیش‌بینی قطعی.
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              hidden
              h-10
              w-10

              items-center
              justify-center

              border
              border-line-strong

              text-brand-primary

              sm:flex
            "
          >
            <ArrowUpLeft className="h-4 w-4" strokeWidth={1.6} />
          </span>
        </div>
      </div>

      {/* =========================================================
          DNH note
      ========================================================== */}

      <div
        className="
          grid
          gap-4

          border-t
          border-line

          px-5
          py-5

          sm:grid-cols-[auto_1fr]
          sm:items-start
          sm:px-7

          lg:px-8
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center

            bg-brand-primary

            text-white
          "
        >
          <Layers3 className="h-4 w-4" strokeWidth={1.5} />
        </div>

        <div>
          <p
            dir="ltr"
            className="
              text-[7px]
              font-black
              tracking-[0.2em]

              text-brand-accent
            "
          >
            DNH NOTE
          </p>

          <p
            className="
              mt-2

              text-[10px]
              font-medium
              leading-[1.9]

              text-ink-muted
            "
          >
            تحلیل زمانی معنا پیدا می‌کند که در نسبت با مسئله، ساختار و افق تصمیم
            دیده شود.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Row
============================================================================= */

function IntelligenceRow({
  item,
  index,
  visible,
}: {
  item: (typeof INTELLIGENCE_ROWS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/intelligence

        grid
        grid-cols-[40px_1fr]
        gap-4

        border-b
        border-line

        px-5
        py-5

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/60

        sm:grid-cols-[42px_1fr_auto]
        sm:items-center
        sm:px-7

        lg:px-8

        ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      `}
      style={
        {
          transitionDelay: `${180 + index * 70}ms`,
        } as CSSProperties
      }
    >
      {/* icon */}

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          border
          border-line

          text-brand-primary

          transition-colors
          duration-300

          group-hover/intelligence:border-brand-primary
          group-hover/intelligence:bg-brand-primary
          group-hover/intelligence:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>

      {/* text */}

      <div>
        <div
          className="
            flex
            flex-wrap
            items-baseline
            gap-x-3
            gap-y-1
          "
        >
          <h3
            className="
              text-[11px]
              font-black
              text-ink

              sm:text-[12px]
            "
          >
            {item.title}
          </h3>

          <span
            dir="ltr"
            className="
              text-[7px]
              font-bold
              tracking-[0.13em]

              text-brand-primary/55
            "
          >
            {item.en}
          </span>
        </div>

        <p
          className="
            mt-2
            max-w-[520px]

            text-[9px]
            font-medium
            leading-[1.9]

            text-ink-muted

            sm:text-[10px]
          "
        >
          {item.description}
        </p>
      </div>

      {/* status geometry */}

      <div
        aria-hidden="true"
        className="
          col-span-2
          flex
          items-center
          gap-1.5

          sm:col-span-1
        "
      >
        <span className="h-px w-5 bg-brand-primary/15" />
        <span className="h-1.5 w-1.5 bg-brand-primary/25" />
        <span className="h-1.5 w-1.5 bg-brand-primary/45" />

        <span
          className="
            h-1.5
            w-1.5

            bg-brand-accent
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   Reveal wrapper
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
              110deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                white
              ) 0%,
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
          backgroundSize: "110px 100%",
          maskImage: "linear-gradient(to right, black, transparent 82%)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent 82%)",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[18%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
