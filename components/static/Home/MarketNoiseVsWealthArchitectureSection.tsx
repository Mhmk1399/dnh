"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Content

   Noise = چیزهایی که ممکن است توجه را بگیرند اما به‌تنهایی برای تصمیم کافی نیستند.
   Structure = متغیرهایی که DNH در یک نگاه منسجم‌تر کنار هم می‌بیند.
============================================================================= */

const NOISE_ITEMS = [
  "خبر روز",
  "نوسان قیمت",
  "پیش‌بینی",
  "هیجان بازار",
  "واکنش سریع",
] as const;

const STRUCTURE_ITEMS = [
  {
    title: "ساختار مالی",
    description: "دیدن اجزای مالی در ارتباط با یکدیگر.",
  },
  {
    title: "ریسک",
    description: "شناخت ریسک‌هایی که بر تصمیم اثر می‌گذارند.",
  },
  {
    title: "نقدینگی",
    description: "درنظرگرفتن محدودیت و انعطاف جریان مالی.",
  },
  {
    title: "سناریو",
    description: "بررسی چند مسیر ممکن، نه تکیه بر یک پیش‌بینی.",
  },
  {
    title: "افق زمانی",
    description: "دیدن تصمیم امروز در نسبت با آینده.",
  },
  {
    title: "تصمیم",
    description: "جمع‌کردن تصویر برای انتخابی منسجم‌تر.",
  },
] as const;

/* =============================================================================
   Component
============================================================================= */

export function MarketNoiseVsWealthArchitectureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

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
      id="market-noise"
      dir="rtl"
      aria-labelledby="market-noise-title"
      data-visible={visible}
      className="
        market-noise-section
        relative
        isolate
        overflow-hidden
        border-b
        border-line
        bg-surface-soft
      "
    >
      <SectionBackground />

      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          grid
          w-full
          max-w-[1536px]

          gap-12

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:grid-cols-[0.86fr_1.14fr]
          lg:items-center
          lg:gap-16
          lg:px-12
          lg:py-24

          xl:grid-cols-[0.82fr_1.18fr]
          xl:gap-20
          xl:px-16
          xl:py-28

          2xl:px-20
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
              noise-reveal
              noise-reveal-1

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
              از هیجان بازار تا ساختار تصمیم
            </span>
          </div>

          {/* heading */}

          <h2
            id="market-noise-title"
            className="
              noise-reveal
              noise-reveal-2

              max-w-[650px]

              text-[31px]
              font-black
              leading-[1.62]
              tracking-[-0.045em]

              text-ink

              sm:text-[38px]

              lg:text-[44px]
              lg:leading-[1.55]

              xl:text-[48px]
            "
          >
            بازار مهم است؛
            <br />
            اما تصمیم مالی
            <br />
            <span className="text-brand-primary">فقط بازار نیست.</span>
          </h2>

          {/* description */}

          <p
            className="
              noise-reveal
              noise-reveal-3

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
            خبر، نوسان و تحلیل بازار بخشی از محیط تصمیم‌اند؛ اما در نگاه DNH،
            این عوامل در کنار ساختار مالی، ریسک، نقدینگی، سناریوها و افق زمانی
            دیده می‌شوند تا تصمیم فقط واکنشی به اتفاق امروز نباشد.
          </p>

          {/* statement */}

          <div
            className="
              noise-reveal
              noise-reveal-4

              mt-8
              max-w-[570px]

              border-r-2
              border-brand-accent

              pr-5

              sm:pr-6
            "
          >
            <p
              className="
                text-[15px]
                font-black
                leading-[2]

                text-ink

                sm:text-[17px]

                lg:text-[18px]
              "
            >
              بازار یک ورودی است؛
              <br />
              <span className="text-brand-primary">
                ساختار، زمینه تصمیم است.
              </span>
            </p>
          </div>

          {/* CTA */}

          <div
            className="
              noise-reveal
              noise-reveal-5

              mt-8
            "
          >
            <ActionButton
              href="/fa/dnh/wealth-architecture"
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
                sm:min-w-[230px]
              "
            >
              آشنایی با معماری ثروت
            </ActionButton>
          </div>
        </div>

        {/* =========================================================
            VISUAL — LEFT
        ========================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <DecisionField />
        </div>
      </div>

      <MotionStyles />
    </section>
  );
}

/* =============================================================================
   Decision Field
============================================================================= */

function DecisionField() {
  return (
    <div
      aria-hidden="true"
      className="
        decision-field
        group/decision

        relative
        mx-auto

        min-h-[510px]
        w-full
        max-w-[820px]

        overflow-hidden

        border
        border-line

        bg-page/65

        sm:min-h-[560px]

        lg:min-h-[610px]
      "
    >
      {/* =========================================================
          subtle structural background
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.55]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                transparent
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* =========================================================
          diagonal horizon
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-[-12%]
          top-[48%]

          h-px

          -rotate-[6deg]

          bg-gradient-to-r
          from-transparent
          via-brand-primary/18
          to-transparent
        "
      />

      {/* =========================================================
          DESKTOP
      ========================================================== */}

      <div
        className="
          relative
          z-10

          hidden
          h-full

          md:grid
          md:grid-cols-[0.82fr_80px_1.18fr]
        "
      >
        {/* =======================================================
            NOISE SIDE
        ======================================================== */}

        <div
          className="
            relative
            min-h-[560px]

            overflow-hidden

            border-l
            border-line/80

            px-7
            py-8

            lg:min-h-[610px]
            lg:px-9
          "
        >
          <div
            className="
              mb-10
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-black
                  text-ink
                "
              >
                صدای بازار
              </p>

              <p
                dir="ltr"
                className="
                  mt-1

                  text-[7px]
                  font-bold
                  tracking-[0.2em]

                  text-ink-muted/65
                "
              >
                MARKET NOISE
              </p>
            </div>

            <span
              className="
                h-[5px]
                w-[5px]

                bg-brand-accent
              "
            />
          </div>

          <div
            className="
              relative
              min-h-[410px]
            "
          >
            {NOISE_ITEMS.map((item, index) => (
              <NoiseItem key={item} label={item} index={index} />
            ))}
          </div>

          <p
            className="
              absolute
              bottom-7
              right-7

              max-w-[210px]

              text-[9px]
              font-medium
              leading-[1.9]

              text-ink-muted/65

              lg:right-9
            "
          >
            این اطلاعات می‌توانند مهم باشند؛ اما به‌تنهایی تصویر کامل تصمیم را
            نمی‌سازند.
          </p>
        </div>

        {/* =======================================================
            TRANSITION AXIS
        ======================================================== */}

        <div
          className="
            relative
            flex
            min-h-[560px]
            items-center
            justify-center

            lg:min-h-[610px]
          "
        >
          <div
            className="
              absolute
              inset-y-12
              left-1/2

              w-px

              -translate-x-1/2

              bg-gradient-to-b
              from-transparent
              via-brand-primary/20
              to-transparent
            "
          />

          <span
            className="
              decision-marker

              relative
              z-10

              flex
              h-[28px]
              w-[28px]

              items-center
              justify-center

              border
              border-brand-accent

              bg-page

              shadow-[0_0_0_7px_color-mix(in_srgb,var(--dnh-accent)_7%,transparent)]
            "
          >
            <span
              className="
                h-[8px]
                w-[8px]
                bg-brand-accent
              "
            />
          </span>

          <span
            dir="ltr"
            className="
              absolute
              left-1/2
              top-[55%]

              -translate-x-1/2

              whitespace-nowrap

              rotate-90

              text-[7px]
              font-bold
              tracking-[0.22em]

              text-brand-primary/45
            "
          >
            FROM NOISE TO STRUCTURE
          </span>
        </div>

        {/* =======================================================
            STRUCTURE SIDE
        ======================================================== */}

        <div
          className="
            relative

            min-h-[560px]

            px-7
            py-8

            lg:min-h-[610px]
            lg:px-9
          "
        >
          <div
            className="
              mb-8
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-black
                  text-brand-primary
                "
              >
                زمینه تصمیم
              </p>

              <p
                dir="ltr"
                className="
                  mt-1

                  text-[7px]
                  font-bold
                  tracking-[0.2em]

                  text-brand-primary/45
                "
              >
                WEALTH ARCHITECTURE
              </p>
            </div>

            <span
              className="
                h-px
                w-16

                bg-brand-primary/25
              "
            />
          </div>

          <div
            className="
              structure-list
              divide-y
              divide-line
              border-y
              border-line
            "
          >
            {STRUCTURE_ITEMS.map((item, index) => (
              <StructureItem key={item.title} {...item} index={index} />
            ))}
          </div>

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]

                bg-brand-accent
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                leading-6

                text-ink
              "
            >
              اطلاعات پراکنده، وقتی معنا پیدا می‌کنند که در یک ساختار کنار هم
              دیده شوند.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE
      ========================================================== */}

      <div
        className="
          relative
          z-10

          md:hidden
        "
      >
        {/* noise */}

        <div
          className="
            border-b
            border-line

            px-5
            py-6
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-black
                  text-ink
                "
              >
                صدای بازار
              </p>

              <p
                dir="ltr"
                className="
                  mt-1
                  text-[7px]
                  font-bold
                  tracking-[0.16em]
                  text-ink-muted/60
                "
              >
                MARKET NOISE
              </p>
            </div>

            <span className="h-2 w-2 bg-brand-accent" />
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {NOISE_ITEMS.map((item) => (
              <span
                key={item}
                className="
                  border
                  border-line

                  bg-page/55

                  px-3
                  py-2

                  text-[9px]
                  font-medium

                  text-ink-muted
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* axis */}

        <div
          className="
            relative
            flex
            h-[74px]

            items-center
            justify-center
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              left-1/2

              w-px

              -translate-x-1/2

              bg-brand-primary/15
            "
          />

          <span
            className="
              decision-marker

              relative
              z-10

              flex
              h-6
              w-6

              items-center
              justify-center

              border
              border-brand-accent

              bg-page
            "
          >
            <span
              className="
                h-[7px]
                w-[7px]
                bg-brand-accent
              "
            />
          </span>
        </div>

        {/* structure */}

        <div
          className="
            border-t
            border-line

            px-5
            pb-6
            pt-5
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-black
                  text-brand-primary
                "
              >
                زمینه تصمیم
              </p>

              <p
                dir="ltr"
                className="
                  mt-1
                  text-[7px]
                  font-bold
                  tracking-[0.16em]
                  text-brand-primary/50
                "
              >
                WEALTH ARCHITECTURE
              </p>
            </div>

            <span
              className="
                h-px
                w-10

                bg-brand-primary/25
              "
            />
          </div>

          <div
            className="
              grid
              grid-cols-2

              border
              border-line
            "
          >
            {STRUCTURE_ITEMS.map((item, index) => (
              <div
                key={item.title}
                className={`
                  structure-mobile-item

                  min-h-[94px]

                  px-3
                  py-4

                  ${index % 2 === 0 ? "border-l border-line" : ""}

                  ${index < 4 ? "border-b border-line" : ""}
                `}
              >
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-[6px]
                      w-[6px]

                      bg-brand-primary
                    "
                  />

                  <h3
                    className="
                      text-[10px]
                      font-black
                      text-ink
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className="
                    text-[8px]
                    font-medium
                    leading-[1.8]

                    text-ink-muted
                  "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Noise item
============================================================================= */

function NoiseItem({ label, index }: { label: string; index: number }) {
  const positions = [
    "right-[5%] top-[7%]",
    "left-[8%] top-[23%]",
    "right-[14%] top-[40%]",
    "left-[3%] top-[57%]",
    "right-[25%] top-[72%]",
  ];

  const sizes = [
    "text-[15px]",
    "text-[12px]",
    "text-[18px]",
    "text-[11px]",
    "text-[14px]",
  ];

  return (
    <div
      className={`
        noise-fragment
        absolute

        ${positions[index]}
      `}
      style={{
        transitionDelay: `${260 + index * 75}ms`,
      }}
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className="
            h-px
            w-5

            bg-ink-muted/20
          "
        />

        <span
          className={`
            font-black
            tracking-[-0.02em]

            text-ink-muted/45

            transition-[color,opacity,transform]
            duration-300

            group-hover/decision:text-ink-muted/25

            ${sizes[index]}
          `}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   Structure item
============================================================================= */

function StructureItem({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="
        structure-item
        group/structure-item

        grid
        grid-cols-[18px_1fr]
        gap-3

        py-4

        transition-[background-color,padding]
        duration-300

        hover:bg-brand-primary/[0.035]
        hover:px-2
      "
      style={{
        transitionDelay: `${460 + index * 65}ms`,
      }}
    >
      <div
        className="
          pt-[7px]
        "
      >
        <span
          aria-hidden="true"
          className="
            block
            h-[7px]
            w-[7px]

            border
            border-brand-primary/65

            bg-page

            transition-[background-color,border-color,box-shadow]
            duration-300

            group-hover/structure-item:border-brand-accent
            group-hover/structure-item:bg-brand-accent
            group-hover/structure-item:shadow-[0_0_0_4px_color-mix(in_srgb,var(--dnh-accent)_8%,transparent)]
          "
        />
      </div>

      <div>
        <h3
          className="
            text-[11px]
            font-black
            leading-6

            text-ink

            lg:text-[12px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1

            text-[9px]
            font-medium
            leading-[1.8]

            text-ink-muted

            lg:text-[10px]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Background
============================================================================= */

function SectionBackground() {
  return (
    <>
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
              110deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 6%,
                white
              ) 0%,
              white 46%,
              white 100%
            )
          `,
        }}
      />

      {/* architectural guide lines */}

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
                var(--dnh-primary) 5%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                transparent
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "88px 88px",
          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.55) 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.55) 72%, transparent 100%)",
        }}
      />

      {/* top accent */}

      <span
        aria-hidden="true"
        className="
          absolute
          right-[12%]
          top-0
          z-[1]

          h-[5px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   Motion
============================================================================= */

function MotionStyles() {
  return (
    <style>{`
      /* ==========================================================
         Content
      =========================================================== */

      .noise-reveal {
        opacity: 0;
        transform: translate3d(0, 10px, 0);

        transition:
          opacity 580ms cubic-bezier(.22, 1, .36, 1),
          transform 580ms cubic-bezier(.22, 1, .36, 1);
      }

      .market-noise-section[data-visible="true"]
      .noise-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .noise-reveal-1 {
        transition-delay: 40ms;
      }

      .noise-reveal-2 {
        transition-delay: 110ms;
      }

      .noise-reveal-3 {
        transition-delay: 190ms;
      }

      .noise-reveal-4 {
        transition-delay: 270ms;
      }

      .noise-reveal-5 {
        transition-delay: 350ms;
      }

      /* ==========================================================
         Decision field
      =========================================================== */

      .decision-field {
        opacity: 0;
        transform: translate3d(-10px, 0, 0);

        transition:
          opacity 700ms cubic-bezier(.22, 1, .36, 1),
          transform 700ms cubic-bezier(.22, 1, .36, 1);
      }

      .market-noise-section[data-visible="true"]
      .decision-field {
        opacity: 1;
        transform: translate3d(0, 0, 0);

        transition-delay: 120ms;
      }

      /* ==========================================================
         Noise
      =========================================================== */

      .noise-fragment {
        opacity: 0;
        transform: translate3d(-13px, 0, 0);

        transition:
          opacity 450ms ease,
          transform 450ms cubic-bezier(.22, 1, .36, 1);
      }

      .market-noise-section[data-visible="true"]
      .noise-fragment {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* ==========================================================
         Structure
      =========================================================== */

      .structure-item,
      .structure-mobile-item {
        opacity: 0;
        transform: translate3d(8px, 0, 0);

        transition:
          opacity 450ms ease,
          transform 450ms cubic-bezier(.22, 1, .36, 1),
          background-color 300ms ease,
          padding 300ms ease;
      }

      .market-noise-section[data-visible="true"]
      .structure-item,
      .market-noise-section[data-visible="true"]
      .structure-mobile-item {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* ==========================================================
         Marker
      =========================================================== */

      .decision-marker {
        opacity: 0;
        transform: scale(.7);

        transition:
          opacity 320ms ease,
          transform 320ms cubic-bezier(.22, 1, .36, 1);
      }

      .market-noise-section[data-visible="true"]
      .decision-marker {
        opacity: 1;
        transform: scale(1);

        transition-delay: 560ms;
      }

      /* ==========================================================
         Hover
      =========================================================== */

      @media (hover: hover) and (pointer: fine) {
        .decision-field:hover .decision-marker {
          transform: scale(1.06);
        }
      }

      /* ==========================================================
         Reduced motion
      =========================================================== */

      @media (prefers-reduced-motion: reduce) {
        .noise-reveal,
        .decision-field,
        .noise-fragment,
        .structure-item,
        .structure-mobile-item,
        .decision-marker {
          opacity: 1 !important;
          transform: none !important;

          transition: none !important;
          animation: none !important;
        }
      }
    `}</style>
  );
}
