import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   RISK MANAGEMENT & WEALTH PROTECTION — HERO

   Core visual idea:
   Visible structure
   ↓
   Hidden risk exposures inside the structure
   ↓
   Structured risk picture + protection priorities

   Server Component
   No client JS
   No tiny microcopy
============================================================================= */

const HIDDEN_RISKS = ["تمرکز", "نقدشوندگی", "ریسک ارز", "ریسک تورم"] as const;

export function RiskManagementHero() {
  return (
    <section
      id="risk-protection-intro"
      dir="rtl"
      aria-labelledby="risk-protection-hero-title"
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

            lg:grid-cols-[1.04fr_0.96fr]
            lg:gap-16
            lg:py-8

            xl:gap-20
          "
        >
          {/* ============================================================
              VISUAL
          ============================================================ */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <HiddenRiskVisual />
          </div>

          {/* ============================================================
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
                  className="h-px w-10 bg-brand-accent"
                />

                <p
                  className="
                    text-[12px]
                    font-black
                    text-white/68
                  "
                >
                  مدیریت ریسک و حفاظت از ثروت DNH
                </p>
              </div>

              {/* H1 */}

              <h1
                id="risk-protection-hero-title"
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

                   
                "
              >
                مدیریت ریسک و حفاظت از ثروت؛
                <br />
                برای{" "}
                <span className="text-brand-accent">
                  دیدن ریسک‌هایی که ممکن است در ساختار پنهان بمانند.
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

                  text-white/58

                  sm:text-[16px]
                "
              >
                ریسک همیشه به شکل یک بحران آشکار دیده نمی‌شود. تمرکز، نقدشوندگی،
                ارز و تورم می‌توانند درون ساختار ثروت یا کسب‌وکار قرار بگیرند و
                تا زمان تصمیم یا فشار مالی، کمتر دیده شوند.
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
                  href="#risk-protection-context"
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
                    hover:border-white/38
                    hover:bg-white/[0.06]
                    hover:text-white

                    sm:w-auto
                    sm:min-w-[230px]
                  "
                >
                  ریسک‌ها کجا پنهان می‌شوند؟
                </ActionButton>
              </div>

              {/* Audience */}

              <div
                className="
                  order-4
                  mt-0
                  max-w-[720px]

                  border-r-2
                  border-[#82cee4]/38

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

                    text-white/46
                  "
                >
                  مناسب برای افراد، خانواده‌ها، صاحبان سرمایه و کسب‌وکارهایی که
                  می‌خواهند ریسک‌های ساختاری را پیش از تصمیم‌های مهم روشن‌تر
                  ببینند.
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   HIDDEN RISK VISUAL
============================================================================= */

function HiddenRiskVisual() {
  return (
    <div
      role="img"
      aria-label="نمایش ساختار ثروت یا کسب‌وکار و ریسک‌های پنهان شامل تمرکز، نقدشوندگی، ارز و تورم که باید برای تعیین اولویت‌های حفاظتی بررسی شوند."
      className="
        relative
        mx-auto
        w-full
        max-w-[650px]
      "
    >
      <div
        className="
          relative
          overflow-hidden

          border
          border-white/12

          bg-white/[0.025]

          shadow-[0_36px_100px_rgba(0,0,0,.18)]
        "
      >
        {/* =============================================================
            SURFACE
        ============================================================== */}

        <div
          className="
            relative

            border-b
            border-white/10

            px-5
            py-6

            sm:px-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-6
            "
          >
            <div>
              <p
                className="
                  text-[14px]
                  font-black
                  text-white/52
                "
              >
                آنچه در نگاه اول دیده می‌شود
              </p>

              <p
                className="
                  mt-2

                  text-[20px]
                  font-black

                  text-white
                "
              >
                ساختار ثروت / کسب‌وکار
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                h-[8px]
                w-[8px]

                shrink-0

                border
                border-[#82cee4]/65

                bg-[#82cee4]/15
              "
            />
          </div>
        </div>

        {/* =============================================================
            HIDDEN LAYER
        ============================================================== */}

        <div
          className="
            relative

            bg-black/[0.07]

            px-5
            py-6

            sm:px-6
          "
        >
          {/* divider / reveal line */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-[2px]
                w-10

                bg-brand-accent
              "
            />

            <p
              className="
                text-[15px]
                font-black

                text-brand-accent
              "
            >
              ریسک‌هایی که ممکن است زیر سطح ساختار پنهان بمانند
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-2

              border
              border-white/10

              sm:grid-cols-4
            "
          >
            {HIDDEN_RISKS.map((risk) => (
              <RiskCell key={risk} title={risk} />
            ))}
          </div>

          {/* ===========================================================
              OUTCOME
          ============================================================ */}

          <div
            className="
              relative

              mt-5

              border
              border-brand-accent/35

              bg-brand-accent/[0.035]

              px-5
              py-5
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-7
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
                w-7

                bg-brand-accent
              "
            />

            <div
              className="
                grid
                gap-4

                sm:grid-cols-2
                sm:items-center
              "
            >
              <div>
                <p
                  className="
                    text-[14px]
                    font-black

                    text-white/55
                  "
                >
                  تصویر ساختاریافته ریسک‌ها
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4

                  sm:justify-end
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    hidden
                    h-px
                    w-10

                    bg-brand-accent/35

                    sm:block
                  "
                />

                <p
                  className="
                    text-[17px]
                    font-black

                    text-white
                  "
                >
                  اولویت‌های حفاظتی
                </p>

                <span
                  aria-hidden="true"
                  className="
                    h-[8px]
                    w-[8px]

                    shrink-0

                    bg-brand-accent

                    shadow-[0_0_22px_rgba(252,133,2,.24)]

                    dnh-risk-focus
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dnhRiskFocus {
          0%,
          100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }

        .dnh-risk-focus {
          animation: dnhRiskFocus 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-risk-focus {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* =============================================================================
   RISK CELL
============================================================================= */

function RiskCell({ title }: { title: string }) {
  return (
    <div
      className="
        flex
        min-h-[72px]
        items-center
        justify-center

        border-b
        border-l
        border-white/[0.075]

        px-3

        text-center

        sm:border-b-0
      "
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
            leading-6

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
            "radial-gradient(circle at 28% 46%,rgba(22,115,148,.24),transparent 31%),radial-gradient(circle at 73% 76%,rgba(252,133,2,.028),transparent 20%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
