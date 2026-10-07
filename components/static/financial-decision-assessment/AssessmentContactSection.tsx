"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowUpLeft, ShieldCheck } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const ASSESSMENT_PATH = "#assessment-form";

const CONSULTATION_PATH = "/request-strategic-consultation";

const CONTACT_PATH = "/contact";

/* =============================================================================
   FINAL CTA
============================================================================= */

export function AssessmentContactSection() {
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
        threshold: 0.18,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="assessment-contact"
      dir="rtl"
      aria-labelledby="assessment-contact-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022b38]
        text-white

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
          flex
          min-h-[720px]
          w-full

          flex-col
          justify-between

          py-16

          sm:min-h-[760px]
          sm:py-20

          lg:min-h-[800px]
          lg:py-24

          xl:py-28

        "
      >
        {/* =======================================================
            TOP
        ======================================================== */}

        <div
          className={`
            flex
            items-center
            justify-between
            gap-6

            transition-[opacity,transform]
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]

            ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

            motion-reduce:translate-y-0
            motion-reduce:opacity-100
            motion-reduce:transition-none
          `}
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
                w-10

                bg-brand-accent
              "
            />

            <span
              className="
                text-[10px]
                font-black

                text-white/58

                sm:text-[11px]
              "
            >
              یک قدم بعدی
            </span>
          </div>

          <span
            dir="ltr"
            className="
              hidden

              text-[7px]
              font-bold
              tracking-[0.22em]

              text-white/20

              sm:block
            "
          >
            START WITH THE QUESTION
          </span>
        </div>

        {/* =======================================================
            MAIN
        ======================================================== */}

        <div
          className="
            grid
            gap-12

            py-14

            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
            lg:gap-20
          "
        >
          {/* =====================================================
              Statement
          ====================================================== */}

          <div>
            <h2
              id="assessment-contact-title"
              className={`
                max-w-[900px]

                text-[34px]
                font-black
                leading-[1.65]
                tracking-[-0.05em]

                text-white

                transition-[opacity,transform]
                duration-700
                delay-75
                ease-[cubic-bezier(.22,1,.36,1)]

                sm:text-[43px]

                lg:text-[54px]
                lg:leading-[1.55]

                xl:text-[62px]

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }

                motion-reduce:translate-y-0
                motion-reduce:opacity-100
                motion-reduce:transition-none
              `}
            >
              هنوز دقیقاً نمی‌دانید
              <br />
              از کجا باید شروع کنید؟
              <br />
              <span className="text-brand-accent">
                از خودِ مسئله شروع کنید.
              </span>
            </h2>

            <p
              className={`
                mt-7
                max-w-[700px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/52

                transition-[opacity,transform]
                duration-700
                delay-150
                ease-[cubic-bezier(.22,1,.36,1)]

                sm:text-[14px]

                lg:text-[15px]

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }

                motion-reduce:translate-y-0
                motion-reduce:opacity-100
                motion-reduce:transition-none
              `}
            >
              لازم نیست از قبل بدانید کدام خدمت، جلسه یا مسیر برای موقعیت شما
              مناسب‌تر است. اگر یک تصمیم مالی مهم به تصویر روشن‌تری نیاز دارد،
              Assessment نقطه شروع برای شناخت همان مسئله است.
            </p>
          </div>

          {/* =====================================================
              CTA
          ====================================================== */}

          <div
            className={`
              transition-[opacity,transform]
              duration-700
              delay-200
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
          >
            <div
              className="
                group/actions

                relative

                border-r
                border-white/12

                pr-5

                sm:pr-7
              "
            >
              {/* orange marker */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-[2px]
                  top-0

                  h-14
                  w-[3px]

                  bg-brand-accent

                  transition-[height]
                  duration-500

                  group-hover/actions:h-full
                "
              />

              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.2em]

                  text-white/28
                "
              >
                YOUR NEXT MOVE
              </p>

              <p
                className="
                  mt-3

                  text-[14px]
                  font-black
                  leading-[1.9]

                  text-white

                  sm:text-[16px]
                "
              >
                اگر آماده‌اید، از ارزیابی اولیه شروع کنید.
              </p>

              <div
                className="
                  mt-6

                  flex
                  flex-col
                  gap-3
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

                    shadow-[0_18px_50px_rgba(252,133,2,.20)]

                    hover:-translate-y-0.5
                    hover:bg-[#ec7d01]
                    hover:shadow-[0_24px_60px_rgba(252,133,2,.27)]

                    sm:min-w-[280px]
                  "
                >
                  شروع ارزیابی اولیه
                </ActionButton>

                <ActionButton
                  href={CONSULTATION_PATH}
                  variant="secondary"
                  size="lg"
                  icon={ArrowLeft}
                  className="
                    w-full

                    border-white/20
                    bg-white/[0.035]

                    text-white

                    shadow-none

                    hover:-translate-y-0.5
                    hover:border-white/40
                    hover:bg-white/[0.075]
                    hover:text-white
                  "
                >
                  درخواست گفت‌وگوی راهبردی
                </ActionButton>
              </div>

              {/* contact alternative */}

              <Link
                href={CONTACT_PATH}
                className="
                  group/contact

                  mt-6

                  inline-flex
                  items-center
                  gap-3

                  text-[9px]
                  font-bold

                  text-white/38

                  outline-none

                  transition-colors
                  duration-300

                  hover:text-white

                  focus-visible:ring-2
                  focus-visible:ring-focus/50
                "
              >
                فقط یک سؤال عمومی دارید؟ تماس با DNH
                <ArrowUpLeft
                  aria-hidden="true"
                  className="
                    h-3.5
                    w-3.5

                    text-brand-accent

                    transition-transform
                    duration-300

                    group-hover/contact:-translate-x-1
                    group-hover/contact:-translate-y-1
                  "
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =======================================================
            CLOSING LINE
        ======================================================== */}

        <div
          className={`
            flex
            flex-col
            gap-5

            border-t
            border-white/10

            pt-6

            transition-[opacity,transform]
            duration-700
            delay-300
            ease-[cubic-bezier(.22,1,.36,1)]

            sm:flex-row
            sm:items-center
            sm:justify-between

            ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

            motion-reduce:translate-y-0
            motion-reduce:opacity-100
            motion-reduce:transition-none
          `}
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
                mt-0.5
                h-4
                w-4
                shrink-0

                text-[#79c6de]
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[700px]

                text-[9px]
                font-medium
                leading-[1.9]

                text-white/32

                sm:text-[10px]
              "
            >
              مسیر مناسب پس از شناخت اولیه مسئله و بررسی تناسب مشخص می‌شود؛ نه
              پیش از آن.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="
              hidden
              items-center
              gap-3

              lg:flex
            "
          >
            <span
              dir="ltr"
              className="
                text-[6px]
                font-bold
                tracking-[0.22em]

                text-white/18
              "
            >
              DNH / FINANCIAL DECISION ASSESSMENT
            </span>

            <span
              className="
                h-px
                w-16

                bg-white/12
              "
            />

            <span
              className="
                h-[6px]
                w-[6px]

                bg-brand-accent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Background
============================================================================= */

function Background() {
  return (
    <>
      {/* base atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 78% 42%,rgba(22,115,148,.20),transparent 30%),linear-gradient(118deg,#022936 0%,#033746 54%,#022b38 100%)",
        }}
      />

      {/* very quiet architecture */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.07]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* large typographic mark */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[80px]
          -left-[20px]

          select-none

          text-[220px]
          font-black
          leading-none

          text-white/[0.018]

          sm:text-[320px]

          lg:-bottom-[120px]
          lg:text-[430px]
        "
      >
        ؟
      </span>

      {/* top accent */}

    
    </>
  );
}
