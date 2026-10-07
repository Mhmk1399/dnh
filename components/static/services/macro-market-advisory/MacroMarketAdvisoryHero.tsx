import { ArrowDown, ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   MACRO & MARKET ADVISORY — HERO

   Meaning:
   Economic & market environment
   ↓
   Relevant scenarios
   ↓
   Strategic implication for the decision

   Server Component
   No use client
   No price chart
   No trading UI
============================================================================= */

const ENVIRONMENT_FACTORS = ["تورم", "ارز", "نقدینگی", "شرایط بازار"] as const;

export function MacroMarketAdvisoryHero() {
  return (
    <section
      id="macro-market-intro"
      dir="rtl"
      aria-labelledby="macro-market-hero-title"
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
            gap-14

            py-12

            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-16
            lg:py-10

            xl:grid-cols-[1.04fr_0.96fr]
            xl:gap-20
          "
        >
          {/* ============================================================
              VISUAL — LEFT
          ============================================================= */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <DecisionEnvironmentVisual />
          </div>

          {/* ============================================================
              COPY — RIGHT
          ============================================================= */}

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
                    text-[12px]
                    font-black
                    text-white/70
                  "
                >
                  مشاوره اقتصاد و بازار DNH
                </p>
              </div>

              {/* H1 */}

              <h1
                id="macro-market-hero-title"
                className="
                  max-w-[900px]

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
                مشاوره اقتصاد و بازار؛
                <br />
                برای{" "}
                <span className="text-brand-accent">
                  فهم محیطی که تصمیم در آن گرفته می‌شود.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  max-w-[720px]

                  text-[15px]
                  font-medium
                  leading-[2.15]

                  text-white/60

                  sm:text-[16px]
                "
              >
                تورم، ارز، نقدینگی و شرایط بازار می‌توانند تصویر یک تصمیم را
                تغییر دهند. این متغیرها در کنار سناریوهای مرتبط بررسی می‌شوند تا
                پیامدهای راهبردی تصمیم روشن‌تر دیده شوند.
              </p>

            </div>

              {/* Actions */}

              <div
                className="
                  order-3
                  mt-0

                  flex
                  flex-col
                  gap-3

                  lg:order-none
                  lg:mt-9

                  sm:flex-row
                  sm:flex-wrap
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
                  href="#macro-market-context"
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
                    sm:min-w-[220px]
                  "
                >
                  مشاهده محیط تصمیم
                </ActionButton>
              </div>

              {/* Audience — readable, not microcopy */}

              <div
                className="
                  hidden

                  mt-8
                  max-w-[720px]

                  border-r-2
                  border-[#82cee4]/45

                  pr-4

                  lg:block
                "
              >
                <p
                  className="
                    text-[14px]
                    font-medium
                    leading-7

                    text-white/48
                  "
                >
                  مناسب برای سرمایه‌گذاران و تصمیم‌گیرندگانی که تصمیم‌هایشان از
                  تغییرات اقتصاد و بازار اثر می‌پذیرد.
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DECISION ENVIRONMENT VISUAL
============================================================================= */

function DecisionEnvironmentVisual() {
  return (
    <div
      role="img"
      aria-label="محیط اقتصادی و بازار شامل تورم، ارز، نقدینگی و شرایط بازار بررسی می‌شود؛ سپس سناریوهای مرتبط و پیامد آن‌ها برای تصمیم مالی تحلیل می‌شوند."
      className="
        relative
        mx-auto
        w-full
        max-w-[670px]
      "
    >
      <div
        className="
          relative
          overflow-hidden

          border
          border-white/12

          bg-white/[0.025]

          shadow-[0_38px_110px_rgba(0,0,0,.17)]
        "
      >
        {/* =============================================================
            VISUAL HEADER
        ============================================================== */}

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
                text-[15px]
                font-black
                text-white/88
              "
            >
              محیط تصمیم
            </p>

            <p
              className="
                mt-1.5

                text-[13px]
                font-medium
                text-white/42
              "
            >
              اقتصاد و بازار، زمینه تصمیم را شکل می‌دهند.
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
            <span className="h-[6px] w-[6px] bg-[#82cee4]/75" />

            <span className="h-px w-10 bg-white/15" />

            <span className="h-[6px] w-[6px] bg-brand-accent" />
          </div>
        </div>

        {/* =============================================================
            CONTENT
        ============================================================== */}

        <div
          className="
            relative

            px-5
            py-7

            sm:px-6
            sm:py-8
          "
        >
          {/* ===========================================================
              1. ENVIRONMENT
          ============================================================ */}

          <div
            className="
              relative

              border
              border-[#82cee4]/22

              bg-[#063746]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-b
                border-white/[0.08]

                px-5
                py-4
              "
            >
              <div>
                <h2
                  className="
                    text-[16px]
                    font-black
                    text-white
                  "
                >
                  محیط اقتصادی و بازار
                </h2>

                <p
                  className="
                    mt-1.5

                    text-[13px]
                    font-medium
                    leading-6

                    text-white/45
                  "
                >
                  متغیرهایی که می‌توانند شرایط تصمیم را تغییر دهند.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  h-[7px]
                  w-[7px]

                  shrink-0

                  bg-[#82cee4]/75
                "
              />
            </div>

            {/* factors — one unified structure, not separate cards */}

            <div
              className="
                grid
                grid-cols-2

                sm:grid-cols-4
              "
            >
              {ENVIRONMENT_FACTORS.map((factor, index) => (
                <EnvironmentFactor key={factor} title={factor} index={index} />
              ))}
            </div>
          </div>

          <FlowConnector />

          {/* ===========================================================
              2. SCENARIOS
          ============================================================ */}

          <div
            className="
              relative

              mx-auto
              max-w-[480px]

              border
              border-white/14

              bg-white/[0.025]

              px-5
              py-5

              text-center

              sm:px-6
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-6
                w-px

                bg-[#82cee4]/60
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-px
                w-6

                bg-[#82cee4]/60
              "
            />

            <p
              className="
                text-[16px]
                font-black
                text-white/90
              "
            >
              سناریوهای مرتبط
            </p>

            <p
              className="
                mt-2

                text-[14px]
                font-medium
                leading-7

                text-white/48
              "
            >
              چند وضعیت قابل بررسی، نه یک پیش‌بینی قطعی.
            </p>
          </div>

          <FlowConnector accent />

          {/* ===========================================================
              3. STRATEGIC IMPLICATION
          ============================================================ */}

          <div
            className="
              relative

              mx-auto
              max-w-[540px]

              border
              border-brand-accent/65

              bg-brand-accent/[0.045]

              px-5
              py-5

              sm:px-6
              sm:py-6
            "
          >
            {/* Orange corner */}

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-8
                w-[2px]

                bg-brand-accent
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-[2px]
                w-8

                bg-brand-accent
              "
            />

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
                  h-[9px]
                  w-[9px]

                  shrink-0

                  bg-brand-accent

                  shadow-[0_0_24px_rgba(252,133,2,.26)]

                  dnh-macro-focus
                "
              />

              <div>
                <p
                  className="
                    text-[17px]
                    font-black
                    text-white
                  "
                >
                  پیامد برای تصمیم
                </p>

                <p
                  className="
                    mt-2

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/52
                  "
                >
                  هر سناریو از زاویه اثر آن بر تصمیم مالی بررسی می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dnhMacroFocus {
          0%,
          100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        .dnh-macro-focus {
          animation:
            dnhMacroFocus
            3.4s
            ease-in-out
            infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-macro-focus {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* =============================================================================
   ENVIRONMENT FACTOR
============================================================================= */

function EnvironmentFactor({ title, index }: { title: string; index: number }) {
  return (
    <div
      className={`
        relative

        flex
        min-h-[76px]
        items-center
        justify-center

        px-3

        text-center

        ${index % 2 === 0 ? "border-l border-white/[0.075] sm:border-l" : ""}

        ${index < 2 ? "border-b border-white/[0.075] sm:border-b-0" : ""}

        sm:border-l
        sm:last:border-l-0
      `}
    >
      <div
        className="
          flex
          items-center
          gap-2.5
        "
      >
        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            shrink-0

            bg-[#82cee4]/65
          "
        />

        <span
          className="
            text-[14px]
            font-black
            text-white/72
          "
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   FLOW CONNECTOR
============================================================================= */

function FlowConnector({ accent = false }: { accent?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        mx-auto
        flex
        h-12
        w-8

        items-center
        justify-center
      "
    >
      <span
        className={`
          absolute
          inset-y-0
          left-1/2

          w-px
          -translate-x-1/2

          ${accent ? "bg-brand-accent/45" : "bg-[#82cee4]/25"}
        `}
      />

      <span
        className="
          relative
          z-10

          flex
          h-7
          w-7

          items-center
          justify-center

          border
          border-white/10

          bg-[#022f3e]
        "
      >
        <ArrowDown
          className={
            accent
              ? "h-3.5 w-3.5 text-brand-accent"
              : "h-3.5 w-3.5 text-[#82cee4]/70"
          }
          strokeWidth={1.6}
        />
      </span>
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
            "radial-gradient(circle at 26% 46%,rgba(22,115,148,.24),transparent 31%),radial-gradient(circle at 73% 74%,rgba(252,133,2,.025),transparent 21%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.05]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[38%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
