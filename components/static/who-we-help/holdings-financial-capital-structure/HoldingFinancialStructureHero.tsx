import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   WHO WE HELP — HOLDING / FINANCIAL STRUCTURE HERO

   Core idea:
   A holding's financial decisions should not be viewed in isolation.

   The hero shows one management decision frame with five visible dimensions:
   - Financial Structure
   - Liquidity
   - Financing
   - Capital Allocation
   - Risk & Group Objectives

   Dark / institutional / readable
============================================================================= */

const FINANCIAL_AREAS = [
  {
    title: "ساختار مالی",
    text: "منابع و تعهدات چگونه در سطح گروه قرار گرفته‌اند؟",
  },
  {
    title: "نقدینگی",
    text: "منابع در کجا هستند و چه میزان از آن‌ها در دسترس‌اند؟",
  },
  {
    title: "تأمین مالی",
    text: "نیازهای مالی چگونه با ساختار موجود ارتباط پیدا می‌کنند؟",
  },
  {
    title: "تخصیص سرمایه",
    text: "سرمایه در کدام بخش‌ها به‌کار گرفته شده است؟",
  },
  {
    title: "ریسک و اهداف گروه",
    text: "هر تصمیم با چه محدودیت‌ها و اولویت‌هایی روبه‌رو است؟",
  },
] as const;

export function HoldingFinancialStructureHero() {
  return (
    <section
      id="holding-financial-structure-intro"
      dir="rtl"
      aria-labelledby="holding-financial-structure-title"
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

            lg:grid-cols-[0.96fr_1.04fr]
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
                برای هلدینگ‌ها، گروه‌های شرکتی و کسب‌وکارهای خانوادگی
              </p>
            </div>

            <h1
              id="holding-financial-structure-title"
              className="
                max-w-[900px]

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
              تصمیم مالی در سطح گروه،
              <br />
              <span className="text-brand-accent">
                فقط یک عدد یا یک شرکت نیست.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[740px]

                text-[15px]
                font-medium
                leading-[2.1]

                text-white/67

                sm:text-[16px]
              "
            >
              ساختار مالی، نقدینگی، تأمین مالی و تخصیص سرمایه باید در کنار ریسک
              و اهداف کل گروه دیده شوند؛ چون یک تصمیم در یک بخش می‌تواند روی
              تصویر مالی بخش‌های دیگر هم اثر بگذارد.
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
                  sm:min-w-[270px]
                "
              >
                شروع ارزیابی راهبردی مالی
              </ActionButton>

              <ActionButton
                href="#holding-financial-pressure"
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
                  sm:min-w-[250px]
                "
              >
                چه چیزهایی باید کنار هم دیده شوند؟
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
                برای صاحبان کسب‌وکار، هلدینگ‌ها و گروه‌هایی که تصمیم‌های
                سرمایه‌ای، مالی و نقدینگی آن‌ها به یکدیگر وابسته است.
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
            <FinancialDecisionFrame />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   FINANCIAL DECISION FRAME

   No flowchart.
   No fake numbers.
   No meaningless connectors.

   One simple idea:
   One group-level decision must be read through five dimensions.
============================================================================= */

function FinancialDecisionFrame() {
  return (
    <aside
      aria-labelledby="financial-frame-title"
      className="
        relative

        mx-auto
        w-full
        max-w-[650px]

        border
        border-white/14

        bg-[#063746]/78

        shadow-[0_38px_100px_rgba(0,0,0,.22)]
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
          border-white/11

          px-5
          py-5

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
            تصویر مدیریت مالی گروه
          </p>

          <h2
            id="financial-frame-title"
            className="
              mt-1

              text-[19px]
              font-black
              leading-8

              text-white

              sm:text-[21px]
            "
          >
            یک تصمیم؛ چند اثر هم‌زمان
          </h2>
        </div>

        <span
          aria-hidden="true"
          className="
            h-[11px]
            w-[11px]

            shrink-0

            bg-brand-accent
          "
        />

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
          GROUP DECISION
      ============================================================== */}

      <div
        className="
          border-b
          border-white/10

          bg-brand-accent/[0.055]

          px-5
          py-5

          sm:px-6
        "
      >
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
              h-10
              w-[3px]

              shrink-0

              bg-brand-accent
            "
          />

          <div>
            <p
              className="
                text-[13px]
                font-black

                text-brand-accent
              "
            >
              موضوع مرکزی
            </p>

            <p
              className="
                mt-1

                text-[22px]
                font-black
                leading-8

                text-white
              "
            >
              تصمیم مالی در سطح گروه
            </p>
          </div>
        </div>
      </div>

      {/* =============================================================
          AREAS
      ============================================================== */}

      <div>
        {FINANCIAL_AREAS.map((item, index) => (
          <FinancialAreaRow
            key={item.title}
            title={item.title}
            text={item.text}
            accent={index === 0 || index === FINANCIAL_AREAS.length - 1}
          />
        ))}
      </div>

      {/* =============================================================
          SUMMARY
      ============================================================== */}

      <div
        className="
          border-t
          border-white/10

          bg-black/[0.07]

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
              mt-[11px]

              h-[11px]
              w-[11px]

              shrink-0

              bg-brand-accent
            "
          />

          <p
            className="
              text-[14px]
              font-medium
              leading-7

              text-white/60

              sm:text-[15px]
            "
          >
            تصمیم زمانی روشن‌تر می‌شود که{" "}
            <span className="font-black text-white">
              اثر آن بر کل ساختار مالی گروه
            </span>{" "}
            در یک تصویر دیده شود.
          </p>
        </div>
      </div>
    </aside>
  );
}

/* =============================================================================
   FINANCIAL AREA ROW
============================================================================= */

function FinancialAreaRow({
  title,
  text,
  accent = false,
}: {
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/area
        relative

        grid
        gap-2

        border-b
        border-white/[0.085]

        px-5
        py-4

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white/[0.025]

        sm:grid-cols-[145px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6
      "
    >
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
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/50"}
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

      <p
        className="
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-white/60

          sm:border-r
          sm:border-white/[0.085]
          sm:pr-5
        "
      >
        {text}
      </p>

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

          group-hover/area:scale-y-100
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
            "radial-gradient(circle at 24% 44%,rgba(22,115,148,.25),transparent 30%),radial-gradient(circle at 82% 70%,rgba(252,133,2,.03),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
