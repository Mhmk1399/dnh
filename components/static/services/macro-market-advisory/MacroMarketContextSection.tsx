/* =============================================================================
   MACRO & MARKET ADVISORY — CONTEXT

   Meaning:
   Single-market view = partial picture
   Wider decision context = economy + currency + liquidity + risk + market

   Server Component
   No client JS
============================================================================= */

const CONTEXT_FACTORS = [
  "اقتصاد کلان",
  "ارز",
  "نقدینگی",
  "ریسک",
  "شرایط بازار",
] as const;

export function MacroMarketContextSection() {
  return (
    <section
      id="macro-market-context"
      dir="rtl"
      aria-labelledby="macro-market-context-title"
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
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <div
          className="
            grid
            items-end
            gap-8

            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-16
          "
        >
          <div>
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
                  text-[12px]
                  font-black

                  text-brand-primary/75
                "
              >
                تصویر کامل‌تر از محیط تصمیم
              </p>
            </div>

            <h2
              id="macro-market-context-title"
              className="
                max-w-[880px]
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
              نگاه به یک بازار، فقط بخشی از تصویر را نشان می‌دهد؛{" "}
              <span className="text-brand-primary">
                تصمیم به زمینه بزرگ‌تری وابسته است.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pr-8">
            <p
              className="
                max-w-[580px]

                text-[15px]
                font-medium
                leading-[2.15]

                text-[#5c7179]

                sm:text-[16px]
              "
            >
              حرکت یک بازار می‌تواند مهم باشد، اما برای فهم یک تصمیم باید شرایط
              اقتصادی، ارز، نقدینگی، ریسک و وضعیت کلی بازار در کنار هم دیده
              شوند.
            </p>
          </div>
        </div>

        {/* ===============================================================
            VISUAL
        ================================================================ */}

        <div
          className="
            relative

            mt-14

            border
            border-brand-primary/14

            bg-white

            shadow-[0_24px_70px_rgba(5,62,79,.055)]

            lg:mt-16
          "
        >
          {/* =============================================================
              DESKTOP
          ============================================================== */}

          <div
            className="
              hidden
              min-h-[430px]

              grid-cols-[0.76fr_1.24fr]

              lg:grid
            "
          >
            {/* -----------------------------------------------------------
                LIMITED VIEW
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                border-l
                border-brand-primary/12

                bg-[#f8fbfc]

                px-10
                py-12

                xl:px-12
              "
            >
              <div className="max-w-[330px]">
                <p
                  className="
                    text-[14px]
                    font-black

                    text-[#6d8087]
                  "
                >
                  وقتی فقط یک بازار دیده می‌شود
                </p>

                <div
                  className="
                    mt-7

                    border
                    border-brand-primary/16

                    bg-white

                    px-6
                    py-7
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >
                    <p
                      className="
                        text-[18px]
                        font-black

                        text-[#183a45]
                      "
                    >
                      یک بازار
                    </p>

                    <span
                      aria-hidden="true"
                      className="
                        h-[8px]
                        w-[8px]

                        bg-brand-primary/35
                      "
                    />
                  </div>
                </div>

                <p
                  className="
                    mt-6

                    text-[15px]
                    font-medium
                    leading-8

                    text-[#74868c]
                  "
                >
                  بخشی از شرایط دیده می‌شود، اما زمینه تصمیم هنوز کامل نیست.
                </p>
              </div>

              {/* visual limitation rail */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-10
                  right-10

                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-[6px] w-[6px] bg-brand-primary/25" />
                <span className="h-px w-14 bg-brand-primary/12" />
              </div>
            </div>

            {/* -----------------------------------------------------------
                WIDER CONTEXT
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                px-10
                py-12

                xl:px-14
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >
                <p
                  className="
                    text-[14px]
                    font-black

                    text-brand-primary
                  "
                >
                  وقتی محیط تصمیم دیده می‌شود
                </p>

                <div
                  aria-hidden="true"
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="h-px w-10 bg-brand-primary/18" />
                  <span className="h-[6px] w-[6px] bg-brand-accent" />
                </div>
              </div>

              {/* Context field */}

              <div
                className="
                  mt-7

                  border-y
                  border-brand-primary/14
                "
              >
                {CONTEXT_FACTORS.map((factor, index) => (
                  <ContextFactor
                    key={factor}
                    title={factor}
                    accent={index === CONTEXT_FACTORS.length - 1}
                  />
                ))}
              </div>

              {/* Decision statement */}

              <div
                className="
                  relative

                  mt-8

                  border-r-2
                  border-brand-accent

                  bg-brand-primary/[0.025]

                  px-6
                  py-5
                "
              >
                <p
                  className="
                    text-[16px]
                    font-black
                    leading-8

                    text-[#234650]
                  "
                >
                  تصمیم درون این محیط شکل می‌گیرد، نه در یک بازار جدا از بقیه.
                </p>
              </div>
            </div>
          </div>

          {/* =============================================================
              MOBILE
          ============================================================== */}

          <div className="lg:hidden">
            {/* limited */}

            <div
              className="
                border-b
                border-brand-primary/12

                bg-[#f8fbfc]

                px-5
                py-7
              "
            >
              <p
                className="
                  text-[14px]
                  font-black

                  text-[#6d8087]
                "
              >
                نگاه محدود
              </p>

              <div
                className="
                  mt-4

                  flex
                  items-center
                  justify-between

                  border
                  border-brand-primary/14

                  bg-white

                  px-5
                  py-5
                "
              >
                <span
                  className="
                    text-[17px]
                    font-black

                    text-[#183a45]
                  "
                >
                  یک بازار
                </span>

                <span
                  aria-hidden="true"
                  className="
                    h-[7px]
                    w-[7px]

                    bg-brand-primary/30
                  "
                />
              </div>

              <p
                className="
                  mt-4

                  text-[14px]
                  font-medium
                  leading-7

                  text-[#71848a]
                "
              >
                فقط بخشی از شرایط دیده می‌شود.
              </p>
            </div>

            {/* full context */}

            <div
              className="
                px-5
                py-7
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >
                <p
                  className="
                    text-[14px]
                    font-black

                    text-brand-primary
                  "
                >
                  محیط کامل‌تر تصمیم
                </p>

                <span
                  aria-hidden="true"
                  className="
                    h-[7px]
                    w-[7px]

                    bg-brand-accent
                  "
                />
              </div>

              <div
                className="
                  mt-5

                  border-y
                  border-brand-primary/12
                "
              >
                {CONTEXT_FACTORS.map((factor, index) => (
                  <ContextFactor
                    key={factor}
                    title={factor}
                    accent={index === CONTEXT_FACTORS.length - 1}
                  />
                ))}
              </div>

              <div
                className="
                  mt-6

                  border-r-2
                  border-brand-accent

                  bg-brand-primary/[0.025]

                  px-5
                  py-4
                "
              >
                <p
                  className="
                    text-[15px]
                    font-black
                    leading-8

                    text-[#234650]
                  "
                >
                  تصمیم زمانی بهتر فهمیده می‌شود که زمینه اطراف آن هم دیده شود.
                </p>
              </div>
            </div>
          </div>

          {/* architectural corners */}

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
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CONTEXT FACTOR
============================================================================= */

function ContextFactor({
  title,
  accent = false,
}: {
  title: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/factor

        flex
        min-h-[64px]
        items-center
        justify-between
        gap-6

        border-b
        border-brand-primary/10

        px-1

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.02]
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
          className={`
            h-[7px]
            w-[7px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/35"}
          `}
        />

        <span
          className="
            text-[15px]
            font-black

            text-[#244751]
          "
        >
          {title}
        </span>
      </div>

      <span
        aria-hidden="true"
        className={`
          h-px

          transition-[width,background-color]
          duration-300

          ${
            accent
              ? "w-12 bg-brand-accent/45"
              : "w-8 bg-brand-primary/12 group-hover/factor:w-12 group-hover/factor:bg-brand-primary/25"
          }
        `}
      />
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
            "radial-gradient(circle at 82% 28%,rgba(22,115,148,.045),transparent 25%),linear-gradient(180deg,#ffffff 0%,#f9fcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[48%]

          h-px

          bg-brand-primary/[0.03]
        "
      />
    </>
  );
}
