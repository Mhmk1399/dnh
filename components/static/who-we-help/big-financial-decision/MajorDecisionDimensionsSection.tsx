/* =============================================================================
   MAJOR FINANCIAL DECISION — FIVE CHECKS

   Simple proposition:
   Before a major decision, check 5 things.

   Clear
   Scannable
   Compact
============================================================================= */

const DECISION_CHECKS = [
  {
    title: "مسئله",
    text: "دقیقاً درباره چه چیزی تصمیم می‌گیرید؟",
  },
  {
    title: "ریسک",
    text: "چه چیزی می‌تواند نتیجه تصمیم را تغییر دهد؟",
  },
  {
    title: "نقدشوندگی",
    text: "بعد از تصمیم، به منابع لازم دسترسی دارید؟",
  },
  {
    title: "افق زمانی",
    text: "این تصمیم را در چه بازه‌ای باید سنجید؟",
  },
  {
    title: "سناریوها",
    text: "اگر شرایط تغییر کند، چه مسیرهایی پیش رو دارید؟",
  },
] as const;

export function MajorDecisionDimensionsSection() {
  return (
    <section
      id="major-decision-dimensions"
      dir="rtl"
      aria-labelledby="major-decision-dimensions-title"
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

                  text-brand-primary/70
                "
              >
                قبل از تصمیم
              </p>
            </div>

            <h2
              id="major-decision-dimensions-title"
              className="
                max-w-[700px]
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
              قبل از یک تصمیم مالی بزرگ،{" "}
              <span className="text-brand-primary">
                این پنج موضوع را روشن کنید.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]

                text-[15px]
                font-medium
                leading-[2]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              لازم نیست از ابتدا همه پاسخ‌ها را داشته باشید؛ اما باید بدانید
              کدام سؤال‌ها هنوز برای تصمیم شما باز مانده‌اند.
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
                  max-w-[520px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#365963]

                  sm:text-[15px]
                "
              >
                اگر یکی از این بخش‌ها مبهم است،{" "}
                <span className="text-brand-primary">
                  تصویر تصمیم هنوز کامل نیست.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              SIMPLE DECISION CHECKLIST
          ============================================================ */}

          <div
            aria-labelledby="decision-checklist-title"
            className="
              relative

              border-y
              border-brand-primary/14

              bg-white

              shadow-[0_22px_60px_rgba(4,61,78,.045)]
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

                    text-brand-primary/50
                  "
                >
                  مرور سریع
                </p>

                <h3
                  id="decision-checklist-title"
                  className="
                    mt-1

                    text-[18px]
                    font-black

                    text-[#173b45]
                  "
                >
                  آیا این پنج موضوع برای شما روشن است؟
                </h3>
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

            {/* rows */}

            <div>
              {DECISION_CHECKS.map((item, index) => (
                <DecisionCheckRow
                  key={item.title}
                  title={item.title}
                  text={item.text}
                  accent={index === DECISION_CHECKS.length - 1}
                />
              ))}
            </div>

            {/* bottom */}

            <div
              className="
                border-t
                border-brand-primary/10

                bg-brand-primary/[0.035]

                px-5
                py-4

                sm:px-6
              "
            >
              <div className="flex items-start gap-3">
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

                    text-[#43636c]

                    sm:text-[15px]
                  "
                >
                  هدف این مرور، پیدا کردن جواب فوری نیست؛{" "}
                  <span className="text-brand-primary">
                    هدف، دیدن نقاطی است که هنوز نیاز به بررسی دارند.
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
   DECISION CHECK ROW
============================================================================= */

function DecisionCheckRow({
  title,
  text,
  accent = false,
}: {
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/check
        relative

        grid
        gap-2

        border-b
        border-brand-primary/[0.09]

        px-5
        py-4

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-[#fafcfd]

        sm:grid-cols-[145px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <h4
          className="
            text-[17px]
            font-black

            text-[#173b45]
          "
        >
          {title}
        </h4>
      </div>

      <p
        className="
          pr-[20px]

          text-[15px]
          font-medium
          leading-7

          text-[#5d7279]

          sm:border-r
          sm:border-brand-primary/[0.08]
          sm:pr-5
        "
      >
        {text}
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

          group-hover/check:scale-y-100
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
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
      "
      style={{
        background:
          "radial-gradient(circle at 82% 30%,rgba(22,115,148,.045),transparent 25%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
      }}
    />
  );
}
