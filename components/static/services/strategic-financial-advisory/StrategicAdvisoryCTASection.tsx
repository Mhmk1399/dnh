import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY — FINAL CTA

   Dark
   Typography-led
   No large visual
   Server Component
============================================================================= */

export function StrategicAdvisoryCTASection() {
  return (
    <section
      id="strategic-advisory-cta"
      dir="rtl"
      aria-labelledby="strategic-advisory-cta-title"
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
      <CTABackground />

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
            min-h-[620px]
            flex-col
            justify-center

            py-24

            sm:min-h-[660px]
            sm:py-28

            lg:min-h-[700px]
            lg:py-32
          "
        >
          {/* ===========================================================
              CONTENT
          ============================================================ */}

          <div className="relative max-w-[1080px]">
            {/* Eyebrow */}

            <div
              className="
                mb-6
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

                  text-white/58

                  sm:text-[11px]
                "
              >
                قدم بعدی
              </p>
            </div>

            {/* ===========================================================
                HEADING
            ============================================================ */}

            <h2
              id="strategic-advisory-cta-title"
              className="
                max-w-[1050px]
                [text-wrap:balance]

                text-[34px]
                font-black
                leading-[1.72]
                tracking-[-0.05em]

                text-white

                sm:text-[43px]

                lg:text-[52px]
                lg:leading-[1.58]

                xl:text-[58px]
              "
            >
              اگر مسیر تصمیم هنوز روشن نیست،{" "}
              <span className="text-brand-accent">
                از ارزیابی اولیه شروع کنید.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-[720px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/50

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              پیش از ورود به یک تصمیم مالی مهم، لازم است مسئله، شرایط و مسیرهای
              پیش رو روشن‌تر شوند. ارزیابی اولیه، نقطه شروع برای شناخت مسئله و
              تشخیص مسیر مناسب است.
            </p>

            {/* ===========================================================
                ACTIONS
            ============================================================ */}

            <div
              className="
                mt-10

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
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

                  shadow-[0_18px_48px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[285px]
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

                  border-white/20
                  bg-white/[0.025]

                  text-white

                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/38
                  hover:bg-white/[0.06]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[250px]
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>
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

function CTABackground() {
  return (
    <>
      {/* base */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 78% 48%,rgba(22,115,148,.23),transparent 31%),radial-gradient(circle at 22% 72%,rgba(252,133,2,.035),transparent 22%),linear-gradient(116deg,#022936 0%,#033847 54%,#022d3a 100%)",
        }}
      />

      {/* quiet vertical architecture */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* quiet horizontal rule */}

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

      {/* orange atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          -left-[120px]
          bottom-[-160px]

          h-[380px]
          w-[380px]

          rounded-full

          bg-brand-accent/[0.025]

          blur-[110px]
        "
      />
    </>
  );
}
