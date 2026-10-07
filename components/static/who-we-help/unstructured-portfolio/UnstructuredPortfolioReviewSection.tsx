/* =============================================================================
   UNSTRUCTURED PORTFOLIO — REVIEW

   Light / editorial / easy to scan

   Four areas:
   - Portfolio Structure
   - Risk Concentration
   - Liquidity
   - Asset Allocation
============================================================================= */

const REVIEW_AREAS = [
  {
    number: "۰۱",
    title: "ساختار پرتفوی",
    question: "دارایی‌ها در کنار هم چه تصویری ساخته‌اند؟",
    text: "نقش و جایگاه هر دارایی در کل پرتفوی بررسی می‌شود.",
  },
  {
    number: "۰۲",
    title: "تمرکز ریسک",
    question: "آیا تنوع دارایی واقعاً به معنای تنوع ریسک است؟",
    text: "بررسی می‌شود که بخش بزرگی از ریسک در یک نقطه متمرکز نشده باشد.",
  },
  {
    number: "۰۳",
    title: "نقدشوندگی",
    question: "در زمان نیاز، چه مقدار از منابع واقعاً در دسترس است؟",
    text: "ترکیب دارایی‌ها از منظر دسترسی به منابع و محدودیت‌های نقدشوندگی دیده می‌شود.",
  },
  {
    number: "۰۴",
    title: "تخصیص دارایی",
    question: "سرمایه چگونه بین بخش‌های مختلف پرتفوی توزیع شده است؟",
    text: "ترکیب کلی دارایی‌ها بررسی می‌شود تا تصویر تخصیص سرمایه روشن‌تر شود.",
  },
] as const;

export function UnstructuredPortfolioReviewSection() {
  return (
    <section
      id="unstructured-portfolio-review"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-review-title"
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
            HEADER
        ============================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
            lg:gap-14
          "
        >
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
                بازبینی پرتفوی
              </p>
            </div>

            <h2
              id="unstructured-portfolio-review-title"
              className="
                max-w-[760px]
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
              برای دیدن تصویر واقعی پرتفوی،{" "}
              <span className="text-brand-primary">
                چهار بخش باید کنار هم بررسی شوند.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[590px]

              text-[15px]
              font-medium
              leading-[2]

              text-[#60737a]

              sm:text-[16px]
            "
          >
            بازبینی فقط درباره عملکرد یک دارایی نیست؛ باید ساختار کل پرتفوی و
            نحوه ارتباط بخش‌های مختلف آن با یکدیگر دیده شود.
          </p>
        </div>

        {/* ===========================================================
            REVIEW SHEET
        ============================================================ */}

        <div
          className="
            relative

            mt-10

            border-y
            border-brand-primary/14

            bg-[#f8fbfc]

            shadow-[0_20px_60px_rgba(4,61,78,.045)]

            lg:mt-12
          "
        >
          {/* ---------------------------------------------------------
              TOP LINE
          ---------------------------------------------------------- */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              border-b
              border-brand-primary/10

              px-5
              py-4

              sm:px-6
              lg:px-7
            "
          >
            <div>
              <p
                className="
                  text-[13px]
                  font-black
                  text-brand-primary/48
                "
              >
                چهار زاویه بازبینی
              </p>

              <p
                className="
                  mt-1

                  text-[18px]
                  font-black

                  text-[#173b45]
                "
              >
                پرتفوی باید به‌عنوان یک کل دیده شود.
              </p>
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

          {/* ---------------------------------------------------------
              AREAS
          ---------------------------------------------------------- */}

          <div
            className="
              grid

              lg:grid-cols-2
            "
          >
            {REVIEW_AREAS.map((item, index) => (
              <ReviewArea key={item.number} {...item} index={index} />
            ))}
          </div>

          {/* ---------------------------------------------------------
              FINAL LINE
          ---------------------------------------------------------- */}

          <div
            className="
              relative

              border-t
              border-brand-primary/10

              bg-white

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

                bg-brand-accent
              "
            />

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
                  mt-[9px]

                  h-[7px]
                  w-[7px]

                  shrink-0

                  bg-brand-accent
                "
              />

              <p
                className="
                  max-w-[900px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#536d75]

                  sm:text-[15px]
                "
              >
                هدف بازبینی، اضافه کردن پیچیدگی نیست؛{" "}
                <span className="text-brand-primary">
                  هدف این است که ساختار واقعی پرتفوی واضح‌تر دیده شود.
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
   REVIEW AREA
============================================================================= */

function ReviewArea({
  number,
  title,
  question,
  text,
  index,
}: {
  number: string;
  title: string;
  question: string;
  text: string;
  index: number;
}) {
  const desktopBorders =
    index === 0
      ? "lg:border-l lg:border-brand-primary/10"
      : index === 1
        ? ""
        : index === 2
          ? "lg:border-l lg:border-t lg:border-brand-primary/10"
          : "lg:border-t lg:border-brand-primary/10";

  return (
    <article
      className={`
        group/review
        relative

        min-h-[210px]

        border-b
        border-brand-primary/10

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-white

        sm:px-6
        lg:px-7

        ${desktopBorders}

        ${index >= 2 ? "lg:border-b-0" : ""}
      `}
    >
      {/* number + title */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-5
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              text-[14px]
              font-black

              text-brand-primary/42
            "
          >
            {number}
          </span>

          <span
            aria-hidden="true"
            className="
              h-px
              w-7

              bg-brand-primary/15
            "
          />

          <h3
            className="
              text-[18px]
              font-black

              text-[#173b45]
            "
          >
            {title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="
            h-[7px]
            w-[7px]

            shrink-0

            bg-brand-primary/22

            transition-colors
            duration-300

            group-hover/review:bg-brand-accent
          "
        />
      </div>

      {/* question */}

      <p
        className="
          mt-5

          max-w-[520px]

          text-[16px]
          font-black
          leading-8

          text-[#31545e]
        "
      >
        {question}
      </p>

      {/* explanation */}

      <p
        className="
          mt-2

          max-w-[520px]

          text-[14px]
          font-medium
          leading-7

          text-[#6a7d83]
        "
      >
        {text}
      </p>

      {/* hover rail */}

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

          group-hover/review:w-12

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
            "radial-gradient(circle at 82% 26%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
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
