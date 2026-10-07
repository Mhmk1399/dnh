/* =============================================================================
   RISK MANAGEMENT & WEALTH PROTECTION — REVIEW

   Composition:
   Risk Lens + Editorial Ledger

   Not a card grid
   Not a repeated band
   Compact desktop
   Server Component
============================================================================= */

const RISK_AREAS = [
  {
    title: "ریسک تمرکز",
    description:
      "آیا بخش مهمی از ثروت یا ساختار مالی به یک دارایی، حوزه یا منبع محدود وابسته شده است؟",
  },
  {
    title: "ریسک نقدشوندگی",
    description:
      "آیا در زمان نیاز، منابع کافی و قابل‌دسترسی برای حفظ انعطاف تصمیم وجود دارد؟",
  },
  {
    title: "ریسک ارز",
    description:
      "ساختار تا چه اندازه نسبت به تغییرات ارز و وابستگی‌های ارزی حساس است؟",
  },
  {
    title: "ریسک تورم",
    description:
      "تورم چگونه می‌تواند بر ارزش واقعی دارایی‌ها، قدرت خرید و اهداف مالی اثر بگذارد؟",
  },
] as const;

export function RiskProtectionReviewSection() {
  return (
    <section
      id="risk-protection-review"
      dir="rtl"
      aria-labelledby="risk-protection-review-title"
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
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[1.08fr_0.92fr]
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
                  text-brand-primary/75
                "
              >
                بررسی ریسک از چند زاویه
              </p>
            </div>

            <h2
              id="risk-protection-review-title"
              className="
                max-w-[850px]
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
              یک ساختار ممکن است از یک زاویه سالم به نظر برسد؛{" "}
              <span className="text-brand-primary">
                اما از زاویه دیگری آسیب‌پذیر باشد.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[580px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            برای دیدن تصویر واقعی ریسک، ساختار از چند جهت بررسی می‌شود؛ تمرکز،
            نقدشوندگی، حساسیت ارزی و اثر تورم هرکدام بخش متفاوتی از آسیب‌پذیری
            را نشان می‌دهند.
          </p>
        </div>

        {/* ===============================================================
            MAIN COMPOSITION
        ================================================================ */}

        <div
          className="
            mt-10

            grid

            border-y
            border-brand-primary/14

            bg-white

            shadow-[0_16px_45px_rgba(5,62,79,.035)]

            lg:mt-12
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* =============================================================
              RISK LENS
          ============================================================== */}

          <div
            className="
              relative

              flex
              min-h-[330px]
              items-center
              justify-center

              overflow-hidden

              border-b
              border-brand-primary/12

              bg-brand-primary/[0.025]

              px-5
              py-8

              lg:min-h-[350px]
              lg:border-b-0
              lg:border-l
              lg:px-8
          "
          >
            <RiskLens />
          </div>

          {/* =============================================================
              EDITORIAL LEDGER
          ============================================================== */}

          <div
            className="
              divide-y
              divide-brand-primary/10
            "
          >
            {RISK_AREAS.map((risk, index) => (
              <RiskLedgerRow
                key={risk.title}
                title={risk.title}
                description={risk.description}
                accent={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   RISK LENS
============================================================================= */

function RiskLens() {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        h-[270px]
        w-full
        max-w-[430px]

        sm:h-[280px]
      "
    >
      {/* ===============================================================
          CENTRAL STRUCTURE
      ================================================================ */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          flex
          h-[118px]
          w-[190px]

          -translate-x-1/2
          -translate-y-1/2

          flex-col
          items-center
          justify-center

          border
          border-brand-primary/30

          bg-white

          px-5

          text-center

          shadow-[0_14px_38px_rgba(7,76,96,.07)]

          sm:w-[210px]
        "
      >
        {/* orange focus corner */}

        <span
          className="
            absolute
            right-[-1px]
            top-[-1px]

            h-7
            w-[2px]

            bg-brand-accent
          "
        />

        <span
          className="
            absolute
            right-[-1px]
            top-[-1px]

            h-[2px]
            w-7

            bg-brand-accent
          "
        />

        <span
          className="
            mb-2

            h-[7px]
            w-[7px]

            bg-brand-accent
          "
        />

        <p
          className="
            text-[16px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          ساختار تحت بررسی
        </p>

        <p
          className="
            mt-1

            text-[14px]
            font-medium
            leading-6

            text-[#71838a]
          "
        >
          ثروت یا کسب‌وکار
        </p>
      </div>

      {/* ===============================================================
          TOP RIGHT — CONCENTRATION
      ================================================================ */}

      <LensLabel
        title="تمرکز"
        className="
          right-0
          top-2
        "
      />

      <span
        className="
          absolute
          right-[78px]
          top-[52px]

          h-px
          w-[50px]

          bg-brand-primary/18
        "
      />

      <span
        className="
          absolute
          right-[127px]
          top-[52px]

          h-[57px]
          w-px

          bg-brand-primary/18
        "
      />

      {/* ===============================================================
          TOP LEFT — LIQUIDITY
      ================================================================ */}

      <LensLabel
        title="نقدشوندگی"
        className="
          left-0
          top-2
        "
      />

      <span
        className="
          absolute
          left-[92px]
          top-[52px]

          h-px
          w-[36px]

          bg-brand-primary/18
        "
      />

      <span
        className="
          absolute
          left-[127px]
          top-[52px]

          h-[57px]
          w-px

          bg-brand-primary/18
        "
      />

      {/* ===============================================================
          BOTTOM RIGHT — CURRENCY
      ================================================================ */}

      <LensLabel
        title="ارز"
        className="
          bottom-2
          right-0
        "
      />

      <span
        className="
          absolute
          bottom-[52px]
          right-[58px]

          h-px
          w-[70px]

          bg-brand-primary/18
        "
      />

      <span
        className="
          absolute
          bottom-[52px]
          right-[127px]

          h-[57px]
          w-px

          bg-brand-primary/18
        "
      />

      {/* ===============================================================
          BOTTOM LEFT — INFLATION
      ================================================================ */}

      <LensLabel
        title="تورم"
        className="
          bottom-2
          left-0
        "
      />

      <span
        className="
          absolute
          bottom-[52px]
          left-[58px]

          h-px
          w-[70px]

          bg-brand-primary/18
        "
      />

      <span
        className="
          absolute
          bottom-[52px]
          left-[127px]

          h-[57px]
          w-px

          bg-brand-primary/18
        "
      />
    </div>
  );
}

/* =============================================================================
   LENS LABEL
============================================================================= */

function LensLabel({ title, className }: { title: string; className: string }) {
  return (
    <div
      className={`
        absolute

        flex
        items-center
        gap-3

        ${className}
      `}
    >
      <span
        className="
          h-[7px]
          w-[7px]

          shrink-0

          bg-[#82cee4]
        "
      />

      <span
        className="
          text-[14px]
          font-black

          text-[#31535d]
        "
      >
        {title}
      </span>
    </div>
  );
}

/* =============================================================================
   LEDGER ROW
============================================================================= */

function RiskLedgerRow({
  title,
  description,
  accent = false,
}: {
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/row
        relative

        grid
        gap-2

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        sm:grid-cols-[160px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-6

        lg:min-h-[87px]
        lg:px-8
      "
    >
      {/* hover accent */}

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

          group-hover/row:scale-y-100
        "
      />

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
            h-[7px]
            w-[7px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/30"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black
            leading-7

            text-[#173b45]

            transition-colors
            duration-300

            group-hover/row:text-brand-primary
          "
        >
          {title}
        </h3>
      </div>

      {/* description */}

      <p
        className="
          pr-[19px]

          text-[14px]
          font-medium
          leading-[1.95]

          text-[#667a81]

          sm:pr-0
        "
      >
        {description}
      </p>
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
            "radial-gradient(circle at 82% 25%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[8%]
          top-0

          hidden
          h-full
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
