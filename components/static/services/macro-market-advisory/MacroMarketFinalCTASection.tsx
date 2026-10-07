import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   MACRO & MARKET ADVISORY — FINAL CTA

   Dark
   Compact
   Typography-led
   No large visual
   No microcopy
============================================================================= */

export function MacroMarketFinalCTASection() {
  return (
    <section
      id="macro-market-cta"
      dir="rtl"
      aria-labelledby="macro-market-cta-title"
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
      <FinalBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            relative

            flex
            min-h-[520px]
            flex-col
            justify-center

            py-20

            sm:min-h-[560px]
            sm:py-24

            lg:min-h-[590px]
            lg:py-24
          "
        >
          {/* ===========================================================
              CONTENT
          ============================================================ */}

          <div className="max-w-[1050px]">
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
                  w-9

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[12px]
                  font-black

                  text-white/62
                "
              >
                قدم بعدی
              </p>
            </div>

            {/* Heading */}

            <h2
              id="macro-market-cta-title"
              className="
                max-w-[980px]
                [text-wrap:balance]

                text-[32px]
                font-black
                leading-[1.72]
                tracking-[-0.05em]

                text-white

                sm:text-[40px]

                lg:text-[49px]
                lg:leading-[1.58]

                xl:text-[54px]
              "
            >
              اگر محیط تصمیم تغییر کرده است،{" "}
              <span className="text-brand-accent">
                قبل از اقدام، تصویر را دوباره ببینید.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-[720px]

                text-[15px]
                font-medium
                leading-[2.1]

                text-white/52

                sm:text-[16px]
              "
            >
              پیش از یک تصمیم مهم، بررسی دوباره شرایط اقتصادی، سناریوهای مرتبط و
              پیامدهای احتمالی می‌تواند تصویر دقیق‌تری از مسیرهای پیش رو ایجاد
              کند.
            </p>

            {/* Actions */}

            <div
              className="
                mt-9

                flex
                flex-col
                gap-3

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
                  sm:min-w-[280px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href="/request-strategic-consultation"
                variant="secondary"
                size="lg"
                icon={ArrowUpLeft}
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
                  sm:min-w-[245px]
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>
            </div>
          </div>

          {/* ===========================================================
              CLOSING RAIL
          ============================================================ */}

          <div
            className="
              mt-14

              flex
              items-center
              justify-between
              gap-6

              border-t
              border-white/[0.09]

              pt-5

              sm:mt-16
              lg:mt-18
            "
          >
            <p
              className="
                max-w-[760px]

                text-[14px]
                font-medium
                leading-7

                text-white/38
              "
            >
              هدف این بررسی، پیش‌بینی قطعی بازار نیست؛ هدف، فهم بهتر شرایط و
              پیامدهای تصمیم در سناریوهای مختلف است.
            </p>

            <div
              aria-hidden="true"
              className="
                hidden
                shrink-0
                items-center
                gap-2

                sm:flex
              "
            >
              <span className="h-[6px] w-[6px] bg-[#82cee4]/55" />

              <span className="h-px w-10 bg-white/10" />

              <span className="h-[6px] w-[6px] bg-brand-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function FinalBackground() {
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
            "radial-gradient(circle at 78% 46%,rgba(22,115,148,.22),transparent 30%),radial-gradient(circle at 18% 78%,rgba(252,133,2,.028),transparent 20%),linear-gradient(116deg,#022936 0%,#033847 54%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.045]
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
          top-[40%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
