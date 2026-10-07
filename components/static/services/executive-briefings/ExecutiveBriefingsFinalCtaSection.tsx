import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   EXECUTIVE BRIEFINGS — FINAL CTA

   Dark
   Executive
   Compact
   No decorative visual
============================================================================= */

export function ExecutiveBriefingsFinalCtaSection() {
  return (
    <section
      id="executive-briefings-cta"
      dir="rtl"
      aria-labelledby="executive-briefings-cta-title"
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
        

        {/* ===========================================================
            MAIN
        ============================================================ */}

        <div
          className="
            grid
            gap-10

            lg:grid-cols-[1fr_auto]
            lg:items-end
            lg:gap-16
          "
        >
          {/* COPY */}

          <div className="max-w-[980px]">
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

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
              id="executive-briefings-cta-title"
              className="
                max-w-[960px]
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
              اگر یک موضوع مهم نیاز به جمع‌بندی در سطح مدیریت ارشد دارد،{" "}
              <span className="text-brand-accent">
                آن را متمرکز روی میز تصمیم بگذارید.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[730px]

                text-[15px]
                font-medium
                leading-[2.1]

                text-white/52

                sm:text-[16px]
              "
            >
              بریفینگ اجرایی برای زمانی است که تصمیم‌گیرنده باید بدون پراکندگی،
              نکات کلیدی، سناریوهای مرتبط و مسیرهای قابل بررسی را در یک تصویر
              حرفه‌ای ببیند.
            </p>
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              w-full
              flex-col
              gap-3

              lg:w-auto
              lg:min-w-[305px]
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

                lg:min-w-[305px]
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

                border-white/18
                bg-white/[0.025]

                text-white

                shadow-none

                hover:-translate-y-0.5
                hover:border-white/35
                hover:bg-white/[0.055]
                hover:text-white

                lg:min-w-[305px]
              "
            >
              درخواست بریفینگ اجرایی
            </ActionButton>
          </div>
        </div>

        {/* ===========================================================
            CLOSING STATEMENT
        ============================================================ */}

        <div
          className="
            mt-14

            flex
            items-start
            gap-4

            border-t
            border-white/[0.09]

            pt-5

            lg:mt-16
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[9px]

              h-[7px]
              w-[7px]

              shrink-0

              bg-brand-accent
            "
          />

          <p
            className="
              max-w-[790px]

              text-[14px]
              font-medium
              leading-7

              text-white/42

              sm:text-[15px]
            "
          >
            هدف، افزایش حجم گزارش نیست؛{" "}
            <span className="text-white/68">
              هدف، روشن‌تر شدن نکات کلیدی، سناریوها و مسیرهای قابل بررسی برای
              ادامه تصمیم است.
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
            "radial-gradient(circle at 70% 44%,rgba(22,115,148,.22),transparent 31%),radial-gradient(circle at 18% 78%,rgba(252,133,2,.025),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
    </>
  );
}
