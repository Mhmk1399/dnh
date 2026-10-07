import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   PORTFOLIO FINAL CTA
   Server Component
============================================================================= */

export function PortfolioFinalCtaSection() {
  return (
    <section
      id="portfolio-cta"
      dir="rtl"
      aria-labelledby="portfolio-cta-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden

        bg-[#022f3e]
        text-white

        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative z-10

          mx-auto
          w-full max-w-[1536px]

          px-5 py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28

          2xl:px-20
        "
      >
        <div
          className="
            mx-auto
            max-w-[1250px]
          "
        >
          {/* =====================================================
              Eyebrow
          ====================================================== */}

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

                text-white/55

                sm:text-[11px]
              "
            >
              قدم بعدی
            </span>
          </div>

          {/* =====================================================
              Main statement
          ====================================================== */}

          <h2
            id="portfolio-cta-title"
            className="
              mt-6
              max-w-[1120px]

              text-[34px]
              font-black
              leading-[1.7]
              tracking-[-0.05em]

              text-white

              [text-wrap:balance]

              sm:text-[42px]

              lg:text-[50px]
              lg:leading-[1.55]

              xl:text-[56px]
            "
          >
            اگر ساختار پرتفوی هنوز روشن نیست،{" "}
            <span className="text-brand-accent">از بازبینی شروع کنید.</span>
          </h2>

          {/* =====================================================
              Supporting row
          ====================================================== */}

          <div
            className="
              mt-8

              grid
              gap-8

              border-t
              border-white/10

              pt-7

              lg:grid-cols-[1fr_auto]
              lg:items-end
              lg:gap-16
            "
          >
            <div>
              <p
                className="
                  max-w-[650px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/46

                  sm:text-[14px]
                  lg:text-[15px]
                "
              >
                ارزیابی اولیه کمک می‌کند مسئله، نقاط قابل توجه و تناسب مسیر
                بررسی پیش از ورود به تحلیل تخصصی روشن‌تر شود.
              </p>

              <p
                className="
                  mt-4
                  max-w-[620px]

                  text-[11px]
                  font-medium
                  leading-[2]

                  text-white/22
                "
              >
                ارزیابی اولیه به‌معنای پذیرش خودکار پرونده یا آغاز همکاری نیست؛
                ابتدا تناسب و دامنه مسئله بررسی می‌شود.
              </p>
            </div>

            {/* =================================================
                CTAs
            ================================================== */}

            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap

                lg:justify-end
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
                  hover:shadow-[0_24px_58px_rgba(252,133,2,.24)]

                  sm:w-auto
                  sm:min-w-[270px]
                "
              >
                شروع ارزیابی اولیه پرتفوی
              </ActionButton>

              <ActionButton
                href="/request-strategic-consultation"
                variant="secondary"
                size="lg"
                icon={ArrowUpLeft}
                className="
                  w-full

                  border-white/16
                  bg-transparent

                  text-white
                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/30
                  hover:bg-white/[0.05]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[225px]
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
   SIGNAL
============================================================================= */

function Signal({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`
        text-[9px]
        font-black

        ${active ? "text-brand-accent" : "text-white/27"}
      `}
    >
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-white/13
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
            "radial-gradient(circle at 15% 48%,rgba(22,115,148,.14),transparent 28%),linear-gradient(116deg,#022936 0%,#033746 56%,#022b38 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.028]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "128px 100%",
        }}
      />

 

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-16
          -left-4

          select-none

          text-[140px]
          font-black
          leading-none

          text-white/[0.012]

          sm:text-[190px]
          lg:text-[250px]
        "
      >
        DNH
      </span>
    </>
  );
}
