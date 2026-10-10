/* =============================================================================
   MAJOR FINANCIAL DECISION — WHAT DNH DOES

   Light / clear / practical

   Meaning:
   1. Understand the case
   2. Review it professionally
   3. Structure the decision picture
============================================================================= */

const DNH_STEPS = [
  {
    step: "01",
    title: "شناخت مسئله",
    description:
      "موضوع تصمیم، شرایط فعلی، فوریت و دامنه پرونده ابتدا روشن می‌شوند.",
  },
  {
    step: "02",
    title: "بررسی حرفه‌ای",
    description:
      "ریسک‌ها، شرایط مرتبط و پیچیدگی‌های اثرگذار بر تصمیم بررسی می‌شوند.",
  },
  {
    step: "03",
    title: "ساختن تصویر تصمیم",
    description:
      "گزینه‌ها، سناریوها و مسیرهای قابل بررسی در یک تصویر منسجم‌تر قرار می‌گیرند.",
  },
] as const;

export function MajorDecisionDnhSection() {
  return (
    <section
      id="major-decision-dnh"
      dir="rtl"
      aria-labelledby="major-decision-dnh-title"
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

            lg:grid-cols-[0.95fr_1.05fr]
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
                نقش DNH
              </p>
            </div>

            <h2
              id="major-decision-dnh-title"
              className="
                max-w-[820px]
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
              DNH کمک می‌کند تصمیم،{" "}
              <span className="text-brand-primary">
                قبل از انتخاب نهایی ساختار پیدا کند.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[590px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            مسیر از شناخت مسئله شروع می‌شود، با بررسی حرفه‌ای ادامه پیدا می‌کند
            و در نهایت به یک تصویر روشن‌تر از گزینه‌ها، سناریوها و مسیرهای قابل
            بررسی می‌رسد.
          </p>
        </div>

        {/* ===========================================================
            DECISION WORKFLOW
        ============================================================ */}

        <div
          className="
            relative

            mt-10

            border-y
            border-brand-primary/14

            bg-[#f8fbfc]

            shadow-[0_18px_55px_rgba(4,61,78,.04)]

            lg:mt-12
          "
        >
          {/* ---------------------------------------------------------
              DESKTOP
          ---------------------------------------------------------- */}

          <div
            className="
              hidden

              grid-cols-3

              lg:grid
            "
          >
            {DNH_STEPS.map((item, index) => (
              <DnhStep
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
                divided={index > 0}
                accent={index === DNH_STEPS.length - 1}
              />
            ))}
          </div>

          {/* ---------------------------------------------------------
              MOBILE
          ---------------------------------------------------------- */}

          <div
            className="
              divide-y
              divide-brand-primary/10

              lg:hidden
            "
          >
            {DNH_STEPS.map((item, index) => (
              <MobileDnhStep
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
                accent={index === DNH_STEPS.length - 1}
              />
            ))}
          </div>

          {/* ---------------------------------------------------------
              FINAL OUTPUT
          ---------------------------------------------------------- */}

          <div
            className="
              relative

              flex
              flex-col
              gap-3

              border-t
              border-brand-primary/12

              bg-white

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-8
              sm:px-6

              lg:px-7
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
                className="
                  h-[11px]
                  w-[11px]

                  shrink-0

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[14px]
                  font-black

                  text-brand-primary/70
                "
              >
                خروجی این مسیر
              </p>
            </div>

            <p
              className="
                max-w-[720px]

                text-[15px]
                font-black
                leading-7

                text-[#284c56]
              "
            >
              تصویر روشن‌تری از{" "}
              <span className="text-brand-primary">
                گزینه‌ها، سناریوها و مسیرهای قابل بررسی
              </span>
            </p>
          </div>
        </div>

        {/* ===========================================================
            BOUNDARY NOTE
        ============================================================ */}

        <div
          className="
            mt-6

            flex
            items-start
            gap-4

            border-r-2
            border-brand-accent

            pr-4
          "
        >
          <p
            className="
              max-w-[760px]

              text-[14px]
              font-medium
              leading-7

              text-[#60737a]

              sm:text-[15px]
            "
          >
            هدف این مسیر، رسیدن سریع به یک جواب قطعی نیست؛
            <span className="font-bold text-brand-primary">
              {" "}
              هدف، روشن‌تر کردن ساختار تصمیم پیش از اقدام است.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP STEP
============================================================================= */

function DnhStep({
  step,
  title,
  description,
  divided = false,
  accent = false,
}: {
  step: string;
  title: string;
  description: string;
  divided?: boolean;
  accent?: boolean;
}) {
  return (
    <article
      className={`
        group/step
        relative

        min-h-[190px]

        px-7
        py-6

        transition-colors
        duration-300

        hover:bg-white

        ${divided ? "border-r border-brand-primary/10" : ""}
      `}
    >
      {/* number */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <span
          className={`
            text-[14px]
            font-black

            ${accent ? "text-brand-accent" : "text-brand-primary/45"}
          `}
        >
          {step}
        </span>

        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            ${accent ? "bg-brand-accent" : "bg-brand-primary/24"}
          `}
        />
      </div>

      {/* title */}

      <h3
        className="
          mt-5

          text-[18px]
          font-black
          leading-8

          text-[#173b45]
        "
      >
        {title}
      </h3>

      {/* description */}

      <p
        className="
          mt-2

          text-[14px]
          font-medium
          leading-[1.95]

          text-[#657980]
        "
      >
        {description}
      </p>

      {/* active rail */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-7
          bottom-0

          h-[2px]

          origin-right
          scale-x-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/step:scale-x-100
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE STEP
============================================================================= */

function MobileDnhStep({
  step,
  title,
  description,
  accent = false,
}: {
  step: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
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
          className={`
            flex
            h-8
            w-8

            shrink-0
            items-center
            justify-center

            border
            border-brand-primary/14

            text-[13px]
            font-black

            ${accent ? "text-brand-accent" : "text-brand-primary/55"}
          `}
        >
          {step}
        </span>

        <div>
          <h3
            className="
              text-[17px]
              font-black
              leading-7

              text-[#173b45]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2

              text-[14px]
              font-medium
              leading-7

              text-[#657980]
            "
          >
            {description}
          </p>
        </div>
      </div>
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
            "radial-gradient(circle at 82% 28%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[10%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
