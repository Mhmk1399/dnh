/* =============================================================================
   RISK MANAGEMENT & WEALTH PROTECTION — PROTECTION PRIORITIES

   Light outcome section

   Meaning:
   Broad risk picture
   → Where vulnerability sits
   → What deserves protection priority

   Compact desktop
   Server Component
============================================================================= */

export function RiskProtectionPrioritiesSection() {
  return (
    <section
      id="risk-protection-priorities"
      dir="rtl"
      aria-labelledby="risk-protection-priorities-title"
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
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.9fr_1.1fr]
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
                خروجی بررسی ریسک
              </p>
            </div>

            <h2
              id="risk-protection-priorities-title"
              className="
                max-w-[700px]
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
              هدف، ساختن یک فهرست بلند از ریسک‌ها نیست؛{" "}
              <span className="text-brand-primary">
                باید روشن شود چه چیزی در اولویت حفاظت قرار دارد.
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
              وقتی محل و نوع آسیب‌پذیری‌ها کنار هم دیده شوند، می‌توان تصویر
              منسجم‌تری از ریسک ساخت و مشخص کرد کدام بخش از ساختار نیازمند توجه
              بیشتری است.
            </p>

            {/* takeaway */}

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
                حفاظت مؤثر از جایی شروع می‌شود که{" "}
                <span className="text-brand-primary">
                  اولویت واقعی ریسک روشن شده باشد.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              PRIORITY NARROWING VISUAL
          ============================================================ */}

          <div
            role="img"
            aria-label="بررسی از تصویر ساختاریافته ریسک‌ها آغاز می‌شود، محل آسیب‌پذیری‌ها را روشن می‌کند و در نهایت به اولویت‌های حفاظتی می‌رسد."
            className="
              relative

              border-y
              border-brand-primary/14

              bg-[#f8fbfc]

              px-5
              py-7

              sm:px-7
              sm:py-8

              lg:px-8
            "
          >
            {/* visual header */}

            <div
              className="
                mb-6

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

                  text-[#31545e]
                "
              >
                از تصویر کامل تا اولویت
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

            <div className="space-y-3">
              {/* =======================================================
                  01 — BROAD PICTURE
              ======================================================== */}

              <PriorityLayer
                eyebrow="تصویر کلی"
                title="تصویر ساختاریافته ریسک‌ها"
                description="دیدن ریسک‌ها در کنار یکدیگر و در ارتباط با کل ساختار."
                widthClass="w-full"
              />

              {/* =======================================================
                  02 — LOCATION
              ======================================================== */}

              <PriorityLayer
                eyebrow="محل اثر"
                title="بخش‌های آسیب‌پذیر ساختار"
                description="روشن شدن اینکه ریسک در کدام قسمت از ساختار اهمیت پیدا می‌کند."
                widthClass="w-[88%]"
              />

              {/* =======================================================
                  03 — PRIORITY
              ======================================================== */}

              <PriorityLayer
                eyebrow="تمرکز حفاظتی"
                title="اولویت‌های حفاظتی"
                description="مشخص شدن موضوعاتی که باید زودتر مورد توجه و بازبینی قرار گیرند."
                widthClass="w-[74%]"
                accent
              />
            </div>

            {/* Meaning key */}

            <div
              className="
                mt-6

                flex
                items-center
                gap-3

                border-t
                border-brand-primary/10

                pt-4
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8

                  shrink-0

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[14px]
                  font-medium
                  leading-7

                  text-[#687b81]
                "
              >
                هرچه بررسی دقیق‌تر می‌شود، تمرکز از «همه ریسک‌ها» به «آنچه
                نیازمند اولویت است» محدودتر می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PRIORITY LAYER
============================================================================= */

function PriorityLayer({
  eyebrow,
  title,
  description,
  widthClass,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  widthClass: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`
        group/layer
        relative

        mr-0

        ${widthClass}
      `}
    >
      <div
        className={`
          relative

          border

          px-4
          py-4

          transition-[background-color,border-color,transform]
          duration-300

          group-hover/layer:-translate-x-0.5

          sm:grid
          sm:grid-cols-[145px_1fr]
          sm:items-center
          sm:gap-5
          sm:px-5

          ${
            accent
              ? `
                border-brand-accent/40
                bg-brand-accent/[0.045]
              `
              : `
                border-brand-primary/12
                bg-white
                group-hover/layer:border-brand-primary/24
              `
          }
        `}
      >
        {/* semantic marker */}

        <span
          aria-hidden="true"
          className={`
            absolute
            inset-y-0
            right-[-1px]

            w-[2px]

            ${accent ? "bg-brand-accent" : "bg-brand-primary/20"}
          `}
        />

        {/* title */}

        <div>
          <p
            className={`
              text-[14px]
              font-black

              ${accent ? "text-brand-accent" : "text-brand-primary/65"}
            `}
          >
            {eyebrow}
          </p>

          <h3
            className="
              mt-1

              text-[16px]
              font-black
              leading-7

              text-[#173b45]
            "
          >
            {title}
          </h3>
        </div>

        {/* description */}

        <p
          className="
            mt-3

            text-[14px]
            font-medium
            leading-7

            text-[#697c82]

            sm:mt-0
          "
        >
          {description}
        </p>
      </div>
    </div>
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
            "radial-gradient(circle at 82% 28%,rgba(22,115,148,.045),transparent 25%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[12%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
