"use client";

import Image from "next/image";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { ArrowLeft, BrainCircuit, Layers3, ShieldCheck } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const ABOUT_IMAGE = "/assets/images/about-hero-desktop.png";

/* =============================================================================
   Professional focus
============================================================================= */

const FOCUS_AREAS = [
  {
    title: "ساختار سرمایه و نقدینگی",
    description: "دیدن ارتباط میان منابع مالی، نقدینگی و ساختار کلی تصمیم.",
    icon: Layers3,
  },
  {
    title: "ریسک و تحلیل سناریو",
    description: "بررسی عدم‌قطعیت‌ها و مسیرهای ممکن پیش از تصمیم.",
    icon: ShieldCheck,
  },
  {
    title: "تصمیم‌سازی مالی",
    description: "تبدیل تحلیل به یک تصویر روشن‌تر برای انتخاب‌های مهم.",
    icon: BrainCircuit,
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function AboutDrNasimSection() {
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
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-dr-nasim"
      dir="rtl"
      aria-labelledby="about-dr-nasim-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#032f3f]
        text-white
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          grid
          w-full

          gap-12

          py-16

          sm:py-20

          lg:grid-cols-[0.92fr_1.08fr]
          lg:items-center
          lg:gap-16
          lg:py-24

          xl:grid-cols-[0.86fr_1.14fr]
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

                  text-white/72

                  sm:text-[11px]
                "
              >
                دکتر نسیم محمدحسنی
              </span>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={100}>
            <h2
              id="about-dr-nasim-title"
              className="
                max-w-[700px]

                text-[32px]
                font-black
                leading-[1.62]
                tracking-[-0.045em]

                text-white

                sm:text-[39px]

                lg:text-[46px]
                lg:leading-[1.52]

                xl:text-[51px]
              "
            >
              پشت DNH،
              <br />
              یک <span className="text-brand-accent">نگاه انسانی</span> به
              تصمیم‌های
              <br />
              پیچیده مالی قرار دارد.
            </h2>
          </Reveal>

          <Reveal visible={visible} delay={170}>
            <p
              className="
                mt-6
                max-w-[650px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/62

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              DNH یک سیستم حرفه‌ای برای معماری ثروت و تصمیم‌سازی مالی است؛
              سیستمی که نگاه تخصصی و فلسفه حرفه‌ای دکتر نسیم محمدحسنی پشتوانه آن
              قرار دارد.
            </p>
          </Reveal>

          {/* =====================================================
              Quote
          ====================================================== */}

          <Reveal visible={visible} delay={230}>
            <blockquote
              className="
                group/quote

                relative

                mt-8

                max-w-[640px]

                border-r-2
                border-brand-accent

                pr-5

                sm:pr-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-[5px]
                  top-0

                  h-3
                  w-3

                  bg-brand-accent

                  transition-transform
                  duration-300

                  group-hover/quote:scale-125
                "
              />

              <p
                className="
                  text-[16px]
                  font-black
                  leading-[2]

                  text-white

                  sm:text-[18px]

                  lg:text-[19px]
                "
              >
                «ثروت فقط چیزی نیست که در اختیار داریم؛ ساختاری است که باید برای
                حفظ، توسعه و هدایت آن طراحی شود.»
              </p>
            </blockquote>
          </Reveal>

          {/* =====================================================
              Authority / System distinction
          ====================================================== */}

          <Reveal visible={visible} delay={290}>
            <div
              className="
                mt-8

                grid
                gap-px

                overflow-hidden

                border
                border-white/12

                bg-white/12

                sm:grid-cols-2
              "
            >
              <AuthorityCell
                eyebrow="HUMAN AUTHORITY"
                title="تخصص و قضاوت حرفه‌ای"
                description="نقش دکتر نسیم در DNH؛ مرجع تخصص، نگاه حرفه‌ای و تصمیم‌سازی."
                accent
              />

              <AuthorityCell
                eyebrow="DNH SYSTEM"
                title="سیستم و چارچوب"
                description="نقش DNH؛ ساختار، Framework، Intelligence و مسیر قابل توسعه."
              />
            </div>
          </Reveal>

          {/* =====================================================
              CTA
          ====================================================== */}

          <Reveal visible={visible} delay={360}>
            <div
              className="
                mt-8

                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
              "
            >
              <ActionButton
                href="/about"
                variant="secondary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/28
                  bg-white/[0.055]

                  text-white

                  shadow-none

                  hover:border-white/50
                  hover:bg-white/[0.10]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                آشنایی با دکتر نسیم
              </ActionButton>

              <p
                className="
                  text-[11px]
                  font-medium
                  leading-[1.9]

                  text-white/38

                  sm:max-w-[240px]
                "
              >
                فلسفه حرفه‌ای، نگاه به ثروت و نقش ایشان در شکل‌گیری DNH
              </p>
            </div>
          </Reveal>
        </div>

        {/* =========================================================
            PORTRAIT — LEFT
        ========================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <Portrait visible={visible} />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Portrait
============================================================================= */

function Portrait({ visible }: { visible: boolean }) {
  return (
    <div
      className={`
        group/portrait

        relative
        mx-auto

        min-h-[560px]
        w-full
        max-w-[720px]

        overflow-hidden

        border
        border-white/12

        bg-[#07394b]

        transition-[opacity,transform,border-color,box-shadow]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:border-white/22
        hover:shadow-[0_32px_90px_rgba(0,0,0,.18)]

        sm:min-h-[650px]

        lg:min-h-[720px]

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: "140ms",
      }}
    >
      {/* image */}

      <Image
        src={ABOUT_IMAGE}
        alt="دکتر نسیم محمدحسنی"
        fill
        sizes="
          (min-width: 1280px) 650px,
          (min-width: 1024px) 48vw,
          100vw
        "
        className="
          object-cover
          object-center

          transition-transform
          duration-[900ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/portrait:scale-[1.025]
        "
      />

      {/* image treatment */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(2,40,54,.02)_18%,rgba(2,42,56,.10)_48%,rgba(2,38,51,.88)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          bg-[linear-gradient(90deg,rgba(3,47,63,.25)_0%,transparent_42%,rgba(3,47,63,.08)_100%)]
        "
      />

      {/* top label */}

      <div
        className="
          absolute
          left-5
          right-5
          top-5

          flex
          items-center
          justify-between
          gap-5

          sm:left-7
          sm:right-7
          sm:top-7
        "
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
              h-[7px]
              w-[7px]

              bg-brand-accent
            "
          />

          <span
            dir="ltr"
            className="
              text-[7px]
              font-black
              tracking-[0.2em]

              text-white/72
            "
          >
            DNH / HUMAN AUTHORITY
          </span>
        </div>

        <span
          aria-hidden="true"
          className="
            h-px
            w-14

            bg-white/24

            transition-[width,background-color]
            duration-500

            group-hover/portrait:w-24
            group-hover/portrait:bg-brand-accent/70
          "
        />
      </div>

      {/* =========================================================
          bottom content
      ========================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          p-5

          sm:p-7

          lg:p-8
        "
      >
        {/* title */}

        <div
          className="
            border-b
            border-white/16

            pb-5
          "
        >
          <p
            className="
              text-[19px]
              font-black

              text-white

              sm:text-[22px]
            "
          >
            دکتر نسیم محمدحسنی
          </p>

          <p
            dir="ltr"
            className="
              mt-2

              text-right
              text-[8px]
              font-bold
              leading-[1.8]
              tracking-[0.08em]

              text-white/52
            "
          >
            PRIVATE WEALTH ARCHITECT
            <br />
            STRATEGIC FINANCIAL ADVISOR
            <br />
            FOUNDER OF THE DNH FRAMEWORK
          </p>
        </div>

        {/* focus */}

        <div
          className="
            mt-5

            divide-y
            divide-white/10
          "
        >
          {FOCUS_AREAS.map((item, index) => (
            <FocusItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* orange architectural marker */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-[39%]
          right-0

          hidden
          items-center

          sm:flex
        "
      >
        <span
          className="
            h-px
            w-12

            bg-brand-accent/75

            transition-[width]
            duration-500

            group-hover/portrait:w-20
          "
        />

        <span
          className="
            h-[7px]
            w-[7px]

            bg-brand-accent
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   Focus item
============================================================================= */

function FocusItem({
  item,
  index,
}: {
  item: (typeof FOCUS_AREAS)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/focus

        flex
        items-start
        gap-4

        py-4

        first:pt-0
        last:pb-0
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
          border-white/15

          text-[#7fc6de]

          transition-[border-color,background-color,color,transform]
          duration-300

          group-hover/focus:-translate-y-0.5
          group-hover/focus:border-brand-accent/60
          group-hover/focus:bg-brand-accent
          group-hover/focus:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <div>
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <h3
            className="
              text-[11px]
              font-black

              text-white
            "
          >
            {item.title}
          </h3>

          <span
            aria-hidden="true"
            className="
              h-px
              w-5

              bg-white/18

              transition-[width,background-color]
              duration-300

              group-hover/focus:w-10
              group-hover/focus:bg-brand-accent/70
            "
          />
        </div>

        <p
          className="
            mt-1.5

            text-[9px]
            font-medium
            leading-[1.9]

            text-white/43
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Authority cell
============================================================================= */

function AuthorityCell({
  eyebrow,
  title,
  description,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/cell

        relative

        bg-[#043547]

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-[#064055]
      "
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          right-0
          top-0

          h-[2px]

          transition-[width]
          duration-500

          ${
            accent
              ? "w-12 bg-brand-accent group-hover/cell:w-full"
              : "w-6 bg-white/15 group-hover/cell:w-full group-hover/cell:bg-brand-primary"
          }
        `}
      />

      <p
        dir="ltr"
        className="
          text-right
          text-[7px]
          font-black
          tracking-[0.17em]

          text-white/36
        "
      >
        {eyebrow}
      </p>

      <h3
        className="
          mt-3

          text-[12px]
          font-black

          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2

          text-[9px]
          font-medium
          leading-[1.9]

          text-white/42
        "
      >
        {description}
      </p>
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
  children: ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

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
          background:
            "radial-gradient(circle at 78% 26%,rgba(22,115,148,.22),transparent 30%),linear-gradient(115deg,#022b39 0%,#033647 50%,#022f3e 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.10]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[17%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
