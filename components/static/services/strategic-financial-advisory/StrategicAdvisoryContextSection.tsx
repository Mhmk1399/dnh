import { ArrowDownLeft } from "lucide-react";

/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY — CONTEXT
============================================================================= */

const DECISION_RELATIONS = [
  {
    title: "سرمایه و نقدینگی",
    description:
      "تصمیم سرمایه‌ای زمانی معنا پیدا می‌کند که اثر آن بر نقدینگی نیز در همان تصویر دیده شود.",
  },
  {
    title: "تأمین   و ساختار مالی",
    description:
      "تأمین مالی یک موضوع جداگانه نیست؛ باید در ارتباط با ساختار مالی و شرایط تصمیم بررسی شود.",
  },
  {
    title: "تصمیم امروز و مسیر آینده",
    description:
      "اثر یک تصمیم مهم فقط به وضعیت فعلی محدود نیست و باید با جهت پیش‌روی کسب‌وکار نیز سنجیده شود.",
  },
] as const;

export function StrategicAdvisoryContextSection() {
  return (
    <section
      id="strategic-advisory-context"
      dir="rtl"
      aria-labelledby="strategic-advisory-context-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-white

        py-24
        sm:scroll-mt-28
        sm:py-28
        lg:py-32
      "
    >
      <ContextBackground />

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
            items-start
            gap-14

            lg:grid-cols-[0.88fr_1.12fr]
            lg:gap-20

            xl:gap-28
          "
        >
          {/* ===============================================================
              COPY
          ================================================================ */}

          <div>
            {/* Eyebrow */}

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
                  w-10
                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[10px]
                  font-black

                  text-brand-primary/75

                  sm:text-[11px]
                "
              >
                موقعیت تصمیم
              </p>
            </div>

            {/* Heading */}

            <h2
              id="strategic-advisory-context-title"
              className="
                max-w-[760px]
                [text-wrap:balance]

                text-[30px]
                font-black
                leading-[1.75]
                tracking-[-0.045em]

                text-[#10242c]

                sm:text-[36px]
                lg:text-[42px]
                lg:leading-[1.65]

                xl:text-[46px]
              "
            >
              یک تصمیم مالی، فقط یک متغیر نیست؛{" "}
              <span className="text-brand-primary">
                چند بخش از کسب‌وکار را هم‌زمان درگیر می‌کند.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[650px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-[#52666e]

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              در تصمیم‌های راهبردی مالی، سرمایه، نقدینگی، تأمین مالی و ساختار
              مالی از یکدیگر جدا نیستند. مسئله زمانی مهم‌تر می‌شود که تصمیم
              امروز بتواند بر مسیر آینده کسب‌وکار نیز اثر بگذارد.
            </p>

            {/* Supporting statement */}

            <div
              className="
                mt-9

                border-r-2
                border-brand-accent

                pr-5
              "
            >
              <p
                className="
                  max-w-[560px]

                  text-[12px]
                  font-bold
                  leading-[2.1]

                  text-[#264852]

                  sm:text-[13px]
                "
              >
                قبل از انتخاب مسیر، باید ارتباط میان اجزای تصمیم روشن شود.
              </p>
            </div>
          </div>

          {/* ===============================================================
              DECISION DEPENDENCY FIELD
          ================================================================ */}

          <div
            className="
              relative

              border-y
              border-[#167394]/15
            "
          >
            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-6

                border-b
                border-[#167394]/12

                py-5
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-black

                    text-[#17343e]
                  "
                >
                  وقتی مسئله به بیش از یک حوزه می‌رسد
                </p>

                <p
                  className="
                    mt-1.5

                    text-[9px]
                    font-medium

                    text-[#6b7e85]
                  "
                >
                  ارتباط میان متغیرها بخشی از خود تصمیم است.
                </p>
              </div>

              <div
                aria-hidden="true"
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-[5px]
                    w-[5px]

                    bg-brand-accent
                  "
                />

                <span
                  className="
                    h-px
                    w-9

                    bg-brand-primary/20
                  "
                />
              </div>
            </div>

            {/* Rows */}

            <div className="divide-y divide-[#167394]/10">
              {DECISION_RELATIONS.map((item, index) => (
                <DecisionRelation
                  key={item.title}
                  index={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>

            {/* Bottom conclusion */}

            <div
              className="
                grid
                gap-4

                border-t
                border-[#167394]/12

                bg-[#167394]/[0.025]

                px-5
                py-5

                sm:grid-cols-[auto_1fr]
                sm:items-center
                sm:px-6
              "
            >
              <div
                aria-hidden="true"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  border
                  border-brand-accent/35

                  text-brand-accent
                "
              >
                <ArrowDownLeft className="h-4 w-4" strokeWidth={1.6} />
              </div>

              <p
                className="
                  text-[10px]
                  font-bold
                  leading-6

                  text-[#42606a]
                "
              >
                هدف، جدا کردن این موضوعات نیست؛ هدف، دیدن آن‌ها در یک تصویر
                تصمیم منسجم‌تر است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   RELATION ROW
============================================================================= */

function DecisionRelation({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group/row
        relative

        grid
        gap-4

        py-6

        transition-colors
        duration-300

        hover:bg-[#167394]/[0.025]

        sm:grid-cols-[145px_1fr]
        sm:items-center
        sm:gap-8

        lg:py-7
      "
    >
      {/* Hover rail */}

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

          group-hover/row:scale-y-100
        "
      />

      {/* Label */}

      <div
        className="
          flex
          items-center
          gap-3

          px-5
          sm:px-6
        "
      >
        <h3
          className="
            text-[11px]
            font-black

            text-[#153641]

            transition-colors
            duration-300

            group-hover/row:text-brand-primary

            sm:text-[12px]
          "
        >
          {title}
        </h3>
      </div>

      {/* Description */}

      <div
        className="
          relative

          px-5
          sm:px-6
        "
      >
        <p
          className="
            max-w-[650px]

            text-[11px]
            font-medium
            leading-[2.1]

            text-[#687b82]

            sm:text-[12px]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ContextBackground() {
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
            "linear-gradient(180deg,#ffffff 0%,rgba(22,115,148,.022) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-[8%]

          hidden
          w-px

          bg-[#167394]/[0.045]

          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-[8%]

          hidden
          w-px

          bg-[#167394]/[0.045]

          lg:block
        "
      />
    </>
  );
}
