/* =============================================================================
   UNSTRUCTURED PORTFOLIO — WHAT FRAGMENTATION CHANGES

   Soft light section
   Fast to scan
   Editorial, not cards

   Message:
   When structure is unclear,
   the whole portfolio becomes harder to read.
============================================================================= */

const PORTFOLIO_EFFECTS = [
  {
    number: "01",
    title: "تصویر کلی مبهم می‌شود",
    text: "هر دارایی جداگانه دیده می‌شود، اما نقش آن در کل پرتفوی روشن نیست.",
  },
  {
    number: "02",
    title: "ریسک و نقدشوندگی سخت‌تر دیده می‌شوند",
    text: "تنوع ظاهری می‌تواند تمرکز ریسک یا محدودیت دسترسی به منابع را پنهان کند.",
  },
  {
    number: "03",
    title: "تصمیم‌ها واکنشی‌تر می‌شوند",
    text: "وقتی چارچوب مشخصی وجود ندارد، خبر و شرایط لحظه‌ای می‌توانند وزن بیشتری در تصمیم پیدا کنند.",
  },
] as const;

export function UnstructuredPortfolioProblemsSection() {
  return (
    <section
      id="unstructured-portfolio-problems"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-problems-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#f6f9fa]

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
            lg:items-start
            lg:gap-16

            xl:gap-20
          "
        >
          {/* ===========================================================
              INTRO
          ============================================================ */}

          <div
            className="
              lg:sticky
              lg:top-32
            "
          >
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-brand-primary/70
                "
              >
                وقتی ساختار روشن نیست
              </p>
            </div>

            <h2
              id="unstructured-portfolio-problems-title"
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
              پراکندگی فقط ظاهر پرتفوی را شلوغ نمی‌کند؛{" "}
              <span className="text-brand-primary">
                دیدن تصویر واقعی را هم سخت‌تر می‌کند.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[580px]

                text-[15px]
                font-medium
                leading-[2]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              مسئله زمانی مهم‌تر می‌شود که دارایی‌ها جداگانه بررسی شوند اما
              ارتباط آن‌ها با ریسک، نقدشوندگی و تصمیم‌های بعدی روشن نباشد.
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
                  max-w-[530px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#365963]

                  sm:text-[15px]
                "
              >
                داشتن اطلاعات بیشتر لزوماً کافی نیست؛{" "}
                <span className="text-brand-primary">
                  باید بتوان تصویر کل را دید.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              EFFECT FIELD
          ============================================================ */}

          <div
            className="
              relative

              border-y
              border-brand-primary/14

              bg-white

              shadow-[0_22px_60px_rgba(4,61,78,.045)]
            "
          >
            {/* ---------------------------------------------------------
                HEADER
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
                    text-brand-primary/50
                  "
                >
                  اثر پراکندگی
                </p>

                <p
                  className="
                    mt-1

                    text-[18px]
                    font-black

                    text-[#173b45]
                  "
                >
                  سه چیزی که کمتر دیده می‌شوند
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

            {/* ---------------------------------------------------------
                EFFECTS
            ---------------------------------------------------------- */}

            <div>
              {PORTFOLIO_EFFECTS.map((item, index) => (
                <PortfolioEffectRow
                  key={item.number}
                  number={item.number}
                  title={item.title}
                  text={item.text}
                  accent={index === PORTFOLIO_EFFECTS.length - 1}
                />
              ))}
            </div>

            {/* ---------------------------------------------------------
                SUMMARY
            ---------------------------------------------------------- */}

            <div
              className="
                relative

                border-t
                border-brand-primary/10

                bg-brand-primary/[0.035]

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
                    mt-[11px]

                    h-[11px]
                    w-[11px]

                    shrink-0

                    bg-brand-accent
                  "
                />

                <p
                  className="
                    text-[15px]
                    font-black
                    leading-8

                    text-[#31545e]
                  "
                >
                  مسئله اصلی، کمبود دارایی نیست؛{" "}
                  <span className="text-brand-primary">
                    نبود یک منطق روشن بین دارایی‌هاست.
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
   EFFECT ROW
============================================================================= */

function PortfolioEffectRow({
  number,
  title,
  text,
  accent = false,
}: {
  number: string;
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/effect
        relative

        grid
        gap-3

        border-b
        border-brand-primary/[0.09]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-[#fafcfd]

        sm:px-6

        lg:grid-cols-[70px_260px_1fr]
        lg:items-center
        lg:gap-7
        lg:px-7
      "
    >
      {/* number */}

      <span
        className={`
          text-[14px]
          font-black

          ${accent ? "text-brand-accent" : "text-brand-primary/40"}
        `}
      >
        {number}
      </span>

      {/* title */}

      <div
        className="
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

            transition-colors
            duration-300

            ${
              accent
                ? "bg-brand-accent"
                : "bg-brand-primary/25 group-hover/effect:bg-brand-accent"
            }
          `}
        />

        <h3
          className="
            text-[14px] text-nowrap
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      {/* text */}

      <p
        className="
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-[#667a81]

          lg:border-r
          lg:border-brand-primary/[0.08]
          lg:pr-6
        "
      >
        {text}
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

          group-hover/effect:scale-y-100
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
            "radial-gradient(circle at 80% 30%,rgba(22,115,148,.05),transparent 26%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-[9%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
