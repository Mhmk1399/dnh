"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Clock3,
  Layers3,
  LucideIcon,
  Route,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Assessment preview
============================================================================= */

const ASSESSMENT_PREVIEW = [
  {
    label: "نوع مخاطب",
    en: "PROFILE",
    value: "فرد، خانواده، صاحب سرمایه یا کسب‌وکار",
    icon: UserRound,
  },
  {
    label: "موضوع تصمیم",
    en: "DECISION",
    value: "مسئله‌ای که نیاز به بررسی دارد",
    icon: Layers3,
  },
  {
    label: "افق زمانی",
    en: "HORIZON",
    value: "زمان و شرایط تصمیم پیش رو",
    icon: Clock3,
  },
  {
    label: "فوریت و پیچیدگی",
    en: "FIT & SCOPE",
    value: "تشخیص مسیر مناسب اولیه",
    icon: Route,
  },
] as const;

/* =============================================================================
   Hero
============================================================================= */

export function FinancialDecisionAssessmentHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="assessment-intro"
      dir="rtl"
      aria-labelledby="assessment-hero-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#022f3e]
        text-white
      "
      style={{
        minHeight: "100dvh",
      }}
    >
      <HeroBackground />

      {/* =========================================================
          Shell
      ========================================================== */}

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          grid
          min-h-[100dvh]
          w-full

          items-center
          gap-12

          pb-12
          pt-[120px]

          sm:pb-16
          sm:pt-[130px]

          lg:grid-cols-[0.88fr_1.12fr]
          lg:gap-16
          lg:pb-16
          lg:pt-[110px]

          xl:grid-cols-[0.82fr_1.18fr]
          xl:gap-20

        "
      >
        {/* =======================================================
            Content
        ======================================================== */}

        <div
          className="
            contents

            lg:block
            lg:col-start-1
            lg:row-start-1
          "
        >
          <div className="order-1">
          {/* eyebrow */}

          <div
            className={`
              mb-5

              flex
              items-center
              gap-3

              transition-[opacity,transform]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
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

                text-white/72

                sm:text-[11px]
              "
            >
              ارزیابی اولیه تصمیم مالی
            </span>
          </div>

          {/* h1 */}

          <h1
            id="assessment-hero-title"
            className={`
              max-w-[720px]

              text-[36px]
              font-black
              leading-[1.58]
              tracking-[-0.045em]

              text-white

              transition-[opacity,transform]
              duration-700
              delay-75
              ease-[cubic-bezier(.22,1,.36,1)]

              sm:text-[44px]

              lg:text-[51px]
              lg:leading-[1.5]

              xl:text-[58px]

              ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
          >
            پیش از تصمیم،
            <br />
            <span className="text-brand-accent">مسئله را درست ببینید.</span>
          </h1>

          {/* description */}

          <p
            className={`
              mt-6
              max-w-[650px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-white/64

              transition-[opacity,transform]
              duration-700
              delay-150
              ease-[cubic-bezier(.22,1,.36,1)]

              sm:text-[14px]

              lg:text-[15px]

              ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
          >
            هر تصمیم مهم مالی، پیش از آنکه به یک انتخاب تبدیل شود، به درک درست
            مسئله، شرایط و مسیرهای پیش رو نیاز دارد. این ارزیابی کمک می‌کند
            موقعیت شما پیش از ورود به مسیر مشاوره، روشن‌تر دیده شود.
          </p>

          </div>

          {/* =====================================================
              CTA
          ====================================================== */}

          <div
            className={`
              order-3
              mt-0

              flex
              flex-col
              gap-3

              transition-[opacity,transform]
              duration-700
              delay-200
              ease-[cubic-bezier(.22,1,.36,1)]

              sm:flex-row
              sm:flex-wrap
              sm:items-center

              lg:order-none
              lg:mt-8

              ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
          >
            <ActionButton
              href="#assessment-form"
              variant="assessment"
              size="lg"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_18px_44px_rgba(252,133,2,.20)]

                hover:bg-[#eb7c01]

                sm:w-auto
                sm:min-w-[260px]
              "
            >
              شروع ارزیابی
            </ActionButton>

            <ActionButton
              href="#assessment-process"
              variant="secondary"
              size="lg"
              icon={ArrowLeft}
              className="
                w-full

                border-white/25
                bg-white/[0.045]

                text-white

                shadow-none

                hover:border-white/45
                hover:bg-white/[0.085]
                hover:text-white

                sm:w-auto
                sm:min-w-[220px]
              "
            >
              این ارزیابی چگونه کار می‌کند؟
            </ActionButton>
          </div>

          {/* =====================================================
              privacy note
          ====================================================== */}

          <div
            className={`
              hidden

              mt-8
              max-w-[640px]

              border-t
              border-white/12

              pt-5

              transition-[opacity,transform]
              duration-700
              delay-300
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none

              lg:block
            `}
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <ShieldCheck
                aria-hidden="true"
                className="
                  mt-1
                  h-4
                  w-4
                  shrink-0

                  text-[#7bc7df]
                "
                strokeWidth={1.5}
              />

              <p
                className="
                  text-[10px]
                  font-medium
                  leading-[2]

                  text-white/43

                  sm:text-[11px]
                "
              >
                در این مرحله نیازی به ارائه اطلاعات کامل دارایی‌ها، حساب‌های
                بانکی یا اسناد محرمانه نیست؛ فقط اطلاعات لازم برای شناخت اولیه
                مسئله دریافت می‌شود.
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            Assessment preview
        ======================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <AssessmentPreview mounted={mounted} />
        </div>
      </div>

      {/* =========================================================
          Bottom rail
      ========================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          hidden

          border-t
          border-white/10

          lg:block
        "
      >
        <div
          className="
            dnh-site-shell
            mx-auto

            flex

            items-center
            justify-between
            gap-6

            py-4


          "
        >
          <p
            className="
              text-[11px]
              font-medium

              text-white/35
            "
          >
            شناخت اولیه مسئله، پیش از انتخاب خدمت
          </p>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              dir="ltr"
              className="
                text-[11px]
                font-bold
                tracking-[0.18em]

                text-white/25
              "
            >
              ASSESSMENT → FIT & SCOPE → NEXT STEP
            </span>

            <span
              className="
                h-px
                w-16

                bg-white/14
              "
            />

            <span
              className="
                h-[6px]
                w-[6px]

                bg-brand-accent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Assessment preview
============================================================================= */

function AssessmentPreview({ mounted }: { mounted: boolean }) {
  return (
    <div
      className={`
        group/preview

        relative
        mx-auto
        w-full
        max-w-[730px]

        overflow-hidden

        border
        border-white/14

        bg-white/[0.055]

        shadow-[0_32px_100px_rgba(0,0,0,.18)]

        backdrop-blur-[10px]

        transition-[opacity,transform,border-color,box-shadow]
        duration-[850ms]
        delay-150
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]
        hover:border-white/24
        hover:shadow-[0_42px_120px_rgba(0,0,0,.24)]

        ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
    >
      {/* accent */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0

          flex
          h-[3px]
        "
      >
        <span className="w-[24%] bg-brand-accent" />
        <span className="flex-1 bg-[#64b6d2]" />
      </div>

      {/* =======================================================
          Header
      ======================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-5

          border-b
          border-white/12

          px-5
          pb-5
          pt-7

          sm:px-7

          lg:px-8
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[11px]
              font-black
              tracking-[0.19em]

              text-[#7ecae1]
            "
          >
            FINANCIAL DECISION ASSESSMENT
          </p>

          <h2
            className="
              mt-2

              text-[16px]
              font-black

              text-white

              sm:text-[18px]
            "
          >
            شناخت اولیه موقعیت شما
          </h2>
        </div>

        <span
          className="
            border
            border-brand-accent/30

            bg-brand-accent/[0.08]

            px-3
            py-2

            text-[11px]
            font-black

            text-brand-accent
          "
        >
          خصوصی
        </span>
      </div>

      {/* =======================================================
          Intro
      ======================================================== */}

      <div
        className="
          border-b
          border-white/10

          px-5
          py-5

          sm:px-7

          lg:px-8
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold

                text-white/72
              "
            >
              برای شروع، فقط چند نکته کلیدی را روشن می‌کنیم.
            </p>

            <p
              className="
                mt-1

                text-[11px]
                font-medium
                leading-[1.8]

                text-white/34
              "
            >
              بدون ورود به جزئیات محرمانه یا اطلاعات کامل مالی
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              h-[11px]
              w-[11px]

              bg-brand-accent
            "
          />
        </div>
      </div>

      {/* =======================================================
          Preview questions
      ======================================================== */}

      <div
        className="
          divide-y
          divide-white/10
        "
      >
        {ASSESSMENT_PREVIEW.map((item, index) => (
          <PreviewItem
            key={item.en}
            item={item}
            index={index}
            mounted={mounted}
          />
        ))}
      </div>

      {/* =======================================================
          Footer
      ======================================================== */}

      <div
        className="
          group/footer

          flex
          items-center
          justify-between
          gap-5

          border-t
          border-white/12

          bg-black/[0.08]

          px-5
          py-5

          transition-colors
          duration-300

          hover:bg-white/[0.025]

          sm:px-7

          lg:px-8
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-black

              text-white
            "
          >
            خروجی مرحله اول
          </p>

          <p
            className="
              mt-1

              text-[11px]
              font-medium
              leading-[1.8]

              text-white/35
            "
          >
            تشخیص تناسب، دامنه و مسیر مناسب بعدی
          </p>
        </div>

        <span
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            border
            border-white/12

            text-brand-accent

            transition-[border-color,background-color,transform]
            duration-300

            group-hover/footer:-translate-x-1
            group-hover/footer:border-brand-accent/50
            group-hover/footer:bg-brand-accent/[0.08]
          "
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   Preview item
============================================================================= */

function PreviewItem({
  item,
  index,
  mounted,
}: {
  item: {
    label: string;
    en: string;
    value: string;
    icon: LucideIcon;
  };
  index: number;
  mounted: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/item

        grid
        grid-cols-[42px_1fr_auto]
        items-center
        gap-4

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-white/[0.045]

        sm:px-7

        lg:px-8

        ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
      `}
      style={{
        transitionDelay: `${280 + index * 80}ms`,
      }}
    >
      <span
        className="
          flex
          h-10
          w-10

          items-center
          justify-center

          border
          border-white/14

          text-[#79c8df]

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/item:-translate-y-0.5
          group-hover/item:border-brand-accent
          group-hover/item:bg-brand-accent
          group-hover/item:text-white
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <div>
        <div
          className="
            flex
            flex-wrap
            items-baseline
            gap-x-3
            gap-y-1
          "
        >
          <h3
            className="
              text-[11px]
              font-black

              text-white
            "
          >
            {item.label}
          </h3>

          <span
            dir="ltr"
            className="
              text-[6px]
              font-bold
              tracking-[0.14em]

              text-white/28
            "
          >
            {item.en}
          </span>
        </div>

        <p
          className="
            mt-1.5

            text-[11px]
            font-medium
            leading-[1.8]

            text-white/42
          "
        >
          {item.value}
        </p>
      </div>

      <span
        className="
          text-[11px]
          font-black

          text-white/18

          transition-colors
          duration-300

          group-hover/item:text-brand-accent
        "
      >
        0{index + 1}
      </span>
    </div>
  );
}

/* =============================================================================
   Background
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
          z-0
        "
        style={{
          background:
            "radial-gradient(circle at 74% 36%,rgba(22,115,148,.30),transparent 31%),linear-gradient(115deg,#022936 0%,#033849 48%,#022c3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[22%]
          top-0

          h-[11px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
