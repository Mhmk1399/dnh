/* =============================================================================
   MAJOR FINANCIAL DECISION — READINESS CHECKPOINT

   Dark signature section

   Core idea:
   Before acting, check 3 things:
   - Is the issue clear?
   - Are risk + liquidity understood?
   - Are horizon + scenarios considered?

   Simple / readable / meaningful
============================================================================= */

const READINESS_CHECKS = [
  {
    label: "مسئله",
    question: "آیا دقیقاً روشن است درباره چه چیزی تصمیم می‌گیرید؟",
  },
  {
    label: "اثر تصمیم",
    question: "آیا ریسک و اثر تصمیم بر نقدشوندگی دیده شده است؟",
  },
  {
    label: "آینده تصمیم",
    question: "آیا افق زمانی و سناریوهای متفاوت بررسی شده‌اند؟",
  },
] as const;

export function MajorDecisionReadinessSection() {
  return (
    <section
      id="major-decision-readiness"
      dir="rtl"
      aria-labelledby="major-decision-readiness-title"
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
      <ReadinessBackground />

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

            lg:grid-cols-[0.82fr_1.18fr]
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
                  text-white/68
                "
              >
                قبل از اقدام
              </p>
            </div>

            <h2
              id="major-decision-readiness-title"
              className="
                max-w-[700px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-white

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              آیا تصویر تصمیم{" "}
              <span className="text-brand-accent">
                به‌اندازه کافی روشن شده است؟
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]

                text-[15px]
                font-medium
                leading-[2]

                text-white/62

                sm:text-[16px]
              "
            >
              قبل از اقدام، لازم نیست همه چیز قطعی باشد؛ اما چند ابهام اصلی
              نباید بدون بررسی باقی مانده باشند.
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

                  text-white/70

                  sm:text-[15px]
                "
              >
                اگر پاسخ یکی از این سؤال‌ها هنوز مبهم است،{" "}
                <span className="text-white">
                  تصمیم احتمالاً نیاز به بررسی بیشتری دارد.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              DECISION CHECKPOINT
          ============================================================ */}

          <div
            className="
              relative

              border
              border-white/14

              bg-white/[0.025]

              shadow-[0_32px_90px_rgba(0,0,0,.20)]
            "
          >
            {/* header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-b
                border-white/10

                px-5
                py-5

                sm:px-6
              "
            >
              <div>
                <p
                  className="
                    text-[13px]
                    font-black

                    text-white/42
                  "
                >
                  نقطه کنترل تصمیم
                </p>

                <p
                  className="
                    mt-1

                    text-[19px]
                    font-black

                    text-white
                  "
                >
                  سه سؤال قبل از اقدام
                </p>
              </div>

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

            {/* checks */}

            <div>
              {READINESS_CHECKS.map((item, index) => (
                <ReadinessRow
                  key={item.label}
                  index={index + 1}
                  label={item.label}
                  question={item.question}
                />
              ))}
            </div>

            {/* result */}

            <div
              className="
                relative

                border-t
                border-white/10

                bg-brand-accent/[0.07]

                px-5
                py-5

                sm:px-6
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
                    mt-[11px]

                    h-[11px]
                    w-[11px]

                    shrink-0

                    bg-brand-accent
                  "
                />

                <div>
                  <p
                    className="
                      text-[15px]
                      font-black

                      text-brand-accent
                    "
                  >
                    هنوز ابهام وجود دارد؟
                  </p>

                  <p
                    className="
                      mt-1

                      text-[14px]
                      font-medium
                      leading-7

                      text-white/68

                      sm:text-[15px]
                    "
                  >
                    بهتر است قبل از انتخاب نهایی، همان بخش دوباره بررسی شود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   READINESS ROW
============================================================================= */

function ReadinessRow({
  index,
  label,
  question,
}: {
  index: number;
  label: string;
  question: string;
}) {
  return (
    <article
      className="
        group
        relative

        grid
        gap-3

        border-b
        border-white/[0.09]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white/[0.025]

        sm:grid-cols-[150px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="
            flex
            h-8
            w-8

            shrink-0
            items-center
            justify-center

            border
            border-white/15

            text-[13px]
            font-black

            text-white/45
          "
        >
          {String(index).padStart(2, "0")}
        </span>

        <h3
          className="
            text-[16px]
            font-black

            text-white
          "
        >
          {label}
        </h3>
      </div>

      <p
        className="
          text-[15px]
          font-medium
          leading-7

          text-white/68

          sm:border-r
          sm:border-white/[0.09]
          sm:pr-6
        "
      >
        {question}
      </p>

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

          group-hover:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ReadinessBackground() {
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
            "radial-gradient(circle at 72% 42%,rgba(22,115,148,.22),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.04]
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
