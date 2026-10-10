/* =============================================================================
   HOLDING — OUTCOME

   Executive / light / structured

   Core message:
   The outcome is not "more analysis".
   It is a clearer decision picture.

   Output:
   - Financial Structure
   - Options
   - Risks
   - Decision Path
============================================================================= */

const OUTCOMES = [
  {
    number: "۰۱",
    title: "ساختار مالی",
    text: "تصویر روشن‌تری از وضعیت مالی و ارتباط بخش‌های اصلی گروه.",
  },
  {
    number: "۰۲",
    title: "گزینه‌های قابل بررسی",
    text: "مشخص شدن مسیرهایی که می‌توانند در ادامه تصمیم بررسی شوند.",
  },
  {
    number: "۰۳",
    title: "ریسک‌های مهم",
    text: "دیدن ریسک‌هایی که باید پیش از تصمیم نهایی در نظر گرفته شوند.",
  },
  {
    number: "۰۴",
    title: "مسیر تصمیم",
    text: "یک چارچوب روشن‌تر برای ادامه بررسی و تصمیم‌گیری مدیریتی.",
  },
] as const;

export function HoldingOutcomeSection() {
  return (
    <section
      id="holding-outcome"
      dir="rtl"
      aria-labelledby="holding-outcome-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f7fafb]

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
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.78fr_1.22fr]
            lg:items-center
            lg:gap-16

            xl:gap-20
          "
        >
          {/* ===========================================================
              COPY
          ============================================================ */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black

                  text-brand-primary/70
                "
              >
                خروجی بررسی
              </p>
            </div>

            <h2
              id="holding-outcome-title"
              className="
                max-w-[720px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              هدف، تولید اطلاعات بیشتر نیست؛{" "}
              <span className="text-brand-primary">
                باید تصویر تصمیم روشن‌تر شود.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              بعد از بازبینی، مدیریت باید بتواند ساختار مالی، گزینه‌های قابل
              بررسی، ریسک‌های مهم و مسیر ادامه تصمیم را در یک تصویر منسجم‌تر
              ببیند.
            </p>

            <div
              className="
                mt-7

                border-r-2
                border-brand-accent

                pr-4
              "
            >
              <p
                className="
                  max-w-[540px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#385a64]

                  sm:text-[15px]
                "
              >
                خروجی خوب قرار نیست تصمیم را به‌جای مدیر بگیرد؛{" "}
                <span className="text-brand-primary">
                  باید تصمیم را قابل‌دیدن‌تر کند.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              EXECUTIVE DECISION BRIEF
          ============================================================ */}

          <div
            className="
              relative

              border
              border-brand-primary/14

              bg-white

              shadow-[0_28px_80px_rgba(4,61,78,.06)]
            "
          >
            {/* ---------------------------------------------------------
                DOCUMENT HEADER
            ---------------------------------------------------------- */}

            <div
              className="
                relative

                flex
                items-start
                justify-between
                gap-6

                border-b
                border-brand-primary/10

                px-5
                py-5

                sm:px-6
                lg:px-7
              "
            >
              <div>
                <p
                  className="
                    text-[13px]
                    font-black

                    text-brand-primary/45
                  "
                >
                  جمع‌بندی مدیریتی
                </p>

                <h3
                  className="
                    mt-1

                    text-[20px]
                    font-black
                    leading-8

                    text-[#173b45]
                  "
                >
                  تصویر تصمیم در سطح گروه
                </h3>
              </div>

              <div
                aria-hidden="true"
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-px
                    w-9

                    bg-brand-primary/12
                  "
                />

                <span
                  className="
                    h-[11px]
                    w-[11px]

                    bg-brand-accent
                  "
                />
              </div>

              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  right-0

                  w-[3px]

                  bg-brand-accent
                "
              />
            </div>

            {/* ---------------------------------------------------------
                BIG STATEMENT
            ---------------------------------------------------------- */}

            <div
              className="
                border-b
                border-brand-primary/10

                bg-brand-primary/[0.035]

                px-5
                py-6

                sm:px-6
                lg:px-7
              "
            >
              <p
                className="
                  max-w-[620px]

                  text-[18px]
                  font-black
                  leading-[1.9]

                  text-[#31545e]

                  sm:text-[20px]
                "
              >
                از مجموعه‌ای از مسائل مالی، به{" "}
                <span className="text-brand-primary">
                  یک تصویر ساختاریافته برای تصمیم.
                </span>
              </p>
            </div>

            {/* ---------------------------------------------------------
                OUTCOME FIELD
            ---------------------------------------------------------- */}

            <div
              className="
                grid

                sm:grid-cols-2
              "
            >
              {OUTCOMES.map((item, index) => (
                <OutcomeCell key={item.number} {...item} index={index} />
              ))}
            </div>

            {/* ---------------------------------------------------------
                DOCUMENT FOOT
            ---------------------------------------------------------- */}

            <div
              className="
                flex
                items-start
                gap-4

                border-t
                border-brand-primary/10

                px-5
                py-5

                sm:px-6
                lg:px-7
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
                  max-w-[760px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#536d75]

                  sm:text-[15px]
                "
              >
                نتیجه، یک توصیه تک‌بعدی نیست؛{" "}
                <span className="text-brand-primary">
                  یک تصویر منسجم‌تر برای ادامه تصمیم‌گیری است.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   OUTCOME CELL
============================================================================= */

function OutcomeCell({
  number,
  title,
  text,
  index,
}: {
  number: string;
  title: string;
  text: string;
  index: number;
}) {
  const borderClasses =
    index === 0
      ? "border-b sm:border-l"
      : index === 1
        ? "border-b"
        : index === 2
          ? "border-b sm:border-b-0 sm:border-l"
          : "";

  return (
    <article
      className={`
        group/outcome
        relative

        min-h-[170px]

        border-brand-primary/[0.09]

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-[#fafcfd]

        sm:px-6
        lg:px-7

        ${borderClasses}
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
        <span
          className="
            text-[14px]
            font-black

            text-brand-primary/38
          "
        >
          {number}
        </span>

        <span
          aria-hidden="true"
          className="
            h-[11px]
            w-[11px]

            bg-brand-primary/22

            transition-colors
            duration-300

            group-hover/outcome:bg-brand-accent
          "
        />
      </div>

      <h4
        className="
          mt-5

          text-[18px]
          font-black

          text-[#173b45]
        "
      >
        {title}
      </h4>

      <p
        className="
          mt-2
          max-w-[320px]

          text-[14px]
          font-medium
          leading-7

          text-[#687c83]
        "
      >
        {text}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-5

          h-[2px]
          w-0

          bg-brand-accent

          transition-[width]
          duration-300

          group-hover/outcome:w-10

          sm:right-6
          lg:right-7
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
            "radial-gradient(circle at 78% 34%,rgba(22,115,148,.05),transparent 27%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-[10%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
