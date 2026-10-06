"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { ArrowLeft, CircleHelp, Gauge, Route, ShieldCheck } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const REASONS = [
  {
    title: "مسئله چیست؟",
    en: "THE QUESTION",
    description:
      "قبل از انتخاب خدمت، باید روشن شود چه تصمیم یا مسئله‌ای واقعاً نیاز به بررسی دارد.",
    icon: CircleHelp,
  },
  {
    title: "چقدر پیچیده و فوری است؟",
    en: "COMPLEXITY & URGENCY",
    description:
      "افق زمانی، فوریت و تعداد متغیرهای مؤثر می‌توانند مسیر مناسب را تغییر دهند.",
    icon: Gauge,
  },
  {
    title: "مسیر بعدی چیست؟",
    en: "THE RIGHT PATH",
    description:
      "ارزیابی اولیه کمک می‌کند مشخص شود ادامه مسیر باید Assessment، Consultation یا Briefing باشد.",
    icon: Route,
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function WhyAssessmentSection() {
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
      id="why-assessment"
      dir="rtl"
      aria-labelledby="why-assessment-title"
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
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full

          py-16

          sm:py-20

          lg:py-24

          xl:py-28

        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.88fr_1.12fr]
            lg:items-end
            lg:gap-16
          "
        >
          <Reveal visible={visible} delay={40}>
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
                  چرا Assessment؟
                </span>
              </div>

              <h2
                id="why-assessment-title"
                className="
                  max-w-[720px]

                  text-[31px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[38px]

                  lg:text-[45px]
                  lg:leading-[1.52]

                  xl:text-[50px]
                "
              >
                پیش از انتخاب راه‌حل،
                <br />
                باید بدانیم{" "}
                <span className="text-brand-primary">مسئله دقیقاً چیست.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[680px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-ink-muted

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                یک درخواست مشاوره ممکن است در ظاهر ساده باشد، اما مسئله واقعی
                می‌تواند به نقدینگی، ریسک، ساختار ثروت، کسب‌وکار یا یک تصمیم
                مالی مهم مربوط باشد. Assessment کمک می‌کند قبل از ورود به تحلیل،
                مسئله درست صورت‌بندی شود.
              </p>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Main composition
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-5

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-6
          "
        >
          {/* =====================================================
              Left statement
          ====================================================== */}

          <Reveal visible={visible} delay={170}>
            <div
              className="
                group/statement

                flex
                h-full
                min-h-[390px]
                flex-col
                justify-between

                border
                border-line

                bg-brand-primary

                px-5
                py-6

                text-white

                transition-[transform,box-shadow]
                duration-300

                hover:-translate-y-1
                hover:shadow-[0_24px_60px_rgba(15,92,120,.18)]

                sm:px-7
                sm:py-7

                lg:px-8
                lg:py-8
              "
            >
              <div>
                <p
                  dir="ltr"
                  className="
                    text-[7px]
                    font-black
                    tracking-[0.19em]

                    text-white/45
                  "
                >
                  BEFORE ADVICE
                </p>

                <p
                  className="
                    mt-7

                    text-[22px]
                    font-black
                    leading-[1.9]

                    sm:text-[25px]
                  "
                >
                  پاسخ خوب،
                  <br />
                  از <span className="text-brand-accent">پرسش درست</span>
                  <br />
                  آغاز می‌شود.
                </p>

                <p
                  className="
                    mt-6
                    max-w-[440px]

                    text-[11px]
                    font-medium
                    leading-[2.1]

                    text-white/58

                    sm:text-[12px]
                  "
                >
                  DNH قبل از پیشنهاد خدمت، تلاش می‌کند بفهمد چه چیزی باید بررسی
                  شود و آیا این مسئله در دامنه مناسب همکاری قرار دارد یا نه.
                </p>
              </div>

              <div
                className="
                  mt-10

                  border-t
                  border-white/15

                  pt-5
                "
              >
                <p
                  className="
                    text-[10px]
                    font-medium
                    leading-[2]

                    text-white/42
                  "
                >
                  Assessment ≠ فرم تماس
                </p>

                <p
                  className="
                    mt-1

                    text-[11px]
                    font-black

                    text-white
                  "
                >
                  Assessment = شناخت اولیه مسئله و مسیر
                </p>
              </div>
            </div>
          </Reveal>

          {/* =====================================================
              Reason field
          ====================================================== */}

          <div
            className="
              border-x
              border-t
              border-line

              bg-white
            "
          >
            {REASONS.map((item, index) => (
              <ReasonRow
                key={item.en}
                item={item}
                index={index}
                visible={visible}
              />
            ))}

            {/* ===================================================
                result
            ==================================================== */}

            <div
              className={`
                group/result

                relative
                overflow-hidden

                border-b
                border-line

                bg-surface-soft/65

                px-5
                py-6

                transition-[opacity,transform,background-color]
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]

                hover:bg-surface-soft

                sm:px-7

                lg:px-8

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
              style={{
                transitionDelay: "470ms",
              }}
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  right-0

                  w-[3px]

                  bg-brand-accent
                "
              />

              <div
                className="
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
                    dir="ltr"
                    className="
                      text-[7px]
                      font-black
                      tracking-[0.18em]

                      text-brand-primary/55
                    "
                  >
                    ASSESSMENT OUTCOME
                  </p>

                  <h3
                    className="
                      mt-2

                      text-[15px]
                      font-black

                      text-ink

                      sm:text-[17px]
                    "
                  >
                    نتیجه مرحله اول: شناخت بهتر مسیر بعدی
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[600px]

                      text-[10px]
                      font-medium
                      leading-[2]

                      text-ink-muted

                      sm:text-[11px]
                    "
                  >
                    پس از Assessment مشخص می‌شود آیا ادامه مسیر به بررسی بیشتر،
                    مشاوره راهبردی، Executive Briefing یا مسیر دیگری نیاز دارد.
                  </p>
                </div>

                <ActionButton
                  href="#assessment-process"
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full
                    shrink-0

                    border-line-strong
                    bg-white

                    text-ink

                    shadow-none

                    hover:bg-brand-primary
                   

                    sm:w-auto
                    sm:min-w-[205px]
                  "
                >
                  مشاهده مسیر ارزیابی
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            Boundary
        ======================================================== */}

        <Reveal visible={visible} delay={540}>
          <div
            className="
              mt-6

              flex
              items-start
              gap-3

              border-t
              border-line

              pt-5
            "
          >
            <ShieldCheck
              aria-hidden="true"
              className="
                mt-1
                h-4
                w-4
                shrink-0

                text-brand-primary
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[820px]

                text-[10px]
                font-medium
                leading-[2]

                text-ink-muted
              "
            >
              در این مرحله فقط اطلاعات لازم برای شناخت هدف، مسئله، پیچیدگی و
              تناسب اولیه دریافت می‌شود؛ نه اسناد محرمانه، جزئیات کامل دارایی‌ها
              یا اطلاعات بانکی.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Reason row
============================================================================= */

function ReasonRow({
  item,
  index,
  visible,
}: {
  item: (typeof REASONS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/reason

        relative

        grid
        gap-5

        border-b
        border-line

        px-5
        py-6

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/55

        sm:grid-cols-[52px_1fr_auto]
        sm:items-center
        sm:px-7

        lg:px-8
        lg:py-7

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${220 + index * 80}ms`,
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

          group-hover/reason:-translate-y-0.5
          group-hover/reason:border-brand-primary
          group-hover/reason:bg-brand-primary
          group-hover/reason:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

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
              text-[13px]
              font-black

              text-ink

              sm:text-[14px]
            "
          >
            {item.title}
          </h3>

          <span
            dir="ltr"
            className="
              text-[7px]
              font-bold
              tracking-[0.15em]

              text-brand-primary/45
            "
          >
            {item.en}
          </span>
        </div>

        <p
          className="
            mt-2
            max-w-[620px]

            text-[10px]
            font-medium
            leading-[2]

            text-ink-muted

            sm:text-[11px]
          "
        >
          {item.description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="
          hidden
          items-center
          gap-3

          sm:flex
        "
      >
        <span
          className="
            h-px
            w-8

            bg-brand-primary/15

            transition-[width,background-color]
            duration-300

            group-hover/reason:w-14
            group-hover/reason:bg-brand-accent/70
          "
        />

        <span
          className="
            h-[6px]
            w-[6px]

            bg-brand-primary/25

            transition-colors
            duration-300

            group-hover/reason:bg-brand-accent
          "
        />
      </div>
    </article>
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
            "linear-gradient(115deg,color-mix(in srgb,var(--dnh-primary) 5%,white) 0%,white 48%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.15]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 4%,transparent) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

 
    </>
  );
}
