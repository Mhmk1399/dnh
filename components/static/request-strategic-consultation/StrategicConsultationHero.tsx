import {
  ArrowDownLeft,
  ArrowLeft,
  BriefcaseBusiness,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const REVIEW_STEPS = [
  {
    number: "01",
    icon: ScanSearch,
    title: "شناخت موضوع",
    description: "مسئله، زمینه و هدف اصلی درخواست مشخص می‌شود.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "بررسی تناسب و دامنه",
    description: "دامنه، فوریت و سطح پیچیدگی درخواست بررسی می‌شود.",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "تعیین مسیر گفتگو",
    description: "در صورت تناسب، مسیر جلسه تخصصی مشخص می‌شود.",
  },
] as const;

export function StrategicConsultationHero() {
  return (
    <section
      id="consultation-intro"
      dir="rtl"
      aria-labelledby="strategic-consultation-title"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#021f2a]
        text-white
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
          pb-12
          pt-[116px]

          sm:px-8
          sm:pb-16
          sm:pt-[126px]

          lg:px-12
          lg:pb-16
          lg:pt-[120px]

          xl:px-16
          2xl:px-20
        "
      >
        {/* ===========================================================
            HERO
        ============================================================ */}

        <div
          className="
            grid
            flex-1
            gap-12
            pt-10

            lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]
            lg:items-center
            lg:gap-16
            lg:pt-12

            xl:gap-20
          "
        >
          {/* =========================================================
              MAIN COPY
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
              <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-[#fc8502]" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-[#82cee4]
                "
              >
                شروع یک گفت‌وگوی تخصصی
              </p>
            </div>

            <h1
              id="strategic-consultation-title"
              className="
                mt-5
                max-w-[830px]

                text-[37px]
                font-black
                leading-[1.62]
                tracking-[-0.05em]

                text-white

                sm:text-[45px]

                lg:text-[53px]
                lg:leading-[1.52]

                xl:text-[60px]
              "
            >
              وقتی مسئله مالی
              <br />
              به یک پاسخ ساده{" "}
              <span className="text-[#fc8502]">محدود نمی‌شود.</span>
            </h1>

            <p
              className="
                mt-5
                max-w-[690px]

                text-[15px]
                font-medium
                leading-[2]

                text-white/55

                sm:text-[16px]
              "
            >
              درخواست مشاوره راهبردی برای موضوعاتی است که پیش از تصمیم، به شناخت
              دقیق‌تر مسئله، ریسک‌ها، محدودیت‌ها و مسیرهای قابل بررسی نیاز
              دارند.
              </p>
            </div>

            {/* =====================================================
                ACTIONS
            ====================================================== */}

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
                href="#consultation-request"
                variant="assessment"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full
                  bg-[#fc8502]
                  text-white

                  hover:-translate-y-0.5
                  hover:bg-[#ec7d01]

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                ثبت درخواست مشاوره
              </ActionButton>

              <ActionButton
                href="/financial-decision-assessment"
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/14
                  bg-transparent
                  text-white
                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/30
                  hover:bg-white/[0.04]
                  hover:text-white

                  sm:w-auto
                "
              >
                شروع از ارزیابی اولیه
              </ActionButton>
            </div>

            {/* =====================================================
                QUALIFICATION NOTE
            ====================================================== */}

            <div
              className="
                order-4
                mt-0
                flex
                max-w-[680px]
                items-start
                gap-3

                border-t
                border-white/[0.08]

                pt-5

                lg:order-none
                lg:mt-7
              "
            >
              <ShieldCheck
                aria-hidden="true"
                strokeWidth={1.6}
                className="
                  mt-[3px]
                  size-[16px]
                  shrink-0
                  text-[#82cee4]/65
                "
              />

              <p
                className="
                  text-[13px]
                  font-medium
                  leading-6
                  text-white/38
                "
              >
                ثبت درخواست به‌معنای تأیید خودکار جلسه نیست؛ ابتدا تناسب موضوع و
                دامنه بررسی می‌شود.
              </p>
            </div>
          </div>

          {/* =========================================================
              CONSULTATION GATE
          ========================================================== */}

          <aside
            aria-label="مسیر بررسی درخواست مشاوره"
            className="
              relative
              order-2

              border
              border-white/[0.11]

              bg-white/[0.025]

              lg:col-start-2
              lg:row-start-1
            "
          >
            {/* orange register */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[3px]
                bg-[#fc8502]
              "
            />

            {/* HEADER */}

            <div
              className="
                border-b
                border-white/[0.09]

                px-5
                pb-5
                pt-7

                sm:px-6
                sm:pt-8

                lg:px-7
              "
            >
              <p
                className="
                  text-[12px]
                  font-black
                  text-[#82cee4]/65
                "
              >
                مسیر بررسی درخواست
              </p>

              <h2
                className="
                  mt-2

                  text-[21px]
                  font-black
                  leading-9

                  text-white

                  sm:text-[23px]
                "
              >
                پیش از جلسه، باید روشن شود چه چیزی قرار است بررسی شود.
              </h2>
            </div>

            {/* STEPS */}

            <div>
              {REVIEW_STEPS.map((step) => (
                <ReviewStep key={step.number} {...step} />
              ))}
            </div>

            {/* FOOT */}

            <div
              className="
                relative

                border-t
                border-white/[0.09]

                bg-black/[0.08]

                px-5
                py-4

                sm:px-6
                lg:px-7
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  right-0

                  w-[3px]
                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-medium
                  leading-6
                  text-white/42
                "
              >
                هدف این مرحله، تشخیص مسیر مناسب برای ادامه گفتگو است.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   REVIEW STEP
============================================================================= */

function ReviewStep({
  number,
  icon: Icon,
  title,
  description,
}: (typeof REVIEW_STEPS)[number]) {
  return (
    <div
      className="
        group/step
        relative

        grid
        gap-4

        border-b
        border-white/[0.075]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-white/[0.025]

        sm:grid-cols-[42px_minmax(0,1fr)]
        sm:items-start
        sm:gap-4
        sm:px-6

        lg:px-7
      "
    >
      <span
        aria-hidden="true"
        className="
          grid
          size-9
          place-items-center

          border
          border-white/[0.1]

          text-[#82cee4]/70

          transition-[border-color,color]
          duration-200

          group-hover/step:border-[#fc8502]/35
          group-hover/step:text-[#fc8502]
        "
      >
        <Icon strokeWidth={1.6} className="size-[16px]" />
      </span>

      <div>
        <div className="flex items-center gap-3">
          <span
            className="
              text-[12px]
              font-black
              tabular-nums
              text-white/24
            "
          >
            {number}
          </span>

          <h3
            className="
              text-[15px]
              font-black
              text-white
            "
          >
            {title}
          </h3>
        </div>

        <p
          className="
            mt-2
            max-w-[440px]

            text-[14px]
            font-medium
            leading-7

            text-white/42
          "
        >
          {description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/step:scale-y-100
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
          background: `
            radial-gradient(
              circle at 79% 34%,
              rgba(22,115,148,.20),
              transparent 27%
            ),
            radial-gradient(
              circle at 16% 72%,
              rgba(22,115,148,.08),
              transparent 23%
            ),
            linear-gradient(
              118deg,
              #021d27 0%,
              #032f3e 48%,
              #022631 100%
            )
          `,
        }}
      />

      {/* grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,.075) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.05) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "112px 112px",
        }}
      />

      {/* architectural references */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-[14%]

          hidden
          h-[145px]
          w-px

          bg-gradient-to-t
          from-[#fc8502]/25
          to-transparent

          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[145px]
          right-[14%]

          hidden
          h-[7px]
          w-[7px]

          translate-x-1/2

          bg-[#fc8502]

          lg:block
        "
      />
    </>
  );
}
