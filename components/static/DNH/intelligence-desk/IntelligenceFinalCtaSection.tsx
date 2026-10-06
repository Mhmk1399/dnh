import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   FINAL CTA — SERVER COMPONENT
============================================================================= */

export function IntelligenceFinalCtaSection() {
  return (
    <section
      id="intelligence-cta"
      dir="rtl"
      aria-labelledby="intelligence-cta-title"
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
          min-h-[650px]
          w-full
          max-w-[1536px]

          flex-col
          justify-between

          px-5
          py-16

          sm:min-h-[700px]
          sm:px-8
          sm:py-20

          lg:min-h-[740px]
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

            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
            lg:gap-20
          "
        >
          {/* =====================================================
              MESSAGE
          ====================================================== */}

          <div>
            <h2
              id="intelligence-cta-title"
              className="
                max-w-[920px]

                text-[35px]
                font-black
                leading-[1.7]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[54px]
                lg:leading-[1.55]

                xl:text-[61px]
              "
            >
              هوشمندی،
              <br />
              زمانی ارزش دارد که به{" "}
              <span className="text-brand-accent">یک تصمیم واقعی</span> متصل
              شود.
            </h2>

            <p
              className="
                mt-7
                max-w-[710px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/52

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              اگر با یک تصمیم مالی مهم روبه‌رو هستید، Assessment می‌تواند نقطه
              شروعی برای شناخت بهتر مسئله، شرایط و مسیرهای پیش رو باشد.
            </p>
          </div>

          {/* =====================================================
              ACTION
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
              className="
                mt-3

                text-[15px]
                font-black
                leading-[1.9]

                text-white

                sm:text-[16px]
              "
            >
              مسئله را روشن کنید؛ قبل از اینکه به انتخاب تبدیل شود.
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
                href="/fa/financial-decision-assessment"
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
                  hover:shadow-[0_24px_64px_rgba(252,133,2,.27)]

                  sm:min-w-[310px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href="/fa/request-strategic-consultation"
                variant="secondary"
                size="lg"
                icon={ArrowUpLeft}
                className="
                  w-full

                  border-white/18
                  bg-white/[0.025]

                  text-white

                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/35
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>
            </div>
          </div>
        </div>

        {/* =======================================================
            DECISION HORIZON
        ======================================================== */}

        <DecisionHorizon />
      </div>

      <Motion />
    </section>
  );
}

/* =============================================================================
   DECISION HORIZON
============================================================================= */

function DecisionHorizon() {
  return (
    <div
      className="
        relative

        border-t
        border-white/10

        pt-6
      "
    >
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
        <p
          className="
            max-w-[460px]

            text-[8px] md:text-xs
            font-medium
            leading-[1.9]

            text-white/25

            sm:text-left
          "
        >
          نه سیگنال، نه پیش‌بینی قطعی؛ یک مسیر منظم‌تر برای فهم تصمیم.
        </p>
      </div>

      {/* animated horizon line */}

      <div
        aria-hidden="true"
        className="
          relative
          mt-6

          h-px
          w-full

          overflow-hidden

          bg-white/10
        "
      >
        <span
          className="
            intelligence-horizon

            absolute
            inset-y-0
            left-0

            w-[22%]

            bg-gradient-to-r
            from-transparent
            via-[#82cee4]
            to-transparent

            opacity-60
          "
        />

        <span
          className="
            absolute
            right-0
            top-1/2

            h-[7px]
            w-[7px]

            -translate-y-1/2

            bg-brand-accent

            shadow-[0_0_18px_rgba(252,133,2,.55)]
          "
        />
      </div>
    </div>
  );
}

function HorizonLabel({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span
      dir="ltr"
      className={`
        text-[6px]
        font-black
        tracking-[0.16em]

        ${active ? "text-brand-accent" : "text-white/25"}
      `}
    >
      {label}
    </span>
  );
}

function HorizonDot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-white/15
      "
    />
  );
}

/* =============================================================================
   BACKGROUND
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
            "radial-gradient(circle at 74% 42%,rgba(22,115,148,.23),transparent 29%),linear-gradient(116deg,#022936 0%,#033746 52%,#022b38 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.06]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* large quiet mark */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[55px]
          -left-5

          select-none

          font-mono
          text-[160px]
          font-black
          leading-none

          text-white/[0.018]

          sm:text-[230px]

          lg:-bottom-[90px]
          lg:text-[320px]
        "
      >
        DNH
      </span>

     
    </>
  );
}

/* =============================================================================
   CSS-ONLY MOTION
============================================================================= */

function Motion() {
  return (
    <style>{`
      .intelligence-horizon {
        animation:
          intelligence-horizon-move
          5.8s
          ease-in-out
          infinite;
      }

      @keyframes intelligence-horizon-move {
        0% {
          left: -22%;
          opacity: 0;
        }

        15% {
          opacity: .55;
        }

        78% {
          opacity: .55;
        }

        100% {
          left: 100%;
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .intelligence-horizon {
          animation: none !important;
          left: 42%;
          opacity: .25;
        }
      }
    `}</style>
  );
}
