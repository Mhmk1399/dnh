import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   MAJOR FINANCIAL DECISION — HERO

   Core proposition:
   Before a major financial decision,
   5 dimensions need clarity:

   Issue
   Risk
   Liquidity
   Time Horizon
   Scenarios

   Dark / high readability / problem-led landing
============================================================================= */

const DECISION_DIMENSIONS = [
  {
    title: "مسئله",
    question: "دقیقاً چه چیزی قرار است درباره آن تصمیم گرفته شود؟",
  },
  {
    title: "ریسک",
    question: "چه ریسک‌هایی باید پیش از اقدام دیده شوند؟",
  },
  {
    title: "نقدشوندگی",
    question: "این تصمیم چه نسبتی با دسترسی به منابع دارد؟",
  },
  {
    title: "افق زمانی",
    question: "اثر تصمیم در چه بازه‌ای باید سنجیده شود؟",
  },
  {
    title: "سناریوها",
    question: "چه وضعیت‌های متفاوتی باید قبل از انتخاب دیده شوند؟",
  },
] as const;

export function MajorFinancialDecisionHero() {
  return (
    <section
      id="major-decision-intro"
      dir="rtl"
      aria-labelledby="major-decision-title"
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

            py-10

            lg:grid-cols-[0.98fr_1.02fr]
            lg:gap-16
            lg:py-8

            xl:gap-20
          "
        >
          {/* ===========================================================
              COPY
          ============================================================ */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
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
                  text-[13px]
                  font-black

                  text-white/70
                "
              >
                در آستانه یک تصمیم مالی مهم
              </p>
            </div>

            <h1
              id="major-decision-title"
              className="
                max-w-[850px]

                text-[36px]
                font-black
                leading-[1.62]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[52px]
                lg:leading-[1.5]

                xl:text-[59px]
              "
            >
              قبل از یک تصمیم مالی بزرگ،
              <br />
              <span className="text-brand-accent">
                تصویر تصمیم را روشن کنید.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[720px]

                text-[15px]
                font-medium
                leading-[2.1]

                text-white/68

                sm:text-[16px]
              "
            >
              قبل از هر انتخاب بزرگ، مسئله، ریسک، نقدشوندگی، افق زمانی و
              سناریوهای پیش رو باید به‌اندازه کافی روشن باشند تا تصمیم روی یک
              تصویر منسجم‌تر قرار بگیرد.
              </p>
            </div>

            {/* =========================================================
                ACTIONS
            ========================================================== */}

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
                lg:mt-9
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
                  sm:min-w-[275px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href="#major-decision-clarity"
                variant="secondary"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white
                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/36
                  hover:bg-white/[0.055]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[240px]
                "
              >
                قبل از تصمیم چه باید روشن باشد؟
              </ActionButton>
            </div>

            {/* =========================================================
                AUDIENCE
            ========================================================== */}

            <div
              className="
                order-4
                mt-0
                max-w-[720px]

                border-r-2
                border-[#82cee4]/40

                pr-4

                lg:order-none
                lg:mt-8
              "
            >
              <p
                className="
                  text-[14px]
                  font-medium
                  leading-7

                  text-white/58
                "
              >
                برای فرد، خانواده، سرمایه‌گذار یا کسب‌وکاری که در آستانه یک
                تصمیم مالی مهم قرار دارد.
              </p>
            </div>
          </div>

          {/* ===========================================================
              DECISION READINESS SHEET
          ============================================================ */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <DecisionReadinessSheet />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DECISION READINESS SHEET

   Not a dashboard.
   Not five cards.

   One clear proposition:
   Before action → five things need clarity.
============================================================================= */

function DecisionReadinessSheet() {
  return (
    <div
      aria-labelledby="decision-readiness-heading"
      className="
        relative

        mx-auto
        w-full
        max-w-[660px]

        border
        border-white/14

        bg-[#063746]/78

        shadow-[0_38px_100px_rgba(0,0,0,.22)]
        backdrop-blur-[2px]
      "
    >
      {/* =============================================================
          HEADER
      ============================================================== */}

      <div
        className="
          relative

          flex
          items-center
          justify-between
          gap-5

          border-b
          border-white/12

          px-5
          py-5

          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[14px]
              font-black

              text-brand-accent
            "
          >
            قبل از اقدام
          </p>

          <h2
            id="decision-readiness-heading"
            className="
              mt-1

              text-[19px]
              font-black
              leading-8

              text-white

              sm:text-[21px]
            "
          >
            این پنج محور باید روشن شوند.
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-px
              w-8

              bg-white/16
            "
          />

          <span
            className="
              h-[8px]
              w-[8px]

              bg-brand-accent
            "
          />
        </div>

        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-0
            right-0

            w-[2px]

            bg-brand-accent
          "
        />
      </div>

      {/* =============================================================
          FIVE DIMENSIONS
      ============================================================== */}

      <div>
        {DECISION_DIMENSIONS.map((item, index) => (
          <DecisionDimensionRow
            key={item.title}
            title={item.title}
            question={item.question}
            accent={index === 0 || index === DECISION_DIMENSIONS.length - 1}
          />
        ))}
      </div>

      {/* =============================================================
          DECISION GATE
      ============================================================== */}

      <div
        className="
          relative

          border-t
          border-white/12

          bg-black/[0.08]

          px-5
          py-5

          sm:px-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[8px]

              h-[8px]
              w-[8px]

              shrink-0

              bg-brand-accent
            "
          />

          <div>
            <p
              className="
                text-[14px]
                font-black

                text-white
              "
            >
              نقطه تصمیم
            </p>

            <p
              className="
                mt-1

                text-[14px]
                font-medium
                leading-7

                text-white/62

                sm:text-[15px]
              "
            >
              اقدام زمانی معنا پیدا می‌کند که تصویر مسئله و شرایط پیرامون آن
              به‌اندازه کافی روشن شده باشد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   DIMENSION ROW
============================================================================= */

function DecisionDimensionRow({
  title,
  question,
  accent = false,
}: {
  title: string;
  question: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/dimension
        relative

        grid
        gap-2

        border-b
        border-white/[0.09]

        px-5
        py-4

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white/[0.025]

        sm:grid-cols-[135px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6
      "
    >
      {/* title */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[7px]
            w-[7px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/55"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black

            text-white
          "
        >
          {title}
        </h3>
      </div>

      {/* diagnostic question */}

      <p
        className="
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-white/64

          sm:border-r
          sm:border-white/[0.08]
          sm:pr-5
        "
      >
        {question}
      </p>

      {/* hover marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/dimension:scale-y-100
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
            "radial-gradient(circle at 24% 43%,rgba(22,115,148,.26),transparent 30%),radial-gradient(circle at 82% 70%,rgba(252,133,2,.035),transparent 20%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      {/* institutional grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* subtle horizon */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[54%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
