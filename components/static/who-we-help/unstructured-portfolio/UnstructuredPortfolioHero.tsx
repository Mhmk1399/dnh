import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   WHO WE HELP — UNSTRUCTURED PORTFOLIO HERO

   Core idea:
   Multiple assets ≠ coherent portfolio

   Dark / readable / problem-first landing
============================================================================= */

const PORTFOLIO_FRAGMENTS = [
  { label: "دارایی ۰۱", width: "w-[72%]" },
  { label: "دارایی ۰۲", width: "w-[91%]" },
  { label: "دارایی ۰۳", width: "w-[58%]" },
  { label: "دارایی ۰۴", width: "w-[82%]" },
] as const;

export function UnstructuredPortfolioHero() {
  return (
    <section
      id="unstructured-portfolio-intro"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-title"
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

            lg:grid-cols-[1fr_0.96fr]
            lg:gap-16
            lg:py-8

            xl:gap-20
          "
        >
          {/* ===========================================================
              CONTENT
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
              <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-white/70
                "
              >
                پرتفوی پراکنده و بدون معماری
              </p>
            </div>

            <h1
              id="unstructured-portfolio-title"
              className="
                max-w-[880px]

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
              دارایی‌های متعدد دارید؛
              <br />
              <span className="text-brand-accent">
                اما آیا واقعاً یک پرتفوی دارید؟
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[720px]

                text-[15px]
                font-medium
                leading-[2.1]

                text-white/67

                sm:text-[16px]
              "
            >
              داشتن دارایی‌های مختلف، به‌تنهایی یک ساختار منسجم ایجاد نمی‌کند.
              اگر ارتباط و منطق کلی میان دارایی‌ها روشن نباشد، ممکن است آنچه
              شبیه یک پرتفوی دیده می‌شود، فقط مجموعه‌ای از دارایی‌های پراکنده
              باشد.
              </p>
            </div>

            {/* =========================================================
                CTA
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
                  sm:min-w-[255px]
                "
              >
                ارزیابی ساختار پرتفوی
              </ActionButton>

              <ActionButton
                href="#unstructured-portfolio-signs"
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
                  sm:min-w-[245px]
                "
              >
                نشانه‌های پرتفوی بدون ساختار
              </ActionButton>
            </div>

            {/* =========================================================
                AUDIENCE
            ========================================================== */}

            <div
              className="
                order-4
                mt-0
                max-w-[700px]

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
                برای افرادی که دارایی‌های متنوع دارند، اما هنوز ساختار و منطق
                یکپارچه‌ای برای پرتفوی خود نمی‌بینند.
              </p>
            </div>
          </div>

          {/* ===========================================================
              VISUAL
          ============================================================ */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <PortfolioFragmentVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PORTFOLIO FRAGMENT VISUAL
============================================================================= */

function PortfolioFragmentVisual() {
  return (
    <div
      aria-labelledby="portfolio-fragment-title"
      className="
        relative

        mx-auto
        w-full
        max-w-[620px]

        border
        border-white/14

        bg-white/[0.022]

        shadow-[0_36px_100px_rgba(0,0,0,.22)]
      "
    >
      {/* =============================================================
          HEADER
      ============================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-5
          py-4

          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[13px]
              font-black
              text-white/42
            "
          >
            وضعیت فعلی
          </p>

          <h2
            id="portfolio-fragment-title"
            className="
              mt-1

              text-[18px]
              font-black

              text-white
            "
          >
            دارایی‌ها وجود دارند.
          </h2>
        </div>

        <span
          aria-hidden="true"
          className="
            h-[8px]
            w-[8px]

            shrink-0

            bg-brand-accent
          "
        />
      </div>

      {/* =============================================================
          FRAGMENTS
      ============================================================== */}

      <div
        className="
          relative

          px-5
          py-6

          sm:px-6
          sm:py-7
        "
      >
        <div className="space-y-3">
          {PORTFOLIO_FRAGMENTS.map((item, index) => (
            <AssetFragment
              key={item.label}
              label={item.label}
              width={item.width}
              offset={index % 2 === 1}
            />
          ))}
        </div>

        {/* -----------------------------------------------------------
            GAP
        ------------------------------------------------------------ */}

        <div
          className="
            my-6

            flex
            items-center
            gap-4
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              flex-1

              bg-white/10
            "
          />

          <p
            className="
              text-[14px]
              font-black

              text-white/38
            "
          >
            اما ساختار؟
          </p>

          <span
            aria-hidden="true"
            className="
              h-px
              flex-1

              bg-white/10
            "
          />
        </div>

        {/* -----------------------------------------------------------
            STRUCTURE QUESTION
        ------------------------------------------------------------ */}

        <div
          className="
            relative

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
              inset-y-0
              right-[-1px]

              w-[2px]

              bg-brand-accent
            "
          />

          <p
            className="
              text-[19px]
              font-black
              leading-8

              text-white

              sm:text-[21px]
            "
          >
            آیا بین این دارایی‌ها یک منطق واحد وجود دارد؟
          </p>

          <p
            className="
              mt-2

              text-[14px]
              font-medium
              leading-7

              text-white/58
            "
          >
            وجود چند دارایی با داشتن یک پرتفوی منسجم یکسان نیست.
          </p>
        </div>
      </div>

      {/* =============================================================
          BOTTOM STATEMENT
      ============================================================== */}

      <div
        className="
          flex
          items-start
          gap-4

          border-t
          border-white/10

          bg-black/[0.06]

          px-5
          py-4

          sm:px-6
        "
      >
        <span
          aria-hidden="true"
          className="
            mt-[9px]

            h-[7px]
            w-[7px]

            shrink-0

            bg-[#82cee4]/60
          "
        />

        <p
          className="
            text-[14px]
            font-medium
            leading-7

            text-white/50
          "
        >
          مسئله، تعداد دارایی‌ها نیست؛{" "}
          <span className="font-bold text-white/75">
            مسئله، نبود تصویر یکپارچه از آن‌هاست.
          </span>
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   ASSET FRAGMENT
============================================================================= */

function AssetFragment({
  label,
  width,
  offset = false,
}: {
  label: string;
  width: string;
  offset?: boolean;
}) {
  return (
    <div
      className={`
        ${width}
        ${offset ? "mr-auto" : "ml-auto"}

        relative

        border
        border-white/10

        bg-white/[0.025]

        px-4
        py-3

        transition-[border-color,background-color,transform]
        duration-300

        hover:-translate-y-0.5
        hover:border-white/20
        hover:bg-white/[0.04]
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            text-[14px]
            font-black

            text-white/72
          "
        >
          {label}
        </p>

        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            bg-[#82cee4]/45
          "
        />
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
            "radial-gradient(circle at 24% 44%,rgba(22,115,148,.25),transparent 30%),radial-gradient(circle at 80% 72%,rgba(252,133,2,.03),transparent 20%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
          inset-x-0
          top-[54%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
