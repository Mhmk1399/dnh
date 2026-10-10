/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY — OUTCOME

   Light / Executive Summary Sheet
   Server Component
   No client JS
============================================================================= */

const OUTCOMES = [
  {
    title: "ساختار مالی",
    description:
      "تصویر منسجم‌تری از بخش‌های مالی مرتبط با تصمیم و ارتباط میان آن‌ها.",
  },
  {
    title: "گزینه‌های قابل بررسی",
    description:
      "مسیرهایی که می‌توان در چارچوب مسئله، شرایط و اهداف کسب‌وکار بررسی کرد.",
  },
  {
    title: "ریسک‌ها",
    description:
      "نقاطی که می‌توانند بر تصمیم، نقدینگی یا ساختار مالی اثر بگذارند.",
  },
  {
    title: "مسیر تصمیم",
    description:
      "تصویر روشن‌تری از مسیرهای پیش رو برای ادامه بررسی و تصمیم‌گیری.",
  },
] as const;

export function StrategicAdvisoryOutcomeSection() {
  return (
    <section
      id="strategic-advisory-outcome"
      dir="rtl"
      aria-labelledby="strategic-advisory-outcome-title"
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
      <OutcomeBackground />

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
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <div
          className="
            grid
            items-end
            gap-8

            lg:grid-cols-[1.06fr_0.94fr]
            lg:gap-16
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
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
                خروجی بررسی
              </p>
            </div>

            <h2
              id="strategic-advisory-outcome-title"
              className="
                max-w-[850px]
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
              خروجی فقط مجموعه‌ای از اطلاعات نیست؛{" "}
              <span className="text-brand-primary">
                یک تصویر ساختاریافته برای تصمیم است.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pr-8">
            <p
              className="
                max-w-[570px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-[#5d7178]

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              هدف این است که وضعیت مالی، گزینه‌های قابل بررسی و ریسک‌های مرتبط
              در قالبی منسجم‌تر دیده شوند تا مسیر تصمیم قابل فهم‌تر باشد.
            </p>
          </div>
        </div>

        {/* ===============================================================
            EXECUTIVE SUMMARY SHEET
        ================================================================ */}

        <div
          className="
            relative

            mt-14

            border
            border-brand-primary/14

            bg-white

            shadow-[0_24px_70px_rgba(6,60,77,.055)]

            lg:mt-16
          "
        >
          {/* top architectural accent */}

          <span
            aria-hidden="true"
            className="
              absolute
              right-[-1px]
              top-[-1px]

              h-8
              w-[2px]

              bg-brand-accent
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              right-[-1px]
              top-[-1px]

              h-[2px]
              w-8

              bg-brand-accent
            "
          />

          {/* =============================================================
              SHEET HEADER
          ============================================================== */}

          <div
            className="
              grid
              gap-5

              border-b
              border-brand-primary/12

              bg-brand-primary/[0.022]

              px-5
              py-5

              sm:px-6

              lg:grid-cols-[1fr_auto]
              lg:items-center
              lg:px-8
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-black

                  text-[#153944]
                "
              >
                تصویر نهایی بررسی
              </p>

              <p
                className="
                  mt-1.5

                  text-[11px]
                  font-medium

                  text-[#768a90]
                "
              >
                جمع‌بندی ساختاری موضوعات مرتبط با تصمیم
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
              <span className="h-[5px] w-[5px] bg-brand-primary/40" />

              <span className="h-px w-8 bg-brand-primary/15" />

              <span className="h-[5px] w-[5px] bg-brand-accent" />
            </div>
          </div>

          {/* =============================================================
              DESKTOP ROWS
          ============================================================== */}

          <div className="divide-y divide-brand-primary/10">
            {OUTCOMES.map((item, index) => (
              <OutcomeRow
                key={item.title}
                title={item.title}
                description={item.description}
                highlight={index === OUTCOMES.length - 1}
              />
            ))}
          </div>

         
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   OUTCOME ROW
============================================================================= */

function OutcomeRow({
  title,
  description,
  highlight = false,
}: {
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <article
      className="
        group/outcome
        relative

        grid
        gap-3

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        sm:px-6

        lg:grid-cols-[230px_1fr]
        lg:items-center
        lg:gap-10
        lg:px-8
        lg:py-7
      "
    >
      {/* orange hover rail */}

      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom

          bg-brand-accent

          transition-transform
          duration-300

          ${
            highlight
              ? "scale-y-100"
              : "scale-y-0 group-hover/outcome:scale-y-100"
          }
        `}
      />

      {/* Title */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${highlight ? "bg-brand-accent" : "bg-brand-primary/35"}
          `}
        />

        <h3
          className={`
            text-[13px]
            font-black

            transition-colors
            duration-300

            sm:text-[14px]

            ${
              highlight
                ? "text-brand-primary"
                : "text-[#193b45] group-hover/outcome:text-brand-primary"
            }
          `}
        >
          {title}
        </h3>
      </div>

      {/* Description */}

      <div
        className="
          flex
          items-center
          gap-6

          pr-[23px]

          lg:pr-0
        "
      >
        <span
          aria-hidden="true"
          className="
            hidden
            h-px
            w-10

            shrink-0

            bg-brand-primary/12

            lg:block
          "
        />

        <p
          className="
            max-w-[720px]

            text-[11px]
            font-medium
            leading-[2.15]

            text-[#677b82]

            sm:text-[12px]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function OutcomeBackground() {
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
            "linear-gradient(180deg,#ffffff 0%,rgba(22,115,148,.025) 100%)",
        }}
      />

      {/* quiet architectural line */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-[42%]

          h-px

          bg-brand-primary/[0.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[7%]
          top-0

          hidden
          h-full
          w-px

          bg-brand-primary/[0.035]

          lg:block
        "
      />
    </>
  );
}
