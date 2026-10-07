import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   UNSTRUCTURED PORTFOLIO — FINAL CTA

   Dark / minimal / conversion-focused

   One message:
   Multiple assets are not enough.
   If the whole picture is unclear, review the structure.
============================================================================= */

export function UnstructuredPortfolioFinalCtaSection() {
  return (
    <section
      id="unstructured-portfolio-cta"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-cta-title"
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
          {/* ===========================================================
              COPY
          ============================================================ */}

          <div className="max-w-[950px]">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-white/64
                "
              >
                قدم بعدی
              </p>
            </div>

            <h2
              id="unstructured-portfolio-cta-title"
              className="
                max-w-[930px]
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
              اگر دارایی‌ها متعددند اما تصویر کل روشن نیست،{" "}
              <span className="text-brand-accent">
                ساختار پرتفوی را بازبینی کنید.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[720px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-white/62

                sm:text-[16px]
              "
            >
              ارزیابی اولیه کمک می‌کند ساختار پرتفوی، نقاط قابل توجه و بخش‌هایی
              که نیاز به بازبینی بیشتری دارند روشن‌تر شوند.
            </p>
          </div>

          {/* ===========================================================
              ACTIONS
          ============================================================ */}

          <div
            className="
              flex
              w-full
              flex-col
              gap-3

              lg:w-auto
              lg:min-w-[310px]
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

                lg:min-w-[310px]
              "
            >
              شروع ارزیابی ساختار پرتفوی
            </ActionButton>

            <ActionButton
              href="/services/portfolio-intelligence"
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

                lg:min-w-[310px]
              "
            >
              آشنایی با هوشمندی پرتفوی
            </ActionButton>
          </div>
        </div>

        {/* =============================================================
            CLOSING NOTE
        ============================================================== */}

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
              max-w-[850px]

              text-[14px]
              font-medium
              leading-7

              text-white/45

              sm:text-[15px]
            "
          >
            هدف، پیچیده‌تر کردن پرتفوی نیست؛{" "}
            <span className="text-white/72">
              هدف این است که بدانید چه دارید، ریسک کجاست و کدام بخش‌ها نیاز به
              بازبینی دارند.
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
            "radial-gradient(circle at 70% 42%,rgba(22,115,148,.23),transparent 31%),radial-gradient(circle at 16% 76%,rgba(252,133,2,.025),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
    </>
  );
}
