"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  ArrowLeft,
  ArrowUpLeft,
  Clock3,
  Layers3,
  Route,
  ShieldCheck,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const ASSESSMENT_PATH = "/financial-decision-assessment";

const CONSULTATION_PATH = "/request-strategic-consultation";

/* =============================================================================
   Assessment preview

   این‌ها همان چیزهایی هستند که Assessment باید در مرحله اول روشن کند:
   - مسئله
   - افق زمانی
   - فوریت / پیچیدگی
   - مسیر اولیه مناسب
============================================================================= */

const ASSESSMENT_ITEMS = [
  {
    label: "موضوع تصمیم",
    en: "DECISION",
    value: "چه مسئله‌ای باید روشن شود؟",
    icon: Layers3,
  },
  {
    label: "افق زمانی",
    en: "HORIZON",
    value: "این تصمیم برای چه زمانی است؟",
    icon: Clock3,
  },
  {
    label: "سطح پیچیدگی",
    en: "COMPLEXITY",
    value: "چه متغیرهایی باید کنار هم دیده شوند؟",
    icon: Route,
  },
] as const;

const NEXT_STEPS = [
  {
    title: "شناخت اولیه مسئله",
    en: "ASSESSMENT",
  },
  {
    title: "بررسی تناسب و دامنه",
    en: "FIT & SCOPE",
  },
  {
    title: "هدایت به مسیر مناسب",
    en: "NEXT STEP",
  },
] as const;

/* =============================================================================
   Component
============================================================================= */

export function FinancialDecisionAssessmentSection() {
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
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="financial-decision-assessment"
      dir="rtl"
      aria-labelledby="financial-decision-assessment-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#022c3a]
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
                نقطه شروع
              </span>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={100}>
            <h2
              id="financial-decision-assessment-title"
              className="
                max-w-[700px]

                text-[32px]
                font-black
                leading-[1.62]
                tracking-[-0.045em]

                text-white

                sm:text-[40px]

                lg:text-[47px]
                lg:leading-[1.5]

                xl:text-[53px]
              "
            >
              قبل از انتخاب مسیر،
              <br />
              باید <span className="text-brand-accent">مسئله درست</span> دیده
              شود.
            </h2>
          </Reveal>

          <Reveal visible={visible} delay={170}>
            <p
              className="
                mt-6
                max-w-[640px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/62

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              هر تصمیم مهم مالی، پیش از آنکه به یک انتخاب تبدیل شود، به درک درست
              مسئله، شرایط، فوریت و مسیرهای پیش رو نیاز دارد. Assessment اولیه
              DNH برای همین نقطه آغاز طراحی شده است.
            </p>
          </Reveal>

          {/* =====================================================
              primary action
          ====================================================== */}

          <Reveal visible={visible} delay={240}>
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
                href={ASSESSMENT_PATH}
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_42px_rgba(252,133,2,.20)]

                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[275px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href={CONSULTATION_PATH}
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/25
                  bg-white/[0.045]

                  text-white

                  shadow-none

                  hover:border-white/45
                  hover:bg-white/[0.085]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>
            </div>
          </Reveal>

          {/* =====================================================
              privacy / boundary
          ====================================================== */}

          <Reveal visible={visible} delay={310}>
            <div
              className="
                mt-8
                max-w-[640px]

                border-t
                border-white/12

                pt-5
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

                    text-[#77c6de]
                  "
                  strokeWidth={1.5}
                />

                <p
                  className="
                    text-[10px]
                    font-medium
                    leading-[2]

                    text-white/43

                    sm:text-[11px]
                  "
                >
                  در مرحله اول فقط اطلاعات لازم برای شناخت مسئله دریافت می‌شود؛
                  نیازی به ارسال اطلاعات بانکی، اسناد حساس یا جزئیات کامل
                  دارایی‌ها نیست.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =========================================================
            ASSESSMENT PREVIEW
        ========================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <AssessmentPreview visible={visible} />
        </div>
      </div>

     
    </section>
  );
}

/* =============================================================================
   Assessment preview
============================================================================= */

function AssessmentPreview({ visible }: { visible: boolean }) {
  return (
    <div
      className={`
        group/assessment

        relative
        mx-auto

        w-full
        max-w-[760px]

        overflow-hidden

        border
        border-white/14

        bg-white/[0.055]

        shadow-[0_34px_100px_rgba(0,0,0,.16)]

        backdrop-blur-[8px]

        transition-[opacity,transform,border-color,box-shadow]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]
        hover:border-white/24
        hover:shadow-[0_42px_120px_rgba(0,0,0,.22)]

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: "140ms",
      }}
    >
      {/* =======================================================
          Top accent
      ======================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0

          flex
          h-[3px]
        "
      >
        <span className="w-[22%] bg-brand-accent" />
        <span className="flex-1 bg-[#5aacc8]" />
      </div>

      {/* =======================================================
          Header
      ======================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-5

          border-b
          border-white/12

          px-5
          pb-5
          pt-7

          sm:px-7

          lg:px-8
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[8px]
              font-black
              tracking-[0.19em]

              text-[#79c9e2]
            "
          >
            FINANCIAL DECISION ASSESSMENT
          </p>

          <p
            className="
              mt-2

              text-[16px]
              font-black

              text-white

              sm:text-[18px]
            "
          >
            شناخت اولیه موقعیت شما
          </p>
        </div>

        <span
          className="
            border
            border-brand-accent/30

            bg-brand-accent/[0.08]

            px-3
            py-2

            text-[8px]
            font-black

            text-brand-accent
          "
        >
          مرحله اولیه
        </span>
      </div>

      {/* =======================================================
          Assessment items
      ======================================================== */}

      <div
        className="
          divide-y
          divide-white/10
        "
      >
        {ASSESSMENT_ITEMS.map((item, index) => (
          <AssessmentItem
            key={item.en}
            item={item}
            index={index}
            visible={visible}
          />
        ))}
      </div>

      {/* =======================================================
          Next step
      ======================================================== */}

      <div
        className="
          border-t
          border-white/12

          bg-black/[0.08]

          px-5
          py-6

          sm:px-7

          lg:px-8
        "
      >
        <p
          dir="ltr"
          className="
            text-[7px]
            font-black
            tracking-[0.2em]

            text-white/35
          "
        >
          WHAT HAPPENS NEXT
        </p>

        <div
          className="
            mt-5

            grid
            gap-3

            sm:grid-cols-3
          "
        >
          {NEXT_STEPS.map((step, index) => (
            <div
              key={step.en}
              className="
                  group/step

                  relative

                  border
                  border-white/10

                  bg-white/[0.035]

                  px-4
                  py-4

                  transition-[background-color,border-color,transform]
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-brand-accent/35
                  hover:bg-white/[0.07]
                "
            >
              <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
              >
                <span
                  className="
                      text-[9px]
                      font-black

                      text-brand-accent
                    "
                >
                  0{index + 1}
                </span>

                {index < NEXT_STEPS.length - 1 && (
                  <ArrowLeft
                    aria-hidden="true"
                    className="
                        hidden
                        h-3.5
                        w-3.5

                        text-white/18

                        sm:block
                      "
                    strokeWidth={1.4}
                  />
                )}
              </div>

              <p
                className="
                    mt-3

                    text-[10px]
                    font-black

                    text-white
                  "
              >
                {step.title}
              </p>

              <p
                dir="ltr"
                className="
                    mt-1

                    text-right
                    text-[6px]
                    font-bold
                    tracking-[0.14em]

                    text-white/30
                  "
              >
                {step.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =======================================================
          final link cue
      ======================================================== */}

      <div
        className="
          group/start

          flex
          items-center
          justify-between
          gap-5

          border-t
          border-white/12

          px-5
          py-5

          transition-colors
          duration-300

          hover:bg-white/[0.035]

          sm:px-7

          lg:px-8
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-black

              text-white
            "
          >
            نقطه شروع، شناخت بهتر مسئله است.
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-medium

              text-white/35
            "
          >
            قبل از انتخاب خدمت یا مسیر همکاری
          </p>
        </div>

        <ArrowUpLeft
          aria-hidden="true"
          className="
            h-4
            w-4
            shrink-0

            text-brand-accent

            transition-transform
            duration-300

            group-hover/start:-translate-x-1
            group-hover/start:-translate-y-1
          "
          strokeWidth={1.6}
        />
      </div>
    </div>
  );
}

/* =============================================================================
   Assessment item
============================================================================= */

function AssessmentItem({
  item,
  index,
  visible,
}: {
  item: (typeof ASSESSMENT_ITEMS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/item

        grid
        grid-cols-[42px_1fr_auto]
        items-center
        gap-4

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-white/[0.045]

        sm:px-7

        lg:px-8

        ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      `}
      style={
        {
          transitionDelay: `${230 + index * 80}ms`,
        } as CSSProperties
      }
    >
      <span
        className="
          flex
          h-10
          w-10

          items-center
          justify-center

          border
          border-white/14

          text-[#7cc5dc]

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/item:-translate-y-0.5
          group-hover/item:border-brand-accent
          group-hover/item:bg-brand-accent
          group-hover/item:text-white
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
              text-[11px]
              font-black

              text-white
            "
          >
            {item.label}
          </h3>

          <span
            dir="ltr"
            className="
              text-[6px]
              font-bold
              tracking-[0.15em]

              text-white/28
            "
          >
            {item.en}
          </span>
        </div>

        <p
          className="
            mt-1.5

            text-[9px]
            font-medium
            leading-[1.9]

            text-white/42
          "
        >
          {item.value}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          h-px
          w-8

          bg-white/12

          transition-[width,background-color]
          duration-300

          group-hover/item:w-14
          group-hover/item:bg-brand-accent/70
        "
      />
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
            "radial-gradient(circle at 74% 32%,rgba(22,115,148,.28),transparent 30%),linear-gradient(115deg,#022936 0%,#033849 48%,#022c3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.09]
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
          right-[16%]
          top-0

          h-[7px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
