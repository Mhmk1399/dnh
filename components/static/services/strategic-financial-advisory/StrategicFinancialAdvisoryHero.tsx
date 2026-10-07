import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY HERO
   Server Component
   No client JS
   No image dependency
   CSS-only motion
============================================================================= */

export function StrategicFinancialAdvisoryHero() {
  return (
    <section
      id="strategic-financial-advisory-intro"
      dir="rtl"
      aria-labelledby="strategic-financial-advisory-title"
      className="
        relative
        isolate

        min-h-[100svh]
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        sm:scroll-mt-28
      "
    >
      <HeroBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1536px]
          flex-col

          px-5
          pb-8
          pt-[116px]

          sm:px-8
          sm:pb-10
          sm:pt-[126px]

          lg:px-12
          lg:pb-10
          lg:pt-[108px]

          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            grid
            flex-1
            items-center
            gap-12

            py-12

            lg:grid-cols-[0.98fr_1.02fr]
            lg:gap-16
            lg:py-9

            xl:grid-cols-[1.04fr_0.96fr]
            xl:gap-20
          "
        >
          {/* ===============================================================
              VISUAL
          ================================================================ */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <DecisionArchitecture />
          </div>

          {/* ===============================================================
              COPY
          ================================================================ */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
              {/* Eyebrow */}

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

                <p
                  className="
                    text-[10px]
                    font-black
                    text-white/68

                    sm:text-[11px]
                  "
                >
                  مشاوره راهبردی مالی DNH
                </p>
              </div>

              {/* ===========================================================
                  SEO H1
              ============================================================ */}

              <h1
                id="strategic-financial-advisory-title"
                className="
                  max-w-[850px]

                  text-[36px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.05em]

                  text-white

                  sm:text-[44px]

                  lg:text-[52px]
                  lg:leading-[1.52]

                  xl:text-[59px]
                "
              >
                مشاوره مالی راهبردی؛
                <br />
                برای{" "}
                <span className="text-brand-accent">
                  تصمیم‌های مالیِ متصل به آینده کسب‌وکار.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  max-w-[690px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/57

                  sm:text-[14px]
                  lg:text-[15px]
                "
              >
                وقتی سرمایه، نقدینگی، تأمین مالی و ساختار مالی هم‌زمان بر یک
                تصمیم اثر می‌گذارند، مسئله دیگر فقط انتخاب یک گزینه نیست؛ باید
                ارتباط میان شرایط امروز و مسیر پیش‌روی کسب‌وکار روشن شود.
              </p>
            </div>

            {/* ===============================================================
                ACTIONS
            ================================================================ */}

            <div
              className="
                order-3
                mt-0

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap

                lg:order-none
                lg:mt-8
              "
            >
              <ActionButton
                href="/financial-decision-assessment"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_48px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[270px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href="#strategic-advisory-context"
                variant="secondary"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white
                  shadow-none

                  hover:border-white/38
                  hover:bg-white/[0.065]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                این خدمت چه زمانی مناسب است؟
              </ActionButton>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}

/* =============================================================================
   DECISION ARCHITECTURE
============================================================================= */

function DecisionArchitecture() {
  return (
    <div
      className="
        relative
        mx-auto
        w-full
        max-w-[680px]
      "
    >
      <div
        className="
          group/architecture
          relative

          overflow-hidden

          border
          border-white/12

          bg-white/[0.025]

          shadow-[0_38px_110px_rgba(0,0,0,.17)]

          transition-[border-color,box-shadow,transform]
          duration-500

          hover:-translate-y-[2px]
          hover:border-white/18
          hover:shadow-[0_46px_130px_rgba(0,0,0,.22)]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6

            border-b
            border-white/10

            px-5
            py-5

            sm:px-6
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black

                text-brand-accent
              "
            >
              یک تصمیم، چند متغیر مرتبط
            </p>

            <p
              className="
                mt-1.5

                text-[10px]
                font-bold

                text-white/42
              "
            >
              تصویر ساختاری تصمیم مالی کسب‌وکار
            </p>
          </div>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-2
            "
          >
            <span className="h-[5px] w-[5px] bg-brand-accent" />

            <span
              className="
                h-px
                w-8

                bg-white/16

                transition-[width,background-color]
                duration-500

                group-hover/architecture:w-14
                group-hover/architecture:bg-brand-accent/55
              "
            />
          </div>
        </div>

        {/* ===============================================================
            DESKTOP DIAGRAM
        ================================================================ */}

        <div
          className="
            relative
            hidden
            h-[356px]

            px-6
            py-8

            lg:block
          "
          dir="ltr"
        >
          {/* SVG connection layer */}

          <svg
            aria-hidden="true"
            viewBox="0 0 600 330"
            preserveAspectRatio="none"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
            "
          >
            <defs>
              <linearGradient
                id="strategicConnector"
                x1="1"
                y1="0"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#82cee4" stopOpacity="0.55" />

                <stop offset="70%" stopColor="#82cee4" stopOpacity="0.27" />

                <stop offset="100%" stopColor="#fc8502" stopOpacity="0.72" />
              </linearGradient>
            </defs>

            {/* structural guides */}

            <path
              d="M55 44H545"
              stroke="white"
              strokeOpacity="0.045"
              strokeWidth="1"
            />

            <path
              d="M55 286H545"
              stroke="white"
              strokeOpacity="0.045"
              strokeWidth="1"
            />

            {/* Capital */}

            <path
              d="
                M455 72
                H431
                C409 72 400 85 400 106
                V137
                C400 155 394 165 383 165
              "
              fill="none"
              stroke="url(#strategicConnector)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              className="dnh-strategic-flow"
            />

            {/* Liquidity */}

            <path
              d="M455 165H383"
              fill="none"
              stroke="url(#strategicConnector)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              className="dnh-strategic-flow"
            />

            {/* Financing */}

            <path
              d="
                M455 258
                H431
                C409 258 400 245 400 224
                V193
                C400 175 394 165 383 165
              "
              fill="none"
              stroke="url(#strategicConnector)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
              className="dnh-strategic-flow"
            />

            {/* Main decision connection */}

            <path
              d="M217 165H145"
              fill="none"
              stroke="#fc8502"
              strokeOpacity="0.78"
              strokeWidth="1.3"
              className="dnh-decision-line"
            />

            {/* connection nodes */}

            <circle
              cx="455"
              cy="72"
              r="3.5"
              fill="#022f3e"
              stroke="#82cee4"
              strokeOpacity="0.85"
            />

            <circle
              cx="455"
              cy="165"
              r="3.5"
              fill="#022f3e"
              stroke="#82cee4"
              strokeOpacity="0.85"
            />

            <circle
              cx="455"
              cy="258"
              r="3.5"
              fill="#022f3e"
              stroke="#82cee4"
              strokeOpacity="0.85"
            />

            <circle
              cx="383"
              cy="165"
              r="4.5"
              fill="#fc8502"
              className="dnh-orange-pulse"
            />

            <circle
              cx="217"
              cy="165"
              r="4"
              fill="#fc8502"
              className="dnh-orange-pulse"
            />

            <circle
              cx="145"
              cy="165"
              r="4"
              fill="#022f3e"
              stroke="#fc8502"
              strokeWidth="1.4"
              className="dnh-orange-pulse"
            />
          </svg>

          {/* Inputs */}

          <DecisionInput
            className="absolute right-6 top-[44px]"
            title="سرمایه"
          />

          <DecisionInput
            className="
              absolute
              right-6
              top-1/2
              -translate-y-1/2
            "
            title="نقدینگی"
          />

          <DecisionInput
            className="absolute bottom-[44px] right-6"
            title="تأمین مالی"
          />

          {/* Business decision */}

          <div
            dir="rtl"
            className="
              absolute
              left-1/2
              top-1/2

              flex
              h-[92px]
              w-[172px]

              -translate-x-1/2
              -translate-y-1/2

              flex-col
              items-center
              justify-center

              border
              border-brand-accent/80

              bg-[#063746]

              shadow-[0_0_48px_rgba(252,133,2,.08)]
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                right-3
                top-3

                h-[5px]
                w-[5px]

                bg-brand-accent

                dnh-orange-pulse
              "
            />

            <p
              className="
                text-[13px]
                font-black
                text-white
              "
            >
              تصمیم کسب‌وکار
            </p>

            <p
              className="
                mt-1.5

                text-[8px]
                font-bold

                text-white/35
              "
            >
              نقطه اتصال متغیرها
            </p>
          </div>

          {/* Future direction */}

          <div
            dir="rtl"
            className="
              absolute
              left-6
              top-1/2

              flex
              h-[74px]
              w-[122px]

              -translate-y-1/2

              flex-col
              items-center
              justify-center

              border
              border-white/12

              bg-white/[0.025]
            "
          >
            <span
              aria-hidden="true"
              className="
                mb-2
                h-[5px]
                w-[5px]

                bg-[#82cee4]
              "
            />

            <p
              className="
                text-center
                text-[10px]
                font-black
                leading-5

                text-white/68
              "
            >
              مسیر آینده
            </p>
          </div>
        </div>

        {/* ===============================================================
            MOBILE DIAGRAM
        ================================================================ */}

        <div
          className="
            relative
            px-5
            py-7

            lg:hidden
          "
        >
          <div className="grid gap-2">
            <MobileInput title="سرمایه" />

            <MobileInput title="نقدینگی" />

            <MobileInput title="تأمین مالی" />
          </div>

          <div
            aria-hidden="true"
            className="
              mx-auto
              h-7
              w-px

              bg-gradient-to-b
              from-[#82cee4]/35
              to-brand-accent/70
            "
          />

          <div
            className="
              relative
              mx-auto
              max-w-[280px]

              border
              border-brand-accent/75

              bg-[#063746]

              px-5
              py-5

              text-center
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                right-3
                top-3

                h-[5px]
                w-[5px]

                bg-brand-accent

                dnh-orange-pulse
              "
            />

            <p
              className="
                text-[13px]
                font-black
                text-white
              "
            >
              تصمیم کسب‌وکار
            </p>

            <p
              className="
                mt-1.5
                text-[9px]
                font-bold
                text-white/34
              "
            >
              ارتباط متغیرهای مالی با مسیر تصمیم
            </p>
          </div>

          <div
            aria-hidden="true"
            className="
              mx-auto
              h-7
              w-px

              bg-brand-accent/60

              dnh-decision-line
            "
          />

          <div
            className="
              mx-auto
              flex
              max-w-[210px]
              items-center
              justify-center
              gap-3

              border
              border-white/10

              bg-white/[0.02]

              px-4
              py-3
            "
          >
            <span className="h-[5px] w-[5px] bg-[#82cee4]" />

            <p
              className="
                text-[10px]
                font-bold
                text-white/55
              "
            >
              مسیر آینده کسب‌وکار
            </p>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5

            border-t
            border-white/10

            bg-black/[0.07]

            px-5
            py-4

            sm:px-6
          "
        >
          <p
            className="
              text-[8px]
              font-medium
              text-white/30
            "
          >
            تصمیم مالی در خلأ بررسی نمی‌شود.
          </p>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-2
            "
          >
            <span className="h-px w-7 bg-brand-accent/50" />

            <span className="h-[4px] w-[4px] bg-brand-accent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes strategicFlow {
          to {
            stroke-dashoffset: -36;
          }
        }

        @keyframes orangePulse {
          0%,
          100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes decisionLine {
          0%,
          100% {
            opacity: 0.55;
          }

          50% {
            opacity: 1;
          }
        }

        .dnh-strategic-flow {
          animation: strategicFlow 8s linear infinite;
        }

        .dnh-orange-pulse {
          animation: orangePulse 3.2s ease-in-out infinite;
        }

        .dnh-decision-line {
          animation: decisionLine 3.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-strategic-flow,
          .dnh-orange-pulse,
          .dnh-decision-line {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function DecisionInput({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      dir="rtl"
      className={`
        flex
        h-[56px]
        w-[122px]

        items-center
        justify-between

        border
        border-white/12

        bg-[#033746]

        px-4

        ${className}
      `}
    >
      <span
        className="
          text-[10px]
          font-black
          text-white/65
        "
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className="
          h-[5px]
          w-[5px]
          bg-[#82cee4]/80
        "
      />
    </div>
  );
}

function MobileInput({ title }: { title: string }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        border
        border-white/10

        bg-white/[0.018]

        px-4
        py-3.5
      "
    >
      <span
        className="
          text-[11px]
          font-black
          text-white/62
        "
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className="
          h-[5px]
          w-[5px]

          bg-[#82cee4]/75
        "
      />
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function HeroBackground() {
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
            "radial-gradient(circle at 24% 46%,rgba(22,115,148,.24),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* subtle horizontal architecture */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[34%]

          h-px
          bg-white/[0.025]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-[22%]

          h-px
          bg-white/[0.02]
        "
      />
    </>
  );
}
