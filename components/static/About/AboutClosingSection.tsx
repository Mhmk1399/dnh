import { ArrowLeft, Focus, Network, PanelsTopLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   ABOUT — DNH POINT OF VIEW

   Purpose:
   Explain the professional thinking behind DNH.

   Design:
   - Institutional
   - Minimal
   - Architectural
   - No client-side animation
   - No decorative flowchart
   - No tiny microcopy
============================================================================= */

const PRINCIPLES = [
  {
    number: "01",
    icon: PanelsTopLeft,
    title: "تصویر کامل‌تر",
    description: "دارایی، ریسک، زمان و اهداف باید در یک تصویر واحد دیده شوند.",
  },
  {
    number: "02",
    icon: Network,
    title: "ارتباط میان تصمیم‌ها",
    description: "هر تصمیم مالی می‌تواند بر بخش‌های دیگر ساختار اثر بگذارد.",
  },
  {
    number: "03",
    icon: Focus,
    title: "ساختار پیش از اقدام",
    description:
      "پیش از اقدام، مسئله، ریسک‌ها و مسیرهای قابل بررسی باید روشن شوند.",
  },
] as const;

export function AboutClosingSection() {
  return (
    <section
      id="about-dnh-view"
      dir="rtl"
      aria-labelledby="about-closing-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        py-16

        sm:scroll-mt-28
        sm:py-20
        lg:py-20
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
        {/* ===========================================================
            TOP INDEX
        ============================================================ */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5

            border-y
            border-white/[0.09]

            py-3
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                text-[12px]
                font-black
                tabular-nums

                text-white/32
              "
            >
              03
            </span>

            <span
              aria-hidden="true"
              className="
                h-4
                w-px

                bg-white/12
              "
            />

            <span
              className="
                text-[12px]
                font-black

                text-white/58
              "
            >
              نگاه حرفه‌ای DNH
            </span>
          </div>

          <span
            aria-hidden="true"
            className="
              h-[7px]
              w-[7px]

              bg-[#fc8502]
            "
          />
        </div>

        {/* ===========================================================
            MAIN
        ============================================================ */}

        <div
          className="
            grid
            gap-12

            pt-10

            lg:grid-cols-[0.86fr_1.14fr]
            lg:items-start
            lg:gap-16
            lg:pt-12

            xl:gap-20
          "
        >
          {/* =========================================================
              CONTENT
          ========================================================== */}

          <div
            className="
              lg:sticky
              lg:top-28
            "
          >
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

                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-black

                  text-[#82cee4]
                "
              >
                از نگاه حرفه‌ای تا ساختار تصمیم
              </p>
            </div>

            <h2
              id="about-closing-title"
              className="
                max-w-[720px]

                text-[30px]
                font-black
                leading-[1.7]
                tracking-[-0.045em]

                text-white

                sm:text-[36px]

                lg:text-[43px]
                lg:leading-[1.58]
              "
            >
              تصمیم مالی بهتر، از{" "}
              <span className="text-[#fc8502]">دیدن تصویر کامل‌تر</span> شروع
              می‌شود.
            </h2>

            <p
              className="
                mt-5
                max-w-[610px]

                text-[15px]
                font-medium
                leading-[2]

                text-white/58

                sm:text-[16px]
              "
            >
              نگاه DNH به‌جای شروع از یک پاسخ آماده، ابتدا رابطه میان دارایی،
              ریسک، زمان و اهداف را روشن می‌کند.
            </p>

            {/* CTA */}

            <div
              className="
                mt-8

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
              "
            >
              <ActionButton
                href="/dnh/framework"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-[#fc8502]
                  text-white

                  hover:-translate-y-0.5
                  hover:bg-[#ec7d01]

                  sm:w-auto
                  sm:min-w-[220px]
                "
              >
                آشنایی با چارچوب DNH
              </ActionButton>

              <ActionButton
                href="/services"
                variant="secondary"
                size="lg"
                className="
                  w-full

                  border-white/15
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
                مشاهده خدمات
              </ActionButton>
            </div>
          </div>

          {/* =========================================================
              PRINCIPLE REGISTER
          ========================================================== */}

          <div
            className="
              border
              border-white/[0.11]

              bg-white/[0.018]
            "
          >
            {/* -----------------------------------------------
                REGISTER HEADER
            ------------------------------------------------ */}

            <div
              className="
                grid
                gap-3

                border-b
                border-white/[0.09]

                px-5
                py-5

                sm:px-6

                lg:grid-cols-[180px_1fr]
                lg:items-center
                lg:gap-7
                lg:px-7
              "
            >
              <p
                className="
                  text-[13px]
                  font-black

                  text-white/42
                "
              >
                منطق تصمیم
              </p>

              <p
                className="
                  text-[15px]
                  font-black
                  leading-7

                  text-white

                  lg:border-r
                  lg:border-white/[0.09]
                  lg:pr-7
                "
              >
                سه اصل برای خواندن مسئله پیش از تصمیم
              </p>
            </div>

            {/* -----------------------------------------------
                PRINCIPLES
            ------------------------------------------------ */}

            <div>
              {PRINCIPLES.map((item) => (
                <PrincipleRow key={item.number} {...item} />
              ))}
            </div>

            {/* -----------------------------------------------
                BOTTOM STATEMENT
            ------------------------------------------------ */}

            <div
              className="
                relative

                border-t
                border-white/[0.09]

                bg-black/[0.08]

                px-5
                py-5

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

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-[9px]

                    h-[6px]
                    w-[6px]

                    shrink-0

                    bg-[#82cee4]
                  "
                />

                <p
                  className="
                    max-w-[720px]

                    text-[14px]
                    font-bold
                    leading-7

                    text-white/58

                    sm:text-[15px]
                  "
                >
                  هدف، پیچیده‌تر کردن تصمیم نیست؛{" "}
                  <span className="text-white">
                    هدف، روشن‌تر کردن ساختاری است که تصمیم در آن شکل می‌گیرد.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PRINCIPLE ROW
============================================================================= */

function PrincipleRow({
  number,
  icon: Icon,
  title,
  description,
}: (typeof PRINCIPLES)[number]) {
  return (
    <article
      className="
        group/principle
        relative

        grid
        gap-4

        border-b
        border-white/[0.075]

        px-5
        py-6

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-white/[0.025]

        sm:px-6

        lg:grid-cols-[62px_190px_1fr]
        lg:items-center
        lg:gap-6
        lg:px-7
      "
    >
      {/* NUMBER */}

      <span
        className="
          text-[13px]
          font-black
          tabular-nums

          text-white/26
        "
      >
        {number}
      </span>

      {/* TITLE */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            grid
            size-8
            shrink-0
            place-items-center

            border
            border-white/[0.1]

            transition-colors
            duration-200

            group-hover/principle:border-[#fc8502]/35
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.6}
            className="
              size-[14px]

              text-[#82cee4]/75

              transition-colors
              duration-200

              group-hover/principle:text-[#fc8502]
            "
          />
        </div>

        <h3
          className="
            text-[16px]
            font-black
            leading-7

            text-white

            sm:text-[14px]
          "
        >
          {title}
        </h3>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          text-[14px]
          font-medium
          leading-7

          text-white/52

          lg:border-r
          lg:border-white/[0.075]
          lg:pr-6

          sm:text-[13px]
        "
      >
        {description}
      </p>

      {/* HOVER RAIL */}

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

          group-hover/principle:scale-y-100
        "
      />
    </article>
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
            "radial-gradient(circle at 78% 35%,rgba(22,115,148,.17),transparent 29%),linear-gradient(112deg,#022936 0%,#033746 52%,#022833 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]
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
