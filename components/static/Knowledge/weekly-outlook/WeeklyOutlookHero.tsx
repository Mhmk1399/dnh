import {
  ArrowLeft,
  BarChart3,
  Eye,
  FileText,
  Layers3,
  ShieldAlert,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   DNH WEEKLY OUTLOOK — HERO

   Direction:
   - Engineering / institutional
   - Minimal
   - Fast scanning
   - Lucide icons
   - No trading dashboard visual language
   - SEO-friendly H1

   Core understanding:
   Weekly analytical view of economy, risk and markets
   for financial decision-making.
============================================================================= */

const OUTLOOK_MODULES = [
  {
    icon: FileText,
    title: "جمع‌بندی اجرایی",
    text: "تصویر فشرده هفته",
  },
  {
    icon: ShieldAlert,
    title: "ریسک‌های کلان",
    text: "متغیرهای اثرگذار بر تصمیم",
  },
  {
    icon: Layers3,
    title: "نمای دارایی‌ها",
    text: "بررسی شرایط، نه سیگنال",
  },
  {
    icon: Eye,
    title: "چه چیزهایی را رصد کنیم؟",
    text: "متغیرهای مهم پیش رو",
  },
  {
    icon: BarChart3,
    title: "یادداشت DNH",
    text: "برداشت راهبردی هفته",
  },
] as const;

export function WeeklyOutlookHero() {
  return (
    <section
      id="weekly-outlook-intro"
      dir="rtl"
      aria-labelledby="weekly-outlook-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#021f2a]
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
          w-full
          max-w-[1536px]

          px-5
          pb-12
          pt-[118px]

          sm:px-8
          sm:pb-14
          sm:pt-[126px]

          lg:px-12
          lg:pb-16
          lg:pt-[116px]

          xl:px-16
          2xl:px-20
        "
      >
      

        {/* ===========================================================
            MAIN HERO
        ============================================================ */}

        <div
          className="
            grid
            gap-12

            py-12

            lg:grid-cols-[0.93fr_1.07fr]
            lg:items-center
            lg:gap-16
            lg:py-16

            xl:gap-20
          "
        >
          {/* =========================================================
              COPY
          ========================================================== */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
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
                  text-[13px]
                  font-black

                  text-white/58
                "
              >
                چشم‌انداز هفتگی DNH
              </p>
            </div>

            <h1
              id="weekly-outlook-title"
              className="
                max-w-[900px]

                text-[36px]
                font-black
                leading-[1.58]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[52px]
                lg:leading-[1.48]

                xl:text-[58px]
              "
            >
              اقتصاد، ریسک و بازارها؛
              <br />
              <span className="text-brand-accent">
                در یک تصویر هفتگی برای تصمیم‌گیری مالی.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[680px]

                text-[15px]
                font-medium
                leading-[2]

                text-white/60

                sm:text-[16px]
              "
            >
              DNH Weekly Outlook تغییرات مهم اقتصاد، ریسک‌ها و شرایط دارایی‌ها
              را در یک گزارش فشرده و تصمیم‌محور جمع‌بندی می‌کند.
              </p>
            </div>

            {/* =======================================================
                CTA
            ======================================================== */}

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
                lg:mt-8
              "
            >
              <ActionButton
                href="#weekly-outlook-summary"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                مشاهده جمع‌بندی هفته
              </ActionButton>

              <ActionButton
                href="#weekly-outlook-structure"
                variant="secondary"
                size="lg"
                className="
                  w-full

                  border-white/16
                  bg-transparent

                  text-white
                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/30
                  hover:bg-white/[0.035]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[190px]
                "
              >
                ساختار گزارش
              </ActionButton>
            </div>

            {/* =======================================================
                PROFESSIONAL BOUNDARY
            ======================================================== */}

            <div
              className="
                order-4
                mt-0

                flex
                items-start
                gap-3

                lg:order-none
                lg:mt-8
              "
            >
              <ShieldAlert
                aria-hidden="true"
                strokeWidth={1.7}
                className="
                  mt-1

                  size-[17px]

                  shrink-0

                  text-[#82cee4]/70
                "
              />

              <p
                className="
                  max-w-[610px]

                  text-[13px]
                  font-medium
                  leading-7

                  text-white/42

                  sm:text-[14px]
                "
              >
                تحلیل تصمیم‌محور؛ بدون سیگنال خرید و فروش و بدون پیش‌بینی قطعی.
              </p>
            </div>
          </div>

          {/* =========================================================
              ENGINEERED REPORT MODULE
          ========================================================== */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <WeeklyReportStructure />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   WEEKLY REPORT STRUCTURE
============================================================================= */

function WeeklyReportStructure() {
  return (
    <aside
      id="weekly-outlook-structure"
      aria-labelledby="weekly-report-structure-title"
      className="
        relative

        mx-auto
        w-full
        max-w-[660px]

        border
        border-white/[0.12]

        bg-[#052c38]/82

        shadow-[0_32px_90px_rgba(0,0,0,.18)]
      "
    >
      {/* =============================================================
          TOP BAR
      ============================================================== */}

      <div
        className="
          grid
          grid-cols-[1fr_auto]
          items-center
          gap-5

          border-b
          border-white/[0.09]

          px-5
          py-4

          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[12px]
              font-bold

              text-white/36
            "
          >
            ساختار ثابت گزارش
          </p>

          <h2
            id="weekly-report-structure-title"
            className="
              mt-1

              text-[18px]
              font-black

              text-white
            "
          >
            پنج لایه برای خواندن هفته
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="
            grid
            size-9
            place-items-center

            border
            border-white/10
          "
        >
          <Layers3
            strokeWidth={1.6}
            className="
              size-[17px]

              text-brand-accent
            "
          />
        </div>
      </div>

      {/* =============================================================
          MODULES
      ============================================================== */}

      <div>
        {OUTLOOK_MODULES.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="
                group/module

                relative

                grid
                grid-cols-[40px_1fr_auto]
                items-center
                gap-4

                border-b
                border-white/[0.075]

                px-5
                py-4

                last:border-b-0

                transition-colors
                duration-200

                hover:bg-white/[0.025]

                sm:px-6
              "
            >
              {/* icon */}

              <div
                className="
                  grid
                  size-10
                  place-items-center

                  border
                  border-white/[0.09]

                  bg-white/[0.018]
                "
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="
                    size-[17px]

                    text-[#82cee4]/72

                    transition-colors
                    duration-200

                    group-hover/module:text-brand-accent
                  "
                />
              </div>

              {/* content */}

              <div>
                <h3
                  className="
                    text-[15px]
                    font-black

                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1

                    text-[13px]
                    font-medium

                    text-white/42
                  "
                >
                  {item.text}
                </p>
              </div>

              {/* index */}

              <span
                className="
                  text-[12px]
                  font-black

                  tabular-nums

                  text-white/24
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* hover rail */}

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
                  duration-200

                  group-hover/module:scale-y-100
                "
              />
            </article>
          );
        })}
      </div>

      {/* =============================================================
          FOOT
      ============================================================== */}

      <div
        className="
          flex
          items-center
          gap-3

          border-t
          border-white/[0.09]

          bg-black/[0.06]

          px-5
          py-4

          sm:px-6
        "
      >
        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            shrink-0

            bg-brand-accent
          "
        />

        <p
          className="
            text-[13px]
            font-bold

            text-white/46
          "
        >
          از داده و زمینه، به برداشت راهبردی برای تصمیم.
        </p>
      </div>
    </aside>
  );
}

/* =============================================================================
   STATUS ITEM
============================================================================= */

function StatusItem({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        aria-hidden="true"
        className="
          h-[5px]
          w-[5px]

          bg-[#82cee4]/45
        "
      />

      <span
        className="
          text-[12px]
          font-bold

          text-white/44
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function HeroBackground() {
  return (
    <>
      {/* base gradient */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 76% 42%,rgba(22,115,148,.17),transparent 28%),linear-gradient(118deg,#021d27 0%,#022936 52%,#021e28 100%)",
        }}
      />

      {/* engineering grid */}

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
            "linear-gradient(to right,rgba(255,255,255,.10) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />

      {/* reference rail */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-[7%]

          hidden
          w-px

          bg-white/[0.035]

          lg:block
        "
      />
    </>
  );
}
