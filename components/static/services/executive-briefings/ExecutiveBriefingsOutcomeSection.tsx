/* =============================================================================
   EXECUTIVE BRIEFINGS — OUTCOME

   Light / compact / executive clarity

   Meaning:
   After the briefing, the decision-maker should leave with:
   - clearer key points
   - relevant scenarios
   - paths worth considering

   Server Component
============================================================================= */

const OUTCOMES = [
  {
    label: "آنچه باید در مرکز توجه بماند",
    title: "نکات کلیدی",
    description:
      "مهم‌ترین ملاحظاتی که برای ادامه تصمیم باید روشن و قابل رجوع باشند.",
  },
  {
    label: "آنچه می‌تواند تصویر را تغییر دهد",
    title: "سناریوهای مرتبط",
    description:
      "وضعیت‌هایی که لازم است پیش از تصمیم یا ادامه بررسی در نظر گرفته شوند.",
  },
  {
    label: "آنچه هنوز قابل بررسی است",
    title: "مسیرهای پیش رو",
    description:
      "گزینه‌ها و مسیرهایی که بر اساس جمع‌بندی حرفه‌ای ارزش بررسی بیشتری دارند.",
  },
] as const;

export function ExecutiveBriefingsOutcomeSection() {
  return (
    <section
      id="executive-briefings-outcome"
      dir="rtl"
      aria-labelledby="executive-briefings-outcome-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-white

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
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
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.92fr_1.08fr]
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
                  text-brand-primary/75
                "
              >
                خروجی بریفینگ
              </p>
            </div>

            <h2
              id="executive-briefings-outcome-title"
              className="
                max-w-[720px]
                [text-wrap:balance]

                text-[28px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[34px]

                lg:text-[40px]
                lg:leading-[1.6]
              "
            >
              بریفینگ نباید با اطلاعات بیشتر تمام شود؛{" "}
              <span className="text-brand-primary">
                باید با تصویر روشن‌تری از تصمیم تمام شود.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[620px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              تصمیم‌گیرنده باید بعد از جلسه بتواند مهم‌ترین نکات، سناریوهای
              مرتبط و مسیرهای قابل بررسی را بدون بازگشت به حجم بزرگی از اطلاعات
              تشخیص دهد.
            </p>

            {/* executive statement */}

            <div
              className="
                relative

                mt-7

                border-r-2
                border-brand-accent

                pr-4
              "
            >
              <p
                className="
                  max-w-[600px]

                  text-[15px]
                  font-black
                  leading-8

                  text-[#365963]
                "
              >
                معیار یک بریفینگ خوب این نیست که چقدر مطلب گفته شده؛{" "}
                <span className="text-brand-primary">
                  مهم این است که چه چیزی برای تصمیم روشن‌تر شده باشد.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              EXECUTIVE TAKEAWAY FIELD
          ============================================================ */}

          <div
            className="
              relative

              border-y
              border-brand-primary/14

              bg-[#f8fbfc]

              shadow-[0_18px_50px_rgba(5,62,79,.035)]
            "
          >
            {/* header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-6

                border-b
                border-brand-primary/10

                px-5
                py-4

                sm:px-6
              "
            >
              <p
                className="
                  text-[14px]
                  font-black

                  text-[#31545e]
                "
              >
                بعد از بریفینگ، چه چیزی باید روشن‌تر باشد؟
              </p>

              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  shrink-0

                  bg-brand-accent
                "
              />
            </div>

            {/* outcomes */}

            <div
              className="
                divide-y
                divide-brand-primary/10
              "
            >
              {OUTCOMES.map((item, index) => (
                <OutcomeRow
                  key={item.title}
                  label={item.label}
                  title={item.title}
                  description={item.description}
                  accent={index === OUTCOMES.length - 1}
                />
              ))}
            </div>

            {/* closing */}

            <div
              className="
                flex
                items-start
                gap-4

                border-t
                border-brand-primary/10

                bg-white

                px-5
                py-4

                sm:px-6
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
                  font-bold
                  leading-7

                  text-[#526c74]

                  sm:text-[15px]
                "
              >
                خروجی باید برای ادامه بررسی و تصمیم‌گیری قابل استفاده باشد؛ نه
                فقط برای ثبت آنچه در جلسه گفته شد.
              </p>
            </div>
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
  label,
  title,
  description,
  accent = false,
}: {
  label: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/outcome
        relative

        grid
        gap-2

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-white

        sm:grid-cols-[200px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6
      "
    >
      {/* answer */}

      <div>
        <p
          className="
            text-[14px]
            font-medium
            leading-7

            text-brand-primary/55
          "
        >
          {label}
        </p>

        <div
          className="
            mt-1

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

              ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
            `}
          />

          <h3
            className={`
              text-[17px]
              font-black
              leading-7

              ${accent ? "text-brand-primary" : "text-[#173b45]"}
            `}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* explanation */}

      <p
        className="
          text-[14px]
          font-medium
          leading-[1.95]

          text-[#687b81]
        "
      >
        {description}
      </p>

      {/* hover marker */}

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

          group-hover/outcome:scale-y-100
        "
      />
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
            "radial-gradient(circle at 83% 28%,rgba(22,115,148,.045),transparent 25%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[11%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
