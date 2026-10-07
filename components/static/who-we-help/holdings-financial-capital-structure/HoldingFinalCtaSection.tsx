import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   HOLDING — FINAL CTA

   Final section before Footer.
   Dark / minimal / executive.

   No diagram.
   No repeated explanation.
   One clear next step.
============================================================================= */

export function HoldingFinalCtaSection() {
  return (
    <section
      id="holding-cta"
      dir="rtl"
      aria-labelledby="holding-cta-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        py-20

        sm:scroll-mt-28
        sm:py-24

        lg:py-24
      "
    >
      <SectionBackground />

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
            grid
            gap-10

            lg:grid-cols-[1fr_auto]
            lg:items-end
            lg:gap-16
          "
        >
          {/* =========================================================
              MESSAGE
          ========================================================== */}

          <div className="max-w-[980px]">
            <div className="mb-5 flex items-center gap-3">
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

                  text-white/62
                "
              >
                قدم بعدی
              </p>
            </div>

            <h2
              id="holding-cta-title"
              className="
                max-w-[950px]
                [text-wrap:balance]

                text-[31px]
                font-black
                leading-[1.72]
                tracking-[-0.05em]

                text-white

                sm:text-[39px]

                lg:text-[47px]
                lg:leading-[1.58]

                xl:text-[51px]
              "
            >
              اگر تصمیم‌های مالی گروه به هم مرتبط‌اند،{" "}
              <span className="text-brand-accent">
                تصویر تصمیم هم باید یکپارچه باشد.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[730px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-white/62

                sm:text-[16px]
              "
            >
              ارزیابی راهبردی کمک می‌کند ساختار مالی، گزینه‌های قابل بررسی،
              ریسک‌ها و مسیر تصمیم در یک تصویر روشن‌تر کنار هم قرار بگیرند.
            </p>
          </div>

          {/* =========================================================
              ACTIONS
          ========================================================== */}

          <div
            className="
              flex
              w-full
              flex-col
              gap-3

              lg:w-auto
              lg:min-w-[315px]
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

                lg:min-w-[315px]
              "
            >
              شروع ارزیابی راهبردی مالی
            </ActionButton>

            <ActionButton
              href="/request-strategic-consultation"
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
                hover:border-white/34
                hover:bg-white/[0.055]
                hover:text-white

                lg:min-w-[315px]
              "
            >
              درخواست مشاوره راهبردی
            </ActionButton>
          </div>
        </div>

        {/* ===========================================================
            CLOSING LINE
        ============================================================ */}

        <div
          className="
            mt-14

            grid
            gap-5

            border-t
            border-white/[0.09]

            pt-5

            sm:grid-cols-[auto_1fr]
            sm:items-start
            sm:gap-5

            lg:mt-16
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[9px]

              hidden
              h-[7px]
              w-[7px]

              shrink-0

              bg-brand-accent

              sm:block
            "
          />

          <p
            className="
              max-w-[920px]

              text-[14px]
              font-medium
              leading-7

              text-white/44

              sm:text-[15px]
            "
          >
            هدف، ارائه یک پاسخ آماده نیست؛{" "}
            <span className="font-bold text-white/72">
              هدف این است که ساختار مالی، گزینه‌ها، ریسک‌ها و مسیر تصمیم واضح‌تر
              دیده شوند.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
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
            "radial-gradient(circle at 72% 40%,rgba(22,115,148,.23),transparent 31%),radial-gradient(circle at 17% 74%,rgba(252,133,2,.028),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

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
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[12%]
          top-0

          hidden
          h-[76px]
          w-px

          bg-brand-accent/30

          lg:block
        "
      />
    </>
  );
}
