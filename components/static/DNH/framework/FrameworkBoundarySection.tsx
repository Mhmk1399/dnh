"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  ArrowDownLeft,
  Check,
  Eye,
  KeyRound,
  Layers3,
  LockKeyhole,
  Route,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Visible / Public
============================================================================= */

const VISIBLE_ITEMS = [
  {
    letter: "D",
    title: "محیط تصمیم",
    description: "چه داده‌ها، شرایط مالی و متغیرهایی بر تصمیم اثر می‌گذارند.",
    icon: Eye,
  },
  {
    letter: "N",
    title: "سناریو و مسیر",
    description: "چه ریسک‌ها، گزینه‌ها و مسیرهایی باید در تصمیم بررسی شوند.",
    icon: Route,
  },
  {
    letter: "H",
    title: "افق بلندمدت",
    description:
      "تصمیم امروز چگونه با ثروت، نقدینگی، تاب‌آوری و اهداف مرتبط می‌شود.",
    icon: Layers3,
  },
] as const;

/* =============================================================================
   Proprietary / Protected

   فقط دسته‌بندی محرمانه را نشان می‌دهیم،
   نه محتوا یا منطق داخل آن را.
============================================================================= */

const PROTECTED_ITEMS = [
  {
    en: "DATA LOGIC",
    title: "منابع، وزن‌دهی و روابط اختصاصی داده",
  },
  {
    en: "DECISION LOGIC",
    title: "ترتیب پردازش و منطق Decision Tree",
  },
  {
    en: "SCENARIO LOGIC",
    title: "منطق دقیق ساخت و ارزیابی سناریو",
  },
  {
    en: "INTERNAL MODELS",
    title: "مدل‌ها، فرمول‌ها و روابط قابل بازسازی",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function FrameworkBoundarySection() {
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
      id="framework-boundary"
      dir="rtl"
      aria-labelledby="framework-boundary-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        border-b
        border-line

        bg-[#f7fafb]

        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28

          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.86fr_1.14fr]
            lg:items-end
            lg:gap-16
          "
        >
          <Reveal visible={visible} delay={20}>
            <div>
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
                  مرز انتشار Framework
                </span>
              </div>

              <h2
                id="framework-boundary-title"
                className="
                  max-w-[780px]

                  text-[31px]
                  font-black
                  leading-[1.65]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[38px]

                  lg:text-[45px]
                  lg:leading-[1.52]

                  xl:text-[50px]
                "
              >
                روش را می‌توان فهمید؛
                <br />
                بدون اینکه{" "}
                <span className="text-brand-primary">معماری آن افشا شود.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={90}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[700px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-ink-muted

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                مخاطب باید بداند Framework چه نوع مسئله‌ای را می‌بیند، چگونه به
                ساختن تصویر تصمیم کمک می‌کند و چه خروجی‌ای قابل انتظار است؛ اما
                منطق اختصاصی‌ای که این معماری را قابل بازسازی می‌کند، عمومی
                نمی‌شود.
              </p>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Boundary field
        ======================================================== */}

        <div
          className="
            mt-12

            sm:mt-14

            lg:mt-16
          "
        >
          <div
            className="
              relative

              grid

              border
              border-line

              bg-white

              shadow-[0_34px_100px_rgba(8,68,91,.10)]

              lg:grid-cols-[1fr_92px_1fr]
            "
          >
            {/* ===================================================
                VISIBLE SIDE
            ==================================================== */}

            <div
              className={`
                relative
                overflow-hidden

                transition-[opacity,transform]
                duration-[900ms]
                ease-[cubic-bezier(.22,1,.36,1)]

                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }

                motion-reduce:translate-x-0
                motion-reduce:opacity-100
                motion-reduce:transition-none
              `}
            >
              {/* heading */}

              <div
                className="
                  border-b
                  border-line

                  px-5
                  py-6

                  sm:px-7

                  lg:px-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                  "
                >
                  <div>
                    <p
                      dir="ltr"
                      className="
                        text-[7px]
                        font-black
                        tracking-[0.19em]

                        text-brand-primary/50
                      "
                    >
                      VISIBLE FRAMEWORK
                    </p>

                    <h3
                      className="
                        mt-2

                        text-[17px]
                        font-black

                        text-ink

                        sm:text-[19px]
                      "
                    >
                      آنچه باید روشن باشد
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[480px]

                        text-[9px]
                        font-medium
                        leading-[1.9]

                        text-ink-muted
                      "
                    >
                      مفهوم، دامنه نگاه و خروجی Framework قابل توضیح است.
                    </p>
                  </div>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0

                      items-center
                      justify-center

                      border
                      border-brand-primary/15

                      bg-brand-primary/[0.05]

                      text-brand-primary
                    "
                  >
                    <Eye className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </div>

              {/* rows */}

              <div
                className="
                  divide-y
                  divide-line
                "
              >
                {VISIBLE_ITEMS.map((item, index) => (
                  <VisibleRow
                    key={item.letter}
                    item={item}
                    index={index}
                    visible={visible}
                  />
                ))}
              </div>

              {/* bottom */}

              <div
                className="
                  border-t
                  border-line

                  bg-surface-soft/45

                  px-5
                  py-5

                  sm:px-7

                  lg:px-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="
                      mt-1
                      h-4
                      w-4
                      shrink-0

                      text-brand-primary
                    "
                    strokeWidth={1.7}
                  />

                  <p
                    className="
                      text-[9px]
                      font-medium
                      leading-[1.9]

                      text-ink-muted
                    "
                  >
                    مخاطب می‌تواند منطق عمومی، نقش هر لایه و نوع تصویری که
                    Framework می‌سازد را درک کند.
                  </p>
                </div>
              </div>

              {/* reveal light */}

              <span
                aria-hidden="true"
                className={`
                  pointer-events-none

                  absolute
                  inset-y-0
                  right-0

                  bg-white

                  transition-[width]
                  duration-[1100ms]
                  ease-[cubic-bezier(.22,1,.36,1)]

                  ${visible ? "w-0" : "w-full"}

                  motion-reduce:hidden
                `}
              />
            </div>

            {/* ===================================================
                CENTRAL BOUNDARY
            ==================================================== */}

            <BoundaryRail visible={visible} />

            {/* ===================================================
                PROTECTED SIDE
            ==================================================== */}

            <div
              className={`
                group/protected

                relative
                overflow-hidden

                bg-[#032f3f]

                text-white

                transition-[opacity,transform]
                duration-[900ms]
                delay-100
                ease-[cubic-bezier(.22,1,.36,1)]

                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }

                motion-reduce:translate-x-0
                motion-reduce:opacity-100
                motion-reduce:transition-none
              `}
            >
              <ProtectedBackground />

              {/* heading */}

              <div
                className="
                  relative
                  z-10

                  border-b
                  border-white/10

                  px-5
                  py-6

                  sm:px-7

                  lg:px-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                  "
                >
                  <div>
                    <p
                      dir="ltr"
                      className="
                        text-[7px]
                        font-black
                        tracking-[0.19em]

                        text-brand-accent
                      "
                    >
                      PROPRIETARY ARCHITECTURE
                    </p>

                    <h3
                      className="
                        mt-2

                        text-[17px]
                        font-black

                        text-white

                        sm:text-[19px]
                      "
                    >
                      آنچه در معماری داخلی می‌ماند
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[480px]

                        text-[9px]
                        font-medium
                        leading-[1.9]

                        text-white/38
                      "
                    >
                      دسته‌های زیر قابل اشاره‌اند؛ جزئیات و روابط درونی آن‌ها
                      منتشر نمی‌شوند.
                    </p>
                  </div>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0

                      items-center
                      justify-center

                      border
                      border-brand-accent/25

                      bg-brand-accent/[0.08]

                      text-brand-accent

                      transition-[background-color,color,border-color]
                      duration-300

                      group-hover/protected:border-brand-accent
                      group-hover/protected:bg-brand-accent
                      group-hover/protected:text-white
                    "
                  >
                    <LockKeyhole className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </div>

              {/* protected rows */}

              <div
                className="
                  relative
                  z-10

                  divide-y
                  divide-white/10
                "
              >
                {PROTECTED_ITEMS.map((item, index) => (
                  <ProtectedRow
                    key={item.en}
                    item={item}
                    index={index}
                    visible={visible}
                  />
                ))}
              </div>

              {/* closing */}

              <div
                className="
                  relative
                  z-10

                  border-t
                  border-white/10

                  bg-black/[0.08]

                  px-5
                  py-5

                  sm:px-7

                  lg:px-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <ShieldCheck
                    aria-hidden="true"
                    className="
                      mt-1
                      h-4
                      w-4
                      shrink-0

                      text-[#7bc8df]
                    "
                    strokeWidth={1.5}
                  />

                  <p
                    className="
                      text-[9px]
                      font-medium
                      leading-[1.9]

                      text-white/38
                    "
                  >
                    این مرز بخشی از حفاظت از روش، کیفیت تحلیل و استقلال معماری
                    تصمیم‌سازی DNH است.
                  </p>
                </div>
              </div>

              {/* permanent privacy veil */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-[12%]
                  z-[5]

                  hidden
                  w-px

                  bg-white/[0.08]

                  lg:block
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            Signature statement
        ======================================================== */}

        <Reveal visible={visible} delay={650}>
          <div
            className="
              mt-8

              grid
              gap-6

              border-y
              border-line

              py-7

              lg:grid-cols-[1fr_auto]
              lg:items-center
              lg:gap-12
            "
          >
            <blockquote
              className="
                max-w-[920px]

                text-[18px]
                font-black
                leading-[1.9]
                tracking-[-0.025em]

                text-ink

                sm:text-[21px]

                lg:text-[24px]
              "
            >
              «خروجی دیده می‌شود؛
              <span className="text-brand-primary">
                {" "}
                معماری پشت آن اختصاصی می‌ماند.
              </span>
              »
            </blockquote>

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                aria-hidden="true"
                className="
                  hidden
                  h-px
                  w-12

                  bg-brand-primary/20

                  sm:block
                "
              />

              <span
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.2em]

                  text-brand-primary/45
                "
              >
                DNH FRAMEWORK PRINCIPLE
              </span>
            </div>
          </div>
        </Reveal>

        {/* =======================================================
            Next
        ======================================================== */}

        <Reveal visible={visible} delay={730}>
          <div
            className="
              mt-7

              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-medium

                  text-ink-muted
                "
              >
                مرحله بعد
              </p>

              <p
                className="
                  mt-1

                  text-[11px]
                  font-black

                  text-ink
                "
              >
                این نگاه در یک مسئله واقعی چه شکلی پیدا می‌کند؟
              </p>
            </div>

            <ActionButton
              href="#framework-in-practice"
              variant="primary"
              size="md"
              icon={ArrowDownLeft}
              className="
                w-full

                bg-brand-primary

                text-white

                shadow-[0_14px_36px_rgba(22,115,148,.15)]

                hover:-translate-y-0.5

                sm:w-auto
                sm:min-w-[220px]
              "
            >
              دیدن Framework در عمل
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Visible row
============================================================================= */

function VisibleRow({
  item,
  index,
  visible,
}: {
  item: {
    letter: string;
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/visible

        relative

        grid
        gap-4

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/60

        sm:grid-cols-[52px_1fr]
        sm:items-center
        sm:px-7

        lg:px-8

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${240 + index * 90}ms`,
      }}
    >
      <span
        className="
          flex
          h-11
          w-11

          items-center
          justify-center

          border
          border-line

          bg-surface-soft/50

          text-brand-primary

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/visible:-translate-y-0.5
          group-hover/visible:border-brand-primary
          group-hover/visible:bg-brand-primary
          group-hover/visible:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <div>
        <div
          className="
            flex
            items-baseline
            gap-3
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              font-black

              text-brand-accent
            "
          >
            {item.letter}
          </span>

          <h4
            className="
              text-[11px]
              font-black

              text-ink
            "
          >
            {item.title}
          </h4>
        </div>

        <p
          className="
            mt-1.5

            text-[9px]
            font-medium
            leading-[1.9]

            text-ink-muted
          "
        >
          {item.description}
        </p>

        <span
          aria-hidden="true"
          className="
            mt-3
            block

            h-[2px]
            w-6

            bg-brand-primary/20

            transition-[width,background-color]
            duration-300

            group-hover/visible:w-12
            group-hover/visible:bg-brand-accent
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   Protected row
============================================================================= */

function ProtectedRow({
  item,
  index,
  visible,
}: {
  item: {
    en: string;
    title: string;
  };
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`
        group/protected-row

        relative
        overflow-hidden

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-white/[0.035]

        sm:px-7

        lg:px-8

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${300 + index * 80}ms`,
      }}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-5
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[6px]
              font-black
              tracking-[0.17em]

              text-brand-accent/70
            "
          >
            {item.en}
          </p>

          <h4
            className="
              mt-2

              text-[10px]
              font-black
              leading-[1.9]

              text-white/72
            "
          >
            {item.title}
          </h4>
        </div>

        <span
          className="
            flex
            h-8
            w-8
            shrink-0

            items-center
            justify-center

            border
            border-white/10

            bg-white/[0.025]

            text-white/25

            transition-[border-color,color,background-color]
            duration-300

            group-hover/protected-row:border-brand-accent/30
            group-hover/protected-row:bg-brand-accent/[0.07]
            group-hover/protected-row:text-brand-accent
          "
        >
          <KeyRound className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </div>

      {/* masked internal logic */}

      <div
        aria-hidden="true"
        className="
          mt-4

          space-y-2
        "
      >
        <span
          className="
            block
            h-[3px]
            w-[78%]

            bg-white/[0.07]
          "
        />

        <span
          className="
            block
            h-[3px]
            w-[56%]

            bg-white/[0.045]
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   Boundary rail
============================================================================= */

function BoundaryRail({ visible }: { visible: boolean }) {
  return (
    <div
      className="
        relative

        hidden

        overflow-hidden

        border-x
        border-line

        bg-[#eef4f6]

        lg:block
      "
    >
      {/* vertical line */}

      <span
        aria-hidden="true"
        className={`
          absolute
          left-1/2
          top-0

          w-px

          -translate-x-1/2

          bg-brand-primary/25

          transition-[height]
          duration-[1000ms]
          delay-150
          ease-[cubic-bezier(.22,1,.36,1)]

          ${visible ? "h-full" : "h-0"}

          motion-reduce:h-full
          motion-reduce:transition-none
        `}
      />

      {/* seal */}

      <span
        className={`
          absolute
          left-1/2
          top-1/2
          z-10

          flex
          h-14
          w-14

          -translate-x-1/2
          -translate-y-1/2

          items-center
          justify-center

          border
          border-brand-primary/20

          bg-[#f7fafb]

          text-brand-primary

          shadow-[0_0_0_9px_rgba(238,244,246,.92)]

          transition-[opacity,transform,border-color,background-color,color]
          duration-700
          delay-400
          ease-[cubic-bezier(.22,1,.36,1)]

          ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}

          hover:border-brand-accent
          hover:bg-brand-accent
          hover:text-white

          motion-reduce:scale-100
          motion-reduce:opacity-100
          motion-reduce:transition-colors
        `}
      >
        <LockKeyhole className="h-5 w-5" strokeWidth={1.5} />
      </span>

      <span
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-[18%]

          h-[6px]
          w-[6px]

          -translate-x-1/2

          bg-brand-primary
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[18%]
          left-1/2

          h-[6px]
          w-[6px]

          -translate-x-1/2

          bg-brand-accent
        "
      />

      <span
        dir="ltr"
        className="
          absolute
          bottom-7
          left-1/2

          -translate-x-1/2
          -rotate-90

          whitespace-nowrap

          text-[6px]
          font-black
          tracking-[0.22em]

          text-brand-primary/25
        "
      >
        PUBLIC / PROPRIETARY
      </span>
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
   Protected background
============================================================================= */

function ProtectedBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.10) 1px,transparent 1px)",
          backgroundSize: "68px 100%",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-10

          select-none

          font-mono
          text-[220px]
          font-black
          leading-none

          text-white/[0.018]

          sm:text-[280px]
        "
      >
        DNH
      </div>
    </>
  );
}

/* =============================================================================
   Section background
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
            "radial-gradient(circle at 80% 44%,rgba(22,115,148,.07),transparent 28%),linear-gradient(112deg,#f4f9fa 0%,#ffffff 48%,#f8fbfc 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.14]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 5%,transparent) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

     
    </>
  );
}
