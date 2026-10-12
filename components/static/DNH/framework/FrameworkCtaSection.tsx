import Link from "next/link";

import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   FINAL CTA
============================================================================= */

export function FrameworkCtaSection() {
  return (
    <section
      id="framework-cta"
      dir="rtl"
      aria-labelledby="framework-cta-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
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
          min-h-[620px]
          w-full
          max-w-[1536px]

          flex-col
          justify-between

          px-5
          py-16

          sm:min-h-[680px]
          sm:px-8
          sm:py-20

          lg:min-h-[720px]
          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28

          2xl:px-20
        "
      >
        {/* =======================================================
            TOP
        ======================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
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
              قدم بعدی
            </span>
          </div>

          
        </div>

        {/* =======================================================
            MAIN
        ======================================================== */}

        <div
          className="
            grid
            gap-12

            py-14

            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-end
            lg:gap-20
          "
        >
          {/* =====================================================
              Statement
          ====================================================== */}

          <div>
            <h2
              id="framework-cta-title"
              className="
                max-w-[900px]

                text-[35px]
                font-black
                leading-[1.68]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[54px]
                lg:leading-[1.55]

                xl:text-[61px]
              "
            >
              چارچوب زمانی معنا پیدا می‌کند
              <br />
              که به <span className="text-brand-accent">
                یک تصمیم واقعی
              </span>{" "}
              متصل شود.
            </h2>

            <p
              className="
                mt-7
                max-w-[720px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/52

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              هر تصمیم مهم مالی، پیش از آنکه به یک انتخاب تبدیل شود، به درک درست
              مسئله، شرایط و مسیرهای پیش رو نیاز دارد. Assessment نقطه‌ای است که
              این بررسی می‌تواند از آن آغاز شود.
            </p>
          </div>

          {/* =====================================================
              CTA AREA
          ====================================================== */}

          <div
            className="
              relative

              border-r
              border-white/12

              pr-5

              sm:pr-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                -right-[2px]
                top-0

                h-16
                w-[3px]

                bg-brand-accent
              "
            />

            <p
              dir="ltr"
              className="
                text-[11px]
                font-black
                tracking-[0.2em]

                text-white/28
              "
            >
              START WITH THE DECISION
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
              اگر مسئله‌ای پیش رو دارید، از شناخت همان مسئله شروع کنید.
            </p>

            <div className="mt-6">
              <ActionButton
                href="/financial-decision-assessment"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_48px_rgba(252,133,2,.20)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]
                  hover:shadow-[0_24px_62px_rgba(252,133,2,.27)]

                  sm:min-w-[300px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>
            </div>

            {/* Secondary */}

            <Link
              href="/dnh/wealth-architecture"
              className="
                group/link

                mt-6

                inline-flex
                items-center
                gap-3

                text-[11px]
                font-bold

                text-white/36

                outline-none

                transition-colors
                duration-300

                hover:text-white

                focus-visible:ring-2
                focus-visible:ring-focus/50
              "
            >
              آشنایی با معماری ثروت DNH
              <ArrowUpLeft
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5

                  text-brand-accent

                  transition-transform
                  duration-300

                  group-hover/link:-translate-x-1
                  group-hover/link:-translate-y-1
                "
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>

        {/* =======================================================
            FRAMEWORK CLOSING RAIL
        ======================================================== */}

        <div
          className="
            grid
            gap-5

            border-t
            border-white/10

            pt-6

            sm:grid-cols-[1fr_auto]
            sm:items-center
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
            "
          >
            <FrameworkWord letter="D" label="Data Intelligence" />

            <Divider />

            <FrameworkWord letter="N" label="Navigation Strategy" />

            <Divider />

            <FrameworkWord letter="H" label="Horizon Architecture" />
          </div>

          <p
            className="
              max-w-[430px]

              text-[11px]
              font-medium
              leading-[1.9]

              text-white/25

              sm:text-left
            "
          >
            نگاه ساختاری به تصمیم‌های مالی؛ بدون سیگنال، پیش‌بینی قطعی یا
            جایگزینی قضاوت حرفه‌ای.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Framework word
============================================================================= */

function FrameworkWord({ letter, label }: { letter: string; label: string }) {
  return (
    <span
      className="
        group/word

        inline-flex
        items-center
        gap-2
      "
    >
      <span
        className="
          font-mono
          text-[11px]
          font-black

          text-brand-accent
        "
      >
        {letter}
      </span>

      <span
        dir="ltr"
        className="
          text-[6px]
          font-bold
          tracking-[0.14em]

          text-white/26

          transition-colors
          duration-300

          group-hover/word:text-white/55
        "
      >
        {label}
      </span>
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-white/16
      "
    />
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
            "radial-gradient(circle at 78% 42%,rgba(22,115,148,.20),transparent 30%),linear-gradient(118deg,#022936 0%,#033746 52%,#022b38 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.065]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* subtle DNH mark */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[54px]
          -left-[20px]

          select-none

          font-mono
          text-[150px]
          font-black
          leading-none
          tracking-[-0.09em]

          text-white/[0.018]

          sm:text-[220px]

          lg:-bottom-[80px]
          lg:text-[300px]
        "
      >
        DNH
      </div>

    
    </>
  );
}
