/* =============================================================================
   MAJOR FINANCIAL DECISION — CLARITY SECTION

   Meaning:
   Before choosing between options,
   understand:
   1. the actual issue
   2. the surrounding conditions
   3. the available paths

   Light / highly readable / editorial
============================================================================= */

const CLARITY_ITEMS = [
  {
    label: "مسئله",
    question: "دقیقاً درباره چه چیزی قرار است تصمیم گرفته شود؟",
    description:
      "موضوع تصمیم باید از حاشیه‌ها، فشارهای لحظه‌ای و گزینه‌های روی میز جدا و روشن شود.",
  },
  {
    label: "شرایط",
    question: "چه شرایطی می‌تواند روی این تصمیم اثر بگذارد؟",
    description:
      "ریسک، نقدشوندگی، افق زمانی و عوامل مرتبط باید در زمینه همان تصمیم دیده شوند.",
  },
  {
    label: "مسیرهای پیش رو",
    question: "چه راه‌هایی واقعاً قابل بررسی هستند؟",
    description:
      "پیش از انتخاب نهایی، سناریوها و مسیرهای ممکن باید در یک تصویر منسجم کنار هم قرار بگیرند.",
  },
] as const;

export function MajorDecisionClaritySection() {
  return (
    <section
      id="major-decision-clarity"
      dir="rtl"
      aria-labelledby="major-decision-clarity-title"
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
      <ClarityBackground />

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

            lg:grid-cols-[0.88fr_1.12fr]
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
                قبل از انتخاب
              </p>
            </div>

            <h2
              id="major-decision-clarity-title"
              className="
                max-w-[720px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.7]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              انتخاب، آخرین مرحله است؛{" "}
              <span className="text-brand-primary">
                ابتدا باید بدانید دقیقاً چه مسئله‌ای را حل می‌کنید.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[620px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-[#5c7077]

                sm:text-[16px]
              "
            >
              در یک تصمیم مالی مهم، مقایسه گزینه‌ها به‌تنهایی کافی نیست. ابتدا
              باید مسئله، شرایط پیرامون آن و مسیرهایی که واقعاً قابل بررسی‌اند
              روشن شوند.
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
                  max-w-[570px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#365963]

                  sm:text-[15px]
                "
              >
                سؤال اصلی فقط این نیست که{" "}
                <span className="text-brand-primary">
                  «کدام گزینه بهتر است؟»
                </span>{" "}
                بلکه این است که آیا مسئله به‌اندازه کافی روشن شده است؟
              </p>
            </div>
          </div>

          {/* ===========================================================
              PRE-DECISION FIELD
          ============================================================ */}

          <div
            aria-labelledby="pre-decision-field-title"
            className="
              relative

              border-y
              border-brand-primary/14

              bg-[#f8fbfc]

              shadow-[0_18px_55px_rgba(4,61,78,.045)]
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
              <div>
                <p
                  className="
                    text-[13px]
                    font-black
                    text-brand-primary/55
                  "
                >
                  پیش از رسیدن به انتخاب
                </p>

                <h3
                  id="pre-decision-field-title"
                  className="
                    mt-1

                    text-[18px]
                    font-black
                    leading-8

                    text-[#173b45]
                  "
                >
                  سه سؤال باید پاسخ روشن‌تری پیدا کنند.
                </h3>
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

            {/* questions */}

            <div>
              {CLARITY_ITEMS.map((item, index) => (
                <ClarityRow
                  key={item.label}
                  index={index + 1}
                  label={item.label}
                  question={item.question}
                  description={item.description}
                />
              ))}
            </div>

            {/* choice gate */}

            <div
              className="
                relative

                border-t
                border-brand-primary/12

                bg-white

                px-5
                py-5

                sm:px-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    flex-1

                    bg-brand-primary/12
                  "
                />

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-3

                    border-x
                    border-brand-accent/35

                    px-4
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-[8px]
                      w-[8px]

                      bg-brand-accent
                    "
                  />

                  <p
                    className="
                      text-[15px]
                      font-black

                      text-brand-primary
                    "
                  >
                    سپس: انتخاب
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    h-px
                    flex-1

                    bg-brand-primary/12
                  "
                />
              </div>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[540px]

                  text-center
                  text-[14px]
                  font-medium
                  leading-7

                  text-[#687b81]
                "
              >
                انتخاب باید روی تصویری روشن‌تر از مسئله و شرایط آن قرار بگیرد،
                نه فقط روی مقایسه چند گزینه.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CLARITY ROW
============================================================================= */

function ClarityRow({
  index,
  label,
  question,
  description,
}: {
  index: number;
  label: string;
  question: string;
  description: string;
}) {
  return (
    <article
      className="
        group/clarity
        relative

        grid
        gap-3

        border-b
        border-brand-primary/10

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white

        sm:grid-cols-[150px_1fr]
        sm:gap-6
        sm:px-6
      "
    >
      {/* label */}

      <div>
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
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center

              border
              border-brand-primary/16

              text-[13px]
              font-black

              text-brand-primary/60
            "
          >
            {String(index).padStart(2, "0")}
          </span>

          <h3
            className="
              text-[14px]
              font-black

              text-[#173b45]
            "
          >
            {label}
          </h3>
        </div>
      </div>

      {/* content */}

      <div
        className="
          sm:border-r
          sm:border-brand-primary/[0.08]
          sm:pr-6
        "
      >
        <p
          className="
            text-[15px]
            font-black
            leading-7

            text-[#294d57]
          "
        >
          {question}
        </p>

        <p
          className="
            mt-2

            text-[14px]
            font-medium
            leading-7

            text-[#687b81]
          "
        >
          {description}
        </p>
      </div>

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
          duration-300

          group-hover/clarity:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ClarityBackground() {
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
            "radial-gradient(circle at 84% 22%,rgba(22,115,148,.05),transparent 23%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
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
