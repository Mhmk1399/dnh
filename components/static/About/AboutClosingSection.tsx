"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const PRINCIPLES = [
  {
    title: "دیدن تصویر کامل‌تر",
    description:
      "تصمیم‌های مالی در خلأ شکل نمی‌گیرند؛ آن‌ها بخشی از یک تصویر بزرگ‌تر هستند.",
  },
  {
    title: "ارتباط میان تصمیم‌ها",
    description: "دارایی، ریسک، زمان و اهداف با یکدیگر در ارتباط‌اند.",
  },
  {
    title: "ساختار پیش از اقدام",
    description:
      "پیش از هر اقدام، باید مسئله به‌صورت ساختاریافته دیده و تحلیل شود.",
  },
];

export function AboutClosingSection() {
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
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      aria-labelledby="about-closing-title"
      className="
        relative
        isolate
        overflow-hidden

        border-y
        border-white/10

        bg-[#032b39]
        text-white
      "
    >
      <ClosingBackground visible={visible} />

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

          lg:min-h-[650px]
          lg:grid-cols-[minmax(0,0.9fr)_90px_minmax(0,1fr)]
          lg:items-center
          lg:gap-10
          lg:px-12
          lg:py-20

          xl:grid-cols-[minmax(0,0.88fr)_110px_minmax(0,1.12fr)]
          xl:px-16

          2xl:px-20
        "
      >
        {/* =========================================================
            RIGHT — MAIN CONTENT
        ========================================================== */}
        <div
          className={`
            order-1

            text-right

            transition-[opacity,transform]
            duration-[650ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            motion-reduce:transform-none
            motion-reduce:transition-none

            lg:col-start-1
            lg:row-start-1

            ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }
          `}
        >
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
                text-white/70

                sm:text-[11px]
              "
            >
              نگاه DNH
            </span>
          </div>

          <h2
            id="about-closing-title"
            className="
              max-w-[650px]

              text-[32px]
              font-black
              leading-[1.55]
              tracking-[-0.04em]

              text-white

              sm:text-[40px]

              lg:text-[46px]

              xl:text-[52px]
            "
          >
            تصمیم روشن‌تر،
            <br />
            از تصویر کامل‌تر
            <br />
            <span className="text-brand-accent">آغاز می‌شود.</span>
          </h2>

          <p
            className="
              mt-6
              max-w-[620px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-white/66

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            در DNH، تلاش می‌کنیم پیش از رسیدن به پاسخ، مسئله، ریسک، سناریو، زمان
            و ساختار تصمیم در کنار یکدیگر دیده شوند؛ تا تصمیم مالی در یک تصویر
            منسجم‌تر و واقع‌بینانه‌تر شکل بگیرد.
          </p>

          {/* CTA */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
              sm:items-center
            "
          >
            <ActionButton
              href="/dnh/framework"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent

                shadow-[0_16px_36px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                hover:bg-[#ec7d01]

                sm:w-auto
                sm:min-w-[220px]
              "
            >
              آشنایی با چارچوب DNH
            </ActionButton>

            <ActionButton
              href="/services"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-white/20
                bg-white/[0.03]
                text-white
                shadow-none

                hover:border-white/40
                hover:bg-white/[0.07]
                hover:text-white

                sm:w-auto
              "
            >
              مشاهده خدمات DNH
            </ActionButton>
          </div>
        </div>

        {/* =========================================================
            CENTER AXIS
        ========================================================== */}
        <ClosingAxis visible={visible} />

        {/* =========================================================
            LEFT — PRINCIPLES
        ========================================================== */}
        <div
          className="
            order-2

            lg:col-start-3
            lg:row-start-1
          "
        >
          <div
            className="
              divide-y
              divide-white/10

              border-y
              border-white/10

              lg:border-y-0
              lg:divide-y-0
            "
          >
            {PRINCIPLES.map((item, index) => (
              <Principle
                key={item.title}
                item={item}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PRINCIPLE
============================================================================= */

function Principle({
  item,
  index,
  visible,
}: {
  item: (typeof PRINCIPLES)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`
        group/principle

        relative

        py-6

        transition-[opacity,transform]
        duration-[560ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        motion-reduce:transform-none
        motion-reduce:transition-none

        lg:py-7

        ${visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
      `}
      style={{
        transitionDelay: `${180 + index * 90}ms`,
      }}
    >
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        {/* Marker */}
        <span
          aria-hidden="true"
          className="
            mt-[8px]

            h-2
            w-2
            shrink-0

            bg-brand-primary

            transition-[background-color,transform]
            duration-300

            group-hover/principle:translate-x-[-2px]
            group-hover/principle:bg-brand-accent
          "
        />

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <h3
              className="
                text-[16px]
                font-black
                text-white

                sm:text-[17px]
              "
            >
              {item.title}
            </h3>

            <span
              aria-hidden="true"
              className="
                h-px
                w-10

                bg-white/18

                transition-[width,background-color]
                duration-300

                group-hover/principle:w-14
                group-hover/principle:bg-brand-accent
              "
            />
          </div>

          <p
            className="
              mt-3
              max-w-[390px]

              text-[12px]
              font-medium
              leading-[2]

              text-white/55

              transition-colors
              duration-300

              group-hover/principle:text-white/72

              sm:text-[13px]
            "
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   CENTER AXIS
============================================================================= */

function ClosingAxis({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Desktop */}
      <div
        aria-hidden="true"
        className="
          relative

          hidden
          h-[460px]

          lg:col-start-2
          lg:row-start-1
          lg:block
        "
      >
        {/* Top half */}
        <span
          className={`
            absolute
            left-1/2
            top-1/2

            h-1/2
            w-px

            origin-bottom
            -translate-x-1/2

            bg-gradient-to-t
            from-white/35
            to-white/5

            transition-transform
            duration-[850ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            motion-reduce:transform-none

            ${visible ? "scale-y-100" : "scale-y-0"}
          `}
        />

        {/* Bottom half */}
        <span
          className={`
            absolute
            bottom-0
            left-1/2

            h-1/2
            w-px

            origin-top
            -translate-x-1/2

            bg-gradient-to-b
            from-white/35
            to-white/5

            transition-transform
            duration-[850ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            motion-reduce:transform-none

            ${visible ? "scale-y-100" : "scale-y-0"}
          `}
        />

        <AxisMarker
          label="نگاه"
          top="10%"
          active={false}
          visible={visible}
          delay={300}
        />

        <AxisMarker
          label="ساختار"
          top="50%"
          active
          visible={visible}
          delay={400}
        />

        <AxisMarker
          label="تصمیم"
          top="90%"
          active={false}
          visible={visible}
          delay={500}
        />
      </div>

      {/* Mobile signature line */}
      <div
        aria-hidden="true"
        className="
          order-2

          flex
          items-center
          gap-3

          lg:hidden
        "
      >
        <span
          className={`
            h-px
            flex-1

            origin-right
            bg-white/15

            transition-transform
            duration-700

            ${visible ? "scale-x-100" : "scale-x-0"}
          `}
        />

        <span
          className={`
            h-2.5
            w-2.5

            bg-brand-accent

            transition-[opacity,transform]
            delay-300
            duration-400

            ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
        />

        <span
          className={`
            h-px
            flex-1

            origin-left
            bg-white/15

            transition-transform
            duration-700

            ${visible ? "scale-x-100" : "scale-x-0"}
          `}
        />
      </div>
    </>
  );
}

function AxisMarker({
  label,
  top,
  active,
  visible,
  delay,
}: {
  label: string;
  top: string;
  active: boolean;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="
        absolute
        left-1/2

        flex
        -translate-x-1/2
        -translate-y-1/2
        items-center
        gap-3
      "
      style={{
        top,
      }}
    >
      <span
        className={`
          h-2.5
          w-2.5
          shrink-0

          ${
            active
              ? "bg-brand-accent shadow-[0_0_20px_color-mix(in_srgb,var(--dnh-accent)_32%,transparent)]"
              : "bg-brand-primary"
          }

          transition-[opacity,transform]
          duration-400

          ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      />

      <span
        className="
          absolute
          right-5

          whitespace-nowrap

          text-[9px]
          font-bold

          text-white/48
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ClosingBackground({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Main gradient */}
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
              #032733 0%,
              #043543 46%,
              #02242f 100%
            )
          `,
        }}
      />

      {/* Grid */}
      <div
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
              rgba(255,255,255,.11) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.08) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "88px 88px",
        }}
      />

      {/* Architectural planes */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none

          absolute
          inset-y-[8%]
          left-[21%]

          hidden
          w-[24%]

          origin-right

          border-x
          border-white/[0.07]

          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent)]

          transition-[opacity,transform]
          duration-[900ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          lg:block

          ${visible ? "scale-x-100 opacity-100" : "scale-x-[0.97] opacity-0"}
        `}
      />

      <div
        aria-hidden="true"
        className={`
          pointer-events-none

          absolute
          inset-y-[14%]
          right-[24%]

          hidden
          w-[16%]

          origin-left

          border-x
          border-white/[0.05]

          bg-[linear-gradient(90deg,transparent,rgba(22,115,148,.08),transparent)]

          transition-[opacity,transform]
          duration-[900ms]
          delay-100
          ease-[cubic-bezier(.22,1,.36,1)]

          lg:block

          ${visible ? "scale-x-100 opacity-100" : "scale-x-[0.97] opacity-0"}
        `}
      />

      {/* tiny reference marker */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[52%]
          top-[46%]

          hidden
          h-1
          w-1

          bg-red-500

          lg:block
        "
      />
    </>
  );
}
